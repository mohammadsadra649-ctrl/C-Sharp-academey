// موضوع: برنامه‌نویسی شیءگرا (OOP) - بخش اول
// بعد از functions-collections و قبل از unity-2019 بارگذاری می‌شود.
(function () {
  window.CURRICULUM.topics.push({
    id: 'oop',
    title: 'برنامه‌نویسی شیءگرا (OOP)',
    desc: 'کلاس، شیء، فیلد، Property، سازنده، سطح دسترسی و کپسوله‌سازی؛ مدل‌سازی داده‌های دنیای واقعی با کد.',
    level: 'متوسط',
    lessons: ['class-and-object', 'fields-properties', 'methods-constructors', 'this-keyword', 'access-modifiers', 'encapsulation']
  });

  const lessons = {
    'class-and-object': {
      id: 'class-and-object',
      title: 'کلاس و شیء',
      level: 'متوسط',
      prereq: ['method-basics', 'variables'],
      objectives: [
        'تفاوت کلاس (الگو) و شیء (نمونه‌ی واقعی) را توضیح دهید.',
        'یک کلاس ساده تعریف کنید و از آن شیء بسازید.',
        'بدانید هر شیء داده‌ی خودش را دارد.'
      ],
      blocks: [
        { type: 'h', text: 'کلاس مثل نقشه، شیء مثل ساختمان' },
        { type: 'p', text: 'کلاس الگویی است که می‌گوید یک چیز از چه ویژگی‌ها و رفتارهایی تشکیل شده است. شیء نمونه‌ای واقعی از همان الگوست. از یک نقشه‌ی خانه می‌توان چند ساختمان ساخت؛ هرکدام آدرس و رنگ خودشان را دارند، ولی همه از یک نقشه آمده‌اند.' },
        { type: 'code',
          code: 'class Car\n{\n    public string Brand;\n    public int Speed;\n}\n\nclass Program\n{\n    static void Main()\n    {\n        Car c1 = new Car();\n        c1.Brand = "Peugeot";\n        c1.Speed = 90;\n\n        Car c2 = new Car();\n        c2.Brand = "Samand";\n\n        Console.WriteLine(c1.Brand + " " + c1.Speed);\n        Console.WriteLine(c2.Brand);\n    }\n}',
          notes: {
            1: 'کلاس Car یک الگو است؛ هنوز هیچ ماشینی ساخته نشده.',
            11: 'new Car() یک شیء جدید از کلاس Car می‌سازد.',
            15: 'c2 شیء دیگری است با داده‌ی خودش؛ Speed آن مقدار پیش‌فرض صفر را دارد.'
          },
          output: 'Peugeot 90\nSamand' },
        { type: 'warn', text: 'اشتباه رایج: فکر کردن اینکه c1 و c2 یک داده را نگه می‌دارند. هر شیء فیلدهای مخصوص خودش را دارد.' },
        { type: 'tip', text: 'اسم کلاس‌ها را با حرف بزرگ و به شکل اسم بنویسید (Car، Student). این یک قرارداد رایج در C# است.' }
      ],
      quiz: [
        { q: 'کلاس در مقایسه با شیء چه نقشی دارد؟', options: ['نمونه‌ی واقعی است', 'الگو یا نقشه است', 'فقط متغیر است', 'همان نام شیء است'], answer: 1, explain: 'کلاس الگوست و شیء نمونه‌ای از آن است که با new ساخته می‌شود.' },
        { q: 'با دو بار new Car() چند شیء ساخته می‌شود؟', options: ['یک', 'دو', 'صفر', 'به تعداد فیلدها'], answer: 1, explain: 'هر بار new یک شیء جدید می‌سازد؛ پس دو شیء مستقل داریم.' }
      ]
    },

    'fields-properties': {
      id: 'fields-properties',
      title: 'فیلدها و ویژگی‌ها (Properties)',
      level: 'متوسط',
      prereq: ['class-and-object'],
      objectives: [
        'فیلد و Property را از هم تفکیک کنید.',
        'Property با get و set بنویسید.',
        'با Property کنترل کنید چه مقداری قبول شود.'
      ],
      blocks: [
        { type: 'h', text: 'فیلد و Property' },
        { type: 'p', text: 'فیلد متغیری است که داخل کلاس نگه داشته می‌شود. Property ظاهری شبیه فیلد دارد، اما با get و set می‌توانیم هنگام خواندن یا نوشتن، منطق دلخواه اجرا کنیم. در عمل، Property رایج‌ترین راه دسترسی به داده‌های یک کلاس است.' },
        { type: 'code',
          code: 'class Student\n{\n    private int _score;\n\n    public int Score\n    {\n        get { return _score; }\n        set\n        {\n            if (value < 0 || value > 20)\n            {\n                Console.WriteLine("نمره نامعتبر است");\n                return;\n            }\n            _score = value;\n        }\n    }\n}',
          notes: {
            3: '_score فیلد خصوصی است و مستقیم از بیرون دیده نمی‌شود.',
            6: 'get مقدار را برمی‌گرداند.',
            8: 'set مقدار جدید را در value می‌گیرد.',
            9: 'قبل از ذخیره، بررسی می‌کنیم که نمره در بازه‌ی معتبر باشد.'
          },
          output: 'اگر Score = 25 بدهیم: نمره نامعتبر است' },
        { type: 'h', text: 'Auto-implemented Property' },
        { type: 'p', text: 'اگر منطق خاصی لازم نیست، می‌توانید بنویسید: public string Name { get; set; }. کامپایلر فیلد پشت‌صحنه را خودش می‌سازد.' },
        { type: 'warn', text: 'اشتباه رایج: فیلد را public کردن برای همه‌ی داده‌ها. این کار کنترل روی مقدار را از بین می‌برد.' }
      ],
      quiz: [
        { q: 'کدام Property برای خواندن و نوشتن ساده بدون منطق خاص مناسب است؟', options: ['public int X { get; set; }', 'int X;', 'public X { int }', 'get int X'], answer: 0, explain: 'Auto-implemented Property با get و set بدون بدنه نوشته می‌شود.' },
        { q: 'در set، مقدار ورودی در چه متغیری قرار دارد؟', options: ['input', 'value', 'set', 'result'], answer: 1, explain: 'در set کلمه‌ی خاص value مقدار جدیدی را نگه می‌دارد که به Property داده شده است.' }
      ]
    },

    'methods-constructors': {
      id: 'methods-constructors',
      title: 'متدهای کلاس و سازنده‌ها',
      level: 'متوسط',
      prereq: ['fields-properties'],
      objectives: [
        'متد داخل کلاس بنویسید که روی داده‌های همان شیء کار کند.',
        'سازنده (Constructor) بنویسید تا شیء با مقدار اولیه ساخته شود.',
        'سازنده‌ی چندگانه را بشناسید.'
      ],
      blocks: [
        { type: 'h', text: 'سازنده' },
        { type: 'p', text: 'سازنده متدی است با همان نام کلاس که هنگام ساخته شدن شیء اجرا می‌شود. با آن می‌توان اطمینان داد که شیء از همان ابتدا در وضعیت درست است و مقدار اولیه دارد.' },
        { type: 'code',
          code: 'class Account\n{\n    public string Owner { get; set; }\n    public int Balance { get; private set; }\n\n    public Account(string owner, int initial)\n    {\n        Owner = owner;\n        Balance = initial;\n    }\n\n    public void Deposit(int amount)\n    {\n        Balance += amount;\n    }\n}\n\nAccount acc = new Account("Ali", 100);\nacc.Deposit(50);\nConsole.WriteLine(acc.Owner + ": " + acc.Balance);',
          notes: {
            4: 'سازنده با نام کلاس و بدون نوع بازگشتی نوشته می‌شود.',
            5: 'private set یعنی Balance فقط از داخل کلاس قابل تغییر است.',
            16: 'Deposit روی همین شیء کار می‌کند و Balance آن را افزایش می‌دهد.'
          },
          output: 'Ali: 150' },
        { type: 'warn', text: 'اشتباه رایج: فراموش کردن new هنگام ساخت شیء. Account acc; فقط یک متغیر تعریف می‌کند، نه شیء.' }
      ],
      quiz: [
        { q: 'سازنده چه زمانی اجرا می‌شود؟', options: ['هنگام حذف شیء', 'هنگام ساخته شدن شیء با new', 'هر فریم', 'هنگام بستن برنامه'], answer: 1, explain: 'سازنده هنگام ساخت شیء با new اجرا می‌شود.' },
        { q: 'Account acc; چه کاری انجام می‌دهد؟', options: ['شیء می‌سازد', 'فقط متغیری از نوع Account تعریف می‌کند', 'سازنده را اجرا می‌کند', 'Balance را صفر می‌کند'], answer: 1, explain: 'بدون new، شیء ساخته نمی‌شود؛ فقط متغیر تعریف شده است.' }
      ]
    },

    'this-keyword': {
      id: 'this-keyword',
      title: 'کلمه‌ی کلیدی this',
      level: 'متوسط',
      prereq: ['methods-constructors'],
      objectives: [
        'بفهمید this به شیء جاری اشاره می‌کند.',
        'وقتی نام پارامتر و فیلد یکسان است، از this استفاده کنید.',
        'بدانید this در متدهای static قابل استفاده نیست.'
      ],
      blocks: [
        { type: 'h', text: 'this یعنی همین شیء' },
        { type: 'p', text: 'this به شیئی اشاره می‌کند که متد یا سازنده روی آن اجرا شده است. وقتی پارامتر و فیلد هم‌نام باشند، با this مشخص می‌کنیم کدام را منظور داریم.' },
        { type: 'code',
          code: 'class Point\n{\n    public int X;\n    public int Y;\n\n    public Point(int x, int y)\n    {\n        this.X = x;\n        this.Y = y;\n    }\n}\n\nPoint p = new Point(3, 7);\nConsole.WriteLine(p.X + ", " + p.Y);',
          notes: {
            5: 'این سازنده پارامترهای x و y را می‌گیرد.',
            8: 'this.X یعنی فیلد X همین شیء؛ x پارامتر ورودی است.'
          },
          output: '3, 7' },
        { type: 'warn', text: 'اشتباه رایج: نوشتن X = X بدون this. در این حالت پارامتر به خودش انتساب می‌شود و فیلد تغییر نمی‌کند.' }
      ],
      quiz: [
        { q: 'this در یک متد به چه اشاره می‌کند؟', options: ['کلاس', 'شیء جاری', 'پروژه', 'فضای نام'], answer: 1, explain: 'this به شیئی اشاره می‌کند که متد روی آن اجرا شده است.' },
        { q: 'در سازنده‌ی Point(int x, int y) برای مقداردهی فیلد X کدام درست است؟', options: ['X = X', 'this.X = x', 'x = this.x', 'Point.X = x'], answer: 1, explain: 'this.X فیلد شیء را مشخص می‌کند و x مقدار ورودی را می‌دهد.' }
      ]
    },

    'access-modifiers': {
      id: 'access-modifiers',
      title: 'سطح دسترسی: public، private، protected، internal',
      level: 'متوسط',
      prereq: ['this-keyword'],
      objectives: [
        'معنی public، private، protected و internal را بدانید.',
        'بر اساس نیاز، سطح دسترسی مناسب انتخاب کنید.',
        'بفهمید پیش‌فرض دسترسی اعضای کلاس private است.'
      ],
      blocks: [
        { type: 'h', text: 'چه کسی به چه چیزی دسترسی دارد؟' },
        { type: 'list', items: [
          'public: از هر جایی قابل دسترسی است.',
          'private: فقط داخل همان کلاس قابل دسترسی است.',
          'protected: داخل کلاس و کلاس‌های ارث‌برنده (در درس ارث‌بری کامل می‌شود).',
          'internal: در همان پروژه (assembly) قابل دسترسی است.'
        ]},
        { type: 'p', text: 'قاعده‌ی کلی: کمترین دسترسی لازم را بدهید. داده‌ها را private نگه دارید و فقط رفتارهایی را که لازم است public کنید.' },
        { type: 'code',
          code: 'class Secret\n{\n    private int code = 1234;\n    public bool Check(int input)\n    {\n        return input == code;\n    }\n}\n\nSecret s = new Secret();\nConsole.WriteLine(s.Check(1234));',
          notes: {
            2: 'code فقط داخل Secret قابل دیدن است.',
            3: 'Check به‌عنوان راه ورودی امن، public است.'
          },
          output: 'True' },
        { type: 'warn', text: 'اشتباه رایج: تغییر دادن همه‌ی اعضا به public تا کد کامپایل شود. این کار کپسوله‌سازی را از بین می‌برد.' }
      ],
      quiz: [
        { q: 'کدام سطح دسترسی فقط داخل همان کلاس است؟', options: ['public', 'protected', 'private', 'internal'], answer: 2, explain: 'private فقط داخل همان کلاس دیده می‌شود.' },
        { q: 'اگر عضوی بدون سطح دسترسی تعریف شود، پیش‌فرض کدام است؟', options: ['public', 'private', 'internal', 'protected'], answer: 1, explain: 'پیش‌فرض اعضای کلاس private است.' }
      ]
    },

    'encapsulation': {
      id: 'encapsulation',
      title: 'کپسوله‌سازی (Encapsulation)',
      level: 'متوسط',
      prereq: ['access-modifiers', 'fields-properties'],
      objectives: [
        'کپسوله‌سازی را به‌عنوان محافظت از داده تعریف کنید.',
        'یک کلاس را با داده‌ی خصوصی و رفتار کنترل‌شده طراحی کنید.',
        'مزایای کپسوله‌سازی را برای نگهداری کد توضیح دهید.'
      ],
      blocks: [
        { type: 'h', text: 'محافظت از داده' },
        { type: 'p', text: 'کپسوله‌سازی یعنی داده و منطقی که روی آن کار می‌کند را داخل کلاس نگه داریم و فقط از راه رابط مشخص (Property و متد) به آن دسترسی بدهیم. نتیجه این است که هیچ بخشی از برنامه نمی‌تواند داده را به حالت نادرست ببرد.' },
        { type: 'code',
          code: 'class BankAccount\n{\n    private int balance;\n\n    public int Balance => balance;\n\n    public bool Withdraw(int amount)\n    {\n        if (amount <= 0 || amount > balance) return false;\n        balance -= amount;\n        return true;\n    }\n\n    public void Deposit(int amount)\n    {\n        if (amount > 0) balance += amount;\n    }\n}',
          notes: {
            5: 'Balance فقط خواندنی است؛ عبارت => یک Property فقط-get کوتاه است.',
            7: 'قبل از برداشت، مبلغ معتبر بودن را بررسی می‌کنیم.',
            13: 'واریز مبلغ منفی یا صفر را قبول نمی‌کند.'
          },
          output: 'بعد از Deposit(100) و Withdraw(30): Balance = 70' },
        { type: 'tip', text: 'اگر یک Property فقط get داشته باشد، از بیرون کلاس نمی‌توان مقدارش را عوض کرد. این ابزار مهمی برای کپسوله‌سازی است.' },
        { type: 'warn', text: 'اشتباه رایج: کپسوله‌سازی فقط با گذاشتن private بدون رابط کنترل‌شده. اگر set های عمومی برای همه‌ی داده‌ها بگذارید، فایده‌ای ندارد.' }
      ],
      quiz: [
        { q: 'کپسوله‌سازی اصولاً چه هدفی دارد؟', options: ['سریع‌تر کردن برنامه', 'محافظت از داده در برابر تغییرات نادرست', 'حذف متدها', 'استفاده از فایل'], answer: 1, explain: 'با کنترل دسترسی و رابط مشخص، داده نمی‌تواند به حالت نادرست برود.' },
        { q: 'با Property فقط-get مثل Balance => balance، چه کاری از بیرون ممکن است؟', options: ['مقدار را تغییر دهیم', 'مقدار را بخوانیم', 'کلاس را حذف کنیم', 'سازنده بسازیم'], answer: 1, explain: 'فقط خواندن امکان‌پذیر است؛ نوشتن از بیرون کلاس ممکن نیست.' }
      ]
    }
  };

  Object.assign(window.CURRICULUM.lessons, lessons);
})();
