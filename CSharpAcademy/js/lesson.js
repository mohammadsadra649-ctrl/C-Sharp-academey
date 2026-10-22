// نمایش یک درس: محتوا، کد، تمرین‌ها، علامت‌گذاری و ناوبری قبلی/بعدی
(() => {
  const { esc, renderCode, bindCodeBlocks } = Common;
  Common.renderHeader('../');

  const id = new URLSearchParams(window.location.search).get('id');
  const lesson = Curriculum.findLesson(id);
  const root = document.getElementById('lesson-root');

  if (!lesson) {
    root.innerHTML = `<h1>درس پیدا نشد</h1>
      <p>این درس در فهرست نیست. <a href="../index.html">بازگشت به صفحه اصلی</a></p>`;
    return;
  }

  document.title = `${lesson.title} — آکادمی C#`;
  Progress.setLast(lesson.id);

  const topic = Curriculum.topicOf(lesson.id);
  if (lesson.theme === 'unity' || (topic && topic.theme === 'unity')) document.body.classList.add('theme-unity');
  const order = Curriculum.allLessonIds();
  const idx = order.indexOf(lesson.id);
  const prev = order[idx - 1] ? Curriculum.findLesson(order[idx - 1]) : null;
  const next = order[idx + 1] ? Curriculum.findLesson(order[idx + 1]) : null;
  const related = Curriculum.relatedLessons(lesson);

  const blocks = lesson.blocks.map(b => {
    switch (b.type) {
      case 'h': return `<h2>${esc(b.text)}</h2>`;
      case 'p': return `<p>${esc(b.text)}</p>`;
      case 'list': return `<ul>${b.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`;
      case 'warn': return `<aside class="callout warn"><strong>اشتباه رایج:</strong> ${esc(b.text)}</aside>`;
      case 'tip': return `<aside class="callout tip"><strong>نکته:</strong> ${esc(b.text)}</aside>`;
      case 'code': return renderCode(b.code, b.notes || {}) + (b.output
        ? `<p class="output-label">خروجی مورد انتظار:</p><pre class="output" dir="ltr">${esc(b.output)}</pre>` : '');
      default: return '';
    }
  }).join('');

  const quizHtml = lesson.quiz.map((q, qi) => `
    <fieldset class="quiz-q" data-q="${qi}">
      <legend>${qi + 1}. ${esc(q.q)}</legend>
      <div class="quiz-options">
        ${q.options.map((o, oi) => `<button type="button" class="quiz-opt" data-q="${qi}" data-o="${oi}">${esc(o)}</button>`).join('')}
      </div>
      <p class="quiz-feedback" aria-live="polite"></p>
    </fieldset>`).join('');

  const prereqHtml = lesson.prereq.length
    ? lesson.prereq.map(p => {
        const pl = Curriculum.findLesson(p);
        return pl ? `<a href="?id=${encodeURIComponent(p)}">${esc(pl.title)}</a>` : '';
      }).join('، ')
    : 'ندارد';

  root.innerHTML = `
    <nav class="crumbs" aria-label="مسیر صفحه"><a href="../index.html">صفحه اصلی</a> / <a href="topic.html?id=${encodeURIComponent(topic.id)}">${esc(topic.title)}</a></nav>
    <header class="page-head">
      <h1>${esc(lesson.title)}</h1>
      <ul class="lesson-meta">
        <li>سطح: ${esc(lesson.level)}</li>
        <li>پیش‌نیاز: ${prereqHtml}</li>
        <li>نسخه‌ی مرجع: ${(lesson.theme === 'unity' || (topic && topic.theme === 'unity')) ? 'Unity 2019.4 LTS / C# 7.3' : 'C# 12 / .NET 8'}</li>
      </ul>
      <div class="lesson-tools">
        <button type="button" class="btn btn-ghost btn-small" id="bm-btn"></button>
        <button type="button" class="btn btn-ghost btn-small" id="rv-btn"></button>
      </div>
    </header>

    <section class="objectives">
      <h2>اهداف یادگیری</h2>
      <ul>${lesson.objectives.map(o => `<li>${esc(o)}</li>`).join('')}</ul>
    </section>

    <article class="lesson-body">${blocks}</article>

    <section class="quiz" aria-labelledby="quiz-title">
      <h2 id="quiz-title">تمرین و آزمون کوتاه</h2>
      <p class="muted">پاسخ را انتخاب کنید. توضیح پاسخ بعد از انتخاب نمایش داده می‌شود.</p>
      ${quizHtml}
      <p class="quiz-score" id="quiz-score" aria-live="polite"></p>
    </section>

    <section class="finish">
      <button type="button" class="btn btn-primary" id="complete-btn">علامت‌گذاری به‌عنوان خوانده‌شده</button>
      <p class="muted small" id="complete-msg"></p>
    </section>

    ${related.length ? `<section class="related"><h2>درس‌های مرتبط</h2><ul>
      ${related.map(r => `<li><a href="?id=${encodeURIComponent(r.id)}">${esc(r.title)}</a></li>`).join('')}
    </ul></section>` : ''}

    <nav class="prev-next" aria-label="درس قبلی و بعدی">
      ${prev ? `<a class="btn btn-ghost" href="?id=${encodeURIComponent(prev.id)}">← ${esc(prev.title)}</a>` : '<span></span>'}
      ${next ? `<a class="btn btn-primary" href="?id=${encodeURIComponent(next.id)}">${esc(next.title)} →</a>` : '<span></span>'}
    </nav>`;

  bindCodeBlocks(root);

  // زیر هر بلوک کد یک دکمه‌ی اجرا در ویرایشگر قرار می‌گیرد
  root.querySelectorAll('.code-block').forEach((block, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-ghost btn-small run-in-editor';
    btn.textContent = '▶ اجرا و ویرایش این مثال';
    block.parentNode.insertBefore(btn, block.nextSibling);
    btn.addEventListener('click', () => {
      const mount = document.createElement('div');
      mount.className = 'inline-editor';
      btn.replaceWith(mount);
      const code = block.querySelector('.copy-source').value;
      CodeEditor.mount(mount, { id: lesson.id + ':' + i, code, title: 'مثال درس' });
    });
  });

  // نکات مهم درس (از کادرهای نکته و هشدار) به‌عنوان خلاصه
  const tips = lesson.blocks.filter(b => b.type === 'tip' || b.type === 'warn');
  if (tips.length) {
    const sum = document.createElement('section');
    sum.className = 'lesson-summary';
    sum.innerHTML = '<h2>خلاصه‌ی نکات</h2><ul>' + tips.map(t =>
      '<li>' + esc(t.text) + '</li>').join('') + '</ul>' +
      '<p><a class="btn btn-ghost btn-small" href="exercises.html">رفتن به تمرین‌ها</a> ' +
      '<a class="btn btn-ghost btn-small" href="exams.html">آزمون‌ها</a></p>';
    const ref = root.querySelector('.quiz');
    if (ref) ref.parentNode.insertBefore(sum, ref); else root.appendChild(sum);
  }

  // پاسخ فقط بعد از انتخاب کاربر نمایش داده می‌شود
  const answers = lesson.quiz.map(() => null);
  root.querySelectorAll('.quiz-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      const qi = Number(btn.dataset.q);
      const oi = Number(btn.dataset.o);
      if (answers[qi] !== null) return;
      answers[qi] = oi;
      const q = lesson.quiz[qi];
      const fieldset = root.querySelector(`.quiz-q[data-q="${qi}"]`);
      fieldset.querySelectorAll('.quiz-opt').forEach(b => {
        b.disabled = true;
        if (Number(b.dataset.o) === q.answer) b.classList.add('correct');
      });
      if (oi !== q.answer) btn.classList.add('wrong');
      const fb = fieldset.querySelector('.quiz-feedback');
      fb.textContent = (oi === q.answer ? 'درست است. ' : 'اشتباه است. ') + q.explain;
      fb.classList.add(oi === q.answer ? 'ok' : 'bad');

      if (answers.every(a => a !== null)) {
        const score = lesson.quiz.filter((item, i) => answers[i] === item.answer).length;
        Progress.saveQuiz(lesson.id, score, lesson.quiz.length);
        document.getElementById('quiz-score').textContent = `نتیجه: ${score} از ${lesson.quiz.length}`;
      }
    });
  });

  const completeBtn = document.getElementById('complete-btn');
  const completeMsg = document.getElementById('complete-msg');
  if (Progress.isCompleted(lesson.id)) {
    completeBtn.textContent = 'این درس خوانده شده است';
    completeBtn.disabled = true;
  }
  const bmBtn = document.getElementById('bm-btn');
  const rvBtn = document.getElementById('rv-btn');
  const paintTools = () => {
    bmBtn.textContent = Progress.isBookmarked(lesson.id) ? '★ حذف از علاقه‌مندی' : '☆ افزودن به علاقه‌مندی';
    rvBtn.textContent = Progress.isReview(lesson.id) ? '✔ علامت مرور' : '⚑ علامت برای مرور';
  };
  bmBtn.addEventListener('click', () => { Progress.toggleBookmark(lesson.id); paintTools(); });
  rvBtn.addEventListener('click', () => { Progress.toggleReview(lesson.id); paintTools(); });
  paintTools();

  completeBtn.addEventListener('click', () => {
    Progress.markCompleted(lesson.id);
    completeBtn.textContent = 'این درس خوانده شده است';
    completeBtn.disabled = true;
    completeMsg.textContent = 'پیشرفت شما ذخیره شد.';
  });
})();
