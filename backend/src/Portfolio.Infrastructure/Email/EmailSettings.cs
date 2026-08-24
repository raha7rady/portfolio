namespace Portfolio.Infrastructure.Email;

public sealed class EmailSettings
{
    public const string SectionName = "Email";

    /// <summary>
    /// کلید اصلی روشن/خاموش‌کردن اعلان ایمیل. پیش‌فرض false است — یعنی ذخیره پیام در
    /// دیتابیس هرگز به SMTP وابسته نیست، حتی اگر تنظیمات SMTP هم پر شده باشد.
    /// </summary>
    public bool NotificationsEnabled { get; set; }

    public string SmtpHost { get; set; } = string.Empty;
    public int SmtpPort { get; set; } = 587;
    public string SmtpUsername { get; set; } = string.Empty;
    public string SmtpPassword { get; set; } = string.Empty;
    public string FromAddress { get; set; } = string.Empty;
    public string ToAddress { get; set; } = string.Empty;
}
