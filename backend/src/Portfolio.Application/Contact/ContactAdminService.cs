using Microsoft.Extensions.Logging;

namespace Portfolio.Application.Contact;

/// <summary>
/// منطق برنامه برای مدیریت پیام‌های Contact ذخیره‌شده (فقط برای بخش Admin).
/// عمداً از ContactService (که مسئول ثبت پیام جدید است) جدا نگه داشته شده تا
/// هر Service یک مسئولیت مشخص داشته باشد.
/// </summary>
public sealed class ContactAdminService
{
    private readonly IContactMessageRepository _repository;
    private readonly ILogger<ContactAdminService> _logger;

    public ContactAdminService(IContactMessageRepository repository, ILogger<ContactAdminService> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    public Task<IReadOnlyList<ContactMessageSummary>> GetMessagesAsync(
        bool? isRead,
        CancellationToken cancellationToken)
        => _repository.GetAllAsync(isRead, cancellationToken);

    public Task<ContactMessageSummary?> GetMessageAsync(Guid id, CancellationToken cancellationToken)
        => _repository.GetByIdAsync(id, cancellationToken);

    public async Task<bool> MarkAsReadAsync(Guid id, CancellationToken cancellationToken)
    {
        var marked = await _repository.MarkAsReadAsync(id, cancellationToken);

        if (marked)
        {
            _logger.LogInformation("پیام Contact {MessageId} به‌عنوان خوانده‌شده علامت‌گذاری شد.", id);
        }
        else
        {
            _logger.LogWarning("تلاش برای علامت‌گذاری پیام Contact ناموجود {MessageId}.", id);
        }

        return marked;
    }
}
