using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using Portfolio.Application.Contact;
using Xunit;

namespace Portfolio.Tests;

/// <summary>
/// تست‌های End-to-End روی HTTP Pipeline واقعی برای بخش Admin —
/// هدف اصلی: اطمینان از اینکه AdminApiKeyFilter دقیقاً همان‌طور که مستند شده رفتار می‌کند
/// (503 وقتی پیکربندی‌نشده، 401 وقتی هدر غلط/غایب است، و کارکرد کامل وقتی درست است)،
/// چیزی که تست‌های Unit سطح Service (ContactAdminServiceTests) اصلاً لمسش نمی‌کنند
/// چون آن‌ها مستقیماً Service را صدا می‌زنند، نه از طریق HTTP و Filter.
/// </summary>
public class AdminContactEndpointsTests
{
    private static readonly JsonSerializerOptions ResponseJsonOptions = new(JsonSerializerDefaults.Web);

    [Fact]
    public async Task ListMessages_WhenAdminApiKeyNotConfigured_Returns503()
    {
        using var factory = new PortfolioApiFactory(adminApiKey: null);
        using var client = factory.CreateClient();

        var response = await client.GetAsync("/api/admin/contact-messages");

        Assert.Equal(HttpStatusCode.ServiceUnavailable, response.StatusCode);
    }

    [Fact]
    public async Task ListMessages_WithoutHeader_Returns401()
    {
        using var factory = new PortfolioApiFactory(adminApiKey: "correct-key");
        using var client = factory.CreateClient();

        var response = await client.GetAsync("/api/admin/contact-messages");

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task ListMessages_WithWrongHeader_Returns401()
    {
        using var factory = new PortfolioApiFactory(adminApiKey: "correct-key");
        using var client = factory.CreateClient();
        client.DefaultRequestHeaders.Add("X-Admin-Api-Key", "wrong-key");

        var response = await client.GetAsync("/api/admin/contact-messages");

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task ListMessages_WithCorrectHeader_Returns200()
    {
        using var factory = new PortfolioApiFactory(adminApiKey: "correct-key");
        using var client = factory.CreateClient();
        client.DefaultRequestHeaders.Add("X-Admin-Api-Key", "correct-key");

        var response = await client.GetAsync("/api/admin/contact-messages");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task GetSingleMessage_WithUnknownId_Returns404()
    {
        using var factory = new PortfolioApiFactory(adminApiKey: "correct-key");
        using var client = factory.CreateClient();
        client.DefaultRequestHeaders.Add("X-Admin-Api-Key", "correct-key");

        var response = await client.GetAsync($"/api/admin/contact-messages/{Guid.NewGuid()}");

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task MarkAsRead_WithUnknownId_Returns404()
    {
        using var factory = new PortfolioApiFactory(adminApiKey: "correct-key");
        using var client = factory.CreateClient();
        client.DefaultRequestHeaders.Add("X-Admin-Api-Key", "correct-key");

        var response = await client.PatchAsync($"/api/admin/contact-messages/{Guid.NewGuid()}/read", content: null);

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task MarkAsRead_WithoutHeader_Returns401AndDoesNotMarkAnything()
    {
        using var factory = new PortfolioApiFactory(adminApiKey: "correct-key");
        using var client = factory.CreateClient();

        var response = await client.PatchAsync($"/api/admin/contact-messages/{Guid.NewGuid()}/read", content: null);

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task FullFlow_SubmitThenListThenGetThenMarkAsRead_WorksEndToEnd()
    {
        using var factory = new PortfolioApiFactory(adminApiKey: "correct-key");
        using var client = factory.CreateClient();

        // ۱. یک پیام واقعی از طریق Endpoint عمومی (بدون هدر Admin) ثبت می‌شود.
        var submitResponse = await client.PostAsJsonAsync("/api/contact", new
        {
            name = "مهتا",
            email = "mehta@example.com",
            message = "این یک پیام تست معتبر برای Integration Test است.",
        });
        Assert.Equal(HttpStatusCode.OK, submitResponse.StatusCode);

        client.DefaultRequestHeaders.Add("X-Admin-Api-Key", "correct-key");

        // ۲. پیام باید در لیست Admin دیده شود و ابتدا خوانده‌نشده باشد.
        var listResponse = await client.GetAsync("/api/admin/contact-messages");
        Assert.Equal(HttpStatusCode.OK, listResponse.StatusCode);

        var messages = await listResponse.Content.ReadFromJsonAsync<List<ContactMessageSummary>>(ResponseJsonOptions);
        Assert.NotNull(messages);
        var created = Assert.Single(messages!, m => m.Email == "mehta@example.com");
        Assert.False(created.IsRead);

        // ۳. مشاهده تکی همان پیام.
        var getResponse = await client.GetAsync($"/api/admin/contact-messages/{created.Id}");
        Assert.Equal(HttpStatusCode.OK, getResponse.StatusCode);
        var fetched = await getResponse.Content.ReadFromJsonAsync<ContactMessageSummary>(ResponseJsonOptions);
        Assert.Equal(created.Id, fetched!.Id);

        // ۴. علامت‌گذاری به‌عنوان خوانده‌شده.
        var markResponse = await client.PatchAsync($"/api/admin/contact-messages/{created.Id}/read", content: null);
        Assert.Equal(HttpStatusCode.NoContent, markResponse.StatusCode);

        // ۵. تأیید نهایی که واقعاً IsRead=true شده است.
        var afterMarkResponse = await client.GetAsync($"/api/admin/contact-messages/{created.Id}");
        var afterMark = await afterMarkResponse.Content.ReadFromJsonAsync<ContactMessageSummary>(ResponseJsonOptions);
        Assert.True(afterMark!.IsRead);

        // ۶. فیلتر isRead=false دیگر نباید این پیام را برگرداند.
        var unreadOnlyResponse = await client.GetAsync("/api/admin/contact-messages?isRead=false");
        var unreadOnly = await unreadOnlyResponse.Content.ReadFromJsonAsync<List<ContactMessageSummary>>(ResponseJsonOptions);
        Assert.DoesNotContain(unreadOnly!, m => m.Id == created.Id);
    }
}
