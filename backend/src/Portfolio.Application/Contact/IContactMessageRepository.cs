namespace Portfolio.Application.Contact;

public interface IContactMessageRepository
{
    Task AddAsync(ContactSubmission submission, CancellationToken cancellationToken);
}
