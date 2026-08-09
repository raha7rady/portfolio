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

    public async Task AddAsync(ContactSubmission submission, CancellationToken cancellationToken)
    {
        var entity = new ContactMessageEntity
        {
            Id = Guid.NewGuid(),
            Name = submission.Name,
            Email = submission.Email,
            Message = submission.Message,
            CreatedAtUtc = submission.CreatedAtUtc,
        };

        await _dbContext.ContactMessages.AddAsync(entity, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
