// آزمون‌های جامع: آزمون فصل (۵ سؤال هر فصل) و آزمون مسیر (ترکیب فصل‌ها)
// انواع سؤال: مفهومی، پیش‌بینی خروجی، پیدا کردن خطا، تکمیل کد
window.EXAMS = [
  {
    id: 'ch-basics', kind: 'chapter', title: 'فصل ۱: مبانی و مقدمات',
    desc: 'برنامه‌نویسی، کامپایل، متغیر، انواع داده، تبدیل نوع و ورودی/خروجی.',
    questions: [
      { id: 'b1', type: 'مفهومی', q: 'کدام نوع داده برای عدد اعشاری مناسب است؟', options: ['int', 'double', 'bool', 'char'], answer: 1, explain: 'double برای عدد اعشاری است؛ int فقط عدد صحیح را نگه می‌دارد.', lessons: ['data-types'] },
      { id: 'b2', type: 'پیش‌بینی خروجی', q: 'خروجی کد زیر چیست؟\n\nint a = 7; int b = 2;\nConsole.WriteLine(a / b);', options: ['3.5', '3', '4', '2'], answer: 1, explain: 'چون هر دو عدد صحیح‌اند، تقسیم صحیح انجام می‌شود و نتیجه 3 است.', lessons: ['data-types', 'operators'] },
      { id: 'b3', type: 'پیدا کردن خطا', q: 'کدام خط خطای نوع دارد؟', options: ['int x = 10;', 'string s = "ali";', 'int y = "10";', 'bool ok = true;'], answer: 2, explain: 'متن "10" مستقیم به int داده شده؛ باید int.Parse یا TryParse استفاده شود.', lessons: ['type-conversion'] },
      { id: 'b4', type: 'تکمیل کد', q: 'برای نمایش نام کاربر در جمله، کدام قالب درست است؟\n\nstring name = Console.ReadLine();\nConsole.WriteLine($"سلام {___}");', options: ['name', '"name"', 'Name', 'nam'], answer: 0, explain: 'داخل { } نام متغیر دقیق نوشته می‌شود، یعنی name.', lessons: ['strings-math-random'] },
      { id: 'b5', type: 'مفهومی', q: 'سمی‌کالن (;) در C# برای چیست؟', options: ['پایان دادن به یک دستور', 'شروع یک متن', 'تقسیم اعداد', 'نوشتن توضیح'], answer: 0, explain: 'هر دستور C# با سمی‌کالن تمام می‌شود.', lessons: ['first-program'] }
    ]
  },
  {
    id: 'ch-control', kind: 'chapter', title: 'فصل ۲: تصمیم‌گیری و حلقه‌ها',
    desc: 'if، else، switch، حلقه‌های for و while و foreach، break و continue.',
    questions: [
      { id: 'c1', type: 'پیش‌بینی خروجی', q: 'خروجی کد زیر چیست؟\n\nfor (int i = 0; i < 3; i++) Console.Write(i);', options: ['123', '012', '0123', '333'], answer: 1, explain: 'i از 0 تا 2 می‌رود؛ پس 012 چاپ می‌شود.', lessons: ['for-loop'] },
      { id: 'c2', type: 'پیدا کردن خطا', q: 'در switch زیر چه اشکالی وجود دارد؟\n\nswitch (x)\n{\n  case 1: Console.WriteLine("یک");\n  case 2: Console.WriteLine("دو"); break;\n}', options: ['case 1 بدون break است', 'x تعریف نشده', 'default لازم است', 'هیچ اشکالی نیست'], answer: 0, explain: 'هر case باید با break یا return تمام شود؛ وگرنه کامپایلر خطا می‌دهد.', lessons: ['else-if-switch'] },
      { id: 'c3', type: 'پیش‌بینی خروجی', q: 'خروجی کد زیر چیست؟\n\nint n = 3;\nwhile (n > 0) { n--; }\nConsole.WriteLine(n);', options: ['3', '0', '1', '-1'], answer: 1, explain: 'حلقه تا n برابر صفر شدن ادامه دارد؛ پس خروجی 0 است.', lessons: ['while-loops'] },
      { id: 'c4', type: 'مفهومی', q: 'کدام دستور باعث می‌شود تکرار فعلی حلقه رد شود؟', options: ['break', 'continue', 'return', 'exit'], answer: 1, explain: 'continue به تکرار بعدی می‌رود؛ break کل حلقه را تمام می‌کند.', lessons: ['foreach-break-continue'] },
      { id: 'c5', type: 'تکمیل کد', q: 'برای بررسی زوج بودن n کدام شرط درست است؟', options: ['if (n % 2 == 0)', 'if (n / 2 == 0)', 'if (n = 2)', 'if (n % 2 = 0)'], answer: 0, explain: 'باقیمانده‌ی تقسیم بر 2 برای زوج بودن و مقایسه با == است.', lessons: ['operators', 'if-statement'] }
    ]
  },
  {
    id: 'ch-functions', kind: 'chapter', title: 'فصل ۳: متدها، آرایه‌ها و مجموعه‌ها',
    desc: 'متد، پارامتر، return، آرایه، List، Dictionary و HashSet.',
    questions: [
      { id: 'f1', type: 'پیش‌بینی خروجی', q: 'خروجی کد زیر چیست؟\n\nstatic int Sq(int x) => x * x;\nConsole.WriteLine(Sq(4));', options: ['8', '16', '4', '44'], answer: 1, explain: '4 به توان دو برابر 16 است.', lessons: ['parameters-return'] },
      { id: 'f2', type: 'پیدا کردن خطا', q: 'کدام خط خطای کامپایل دارد؟\n\nstatic void Show() { Console.WriteLine("hi"); }\nint r = Show();', options: ['خط اول', 'خط دوم', 'هیچ‌کدام', 'هر دو'], answer: 1, explain: 'متد void مقداری برنمی‌گرداند؛ نمی‌توان نتیجه‌اش را در int ریخت.', lessons: ['void-vs-return'] },
      { id: 'f3', type: 'مفهومی', q: 'اولین عنصر یک آرایه چه اندیسی دارد؟', options: ['1', '0', '-1', 'Length'], answer: 1, explain: 'اندیس‌گذاری از 0 شروع می‌شود.', lessons: ['arrays-basics'] },
      { id: 'f4', type: 'پیش‌بینی خروجی', q: 'خروجی کد زیر چیست؟\n\nvar s = new HashSet<int> { 1, 1, 2 };\nConsole.WriteLine(s.Count);', options: ['3', '2', '1', '0'], answer: 1, explain: 'HashSet عناصر تکراری را نگه نمی‌دارد؛ پس دو عنصر یکتا داریم.', lessons: ['hashset'] },
      { id: 'f5', type: 'تکمیل کد', q: 'برای بررسی وجود کلید در Dictionary کدام درست است؟\n\nif (ages.___("Ali")) { ... }', options: ['ContainsKey', 'Contains', 'Find', 'HasKey'], answer: 0, explain: 'ContainsKey برای بررسی وجود کلید در Dictionary است.', lessons: ['dictionary'] }
    ]
  },
  {
    id: 'ch-oop', kind: 'chapter', title: 'فصل ۴: برنامه‌نویسی شیءگرا',
    desc: 'کلاس، Property، سازنده، کپسوله‌سازی، ارث‌بری، چندریختی، رابط و static.',
    questions: [
      { id: 'o1', type: 'مفهومی', q: 'کلاس در برابر شیء چه نقشی دارد؟', options: ['کلاس نمونه‌ی واقعی است', 'کلاس الگو و شیء نمونه است', 'هیچ تفاوتی ندارند', 'شیء الگو است'], answer: 1, explain: 'کلاس الگو و شیء نمونه‌ای ساخته‌شده از آن است.', lessons: ['class-and-object'] },
      { id: 'o2', type: 'پیدا کردن خطا', q: 'کدام نشان‌دهنده‌ی ارث‌بری درست است؟', options: ['class Dog = Animal', 'class Dog : Animal', 'class Dog -> Animal', 'class Dog extends Animal'], answer: 1, explain: 'در C# از : برای ارث‌بری استفاده می‌شود.', lessons: ['inheritance'] },
      { id: 'o3', type: 'پیش‌بینی خروجی', q: 'با سه بار new Counter() و سازنده‌ای که Count++ انجام می‌دهد، Counter.Count چیست؟ (Count از نوع static است)', options: ['1', '3', '0', 'خطا'], answer: 1, explain: 'عضو static مشترک است؛ هر ساخت یک واحد اضافه می‌کند.', lessons: ['static-members'] },
      { id: 'o4', type: 'مفهومی', q: 'کپسوله‌سازی اصولاً برای چیست؟', options: ['سرعت بیشتر', 'محافظت از داده در برابر تغییر نادرست', 'حذف متدها', 'استفاده از فایل'], answer: 1, explain: 'با کنترل دسترسی، داده نمی‌تواند به حالت نادرست برود.', lessons: ['encapsulation'] },
      { id: 'o5', type: 'تکمیل کد', q: 'برای اینکه متد فرزند متد والد را بازتعریف کند، کدام کلیدواژه لازم است؟\n\npublic ___ override string Describe() { ... }', options: ['virtual', 'abstract', 'override', 'static'], answer: 2, explain: 'کلیدواژه‌ی override در فرزند برای بازتعریف متد virtual یا abstract است.', lessons: ['polymorphism'] }
    ]
  },
  {
    id: 'ch-errors', kind: 'chapter', title: 'فصل ۵: خطا، انواع پیشرفته و منابع',
    desc: 'try/catch/finally، throw، Enum، Tuple، Nullable، IDisposable و using.',
    questions: [
      { id: 'e1', type: 'پیش‌بینی خروجی', q: 'خروجی کد زیر چیست؟\n\ntry { int.Parse("x"); }\ncatch (FormatException) { Console.Write("A"); }', options: ['A', 'x', 'خطا', 'هیچ‌چیز'], answer: 0, explain: 'FormatException گرفته می‌شود و "A" چاپ می‌شود.', lessons: ['try-catch'] },
      { id: 'e2', type: 'مفهومی', q: 'بلوک finally چه زمانی اجرا می‌شود؟', options: ['فقط با خطا', 'فقط بدون خطا', 'همیشه', 'هرگز'], answer: 2, explain: 'finally چه خطا رخ دهد چه ندهد اجرا می‌شود.', lessons: ['finally-block'] },
      { id: 'e3', type: 'پیش‌بینی خروجی', q: 'خروجی کد زیر چیست؟\n\nint? x = null;\nConsole.WriteLine(x ?? 9);', options: ['null', '9', '0', 'خطا'], answer: 1, explain: 'چون x تهی است، عملگر ?? مقدار 9 را می‌دهد.', lessons: ['nullable-type'] },
      { id: 'e4', type: 'پیش‌بینی خروجی', q: 'با enum Day { Sat, Sun, Mon } خروجی (int)Day.Mon چیست؟', options: ['0', '1', '2', '3'], answer: 2, explain: 'مقادیر از 0 شروع می‌شوند: Sat=0، Sun=1، Mon=2.', lessons: ['enum-type'] },
      { id: 'e5', type: 'مفهومی', q: 'using برای چه منظوری استفاده می‌شود؟', options: ['افزودن فضای نام', 'آزادسازی خودکار منبع با Dispose', 'ساخت متد', 'تعریف ثابت'], answer: 1, explain: 'using Dispose را در پایان بلوک صدا می‌زند.', lessons: ['idisposable-using'] }
    ]
  },
  {
    id: 'ch-advanced', kind: 'chapter', title: 'فصل ۶: پیشرفته‌تر و ابزارها',
    desc: 'delegate، lambda، event، LINQ، async/await، فایل و JSON، Git و عیب‌یابی.',
    questions: [
      { id: 'a1', type: 'پیش‌بینی خروجی', q: 'خروجی کد زیر چیست؟\n\nFunc<int, int> f = x => x + 1;\nConsole.WriteLine(f(4));', options: ['4', '5', '8', 'خطا'], answer: 1, explain: 'lambda یک واحد به ورودی اضافه می‌کند: 4 + 1 = 5.', lessons: ['lambda-expressions'] },
      { id: 'a2', type: 'مفهومی', q: 'برای مشترک شدن به یک event از کدام عملگر استفاده می‌شود؟', options: ['=', '+=', '==', '=>'], answer: 1, explain: 'با += به event مشترک می‌شوید.', lessons: ['events'] },
      { id: 'a3', type: 'پیش‌بینی خروجی', q: 'خروجی زیر چیست؟\n\nvar nums = new[] { 1, 2, 3, 4, 5 };\nConsole.WriteLine(nums.Where(n => n > 2).Count());', options: ['2', '3', '5', '4'], answer: 1, explain: 'اعداد 3، 4 و 5 از شرط بزرگ‌تر از 2 می‌گذرند؛ یعنی 3 عدد.', lessons: ['linq-basics'] },
      { id: 'a4', type: 'مفهومی', q: 'متد async معمولاً چه نوع بازگشتی دارد؟', options: ['int', 'Task یا Task<T>', 'string[]', 'void همیشه'], answer: 1, explain: 'متد async معمولاً Task یا Task<T> برمی‌گرداند.', lessons: ['async-await'] },
      { id: 'a5', type: 'مفهومی', q: 'اگر بخواهیم پیام‌های یک فایل قبلی حفظ شوند و خط جدید به انتها اضافه شود، کدام متد؟', options: ['File.WriteAllText', 'File.AppendAllText', 'File.Delete', 'File.Create'], answer: 1, explain: 'AppendAllText محتوای قبلی را نگه می‌دارد و به انتها اضافه می‌کند.', lessons: ['file-io'] }
    ]
  },
  {
    id: 'path-beginner', kind: 'path', title: 'آزمون مسیر مبتدی',
    desc: 'ترکیب فصل ۱ تا ۳. برای گذر از مسیر مبتدی.',
    from: ['ch-basics', 'ch-control', 'ch-functions']
  },
  {
    id: 'path-advanced', kind: 'path', title: 'آزمون مسیر پیشرفته',
    desc: 'ترکیب فصل ۴ تا ۶. برای گذر از مسیر پیشرفته.',
    from: ['ch-oop', 'ch-errors', 'ch-advanced']
  }
];

// ساخت سؤال‌های آزمون مسیر از روی فصل‌ها
(function () {
  window.EXAMS.forEach(e => {
    if (e.kind === 'path') {
      e.questions = [];
      e.from.forEach(fid => {
        const src = window.EXAMS.find(x => x.id === fid);
        if (src) e.questions.push(...src.questions);
      });
    }
  });
})();
