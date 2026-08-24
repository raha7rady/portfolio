using System.Net;
using System.Net.Http.Json;
using Xunit;

namespace Portfolio.Tests;

/// <summary>
/// تست‌های End-to-End روی خودِ HTTP Pipeline برای Endpointهای عمومی (غیر-Admin) —
/// یعنی چیزی که با WebApplicationFactory واقعاً از طریق HTTP فراخوانی می‌شود، نه فقط
/// فراخوانی مستقیم ContactService (که در ContactServiceTests پوشش داده شده).
/// </summary>
public class ContactEndpointsTests
{
    [Fact]
    public async Task HealthCheck_ReturnsHealthy()
    {
        using var factory = new PortfolioApiFactory(adminApiKey: null);
        using var client = factory.CreateClient();

        var response = await client.GetAsync("/api/health");

        response.EnsureSuccessStatusCode();
    }

    [Fact]
    public async Task SubmitContact_WithValidRequest_Returns200()
    {
        using var factory = new PortfolioApiFactory(adminApiKey: null);
        using var client = factory.CreateClient();

        var response = await client.PostAsJsonAsync("/api/contact", new
        {
            name = "مهتا",
            email = "mehta@example.com",
            message = "این یک پیام تست معتبر برای Integration Test است.",
        });

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task SubmitContact_WithInvalidRequest_Returns400WithErrors()
    {
        using var factory = new PortfolioApiFactory(adminApiKey: null);
        using var client = factory.CreateClient();

        var response = await client.PostAsJsonAsync("/api/contact", new
        {
            name = "",
            email = "not-an-email",
            message = "کوتاه",
        });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
}
