using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Endpoints;
using Portfolio.Application.Contact;
using Portfolio.Infrastructure.Email;
using Portfolio.Infrastructure.Persistence;
using Portfolio.Infrastructure.Persistence.Repositories;

var builder = WebApplication.CreateBuilder(args);

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
app.UseCors(FrontendCorsPolicy);

// ---- Health Check ----
app.MapGet("/api/health", () =>
    Results.Ok(new
    {
        status = "healthy"
    }));

// ---- API Endpoints ----
app.MapContactEndpoints();

app.Run();