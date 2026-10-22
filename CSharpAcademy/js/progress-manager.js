// ذخیره و خواندن پیشرفت کاربر با localStorage (با مدیریت خطا، نبود داده و نسخه‌بندی)
const Progress = (() => {
  const KEY = 'csharp-academy:v2';
  const OLD_KEY = 'csharp-academy:v1';
  const empty = () => ({ version: 2, completed: [], last: null, quiz: {}, bookmarks: [], review: [] });

  function normalize(d) {
    const e = empty();
    return {
      version: 2,
      completed: Array.isArray(d.completed) ? d.completed : e.completed,
      last: typeof d.last === 'string' ? d.last : null,
      quiz: d.quiz && typeof d.quiz === 'object' ? d.quiz : {},
      bookmarks: Array.isArray(d.bookmarks) ? d.bookmarks : [],
      review: Array.isArray(d.review) ? d.review : []
    };
  }

  function read() {
    try {
      let raw = window.localStorage.getItem(KEY);
      if (!raw) {
        // انتقال از نسخه‌ی قبلی در صورت وجود
        const old = window.localStorage.getItem(OLD_KEY);
        if (old) raw = old;
      }
      if (!raw) return empty();
      return normalize(JSON.parse(raw));
    } catch (err) {
      console.warn('پیشرفت ذخیره‌شده خوانده نشد:', err);
      return empty();
    }
  }

  function write(data) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(normalize(data)));
      return true;
    } catch (err) {
      console.warn('ذخیره پیشرفت ممکن نیست:', err);
      return false;
    }
  }

  function update(fn) {
    const d = read();
    fn(d);
    return write(d);
  }

  const markCompleted = id => update(d => { if (!d.completed.includes(id)) d.completed.push(id); });
  const setLast = id => update(d => { d.last = id; });
  const saveQuiz = (id, score, total) => update(d => { d.quiz[id] = { score, total }; });
  const isCompleted = id => read().completed.includes(id);

  function toggle(list, id) {
    return update(d => {
      const arr = d[list];
      const i = arr.indexOf(id);
      if (i >= 0) arr.splice(i, 1); else arr.push(id);
    });
  }
  const toggleBookmark = id => toggle('bookmarks', id);
  const toggleReview = id => toggle('review', id);
  const isBookmarked = id => read().bookmarks.includes(id);
  const isReview = id => read().review.includes(id);

  function topicPercent(topic) {
    const done = read().completed;
    if (!topic.lessons.length) return 0;
    const count = topic.lessons.filter(id => done.includes(id)).length;
    return Math.round((count / topic.lessons.length) * 100);
  }

  function overallPercent() {
    const all = Curriculum.allLessonIds();
    if (!all.length) return 0;
    const done = read().completed.filter(id => all.includes(id));
    return Math.round((done.length / all.length) * 100);
  }

  function exportJSON() {
    return JSON.stringify({ app: 'csharp-academy', exportedAt: new Date().toISOString(), data: read() }, null, 2);
  }

  // بازگرداندن از فایل خروجی؛ داده‌ی نامعتبر رد می‌شود
  function importJSON(text) {
    try {
      const obj = JSON.parse(text);
      if (!obj || obj.app !== 'csharp-academy' || !obj.data) return { ok: false, msg: 'فایل پشتیبان معتبر نیست.' };
      write(normalize(obj.data));
      return { ok: true, msg: 'پیشرفت با موفقیت بازگردانی شد.' };
    } catch (err) {
      return { ok: false, msg: 'فایل خوانده نشد؛ JSON معتبر نیست.' };
    }
  }

  function reset() {
    try {
      window.localStorage.removeItem(KEY);
      window.localStorage.removeItem(OLD_KEY);
      return true;
    } catch (err) { return false; }
  }

  return {
    read, markCompleted, setLast, saveQuiz, isCompleted,
    toggleBookmark, toggleReview, isBookmarked, isReview,
    topicPercent, overallPercent, exportJSON, importJSON, reset
  };
})();
