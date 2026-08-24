using Microsoft.Extensions.Logging.Abstractions;
using Portfolio.Application.Contact;
using Xunit;

namespace Portfolio.Tests;

public class ContactAdminServiceTests
{
    private sealed class FakeAdminRepository : IContactMessageRepository
    {
        private readonly List<ContactMessageSummary> _messages = new();

        public FakeAdminRepository(params ContactMessageSummary[] seed) => _messages.AddRange(seed);

        public Task AddAsync(ContactSubmission submission, CancellationToken cancellationToken)
        {
            _messages.Add(new ContactMessageSummary(
                Guid.NewGuid(),
                submission.Name,
                submission.Email,
                submission.Message,
                submission.CreatedAtUtc,
                IsRead: false));
            return Task.CompletedTask;
        }

        public Task<IReadOnlyList<ContactMessageSummary>> GetAllAsync(bool? isRead, CancellationToken cancellationToken)
        {
            IEnumerable<ContactMessageSummary> query = _messages;
            if (isRead.HasValue)
            {
                query = query.Where(m => m.IsRead == isRead.Value);
            }

            return Task.FromResult<IReadOnlyList<ContactMessageSummary>>(
                query.OrderByDescending(m => m.CreatedAtUtc).ToList());
        }

        public Task<ContactMessageSummary?> GetByIdAsync(Guid id, CancellationToken cancellationToken) =>
            Task.FromResult(_messages.FirstOrDefault(m => m.Id == id));

        public Task<bool> MarkAsReadAsync(Guid id, CancellationToken cancellationToken)
        {
            var index = _messages.FindIndex(m => m.Id == id);
            if (index < 0)
            {
                return Task.FromResult(false);
            }

            var current = _messages[index];
            _messages[index] = current with { IsRead = true };
            return Task.FromResult(true);
        }
    }

    private static readonly ContactMessageSummary ReadMessage = new(
        Guid.NewGuid(), "مهتا", "mehta@example.com", "پیام خوانده‌شده", DateTimeOffset.UtcNow.AddDays(-1), IsRead: true);

    private static readonly ContactMessageSummary UnreadMessage = new(
        Guid.NewGuid(), "سارا", "sara@example.com", "پیام نخوانده", DateTimeOffset.UtcNow, IsRead: false);

    [Fact]
    public async Task GetMessagesAsync_WithoutFilter_ReturnsAllMessages()
    {
        var repository = new FakeAdminRepository(ReadMessage, UnreadMessage);
        var service = new ContactAdminService(repository, NullLogger<ContactAdminService>.Instance);

        var messages = await service.GetMessagesAsync(isRead: null, CancellationToken.None);

        Assert.Equal(2, messages.Count);
    }

    [Fact]
    public async Task GetMessagesAsync_FilteredByUnread_ReturnsOnlyUnread()
    {
        var repository = new FakeAdminRepository(ReadMessage, UnreadMessage);
        var service = new ContactAdminService(repository, NullLogger<ContactAdminService>.Instance);

        var messages = await service.GetMessagesAsync(isRead: false, CancellationToken.None);

        Assert.Single(messages);
        Assert.Equal(UnreadMessage.Id, messages[0].Id);
    }

    [Fact]
    public async Task GetMessageAsync_WithExistingId_ReturnsMessage()
    {
        var repository = new FakeAdminRepository(UnreadMessage);
        var service = new ContactAdminService(repository, NullLogger<ContactAdminService>.Instance);

        var message = await service.GetMessageAsync(UnreadMessage.Id, CancellationToken.None);

        Assert.NotNull(message);
        Assert.Equal(UnreadMessage.Email, message!.Email);
    }

    [Fact]
    public async Task GetMessageAsync_WithUnknownId_ReturnsNull()
    {
        var repository = new FakeAdminRepository(UnreadMessage);
        var service = new ContactAdminService(repository, NullLogger<ContactAdminService>.Instance);

        var message = await service.GetMessageAsync(Guid.NewGuid(), CancellationToken.None);

        Assert.Null(message);
    }

    [Fact]
    public async Task MarkAsReadAsync_WithExistingId_ReturnsTrueAndMarksMessage()
    {
        var repository = new FakeAdminRepository(UnreadMessage);
        var service = new ContactAdminService(repository, NullLogger<ContactAdminService>.Instance);

        var marked = await service.MarkAsReadAsync(UnreadMessage.Id, CancellationToken.None);
        var updated = await service.GetMessageAsync(UnreadMessage.Id, CancellationToken.None);

        Assert.True(marked);
        Assert.True(updated!.IsRead);
    }

    [Fact]
    public async Task MarkAsReadAsync_WithUnknownId_ReturnsFalse()
    {
        var repository = new FakeAdminRepository();
        var service = new ContactAdminService(repository, NullLogger<ContactAdminService>.Instance);

        var marked = await service.MarkAsReadAsync(Guid.NewGuid(), CancellationToken.None);

        Assert.False(marked);
    }
}
