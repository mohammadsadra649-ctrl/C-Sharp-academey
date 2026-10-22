// آزمون‌های جدید: فصل Unity و فصل سیستم‌های بازی، و آزمون مسیر بازی‌سازی
(function () {
  window.EXAMS.push(
    { id: 'ch-unity', kind: 'chapter', title: 'فصل ۷: بازی‌سازی با Unity', desc: 'چرخه‌ی اجرا، فیزیک، صدا، UI، Coroutine و انیمیشن.',
      questions: [
        { id: 'u1', type: 'مفهومی', q: 'کدام متد Unity زودتر از همه اجرا می‌شود؟', options: ['Start', 'Update', 'Awake', 'FixedUpdate'], answer: 2, explain: 'Awake قبل از Start و قبل از اولین فریم اجرا می‌شود.', lessons: ['unity-lifecycle-full'] },
        { id: 'u2', type: 'پیش‌بینی خروجی', q: 'فاصله‌ی دو نقطه‌ی (0,0) و (3,4) با Vector3.Distance چقدر است؟', options: ['7', '5', '12', '3'], answer: 1, explain: 'با فیثاغورس، فاصله 5 است.', lessons: ['unity-vectors'] },
        { id: 'u3', type: 'مفهومی', q: 'برای وقفه‌ی زمانی بدون قفل کردن بازی کدام را استفاده می‌کنیم؟', options: ['Coroutine با WaitForSeconds', 'حلقه‌ی while بی‌پایان', 'Thread.Sleep در Update', 'Destroy'], answer: 0, explain: 'Coroutine بدون قفل کردن اجرا، تأخیر می‌دهد.', lessons: ['unity-coroutines'] },
        { id: 'u4', type: 'پیدا کردن خطا', q: 'برای توقف بازی کدام کد اشتباه است؟', options: ['Time.timeScale = 0f;', 'Time.timeScale = 1f;', 'paused = true;', 'panel.SetActive(true);'], answer: 1, explain: 'تنظیم 1 بازی را ادامه می‌دهد، نه متوقف می‌کند.', lessons: ['unity-ui-menu'] },
        { id: 'u5', type: 'مفهومی', q: 'برای پخش افکت صوتی کوتاه بدون قطع صدای دیگر کدام را صدا می‌زنیم؟', options: ['Play', 'PlayOneShot', 'Stop', 'Pause'], answer: 1, explain: 'PlayOneShot افکت را بدون قطع صداهای دیگر پخش می‌کند.', lessons: ['unity-audio'] }
      ]
    },
    { id: 'ch-systems', kind: 'chapter', title: 'فصل ۸: معماری و سیستم‌های بازی', desc: 'وضعیت بازی، ذخیره‌سازی، Event Bus، Pool عمومی، الگوها و تزریق وابستگی.',
      questions: [
        { id: 'g1', type: 'پیش‌بینی خروجی', q: 'با وضعیت Menu و دستور play، state چه می‌شود؟ (در کد نمونه)', options: ['Menu', 'Playing', 'Paused', 'GameOver'], answer: 1, explain: 'play وضعیت را از Menu به Playing می‌برد.', lessons: ['game-state-machine'] },
        { id: 'g2', type: 'مفهومی', q: 'فیلد Version در فایل ذخیره برای چه کاری است؟', options: ['نمایش', 'سازگاری با نسخه‌های بعدی', 'حذف', 'رمزنگاری'], answer: 1, explain: 'Version امکان تبدیل داده‌ی قدیمی را می‌دهد.', lessons: ['save-system'] },
        { id: 'g3', type: 'پیدا کردن خطا', q: 'در Event Bus برای خروج از مشترک شدن کدام درست است؟', options: ['EventBus.ScoreChanged += handler;', 'EventBus.ScoreChanged -= handler;', 'EventBus.ScoreChanged = null;', 'EventBus.ScoreChanged.Clear();'], answer: 1, explain: 'با -= مشترک جدا می‌شود.', lessons: ['event-bus'] },
        { id: 'g4', type: 'مفهومی', q: 'کدام الگو یک نمونه‌ی سراسری تضمین می‌کند؟', options: ['Observer', 'Singleton', 'Adapter', 'Factory'], answer: 1, explain: 'Singleton فقط یک نمونه می‌سازد.', lessons: ['design-patterns'] },
        { id: 'g5', type: 'مفهومی', q: 'چرا Game به رابط IScoreStore وابسته است؟', options: ['سرعت', 'امکان تغییر پیاده‌سازی و تست', 'static بودن', 'لازم نیست'], answer: 1, explain: 'وابستگی به رابط انعطاف و قابلیت تست می‌دهد.', lessons: ['dependency-injection-basics'] }
      ]
    }
  );
  // آزمون مسیر بازی‌سازی: ترکیب فصل Unity و فصل سیستم‌ها
  const pick = id => window.EXAMS.find(e => e.id === id);
  window.EXAMS.push({
    id: 'path-game', kind: 'path', title: 'آزمون مسیر بازی‌سازی',
    desc: 'ترکیب فصل Unity و فصل سیستم‌های بازی.',
    questions: [].concat(pick('ch-unity').questions, pick('ch-systems').questions)
  });
})();
