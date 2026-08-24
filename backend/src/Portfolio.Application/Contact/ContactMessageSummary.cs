namespace Portfolio.Application.Contact;

/// <summary>
/// نمای فقط‌خواندنی از یک پیام Contact ذخیره‌شده — برای بخش Admin.
/// مستقل از جزئیات EF Core/Entity؛ همان الگوی <see cref="ContactSubmission"/>.
/// </summary>
public sealed record ContactMessageSummary(
    Guid Id,
    string Name,
    string Email,
    string Message,
    DateTimeOffset CreatedAtUtc,
    bool IsRead);
