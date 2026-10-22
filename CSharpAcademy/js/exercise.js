// صفحه‌ی تمرین: صورت مسئله، راهنما، ویرایشگر، اجرای آزمون‌ها و راه‌حل پس از سه تلاش
(() => {
  const { esc } = Common;
  Common.renderHeader('../');
  const root = document.getElementById('exercise-root');
  const id = new URLSearchParams(window.location.search).get('id');
  const ex = (window.EXERCISES || []).find(e => e.id === id);

  if (!ex) {
    root.innerHTML = '<h1>تمرین پیدا نشد</h1><p><a href="exercises.html">بازگشت به فهرست تمرین‌ها</a></p>';
    return;
  }
  document.title = ex.title + ' — تمرین';
  let attempts = 0;
  let hintLevel = 0;

  root.innerHTML = `
    <nav class="crumbs"><a href="../index.html">صفحه اصلی</a> / <a href="exercises.html">تمرین‌ها</a> / ${esc(ex.title)}</nav>
    <header class="page-head">
      <h1>${esc(ex.title)}</h1>
      <p class="muted small">سطح: ${esc(ex.level)} — درس مرتبط: <a href="lesson.html?id=${encodeURIComponent(ex.lesson)}">${esc((Curriculum.findLesson(ex.lesson) || {}).title || ex.lesson)}</a></p>
    </header>
    <section class="ex-statement">
      <p><strong>هدف:</strong> ${esc(ex.goal)}</p>
      <p>${esc(ex.statement)}</p>
      ${ex.example ? `<p class="small"><strong>نمونه:</strong></p>
      <pre class="output" dir="ltr">ورودی:\n${esc(ex.example.input || '(بدون ورودی)')}\nخروجی:\n${esc(ex.example.output)}</pre>` : ''}
    </section>
    <div class="ex-actions">
      <button type="button" class="btn btn-ghost" id="hint-btn">راهنما (${ex.hints.length})</button>
    </div>
    <ul class="ex-hints" id="hints" hidden></ul>
    <div id="editor-mount"></div>
    <div class="ex-actions">
      <button type="button" class="btn btn-primary" id="check-btn">بررسی با آزمون‌ها</button>
      <span class="muted small" id="attempt-info"></span>
    </div>
    <section id="tests" aria-live="polite"></section>
    <section id="solution-box" hidden>
      <h2>راه‌حل</h2>
      <pre class="g-code" dir="ltr"><code>${esc(ex.solution)}</code></pre>
    </section>`;

  const editor = CodeEditor.mount(document.getElementById('editor-mount'), {
    id: 'ex:' + ex.id, code: ex.starter, title: 'کد شما'
  });

  document.getElementById('hint-btn').addEventListener('click', () => {
    const box = document.getElementById('hints');
    if (hintLevel < ex.hints.length) {
      box.hidden = false;
      const li = document.createElement('li');
      li.textContent = ex.hints[hintLevel++];
      box.appendChild(li);
    }
  });

  const norm = s => String(s).replace(/\r\n/g, '\n').split('\n').map(x => x.trimEnd()).join('\n').trim();

  document.getElementById('check-btn').addEventListener('click', async () => {
    const btn = document.getElementById('check-btn');
    btn.disabled = true;
    const testsBox = document.getElementById('tests');
    testsBox.innerHTML = '<p class="muted">در حال اجرای آزمون‌ها…</p>';

    attempts++;
    let passed = 0;
    const rows = [];
    for (let i = 0; i < ex.tests.length; i++) {
      const t = ex.tests[i];
      const res = await CodeRunner.run(editor.getCode(), t.input);
      const got = res.data && res.data.stdout !== undefined ? norm(res.data.stdout) : null;
      const ok = res.ok && got === norm(t.output);
      if (ok) passed++;
      let note = '';
      if (!res.data || res.data.error) note = esc(res.data && res.data.error || 'خطای سرور');
      else if (res.data.compileError) note = 'خطای کامپایل؛ کد را بررسی کنید.';
      else if (res.data.timedOut) note = 'زمان اجرا تمام شد.';
      rows.push(`<li class="${ok ? 'test-ok' : 'test-bad'}">
        <span class="badge ${ok ? 'badge-ok' : 'badge-bad'}">${ok ? 'درست' : 'نادرست'}</span>
        آزمون ${i + 1}${t.input ? ' (ورودی: ' + esc(t.input.replace(/\n/g, '، ')) + ')' : ''}
        ${ok ? '' : `<div class="small muted">انتظار: <code dir="ltr">${esc(norm(t.output))}</code> — دریافت: <code dir="ltr">${esc(got === null ? '—' : got)}</code> ${note ? '<br>' + note : ''}</div>`}
      </li>`);
    }

    const all = passed === ex.tests.length;
    testsBox.innerHTML = `
      <h2>نتیجه: ${passed} از ${ex.tests.length} آزمون</h2>
      <p class="${all ? 'quiz-feedback ok' : 'quiz-feedback bad'}">${all ? 'آفرین! همه‌ی آزمون‌ها درست است.' : 'هنوز کامل نیست؛ خطاها را بررسی کنید.'}</p>
      <ul class="test-list">${rows.join('')}</ul>`;

    Progress.saveQuiz('ex:' + ex.id, passed, ex.tests.length);
    document.getElementById('attempt-info').textContent = `تلاش شماره ${attempts}`;
    if (attempts >= 3 || all) document.getElementById('solution-box').hidden = false;
    btn.disabled = false;
  });
})();
