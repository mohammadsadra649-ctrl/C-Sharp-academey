// توابع مشترک: هدر، پرش به محتوا، دکمه‌ی تم، نمایش کد، امنیت متن
const Common = (() => {
  function esc(text) {
    return String(text)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // base: '' برای index.html و '../' برای صفحات داخل pages
  function renderHeader(base) {
    const host = document.getElementById('site-header');
    if (!host) return;
    const gl = base ? 'glossary.html' : 'pages/glossary.html';
    const ex = base ? 'exams.html' : 'pages/exams.html';
    const pr = base ? 'progress.html' : 'pages/progress.html';
    host.innerHTML = `
      <a class="skip-link" href="#main">پرش به محتوای اصلی</a>
      <header class="site-header">
        <a class="brand" href="${base}index.html" aria-label="صفحه اصلی آکادمی C#">
          <span class="brand-mark" aria-hidden="true">C#</span>
          <span>آکادمی C#</span>
        </a>
        <nav class="main-nav" aria-label="ناوبری اصلی">
          <a href="${base}index.html#topics">موضوعات</a>
          <a href="${base}index.html#search">جست‌وجو</a>
          <a href="${base}index.html#path">مسیر یادگیری</a>
          <a href="${gl}">واژه‌نامه</a>
          <a href="${ex}">آزمون‌ها</a>
          <a href="${pr}">پیشرفت</a>
        </nav>
        <button type="button" class="theme-btn" id="theme-btn" aria-label="تغییر حالت روشن و تاریک">
          <span aria-hidden="true">◐</span> <span id="theme-label">تاریک</span>
        </button>
      </header>`;
    bindTheme();
  }

  function bindTheme() {
    const btn = document.getElementById('theme-btn');
    const label = document.getElementById('theme-label');
    if (!btn || typeof ThemeManager === 'undefined') return;
    const sync = () => { label.textContent = ThemeManager.current() === 'dark' ? 'روشن' : 'تاریک'; };
    sync();
    btn.addEventListener('click', () => { ThemeManager.toggle(); sync(); });
  }

  // نمایش کد با شماره خط، دکمه کپی و توضیح‌های اختیاری خط‌ها
  function renderCode(code, notes = {}) {
    const numbered = code.split('\n').map((line, i) => {
      const n = i + 1;
      const cls = notes[n] ? 'code-line has-note' : 'code-line';
      return `<span class="${cls}"><span class="ln">${n}</span><span class="lc">${esc(line) || ' '}</span></span>`;
    }).join('');
    const keys = Object.keys(notes);
    const noteHtml = keys.length
      ? `<div class="code-notes hidden">${keys.map(n =>
          `<p><strong>خط ${esc(n)}:</strong> ${esc(notes[n])}</p>`).join('')}</div>
         <button type="button" class="btn btn-ghost btn-small notes-toggle">نمایش توضیح خط‌ها</button>`
      : '';
    return `
      <div class="code-block">
        <div class="code-toolbar">
          <span class="code-lang">C#</span>
          <button type="button" class="btn btn-ghost btn-small copy-btn">کپی کد</button>
        </div>
        <pre class="code-pre" dir="ltr"><code class="code-body">${numbered}</code></pre>
        <textarea class="copy-source" hidden>${esc(code)}</textarea>
        ${noteHtml}
      </div>`;
  }

  function bindCodeBlocks(root) {
    root.querySelectorAll('.code-block').forEach(block => {
      const copyBtn = block.querySelector('.copy-btn');
      const src = block.querySelector('.copy-source');
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(src.value);
          copyBtn.textContent = 'کپی شد';
        } catch (err) {
          copyBtn.textContent = 'کپی نشد';
        }
        setTimeout(() => (copyBtn.textContent = 'کپی کد'), 1600);
      });
      const toggle = block.querySelector('.notes-toggle');
      if (toggle) {
        const notes = block.querySelector('.code-notes');
        toggle.addEventListener('click', () => {
          const open = notes.classList.toggle('hidden') === false;
          toggle.textContent = open ? 'پنهان کردن توضیح خط‌ها' : 'نمایش توضیح خط‌ها';
        });
      }
    });
  }

  return { esc, renderHeader, renderCode, bindCodeBlocks };
})();
