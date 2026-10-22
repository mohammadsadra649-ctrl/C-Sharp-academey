// موضوع: انواع پیشرفته‌ی زبان: Enum، Tuple و Nullable
// بعد از موضوع مدیریت خطا و قبل از Unity بارگذاری می‌شود.
(function () {
  window.CURRICULUM.topics.push({
    id: 'advanced-types',
    title: 'انواع پیشرفته: Enum، Tuple و Nullable',
    desc: 'مجموعه‌ی مقادیر ثابت، گروه‌بندی چند مقدار، و مقادیر تهی با امن نگه داشتن برنامه.',
    level: 'متوسط',
    lessons: ['enum-type', 'tuple-type', 'nullable-type']
  });

  window.CURRICULUM.lessons['enum-type'] = {
    id: 'enum-type',
    title: 'Enum: مجموعه‌ی مقادیر نام‌دار',
    level: 'متوسط',
    prereq: ['variables', 'if-statement'],
    objectives: [
      'enum را برای مجموعه‌ی مقادیر ثابت تعریف کنید.',
      'مقدار enum را در شرط و نمایش به کار ببرید.',
      'بدانید هر مقدار enum یک عدد صحیح زیر پوشش دارد.'
    ],
    blocks: [
      { type: 'h', text: 'به‌جای عدد، نام بگذارید' },
      { type: 'p', text: 'وقتی یک متغیر فقط می‌تواند چند مقدار مشخص داشته باشد، enum خواناتر از عدد یا متن است. مثلاً روز هفته یا وضعیت سفارش. به جای 2 نوشتن Day.Monday، معنی را روشن می‌کند.' },
      { type: 'code',
        code: 'enum Day { Saturday, Sunday, Monday }\n\nDay today = Day.Monday;\nConsole.WriteLine(today);\nConsole.WriteLine((int)today);\n\nif (today == Day.Monday)\n{\n    Console.WriteLine("شروع هفته");\n}',
        notes: {
          1: 'مقادیر ممکن را نام‌گذاری می‌کنیم.',
          3: 'متغیر فقط می‌تواند یکی از مقادیر enum باشد.',
          5: 'پشت‌صحنه هر مقدار یک عدد دارد؛ Saturday=0، Sunday=1، Monday=2.',
          8: 'مقایسه با نام مقدار خوانا است.'
        },
        output: 'Monday\n2\nشروع هفته' },
      { type: 'warn', text: 'اشتباه رایج: فرض کردن اینکه enum هر عدد دلخواهی را می‌پذیرد. با تبدیل عدد نامعتبر به enum، مقدار بی‌معنی ساخته می‌شود؛ بهتر است از نام‌ها استفاده کنید.' }
    ],
    quiz: [
      { q: 'در enum Day { Saturday, Sunday, Monday } مقدار عددی Sunday چیست؟', options: ['0', '1', '2', '3'], answer: 1, explain: 'مقادیر از صفر شروع می‌شوند؛ Saturday=0، Sunday=1.' },
      { q: 'کدام نوشتن مقدار enum درست است؟', options: ['Day = Monday', 'Day.Monday', 'Monday.Day', '"Monday"'], answer: 1, explain: 'مقدار enum با نام نوع و نام مقدار، یعنی Day.Monday، نوشته می‌شود.' }
    ]
  };

  window.CURRICULUM.lessons['tuple-type'] = {
    id: 'tuple-type',
    title: 'Tuple: گروه‌بندی چند مقدار',
    level: 'متوسط',
    prereq: ['parameters-return', 'enum-type'],
    objectives: [
      'Tuple را برای برگرداندن چند مقدار از یک متد به کار ببرید.',
      'به عناصر tuple با نام دسترسی داشته باشید.',
      'تفاوت tuple و کلاس را برای داده‌های کوتاه‌مدت بفهمید.'
    ],
    blocks: [
      { type: 'h', text: 'دو مقدار با یک return' },
      { type: 'p', text: 'اگر یک متد باید چند مقدار برگرداند، می‌توانیم یک tuple بسازیم. tuple مجموعه‌ای کوچک از چند مقدار است که می‌تواند نام‌های مشخص داشته باشد. این روش برای داده‌های کوتاه‌مدت بسیار مناسب است.' },
      { type: 'code',
        code: 'static (string Name, int Age) GetUser()\n{\n    return ("Ali", 20);\n}\n\nvar user = GetUser();\nConsole.WriteLine(user.Name + " " + user.Age);',
        notes: {
          1: 'نوع بازگشتی یک tuple با دو عنصر نام‌دار است.',
          3: 'دو مقدار را در یک return برمی‌گردانیم.',
          6: 'نتیجه را در user می‌ریزیم و با نام به عناصر دسترسی داریم.'
        },
        output: 'Ali 20' },
      { type: 'tip', text: 'اگر داده‌ی برگشتی بیشتر از چند مقدار شد، یا رفتار دارد، یک class یا record مناسب‌تر است.' }
    ],
    quiz: [
      { q: 'یک متد چگونه می‌تواند دو مقدار را هم‌زمان برگرداند؟', options: ['دو بار return', 'با tuple', 'با دو متغیر سراسری', 'با حذف نوع'], answer: 1, explain: 'tuple امکان برگرداندن چند مقدار را در یک return فراهم می‌کند.' },
      { q: 'اگر tuple با نام (string Name, int Age) باشد، کدام دسترسی درست است؟', options: ['user[0]', 'user.Name', 'user.name_1', 'user->Name'], answer: 1, explain: 'عناصر نام‌دار tuple با همان نام، مثل user.Name، در دسترس هستند.' }
    ]
  };

  window.CURRICULUM.lessons['nullable-type'] = {
    id: 'nullable-type',
    title: 'Nullable Types و عملگر ??',
    level: 'متوسط',
    prereq: ['data-types', 'if-statement'],
    objectives: [
      'نوع مقداری را با علامت ? تهی‌پذیر (nullable) کنید.',
      'وجود مقدار را با HasValue بررسی کنید.',
      'با عملگر ?? مقدار جایگزین تعیین کنید.'
    ],
    blocks: [
      { type: 'h', text: 'گاهی هیچ مقداری وجود ندارد' },
      { type: 'p', text: 'انواع مقداری مثل int نمی‌توانند null باشند. اگر بخواهیم بگوییم «مقدار نداریم»، از int? استفاده می‌کنیم. این یعنی متغیر یا عدد است یا null.' },
      { type: 'code',
        code: 'int? score = null;\nConsole.WriteLine(score.HasValue);\n\nscore = 15;\nConsole.WriteLine(score.Value);\n\nint? missing = null;\nint safe = missing ?? 0;\nConsole.WriteLine(safe);',
        notes: {
          1: 'int? یعنی عدد صحیح یا null.',
          2: 'HasValue مشخص می‌کند مقدار داریم یا نه.',
          8: 'عملگر ?? اگر سمت چپ null باشد، مقدار سمت راست را می‌دهد.'
        },
        output: 'False\n15\n0' },
      { type: 'warn', text: 'اشتباه رایج: خواندن Value وقتی مقدار null است؛ این کار InvalidOperationException می‌دهد. ابتدا HasValue یا ?? را استفاده کنید.' }
    ],
    quiz: [
      { q: 'کدام تعریف نوع تهی‌پذیر است؟', options: ['int', 'int?', 'null int', 'nullable<int>>'], answer: 1, explain: 'علامت ? بعد از نوع مقداری، آن را تهی‌پذیر می‌کند.' },
      { q: 'نتیجه‌ی int? x = null; int y = x ?? 5; چیست؟', options: ['null', 'خطا', '5', '0'], answer: 2, explain: 'چون x تهی است، عملگر ?? مقدار 5 را برمی‌گرداند.' }
    ]
  };
})();
