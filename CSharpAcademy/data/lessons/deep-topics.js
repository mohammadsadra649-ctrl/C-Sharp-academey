// درس‌های عمیق‌تر برای مباحثی که قبلاً در حد مقدماتی بودند
(function () {
  const L = window.CURRICULUM.lessons;
  const T = id => window.CURRICULUM.topics.find(t => t.id === id);
  T('advanced-2').lessons.push('file-large-streams');
  T('game-systems').lessons.push('state-pattern-advanced');
  T('unity').lessons.push('unity-3d-optimization');

  L['file-large-streams'] = {
    id: 'file-large-streams', title: 'کار با فایل‌های بزرگ با Stream', level: 'پیشرفته',
    prereq: ['file-io', 'idisposable-using'],
    objectives: ['فایل را خط‌به‌خط با StreamReader بخوانید.', 'با StreamWriter داده را به‌صورت تدریجی بنویسید.', 'بفهمید چرا بارگذاری کل فایل در حافظه خطرناک است.'],
    blocks: [
      { type: 'h', text: 'چرا کل فایل را یک‌جا نخوانیم؟' },
      { type: 'p', text: 'ReadAllText کل فایل را در حافظه می‌آورد. برای فایل چند گیگابایتی این کار برنامه را کند یا خراب می‌کند. Stream داده را قطعه‌قطعه می‌خواند و حافظه‌ی کمی مصرف می‌کند.' },
      { type: 'code', code: 'using System.IO;\n\nint count = 0;\nusing (var reader = new StreamReader("big.txt"))\n{\n    while (!reader.EndOfStream)\n    {\n        string line = reader.ReadLine();\n        if (line.Contains("C#")) count++;\n    }\n}\nConsole.WriteLine(count);', output: 'تعداد خط‌های شامل C#' },
      { type: 'h', text: 'نوشتن تدریجی' },
      { type: 'code', code: 'using (var writer = new StreamWriter("out.txt", append: false))\n{\n    for (int i = 1; i <= 3; i++)\n    {\n        writer.WriteLine("خط " + i);\n    }\n}', output: 'فایل out.txt با سه خط ساخته می‌شود.' },
      { type: 'warn', text: 'اشتباه رایج: فراموش کردن using یا Dispose. فایل تا آزاد نشود قفل می‌ماند و ممکن است داده‌ها کامل ذخیره نشوند.' },
      { type: 'tip', text: 'برای فایل‌های بسیار بزرگ، پردازش را روی هر خط انجام دهید و نتیجه‌ی میانی را نگه دارید، نه کل محتوا را.' }
    ],
    quiz: [
      { q: 'مزیت اصلی Stream نسبت به ReadAllText چیست؟', options: ['سریع‌تر برای فایل کوچک', 'مصرف کم حافظه برای فایل بزرگ', 'نیاز به using ندارد', 'فقط برای JSON است'], answer: 1, explain: 'Stream داده را قطعه‌قطعه می‌خواند و کل فایل را در حافظه نمی‌آورد.' },
      { q: 'چرا باید StreamWriter را با using بنویسیم؟', options: ['برای رنگ', 'تا منبع آزاد و داده کامل ذخیره شود', 'برای سرعت', 'لازم نیست'], answer: 1, explain: 'Dispose داده‌ی باقیمانده را می‌نویسد و فایل را آزاد می‌کند.' }
    ]
  };

  L['state-pattern-advanced'] = {
    id: 'state-pattern-advanced', title: 'الگوی وضعیت (State Pattern) پیشرفته', level: 'پیشرفته',
    prereq: ['game-state-machine', 'interfaces', 'polymorphism'],
    objectives: ['هر وضعیت را یک کلاس مستقل بنویسید.', 'انتقال بین وضعیت‌ها را از یک جا کنترل کنید.', 'بفهمید چرا این الگو برای رفتارهای پیچیده بهتر از switch است.'],
    blocks: [
      { type: 'h', text: 'هر وضعیت، رفتار خودش را دارد' },
      { type: 'p', text: 'وقتی تعداد وضعیت‌ها زیاد می‌شود، switch طولانی و سخت‌نگه‌داری می‌شود. در الگوی وضعیت، هر وضعیت یک کلاس است که رابط مشترک IState را پیاده می‌کند، و یک کنترلر فقط وضعیت فعلی را اجرا و تغییر می‌دهد.' },
      { type: 'code', code: 'interface IState\n{\n    void Enter();\n    void Update(Machine m);\n}\n\nclass Patrol : IState\n{\n    public void Enter() => Console.WriteLine("گشت");\n    public void Update(Machine m) { m.Set(new Chase()); }\n}\n\nclass Chase : IState\n{\n    public void Enter() => Console.WriteLine("تعقیب");\n    public void Update(Machine m) { }\n}\n\nclass Machine\n{\n    private IState current;\n    public void Set(IState s) { current = s; current.Enter(); }\n    public void Tick() { current?.Update(this); }\n}\n\nvar m = new Machine();\nm.Set(new Patrol());\nm.Tick();', output: 'گشت\nتعقیب' },
      { type: 'tip', text: 'در Unity، هر دشمن می‌تواند یک Machine داشته باشد و هر وضعیت را در Update همان دشمن اجرا کند.' },
      { type: 'warn', text: 'اشتباه رایج: وضعیت‌ها خودشان همه‌ی دیگر وضعیت‌ها را مستقیم عوض کنند. این کار وابستگی زیاد ایجاد می‌کند؛ انتقال را به کنترلر بسپارید.' }
    ],
    quiz: [
      { q: 'در الگوی وضعیت، هر وضعیت چگونه نوشته می‌شود؟', options: ['یک عدد در enum', 'یک کلاس که رابط IState را پیاده می‌کند', 'یک متغیر static', 'یک فایل JSON'], answer: 1, explain: 'هر وضعیت کلاسی مستقل با رفتار خودش است.' },
      { q: 'انتقال بین وضعیت‌ها را بهتر است کجا کنترل کنیم؟', options: ['در هر وضعیت به‌طور جداگانه', 'در کنترلر (Machine)', 'در Console', 'در فایل ذخیره'], answer: 1, explain: 'کنترلر یک نقطه‌ی مرکزی برای انتقال است و وابستگی‌ها را کم می‌کند.' }
    ]
  };

  L['unity-3d-optimization'] = {
    id: 'unity-3d-optimization', title: 'بهینه‌سازی عملکرد سه‌بعدی', level: 'پیشرفته', theme: 'unity',
    prereq: ['unity-optimization', 'unity-3d-lighting'],
    objectives: ['Draw Call را بشناسید و کاهش دهید.', 'Static Batching و متریال مشترک را به کار ببرید.', 'از LOD و Occlusion Culling برای صحنه‌های بزرگ استفاده کنید.'],
    blocks: [
      { type: 'h', text: 'هزینه‌ی رندر کجاست؟' },
      { type: 'list', items: [
        'Draw Call: هر بار که Unity یک شیء را به کارت گرافیک می‌فرستد. تعداد زیاد آن صحنه را کند می‌کند.',
        'Static Batching: اشیای ثابت با متریال مشترک را یکجا رندر می‌کند؛ گزینه‌ی Static را در Inspector فعال کنید.',
        'LOD Group: مدل جزئیات کمتری برای فاصله‌های دور دارد.',
        'Occlusion Culling: اشیایی که پشت دیوار هستند رندر نمی‌شوند؛ باید در Window > Rendering > Occlusion Culling پخت شود.',
        'نورهای Realtime کم: هر نور هزینه دارد؛ بیشتر نورها را Baked کنید.'
      ]},
      { type: 'code', code: 'using UnityEngine;\n\npublic class DistantHide : MonoBehaviour\n{\n    public Transform player;\n    public float hideDistance = 80f;\n\n    void Update()\n    {\n        // اشیای خیلی دور را غیرفعال می‌کنیم تا رندر نشوند\n        bool visible = Vector3.Distance(transform.position, player.position) < hideDistance;\n        if (gameObject.activeSelf != visible) gameObject.SetActive(visible);\n    }\n}', output: 'اشیای دور از دید خارج و هزینه‌ی رندر کم می‌شود.' },
      { type: 'warn', text: 'اشتباه رایج: بهینه‌سازی بدون Profiler. ابتدا گلوگاه را پیدا کنید، سپس تغییر دهید و دوباره اندازه بگیرید.' },
      { type: 'tip', text: 'در کد Update، فعال و غیرفعال کردن مکرر اشیا هزینه دارد؛ برای این کار بهتر است فاصله را هر چند فریم یک‌بار بررسی کنید.' }
    ],
    quiz: [
      { q: 'Draw Call چیست؟', options: ['فایل صوتی', 'ارسال یک شیء برای رندر به کارت گرافیک', 'نوع نور', 'تگ شیء'], answer: 1, explain: 'تعداد زیاد Draw Call صحنه را کند می‌کند.' },
      { q: 'Static Batching برای کدام اشیا مناسب است؟', options: ['اشیای متحرک', 'اشیای ثابت با متریال مشترک', 'فقط دوربین', 'صداها'], answer: 1, explain: 'اشیای ثابت با متریال مشترک را Unity یکجا رندر می‌کند.' }
    ]
  };
})();
