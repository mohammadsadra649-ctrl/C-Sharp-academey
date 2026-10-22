// داده‌های آموزشی: موضوعات و درس‌ها (محتوا جدا از کد رابط کاربری است)
window.CURRICULUM = {
  topics: [
    {
      id: 'intro',
      title: 'آشنایی با C#',
      desc: 'C# چیست، چه کاری با آن انجام می‌دهیم و یک برنامه ساده چطور اجرا می‌شود.',
      level: 'مبتدی',
      lessons: ['what-is-csharp', 'first-program']
    },
    {
      id: 'basics',
      title: 'مبانی زبان',
      desc: 'متغیر، انواع داده، و گرفتن ورودی از کاربر و نمایش خروجی.',
      level: 'مبتدی',
      lessons: ['variables', 'data-types', 'input-output']
    }
  ],

  lessons: {
    'what-is-csharp': {
      id: 'what-is-csharp',
      title: 'C# چیست؟',
      level: 'مبتدی',
      prereq: [],
      objectives: [
        'بدانید C# یک زبان برنامه‌نویسی است و چه کاربردهایی دارد.',
        'تفاوت زبان برنامه‌نویسی با نرم‌افزار را توضیح دهید.',
        'نقش .NET را در کنار C# بشناسید.'
      ],
      blocks: [
        { type: 'h', text: 'زبان برنامه‌نویسی چیست؟' },
        { type: 'p', text: 'کامپیوتر فقط دستورهای بسیار ساده‌ای را می‌فهمد. زبان برنامه‌نویسی راهی است که ما با آن دستورها را به شکلی نوشته‌شده و قابل‌فهم برای انسان می‌نویسیم. C# یکی از این زبان‌هاست و کدهای آن بعد از ترجمه، توسط کامپیوتر اجرا می‌شوند.' },
        { type: 'p', text: 'تفاوت زبان با نرم‌افزار: زبان مجموعه قواعد نوشتن دستورهاست، مثل قواعد دستور زبان فارسی. نرم‌افزار، برنامه‌ای است که با آن زبان ساخته می‌شود، مثل یک متن که با قواعد فارسی نوشته شده است.' },
        { type: 'h', text: 'C# برای چه کارهایی به کار می‌رود؟' },
        { type: 'list', items: [
          'برنامه‌های دسکتاپ ویندوز',
          'سرویس‌ها و وب‌سایت‌های پشت‌صحنه با ASP.NET Core',
          'بازی‌سازی با موتور Unity',
          'برنامه‌های موبایل و ابزارهای خط فرمان'
        ]},
        { type: 'h', text: 'نقش .NET' },
        { type: 'p', text: 'C# به‌تنهایی اجرا نمی‌شود. .NET مجموعه‌ای از ابزارها و کتابخانه‌های آماده است که کدهای C# روی آن اجرا می‌شوند. وقتی از Console.WriteLine استفاده می‌کنید، در واقع یکی از کتابخانه‌های .NET را فراخوانی کرده‌اید.' },
        { type: 'tip', text: 'اگر فقط می‌خواهید یاد بگیرید، لازم نیست همه‌ی جزئیات .NET را بدانید. کافی است بدانید که C# روی .NET اجرا می‌شود.' },
        { type: 'warn', text: 'C# را با «C++» یا «C» اشتباه نگیرید. اگرچه اسم‌شان شبیه است، این‌ها زبان‌های جدا هستند.' }
      ],
      quiz: [
        { q: 'C# بیشتر چه نوع زبانی است؟', options: ['زبان نشانه‌گذاری مثل HTML', 'زبان برنامه‌نویسی', 'یک نرم‌افزار ویرایش متن', 'یک پایگاه داده'], answer: 1, explain: 'C# یک زبان برنامه‌نویسی است و برای نوشتن دستورهای قابل اجرا به کار می‌رود.' },
        { q: '.NET در کنار C# چه نقشی دارد؟', options: ['جایگزین C# است', 'مجموعه ابزار و کتابخانه برای اجرای برنامه‌های C#', 'یک مرورگر اینترنت است', 'فقط برای طراحی گرافیک است'], answer: 1, explain: '.NET کتابخانه‌ها و زمان اجرای آماده‌ای فراهم می‌کند که برنامه‌های C# روی آن اجرا می‌شوند.' }
      ]
    },

    'first-program': {
      id: 'first-program',
      title: 'اولین برنامه و ساختار یک برنامه ساده',
      level: 'مبتدی',
      prereq: ['what-is-csharp'],
      objectives: [
        'یک برنامه ساده C# بنویسید و اجرا کنید.',
        'نقش Console.WriteLine را بفهمید.',
        'بدانید هر دستور با سمی‌کالن (;) تمام می‌شود.'
      ],
      blocks: [
        { type: 'h', text: 'اولین برنامه' },
        { type: 'p', text: 'یک برنامه C# از دستورهایی تشکیل می‌شود که به ترتیب اجرا می‌شوند. ساده‌ترین برنامه، نمایش یک پیام روی صفحه است. برای این کار از Console.WriteLine استفاده می‌کنیم. «Console» یعنی پنجره متنی و «WriteLine» یعنی بنویس و یک خط پایین برو.' },
        { type: 'code',
          code: 'Console.WriteLine("سلام، دنیا!");',
          notes: { 1: 'Console یک کلاس آماده از .NET است که با پنجره متنی کار می‌کند.' },
          output: 'سلام، دنیا!' },
        { type: 'h', text: 'قواعد پایه' },
        { type: 'list', items: [
          'هر دستور باید با سمی‌کالن (;) تمام شود.',
          'متن داخل گیومه (" ") یک رشته است و باید دقیقاً همان‌طور نوشته شود.',
          'C# به حروف بزرگ و کوچک حساس است؛ Console با console فرق دارد.'
        ]},
        { type: 'warn', text: 'اگر سمی‌کالن را فراموش کنید، برنامه کامپایل نمی‌شود و پیام خطای نحوی می‌گیرید.' },
        { type: 'tip', text: 'در نسخه‌های جدید .NET می‌توانید کد را بدون نوشتن کلاس و تابع Main مستقیماً بنویسید. به این روش top-level statements می‌گویند.' }
      ],
      quiz: [
        { q: 'کدام دستور پیام را روی صفحه نمایش می‌دهد؟', options: ['Console.Print("hi");', 'Console.WriteLine("hi");', 'Screen.Show("hi");', 'print("hi");'], answer: 1, explain: 'Console.WriteLine متن را نمایش داده و به خط بعد می‌رود. print در C# وجود ندارد.' },
        { q: 'کدام دستور سمی‌کالن لازم دارد؟', options: ['Console.WriteLine("a")', 'Console.WriteLine("a");', 'Console.WriteLine("a") ;;', 'هیچ‌کدام'], answer: 1, explain: 'هر دستور C# باید با سمی‌کالن تمام شود؛ پس نسخه دوم درست است.' }
      ]
    },

    'variables': {
      id: 'variables',
      title: 'متغیرها',
      level: 'مبتدی',
      prereq: ['first-program'],
      objectives: [
        'متغیر را تعریف کنید و مقدار بدهید.',
        'بفهمید متغیر چگونه داده را در حافظه نگه می‌دارد.',
        'قواعد نام‌گذاری متغیر را رعایت کنید.'
      ],
      blocks: [
        { type: 'h', text: 'متغیر چیست؟' },
        { type: 'p', text: 'متغیر را می‌توان مثل یک جعبه با برچسب در نظر گرفت. داخل جعبه داده‌ای قرار می‌گیرد و برچسب آن نام متغیر است. هر وقت به نام متغیر اشاره کنیم، همان داده را می‌خوانیم.' },
        { type: 'p', text: 'برای ساخت متغیر ابتدا نوع آن را می‌نویسیم، سپس نام، و بعد با علامت = مقدار اولیه را قرار می‌دهیم.' },
        { type: 'code',
          code: 'int age = 20;\nstring name = "Ali";\nConsole.WriteLine(name + " " + age);',
          notes: {
            1: 'یک متغیر عددی صحیح به نام age می‌سازیم و مقدار 20 را در آن می‌گذاریم.',
            2: 'یک متغیر متنی به نام name می‌سازیم. متن باید داخل گیومه باشد.',
            3: 'متن و عدد را با + کنار هم می‌گذاریم و نتیجه را نمایش می‌دهیم.'
          },
          output: 'Ali 20' },
        { type: 'h', text: 'قواعد نام‌گذاری' },
        { type: 'list', items: [
          'نام متغیر با حرف یا _ شروع می‌شود، نه با عدد.',
          'فاصله و خط تیره مجاز نیستند؛ برای چند کلمه از CamelCase یا _ استفاده کنید.',
          'نام نباید کلمه کلیدی C# باشد؛ مثل int، class یا return.'
        ]},
        { type: 'warn', text: 'قبل از استفاده از یک متغیر محلی باید به آن مقدار داده شود؛ در غیر این صورت کامپایلر خطا می‌دهد.' },
        { type: 'tip', text: 'نام‌های معنی‌دار انتخاب کنید. studentAge خواناتر از x است.' }
      ],
      quiz: [
        { q: 'کدام نام متغیر معتبر است؟', options: ['2ndValue', 'my value', 'studentAge', 'int'], answer: 2, explain: 'studentAge معتبر است. نام نباید با عدد شروع شود یا فاصله داشته باشد، و int کلمه کلیدی است.' },
        { q: 'بعد از اجرای int x = 5; x = 9; مقدار x چیست؟', options: ['5', '9', '14', 'خطا'], answer: 1, explain: 'متغیر با دستور دوم مقدار جدید می‌گیرد؛ پس مقدار آن 9 است.' }
      ]
    },

    'data-types': {
      id: 'data-types',
      title: 'انواع داده',
      level: 'مبتدی',
      prereq: ['variables'],
      objectives: [
        'انواع داده رایج مثل int، double، bool، char و string را بشناسید.',
        'نوع مناسب را برای هر داده انتخاب کنید.',
        'بفهمید تقسیم عدد صحیح و اعشاری چه تفاوتی دارد.'
      ],
      blocks: [
        { type: 'h', text: 'چرا نوع داده مهم است؟' },
        { type: 'p', text: 'هر داده در C# نوع مشخصی دارد. این نوع تعیین می‌کند آن داده چه مقادیری می‌تواند بگیرد و با آن چه عملیاتی مجاز است. برای مثال عدد 7 را می‌توان جمع یا ضرب کرد، اما روی متن «سلام» نمی‌توان ضرب انجام داد.' },
        { type: 'list', items: [
          'int: عدد صحیح، مثل 3 یا -40',
          'double: عدد اعشاری، مثل 12.5',
          'bool: مقدار منطقی، true یا false',
          'char: یک کاراکتر، داخل گیومه تک، مثل \'A\'',
          'string: متن، داخل گیومه دوتایی، مثل "سلام"'
        ]},
        { type: 'code',
          code: 'int count = 3;\ndouble price = 12.5;\nbool isOpen = true;\nchar grade = \'A\';\nConsole.WriteLine(count * price);',
          notes: {
            1: 'عدد صحیح برای شمارش.',
            2: 'عدد اعشاری برای قیمت.',
            3: 'مقدار منطقی برای وضعیت درست یا نادرست.',
            4: 'کاراکتر تک با گیومه تک.',
            5: 'حاصل ضرب int در double از نوع double است، پس اعشار حفظ می‌شود.'
          },
          output: '37.5' },
        { type: 'h', text: 'تقسیم عدد صحیح' },
        { type: 'p', text: 'اگر هر دو عملوند صحیح باشند، تقسیم هم صحیح انجام می‌شود و بخش اعشاری حذف می‌شود.' },
        { type: 'code',
          code: 'Console.WriteLine(7 / 2);\nConsole.WriteLine(7 / 2.0);',
          notes: { 1: 'هر دو عدد صحیح‌اند، پس نتیجه 3 است.', 2: '2.0 اعشاری است، پس نتیجه 3.5 می‌شود.' },
          output: '3\n3.5' },
        { type: 'warn', text: 'نوشتن 2 به جای 2.0 باعث می‌شود نتیجه بدون خطا اما اشتباه باشد. این اشتباه بسیار رایج است.' }
      ],
      quiz: [
        { q: 'کدام نوع برای نگه‌داری true یا false مناسب است؟', options: ['int', 'string', 'bool', 'char'], answer: 2, explain: 'bool فقط دو مقدار true و false را می‌پذیرد.' },
        { q: 'خروجی Console.WriteLine(10 / 4); چیست؟', options: ['2.5', '2', '3', '2.50'], answer: 1, explain: 'چون هر دو عدد صحیح‌اند، تقسیم صحیح انجام می‌شود و نتیجه 2 است.' }
      ]
    },

    'input-output': {
      id: 'input-output',
      title: 'دریافت ورودی و نمایش خروجی',
      level: 'مبتدی',
      prereq: ['data-types'],
      objectives: [
        'با Console.ReadLine از کاربر ورودی بگیرید.',
        'تفاوت Write و WriteLine را بفهمید.',
        'ورودی متنی را به عدد تبدیل کنید.'
      ],
      blocks: [
        { type: 'h', text: 'گرفتن ورودی' },
        { type: 'p', text: 'Console.ReadLine منتظر می‌ماند تا کاربر چیزی تایپ کند و Enter را بزند. آنچه تایپ می‌شود همیشه به صورت string برگردانده می‌شود.' },
        { type: 'code',
          code: 'Console.Write("نام شما: ");\nstring name = Console.ReadLine();\nConsole.WriteLine("سلام " + name);',
          notes: {
            1: 'Write متن را نمایش می‌دهد اما به خط بعد نمی‌رود، تا کاربر کنار همان متن تایپ کند.',
            2: 'مقدار تایپ‌شده را در متغیر name ذخیره می‌کنیم.',
            3: 'پیام نهایی را با نام کاربر نمایش می‌دهیم.'
          },
          output: 'نام شما: Sara\nسلام Sara' },
        { type: 'h', text: 'تبدیل ورودی به عدد' },
        { type: 'p', text: 'اگر کاربر عدد وارد کند، آن را باید به نوع عددی تبدیل کرد. برای این کار از int.Parse استفاده می‌کنیم.' },
        { type: 'code',
          code: 'Console.Write("عدد اول: ");\nint a = int.Parse(Console.ReadLine());\nConsole.Write("عدد دوم: ");\nint b = int.Parse(Console.ReadLine());\nConsole.WriteLine("جمع: " + (a + b));',
          notes: {
            2: 'متن وارد شده را به عدد صحیح تبدیل می‌کنیم.',
            5: 'پرانتز لازم است تا ابتدا جمع انجام شود و سپس به متن اضافه شود.'
          },
          output: 'عدد اول: 4\nعدد دوم: 6\nجمع: 10' },
        { type: 'warn', text: 'اگر کاربر متن غیرعددی وارد کند، int.Parse خطای زمان اجرا می‌دهد. مدیریت این خطا را در درس‌های بعدی یاد می‌گیرید.' },
        { type: 'tip', text: 'برای تبدیل امن‌تر می‌توانید از int.TryParse استفاده کنید؛ اما فعلاً int.Parse ساده‌تر است.' }
      ],
      quiz: [
        { q: 'Console.ReadLine() کدام نوع را برمی‌گرداند؟', options: ['int', 'bool', 'string', 'double'], answer: 2, explain: 'هر چیزی که کاربر تایپ کند به صورت string خوانده می‌شود.' },
        { q: 'تفاوت Write و WriteLine چیست؟', options: ['هیچ تفاوتی ندارند', 'WriteLine بعد از نوشتن به خط بعد می‌رود', 'Write فقط عدد نمایش می‌دهد', 'Write خطا می‌دهد'], answer: 1, explain: 'WriteLine پس از نمایش متن یک خط پایین می‌رود، اما Write در همان خط می‌ماند.' }
      ]
    }
  }
};

// توابع کمکی برای کار با داده‌های درسی
window.Curriculum = {
  topics: window.CURRICULUM.topics,
  findTopic(id) { return this.topics.find(t => t.id === id) || null; },
  findLesson(id) { return window.CURRICULUM.lessons[id] || null; },
  topicOf(lessonId) { return this.topics.find(t => t.lessons.includes(lessonId)) || null; },
  allLessonIds() { return this.topics.flatMap(t => t.lessons); },
  searchLessons(q) {
    const needle = q.toLowerCase();
    return this.allLessonIds()
      .map(id => this.findLesson(id))
      .filter(l => l && l.title.toLowerCase().includes(needle));
  },
  relatedLessons(lesson) {
    const topic = this.topicOf(lesson.id);
    if (!topic) return [];
    return topic.lessons.filter(id => id !== lesson.id).map(id => this.findLesson(id)).filter(Boolean);
  }
};
