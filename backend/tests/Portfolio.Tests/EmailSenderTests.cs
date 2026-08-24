using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Portfolio.Application.Contact;
using Portfolio.Infrastructure.Email;
using Xunit;

namespace Portfolio.Tests;

/// <summary>
/// این تست‌ها فقط مسیرهای Guard Clause (خروج زودهنگام) را پوشش می‌دهند —
/// یعنی جایی که NotifyNewContactAsync قبل از ساختن SmtpClient برمی‌گردد.
/// عمداً یک تست برای «ارسال واقعی ایمیل» نوشته نشده چون آن نیازمند SMTP واقعی
/// (یا Mock کردن SmtpClient که در .NET قابل جایگزینی/Mock نیست) است و خارج از دامنه Unit Test است.
/// </summary>
public class EmailSenderTests
{
    private static ContactSubmission Submission() =>
        new("مهتا", "mehta@example.com", "این یک پیام تست معتبر است.", DateTimeOffset.UtcNow);

    private static EmailSender CreateSender(EmailSettings settings) =>
        new(Options.Create(settings), NullLogger<EmailSender>.Instance);

    [Fact]
    public async Task NotifyNewContactAsync_WhenNotificationsDisabled_ReturnsWithoutError()
    {
        var sender = CreateSender(new EmailSettings { NotificationsEnabled = false });

        var exception = await Record.ExceptionAsync(() =>
            sender.NotifyNewContactAsync(Submission(), CancellationToken.None));

        Assert.Null(exception);
    }

    [Fact]
    public async Task NotifyNewContactAsync_WhenEnabledButSmtpHostMissing_ReturnsWithoutError()
    {
        var sender = CreateSender(new EmailSettings
        {
            NotificationsEnabled = true,
            SmtpHost = "",
            ToAddress = "owner@example.com",
        });

        var exception = await Record.ExceptionAsync(() =>
            sender.NotifyNewContactAsync(Submission(), CancellationToken.None));

        Assert.Null(exception);
    }

    [Fact]
    public async Task NotifyNewContactAsync_WhenEnabledButToAddressMissing_ReturnsWithoutError()
    {
        var sender = CreateSender(new EmailSettings
        {
            NotificationsEnabled = true,
            SmtpHost = "smtp.example.com",
            ToAddress = "",
        });

        var exception = await Record.ExceptionAsync(() =>
            sender.NotifyNewContactAsync(Submission(), CancellationToken.None));

        Assert.Null(exception);
    }

    [Fact]
    public async Task NotifyNewContactAsync_WhenDisabled_DoesNotRequireAnySmtpConfiguration()
    {
        // حتی اگر هیچ‌کدام از تنظیمات SMTP پر نشده باشند، وقتی NotificationsEnabled=false است
        // نباید هیچ خطایی رخ بدهد — این دقیقاً همان رفتاری است که در appsettings.json پیش‌فرض است.
        var sender = CreateSender(new EmailSettings());

        var exception = await Record.ExceptionAsync(() =>
            sender.NotifyNewContactAsync(Submission(), CancellationToken.None));

        Assert.Null(exception);
    }
}
