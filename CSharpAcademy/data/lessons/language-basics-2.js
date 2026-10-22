// تکمیل مبانی زبان: عملگرها، انتساب، تبدیل نوع، قالب‌بندی رشته، Math و Random
// این درس‌ها به انتهای موضوع «مبانی زبان» اضافه می‌شوند.
(function () {
  const basics = window.CURRICULUM.topics.find(t => t.id === 'basics');
  basics.lessons.push('operators', 'assignment-increment', 'type-conversion', 'strings-math-random');

  const lessons = {
    'operators': {
      id: 'operators',
      title: 'عملگرهای ریاضی، مقایسه‌ای و منطقی',
      level: 'مبتدی',
      prereq: ['input-output', 'data-types'],
      objectives: [
        'عملگرهای ریاضی مثل +، -، *، / و % را به کار ببرید.',
        'با عملگرهای مقایسه‌ای و منطقی شرط‌های ترکیبی بنویسید.',
        'باقیمانده‌ی تقسیم (%) را بفهمید.'
      ],
      blocks: [
        { type: 'h', text: 'عملگرهای ریاضی' },
        { type: 'p', text: 'عملگرهای ریاضی عبارت‌اند از + (جمع)، - (تفریق)، * (ضرب)، / (تقسیم) و % (باقیمانده). به یاد داشته باشید که تقسیم دو عدد صحیح، بخش اعشاری را حذف می‌کند؛ این موضوع را در درس انواع داده دیدیم.' },
        { type: 'code',
          code: 'Console.WriteLine(17 % 5);\nConsole.WriteLine(10 / 3);\nConsole.WriteLine(10.0 / 3);',
          notes: {
            1: '17 بر 5 بخش‌پذیر است و 2 باقی می‌ماند؛ پس نتیجه 2 است.',
            2: 'تقسیم صحیح: نتیجه 3 است.',
            3: 'با یکی از عددها اعشاری، نتیجه‌ی اعشاری می‌شود.'
          },
          output: '2\n3\n3.3333333333333335' },
        { type: 'h', text: 'عملگرهای مقایسه‌ای و منطقی' },
        { type: 'list', items: [
          '==، !=، <، >، <=، >= برای مقایسه و نتیجه‌ی bool',
          '&& (و): وقتی هر دو شرط درست باشند',
          '|| (یا): وقتی حداقل یکی درست باشد',
          '! (نه): مقدار منطقی را معکوس می‌کند'
        ]},
        { type: 'code',
          code: 'int age = 20;\nbool hasTicket = true;\n\nif (age >= 18 && hasTicket)\n{\n    Console.WriteLine("ورود مجاز است");\n}',
          notes: { 4: 'هر دو شرط باید درست باشند تا بلوک اجرا شود.' },
          output: 'ورود مجاز است' },
        { type: 'h', text: 'اولویت عملگرها' },
        { type: 'p', text: 'ترتیب انجام عملیات با اولویت مشخص است: اول پرانتز، بعد ضرب و تقسیم و باقیمانده، بعد جمع و تفریق، سپس مقایسه‌ها و در آخر منطقی‌ها. برای خوانایی، از پرانتز استفاده کنید.' },
        { type: 'warn', text: 'اشتباه رایج: پیش‌بینی 2 + 3 * 4 برابر 20. نتیجه 14 است چون ضرب اولویت بالاتری دارد.' }
      ],
      quiz: [
        { q: 'نتیجه‌ی 17 % 5 چیست؟', options: ['3', '2', '5', '85'], answer: 1, explain: '% باقیمانده‌ی تقسیم را می‌دهد. 17 = 3 × 5 + 2، پس باقیمانده 2 است.' },
        { q: 'نتیجه‌ی 2 + 3 * 4 چیست؟', options: ['20', '14', '24', '11'], answer: 1, explain: 'ضرب قبل از جمع انجام می‌شود: 3 * 4 = 12 و سپس 2 + 12 = 14.' }
      ]
    },

    'assignment-increment': {
      id: 'assignment-increment',
      title: 'عملگرهای انتساب، افزایش و کاهش',
      level: 'مبتدی',
      prereq: ['operators'],
      objectives: [
        'از += و -= برای به‌روزرسانی مقدار استفاده کنید.',
        'تفاوت x++ و ++x را بفهمید.',
        'عملگر انتساب را از مقایسه تشخیص دهید.'
      ],
      blocks: [
        { type: 'h', text: 'انتساب و انتساب ترکیبی' },
        { type: 'p', text: '= مقدار سمت راست را در متغیر سمت چپ قرار می‌دهد. عملگرهای ترکیبی مثل += کار جمع کردن و نوشتن نتیجه روی همان متغیر را خلاصه می‌کنند.' },
        { type: 'code',
          code: 'int score = 10;\nscore += 5;\nscore *= 2;\nConsole.WriteLine(score);',
          notes: {
            2: 'score = score + 5 یعنی score برابر 15 می‌شود.',
            3: 'score = score * 2 یعنی 30.'
          },
          output: '30' },
        { type: 'h', text: 'پیشوندی و پسوندی' },
        { type: 'p', text: 'x++ اول مقدار فعلی x را استفاده می‌کند و بعد آن را یکی زیاد می‌کند. ++x اول یکی زیاد می‌کند و بعد مقدار جدید را استفاده می‌کند.' },
        { type: 'code',
          code: 'int a = 5;\nint b = a++;\nint c = ++a;\nConsole.WriteLine(a + " " + b + " " + c);',
          notes: {
            2: 'b مقدار قبلی a (یعنی 5) را می‌گیرد؛ سپس a برابر 6 می‌شود.',
            3: 'a اول به 7 می‌رسد و c برابر 7 می‌شود.'
          },
          output: '7 5 7' },
        { type: 'warn', text: 'اشتباه رایج: گذاشتن = به جای == در شرط. if (x = 5) خطاست؛ باید if (x == 5) نوشته شود.' }
      ],
      quiz: [
        { q: 'بعد از x = 3; y = x++; مقدار y چیست؟', options: ['4', '3', '2', 'خطا'], answer: 1, explain: 'x++ ابتدا مقدار فعلی (3) را می‌دهد و بعد x را 4 می‌کند؛ پس y برابر 3 است.' },
        { q: 'int n = 2; n += 3; نتیجه‌ی n چیست؟', options: ['2', '3', '5', '6'], answer: 2, explain: 'n += 3 یعنی n = n + 3، پس 2 + 3 = 5.' }
      ]
    },

    'type-conversion': {
      id: 'type-conversion',
      title: 'تبدیل انواع داده: ضمنی، صریح و TryParse',
      level: 'مبتدی',
      prereq: ['assignment-increment'],
      objectives: [
        'تفاوت تبدیل ضمنی و صریح را توضیح دهید.',
        'از Convert و int.Parse استفاده کنید.',
        'با int.TryParse ورودی نامعتبر را بدون خطا مدیریت کنید.'
      ],
      blocks: [
        { type: 'h', text: 'تبدیل ضمنی (Implicit)' },
        { type: 'p', text: 'وقتی تبدیل از نوع کوچک‌تر به بزرگ‌تر باشد و اطلاعاتی از دست نرود، C# خودش آن را انجام می‌دهد. مثلاً int در double جا می‌شود.' },
        { type: 'h', text: 'تبدیل صریح (Explicit)' },
        { type: 'p', text: 'وقتی ممکن است اطلاعات از دست برود، باید تبدیل را خودتان با پرانتز بنویسید. مثلاً (int)3.9 برابر 3 است؛ بخش اعشاری حذف می‌شود، نه گرد کردن.' },
        { type: 'code',
          code: 'int a = 7;\ndouble b = a;\ndouble c = 3.9;\nint d = (int)c;\nConsole.WriteLine(b);\nConsole.WriteLine(d);',
          notes: {
            2: 'تبدیل ضمنی از int به double.',
            4: 'تبدیل صریح از double به int؛ بخش اعشاری حذف می‌شود.'
          },
          output: '7\n3' },
        { type: 'h', text: 'تبدیل رشته به عدد: TryParse' },
        { type: 'p', text: 'int.Parse اگر متن غیرعددی بدهید خطا می‌دهد. int.TryParse مقدار را در یک متغیر out می‌گذارد و true یا false برمی‌گرداند، پس برنامه خراب نمی‌شود.' },
        { type: 'code',
          code: 'Console.Write("عدد را وارد کنید: ");\nstring input = Console.ReadLine();\n\nif (int.TryParse(input, out int number))\n{\n    Console.WriteLine("دو برابر: " + (number * 2));\n}\nelse\n{\n    Console.WriteLine("ورودی عددی نیست.");\n}',
          notes: {
            4: 'out number: اگر تبدیل موفق بود، عدد در number قرار می‌گیرد و شرط true می‌شود.',
            8: 'اگر ورودی عدد نباشد، این بلوک اجرا می‌شود.'
          },
          output: 'اگر 21 وارد کنید: دو برابر: 42\nاگر abc وارد کنید: ورودی عددی نیست.' },
        { type: 'warn', text: 'اشتباه رایج: استفاده از int.Parse بدون بررسی ورودی کاربر. کاربر می‌تواند هر چیزی تایپ کند.' }
      ],
      quiz: [
        { q: 'کدام تبدیل به صورت خودکار انجام می‌شود؟', options: ['double به int', 'int به double', 'string به int', 'bool به int'], answer: 1, explain: 'int به double بدون از دست رفتن اطلاعات انجام می‌شود، پس ضمنی است.' },
        { q: 'نتیجه‌ی (int)3.9 چیست؟', options: ['4', '3.9', '3', 'خطا'], answer: 2, explain: 'تبدیل صریح بخش اعشاری را حذف می‌کند و عدد 3 می‌ماند؛ گرد کردن انجام نمی‌شود.' }
      ]
    },

    'strings-math-random': {
      id: 'strings-math-random',
      title: 'قالب‌بندی رشته، Math و اعداد تصادفی',
      level: 'مبتدی',
      prereq: ['type-conversion'],
      objectives: [
        'با String Interpolation رشته‌ی خوانا بسازید.',
        'از کلاس Math برای محاسبات آماده استفاده کنید.',
        'با Random عدد تصادفی تولید کنید.'
      ],
      blocks: [
        { type: 'h', text: 'String Interpolation' },
        { type: 'p', text: 'با نوشتن $ قبل از رشته، می‌توانید مقدار متغیرها را داخل { } بگذارید. این روش از جمع زدن رشته‌ها خواناتر است.' },
        { type: 'code',
          code: 'string name = "نیما";\nint score = 18;\nConsole.WriteLine($"{name} نمره {score} گرفت.");\nConsole.WriteLine($"مساحت: {Math.Pow(3, 2)}");',
          notes: {
            3: 'مقدارهای name و score داخل رشته قرار می‌گیرند.',
            4: 'می‌توان عبارت‌های ساده را هم داخل { } نوشت.'
          },
          output: 'نیما نمره 18 گرفت.\nمساحت: 9' },
        { type: 'h', text: 'کلاس Math' },
        { type: 'list', items: [
          'Math.Max(a, b) و Math.Min(a, b): بزرگ‌ترین و کوچک‌ترین',
          'Math.Abs(x): قدرمطلق',
          'Math.Sqrt(x): ریشه‌ی دوم',
          'Math.Round(x): گرد کردن'
        ]},
        { type: 'h', text: 'اعداد تصادفی' },
        { type: 'code',
          code: 'Random rnd = new Random();\nint dice = rnd.Next(1, 7);\nConsole.WriteLine($"عدد تاس: {dice}");',
          notes: {
            2: 'Next(1, 7) عددی از 1 تا 6 می‌دهد؛ حد بالا خارج از بازه است.'
          },
          output: 'یکی از اعداد 1 تا 6 (هر بار متفاوت)' },
        { type: 'warn', text: 'اشتباه رایج: ساختن Random داخل حلقه‌ی پرتکرار. یک بار بسازید و از همان استفاده کنید.' }
      ],
      quiz: [
        { q: 'خروجی Math.Max(4, 9) چیست؟', options: ['4', '9', '13', '5'], answer: 1, explain: 'Max بزرگ‌ترین عدد را برمی‌گرداند؛ یعنی 9.' },
        { q: 'rnd.Next(1, 7) چه بازه‌ای تولید می‌کند؟', options: ['1 تا 7', '1 تا 6', '0 تا 6', '0 تا 7'], answer: 1, explain: 'حد پایین شامل است و حد بالا شامل نیست؛ پس عددهای 1 تا 6.' }
      ]
    }
  };

  Object.assign(window.CURRICULUM.lessons, lessons);
})();
