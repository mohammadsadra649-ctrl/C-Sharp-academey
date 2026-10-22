// اجرای آزمون: سؤال‌ها یکی‌یکی، بازخورد بعد از هر پاسخ، نمره، و مرور اشتباه‌ها با لینک درس‌ها
(() => {
  const { esc } = Common;
  Common.renderHeader('../');
  const root = document.getElementById('exam-root');
  const id = new URLSearchParams(window.location.search).get('id');
  const exam = window.EXAMS.find(e => e.id === id);
  const PASS = 0.7;

  if (!exam) {
    root.innerHTML = '<h1>آزمون پیدا نشد</h1><p><a href="exams.html">بازگشت به فهرست آزمون‌ها</a></p>';
    return;
  }
  document.title = exam.title + ' — آکادمی C#';

  let index = 0;
  const answers = [];

  function renderQuestion() {
    const q = exam.questions[index];
    const total = exam.questions.length;
    const pct = Math.round((index / total) * 100);
    root.innerHTML = `
      <nav class="crumbs"><a href="exams.html">آزمون‌ها</a> / ${esc(exam.title)}</nav>
      <h1>${esc(exam.title)}</h1>
      <div class="progress" aria-label="پیشرفت آزمون"><div class="progress-fill" style="width:${pct}%"></div></div>
      <p class="muted small">سؤال ${index + 1} از ${total} — ${esc(q.type)}</p>
      <fieldset class="quiz-q">
        <legend>${esc(q.q)}</legend>
        <div class="quiz-options">
          ${q.options.map((o, i) => `<button type="button" class="quiz-opt" data-o="${i}">${esc(o)}</button>`).join('')}
        </div>
        <p class="quiz-feedback" aria-live="polite"></p>
      </fieldset>
      <div class="exam-nav"><button type="button" class="btn btn-primary" id="next-btn" disabled>${index + 1 < total ? 'سؤال بعدی' : 'پایان و نتیجه'}</button></div>`;

    let chosen = null;
    root.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        if (chosen !== null) return;
        chosen = Number(btn.dataset.o);
        root.querySelectorAll('.quiz-opt').forEach(b => {
          b.disabled = true;
          if (Number(b.dataset.o) === q.answer) b.classList.add('correct');
        });
        if (chosen !== q.answer) btn.classList.add('wrong');
        const fb = root.querySelector('.quiz-feedback');
        fb.textContent = (chosen === q.answer ? 'درست است. ' : 'اشتباه است. ') + q.explain;
        fb.classList.add(chosen === q.answer ? 'ok' : 'bad');
        answers[index] = chosen;
        document.getElementById('next-btn').disabled = false;
      });
    });

    document.getElementById('next-btn').addEventListener('click', () => {
      index++;
      if (index < total) renderQuestion(); else renderResult();
    });
  }

  function renderResult() {
    const total = exam.questions.length;
    const correct = exam.questions.filter((q, i) => answers[i] === q.answer).length;
    const ratio = correct / total;
    const passed = ratio >= PASS;
    Progress.saveQuiz('exam:' + exam.id, correct, total);

    const wrong = exam.questions
      .map((q, i) => ({ q, i }))
      .filter(x => answers[x.i] !== x.q.answer);

    const lessonIds = [...new Set(wrong.flatMap(x => x.q.lessons || []))];
    const reviewLinks = lessonIds
      .map(lid => Curriculum.findLesson(lid))
      .filter(Boolean)
      .map(l => `<li><a href="lesson.html?id=${encodeURIComponent(l.id)}">${esc(l.title)}</a></li>`)
      .join('');

    root.innerHTML = `
      <nav class="crumbs"><a href="exams.html">آزمون‌ها</a> / نتیجه</nav>
      <h1>نتیجه: ${correct} از ${total}</h1>
      <p class="${passed ? 'quiz-feedback ok' : 'quiz-feedback bad'}">${passed ? 'قبول شدید. عالی بود!' : 'هنوز به نمره‌ی قبولی نرسیدید (۷۰٪). مرور کنید و دوباره امتحان کنید.'}</p>
      ${wrong.length ? `<h2>سؤال‌های اشتباه</h2>
        <ol class="review-list">${wrong.map(x => `
          <li>
            <p><strong>${esc(x.q.q)}</strong></p>
            <p class="small">پاسخ درست: ${esc(x.q.options[x.q.answer])}</p>
            <p class="small muted">${esc(x.q.explain)}</p>
          </li>`).join('')}
        </ol>
        <h2>درس‌های پیشنهادی برای مرور</h2>
        <ul class="related-list">${reviewLinks || '<li>—</li>'}</ul>` : '<p>همه‌ی پاسخ‌ها درست بود.</p>'}
      <div class="exam-nav">
        <button type="button" class="btn btn-primary" id="retry-btn">تلاش مجدد</button>
        <a class="btn btn-ghost" href="exams.html">فهرست آزمون‌ها</a>
      </div>`;

    document.getElementById('retry-btn').addEventListener('click', () => {
      index = 0; answers.length = 0; renderQuestion();
    });
  }

  renderQuestion();
})();
