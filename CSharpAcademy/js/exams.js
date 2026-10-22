// فهرست آزمون‌ها با بهترین نمره‌ی ثبت‌شده
(() => {
  const { esc } = Common;
  Common.renderHeader('../');
  const quizData = Progress.read().quiz || {};

  function item(e) {
    const best = quizData['exam:' + e.id];
    const status = best
      ? `بهترین نمره: ${best.score} از ${best.total}`
      : 'هنوز آزمون داده نشده';
    const qCount = e.questions ? e.questions.length : 0;
    return `<li class="exam-item">
      <a href="exam.html?id=${encodeURIComponent(e.id)}">
        <span class="exam-title">${esc(e.title)}</span>
        <span class="exam-meta">${qCount} سؤال — ${esc(status)}</span>
      </a>
      <p class="muted small">${esc(e.desc)}</p>
    </li>`;
  }

  document.getElementById('chapter-exams').innerHTML =
    window.EXAMS.filter(e => e.kind === 'chapter').map(item).join('');
  document.getElementById('path-exams').innerHTML =
    window.EXAMS.filter(e => e.kind === 'path').map(item).join('');
})();
