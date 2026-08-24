namespace Portfolio.Application.Contact;

public interface IContactMessageRepository
{
    Task AddAsync(ContactSubmission submission, CancellationToken cancellationToken);

    /// <summary>
    /// همه پیام‌ها را برمی‌گرداند (جدیدترین اول). با <paramref name="isRead"/> می‌توان فیلتر کرد؛
    /// null یعنی بدون فیلتر (خوانده‌شده + نخوانده).
    /// </summary>
    Task<IReadOnlyList<ContactMessageSummary>> GetAllAsync(bool? isRead, CancellationToken cancellationToken);

    Task<ContactMessageSummary?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    /// <summary>
    /// پیام را خوانده‌شده علامت می‌زند. اگر پیامی با این Id وجود نداشته باشد، false برمی‌گرداند.
    /// </summary>
    Task<bool> MarkAsReadAsync(Guid id, CancellationToken cancellationToken);
}
