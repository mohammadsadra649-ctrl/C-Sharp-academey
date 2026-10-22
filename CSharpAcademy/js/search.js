// موتور جست‌وجوی هوشمند: نرمال‌سازی فارسی، مترادف‌ها، تحمل غلط املایی ساده، امتیازدهی و برجسته‌سازی
const Search = (() => {
  // نرمال‌سازی: حروف عربی به فارسی، اعداد فارسی، حذف اعراب و نیم‌فاصله
  function normalize(s) {
    return String(s || '')
      .replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/ة/g, 'ه')
      .replace(/[\u064B-\u065F\u0670]/g, '')
      .replace(/\u200C|\u200B/g, ' ')
      .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
      .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
      .toLowerCase();
  }

  function tokens(s) {
    return normalize(s).split(/[\s\.,;:!?()\[\]{}"'`<>\/\\\-+*=&|%$#@]+/).filter(t => t.length > 0);
  }

  // مترادف‌ها: هر کلید با مجموعه‌ای از واژه‌های مرتبط جست‌وجو می‌شود
  const SYN = {
    'حلقه': ['loop', 'for', 'while', 'foreach', 'تکرار'],
    'تکرار': ['حلقه', 'loop'],
    'تابع': ['متد', 'method', 'function'],
    'متد': ['تابع', 'method'],
    'method': ['متد', 'تابع'],
    'کلاس': ['class', 'شیءگرا'],
    'class': ['کلاس'],
    'شیء': ['object', 'کلاس'],
    'object': ['شیء'],
    'ورودی': ['input', 'readline', 'گرفتن'],
    'خروجی': ['output', 'writeline', 'چاپ', 'نمایش'],
    'چاپ': ['خروجی', 'writeline', 'print'],
    'خطا': ['exception', 'error', 'استثنا', 'استثناء', 'catch'],
    'استثنا': ['exception', 'خطا'],
    'exception': ['استثنا', 'خطا'],
    'ارث': ['inheritance', 'ارث‌بری', 'ارث بری'],
    'ارث‌بری': ['inheritance'],
    'ارث بری': ['inheritance'],
    'فایل': ['file', 'io', 'متنی'],
    'عدد': ['int', 'number', 'صحیح'],
    'متن': ['string', 'رشته'],
    'رشته': ['string', 'متن'],
    'لیست': ['list', 'فهرست'],
    'فهرست': ['list', 'لیست'],
    'دیکشنری': ['dictionary', 'کلید'],
    'async': ['ناهمگام', 'await', 'task'],
    'ناهمگام': ['async', 'await'],
    'unity': ['یونیتی'],
    'یونیتی': ['unity'],
    'انیمیشن': ['animation', 'animator'],
    'فیزیک': ['physics', 'rigidbody'],
    'سکه': ['coin', 'امتیاز'],
    'امتیاز': ['score', 'سکه'],
    'ذخیره': ['save', 'playerprefs', 'json'],
    'تابع بازگشتی': ['recursion', 'بازگشت'],
    'بازگشت': ['recursion', 'بازگشتی', 'return']
  };

  // فاصله‌ی ویرایشی برای تحمل یک‌حرف‌اشتباه (فقط کلمه‌های بلندتر از ۴ حرف)
  function editDistance(a, b) {
    const m = a.length, n = b.length;
    if (Math.abs(m - n) > 1) return 2;
    const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
    for (let j = 1; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
    }
    return dp[m][n];
  }

  function expandQuery(q) {
    const base = tokens(q);
    const set = new Set(base);
    base.forEach(t => (SYN[t] || []).forEach(x => tokens(x).forEach(y => set.add(y))));
    return { original: base, all: [...set] };
  }

  // ساخت ایندکس از همه‌ی محتواها
  let index = null;
  function buildIndex() {
    if (index) return index;
    const items = [];

    Curriculum.allLessonIds().forEach(id => {
      const l = Curriculum.findLesson(id);
      if (!l) return;
      const body = [].concat(l.objectives || [], (l.blocks || []).map(b => b.text || b.code || (b.items || []).join(' ') || ''))
        .join(' ');
      items.push({ type: 'lesson', title: l.title, href: 'lesson.html?id=' + encodeURIComponent(l.id), level: l.level, body, keys: '' });
    });

    (window.GLOSSARY || []).forEach(g => items.push({
      type: 'glossary', title: g.fa + ' (' + g.en + ')', href: 'glossary.html',
      body: [g.def, g.tech, g.use, g.mistake].join(' '), keys: g.en + ' ' + g.cat, level: ''
    }));

    (window.SENTENCES || []).forEach(s => items.push({
      type: 'sentence', title: s.fa, href: 'glossary.html',
      body: s.code + ' ' + s.note, keys: s.cat, level: ''
    }));

    (window.EXERCISES || []).forEach(e => items.push({
      type: 'exercise', title: e.title, href: 'exercise.html?id=' + encodeURIComponent(e.id),
      body: e.statement + ' ' + e.goal, keys: e.level, level: e.level
    }));

    index = items.map(it => ({
      ...it,
      tTitle: tokens(it.title),
      tKeys: tokens(it.keys),
      tBody: tokens(it.body),
      nBody: normalize(it.body)
    }));
    return index;
  }

  function scoreItem(it, q) {
    let score = 0;
    let hits = 0;
    const matchedOriginal = new Set();
    q.all.forEach(term => {
      let s = 0;
      if (it.tTitle.includes(term)) s = 6;
      else if (it.tKeys.includes(term)) s = 4;
      else if (it.tBody.includes(term)) s = 2;
      else if (term.length > 4 && (it.tTitle.some(w => editDistance(w, term) <= 1) || it.tBody.some(w => editDistance(w, term) <= 1))) s = 1;
      if (s > 0) {
        score += s;
        hits++;
        if (q.original.includes(term)) matchedOriginal.add(term);
      }
    });
    // اگر هیچ‌کدام از کلمه‌های اصلی پیدا نشد، نتیجه نمی‌دهد
    if (q.original.length && matchedOriginal.size === 0) return 0;
    // هرچه کلمه‌های بیشتری پیدا شوند، بهتر
    const coverage = q.original.length ? matchedOriginal.size / q.original.length : 0;
    return score * (0.5 + coverage);
  }

  function snippet(text, query) {
    const plain = String(text);
    const n = normalize(plain);
    let pos = -1;
    for (const t of query.all) {
      const p = n.indexOf(t);
      if (p >= 0 && (pos < 0 || p < pos)) pos = p;
    }
    if (pos < 0) return plain.slice(0, 140);
    const start = Math.max(0, pos - 50);
    return (start > 0 ? '…' : '') + plain.slice(start, start + 160) + '…';
  }

  function highlight(text, query) {
    const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    let out = esc(text);
    const terms = [...new Set(query.original)].filter(t => t.length >= 2).sort((a, b) => b.length - a.length);
    terms.forEach(t => {
      const re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      out = out.replace(re, '<mark>$1</mark>');
    });
    return out;
  }

  // search(q, { types: ['lesson',...], limit })
  function search(q, opts = {}) {
    const query = expandQuery(q || '');
    if (!query.original.length) return [];
    const types = opts.types && opts.types.length ? opts.types : null;
    const res = buildIndex()
      .filter(it => !types || types.includes(it.type))
      .map(it => ({ it, score: scoreItem(it, query) }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, opts.limit || 60);
    return res.map(x => ({
      type: x.it.type, title: x.it.title, href: x.it.href, level: x.it.level,
      score: Math.round(x.score * 10) / 10,
      snippet: snippet(x.it.body || x.it.title, query),
      titleHtml: highlight(x.it.title, query),
      snippetHtml: highlight(snippet(x.it.body || x.it.title, query), query)
    }));
  }

  const TYPE_LABEL = { lesson: 'درس', glossary: 'واژه‌نامه', sentence: 'جمله', exercise: 'تمرین' };
  return { search, normalize, expandQuery, TYPE_LABEL, editDistance };
})();
