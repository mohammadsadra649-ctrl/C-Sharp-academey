// مدیریت حالت روشن و تاریک: ذخیره‌ی انتخاب کاربر و اعمال فوری روی صفحه
const ThemeManager = (() => {
  const KEY = 'csharp-academy:theme';

  function current() {
    try { return window.localStorage.getItem(KEY) === 'dark' ? 'dark' : 'light'; }
    catch (err) { return 'light'; }
  }

  function apply(mode) {
    document.documentElement.setAttribute('data-theme', mode);
    try { window.localStorage.setItem(KEY, mode); } catch (err) { /* حافظه در دسترس نیست */ }
  }

  function toggle() {
    apply(current() === 'dark' ? 'light' : 'dark');
    return current();
  }

  // اعمال اولیه، پیش از نمایش کامل صفحه
  apply(current());

  return { current, apply, toggle };
})();
