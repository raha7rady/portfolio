namespace Portfolio.Application.Contact;

public interface IEmailNotifier
{
    Task NotifyNewContactAsync(ContactSubmission submission, CancellationToken cancellationToken);
}
