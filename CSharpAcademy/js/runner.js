// کلاینت اجرای کد: ارسال به api/run.php و بازگرداندن نتیجه؛ اگر سرور در دسترس نباشد پیام مناسب می‌دهد
const CodeRunner = (() => {
  const ENDPOINT = (window.location.pathname.includes('/pages/') ? '../' : '') + 'api/run.php';

  async function run(code, stdin = '') {
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, stdin })
      });
      let data;
      try { data = await res.json(); } catch (e) { data = { error: 'پاسخ سرور قابل خواندن نیست (کد ' + res.status + ').' }; }
      return { ok: !!data.ok, data };
    } catch (err) {
      return {
        ok: false,
        data: { error: 'سرویس اجرای کد در دسترس نیست. XAMPP (Apache و PHP) را روشن کنید و آدرس سایت را از localhost باز کنید.' }
      };
    }
  }

  return { run };
})();
