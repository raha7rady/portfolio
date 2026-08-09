namespace Portfolio.Application.Contact;

/// <summary>
/// دیتای خام دریافتی از فرم Contact فرانت‌اند، قبل از اعتبارسنجی.
/// </summary>
public sealed record ContactRequestDto(string Name, string Email, string Message);
