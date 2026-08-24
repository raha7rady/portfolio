using Microsoft.EntityFrameworkCore;
using Portfolio.Application.Contact;
using Portfolio.Infrastructure.Persistence.Entities;

namespace Portfolio.Infrastructure.Persistence.Repositories;

public sealed class ContactMessageRepository : IContactMessageRepository
{
    private readonly PortfolioDbContext _dbContext;

    public ContactMessageRepository(PortfolioDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(
        ContactSubmission submission,
        CancellationToken cancellationToken)
    {
        var entity = new ContactMessageEntity
        {
            Id = Guid.NewGuid(),
            Name = submission.Name,
            Email = submission.Email,
            Message = submission.Message,
            CreatedAtUtc = submission.CreatedAtUtc,
            IsRead = false,
        };

        await _dbContext.ContactMessages.AddAsync(entity, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<ContactMessageSummary>> GetAllAsync(
        bool? isRead,
        CancellationToken cancellationToken)
    {
        var query = _dbContext.ContactMessages
            .AsNoTracking()
            .AsQueryable();

        if (isRead.HasValue)
        {
            query = query.Where(m => m.IsRead == isRead.Value);
        }

        // SQLite نمی‌تواند DateTimeOffset را مستقیماً
        // در ORDER BY ترجمه کند.
        // بنابراین ابتدا داده‌ها را از دیتابیس می‌گیریم
        // و سپس در حافظه بر اساس CreatedAtUtc مرتب می‌کنیم.
        var entities = await query
            .ToListAsync(cancellationToken);

        var summaries = entities
            .OrderByDescending(m => m.CreatedAtUtc)
            .Select(ToSummary)
            .ToList();

        return summaries;
    }

    public async Task<ContactMessageSummary?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken)
    {
        var entity = await _dbContext.ContactMessages
            .AsNoTracking()
            .FirstOrDefaultAsync(
                m => m.Id == id,
                cancellationToken);

        return entity is null ? null : ToSummary(entity);
    }

    public async Task<bool> MarkAsReadAsync(
        Guid id,
        CancellationToken cancellationToken)
    {
        var entity = await _dbContext.ContactMessages
            .FirstOrDefaultAsync(
                m => m.Id == id,
                cancellationToken);

        if (entity is null)
        {
            return false;
        }

        if (!entity.IsRead)
        {
            entity.IsRead = true;
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        return true;
    }

    private static ContactMessageSummary ToSummary(
        ContactMessageEntity entity) =>
        new(
            entity.Id,
            entity.Name,
            entity.Email,
            entity.Message,
            entity.CreatedAtUtc,
            entity.IsRead);
}