using Microsoft.EntityFrameworkCore;
using Portfolio.Infrastructure.Persistence.Entities;

namespace Portfolio.Infrastructure.Persistence;

public sealed class PortfolioDbContext : DbContext
{
    public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : base(options)
    {
    }

    public DbSet<ContactMessageEntity> ContactMessages => Set<ContactMessageEntity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ContactMessageEntity>(entity =>
        {
            entity.ToTable("ContactMessages");
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(256);

            entity.Property(e => e.Message)
                .IsRequired()
                .HasMaxLength(2000);

            entity.Property(e => e.CreatedAtUtc)
                .IsRequired();
        });
    }
}
