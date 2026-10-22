// موضوع: معماری و سیستم‌های بازی (C# و Unity)
(function () {
  window.CURRICULUM.topics.push({
    id: 'game-systems', title: 'معماری و سیستم‌های بازی', level: 'پیشرفته',
    desc: 'ساختار پروژه‌ی بازی، مدیریت وضعیت، ذخیره‌سازی، سیستم رویداد، Object Pooling عمومی و الگوهای طراحی.',
    lessons: ['game-architecture', 'game-state-machine', 'save-system', 'event-bus', 'generic-object-pool', 'design-patterns', 'dependency-injection-basics']
  });
  const L = window.CURRICULUM.lessons;
  const add = (o) => { L[o.id] = Object.assign({ level: 'پیشرفته' }, o); };

  add({ id: 'game-architecture', title: 'معماری پروژه‌های بازی', prereq: ['solid-basics', 'interfaces'],
    objectives: ['بخش‌های اصلی یک بازی را جدا کنید (ورودی، منطق، نمایش).', 'بفهمید چرا مدیر بازی باید یک جا باشد.', 'وابستگی‌ها را کم کنید.'],
    blocks: [
      { type: 'h', text: 'جدا کردن مسئولیت‌ها' },
      { type: 'list', items: [
        'ورودی: خواندن کلید و ماوس، بدون تصمیم بازی',
        'منطق بازی: امتیاز، جان، قوانین',
        'نمایش: UI، انیمیشن، صدا',
        'داده: تنظیمات و ذخیره‌ی پیشرفت'
      ]},
      { type: 'p', text: 'وقتی منطق و نمایش از هم جدا باشند، می‌توانید بدون تغییر قوانین، ظاهر بازی را عوض کنید. این همان اصل SOLID است که در درس‌های OOP دیدید.' },
      { type: 'tip', text: 'یک GameManager کوچک که وضعیت کلی را نگه می‌دارد، و بقیه‌ی اسکریپت‌ها با رویداد با آن حرف بزنند، ساختار ساده‌ای است.' }
    ],
    quiz: [
      { q: 'چرا منطق بازی را از نمایش جدا می‌کنیم؟', options: ['برای سرعت بیشتر', 'تا تغییر ظاهر قوانین را خراب نکند', 'این کار لازم نیست', 'برای حذف UI'], answer: 1, explain: 'جداسازی باعث می‌شود تغییر نمایش به قوانین بازی آسیب نرساند.' },
      { q: 'کدام مورد جزو منطق بازی است؟', options: ['رنگ دکمه', 'امتیاز و جان', 'صدای کلیک', 'انیمیشن'], answer: 1, explain: 'امتیاز و جان قوانین بازی‌اند؛ بقیه بخش نمایش هستند.' }
    ]
  });

  add({ id: 'game-state-machine', title: 'مدیریت وضعیت بازی با enum و switch', prereq: ['enum-type', 'else-if-switch'],
    objectives: ['وضعیت‌های بازی را با enum تعریف کنید.', 'با switch بین وضعیت‌ها جابه‌جا شوید.', 'انتقال وضعیت را کنترل کنید.'],
    blocks: [
      { type: 'h', text: 'ماشین وضعیت ساده' },
      { type: 'code', code: 'enum GameState { Menu, Playing, Paused, GameOver }\n\nGameState state = GameState.Menu;\n\nvoid Update(string command)\n{\n    switch (state)\n    {\n        case GameState.Menu:\n            if (command == "play") state = GameState.Playing;\n            break;\n        case GameState.Playing:\n            if (command == "pause") state = GameState.Paused;\n            if (command == "die") state = GameState.GameOver;\n            break;\n        case GameState.Paused:\n            if (command == "resume") state = GameState.Playing;\n            break;\n    }\n}\n\nUpdate("play");\nConsole.WriteLine(state);', output: 'Playing' },
      { type: 'warn', text: 'اشتباه رایج: تغییر وضعیت از هر جایی در کد. انتقال‌ها را در یک جا متمرکز کنید تا رفتار قابل پیش‌بینی بماند.' }
    ],
    quiz: [
      { q: 'با دستور play از وضعیت Menu به کدام وضعیت می‌رویم؟', options: ['Paused', 'Playing', 'GameOver', 'Menu'], answer: 1, explain: 'در وضعیت Menu، دستور play به Playing منتقل می‌کند.' },
      { q: 'مزیت enum برای وضعیت بازی چیست؟', options: ['سرعت بیشتر', 'مقادیر نام‌دار و خوانا', 'حذف switch', 'ذخیره در فایل'], answer: 1, explain: 'enum وضعیت‌ها را نام‌دار و کم‌خطا می‌کند.' }
    ]
  });

  add({ id: 'save-system', title: 'سیستم ذخیره‌سازی با نسخه‌بندی', prereq: ['json-serialization', 'file-io'],
    objectives: ['داده‌ی بازی را در فایل JSON ذخیره کنید.', 'یک فیلد نسخه برای سازگاری آینده بگذارید.', 'با خطا در بارگذاری درست رفتار کنید.'],
    blocks: [
      { type: 'h', text: 'ذخیره با نسخه' },
      { type: 'code', code: 'using System.IO;\nusing System.Text.Json;\n\nclass SaveData\n{\n    public int Version { get; set; } = 1;\n    public int Level { get; set; }\n    public int Score { get; set; }\n}\n\nvar data = new SaveData { Level = 3, Score = 420 };\nFile.WriteAllText("save.json", JsonSerializer.Serialize(data));\n\nif (File.Exists("save.json"))\n{\n    var loaded = JsonSerializer.Deserialize<SaveData>(File.ReadAllText("save.json"));\n    Console.WriteLine($"مرحله {loaded.Level}، امتیاز {loaded.Score}");\n}', output: 'مرحله 3، امتیاز 420' },
      { type: 'warn', text: 'اشتباه رایج: بدون بررسی فایل خراب، برنامه کرش می‌کند. Deserialize را در try قرار دهید و در خطا داده‌ی پیش‌فرض بسازید.' }
    ],
    quiz: [
      { q: 'فیلد Version در فایل ذخیره برای چیست؟', options: ['نمایش در صفحه', 'سازگاری با نسخه‌های بعدی بازی', 'حذف داده', 'رمزنگاری'], answer: 1, explain: 'Version کمک می‌کند هنگام تغییر ساختار، داده‌ی قدیمی شناخته و تبدیل شود.' },
      { q: 'اگر فایل ذخیره خراب باشد چه باید کرد؟', options: ['برنامه را بسته', 'در try مدیریت و داده‌ی پیش‌فرض ساخت', 'فایل را حذف و کرش', 'ادامه بدون بررسی'], answer: 1, explain: 'با مدیریت خطا، بازی بدون کرش ادامه پیدا می‌کند.' }
    ]
  });

  add({ id: 'event-bus', title: 'سیستم رویداد (Event Bus) با C#', prereq: ['events', 'static-members'],
    objectives: ['یک کلاس مرکزی رویداد بسازید.', 'بخش‌های مختلف را بدون ارجاع مستقیم به هم وصل کنید.', 'به مشترک‌ها پس از استفاده خبر دهید.'],
    blocks: [
      { type: 'h', text: 'ارتباط بدون وابستگی مستقیم' },
      { type: 'code', code: 'using System;\n\nstatic class EventBus\n{\n    public static event Action<int> ScoreChanged;\n\n    public static void RaiseScore(int value)\n    {\n        ScoreChanged?.Invoke(value);\n    }\n}\n\nEventBus.ScoreChanged += v => Console.WriteLine("امتیاز: " + v);\nEventBus.RaiseScore(10);', output: 'امتیاز: 10' },
      { type: 'warn', text: 'اشتباه رایج: مشترک نشدن هنگام نابودی شیء یا مشترک شدن چندباره. با -= از رویداد خارج شوید تا نشت حافظه نداشته باشید.' }
    ],
    quiz: [
      { q: 'مزیت Event Bus چیست؟', options: ['سرعت بیشتر از همه', 'ارتباط بخش‌ها بدون ارجاع مستقیم', 'حذف متد', 'ذخیره‌ی فایل'], answer: 1, explain: 'بخش‌ها فقط به رویداد وابسته‌اند، نه به یکدیگر.' },
      { q: 'برای خروج از مشترک شدن کدام عملگر مناسب است؟', options: ['+=', '-=', '=', '=>'], answer: 1, explain: 'با -= مشترک از رویداد جدا می‌شود.' }
    ]
  });

  add({ id: 'generic-object-pool', title: 'Object Pool عمومی با generic', prereq: ['generics', 'unity-object-pooling'],
    objectives: ['یک pool عمومی با T بسازید.', 'اشیا را Get و Return کنید.', 'بفهمید چرا این الگو برای چند نوع شیء مفید است.'],
    blocks: [
      { type: 'h', text: 'یک pool برای همه‌ی نوع‌ها' },
      { type: 'code', code: 'using System;\nusing System.Collections.Generic;\n\nclass ObjectPool<T> where T : class\n{\n    private readonly Stack<T> items = new Stack<T>();\n    private readonly Func<T> create;\n\n    public ObjectPool(Func<T> create, int prewarm)\n    {\n        this.create = create;\n        for (int i = 0; i < prewarm; i++) items.Push(create());\n    }\n\n    public T Get() => items.Count > 0 ? items.Pop() : create();\n\n    public void Return(T item) => items.Push(item);\n}', output: 'اشیا از pool گرفته و دوباره برگردانده می‌شوند.' },
      { type: 'tip', text: 'در Unity، create می‌تواند Instantiate باشد و Return می‌تواند SetActive(false) را صدا بزند.' }
    ],
    quiz: [
      { q: 'کلمه‌ی where T : class چه کاری می‌کند؟', options: ['T را struct می‌کند', 'محدود کردن T به نوع ارجاعی', 'حذف T', 'T را static می‌کند'], answer: 1, explain: 'constraint class یعنی T باید نوع ارجاعی باشد.' },
      { q: 'Get وقتی pool خالی است چه می‌کند؟', options: ['خطا می‌دهد', 'شیء جدید با create می‌سازد', 'null برمی‌گرداند', 'برنامه را متوقف می‌کند'], answer: 1, explain: 'در صورت خالی بودن، شیء جدید ساخته می‌شود.' }
    ]
  });

  add({ id: 'design-patterns', title: 'الگوهای طراحی پرکاربرد: Singleton و Observer', prereq: ['event-bus', 'static-members'],
    objectives: ['الگوی Singleton را بشناسید و کاربرد و خطرش را بگویید.', 'الگوی Observer را با رویداد پیاده‌سازی کنید.', 'بدانید چه زمانی نباید الگو را استفاده کرد.'],
    blocks: [
      { type: 'h', text: 'Singleton: یک نمونه‌ی سراسری' },
      { type: 'code', code: 'class GameSettings\n{\n    public static GameSettings Instance { get; } = new GameSettings();\n    public float Volume { get; set; } = 0.8f;\n    private GameSettings() { }\n}\n\nConsole.WriteLine(GameSettings.Instance.Volume);', output: '0.8' },
      { type: 'p', text: 'Observer یعنی یک شیء اعلام می‌کند و دیگران گوش می‌دهند؛ همان چیزی که با event در درس‌های قبل دیدید.' },
      { type: 'warn', text: 'اشتباه رایج: استفاده از Singleton برای همه‌چیز. این کار وابستگی‌های پنهان ایجاد می‌کند و تست را سخت می‌کند.' }
    ],
    quiz: [
      { q: 'Singleton چه تضمینی می‌دهد؟', options: ['صد نمونه از یک کلاس', 'فقط یک نمونه‌ی سراسری', 'نبود سازنده', 'اجرای خودکار متد'], answer: 1, explain: 'Singleton تضمین می‌کند فقط یک نمونه ساخته شود.' },
      { q: 'کدام الگو همان چیزی است که با event پیاده می‌شود؟', options: ['Singleton', 'Observer', 'Factory', 'Adapter'], answer: 1, explain: 'Observer یعنی تغییر در یک شیء به مشترک‌ها اطلاع داده می‌شود.' }
    ]
  });

  add({ id: 'dependency-injection-basics', title: 'تزریق وابستگی: وابسته به رابط، نه پیاده‌سازی', prereq: ['interfaces', 'composition'],
    objectives: ['یک رابط برای ذخیره‌ی امتیاز بسازید.', 'پیاده‌سازی را از بیرون تزریق کنید.', 'بفهمید چرا این کار تست و تغییر را آسان می‌کند.'],
    blocks: [
      { type: 'h', text: 'به رابط وابسته باشید' },
      { type: 'code', code: 'interface IScoreStore\n{\n    void Save(int score);\n}\n\nclass ConsoleStore : IScoreStore\n{\n    public void Save(int score) => Console.WriteLine("ذخیره: " + score);\n}\n\nclass Game\n{\n    private readonly IScoreStore store;\n    public Game(IScoreStore store) { this.store = store; }\n    public void Finish(int score) => store.Save(score);\n}\n\nnew Game(new ConsoleStore()).Finish(50);', output: 'ذخیره: 50' },
      { type: 'tip', text: 'برای تست، یک پیاده‌سازی ساختگی از IScoreStore بسازید و به Game بدهید؛ نیازی به فایل واقعی نیست.' }
    ],
    quiz: [
      { q: 'چرا Game به IScoreStore وابسته است، نه ConsoleStore؟', options: ['برای سرعت', 'تا بتوان پیاده‌سازی را بدون تغییر Game عوض کرد', 'چون ConsoleStore کار نمی‌کند', 'به دلیل static'], answer: 1, explain: 'وابستگی به رابط باعث انعطاف و قابلیت تست می‌شود.' },
      { q: 'پیاده‌سازی را چگونه به Game می‌دهیم؟', options: ['از داخل Game می‌سازیم', 'از بیرون در سازنده تزریق می‌کنیم', 'با Console.ReadLine', 'با static'], answer: 1, explain: 'تزریق از بیرون در سازنده انجام می‌شود.' }
    ]
  });
})();
