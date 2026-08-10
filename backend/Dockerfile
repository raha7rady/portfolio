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

# پورت پیش‌فرض Kestrel داخل کانتینر — در appsettings.json مقدار متفاوتی برای
# اجرای مستقیم (بدون Docker) تنظیم نشده بود، پس اینجا صریح مشخص می‌شود.
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "Portfolio.Api.dll"]
