// موضوع: مدیریت خطا و استثناها (try، catch، finally، throw)
// بعد از OOP و قبل از Unity بارگذاری می‌شود.
(function () {
  window.CURRICULUM.topics.push({
    id: 'exceptions',
    title: 'مدیریت خطا و استثناها',
    desc: 'وقتی خطای زمان اجرا رخ می‌دهد، برنامه را خراب نکنید: try، catch، finally و پرتاب استثنای خودتان.',
    level: 'متوسط',
    lessons: ['try-catch', 'finally-block', 'throw-exceptions']
  });

  window.CURRICULUM.lessons['try-catch'] = {
    id: 'try-catch',
    title: 'try و catch: گرفتن خطای زمان اجرا',
    level: 'متوسط',
    prereq: ['input-output', 'type-conversion'],
    objectives: [
      'بفهمید استثنا (Exception) چیست و چرا در زمان اجرا رخ می‌دهد.',
      'کدهای خطرناک را در بلوک try و واکنش را در catch بنویسید.',
      'نوع استثنا را در catch مشخص کنید.'
    ],
    blocks: [
      { type: 'h', text: 'خطا را جدی بگیرید، برنامه را خراب نکنید' },
      { type: 'p', text: 'وقتی یک خطای زمان اجرا رخ می‌دهد، C# یک استثنا (Exception) پرتاب می‌کند. اگر آن را مدیریت نکنیم، برنامه متوقف می‌شود. بلوک try کدی را که ممکن است خطا بدهد نگه می‌دارد و catch واکنش مناسب را تعریف می‌کند.' },
      { type: 'code',
        code: 'try\n{\n    int n = int.Parse("abc");\n    Console.WriteLine(n);\n}\ncatch (FormatException)\n{\n    Console.WriteLine("ورودی عدد نیست");\n}',
        notes: {
          1: 'کد خطرناک داخل try قرار می‌گیرد.',
          3: 'int.Parse("abc") باعث FormatException می‌شود.',
          5: 'catch فقط خطای FormatException را می‌گیرد و برنامه ادامه پیدا می‌کند.'
        },
        output: 'ورودی عدد نیست' },
      { type: 'tip', text: 'بهتر است نوع استثنای مشخص را در catch بنویسید. catch (Exception) همه‌ی خطاها را می‌گیرد و ممکن است خطاهای واقعی را پنهان کند.' },
      { type: 'warn', text: 'اشتباه رایج: گرفتن خطا و هیچ کاری نکردن (catch خالی). حداقل پیام مناسب نمایش دهید یا خطا را دوباره پرتاب کنید.' }
    ],
    quiz: [
      { q: 'کدام کلیدواژه کدهای خطرناک را محصور می‌کند؟', options: ['catch', 'try', 'throw', 'finally'], answer: 1, explain: 'کدی که ممکن است خطا بدهد داخل try قرار می‌گیرد.' },
      { q: 'int.Parse("abc") کدام استثنا را پرتاب می‌کند؟', options: ['NullReferenceException', 'FormatException', 'IndexOutOfRangeException', 'DivideByZeroException'], answer: 1, explain: 'تبدیل متن غیرعددی به عدد با int.Parse، FormatException پرتاب می‌کند.' }
    ]
  };

  window.CURRICULUM.lessons['finally-block'] = {
    id: 'finally-block',
    title: 'finally: کاری که همیشه انجام می‌شود',
    level: 'متوسط',
    prereq: ['try-catch'],
    objectives: [
      'نقش finally را بفهمید.',
      'ترتیب اجرای try، catch و finally را توضیح دهید.',
      'منابع را در finally آزاد کنید.'
    ],
    blocks: [
      { type: 'h', text: 'پاکسازی، چه خطا رخ دهد چه ندهد' },
      { type: 'p', text: 'بلوک finally همیشه اجرا می‌شود؛ چه خطایی رخ دهد چه ندهد. برای کارهایی مثل بستن فایل یا آزاد کردن منبع مناسب است.' },
      { type: 'code',
        code: 'try\n{\n    Console.WriteLine("باز کردن");\n    int x = 0;\n    Console.WriteLine(10 / x);\n}\ncatch (DivideByZeroException e)\n{\n    Console.WriteLine("خطا: " + e.Message);\n}\nfinally\n{\n    Console.WriteLine("بستن");\n}',
        notes: {
          5: 'تقسیم بر صفر خطای DivideByZeroException می‌دهد.',
          7: 'catch خطا را گرفته و پیام آن را نمایش می‌دهد.',
          10: 'finally بعد از catch همیشه اجرا می‌شود.'
        },
        output: 'باز کردن\nخطا: Attempted to divide by zero.\nبستن' },
      { type: 'warn', text: 'اشتباه رایج: فرض کردن اینکه کد بعد از خطای داخل try اجرا می‌شود. هنگام خطا، ادامه‌ی try اجرا نمی‌شود و به catch یا finally می‌رویم.' }
    ],
    quiz: [
      { q: 'بلوک finally چه زمانی اجرا می‌شود؟', options: ['فقط وقتی خطا باشد', 'فقط وقتی خطا نباشد', 'همیشه', 'هرگز'], answer: 2, explain: 'finally همیشه اجرا می‌شود، چه خطا رخ دهد چه ندهد.' },
      { q: 'اگر خطا رخ دهد، بقیه‌ی کد داخل try چه می‌شود؟', options: ['اجرا می‌شود', 'اجرا نمی‌شود', 'دوباره اجرا می‌شود', 'به پایان برنامه می‌رود'], answer: 1, explain: 'با پرتاب استثنا، ادامه‌ی try اجرا نمی‌شود و کنترل به catch می‌رود.' }
    ]
  };

  window.CURRICULUM.lessons['throw-exceptions'] = {
    id: 'throw-exceptions',
    title: 'پرتاب استثنا با throw',
    level: 'متوسط',
    prereq: ['finally-block', 'methods-constructors'],
    objectives: [
      'با throw یک استثنا پرتاب کنید.',
      'یک پیام مناسب و نوع مناسب برای استثنا انتخاب کنید.',
      'بفهمید استثنای پرتاب‌شده را می‌توان در بیرون متد گرفت.'
    ],
    blocks: [
      { type: 'h', text: 'وقتی ورودی معتبر نیست' },
      { type: 'p', text: 'گاهی منطق برنامه تشخیص می‌دهد ورودی نادرست است. در این حالت با throw یک استثنا می‌سازیم و پرتاب می‌کنیم تا متد صدا زننده مطلع شود و تصمیم بگیرد.' },
      { type: 'code',
        code: 'static void SetAge(int age)\n{\n    if (age < 0)\n    {\n        throw new ArgumentException("سن منفی نیست");\n    }\n    Console.WriteLine("سن ثبت شد: " + age);\n}\n\ntry\n{\n    SetAge(-5);\n}\ncatch (ArgumentException e)\n{\n    Console.WriteLine(e.Message);\n}',
        notes: {
          4: 'throw یک استثنای جدید با پیام توضیحی پرتاب می‌کند.',
          10: 'فراخوانی با مقدار نامعتبر، استثنا را ایجاد می‌کند.',
          12: 'catch پیام استثنا را نمایش می‌دهد.'
        },
        output: 'سن منفی نیست' },
      { type: 'tip', text: 'پیام استثنا باید برای برنامه‌نویس یا کاربر روشن باشد: بگویید چه چیزی اشتباه است، نه فقط «خطا».' }
    ],
    quiz: [
      { q: 'کلیدواژه‌ی پرتاب یک استثنا چیست؟', options: ['catch', 'throw', 'try', 'finally'], answer: 1, explain: 'با throw استثنا پرتاب می‌شود.' },
      { q: 'اگر SetAge(10) فراخوانی شود، چه چیزی چاپ می‌شود؟', options: ['سن منفی نیست', 'سن ثبت شد: 10', 'خطا', 'هیچ‌چیز'], answer: 1, explain: 'ورودی معتبر است، پس استثنایی پرتاب نمی‌شود و پیام ثبت سن چاپ می‌شود.' }
    ]
  };
})();
