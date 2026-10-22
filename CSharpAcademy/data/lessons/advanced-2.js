// موضوعات پیشرفته‌ی ۲: LINQ، Extension، Generic Methods، yield، async/await، فایل و JSON،
// تاریخ و زمان، Regular Expressions، Reflection و Attribute
(function () {
  const ids = [
    'linq-basics', 'extension-methods', 'generic-methods', 'iterator-yield',
    'async-await', 'file-io', 'json-serialization', 'datetime-basics',
    'regex-basics', 'reflection-attributes'
  ];
  window.CURRICULUM.topics.push({
    id: 'advanced-2',
    title: 'پیشرفته‌تر: LINQ، async، فایل، JSON و Reflection',
    desc: 'داده را با LINQ پردازش کنید، کد را ناهمگام بنویسید، با فایل و JSON کار کنید و از Reflection و Attribute بهره ببرید.',
    level: 'پیشرفته',
    lessons: ids
  });

  const L = window.CURRICULUM.lessons;

  L['linq-basics'] = {
    id: 'linq-basics', title: 'LINQ: پرس‌وجو روی مجموعه‌ها', level: 'پیشرفته',
    prereq: ['lambda-expressions', 'list-generic'],
    objectives: ['با Where، Select و OrderBy داده را فیلتر و تبدیل کنید.', 'بفهمید LINQ با lambda کار می‌کند.', 'تفاوت اجرای تنبل (lazy) را بشناسید.'],
    blocks: [
      { type: 'h', text: 'پرس‌وجو به سبک جمله‌ی انگلیسی' },
      { type: 'p', text: 'LINQ (Language Integrated Query) امکان نوشتن پرس‌وجو روی آرایه، List و سایر مجموعه‌ها را با متدهایی مثل Where (فیلتر) و Select (تبدیل) می‌دهد. این متدها lambda می‌گیرند.' },
      { type: 'code', code: 'using System.Linq;\n\nint[] numbers = { 1, 2, 3, 4, 5, 6 };\nvar result = numbers.Where(n => n % 2 == 0).Select(n => n * 2);\nConsole.WriteLine(string.Join(", ", result));', output: '4, 8, 12' },
      { type: 'tip', text: 'LINQ در لحظه‌ی foreach یا تبدیل به لیست واقعاً اجرا می‌شود (اجرای تنبل). برای گرفتن نتیجه‌ی ثابت، ToList() را صدا بزنید.' },
      { type: 'warn', text: 'اشتباه رایج: تغییر داده‌ی مجموعه بعد از تعریف پرس‌وجو و انتظار نتیجه‌ی قدیمی. اجرای تنبل نتیجه‌ی تازه می‌دهد.' }
    ],
    quiz: [
      { q: 'numbers.Where(n => n > 3) چه چیزی برمی‌گرداند؟', options: ['یک عدد', 'عناصر بزرگ‌تر از 3', 'تعداد عناصر', 'مرتب‌شده'], answer: 1, explain: 'Where عناصری را برمی‌گرداند که شرط lambda را داشته باشند.' },
      { q: 'کدام متد برای تبدیل هر عنصر به مقدار دیگر است؟', options: ['Where', 'Select', 'Count', 'Remove'], answer: 1, explain: 'Select هر عنصر را به شکل دیگری تبدیل می‌کند.' }
    ]
  };

  L['extension-methods'] = {
    id: 'extension-methods', title: 'Extension Methods: افزودن متد به نوع موجود', level: 'پیشرفته',
    prereq: ['static-members', 'lambda-expressions'],
    objectives: ['متد extension با this بنویسید.', 'آن را مثل متد نمونه صدا بزنید.', 'بدانید extension متد واقعی روی کلاس اصلی نیست.'],
    blocks: [
      { type: 'h', text: 'متد جدید بدون تغییر کلاس' },
      { type: 'p', text: 'extension method به شما اجازه می‌دهد متد جدیدی به نوع‌های موجود (مثل string) اضافه کنید، بدون اینکه کد اصلی آن نوع را تغییر دهید. متد باید داخل یک static class باشد و پارامتر اول آن با this شروع شود.' },
      { type: 'code', code: 'public static class StringExtensions\n{\n    public static bool IsEmail(this string s)\n    {\n        return s.Contains("@");\n    }\n}\n\nConsole.WriteLine("ali@mail.com".IsEmail());', output: 'True' },
      { type: 'warn', text: 'اشتباه رایج: اگر متد با همان امضا در کلاس اصلی وجود داشته باشد، متد اصلی اولویت دارد و extension اجرا نمی‌شود.' }
    ],
    quiz: [
      { q: 'کلیدواژه‌ی لازم برای پارامتر اول extension کدام است؟', options: ['static', 'this', 'ref', 'out'], answer: 1, explain: 'this پارامتر اول را به نوعی که قرار است متد به آن اضافه شود وصل می‌کند.' },
      { q: 'extension method باید داخل چه نوع کلاسی باشد؟', options: ['کلاس عادی غیر static', 'static class', 'struct', 'interface'], answer: 1, explain: 'extension methods باید داخل یک static class تعریف شوند.' }
    ]
  };

  L['generic-methods'] = {
    id: 'generic-methods', title: 'Generic Methods و Constraints', level: 'پیشرفته',
    prereq: ['generics', 'interfaces'],
    objectives: ['متد generic با پارامتر نوع بنویسید.', 'با where محدودیت نوع تعیین کنید.', 'بفهمید چرا محدودیت لازم است.'],
    blocks: [
      { type: 'h', text: 'یک متد برای چند نوع' },
      { type: 'p', text: 'متد generic مثل کلاس generic، با پارامتر نوع کار می‌کند. گاهی باید بگوییم نوع چه قابلیتی دارد؛ این کار با constraint (where) انجام می‌شود. مثلاً برای مقایسه باید نوع IComparable باشد.' },
      { type: 'code', code: 'static T Max<T>(T a, T b) where T : IComparable<T>\n{\n    return a.CompareTo(b) > 0 ? a : b;\n}\n\nConsole.WriteLine(Max(3, 7));\nConsole.WriteLine(Max("ali", "sara"));', output: '7\nsara' },
      { type: 'warn', text: 'اشتباه رایج: استفاده از عملگر > روی T بدون constraint. کامپایلر نمی‌داند T قابل مقایسه است و خطا می‌دهد.' }
    ],
    quiz: [
      { q: 'where T : IComparable<T> چه کاری می‌کند؟', options: ['T را حذف می‌کند', 'تضمین می‌کند T قابلیت مقایسه دارد', 'T را null می‌کند', 'T را static می‌کند'], answer: 1, explain: 'constraint یعنی T باید IComparable باشد، پس CompareTo قابل استفاده است.' },
      { q: 'Max(3, 7) چه چیزی برمی‌گرداند؟', options: ['3', '7', '10', 'خطا'], answer: 1, explain: 'بزرگ‌ترین عدد، یعنی 7، برگردانده می‌شود.' }
    ]
  };

  L['iterator-yield'] = {
    id: 'iterator-yield', title: 'Iterator و yield', level: 'پیشرفته',
    prereq: ['for-loop', 'generic-methods'],
    objectives: ['متد iterator با yield return بنویسید.', 'بفهمید داده به‌صورت تدریجی تولید می‌شود.', 'تفاوت yield با برگرداندن کل لیست را بگویید.'],
    blocks: [
      { type: 'h', text: 'تولید تدریجی' },
      { type: 'p', text: 'yield return مقدار را یکی‌یکی می‌دهد و اجرای متد را موقتاً نگه می‌دارد. کل مجموعه در حافظه ساخته نمی‌شود، که برای داده‌های بزرگ یا دنباله‌های نامحدود مفید است.' },
      { type: 'code', code: 'using System.Collections.Generic;\n\nstatic IEnumerable<int> Countdown(int n)\n{\n    for (int i = n; i > 0; i--)\n    {\n        yield return i;\n    }\n}\n\nforeach (int x in Countdown(3))\n{\n    Console.WriteLine(x);\n}', output: '3\n2\n1' },
      { type: 'tip', text: 'نوع بازگشتی iterator معمولاً IEnumerable<T> یا IEnumerator<T> است.' }
    ],
    quiz: [
      { q: 'yield return چه کاری انجام می‌دهد؟', options: ['متد را برای همیشه تمام می‌کند', 'یک مقدار می‌دهد و اجرا را موقتاً نگه می‌دارد', 'خطا می‌دهد', 'متد را static می‌کند'], answer: 1, explain: 'yield مقدار را یکی‌یکی تولید می‌کند و بعد ادامه می‌دهد.' },
      { q: 'نوع بازگشتی معمول برای iterator کدام است؟', options: ['void', 'int', 'IEnumerable<T>', 'string[,]'], answer: 2, explain: 'iterator معمولاً IEnumerable<T> برمی‌گرداند.' }
    ]
  };

  L['async-await'] = {
    id: 'async-await', title: 'async/await و Task', level: 'پیشرفته',
    prereq: ['methods-constructors', 'delegate-basics'],
    objectives: ['متد async با Task بنویسید.', 'با await منتظر نتیجه بمانید بدون مسدود کردن برنامه.', 'بدانید async در Unity 2019 به روش متفاوتی است.'],
    blocks: [
      { type: 'h', text: 'منتظر ماندن بدون قفل شدن' },
      { type: 'p', text: 'کارهایی مثل خواندن از اینترنت یا دیسک زمان می‌برند. با async و await، برنامه می‌تواند تا پایان این کار منتظر بماند، بدون اینکه رابط کاربری یا بقیه‌ی برنامه قفل شوند. Task نماینده‌ی کاری است که در آینده کامل می‌شود.' },
      { type: 'code', code: 'static async Task<string> GetDataAsync()\n{\n    await Task.Delay(1000);\n    return "داده";\n}\n\nstring d = await GetDataAsync();\nConsole.WriteLine(d);', output: 'داده (بعد از حدود یک ثانیه)' },
      { type: 'tip', text: 'بیشتر متدهای ناهمگام نام‌شان به Async ختم می‌شود، مثل GetDataAsync. این یک قرارداد رایج است.' },
      { type: 'warn', text: 'در Unity 2019.4 کد async مثل بالا روی رشته‌ی اصلی بازی کار نمی‌کند؛ برای زمان‌بندی در Unity از Coroutine استفاده کنید. این مورد را در بخش Unity دیدید.' }
    ],
    quiz: [
      { q: 'کلیدواژه‌ی منتظر ماندن برای نتیجه‌ی Task کدام است؟', options: ['wait', 'await', 'async', 'yield'], answer: 1, explain: 'await منتظر تکمیل Task می‌ماند بدون اینکه برنامه قفل شود.' },
      { q: 'متد async معمولاً چه نوعی برمی‌گرداند؟', options: ['int', 'Task یا Task<T>', 'string[]', 'void همیشه'], answer: 1, explain: 'متد async معمولاً Task یا Task<T> برمی‌گرداند.' }
    ]
  };

  L['file-io'] = {
    id: 'file-io', title: 'کار با فایل‌ها و پوشه‌ها', level: 'پیشرفته',
    prereq: ['input-output', 'try-catch'],
    objectives: ['متن را در فایل بنویسید و بخوانید.', 'قبل از خواندن وجود فایل را بررسی کنید.', 'خطای فایل را با try مدیریت کنید.'],
    blocks: [
      { type: 'h', text: 'ذخیره‌ی داده روی دیسک' },
      { type: 'p', text: 'کلاس File در فضای نام System.IO برای نوشتن و خواندن کل محتوای یک فایل متنی به کار می‌رود. اگر فایل وجود نداشته باشد یا دسترسی نباشد، استثنا رخ می‌دهد.' },
      { type: 'code', code: 'using System.IO;\n\nFile.WriteAllText("notes.txt", "سلام");\n\nif (File.Exists("notes.txt"))\n{\n    string text = File.ReadAllText("notes.txt");\n    Console.WriteLine(text);\n}', output: 'سلام' },
      { type: 'warn', text: 'اشتباه رایج: خواندن فایل بدون بررسی وجود آن. مسیر نسبی به پوشه‌ی اجرای برنامه وابسته است؛ مراقب مسیر باشید.' }
    ],
    quiz: [
      { q: 'کدام متد کل محتوای یک فایل متنی را می‌خواند؟', options: ['File.ReadAllText', 'File.Open', 'Directory.Read', 'Console.Read'], answer: 0, explain: 'ReadAllText محتوای کامل فایل متنی را به صورت رشته برمی‌گرداند.' },
      { q: 'قبل از خواندن از وجود فایل کدام متد را صدا بزنیم؟', options: ['File.Exists', 'File.Delete', 'File.Create', 'Console.Clear'], answer: 0, explain: 'File.Exists بررسی می‌کند فایل وجود دارد یا نه.' }
    ]
  };

  L['json-serialization'] = {
    id: 'json-serialization', title: 'کار با JSON', level: 'پیشرفته',
    prereq: ['file-io', 'fields-properties'],
    objectives: ['یک شیء را به JSON تبدیل کنید (Serialize).', 'JSON را به شیء برگردانید (Deserialize).', 'بدانید ویژگی‌ها باید Property عمومی باشند.'],
    blocks: [
      { type: 'h', text: 'تبادل داده با زبان‌های دیگر' },
      { type: 'p', text: 'JSON قالب متنی رایجی برای ذخیره و تبادل داده است. کلاس JsonSerializer در System.Text.Json شیء را به JSON و برعکس تبدیل می‌کند.' },
      { type: 'code', code: 'using System.Text.Json;\n\nclass Person\n{\n    public string Name { get; set; }\n    public int Age { get; set; }\n}\n\nstring json = JsonSerializer.Serialize(new Person { Name = "Ali", Age = 20 });\nConsole.WriteLine(json);\n\nPerson p = JsonSerializer.Deserialize<Person>(json);\nConsole.WriteLine(p.Name);', output: '{"Name":"Ali","Age":20}\nAli' },
      { type: 'warn', text: 'اشتباه رایج: استفاده از فیلد به‌جای Property در کلاسی که قرار است JSON شود. با Property عمومی (get; set;) تبدیل ساده‌تر و مطمئن‌تر است.' }
    ],
    quiz: [
      { q: 'تبدیل شیء به متن JSON چه نامیده می‌شود؟', options: ['Deserialize', 'Serialize', 'Parse', 'Compile'], answer: 1, explain: 'Serialize شیء را به متن JSON تبدیل می‌کند.' },
      { q: 'کدام Property برای تبدیل JSON مناسب‌تر است؟', options: ['public string Name { get; set; }', 'private string name;', 'string Name()', 'const string Name'], answer: 0, explain: 'Property عمومی با get و set برای تبدیل JSON مناسب است.' }
    ]
  };

  L['datetime-basics'] = {
    id: 'datetime-basics', title: 'تاریخ و زمان', level: 'پیشرفته',
    prereq: ['type-conversion', 'strings-math-random'],
    objectives: ['یک تاریخ مشخص بسازید و قالب‌بندی کنید.', 'اختلاف دو تاریخ را با TimeSpan بگیرید.', 'زمان فعلی را با DateTime.Now بشناسید.'],
    blocks: [
      { type: 'h', text: 'تاریخ و بازه‌ی زمانی' },
      { type: 'p', text: 'DateTime یک تاریخ و زمان را نشان می‌دهد و DateTime.Now زمان فعلی سیستم است. تفاضل دو DateTime یک TimeSpan می‌دهد که مدت زمان بین آن‌ها است.' },
      { type: 'code', code: 'DateTime d = new DateTime(2026, 10, 22);\nConsole.WriteLine(d.ToString("yyyy-MM-dd"));\n\nTimeSpan diff = new DateTime(2026, 10, 25) - d;\nConsole.WriteLine(diff.Days);', output: '2026-10-22\n3' },
      { type: 'tip', text: 'برای قالب‌بندی، کد قالب مثل yyyy-MM-dd را به ToString بدهید. این کد بین فرهنگ‌ها تفاوت دارد؛ در صورت نیاز فرهنگ را مشخص کنید.' }
    ],
    quiz: [
      { q: 'DateTime.Now چه چیزی را برمی‌گرداند؟', options: ['تاریخ ثابت', 'زمان فعلی سیستم', 'عدد تصادفی', 'متن خالی'], answer: 1, explain: 'DateTime.Now تاریخ و زمان لحظه‌ی فعلی سیستم را می‌دهد.' },
      { q: 'تفاضل دو DateTime چه نوعی است؟', options: ['int', 'string', 'TimeSpan', 'bool'], answer: 2, explain: 'تفاضل دو DateTime یک TimeSpan می‌دهد.' }
    ]
  };

  L['regex-basics'] = {
    id: 'regex-basics', title: 'Regular Expressions: الگوی متن', level: 'پیشرفته',
    prereq: ['strings-math-random', 'if-statement'],
    objectives: ['یک الگوی ساده‌ی Regex بنویسید.', 'با Regex.IsMatch بررسی کنید متن با الگو هم‌خوان است.', 'معنی ^ و $ را بفهمید.'],
    blocks: [
      { type: 'h', text: 'الگو برای متن' },
      { type: 'p', text: 'Regular Expression (Regex) الگویی برای پیدا کردن یا بررسی متن است. مثلاً می‌توان بررسی کرد یک رشته شبیه ایمیل است یا نه. ^ یعنی شروع متن و $ یعنی پایان آن.' },
      { type: 'code', code: 'using System.Text.RegularExpressions;\n\nbool ok = Regex.IsMatch("a@b.com", @"^[^@]+@[^@]+\\.\\w+$");\nConsole.WriteLine(ok);', output: 'True' },
      { type: 'warn', text: 'اشتباه رایج: فراموش کردن رشته‌ی @ در Regex. بدون @، نقطه‌ها و کاراکترهای خاص مثل \\ معنای دیگری پیدا می‌کنند. برای این کار @"..." بنویسید.' }
    ],
    quiz: [
      { q: 'علامت ^ در Regex به چه معناست؟', options: ['پایان متن', 'شروع متن', 'تکرار', 'عدد'], answer: 1, explain: '^ ابتدای متن را مشخص می‌کند.' },
      { q: 'Regex.IsMatch چه نوعی برمی‌گرداند؟', options: ['string', 'bool', 'int', 'Match'], answer: 1, explain: 'IsMatch نتیجه را به صورت true یا false می‌دهد.' }
    ]
  };

  L['reflection-attributes'] = {
    id: 'reflection-attributes', title: 'Reflection و Attribute', level: 'پیشرفته',
    prereq: ['class-and-object', 'fields-properties'],
    objectives: ['یک Attribute سفارشی تعریف کنید.', 'Attribute را روی کلاس قرار دهید.', 'با Reflection اطلاعات آن را بخوانید.'],
    blocks: [
      { type: 'h', text: 'برنامه درباره‌ی خودش' },
      { type: 'p', text: 'Attribute یک برچسب اطلاعاتی است که روی کلاس یا عضو می‌گذارید. Reflection امکان خواندن نوع‌ها، اعضا و برچسب‌ها را هنگام اجرا می‌دهد. با این دو، می‌توان کدهایی نوشت که بر اساس برچسب‌ها رفتار کنند.' },
      { type: 'code', code: 'using System;\n\n[AttributeUsage(AttributeTargets.Class)]\nclass InfoAttribute : Attribute\n{\n    public string Note;\n}\n\n[Info(Note = "شخص")]\nclass Person { }\n\nvar attr = (InfoAttribute)Attribute.GetCustomAttribute(typeof(Person), typeof(InfoAttribute));\nConsole.WriteLine(attr.Note);', output: 'شخص' },
      { type: 'tip', text: 'اسم هر Attribute که به Attribute ختم شود، هنگام استفاده پسوند را می‌گیرد؛ یعنی [Info] به جای [InfoAttribute] نوشته می‌شود.' },
      { type: 'warn', text: 'اشتباه رایج: استفاده‌ی زیاد از Reflection در مسیرهای پرتکرار. Reflection کندتر از کد مستقیم است؛ آن را برای موارد لازم نگه دارید.' }
    ],
    quiz: [
      { q: 'Attribute چه نقشی دارد؟', options: ['اجرای کد', 'افزودن اطلاعات برچسب‌گذاری', 'حذف متغیر', 'ساخت فایل'], answer: 1, explain: 'Attribute اطلاعات توصیفی به کد اضافه می‌کند.' },
      { q: 'Reflection برای چیست؟', options: ['نوشتن فایل', 'خواندن ساختار و اعضای نوع‌ها در زمان اجرا', 'کاهش حافظه', 'ساخت Task'], answer: 1, explain: 'Reflection امکان بررسی نوع‌ها و اعضا را هنگام اجرا می‌دهد.' }
    ]
  };
})();
