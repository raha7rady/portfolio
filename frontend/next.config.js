/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // خروجی standalone یک bundle مینیمال با فقط node_modules مورد نیاز واقعی می‌سازد —
  // برای Image Docker سبک‌تر در فاز ۱۰ لازم است (بدون این، کل node_modules کپی می‌شود).
  output: "standalone",
  images: {
    // اسکرین‌شات‌های پروژه‌ها فعلاً از public/images سرو می‌شوند؛
    // در صورت استفاده از CDN خارجی در فازهای بعد، دامنه‌اش اینجا اضافه می‌شود.
    remotePatterns: [],
  },
};

module.exports = nextConfig;
