// تکمیل OOP: class در برابر struct، record، partial، Generics و اصول SOLID (مقدماتی)
// این درس‌ها به انتهای موضوع «برنامه‌نویسی شیءگرا» اضافه می‌شوند.
(function () {
  const oop = window.CURRICULUM.topics.find(t => t.id === 'oop');
  oop.lessons.push('class-vs-struct', 'records', 'partial-classes', 'generics', 'solid-basics');

  const lessons = {
    'class-vs-struct': {
      id: 'class-vs-struct',
      title: 'تفاوت class و struct',
      level: 'متوسط',
      prereq: ['class-and-object', 'methods-constructors'],
      objectives: [
        'تفاوت نوع مقداری (struct) و نوع ارجاعی (class) را توضیح دهید.',
        'بفهمید انتساب دو struct یک کپی می‌سازد اما انتساب دو class ارجاع مشترک می‌دهد.',
        'بدانید چه زمانی struct مناسب است.'
      ],
      blocks: [
        { type: 'h', text: 'مقداری یا ارجاعی؟' },
        { type: 'p', text: 'struct یک نوع مقداری (Value Type) است؛ وقتی یک struct را به متغیر دیگری می‌دهید، کپی مستقل ساخته می‌شود. class یک نوع ارجاعی (Reference Type) است؛ متغیر فقط به شیء اشاره می‌کند و دو متغیر می‌توانند به یک شیء اشاره کنند.' },
        { type: 'code',
          code: 'struct Point { public int X; public int Y; }\nclass Box { public int W; }\n\nPoint a = new Point { X = 1 };\nPoint b = a;\nb.X = 9;\nConsole.WriteLine(a.X);\n\nBox x = new Box { W = 1 };\nBox y = x;\ny.W = 9;\nConsole.WriteLine(x.W);',
          notes: {
            1: 'Point نوع مقداری است.',
            5: 'b کپی مستقل a است.',
            6: 'تغییر b روی a اثر نمی‌گذارد.',
            10: 'y و x به یک شیء اشاره می‌کنند.',
            11: 'تغییر y همان شیء مشترک را تغییر می‌دهد.'
          },
          output: '1\n9' },
        { type: 'tip', text: 'برای داده‌های کوچک و بدون رفتار پیچیده (مثل مختصات یا رنگ) struct مناسب است. در بیشتر موارد دیگر class را استفاده کنید.' },
        { type: 'warn', text: 'اشتباه رایج: انتظار داشتن که تغییر یک متغیر class روی متغیر دیگر اثر نگذارد. اگر هر دو به یک شیء اشاره کنند، تغییر مشترک است.' }
      ],
      quiz: [
        { q: 'کدام نوع هنگام انتساب، کپی مستقل می‌سازد؟', options: ['class', 'struct', 'هر دو', 'هیچ‌کدام'], answer: 1, explain: 'struct نوع مقداری است و انتساب آن کپی می‌سازد.' },
        { q: 'اگر دو متغیر class به یک شیء اشاره کنند و یکی را تغییر دهیم چه می‌شود؟', options: ['فقط همان متغیر تغییر می‌کند', 'شیء مشترک تغییر می‌کند و دیگری هم آن را می‌بیند', 'خطا می‌دهد', 'هیچ تغییری نمی‌کند'], answer: 1, explain: 'در نوع ارجاعی، هر دو متغیر به یک شیء واحد اشاره می‌کنند.' }
      ]
    },

    'records': {
      id: 'records',
      title: 'Record: کلاس با مقایسه‌ی بر اساس مقدار',
      level: 'متوسط',
      prereq: ['class-vs-struct'],
      objectives: [
        'record را برای نگهداری داده تعریف کنید.',
        'بفهمید دو record با مقدار یکسان برابر هستند.',
        'بدانید record برای داده‌های تغییرناپذیر مناسب است.'
      ],
      blocks: [
        { type: 'h', text: 'داده‌ای که با مقدارش مقایسه می‌شود' },
        { type: 'p', text: 'record نوعی کلاس است که برای نگهداری داده طراحی شده. برخلاف class معمولی، مقایسه‌ی == دو record را بر اساس مقدار فیلدهایشان انجام می‌دهد، نه بر اساس اینکه آیا دو شیء یکسان‌اند.' },
        { type: 'code',
          code: 'record Person(string Name, int Age);\n\nvar p1 = new Person("Ali", 20);\nvar p2 = new Person("Ali", 20);\nConsole.WriteLine(p1 == p2);',
          notes: {
            1: 'این یک تعریف کوتاه record با دو ویژگی Name و Age است.',
            4: 'دو شیء جدا با مقدار یکسان ساخته می‌شوند.',
            5: 'مقایسه بر اساس مقدار انجام می‌شود، پس True است.'
          },
          output: 'True' },
        { type: 'warn', text: 'اشتباه رایج: انتظار داشتن که record مثل class معمولی به مقایسه‌ی ارجاع رفتار کند. این رفتار فقط برای record است.' },
        { type: 'tip', text: 'توجه: record در C# 9 و بالاتر وجود دارد. در Unity 2019.4 (C# 7.3) در دسترس نیست.' }
      ],
      quiz: [
        { q: 'مقایسه‌ی دو record با مقدار یکسان چه نتیجه‌ای دارد؟', options: ['False', 'True', 'خطا', 'به ترتیب تعریف'], answer: 1, explain: 'record بر اساس مقدار فیلدهایش مقایسه می‌شود.' },
        { q: 'کدام نسخه‌ی C# از record پشتیبانی می‌کند؟', options: ['C# 7.3', 'C# 9 و بالاتر', 'هیچ نسخه‌ای', 'فقط C# 2'], answer: 1, explain: 'record از C# 9 به بعد در دسترس است.' }
      ]
    },

    'partial-classes': {
      id: 'partial-classes',
      title: 'کلاس‌های جزئی (Partial)',
      level: 'متوسط',
      prereq: ['class-and-object'],
      objectives: [
        'کلاس partial را در چند فایل تعریف کنید.',
        'بفهمید کامپایلر همه‌ی بخش‌ها را یک کلاس واحد می‌داند.',
        'کاربرد partial را در کدهای تولیدشده‌ی خودکار توضیح دهید.'
      ],
      blocks: [
        { type: 'h', text: 'یک کلاس در چند فایل' },
        { type: 'p', text: 'با کلیدواژه partial می‌توان تعریف یک کلاس را بین چند فایل تقسیم کرد. کامپایلر همه‌ی این بخش‌ها را یک کلاس واحد در نظر می‌گیرد. این روش در کدهایی که ابزارها به‌صورت خودکار تولید می‌کنند (مثل فرم‌ها) زیاد دیده می‌شود.' },
        { type: 'code',
          code: '// فایل اول: Report1.cs\npublic partial class Report\n{\n    public void Start() { Console.WriteLine("شروع"); }\n}\n\n// فایل دوم: Report2.cs\npublic partial class Report\n{\n    public void Finish() { Console.WriteLine("پایان"); }\n}\n\n// استفاده\nReport r = new Report();\nr.Start();\nr.Finish();',
          notes: {
            2: 'بخش اول کلاس Report.',
            8: 'بخش دوم همان کلاس Report است.'
          },
          output: 'شروع\nپایان' },
        { type: 'warn', text: 'اشتباه رایج: فراموش کردن partial در یکی از بخش‌ها. همه‌ی بخش‌ها باید این کلیدواژه را داشته باشند.' }
      ],
      quiz: [
        { q: 'کلیدواژه‌ی partial چه کاری می‌کند؟', options: ['کلاس را غیرفعال می‌کند', 'تعریف یک کلاس را بین چند فایل تقسیم می‌کند', 'کلاس را static می‌کند', 'کلاس را حذف می‌کند'], answer: 1, explain: 'partial اجازه می‌دهد یک کلاس در چند فایل تعریف شود.' },
        { q: 'اگر یکی از بخش‌های partial کلمه‌ی partial را نداشته باشد چه می‌شود؟', options: ['هیچ اتفاقی نمی‌افتد', 'خطای کامپایل', 'کلاس دو بار ساخته می‌شود', 'فقط آن بخش اجرا می‌شود'], answer: 1, explain: 'همه‌ی بخش‌ها باید partial باشند؛ در غیر این صورت کامپایلر خطا می‌دهد.' }
      ]
    },

    'generics': {
      id: 'generics',
      title: 'Generics: کد قابل استفاده برای هر نوع',
      level: 'متوسط',
      prereq: ['class-and-object', 'arrays-basics'],
      objectives: [
        'یک کلاس generic با پارامتر نوع T بسازید.',
        'بفهمید چرا generic بهتر از نوشتن چند نسخه‌ی جدا است.',
        'با List<T> به‌عنوان نمونه‌ی generic آشنا شوید.'
      ],
      blocks: [
        { type: 'h', text: 'یک کد، چند نوع' },
        { type: 'p', text: 'Generic اجازه می‌دهد کلاس یا متد را با یک نوع نامشخص (T) بنویسیم و هنگام استفاده نوع واقعی را مشخص کنیم. به این ترتیب بدون تکرار کد، هم برای عدد و هم برای متن کار می‌کند و خطاهای نوع در زمان کامپایل دیده می‌شوند.' },
        { type: 'code',
          code: 'class Box<T>\n{\n    public T Value;\n}\n\nBox<int> a = new Box<int> { Value = 5 };\nBox<string> b = new Box<string> { Value = "سلام" };\nConsole.WriteLine(a.Value + 1);\nConsole.WriteLine(b.Value);',
          notes: {
            1: 'T یک پارامتر نوع است که هنگام استفاده مشخص می‌شود.',
            6: 'Box<int> یعنی Value از نوع int است.',
            7: 'Box<string> یعنی Value از نوع string است.'
          },
          output: '6\nسلام' },
        { type: 'tip', text: 'List<T> و Dictionary<TKey, TValue> هم generic هستند؛ همان مفهومی که الان دیدید.' },
        { type: 'warn', text: 'اشتباه رایج: فکر کردن که generic همان object است. با object، تبدیل نوع و خطای زمان اجرا بیشتر می‌شود؛ generic این خطاها را زودتر نشان می‌دهد.' }
      ],
      quiz: [
        { q: 'در Box<T>، حرف T چیست؟', options: ['نام کلاس', 'پارامتر نوع', 'یک متد', 'یک فیلد ثابت'], answer: 1, explain: 'T یک پارامتر نوع است که هنگام ساخت شیء مشخص می‌شود.' },
        { q: 'با Box<int> و مقدار Value = 5، عبارت a.Value + 1 چه نتیجه‌ای دارد؟', options: ['51', '6', 'خطا', '5'], answer: 1, explain: 'چون Value از نوع int است، جمع عددی انجام می‌شود: 6.' }
      ]
    },

    'solid-basics': {
      id: 'solid-basics',
      title: 'اصول SOLID در سطح مقدماتی',
      level: 'متوسط',
      prereq: ['interfaces', 'composition', 'encapsulation'],
      objectives: [
        'پنج اصل SOLID را به زبان ساده بیان کنید.',
        'اصل مسئولیت واحد (SRP) را روی یک نمونه اعمال کنید.',
        'بفهمید چرا اصول SOLID کد را قابل نگه‌داری می‌کنند.'
      ],
      blocks: [
        { type: 'h', text: 'پنج اصل طراحی' },
        { type: 'list', items: [
          'S (Single Responsibility): هر کلاس فقط یک دلیل برای تغییر داشته باشد.',
          'O (Open/Closed): کلاس برای گسترش باز و برای تغییر بسته باشد.',
          'L (Liskov Substitution): فرزند باید بتواند جای والد بنشیند.',
          'I (Interface Segregation): رابط‌ها کوچک و متمرکز باشند.',
          'D (Dependency Inversion): به رابط وابسته باشید، نه به کلاس مشخص.'
        ]},
        { type: 'h', text: 'مثال: مسئولیت واحد' },
        { type: 'p', text: 'در کد زیر، فاکتور هم داده را نگه می‌دارد و هم آن را چاپ می‌کند. اگر فرمت چاپ عوض شود، باید خود فاکتور را تغییر دهیم. با جدا کردن چاپ، هر کلاس یک کار دارد.' },
        { type: 'code',
          code: 'class Invoice\n{\n    public decimal Total { get; set; }\n}\n\nclass InvoicePrinter\n{\n    public void Print(Invoice invoice)\n    {\n        Console.WriteLine("جمع: " + invoice.Total);\n    }\n}\n\nInvoice inv = new Invoice { Total = 250 };\nnew InvoicePrinter().Print(inv);',
          notes: {
            1: 'Invoice فقط داده‌ی فاکتور را نگه می‌دارد.',
            6: 'InvoicePrinter فقط مسئول نمایش است.'
          },
          output: 'جمع: 250' },
        { type: 'tip', text: 'SOLID قانون سخت نیست؛ راهنماست. در پروژه‌های کوچک، اعمال بیش‌ازحد آن‌ها کد را پیچیده می‌کند. هدف، کد خوانا و قابل تغییر است.' }
      ],
      quiz: [
        { q: 'حرف S در SOLID به چه اصلی اشاره دارد؟', options: ['Static', 'Single Responsibility', 'Simple Syntax', 'Structure'], answer: 1, explain: 'S مخفف Single Responsibility، یعنی هر کلاس یک مسئولیت اصلی دارد.' },
        { q: 'در مثال Invoice و InvoicePrinter، چرا چاپ جدا شده است؟', options: ['برای سرعت بیشتر', 'تا هر کلاس یک مسئولیت داشته باشد', 'چون Invoice نمی‌تواند عدد داشته باشد', 'به دلیل قانون C#'], answer: 1, explain: 'جداسازی باعث می‌شود تغییر در نمایش، کلاس داده را تغییر ندهد.' }
      ]
    }
  };

  Object.assign(window.CURRICULUM.lessons, lessons);
})();
