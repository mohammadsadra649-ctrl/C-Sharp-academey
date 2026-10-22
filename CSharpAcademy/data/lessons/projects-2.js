// پروژه‌های عملی بیشتر: مدیریت نمرات، فهرست کارها، سیستم خودرو با OOP، فایل متنی، JSON، و بازی Unity
(function () {
  const projects = window.CURRICULUM.topics.find(t => t.id === 'projects');
  projects.lessons.push('project-grades', 'project-todo', 'project-car-oop', 'project-text-file', 'project-json', 'project-unity-coins');

  const L = window.CURRICULUM.lessons;

  L['project-grades'] = {
    id: 'project-grades', title: 'پروژه: مدیریت نمرات', level: 'متوسط',
    prereq: ['list-generic', 'while-loops', 'type-conversion'],
    objectives: ['نمره‌ها را تا وقتی کاربر پایان دهد با List ذخیره کنید.', 'میانگین، بیشترین و کمترین نمره را حساب کنید.', 'تعداد قبول‌شدگان را بشمارید.'],
    blocks: [
      { type: 'h', text: 'هدف پروژه' },
      { type: 'p', text: 'برنامه‌ای بنویسید که نمره‌ها را از کاربر بگیرد، نمره‌های نامعتبر (بیشتر از 20) را رد کند، و در پایان آمار کلی را نمایش دهد.' },
      { type: 'h', text: 'مراحل ساخت' },
      { type: 'list', items: ['یک List<int> بسازید.', 'با while(true) نمره بگیرید؛ عدد منفی یعنی پایان.', 'نمره‌های بیشتر از 20 را رد کنید.', 'آمار را با Average، Max، Min و Count حساب کنید.'] },
      { type: 'h', text: 'راه‌حل' },
      { type: 'code', code: 'using System.Collections.Generic;\nusing System.Linq;\n\nList<int> grades = new List<int>();\nConsole.WriteLine("نمره‌ها را وارد کنید (عدد منفی برای پایان):");\n\nwhile (true)\n{\n    Console.Write("نمره: ");\n    if (!int.TryParse(Console.ReadLine(), out int g))\n    {\n        Console.WriteLine("عدد معتبر نیست.");\n        continue;\n    }\n    if (g < 0) break;\n    if (g > 20)\n    {\n        Console.WriteLine("نمره باید بین 0 و 20 باشد.");\n        continue;\n    }\n    grades.Add(g);\n}\n\nif (grades.Count == 0)\n{\n    Console.WriteLine("نمره‌ای وارد نشد.");\n    return;\n}\n\nConsole.WriteLine($"میانگین: {grades.Average():F2}");\nConsole.WriteLine($"بیشترین: {grades.Max()}");\nConsole.WriteLine($"کمترین: {grades.Min()}");\nConsole.WriteLine($"قبول‌شدگان: {grades.Count(x => x >= 10)}");' },
      { type: 'h', text: 'چالش تکمیلی' },
      { type: 'p', text: 'یک قابلیت اضافه کنید که نمره‌ها را مرتب و نمایش دهد (راهنمایی: grades.Sort() یا OrderBy).' }
    ],
    quiz: [
      { q: 'چرا از continue پس از ورودی نامعتبر استفاده شده است؟', options: ['برای پایان برنامه', 'تا نمره‌ی نامعتبر ذخیره نشود و دوباره ورودی گرفته شود', 'برای حذف لیست', 'این کار لازم نیست'], answer: 1, explain: 'continue دور فعلی را رد می‌کند و ورودی دوباره گرفته می‌شود.' },
      { q: 'grades.Count(x => x >= 10) چه می‌شمارد؟', options: ['همه‌ی نمره‌ها', 'نمره‌های 10 یا بیشتر', 'نمره‌های کمتر از 10', 'عدد منفی'], answer: 1, explain: 'شرط lambda فقط نمره‌های بزرگ‌تر یا مساوی 10 را می‌شمارد.' }
    ]
  };

  L['project-todo'] = {
    id: 'project-todo', title: 'پروژه: فهرست کارها', level: 'متوسط',
    prereq: ['list-generic', 'while-loops', 'if-else'],
    objectives: ['یک منوی تکرارشونده بسازید.', 'کار اضافه، نمایش و حذف کنید.', 'ورودی‌های نامعتبر را مدیریت کنید.'],
    blocks: [
      { type: 'h', text: 'هدف پروژه' },
      { type: 'p', text: 'برنامه‌ای که کارها را در یک List نگه دارد و با منو اضافه، نمایش، حذف و خروج را انجام دهد.' },
      { type: 'h', text: 'راه‌حل' },
      { type: 'code', code: 'List<string> tasks = new List<string>();\n\nwhile (true)\n{\n    Console.WriteLine("1) افزودن  2) نمایش  3) حذف  4) خروج");\n    string choice = Console.ReadLine();\n\n    if (choice == "1")\n    {\n        Console.Write("کار: ");\n        tasks.Add(Console.ReadLine());\n    }\n    else if (choice == "2")\n    {\n        for (int i = 0; i < tasks.Count; i++)\n            Console.WriteLine($"{i + 1}. {tasks[i]}");\n    }\n    else if (choice == "3")\n    {\n        Console.Write("شماره: ");\n        if (int.TryParse(Console.ReadLine(), out int n) && n >= 1 && n <= tasks.Count)\n            tasks.RemoveAt(n - 1);\n        else\n            Console.WriteLine("شماره نامعتبر است.");\n    }\n    else if (choice == "4")\n    {\n        break;\n    }\n    else\n    {\n        Console.WriteLine("گزینه نامعتبر است.");\n    }\n}' },
      { type: 'h', text: 'چالش تکمیلی' },
      { type: 'p', text: 'کارها را در یک فایل ذخیره کنید تا با اجرای بعدی حفظ شوند (از درس فایل متنی کمک بگیرید).' }
    ],
    quiz: [
      { q: 'برای حذف کار شماره n (از 1) کدام دستور مناسب است؟', options: ['tasks.Remove(n)', 'tasks.RemoveAt(n - 1)', 'tasks.Delete(n)', 'tasks[n] = null'], answer: 1, explain: 'RemoveAt با اندیس کار می‌کند که از 0 شروع می‌شود، پس n - 1.' },
      { q: 'چرا شرط n <= tasks.Count بررسی می‌شود؟', options: ['برای سرعت', 'جلوگیری از اندیس خارج از محدوده', 'برای رنگ', 'لازم نیست'], answer: 1, explain: 'بدون این بررسی، دسترسی به اندیس نامعتبر خطای زمان اجرا می‌دهد.' }
    ]
  };

  L['project-car-oop'] = {
    id: 'project-car-oop', title: 'پروژه: سیستم اطلاعات خودرو با OOP', level: 'متوسط',
    prereq: ['inheritance', 'polymorphism', 'abstract-class', 'encapsulation'],
    objectives: ['یک کلاس پایه‌ی انتزاعی و دو فرزند بسازید.', 'با Property و سازنده داده را کپسوله کنید.', 'با چندریختی همه‌ی وسیله‌ها را یکسان مدیریت کنید.'],
    blocks: [
      { type: 'h', text: 'هدف پروژه' },
      { type: 'p', text: 'یک سیستم کوچک بسازید که خودرو و کامیون را مدیریت کند. هر وسیله سرعت دارد و می‌تواند شرح خود را برگرداند. کدهای مشترک در کلاس پایه باشند.' },
      { type: 'h', text: 'راه‌حل' },
      { type: 'code', code: 'abstract class Vehicle\n{\n    public string Brand { get; set; }\n    public int Speed { get; protected set; }\n\n    public Vehicle(string brand)\n    {\n        Brand = brand;\n    }\n\n    public void Accelerate(int amount)\n    {\n        Speed += amount;\n    }\n\n    public abstract string Describe();\n}\n\nclass Car : Vehicle\n{\n    public Car(string brand) : base(brand) { }\n\n    public override string Describe() => $"خودرو {Brand} با سرعت {Speed}";\n}\n\nclass Truck : Vehicle\n{\n    public int Load { get; set; }\n\n    public Truck(string brand, int load) : base(brand)\n    {\n        Load = load;\n    }\n\n    public override string Describe() => $"کامیون {Brand} با بار {Load}";\n}\n\nvar fleet = new List<Vehicle> { new Car("Peugeot"), new Truck("Volvo", 500) };\nforeach (Vehicle v in fleet)\n{\n    v.Accelerate(30);\n    Console.WriteLine(v.Describe());\n}', output: 'خودرو Peugeot با سرعت 30\nکامیون Volvo با بار 500' },
      { type: 'h', text: 'چالش تکمیلی' },
      { type: 'p', text: 'یک کلاس Motorcycle اضافه کنید و یک متد Brake بنویسید که سرعت را صفر کند. دقت کنید سرعت فقط از داخل کلاس قابل تغییر باشد.' }
    ],
    quiz: [
      { q: 'چرا Vehicle انتزاعی (abstract) است؟', options: ['برای سرعت', 'تا نتوان از آن شیء ساخت و هر فرزند Describe خودش را بنویسد', 'برای حذف Brand', 'به دلیل Property'], answer: 1, explain: 'کلاس پایه بدون شیء است و متد Describe را فرزندان پیاده‌سازی می‌کنند.' },
      { q: 'چرا Speed فقط protected set است؟', options: ['برای نمایش', 'تا تغییر سرعت فقط از داخل کلاس و فرزندان انجام شود', 'برای حذف سرعت', 'این کار اشتباه است'], answer: 1, explain: 'این کپسوله‌سازی است: تغییر سرعت از کنترل‌شده‌ترین مسیر انجام می‌شود.' }
    ]
  };

  L['project-text-file'] = {
    id: 'project-text-file', title: 'پروژه: مدیریت فایل متنی (گزارش ورود)', level: 'متوسط',
    prereq: ['file-io', 'try-catch'],
    objectives: ['در پایان فایل متنی بنویسید بدون پاک کردن قبلی.', 'محتوای فایل را خط‌به‌خط بخوانید.', 'خطاهای فایل را با try/catch مدیریت کنید.'],
    blocks: [
      { type: 'h', text: 'هدف پروژه' },
      { type: 'p', text: 'برنامه‌ای که هر بار اجرا شود، یک خط گزارش به فایل log.txt اضافه می‌کند و در پایان تمام خط‌ها را نمایش می‌دهد.' },
      { type: 'h', text: 'راه‌حل' },
      { type: 'code', code: 'using System;\nusing System.IO;\n\nstring path = "log.txt";\n\ntry\n{\n    string entry = $"ورود در {DateTime.Now:yyyy-MM-dd HH:mm}";\n    File.AppendAllText(path, entry + Environment.NewLine);\n\n    string[] lines = File.ReadAllLines(path);\n    Console.WriteLine($"تعداد خط‌ها: {lines.Length}");\n    foreach (string line in lines)\n    {\n        Console.WriteLine(line);\n    }\n}\ncatch (IOException ex)\n{\n    Console.WriteLine("خطا در کار با فایل: " + ex.Message);\n}' },
      { type: 'warn', text: 'اشتباه رایج: استفاده از WriteAllText به‌جای AppendAllText وقتی می‌خواهید به پایان اضافه کنید. WriteAllText محتوای قبلی را پاک می‌کند.' },
      { type: 'h', text: 'چالش تکمیلی' },
      { type: 'p', text: 'یک گزینه اضافه کنید که خط‌های حاوی یک کلمه‌ی خاص را فیلتر و نمایش دهد (با Where و Contains).' }
    ],
    quiz: [
      { q: 'کدام متد محتوای جدید را به انتهای فایل اضافه می‌کند؟', options: ['File.WriteAllText', 'File.AppendAllText', 'File.Delete', 'File.Create'], answer: 1, explain: 'AppendAllText به انتهای فایل اضافه می‌کند و محتوای قبلی را نگه می‌دارد.' },
      { q: 'چرا ReadAllLines را در try قرار دادیم؟', options: ['برای سرعت', 'فایل ممکن است وجود نداشته باشد یا قفل باشد', 'برای رنگ', 'لازم نیست'], answer: 1, explain: 'کار با فایل ممکن است خطای ورودی/خروجی بدهد که باید مدیریت شود.' }
    ]
  };

  L['project-json'] = {
    id: 'project-json', title: 'پروژه: ذخیره و بازیابی فهرست دانش‌آموزان با JSON', level: 'متوسط',
    prereq: ['json-serialization', 'file-io', 'lambda-expressions'],
    objectives: ['فهرست شیءها را به JSON ذخیره کنید.', 'JSON را از فایل بخوانید و به شیء برگردانید.', 'داده را پیش از ذخیره کنترل کنید.'],
    blocks: [
      { type: 'h', text: 'هدف پروژه' },
      { type: 'p', text: 'فهرست دانش‌آموزان را در فایل students.json ذخیره کنید و در اجرای بعدی بازیابی کنید. این الگو برای برنامه‌های واقعی که داده‌ی ساختاری دارند بسیار رایج است.' },
      { type: 'h', text: 'راه‌حل' },
      { type: 'code', code: 'using System.IO;\nusing System.Text.Json;\nusing System.Collections.Generic;\n\nclass Student\n{\n    public string Name { get; set; }\n    public int Grade { get; set; }\n}\n\nvar students = new List<Student>\n{\n    new Student { Name = "Ali", Grade = 18 }\n};\n\nFile.WriteAllText("students.json", JsonSerializer.Serialize(students));\n\nvar loaded = JsonSerializer.Deserialize<List<Student>>(File.ReadAllText("students.json"));\nforeach (Student s in loaded)\n{\n    Console.WriteLine($"{s.Name}: {s.Grade}");\n}', output: 'Ali: 18' },
      { type: 'warn', text: 'اشتباه رایج: فراموش کردن بررسی اینکه فایل وجود دارد یا JSON معتبر است. قبل از Deserialize بررسی کنید و خطا را در try مدیریت کنید.' },
      { type: 'h', text: 'چالش تکمیلی' },
      { type: 'p', text: 'یک قابلیت افزودن دانش‌آموز اضافه کنید و بعد از هر افزودن، فایل را به‌روز کنید.' }
    ],
    quiz: [
      { q: 'برای تبدیل متن JSON به فهرست شیءها کدام متد استفاده می‌شود؟', options: ['Serialize', 'Deserialize', 'Parse', 'Compile'], answer: 1, explain: 'Deserialize متن JSON را به شیء یا فهرست شیءها تبدیل می‌کند.' },
      { q: 'قبل از Deserialize چه چیزی مهم است؟', options: ['نام پروژه', 'وجود فایل و معتبر بودن JSON', 'رنگ کنسول', 'سرعت CPU'], answer: 1, explain: 'اگر فایل نباشد یا JSON معتبر نباشد، خطا رخ می‌دهد.' }
    ]
  };

  L['project-unity-coins'] = {
    id: 'project-unity-coins', title: 'پروژه‌ی Unity: جمع‌آوری سکه با امتیاز', level: 'متوسط', theme: 'unity',
    prereq: ['unity-2d-health', 'unity-score', 'unity-2d-physics'],
    objectives: ['سکه‌ها را با Trigger جمع‌آوری کنید.', 'امتیاز را روی UI نمایش دهید.', 'یک بازی دوبعدی ساده را کامل کنید.'],
    blocks: [
      { type: 'h', text: 'هدف پروژه' },
      { type: 'p', text: 'شخصیت دوبعدی را در یک صحنه‌ی ساده حرکت دهید. با برخورد با سکه‌ها، آن‌ها ناپدید شوند و امتیاز روی صفحه افزایش یابد. این پروژه همه‌ی درس‌های 2D و UI را کنار هم می‌گذارد.' },
      { type: 'h', text: 'راه‌حل: اسکریپت سکه' },
      { type: 'code', code: 'using UnityEngine;\n\npublic class Coin : MonoBehaviour\n{\n    void OnTriggerEnter2D(Collider2D other)\n    {\n        if (other.CompareTag("Player"))\n        {\n            FindObjectOfType<ScoreManager>().AddScore(1);\n            Destroy(gameObject);\n        }\n    }\n}', output: 'با برخورد شخصیت، سکه ناپدید و امتیاز یک واحد زیاد می‌شود.' },
      { type: 'h', text: 'راه‌حل: مدیر امتیاز' },
      { type: 'code', code: 'using UnityEngine;\nusing UnityEngine.UI;\n\npublic class ScoreManager : MonoBehaviour\n{\n    public Text scoreText;\n    private int score = 0;\n\n    public void AddScore(int amount)\n    {\n        score += amount;\n        scoreText.text = "امتیاز: " + score;\n    }\n}' },
      { type: 'warn', text: 'اشتباه رایج: فراموش کردن تگ Player روی شخصیت و تگ‌نکردن مناسب. بدون تگ درست، CompareTag برخورد را تشخیص نمی‌دهد.' },
      { type: 'h', text: 'چالش تکمیلی' },
      { type: 'p', text: 'یک سکه‌ی ویژه اضافه کنید که دو امتیاز بدهد، با یک Prefab Variant از سکه‌ی اصلی.' }
    ],
    quiz: [
      { q: 'چرا سکه با Trigger و نه Collision تعریف می‌شود؟', options: ['برای سنگین‌تر شدن', 'تا شخصیت از آن عبور کند و فقط رویداد تولید شود', 'Trigger لازم نیست', 'برای صدا'], answer: 1, explain: 'Trigger اجازه‌ی عبور می‌دهد و برای جمع‌آوری مناسب است.' },
      { q: 'کدام بخش امتیاز را روی صفحه نمایش می‌دهد؟', options: ['Coin', 'ScoreManager با Text', 'Rigidbody2D', 'Camera'], answer: 1, explain: 'ScoreManager مقدار امتیاز را در متن UI به‌روز می‌کند.' }
    ]
  };
})();
