// صفحه‌ی پیشرفت: آمار، مرور، علاقه‌مندی‌ها، پشتیبان‌گیری، بازیابی و بازنشانی با تأیید
(() => {
  const { esc } = Common;
  Common.renderHeader('../');

  function lessonItem(id) {
    const l = Curriculum.findLesson(id);
    return l ? `<li class="lesson-item"><a href="lesson.html?id=${encodeURIComponent(id)}"><span class="lesson-title">${esc(l.title)}</span></a></li>` : '';
  }

  function render() {
    const d = Progress.read();
    const pct = Progress.overallPercent();
    document.getElementById('p-overall').textContent = `پیشرفت کلی: ${pct}٪ — ${d.completed.length} درس خوانده شده`;
    document.getElementById('p-bar').style.width = pct + '%';
    const rv = document.getElementById('p-review');
    rv.innerHTML = d.review.length ? d.review.map(lessonItem).join('') : '<li class="muted">درسی برای مرور علامت نخورده است.</li>';
    const bm = document.getElementById('p-bookmarks');
    bm.innerHTML = d.bookmarks.length ? d.bookmarks.map(lessonItem).join('') : '<li class="muted">هنوز علاقه‌مندی ندارید.</li>';
  }

  document.getElementById('p-export').addEventListener('click', () => {
    const blob = new Blob([Progress.exportJSON()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'csharp-academy-progress.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  document.getElementById('p-import').addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    const msg = document.getElementById('p-msg');
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const r = Progress.importJSON(String(reader.result));
      msg.textContent = r.msg;
      if (r.ok) render();
    };
    reader.onerror = () => { msg.textContent = 'خواندن فایل ممکن نیست.'; };
    reader.readAsText(file);
  });

  document.getElementById('p-reset').addEventListener('click', () => {
    if (!window.confirm('همه‌ی پیشرفت پاک شود؟ این کار برگشت‌پذیر نیست.')) return;
    Progress.reset();
    document.getElementById('p-msg').textContent = 'پیشرفت بازنشانی شد.';
    render();
  });

  render();
})();
