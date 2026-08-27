# ---- مرحله ۱: Build و Publish با SDK کامل ----
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY . .
RUN dotnet restore Portfolio.sln
RUN dotnet publish src/Portfolio.Api/Portfolio.Api.csproj -c Release -o /app/publish --no-restore

# ---- مرحله ۲: اجرا فقط با Runtime سبک‌تر (بدون SDK) ----
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# توجه: ASPNETCORE_URLS دیگر اینجا هارد-کد نمی‌شود. Program.cs به‌صورت پویا
# از متغیر محیطی PORT (که Render خودش تزریق می‌کند، پیش‌فرض 10000) استفاده
# می‌کند و اگر PORT ست نشده باشد (مثلاً اجرای محلی با docker-compose)،
# روی 8080 fallback می‌کند. EXPOSE فقط جنبه مستندسازی دارد.
EXPOSE 8080

ENTRYPOINT ["dotnet", "Portfolio.Api.dll"]
