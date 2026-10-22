// پروژه‌های عملی: هر پروژه مراحل، چالش و راه‌حل دارد.
(function () {
  window.CURRICULUM.topics.push({
    id: 'projects',
    title: 'پروژه‌های عملی',
    desc: 'با درس‌هایی که خوانده‌اید، برنامه‌های کامل بسازید: ماشین‌حساب، تشخیص علامت عدد و بازی حدس عدد.',
    level: 'مبتدی',
    lessons: ['project-sign-check', 'project-calculator', 'project-guess-game']
  });

  const L = window.CURRICULUM.lessons;

  L['project-sign-check'] = {
    id: 'project-sign-check', title: 'پروژه: تشخیص مثبت، منفی یا صفر بودن عدد', level: 'مبتدی',
    prereq: ['if-else', 'type-conversion'],
    objectives: ['عدد را از کاربر بگیرید و معتبر بودنش را بررسی کنید.', 'با if و else if علامت عدد را تشخیص دهید.', 'یک حالت چالشی را اضافه کنید.'],
    blocks: [
      { type: 'h', text: 'هدف پروژه' },
      { type: 'p', text: 'برنامه‌ای بنویسید که عددی از کاربر بگیرد و بگوید مثبت، منفی یا صفر است. ورودی نامعتبر را هم مدیریت کنید.' },
      { type: 'h', text: 'مراحل ساخت' },
      { type: 'list', items: [
        'با Console.ReadLine متن کاربر را بگیرید.',
        'با int.TryParse بررسی کنید عدد است یا نه.',
        'با if، مثبت، منفی و صفر را جدا کنید.',
        'نتیجه را چاپ کنید.'
      ]},
      { type: 'h', text: 'راه‌حل' },
      { type: 'code', code: 'Console.Write("یک عدد وارد کنید: ");\nstring input = Console.ReadLine();\n\nif (!int.TryParse(input, out int n))\n{\n    Console.WriteLine("ورودی عدد نیست.");\n}\nelse if (n > 0)\n{\n    Console.WriteLine("مثبت");\n}\nelse if (n < 0)\n{\n    Console.WriteLine("منفی");\n}\nelse\n{\n    Console.WriteLine("صفر");\n}' },
      { type: 'h', text: 'چالش تکمیلی' },
      { type: 'p', text: 'برنامه را طوری تغییر دهید که اعداد زوج و فرد را هم تشخیص دهد. راهنمایی: از باقیمانده‌ی تقسیم بر 2 (%) استفاده کنید.' }
    ],
    quiz: [
      { q: 'کدام روش برای بررسی ورودی عددی مناسب است؟', options: ['int.Parse بدون بررسی', 'int.TryParse', 'Console.Clear', 'Random'], answer: 1, explain: 'TryParse بدون خطا بررسی می‌کند ورودی عدد است یا نه.' },
      { q: 'در راه‌حل، شرط else در انتها کدام حالت را پوشش می‌دهد؟', options: ['مثبت', 'منفی', 'صفر', 'ورودی نامعتبر'], answer: 2, explain: 'وقتی n نه مثبت و نه منفی است، باید صفر باشد.' }
    ]
  };

  L['project-calculator'] = {
    id: 'project-calculator', title: 'پروژه: ماشین‌حساب ساده', level: 'مبتدی',
    prereq: ['operators', 'if-else', 'type-conversion'],
    objectives: ['دو عدد و یک عملگر از کاربر بگیرید.', 'عملیات را با if else انجام دهید.', 'تقسیم بر صفر را مدیریت کنید.'],
    blocks: [
      { type: 'h', text: 'هدف پروژه' },
      { type: 'p', text: 'یک ماشین‌حساب بسازید که دو عدد و یکی از عملگرهای + و - و * و / را بگیرد و نتیجه را نشان دهد.' },
      { type: 'h', text: 'مراحل ساخت' },
      { type: 'list', items: [
        'دو عدد را با double.Parse بگیرید.',
        'عملگر را بخوانید.',
        'با if else عملیات مناسب را انجام دهید.',
        'قبل از تقسیم، بررسی کنید مقسوم‌علیه صفر نباشد.'
      ]},
      { type: 'h', text: 'راه‌حل' },
      { type: 'code', code: 'Console.Write("عدد اول: ");\ndouble a = double.Parse(Console.ReadLine());\nConsole.Write("عملگر (+ - * /): ");\nstring op = Console.ReadLine();\nConsole.Write("عدد دوم: ");\ndouble b = double.Parse(Console.ReadLine());\n\nif (op == "+") Console.WriteLine(a + b);\nelse if (op == "-") Console.WriteLine(a - b);\nelse if (op == "*") Console.WriteLine(a * b);\nelse if (op == "/")\n{\n    if (b == 0) Console.WriteLine("تقسیم بر صفر مجاز نیست.");\n    else Console.WriteLine(a / b);\n}\nelse Console.WriteLine("عملگر نامعتبر است.");' },
      { type: 'h', text: 'چالش تکمیلی' },
      { type: 'p', text: 'یک حلقه اضافه کنید تا کاربر بتواند بدون خروج چند محاسبه انجام دهد، و با وارد کردن کلمه‌ی exit برنامه تمام شود.' }
    ],
    quiz: [
      { q: 'چرا قبل از تقسیم بررسی b == 0 لازم است؟', options: ['برای سرعت', 'تقسیم بر صفر خطای منطقی و نتیجه‌ی بی‌معنی می‌دهد', 'برای فیزیک', 'این کار لازم نیست'], answer: 1, explain: 'تقسیم بر صفر را باید پیش‌بینی و مدیریت کرد.' },
      { q: 'چرا از double به جای int استفاده شده است؟', options: ['برای سرعت', 'تا نتیجه‌ی تقسیم اعشار داشته باشد', 'چون int کار نمی‌کند', 'برای رنگ'], answer: 1, explain: 'با double، تقسیم 7 بر 2 نتیجه‌ی 3.5 می‌دهد، نه 3.' }
    ]
  };

  L['project-guess-game'] = {
    id: 'project-guess-game', title: 'پروژه: بازی حدس عدد', level: 'متوسط',
    prereq: ['strings-math-random', 'while-loops', 'type-conversion'],
    objectives: ['عدد تصادفی تولید کنید.', 'با while تا درست حدس زدن ادامه دهید.', 'تعداد تلاش‌ها را بشمارید.'],
    blocks: [
      { type: 'h', text: 'هدف پروژه' },
      { type: 'p', text: 'کامپیوتر یک عدد بین 1 تا 100 انتخاب می‌کند و کاربر باید آن را حدس بزند. برنامه بگوید عدد بزرگ‌تر یا کوچک‌تر است و در پایان تعداد تلاش‌ها را نشان دهد.' },
      { type: 'h', text: 'مراحل ساخت' },
      { type: 'list', items: [
        'یک عدد تصادفی با Random بسازید.',
        'تا وقتی حدس درست نیست، ورودی بگیرید.',
        'راهنمایی بزرگ‌تر یا کوچک‌تر بدهید.',
        'تلاش‌ها را بشمارید و در پایان چاپ کنید.'
      ]},
      { type: 'h', text: 'راه‌حل' },
      { type: 'code', code: 'Random rnd = new Random();\nint secret = rnd.Next(1, 101);\nint attempts = 0;\nint guess = 0;\n\nwhile (guess != secret)\n{\n    Console.Write("حدس شما: ");\n    if (!int.TryParse(Console.ReadLine(), out guess))\n    {\n        Console.WriteLine("لطفاً عدد وارد کنید.");\n        continue;\n    }\n    attempts++;\n\n    if (guess < secret) Console.WriteLine("بزرگ‌تر است.");\n    else if (guess > secret) Console.WriteLine("کوچک‌تر است.");\n}\n\nConsole.WriteLine($"درست بود! تعداد تلاش: {attempts}");' },
      { type: 'h', text: 'چالش تکمیلی' },
      { type: 'p', text: 'یک حالت دشواری اضافه کنید که بازه‌ی عدد را از کاربر بگیرد. همچنین اگر بیش از 7 تلاش شد، بازی ببرد.' }
    ],
    quiz: [
      { q: 'rnd.Next(1, 101) چه عددی می‌دهد؟', options: ['1 تا 100', '1 تا 101', '0 تا 100', '2 تا 101'], answer: 0, explain: 'حد بالا شامل نیست؛ پس عددهای 1 تا 100 تولید می‌شود.' },
      { q: 'چرا continue در صورت ورودی نامعتبر استفاده شده است؟', options: ['برای پایان بازی', 'تا تلاش شمرده نشود و دوباره ورودی گرفته شود', 'برای حذف عدد', 'این کار لازم نیست'], answer: 1, explain: 'continue تکرار فعلی را رد می‌کند و حلقه دوباره ورودی می‌گیرد.' }
    ]
  };
})();
