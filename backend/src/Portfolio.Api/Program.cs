using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Endpoints;
using Portfolio.Application.Contact;
using Portfolio.Infrastructure.Email;
using Portfolio.Infrastructure.Persistence;
using Portfolio.Infrastructure.Persistence.Repositories;

var builder = WebApplication.CreateBuilder(args);

const string FrontendCorsPolicy = "FrontendCorsPolicy";
var allowedOrigin = builder.Configuration["Cors:AllowedOrigin"] ?? "http://localhost:3000";

// ---- Persistence ----
builder.Services.AddDbContext<PortfolioDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default")));

// ---- Application / Infrastructure DI ----
builder.Services.AddScoped<IContactMessageRepository, ContactMessageRepository>();
builder.Services.AddScoped<IEmailNotifier, EmailSender>();
builder.Services.AddScoped<ContactService>();
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection(EmailSettings.SectionName));

// ---- CORS — فقط فرانت‌اند این پروژه مجاز است ----
builder.Services.AddCors(options =>
{
    options.AddPolicy(FrontendCorsPolicy, policy =>
    {
        policy.WithOrigins(allowedOrigin)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// ---- Swagger (فقط برای مستندسازی/تست دستی endpoint در فاز توسعه) ----
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// اعمال خودکار Migration در زمان اجرا — مخصوصاً برای docker-compose (فاز ۱۰) لازم است
// چون یک کانتینر تازه هیچ فایل دیتابیسی ندارد؛ در محیط توسعه محلی هم بی‌ضرر است
// (اگر پیش‌تر با dotnet ef database update اعمال شده باشد، این خط کاری انجام نمی‌دهد).
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
    dbContext.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// UseHttpsRedirection عمداً حذف شد: در حالت Docker/production معمولاً یک Reverse Proxy
// یا پلتفرم هاست (Render/Railway) خودش TLS را Terminate می‌کند و کانتینر فقط HTTP
// می‌بیند؛ نگه‌داشتن این Middleware باعث Redirect به یک پورت HTTPS ناموجود می‌شد.
app.UseCors(FrontendCorsPolicy);

app.MapContactEndpoints();

app.Run();
