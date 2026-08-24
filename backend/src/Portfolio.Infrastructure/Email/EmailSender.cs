using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Portfolio.Application.Contact;

namespace Portfolio.Infrastructure.Email;

public sealed class EmailSender : IEmailNotifier
{
    private readonly EmailSettings _settings;
    private readonly ILogger<EmailSender> _logger;

    public EmailSender(IOptions<EmailSettings> settings, ILogger<EmailSender> logger)
    {
        _settings = settings.Value;
        _logger = logger;
    }

    public async Task NotifyNewContactAsync(ContactSubmission submission, CancellationToken cancellationToken)
    {
        if (!_settings.NotificationsEnabled)
        {
            _logger.LogInformation(
                "اعلان ایمیل غیرفعال است (Email:NotificationsEnabled=false) — پیام {Email} فقط در دیتابیس ذخیره شد.",
                submission.Email);
            return;
        }

        if (string.IsNullOrWhiteSpace(_settings.SmtpHost) || string.IsNullOrWhiteSpace(_settings.ToAddress))
        {
            _logger.LogWarning(
                "اعلان ایمیل فعال است ولی تنظیمات SMTP کامل نیست — ایمیل برای پیام {Email} ارسال نشد.",
                submission.Email);
            return;
        }

        using var message = new MailMessage
        {
            From = new MailAddress(_settings.FromAddress, "Portfolio Contact Form"),
            Subject = $"پیام جدید از فرم تماس — {submission.Name}",
            Body = $"نام: {submission.Name}\nایمیل: {submission.Email}\n\nپیام:\n{submission.Message}",
            IsBodyHtml = false,
        };
        message.To.Add(_settings.ToAddress);
        message.ReplyToList.Add(new MailAddress(submission.Email));

        using var client = new SmtpClient(_settings.SmtpHost, _settings.SmtpPort)
        {
            Credentials = new NetworkCredential(_settings.SmtpUsername, _settings.SmtpPassword),
            EnableSsl = true,
        };

        await client.SendMailAsync(message, cancellationToken);
    }
}
