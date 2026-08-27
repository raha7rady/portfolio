using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Endpoints;
using Portfolio.Application.Contact;
using Portfolio.Infrastructure.Email;
using Portfolio.Infrastructure.Persistence;
using Portfolio.Infrastructure.Persistence.Repositories;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args
});

builder.Configuration.Sources
    .OfType<Microsoft.Extensions.Configuration.Json.JsonConfigurationSource>()
    .ToList()
    .ForEach(source => source.ReloadOnChange = false);

const string FrontendCorsPolicy = "FrontendCorsPolicy";

var allowedOrigin =
    builder.Configuration["Cors:AllowedOrigin"]
    ?? "http://localhost:3000";

// ---- Persistence ----
builder.Services.AddDbContext<PortfolioDbContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("Default")));

// ---- Application / Infrastructure DI ----
builder.Services.AddScoped<IContactMessageRepository, ContactMessageRepository>();
builder.Services.AddScoped<IEmailNotifier, EmailSender>();
builder.Services.AddScoped<ContactService>();
builder.Services.AddScoped<ContactAdminService>();

builder.Services.Configure<EmailSettings>(
    builder.Configuration.GetSection(EmailSettings.SectionName));

// ---- CORS ----
builder.Services.AddCors(options =>
{
    options.AddPolicy(FrontendCorsPolicy, policy =>
    {
        policy
            .WithOrigins(allowedOrigin)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// ---- Swagger ----
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ---- Error Handling ----
// خروجی یکدست (RFC 7807 Problem Details) برای هر خطای مدیریت‌نشده،
// به‌جای نشت Stack Trace یا پیام خام exception به کلاینت.
builder.Services.AddProblemDetails();

var app = builder.Build();

// ---- Database ----
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();

    dbContext.Database.Migrate();
}

// ---- Swagger ----
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ---- Middleware ----
// باید قبل از هر Middleware/Endpoint دیگری ثبت شود تا خطاهای مدیریت‌نشده در همه مسیرها بگیرد.
app.UseExceptionHandler();
app.UseCors(FrontendCorsPolicy);

// ---- Health Check ----
app.MapGet("/api/health", () =>
    Results.Ok(new
    {
        status = "healthy"
    }));

// ---- API Endpoints ----
app.MapContactEndpoints();
app.MapAdminContactEndpoints();

app.Run();

// برای دسترس‌پذیر بودن کلاس Program برای WebApplicationFactory در تست‌های Integration آینده.
public partial class Program;