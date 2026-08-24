using System.IO;
using System.Threading;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;

namespace Portfolio.Tests;

/// <summary>
/// WebApplicationFactory اختصاصی برای تست‌های Integration.
///
/// دو نکته مهم:
/// ۱) هر نمونه یک فایل SQLite موقت و منحصربه‌فرد برای خودش می‌سازد (نه portfolio.db واقعی پروژه)
///    تا تست‌ها روی داده‌های واقعی توسعه اثر نگذارند و از هم مستقل بمانند.
/// ۲) Admin:ApiKey از بیرون (سازنده کلاس) قابل تنظیم است تا رفتار AdminApiKeyFilter
///    در حالت‌های مختلف (پیکربندی‌نشده / اشتباه / درست) تست شود.
///
/// هر تست باید نمونه خودش را بسازد (نه Shared/IClassFixture) چون هر نمونه دیتابیس و
/// تنظیمات Admin Key جدا دارد — دیدن این کلاس، ساخت آن، و Dispose کردنش با using در هر تست.
/// </summary>
public sealed class PortfolioApiFactory : WebApplicationFactory<Program>
{
    private readonly string? _adminApiKey;
    private readonly string _dbPath =
        Path.Combine(Path.GetTempPath(), $"portfolio-tests-{Guid.NewGuid():N}.db");

    public PortfolioApiFactory(string? adminApiKey)
    {
        _adminApiKey = adminApiKey;
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");

        builder.ConfigureAppConfiguration((_, configBuilder) =>
        {
            var overrides = new Dictionary<string, string?>
            {
                ["ConnectionStrings:Default"] = $"Data Source={_dbPath}",
                ["Email:NotificationsEnabled"] = "false",
            };

            // عمداً فقط وقتی کلید null نیست اضافه می‌شود؛ اگر null باشد، همان مقدار
            // پیش‌فرض خالی appsettings.json ("") باقی می‌ماند — یعنی سناریوی «پیکربندی‌نشده».
            if (_adminApiKey is not null)
            {
                overrides["Admin:ApiKey"] = _adminApiKey;
            }

            configBuilder.AddInMemoryCollection(overrides);
        });
    }

    protected override void Dispose(bool disposing)
    {
        base.Dispose(disposing);

        if (!disposing)
        {
            return;
        }

        // چرا این کار لازم است:
        // Microsoft.Data.Sqlite اتصال‌های SQLite را در یک Pool سراسری (فرآیندی) نگه می‌دارد
        // تا در فراخوانی‌های بعدی سریع‌تر باشد — حتی بعد از Dispose شدن DbContext/Host هم
        // فایل دیتابیس توسط این Pool باز نگه داشته می‌شود. روی ویندوز (بر خلاف لینوکس) قفل
        // فایل‌ها Exclusive است، پس تلاش فوری برای File.Delete با خطای
        // "the process cannot access the file" مواجه می‌شود.
        // راه‌حل استاندارد خودِ کتابخانه Microsoft.Data.Sqlite دقیقاً همین است:
        // پاک‌کردن Pool مخصوص همین Connection String (نه کل Poolهای برنامه) قبل از حذف فایل.
        using (var connection = new SqliteConnection($"Data Source={_dbPath}"))
        {
            SqliteConnection.ClearPool(connection);
        }

        DeleteFileIfExistsWithRetry(_dbPath);
        DeleteFileIfExistsWithRetry($"{_dbPath}-journal");
        DeleteFileIfExistsWithRetry($"{_dbPath}-wal");
        DeleteFileIfExistsWithRetry($"{_dbPath}-shm");
    }

    /// <summary>
    /// حذف فایل موقت تست صرفاً نظافت است، نه بخشی از منطق تست. حتی اگر بعد از ClearPool هم
    /// یک Handle برای چند میلی‌ثانیه دیرتر آزاد شود، چند تلاش کوتاه کافی است؛ اگر باز هم
    /// ناموفق بود، تست نباید Fail شود — فایل بی‌خطر در پوشه Temp سیستم باقی می‌ماند.
    /// </summary>
    private static void DeleteFileIfExistsWithRetry(string path)
    {
        const int maxAttempts = 3;

        for (var attempt = 1; attempt <= maxAttempts; attempt++)
        {
            try
            {
                File.Delete(path);
                return;
            }
            catch (IOException) when (attempt < maxAttempts)
            {
                Thread.Sleep(50);
            }
            catch (IOException)
            {
                // تلاش‌ها تمام شد؛ عمداً بی‌سروصدا رد می‌شویم (نظافت غیرحیاتی).
            }
        }
    }
}
