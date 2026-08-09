namespace Portfolio.Application.Contact;

/// <summary>
/// نسخه معتبرشده و آماده ذخیره‌سازی پیام Contact — مستقل از جزئیات EF Core/دیتابیس.
/// </summary>
public sealed record ContactSubmission(
    string Name,
    string Email,
    string Message,
    DateTimeOffset CreatedAtUtc);
