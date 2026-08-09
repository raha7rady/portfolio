/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // اسکرین‌شات‌های پروژه‌ها فعلاً از public/images سرو می‌شوند؛
    // در صورت استفاده از CDN خارجی در فازهای بعد، دامنه‌اش اینجا اضافه می‌شود.
    remotePatterns: [],
  },
};

module.exports = nextConfig;
