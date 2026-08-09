using Portfolio.Application.Contact;

namespace Portfolio.Api.Endpoints;

public static class ContactEndpoints
{
    public static void MapContactEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/contact").WithTags("Contact");

        group.MapPost(
            "/",
            async (ContactRequestDto request, ContactService contactService, CancellationToken cancellationToken) =>
            {
                var result = await contactService.SubmitAsync(request, cancellationToken);

                return result.IsSuccess
                    ? Results.Ok(new { message = "پیام شما با موفقیت ارسال شد." })
                    : Results.BadRequest(new { errors = result.Errors });
            })
            .WithName("SubmitContactMessage")
            .Produces(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status400BadRequest);
    }
}
