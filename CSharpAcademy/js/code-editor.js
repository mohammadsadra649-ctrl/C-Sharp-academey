// ویرایشگر کد داخل صفحه: شماره خط، Tab، Ctrl+Enter، ذخیره‌ی خودکار، ریست، ورودی استاندارد و نمایش خروجی
const CodeEditor = (() => {
  const STORE_PREFIX = 'csharp-academy:code:';
  let uid = 0;

  function esc(t) {
    return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function loadSaved(id) {
    try { return window.localStorage.getItem(STORE_PREFIX + id); } catch (e) { return null; }
  }
  function save(id, code) {
    try { window.localStorage.setItem(STORE_PREFIX + id, code); } catch (e) { /* حافظه پر یا غیرفعال */ }
  }
  function clearSaved(id) {
    try { window.localStorage.removeItem(STORE_PREFIX + id); } catch (e) { /* ignore */ }
  }

  // mount(container, { id, code, stdin, title, readonly })
  function mount(container, opts) {
    const id = opts.id || ('ed' + (++uid));
    const initial = opts.code || '';
    const saved = opts.keepSaved === false ? null : loadSaved(id);
    const sid = 'ed' + (++uid);

    container.innerHTML = `
      <section class="editor" aria-label="ویرایشگر کد C#">
        <div class="editor-bar">
          <span class="editor-title">${esc(opts.title || 'ویرایشگر C#')}</span>
          <span class="editor-actions">
            <button type="button" class="btn btn-primary btn-small" data-act="run" title="Ctrl+Enter">▶ اجرا</button>
            <button type="button" class="btn btn-ghost btn-small" data-act="reset">بازگرداندن کد اولیه</button>
          </span>
        </div>
        <div class="editor-body">
          <div class="gutter" aria-hidden="true"></div>
          <textarea class="editor-text" dir="ltr" spellcheck="false" aria-label="کد برنامه" id="${sid}">${esc(saved !== null ? saved : initial)}</textarea>
        </div>
        <details class="editor-stdin">
          <summary>ورودی استاندارد (stdin)</summary>
          <textarea class="stdin-text" dir="ltr" spellcheck="false" aria-label="ورودی برنامه" placeholder="هر ورودی را در یک خط بنویسید"></textarea>
        </details>
        <div class="editor-status" aria-live="polite"></div>
        <div class="editor-output" aria-live="polite"></div>
      </section>`;

    const root = container.querySelector('.editor');
    const ta = root.querySelector('.editor-text');
    const gutter = root.querySelector('.gutter');
    const stdinTa = root.querySelector('.stdin-text');
    const status = root.querySelector('.editor-status');
    const out = root.querySelector('.editor-output');

    function paintGutter() {
      const n = ta.value.split('\n').length;
      let html = '';
      for (let i = 1; i <= n; i++) html += i + '\n';
      gutter.textContent = html;
      gutter.scrollTop = ta.scrollTop;
    }

    let saveTimer = null;
    ta.addEventListener('input', () => {
      paintGutter();
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => save(id, ta.value), 400);
    });
    ta.addEventListener('scroll', () => { gutter.scrollTop = ta.scrollTop; });

    // Tab و Shift+Tab برای تورفتگی؛ Ctrl+Enter برای اجرا
    ta.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const s = ta.selectionStart;
        const en = ta.selectionEnd;
        ta.value = ta.value.slice(0, s) + '    ' + ta.value.slice(en);
        ta.selectionStart = ta.selectionEnd = s + 4;
        ta.dispatchEvent(new Event('input'));
      } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        runNow();
      }
    });

    root.querySelector('[data-act="run"]').addEventListener('click', runNow);
    root.querySelector('[data-act="reset"]').addEventListener('click', () => {
      if (!window.confirm('کد به نسخه‌ی اولیه‌ی درس برگردد؟ تغییرات ذخیره‌شده پاک می‌شود.')) return;
      ta.value = initial;
      clearSaved(id);
      paintGutter();
      out.innerHTML = '';
      status.textContent = 'کد به حالت اولیه بازگشت.';
    });

    let busy = false;
    async function runNow() {
      if (busy) return;
      busy = true;
      status.textContent = 'در حال اجرا…';
      out.innerHTML = '';
      const t0 = performance.now();
      const res = await CodeRunner.run(ta.value, stdinTa.value);
      busy = false;
      status.textContent = '';
      out.innerHTML = renderResult(res, Math.round(performance.now() - t0));
    }

    function renderResult(res, clientMs) {
      const d = res.data || {};
      if (d.error && !d.stdout) {
        return `<div class="result result-error"><strong>خطا:</strong> ${esc(d.error)}</div>`;
      }
      const parts = [];
      if (d.compileError) parts.push('<span class="badge badge-bad">خطای کامپایل</span>');
      else if (d.timedOut) parts.push('<span class="badge badge-bad">زمان اجرا تمام شد</span>');
      else if (res.ok) parts.push('<span class="badge badge-ok">اجرا موفق</span>');
      else parts.push('<span class="badge badge-bad">خطای زمان اجرا</span>');
      parts.push(`<span class="muted small">${d.timeMs ?? clientMs} میلی‌ثانیه</span>`);

      let body = '';
      if (d.stdout) body += `<div class="result-label">خروجی</div><pre class="result-pre" dir="ltr">${esc(d.stdout)}</pre>`;
      if (!d.stdout && res.ok) body += '<div class="muted small">برنامه خروجی‌ای چاپ نکرد.</div>';
      if (d.stderr || (!res.ok && d.stdout === undefined)) {
        body += `<div class="result-label">پیام خطا</div><pre class="result-pre result-err" dir="ltr">${esc(d.stderr || d.error || '')}</pre>`;
      }
      if (d.compileError) body += '<p class="small muted">خطای کامپایل: شماره‌ی خط را در پیام بالا بررسی کنید و سمی‌کالن یا گیومه‌ها را چک کنید.</p>';
      if (d.message) body += `<p class="small muted">${esc(d.message)}</p>`;
      return `<div class="result">${parts.join(' ')}${body}</div>`;
    }

    paintGutter();
    return {
      getCode: () => ta.value,
      setCode: (c) => { ta.value = c; paintGutter(); },
      getStdin: () => stdinTa.value,
      run: runNow
    };
  }

  return { mount };
})();
