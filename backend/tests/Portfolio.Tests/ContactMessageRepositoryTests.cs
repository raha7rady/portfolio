using Microsoft.EntityFrameworkCore;
using Portfolio.Application.Contact;
using Portfolio.Infrastructure.Persistence;
using Portfolio.Infrastructure.Persistence.Repositories;
using Xunit;

namespace Portfolio.Tests;

/// <summary>
/// تست‌های Repository واقعی (نه Fake) روی یک PortfolioDbContext درون‌حافظه‌ای —
/// هدف: اطمینان از رفتار درست Query/Filter/Order/Update واقعی روی EF Core،
/// نه فقط منطق Service که در ContactAdminServiceTests با Fake تست شده.
/// هر تست یک نام دیتابیس درون‌حافظه‌ای منحصربه‌فرد می‌سازد تا تست‌ها روی هم اثر نگذارند.
/// </summary>
public class ContactMessageRepositoryTests
{
    private static PortfolioDbContext CreateContext()
    {
        var options = new DbContextOptionsBuilder<PortfolioDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new PortfolioDbContext(options);
    }

    private static ContactSubmission CreateSubmission(
        string name = "مهتا",
        string email = "mehta@example.com",
        DateTimeOffset? createdAtUtc = null) =>
        new(name, email, "این یک پیام تست معتبر با طول کافی است.", createdAtUtc ?? DateTimeOffset.UtcNow);

    [Fact]
    public async Task AddAsync_SavesMessageWithGeneratedIdAndIsReadFalse()
    {
        await using var context = CreateContext();
        var repository = new ContactMessageRepository(context);
        var submission = CreateSubmission();

        await repository.AddAsync(submission, CancellationToken.None);

        var saved = await context.ContactMessages.SingleAsync();
        Assert.NotEqual(Guid.Empty, saved.Id);
        Assert.Equal(submission.Name, saved.Name);
        Assert.Equal(submission.Email, saved.Email);
        Assert.Equal(submission.Message, saved.Message);
        Assert.False(saved.IsRead);
    }

    [Fact]
    public async Task GetAllAsync_WithoutFilter_ReturnsAllMessagesNewestFirst()
    {
        await using var context = CreateContext();
        var repository = new ContactMessageRepository(context);
        var older = CreateSubmission("سارا", "sara@example.com", DateTimeOffset.UtcNow.AddDays(-2));
        var newer = CreateSubmission("مهتا", "mehta@example.com", DateTimeOffset.UtcNow);

        await repository.AddAsync(older, CancellationToken.None);
        await repository.AddAsync(newer, CancellationToken.None);

        var messages = await repository.GetAllAsync(isRead: null, CancellationToken.None);

        Assert.Equal(2, messages.Count);
        Assert.Equal("مهتا", messages[0].Name);
        Assert.Equal("سارا", messages[1].Name);
    }

    [Fact]
    public async Task GetAllAsync_FilteredByIsRead_ReturnsOnlyMatchingMessages()
    {
        await using var context = CreateContext();
        var repository = new ContactMessageRepository(context);

        await repository.AddAsync(CreateSubmission("مهتا", "mehta@example.com"), CancellationToken.None);
        var afterFirstInsert = await repository.GetAllAsync(null, CancellationToken.None);
        await repository.MarkAsReadAsync(afterFirstInsert[0].Id, CancellationToken.None);
        await repository.AddAsync(CreateSubmission("سارا", "sara@example.com"), CancellationToken.None);

        var unread = await repository.GetAllAsync(isRead: false, CancellationToken.None);
        var read = await repository.GetAllAsync(isRead: true, CancellationToken.None);

        Assert.Single(unread);
        Assert.Equal("سارا", unread[0].Name);
        Assert.Single(read);
        Assert.Equal("مهتا", read[0].Name);
    }

    [Fact]
    public async Task GetByIdAsync_WithExistingId_ReturnsMatchingMessage()
    {
        await using var context = CreateContext();
        var repository = new ContactMessageRepository(context);
        await repository.AddAsync(CreateSubmission(), CancellationToken.None);
        var saved = await context.ContactMessages.SingleAsync();

        var message = await repository.GetByIdAsync(saved.Id, CancellationToken.None);

        Assert.NotNull(message);
        Assert.Equal(saved.Id, message!.Id);
        Assert.Equal(saved.Email, message.Email);
    }

    [Fact]
    public async Task GetByIdAsync_WithUnknownId_ReturnsNull()
    {
        await using var context = CreateContext();
        var repository = new ContactMessageRepository(context);

        var message = await repository.GetByIdAsync(Guid.NewGuid(), CancellationToken.None);

        Assert.Null(message);
    }

    [Fact]
    public async Task MarkAsReadAsync_WithExistingId_PersistsIsReadTrueAndReturnsTrue()
    {
        await using var context = CreateContext();
        var repository = new ContactMessageRepository(context);
        await repository.AddAsync(CreateSubmission(), CancellationToken.None);
        var saved = await context.ContactMessages.AsNoTracking().SingleAsync();

        var result = await repository.MarkAsReadAsync(saved.Id, CancellationToken.None);

        Assert.True(result);
        var updated = await context.ContactMessages.AsNoTracking().SingleAsync();
        Assert.True(updated.IsRead);
    }

    [Fact]
    public async Task MarkAsReadAsync_WhenAlreadyRead_StaysReadAndStillReturnsTrue()
    {
        await using var context = CreateContext();
        var repository = new ContactMessageRepository(context);
        await repository.AddAsync(CreateSubmission(), CancellationToken.None);
        var saved = await context.ContactMessages.AsNoTracking().SingleAsync();
        await repository.MarkAsReadAsync(saved.Id, CancellationToken.None);

        var result = await repository.MarkAsReadAsync(saved.Id, CancellationToken.None);

        Assert.True(result);
        var updated = await context.ContactMessages.AsNoTracking().SingleAsync();
        Assert.True(updated.IsRead);
    }

    [Fact]
    public async Task MarkAsReadAsync_WithUnknownId_ReturnsFalseAndChangesNothing()
    {
        await using var context = CreateContext();
        var repository = new ContactMessageRepository(context);
        await repository.AddAsync(CreateSubmission(), CancellationToken.None);

        var result = await repository.MarkAsReadAsync(Guid.NewGuid(), CancellationToken.None);

        Assert.False(result);
        var saved = await context.ContactMessages.SingleAsync();
        Assert.False(saved.IsRead);
    }
}
