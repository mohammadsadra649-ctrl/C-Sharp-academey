// موضوع: Delegate، Lambda و Event
// بعد از انواع پیشرفته و قبل از Unity بارگذاری می‌شود.
(function () {
  window.CURRICULUM.topics.push({
    id: 'delegates-events',
    title: 'Delegate، Lambda و Event',
    desc: 'متد را مثل داده جابه‌جا کنید، تابع کوتاه بنویسید و با رویدادها به اتفاق‌های برنامه واکنش نشان دهید.',
    level: 'متوسط',
    lessons: ['delegate-basics', 'lambda-expressions', 'events']
  });

  window.CURRICULUM.lessons['delegate-basics'] = {
    id: 'delegate-basics',
    title: 'Delegate: متد به‌عنوان مقدار',
    level: 'متوسط',
    prereq: ['method-basics', 'parameters-return'],
    objectives: [
      'نوع delegate را تعریف کنید.',
      'یک متد هم‌امضا را به delegate نسبت دهید.',
      'delegate را مثل یک تابع فراخوانی کنید.'
    ],
    blocks: [
      { type: 'h', text: 'متد را در یک متغیر نگه دارید' },
      { type: 'p', text: 'delegate نوعی است که به یک متد اشاره می‌کند. هر متدی که امضای آن (نوع خروجی و پارامترها) با delegate یکسان باشد، می‌تواند به آن نسبت داده شود. این امکان، انتخاب رفتار را در زمان اجرا ممکن می‌کند.' },
      { type: 'code',
        code: 'delegate int Operation(int a, int b);\n\nstatic int Add(int a, int b)\n{\n    return a + b;\n}\n\nOperation op = Add;\nConsole.WriteLine(op(2, 3));',
        notes: {
          1: 'Operation نوع متدهایی است که دو int می‌گیرند و int برمی‌گردانند.',
          3: 'Add امضای مطابق دارد.',
          8: 'متد Add به متغیر op نسبت داده شده است.',
          9: 'فراخوانی op همان Add را اجرا می‌کند.'
        },
        output: '5' },
      { type: 'warn', text: 'اشتباه رایج: نسبت دادن متدی با امضای متفاوت. اگر تعداد یا نوع پارامترها یا خروجی فرق کند، کامپایلر خطا می‌دهد.' }
    ],
    quiz: [
      { q: 'delegate در C# بیشتر برای چیست؟', options: ['ذخیره‌ی فایل', 'اشاره به یک متد', 'ساخت کلاس', 'حذف متغیر'], answer: 1, explain: 'delegate نوعی است که به متدهای هم‌امضا اشاره می‌کند.' },
      { q: 'کدام متد به delegate از نوع delegate int Op(int a, int b) نسبت داده می‌شود؟', options: ['void Show(int a)', 'int Sum(int x, int y)', 'string Name()', 'int Calc(int a)'], answer: 1, explain: 'Sum دو int می‌گیرد و int برمی‌گرداند، پس امضایش یکسان است.' }
    ]
  };

  window.CURRICULUM.lessons['lambda-expressions'] = {
    id: 'lambda-expressions',
    title: 'Lambda: تابع کوتاه و بی‌نام',
    level: 'متوسط',
    prereq: ['delegate-basics'],
    objectives: [
      'lambda را با علامت => بنویسید.',
      'از Func و Action برای نوشتن lambda استفاده کنید.',
      'تفاوت Func (با خروجی) و Action (بدون خروجی) را بگویید.'
    ],
    blocks: [
      { type: 'h', text: 'تابع کوتاه بدون نام' },
      { type: 'p', text: 'lambda راهی کوتاه برای نوشتن تابع است. x => x * x یعنی «x را بگیر و x ضربدر x را برگردان». برای نوشتن lambda لازم نیست متد جدا تعریف کنیم.' },
      { type: 'code',
        code: 'Func<int, int> square = x => x * x;\nConsole.WriteLine(square(4));\n\nAction<string> say = msg => Console.WriteLine(msg);\nsay("سلام");',
        notes: {
          1: 'Func<int, int> یعنی یک ورودی int و خروجی int.',
          2: 'lambda مربع عدد را حساب می‌کند.',
          4: 'Action<string> یعنی یک ورودی string و بدون خروجی.',
          5: 'lambda پیام را چاپ می‌کند.'
        },
        output: '16\nسلام' },
      { type: 'tip', text: 'Func و Action در فضای نام System قرار دارند. در پروژه‌های جدید C# معمولاً این فضای نام به‌صورت خودکار اضافه است.' },
      { type: 'warn', text: 'اشتباه رایج: اشتباه گرفتن = و =>. = مقداردهی است؛ => یعنی تعریف lambda.' }
    ],
    quiz: [
      { q: 'کدام Func یک ورودی int و خروجی bool دارد؟', options: ['Func<bool, int>', 'Func<int, bool>', 'Action<int>', 'Action<bool>'], answer: 1, explain: 'در Func آخرین نوع، نوع خروجی است؛ پس Func<int, bool>.' },
      { q: 'Action چه ویژگی دارد؟', options: ['خروجی دارد', 'بدون خروجی است', 'فقط برای عدد است', 'نیاز به ورودی ندارد'], answer: 1, explain: 'Action متدهایی را نشان می‌دهد که خروجی ندارند.' }
    ]
  };

  window.CURRICULUM.lessons['events'] = {
    id: 'events',
    title: 'Event: اعلام اتفاق و واکنش به آن',
    level: 'متوسط',
    prereq: ['lambda-expressions', 'class-and-object'],
    objectives: [
      'یک event در کلاس تعریف کنید.',
      'با += به event مشترک شوید.',
      'رویداد را با Invoke اعلام کنید.'
    ],
    blocks: [
      { type: 'h', text: 'وقتی اتفاقی می‌افتد، خبر بده' },
      { type: 'p', text: 'event راهی است که یک کلاس اعلام کند اتفاقی افتاده است، بدون اینکه بداند چه کسی گوش می‌دهد. دیگر بخش‌های برنامه با += مشترک می‌شوند و هنگام وقوع رویداد، کدشان اجرا می‌شود. این الگو در رابط کاربری و بازی‌ها بسیار رایج است.' },
      { type: 'code',
        code: 'class Button\n{\n    public event EventHandler Clicked;\n\n    public void Click()\n    {\n        Clicked?.Invoke(this, EventArgs.Empty);\n    }\n}\n\nButton b = new Button();\nb.Clicked += (s, e) => Console.WriteLine("کلیک شد");\nb.Click();',
        notes: {
          3: 'Clicked یک event است که دیگران می‌توانند به آن مشترک شوند.',
          7: 'Invoke اعلام می‌کند رویداد رخ داده؛ ?. یعنی اگر هیچ مشترکی نبود، خطا نشود.',
          12: 'مشترک می‌شویم: هر بار کلیک شود، این lambda اجرا می‌شود.',
          13: 'کلیک را شبیه‌سازی می‌کنیم.'
        },
        output: 'کلیک شد' },
      { type: 'warn', text: 'اشتباه رایج: اعلام event بدون ?. وقتی هیچ مشترکی نیست. Clicked.Invoke بدون بررسی null، NullReferenceException می‌دهد.' }
    ],
    quiz: [
      { q: 'برای مشترک شدن به یک event از کدام عملگر استفاده می‌شود؟', options: ['=', '+=', '==', '=>'], answer: 1, explain: 'با += یک مشترک به event اضافه می‌شود.' },
      { q: 'چرا در Clicked?.Invoke از ?. استفاده می‌کنیم؟', options: ['برای سرعت', 'تا اگر مشترکی نبود خطا ندهد', 'برای حذف event', 'این کار لازم نیست'], answer: 1, explain: '?. از خطای null جلوگیری می‌کند وقتی هیچ کسی مشترک نشده است.' }
    ]
  };
})();
