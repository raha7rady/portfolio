namespace Portfolio.Infrastructure.Persistence.Entities;

public sealed class ContactMessageEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public DateTimeOffset CreatedAtUtc { get; set; }
    public bool IsRead { get; set; }
}
