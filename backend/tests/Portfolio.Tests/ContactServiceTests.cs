using Microsoft.Extensions.Logging.Abstractions;
using Portfolio.Application.Contact;
using Xunit;

namespace Portfolio.Tests;

public class ContactServiceTests
{
    private sealed class FakeRepository : IContactMessageRepository
    {
        public ContactSubmission? Saved { get; private set; }

        public Task AddAsync(ContactSubmission submission, CancellationToken cancellationToken)
        {
            Saved = submission;
            return Task.CompletedTask;
        }
    }

    private sealed class FakeEmailNotifier : IEmailNotifier
    {
        public int CallCount { get; private set; }

        public Task NotifyNewContactAsync(ContactSubmission submission, CancellationToken cancellationToken)
        {
            CallCount++;
            return Task.CompletedTask;
        }
    }

    private static ContactService CreateService(
        out FakeRepository repository,
        out FakeEmailNotifier emailNotifier)
    {
        repository = new FakeRepository();
        emailNotifier = new FakeEmailNotifier();
        return new ContactService(repository, emailNotifier, NullLogger<ContactService>.Instance);
    }

    [Fact]
    public async Task SubmitAsync_WithValidRequest_SavesMessageAndSendsEmail()
    {
        var service = CreateService(out var repository, out var emailNotifier);
        var request = new ContactRequestDto("مهتا", "mehta@example.com", "این یک پیام تست معتبر است.");

        var result = await service.SubmitAsync(request, CancellationToken.None);

        Assert.True(result.IsSuccess);
        Assert.Empty(result.Errors);
        Assert.NotNull(repository.Saved);
        Assert.Equal("مهتا", repository.Saved!.Name);
        Assert.Equal(1, emailNotifier.CallCount);
    }

    [Fact]
    public async Task SubmitAsync_WithInvalidEmail_ReturnsFailureAndDoesNotSave()
    {
        var service = CreateService(out var repository, out var emailNotifier);
        var request = new ContactRequestDto("مهتا", "not-an-email", "این یک پیام تست معتبر است.");

        var result = await service.SubmitAsync(request, CancellationToken.None);

        Assert.False(result.IsSuccess);
        Assert.Contains(result.Errors, e => e.Contains("ایمیل"));
        Assert.Null(repository.Saved);
        Assert.Equal(0, emailNotifier.CallCount);
    }

    [Fact]
    public async Task SubmitAsync_WithTooShortMessage_ReturnsFailure()
    {
        var service = CreateService(out var repository, out _);
        var request = new ContactRequestDto("مهتا", "mehta@example.com", "کوتاه");

        var result = await service.SubmitAsync(request, CancellationToken.None);

        Assert.False(result.IsSuccess);
        Assert.Contains(result.Errors, e => e.Contains("پیام"));
        Assert.Null(repository.Saved);
    }

    [Fact]
    public async Task SubmitAsync_WhenEmailNotifierThrows_StillReturnsSuccessBecauseMessageWasSaved()
    {
        var repository = new FakeRepository();
        var throwingNotifier = new ThrowingEmailNotifier();
        var service = new ContactService(repository, throwingNotifier, NullLogger<ContactService>.Instance);
        var request = new ContactRequestDto("مهتا", "mehta@example.com", "این یک پیام تست معتبر است.");

        var result = await service.SubmitAsync(request, CancellationToken.None);

        Assert.True(result.IsSuccess);
        Assert.NotNull(repository.Saved);
    }

    private sealed class ThrowingEmailNotifier : IEmailNotifier
    {
        public Task NotifyNewContactAsync(ContactSubmission submission, CancellationToken cancellationToken)
            => throw new InvalidOperationException("SMTP unavailable (test)");
    }
}
