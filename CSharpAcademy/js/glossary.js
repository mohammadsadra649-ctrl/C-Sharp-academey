// واژه‌نامه: جست‌وجو و فیلتر اصطلاح‌ها، و دیکشنری جمله‌های سی‌شارپ با دو تب
(() => {
  const { esc } = Common;
  Common.renderHeader('../');

  // ---- تب‌ها ----
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        const on = t === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', String(on));
      });
      document.getElementById('panel-terms').hidden = tab.dataset.tab !== 'terms';
      document.getElementById('panel-sentences').hidden = tab.dataset.tab !== 'sentences';
    });
  });

  // ---- اصطلاحات ----
  const items = window.GLOSSARY || [];
  const list = document.getElementById('g-list');
  const search = document.getElementById('g-search');
  const catSelect = document.getElementById('g-cat');
  const count = document.getElementById('g-count');

  const cats = [...new Set(items.map(i => i.cat))].sort();
  catSelect.insertAdjacentHTML('beforeend', cats.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join(''));

  function renderTerms() {
    const q = search.value.trim().toLowerCase();
    const cat = catSelect.value;
    const found = items.filter(i => (!cat || i.cat === cat) &&
      (!q || [i.fa, i.en, i.def, i.cat].join(' ').toLowerCase().includes(q)));
    count.textContent = `${found.length} اصطلاح`;
    if (!found.length) {
      list.innerHTML = '<li class="glossary-empty">اصطلاحی با این مشخصات پیدا نشد. عبارت دیگری امتحان کنید.</li>';
      return;
    }
    list.innerHTML = found.map(i => `
      <li class="glossary-item">
        <details>
          <summary>
            <span class="g-fa">${esc(i.fa)}</span>
            <span class="g-en" dir="ltr">${esc(i.en)}</span>
            <span class="g-cat">${esc(i.cat)}</span>
          </summary>
          <div class="g-body">
            <p><strong>تعریف:</strong> ${esc(i.def)}</p>
            <p><strong>توضیح فنی:</strong> ${esc(i.tech)}</p>
            <p><strong>مثال:</strong></p>
            <pre class="g-code" dir="ltr"><code>${esc(i.ex)}</code></pre>
            <p><strong>کاربرد:</strong> ${esc(i.use)}</p>
            <p><strong>اشتباه رایج:</strong> ${esc(i.mistake)}</p>
            ${i.lessons && i.lessons.length ? `<p class="g-links"><strong>درس‌های مرتبط:</strong> ${
              i.lessons.map(id => {
                const l = Curriculum.findLesson(id);
                return l ? `<a href="lesson.html?id=${encodeURIComponent(id)}">${esc(l.title)}</a>` : '';
              }).filter(Boolean).join('، ')
            }</p>` : ''}
          </div>
        </details>
      </li>`).join('');
  }
  search.addEventListener('input', renderTerms);
  catSelect.addEventListener('change', renderTerms);
  renderTerms();

  // ---- جمله‌ها ----
  const sentences = window.SENTENCES || [];
  const sList = document.getElementById('s-list');
  const sSearch = document.getElementById('s-search');
  const sCat = document.getElementById('s-cat');
  const sCount = document.getElementById('s-count');

  const sCats = [...new Set(sentences.map(s => s.cat))].sort();
  sCat.insertAdjacentHTML('beforeend', sCats.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join(''));

  function renderSentences() {
    const q = sSearch.value.trim().toLowerCase();
    const cat = sCat.value;
    const found = sentences.filter(s => (!cat || s.cat === cat) &&
      (!q || [s.fa, s.code, s.note, s.cat].join(' ').toLowerCase().includes(q)));
    sCount.textContent = `${found.length} جمله`;
    if (!found.length) {
      sList.innerHTML = '<li class="glossary-empty">جمله‌ای پیدا نشد.</li>';
      return;
    }
    sList.innerHTML = found.map(s => `
      <li class="sentence-item">
        <p class="s-fa">${esc(s.fa)} <span class="g-cat">${esc(s.cat)}</span></p>
        <pre class="g-code" dir="ltr"><code>${esc(s.code)}</code></pre>
        <p class="muted small">${esc(s.note)}</p>
      </li>`).join('');
  }
  sSearch.addEventListener('input', renderSentences);
  sCat.addEventListener('change', renderSentences);
  renderSentences();
})();
