// این کامپوننت عمداً یک <script> خام رندر می‌کند (نه منطق React) چون باید قبل از Hydration
// و قبل از رنگ‌آمیزی صفحه اجرا شود — تنها راه جلوگیری از "پرش" تم یا جهت متن در بارگذاری اول.
const INIT_SCRIPT = `
(function () {
  try {
    var theme = localStorage.getItem('theme');
    var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    var resolvedTheme = theme || (prefersLight ? 'light' : 'dark');
    if (resolvedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }

    var locale = localStorage.getItem('locale') || 'fa';
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
  } catch (e) {}
})();
`;

export default function AppInitScript() {
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: INIT_SCRIPT }} />;
}
