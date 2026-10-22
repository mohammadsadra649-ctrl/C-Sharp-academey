// صفحه اختصاصی هر موضوع: فهرست درس‌ها و وضعیت هرکدام
(() => {
  const { esc } = Common;
  Common.renderHeader('../');

  const id = new URLSearchParams(window.location.search).get('id');
  const topic = Curriculum.findTopic(id);

  if (!topic) {
    document.getElementById('topic-title').textContent = 'موضوع پیدا نشد';
    document.getElementById('topic-desc').innerHTML =
      'این موضوع وجود ندارد. <a href="../index.html">بازگشت به صفحه اصلی</a>';
    return;
  }

  document.title = `${topic.title} — آکادمی C#`;
  if (topic.theme === 'unity') document.body.classList.add('theme-unity');
  document.getElementById('crumb-topic').textContent = topic.title;
  document.getElementById('topic-title').textContent = topic.title;
  document.getElementById('topic-desc').textContent = topic.desc;
  document.getElementById('topic-meta').textContent = `${topic.lessons.length} درس — سطح ${topic.level}`;
  document.getElementById('topic-bar').style.width = Progress.topicPercent(topic) + '%';

  document.getElementById('lesson-list').innerHTML = topic.lessons.map(lid => {
    const l = Curriculum.findLesson(lid);
    if (!l) return '';
    const done = Progress.isCompleted(l.id);
    return `
      <li class="lesson-item ${done ? 'is-done' : ''}">
        <a href="lesson.html?id=${encodeURIComponent(l.id)}">
          <span class="lesson-title">${esc(l.title)}</span>
          <span class="lesson-status">${done ? 'خوانده شده' : 'خوانده نشده'}</span>
        </a>
      </li>`;
  }).join('');
})();
