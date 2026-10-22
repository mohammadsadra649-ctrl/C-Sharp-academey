// منطق صفحه اصلی: انیمیشن تایپ، ادامه یادگیری، کارت‌های موضوع، مسیر و جست‌وجو
(() => {
  const { esc } = Common;
  Common.renderHeader('');

  // تایپ یک‌باره کد در هیرو (با احترام به کاهش حرکت)
  const heroLine = 'Console.WriteLine("سلام، C#!");';
  const typed = document.getElementById('hero-typed');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typed.textContent = heroLine;
  } else {
    let i = 0;
    const tick = () => {
      typed.textContent = heroLine.slice(0, i++);
      if (i <= heroLine.length) setTimeout(tick, 45);
    };
    tick();
  }

  // ادامه یادگیری
  const data = Progress.read();
  const last = data.last && Curriculum.findLesson(data.last);
  if (last) {
    const percent = Progress.overallPercent();
    const url = `pages/lesson.html?id=${encodeURIComponent(last.id)}`;
    document.getElementById('continue-section').hidden = false;
    document.getElementById('continue-title').textContent = last.title;
    document.getElementById('continue-bar').style.width = percent + '%';
    document.getElementById('continue-percent').textContent = `پیشرفت کلی: ${percent}٪`;
    document.getElementById('continue-btn').href = url;
    const resumeHero = document.getElementById('resume-hero-btn');
    resumeHero.href = url;
    resumeHero.classList.remove('hidden');
  }

  // کارت‌های موضوع
  document.getElementById('topic-grid').innerHTML = Curriculum.topics.map(t => {
    const p = Progress.topicPercent(t);
    return `
      <article class="topic-card${t.theme === 'unity' ? ' is-unity' : ''}">
        <h3>${esc(t.title)}</h3>
        <p>${esc(t.desc)}</p>
        <ul class="topic-meta">
          <li>${t.lessons.length} درس</li>
          <li>سطح: ${esc(t.level)}</li>
        </ul>
        <div class="progress" aria-label="پیشرفت ${esc(t.title)}"><div class="progress-fill" style="width:${p}%"></div></div>
        <p class="muted small">${p}٪ انجام شده</p>
        <a class="btn btn-primary" href="pages/topic.html?id=${encodeURIComponent(t.id)}">ورود به موضوع</a>
      </article>`;
  }).join('');

  // مسیر یادگیری
  document.getElementById('path-list').innerHTML = Curriculum.topics.map(t =>
    `<li><a href="pages/topic.html?id=${encodeURIComponent(t.id)}">${esc(t.title)}</a></li>`
  ).join('');

  // جست‌وجو
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  const levelSel = document.getElementById('filter-level');
  const statusSel = document.getElementById('filter-status');
  function runSearch() {
    const q = input.value.trim();
    const lvl = levelSel.value;
    const st = statusSel.value;
    const d = Progress.read();
    let found = q ? Curriculum.searchLessons(q) : Curriculum.allLessonIds().map(id => Curriculum.findLesson(id)).filter(Boolean);
    if (lvl) found = found.filter(l => l.level === lvl);
    if (st === 'done') found = found.filter(l => d.completed.includes(l.id));
    if (st === 'todo') found = found.filter(l => !d.completed.includes(l.id));
    if (st === 'review') found = found.filter(l => d.review.includes(l.id));
    if (!q && !lvl && !st) { results.innerHTML = ''; return; }
    results.innerHTML = found.length
      ? found.map(l => `<li><a href="pages/lesson.html?id=${encodeURIComponent(l.id)}">${esc(l.title)}</a> <span class="muted small">(${esc(l.level)})</span></li>`).join('')
      : '<li class="muted">درسی با این مشخصات پیدا نشد.</li>';
  }
  input.addEventListener('input', runSearch);
  levelSel.addEventListener('change', runSearch);
  statusSel.addEventListener('change', runSearch);
})();
