using System.Security.Cryptography;
using System.Text;

namespace Portfolio.Api.Security;

/// <summary>
/// محافظت ساده و سبک از Endpointهای Admin با یک API Key ثابت (Header: X-Admin-Api-Key).
/// عمداً به‌جای ASP.NET Identity/JWT انتخاب شده — برای یک پنل تک‌کاربره (خود صاحب پورتفولیو)
/// یک سیستم کامل احراز هویت/کاربر پیچیدگی غیرضروری است.
///
/// اگر Admin:ApiKey پیکربندی نشده باشد، Endpointها به‌طور کامل غیرفعال می‌مانند (503) —
/// یعنی رفتار پیش‌فرض «امن» است، نه «باز».
/// </summary>
public sealed class AdminApiKeyFilter : IEndpointFilter
{
    private const string HeaderName = "X-Admin-Api-Key";

    private readonly IConfiguration _configuration;
    private readonly ILogger<AdminApiKeyFilter> _logger;

    public AdminApiKeyFilter(IConfiguration configuration, ILogger<AdminApiKeyFilter> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async ValueTask<object?> InvokeAsync(
        EndpointFilterInvocationContext context,
        EndpointFilterDelegate next)
    {
        var configuredKey = _configuration["Admin:ApiKey"];

        if (string.IsNullOrWhiteSpace(configuredKey))
        {
            _logger.LogWarning(
                "درخواست به Endpoint مدیریت پیام‌ها رد شد چون Admin:ApiKey پیکربندی نشده است.");
            return Results.Problem(
                title: "پنل مدیریت پیام‌ها پیکربندی نشده است.",
                statusCode: StatusCodes.Status503ServiceUnavailable);
        }

        var providedKey = context.HttpContext.Request.Headers[HeaderName].ToString();

        if (string.IsNullOrEmpty(providedKey) || !FixedTimeEquals(providedKey, configuredKey))
        {
            return Results.Unauthorized();
        }

        return await next(context);
    }

    /// <summary>
    /// مقایسه با زمان ثابت — جلوگیری از Timing Attack روی مقایسه رشته‌ای API Key.
    /// </summary>
    private static bool FixedTimeEquals(string left, string right)
    {
        var leftBytes = Encoding.UTF8.GetBytes(left);
        var rightBytes = Encoding.UTF8.GetBytes(right);

        // طول‌های متفاوت یعنی قطعاً برابر نیستند؛ اما برای جلوگیری از نشت طول از طریق
        // زمان‌بندی، همچنان یک مقایسه با طول ثابت (بر اساس طولانی‌تر) انجام می‌شود.
        if (leftBytes.Length != rightBytes.Length)
        {
            CryptographicOperations.FixedTimeEquals(leftBytes, leftBytes);
            return false;
        }

        return CryptographicOperations.FixedTimeEquals(leftBytes, rightBytes);
    }
}
