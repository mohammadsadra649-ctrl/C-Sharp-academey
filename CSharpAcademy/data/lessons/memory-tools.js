// موضوعات: مدیریت حافظه (Stack و Heap، Value/Reference در عمق، GC، IDisposable/using) و ابزارهای توسعه
(function () {
  const L = window.CURRICULUM.lessons;
  window.CURRICULUM.topics.push({
    id: 'memory',
    title: 'مدیریت حافظه و منابع',
    desc: 'کامپیوتر داده‌ها را کجا نگه می‌دارد؟ Stack و Heap، Garbage Collector و آزاد کردن منابع با using.',
    level: 'پیشرفته',
    lessons: ['stack-heap', 'value-reference-deep', 'garbage-collector', 'idisposable-using']
  });
  window.CURRICULUM.topics.push({
    id: 'dev-tools',
    title: 'ابزارهای توسعه',
    desc: 'IDE، پکیج‌ها با NuGet، ساختار پروژه، عیب‌یابی با Breakpoint و کار با Git.',
    level: 'مبتدی',
    lessons: ['ide-basics', 'project-structure', 'nuget-packages', 'breakpoint-debugging', 'git-basics']
  });

  L['stack-heap'] = {
    id: 'stack-heap', title: 'Stack و Heap', level: 'پیشرفته',
    prereq: ['class-vs-struct', 'methods-constructors'],
    objectives: ['تفاوت Stack و Heap را توضیح دهید.', 'بفهمید متغیرهای محلی کجا و اشیا کجا قرار می‌گیرند.', 'بدانید عمر داده‌ها در هر کدام چگونه است.'],
    blocks: [
      { type: 'h', text: 'دو ناحیه‌ی حافظه' },
      { type: 'p', text: 'Stack ناحیه‌ای منظم و سریع است که برای متغیرهای محلی و فراخوانی متدها استفاده می‌شود. وقتی متد تمام می‌شود، داده‌های آن خودکار برداشته می‌شوند. Heap ناحیه‌ای است که اشیای ساخته‌شده با new در آن قرار می‌گیرند و عمرشان به Stack وابسته نیست.' },
      { type: 'code', code: 'int a = 5;\nPerson p = new Person();' },
      { type: 'p', text: 'در کد بالا، مقدار a و خود ارجاع p روی Stack است، اما شیء Person روی Heap ساخته شده و p فقط به آن اشاره می‌کند.' },
      { type: 'tip', text: 'جزئیات پیاده‌سازی بین نسخه‌ها و کامپایلرها می‌تواند فرق کند؛ برای فهم پایه، تصور این دو ناحیه کافی است.' }
    ],
    quiz: [
      { q: 'اشیای ساخته‌شده با new معمولاً در کدام ناحیه‌اند؟', options: ['Stack', 'Heap', 'Register', 'فایل'], answer: 1, explain: 'اشیا روی Heap ساخته می‌شوند و متغیر فقط به آن‌ها اشاره می‌کند.' },
      { q: 'متغیرهای محلی متد معمولاً کجا قرار دارند؟', options: ['Heap', 'Stack', 'Console', 'Database'], answer: 1, explain: 'متغیرهای محلی روی Stack قرار می‌گیرند و با پایان متد برداشته می‌شوند.' }
    ]
  };

  L['value-reference-deep'] = {
    id: 'value-reference-deep', title: 'Value Type و Reference Type در عمق', level: 'پیشرفته',
    prereq: ['stack-heap', 'parameters-return'],
    objectives: ['بفهمید هنگام ارسال به متد چه کپی می‌شود.', 'تفاوت مقدار و ارجاع را در پارامتر ببینید.', 'کلیدواژه ref را بشناسید.'],
    blocks: [
      { type: 'h', text: 'چه چیزی کپی می‌شود؟' },
      { type: 'p', text: 'وقتی یک مقدار (مثل int) را به متد می‌دهید، یک کپی از آن ساخته می‌شود و تغییر داخل متد روی متغیر اصلی اثر ندارد. وقتی یک شیء را می‌دهید، کپی ارجاع منتقل می‌شود؛ هر دو به یک شیء اشاره می‌کنند و تغییر در شیء دیده می‌شود.' },
      { type: 'code', code: 'class Box { public int W; }\n\nstatic void ChangeNum(int x) { x = 99; }\nstatic void ChangeBox(Box b) { b.W = 99; }\nstatic void ChangeRef(ref int x) { x = 99; }\n\nint n = 1;\nChangeNum(n);\nConsole.WriteLine(n);\n\nBox box = new Box { W = 1 };\nChangeBox(box);\nConsole.WriteLine(box.W);\n\nChangeRef(ref n);\nConsole.WriteLine(n);', output: '1\n99\n99' },
      { type: 'tip', text: 'رشته (string) نوع ارجاعی است ولی تغییرناپذیر (immutable) است؛ هر تغییر یک رشته‌ی جدید می‌سازد.' },
      { type: 'warn', text: 'اشتباه رایج: فکر کردن اینکه تغییر یک شیء داخل متد روی متغیر اصلی اثر ندارد. ارجاع مشترک است، پس تغییر دیده می‌شود.' }
    ],
    quiz: [
      { q: 'بعد از ChangeNum(n) با x = 99 داخل متد، مقدار n چیست؟', options: ['99', '1', 'خطا', 'صفر'], answer: 1, explain: 'int با مقدار کپی می‌شود؛ تغییر داخل متد روی n اثری ندارد.' },
      { q: 'کلیدواژه‌ای که اجازه‌ی تغییر متغیر اصلی را از داخل متد می‌دهد کدام است؟', options: ['static', 'ref', 'const', 'var'], answer: 1, explain: 'ref ارجاع به متغیر اصلی را منتقل می‌کند تا تغییرات مستقیم دیده شوند.' }
    ]
  };

  L['garbage-collector'] = {
    id: 'garbage-collector', title: 'Garbage Collector: پاک‌سازی خودکار حافظه', level: 'پیشرفته',
    prereq: ['stack-heap'],
    objectives: ['بفهمید GC چه زمانی یک شیء را آزاد می‌کند.', 'مفهوم شیء غیرقابل دسترس را توضیح دهید.', 'بدانید چرا نباید به GC به‌طور دستی متکی بود.'],
    blocks: [
      { type: 'h', text: 'حافظه‌ی بی‌مصرف را پیدا کن' },
      { type: 'p', text: 'Garbage Collector (GC) اشیایی را که دیگر از هیچ جای برنامه قابل دسترس نیستند پیدا و آزاد می‌کند. شما لازم نیست حافظه را دستی آزاد کنید. وقتی آخرین ارجاع به یک شیء از بین برود، آن شیء زباله (garbage) محسوب می‌شود.' },
      { type: 'code', code: 'Person p = new Person();\np = null;\n// از این به بعد شیء قبلی دیگر قابل دسترس نیست' },
      { type: 'warn', text: 'اشتباه رایج: صدا زدن GC.Collect() در کد عادی. GC خودش زمان مناسب را تشخیص می‌دهد و این فراخوانی معمولاً عملکرد را بدتر می‌کند.' },
      { type: 'tip', text: 'اگر یک شیء منبع سیستمی (فایل، اتصال شبکه) نگه می‌دارد، GC آن را فوراً آزاد نمی‌کند. برای این کار IDisposable و using را ببینید.' }
    ],
    quiz: [
      { q: 'GC کدام اشیا را آزاد می‌کند؟', options: ['همه‌ی اشیا فوراً', 'اشیای غیرقابل دسترس', 'فقط اعداد', 'متغیرهای Stack'], answer: 1, explain: 'GC اشیایی را آزاد می‌کند که هیچ ارجاع فعالی به آن‌ها ندارد.' },
      { q: 'چرا نباید GC.Collect() را در کد عادی صدا زد؟', options: ['خطا می‌دهد', 'GC خودکار بهتر زمان را تشخیص می‌دهد', 'حافظه را پاک نمی‌کند', 'فقط در Unity کار می‌کند'], answer: 1, explain: 'GC زمان مناسب را خودش تشخیص می‌دهد و فراخوانی دستی معمولاً عملکرد را کاهش می‌دهد.' }
    ]
  };

  L['idisposable-using'] = {
    id: 'idisposable-using', title: 'IDisposable و using: آزاد کردن منابع', level: 'پیشرفته',
    prereq: ['interfaces', 'try-catch', 'finally-block'],
    objectives: ['منبع را با IDisposable تعریف کنید.', 'با using آزادسازی را خودکار کنید.', 'بفهمید چرا GC برای منابع سیستمی کافی نیست.'],
    blocks: [
      { type: 'h', text: 'وقتی آزاد کردن باید فوری باشد' },
      { type: 'p', text: 'منابعی مثل فایل یا اتصال شبکه را باید زودتر از زمان GC آزاد کرد. اینترفیس IDisposable متد Dispose را تعریف می‌کند. دستور using تضمین می‌کند Dispose در پایان بلوک صدا زده شود، حتی اگر خطا رخ دهد.' },
      { type: 'code', code: 'class FileHolder : IDisposable\n{\n    public void Dispose()\n    {\n        Console.WriteLine("آزاد شد");\n    }\n}\n\nusing (var h = new FileHolder())\n{\n    Console.WriteLine("استفاده");\n}', output: 'استفاده\nآزاد شد' },
      { type: 'tip', text: 'در C# نسخه‌های جدیدتر می‌توانید بنویسید: using var h = new FileHolder(); ؛ در این حالت Dispose در پایان متد یا بلوک فعلی اجرا می‌شود.' },
      { type: 'warn', text: 'اشتباه رایج: استفاده از منبع IDisposable بدون using یا try/finally. در این صورت منبع تا زمان GC باز می‌ماند.' }
    ],
    quiz: [
      { q: 'متدی که IDisposable تعریف می‌کند چه نام دارد؟', options: ['Close', 'Dispose', 'Free', 'End'], answer: 1, explain: 'IDisposable متد Dispose را تعریف می‌کند.' },
      { q: 'using چه تضمینی می‌دهد؟', options: ['Dispose در پایان بلوک صدا زده شود', 'برنامه سریع‌تر شود', 'GC متوقف شود', 'کلاس static شود'], answer: 0, explain: 'using Dispose را در پایان بلوک صدا می‌زند، حتی در صورت خطا.' }
    ]
  };

  L['ide-basics'] = {
    id: 'ide-basics', title: 'آشنایی با IDE و ویرایشگر کد', level: 'مبتدی',
    prereq: ['first-program'],
    objectives: ['یک IDE مناسب انتخاب کنید.', 'بخش‌های اصلی یک IDE را بشناسید.', 'کد را بسازید و اجرا کنید.'],
    blocks: [
      { type: 'h', text: 'محیط کار برنامه‌نویس' },
      { type: 'p', text: 'IDE (Integrated Development Environment) ویرایشگر کد، کامپایلر، و ابزار اجرا و عیب‌یابی را در یک برنامه کنار هم دارد. برای C# گزینه‌های رایج Visual Studio، Visual Studio Code با افزونه‌ی C# و JetBrains Rider هستند.' },
      { type: 'list', items: [
        'Solution Explorer یا درخت فایل: فهرست فایل‌ها و پوشه‌های پروژه',
        'IntelliSense: پیشنهاد نام‌ها و نمایش راهنمای متدها هنگام نوشتن',
        'Build: کامپایل پروژه برای پیدا کردن خطاها',
        'Run (مثلاً F5 یا Ctrl+F5): اجرای برنامه',
        'Error List: فهرست خطاها و هشدارها'
      ]},
      { type: 'tip', text: 'کلیدهای میان‌بر بین IDEها متفاوت‌اند؛ اولین کاری که باید یاد بگیرید، اجرای برنامه و دیدن Error List است.' }
    ],
    quiz: [
      { q: 'IntelliSense در IDE چه کاری می‌کند؟', options: ['حذف فایل', 'پیشنهاد نام و نمایش راهنما هنگام نوشتن', 'اتصال به اینترنت', 'فشرده‌سازی پروژه'], answer: 1, explain: 'IntelliSense هنگام نوشتن کد پیشنهاد و راهنما نشان می‌دهد.' },
      { q: 'Build در IDE برای چیست؟', options: ['پاک کردن پروژه', 'کامپایل و بررسی خطاها', 'ارسال به گیت', 'تغییر رنگ'], answer: 1, explain: 'Build پروژه را کامپایل می‌کند و خطاها را گزارش می‌دهد.' }
    ]
  };

  L['project-structure'] = {
    id: 'project-structure', title: 'ساختار فایل‌های یک پروژه C#', level: 'مبتدی',
    prereq: ['ide-basics'],
    objectives: ['فایل .csproj و .sln را از هم تشخیص دهید.', 'نقش پوشه‌های bin و obj را بدانید.', 'بدانید کدام فایل‌ها را در Git قرار دهید.'],
    blocks: [
      { type: 'h', text: 'یک پروژه از چه فایل‌هایی ساخته می‌شود؟' },
      { type: 'list', items: [
        '.csproj: تنظیمات پروژه، نسخه‌ی .NET و وابستگی‌های پکیج',
        '.sln: فایل Solution که یک یا چند پروژه را کنار هم نگه می‌دارد',
        'Program.cs: نقطه‌ی شروع برنامه',
        'bin: فایل‌های خروجی کامپایل‌شده',
        'obj: فایل‌های موقت کامپایل'
      ]},
      { type: 'warn', text: 'پوشه‌های bin و obj را معمولاً در Git قرار نمی‌دهیم چون از روی کد ساخته می‌شوند. برای این کار فایل .gitignore را استفاده کنید.' }
    ],
    quiz: [
      { q: 'تنظیمات و وابستگی‌های پروژه در کدام فایل است؟', options: ['.sln', '.csproj', 'bin', 'obj'], answer: 1, explain: 'فایل .csproj تنظیمات پروژه و وابستگی‌ها را نگه می‌دارد.' },
      { q: 'کدام پوشه معمولاً نباید در Git باشد؟', options: ['src', 'bin', 'Properties', 'Program.cs'], answer: 1, explain: 'bin خروجی کامپایل است و از روی کد ساخته می‌شود؛ معمولاً در Git نمی‌آید.' }
    ]
  };

  L['nuget-packages'] = {
    id: 'nuget-packages', title: 'مدیریت پکیج‌ها با NuGet', level: 'مبتدی',
    prereq: ['project-structure'],
    objectives: ['NuGet را به‌عنوان مدیر پکیج .NET بشناسید.', 'یک پکیج را به پروژه اضافه کنید.', 'بفهمید وابستگی‌ها در .csproj ثبت می‌شوند.'],
    blocks: [
      { type: 'h', text: 'کتابخانه‌ی آماده را از اینترنت بیاورید' },
      { type: 'p', text: 'NuGet مخزن پکیج‌های .NET است. به جای نوشتن همه‌چیز از صفر، کتابخانه‌های آماده را اضافه می‌کنید. در IDE می‌توانید از Manage NuGet Packages استفاده کنید یا با خط فرمان دستور dotnet add package را بزنید.' },
      { type: 'list', items: [
        'پکیج را جستجو و نسخه‌اش را انتخاب کنید.',
        'نصب انجام می‌شود و وابستگی در فایل .csproj ثبت می‌شود.',
        'در کد با using فضای نام پکیج را اضافه کنید.'
      ]},
      { type: 'tip', text: 'همیشه پکیج‌های معتبر و به‌روز را انتخاب کنید و نسخه‌ی سازگار با نسخه‌ی .NET پروژه را بردارید.' }
    ],
    quiz: [
      { q: 'NuGet چیست؟', options: ['یک IDE', 'مدیر پکیج‌های .NET', 'نوع داده', 'سیستم عامل'], answer: 1, explain: 'NuGet مخزن و مدیر پکیج‌های .NET است.' },
      { q: 'وابستگی یک پکیج پس از نصب در کدام فایل ثبت می‌شود؟', options: ['Program.cs', '.csproj', 'bin', 'README'], answer: 1, explain: 'فایل .csproj لیست وابستگی‌های نصب‌شده را نگه می‌دارد.' }
    ]
  };

  L['breakpoint-debugging'] = {
    id: 'breakpoint-debugging', title: 'عیب‌یابی با Breakpoint', level: 'مبتدی',
    prereq: ['errors-and-debugging', 'ide-basics'],
    objectives: ['Breakpoint بگذارید و برنامه را در آن نقطه متوقف کنید.', 'کد را خط به خط (Step) اجرا کنید.', 'مقدار متغیرها را هنگام اجرا بررسی کنید.'],
    blocks: [
      { type: 'h', text: 'مرحله به مرحله ببینید' },
      { type: 'p', text: 'Breakpoint نقطه‌ای در کد است که اجرا را هنگام رسیدن به آن متوقف می‌کند. از آن‌جا می‌توانید با Step Over یا Step Into جلو بروید و در بخش Locals یا با نگه‌داشتن ماوس روی متغیر، مقدارها را ببینید.' },
      { type: 'code', code: 'int sum = 0;\nfor (int i = 1; i <= 3; i++)\n{\n    sum = i;\n}\nConsole.WriteLine(sum);', output: '3 (انتظار: 6)' },
      { type: 'p', text: 'با گذاشتن Breakpoint روی خط sum = i و دیدن مقدار sum در هر بار، می‌بینید که به جای جمع شدن، مقدار جایگزین می‌شود. اصلاح: sum += i.' },
      { type: 'tip', text: 'کلید F9 معمولاً Breakpoint می‌گذارد و F10 یا F11 برای قدم‌به‌قدم رفتن است؛ کلیدها بسته به IDE فرق می‌کنند.' }
    ],
    quiz: [
      { q: 'Breakpoint چه کاری انجام می‌دهد؟', options: ['کد را حذف می‌کند', 'اجرا را در یک نقطه متوقف می‌کند', 'کامپایل را سریع‌تر می‌کند', 'فایل ذخیره می‌کند'], answer: 1, explain: 'با رسیدن اجرا به Breakpoint، برنامه متوقف می‌شود تا بررسی کنیم.' },
      { q: 'در مثال بالا، چرا خروجی 3 است؟', options: ['حلقه سه بار اجرا نمی‌شود', 'sum هر بار جایگزین می‌شود نه جمع', 'Console اشتباه است', 'کد خطا دارد'], answer: 1, explain: 'sum = i مقدار قبلی را پاک می‌کند؛ باید sum += i باشد.' }
    ]
  };

  L['git-basics'] = {
    id: 'git-basics', title: 'آشنایی با Git و کنترل نسخه', level: 'مبتدی',
    prereq: ['project-structure'],
    objectives: ['Git را به‌عنوان سیستم ثبت تاریخچه‌ی تغییرات بشناسید.', 'چرخه‌ی ساده‌ی add، commit و status را بدانید.', 'بفهمید چرا فایل .gitignore مهم است.'],
    blocks: [
      { type: 'h', text: 'تاریخچه‌ی پروژه، همیشه در دسترس' },
      { type: 'p', text: 'Git سیستم کنترل نسخه است. هر تغییر مهم را به‌صورت commit ثبت می‌کنید و در صورت نیاز به نسخه‌های قبلی برمی‌گردید. این کار برای کار تیمی و یادآوری تغییرات بسیار مفید است.' },
      { type: 'list', items: [
        'git init: ساخت مخزن جدید در پوشه‌ی پروژه',
        'git status: نمایش فایل‌های تغییر‌یافته',
        'git add: انتخاب فایل‌ها برای ثبت',
        'git commit -m "پیام": ثبت تغییرات با توضیح کوتاه',
        'git log: مشاهده‌ی تاریخچه‌ی commitها'
      ]},
      { type: 'warn', text: 'فایل‌های موقت و خروجی (مثل bin و obj) را با .gitignore از Git خارج کنید تا مخزن تمیز بماند.' }
    ],
    quiz: [
      { q: 'کدام دستور تغییرات انتخاب‌شده را ثبت می‌کند؟', options: ['git add', 'git commit', 'git init', 'git log'], answer: 1, explain: 'git commit تغییرات آماده را با یک پیام ثبت می‌کند.' },
      { q: 'کدام فایل مشخص می‌کند Git کدام فایل‌ها را نادیده بگیرد؟', options: ['.csproj', '.gitignore', 'Program.cs', '.sln'], answer: 1, explain: '.gitignore فهرست فایل‌ها و پوشه‌هایی است که Git باید نادیده بگیرد.' }
    ]
  };
})();
