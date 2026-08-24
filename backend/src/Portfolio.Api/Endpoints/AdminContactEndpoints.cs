using Portfolio.Api.Security;
using Portfolio.Application.Contact;

namespace Portfolio.Api.Endpoints;

/// <summary>
/// Endpointهای مدیریت پیام‌های Contact ذخیره‌شده — فقط برای صاحب پورتفولیو.
/// همه با AdminApiKeyFilter محافظت می‌شوند (هدر X-Admin-Api-Key).
/// </summary>
public static class AdminContactEndpoints
{
    public static void MapAdminContactEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/admin/contact-messages")
            .WithTags("Admin - Contact")
            .AddEndpointFilter<AdminApiKeyFilter>();

        group.MapGet(
            "/",
            async (bool? isRead, ContactAdminService adminService, CancellationToken cancellationToken) =>
            {
                var messages = await adminService.GetMessagesAsync(isRead, cancellationToken);
                return Results.Ok(messages);
            })
            .WithName("ListContactMessages")
            .Produces<IReadOnlyList<ContactMessageSummary>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status401Unauthorized)
            .Produces(StatusCodes.Status503ServiceUnavailable);

        group.MapGet(
            "/{id:guid}",
            async (Guid id, ContactAdminService adminService, CancellationToken cancellationToken) =>
            {
                var message = await adminService.GetMessageAsync(id, cancellationToken);
                return message is not null ? Results.Ok(message) : Results.NotFound();
            })
            .WithName("GetContactMessage")
            .Produces<ContactMessageSummary>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status401Unauthorized)
            .Produces(StatusCodes.Status404NotFound);

        group.MapPatch(
            "/{id:guid}/read",
            async (Guid id, ContactAdminService adminService, CancellationToken cancellationToken) =>
            {
                var marked = await adminService.MarkAsReadAsync(id, cancellationToken);
                return marked ? Results.NoContent() : Results.NotFound();
            })
            .WithName("MarkContactMessageAsRead")
            .Produces(StatusCodes.Status204NoContent)
            .Produces(StatusCodes.Status401Unauthorized)
            .Produces(StatusCodes.Status404NotFound);
    }
}
