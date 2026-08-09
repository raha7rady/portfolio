using Microsoft.Extensions.Logging;

namespace Portfolio.Application.Contact;

public sealed class ContactService
{
    private readonly IContactMessageRepository _repository;
    private readonly IEmailNotifier _emailNotifier;
    private readonly ILogger<ContactService> _logger;

    public ContactService(
        IContactMessageRepository repository,
        IEmailNotifier emailNotifier,
        ILogger<ContactService> logger)
    {
        _repository = repository;
        _emailNotifier = emailNotifier;
        _logger = logger;
    }

    public async Task<ContactResult> SubmitAsync(ContactRequestDto request, CancellationToken cancellationToken)
    {
        var errors = ContactRequestValidator.Validate(request);
        if (errors.Count > 0)
        {
            return ContactResult.Failure(errors);
        }

        var submission = new ContactSubmission(
            Name: request.Name.Trim(),
            Email: request.Email.Trim(),
            Message: request.Message.Trim(),
            CreatedAtUtc: DateTimeOffset.UtcNow);

        await _repository.AddAsync(submission, cancellationToken);

        // ارسال ایمیل عمداً fire-and-log است، نه بخشی از تراکنش اصلی:
        // پیام همین الان ذخیره شده؛ اگر SMTP در دسترس نباشد، کاربر نباید خطا ببیند.
        try
        {
            await _emailNotifier.NotifyNewContactAsync(submission, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "ارسال ایمیل اطلاع‌رسانی پیام Contact جدید ناموفق بود.");
        }

        return ContactResult.Success();
    }
}
