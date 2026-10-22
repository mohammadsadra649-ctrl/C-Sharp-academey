// ادامه‌ی OOP: ارث‌بری، چندریختی، کلاس انتزاعی، Interface، ترکیب و static
// این درس‌ها به انتهای موضوع «برنامه‌نویسی شیءگرا» اضافه می‌شوند.
(function () {
  const oop = window.CURRICULUM.topics.find(t => t.id === 'oop');
  oop.lessons.push('inheritance', 'polymorphism', 'abstract-class', 'interfaces', 'composition', 'static-members');

  const lessons = {
    'inheritance': {
      id: 'inheritance',
      title: 'ارث‌بری (Inheritance)',
      level: 'متوسط',
      prereq: ['encapsulation', 'methods-constructors'],
      objectives: [
        'ارث‌بری را با علامت دو نقطه (:) بنویسید.',
        'بفهمید کلاس فرزند چه اعضایی را از والد به ارث می‌برد.',
        'از کد تکراری با ارث‌بری جلوگیری کنید.'
      ],
      blocks: [
        { type: 'h', text: 'کلاس فرزند داده و رفتار والد را دارد' },
        { type: 'p', text: 'ارث‌بری اجازه می‌دهد یک کلاس (فرزند) تمام اعضای کلاس دیگر (والد) را به دست آورد و خودش ویژگی‌های جدید اضافه کند. این کار کد تکراری را کم می‌کند و رابطه‌ی «است یک» (is-a) را مدل‌سازی می‌کند؛ مثلاً سگ یک حیوان است.' },
        { type: 'code',
          code: 'class Animal\n{\n    public string Name;\n    public void Eat()\n    {\n        Console.WriteLine(Name + " می‌خورد");\n    }\n}\n\nclass Dog : Animal\n{\n    public void Bark()\n    {\n        Console.WriteLine("واق واق");\n    }\n}\n\nDog d = new Dog();\nd.Name = "Rex";\nd.Eat();\nd.Bark();',
          notes: {
            10: 'Dog از Animal ارث می‌برد؛ یعنی Name و Eat را دارد.',
            20: 'Eat متعلق به Animal است، ولی روی شیء Dog قابل فراخوانی است.',
            21: 'Bark فقط در Dog تعریف شده است.'
          },
          output: 'Rex می‌خورد\nواق واق' },
        { type: 'warn', text: 'اشتباه رایج: استفاده از ارث‌بری فقط برای اشتراک کد، حتی وقتی رابطه‌ی است-یک وجود ندارد. مثلاً Car نباید از Engine ارث ببرد؛ ماشین یک موتور دارد (ترکیب، نه ارث‌بری).' },
        { type: 'tip', text: 'کلاس C# فقط از یک کلاس ارث می‌برد، اما می‌تواند چند Interface را پیاده‌سازی کند.' }
      ],
      quiz: [
        { q: 'کدام نشان‌دهنده‌ی ارث‌بری در C# است؟', options: ['=', ':', '::', '->'], answer: 1, explain: 'class Dog : Animal یعنی Dog از Animal ارث می‌برد.' },
        { q: 'کلاس Dog از Animal ارث برده. کدام متد در Dog در دسترس است؟', options: ['فقط Bark', 'فقط Eat', 'Eat و Bark', 'هیچ‌کدام'], answer: 2, explain: 'Dog هم متدهای ارث‌برده (Eat) و هم متد خودش (Bark) را دارد.' }
      ]
    },

    'polymorphism': {
      id: 'polymorphism',
      title: 'چندریختی (Polymorphism) با virtual و override',
      level: 'متوسط',
      prereq: ['inheritance'],
      objectives: [
        'متد virtual را در والد و override را در فرزند بنویسید.',
        'با یک نوع والد، شیءهای مختلف را یکسان مدیریت کنید.',
        'بفهمید انتخاب نسخه‌ی متد هنگام اجرا انجام می‌شود.'
      ],
      blocks: [
        { type: 'h', text: 'یک فراخوانی، رفتارهای متفاوت' },
        { type: 'p', text: 'چندریختی یعنی یک نوع پایه بتواند شیءهای مختلف را نگه دارد و هر کدام رفتار خودش را نشان دهند. برای این کار متد والد را virtual و در فرزند آن را override می‌کنیم.' },
        { type: 'code',
          code: 'class Shape\n{\n    public virtual double Area() { return 0; }\n}\n\nclass Circle : Shape\n{\n    public double R;\n    public override double Area() { return 3.14 * R * R; }\n}\n\nclass Square : Shape\n{\n    public double S;\n    public override double Area() { return S * S; }\n}\n\nShape[] shapes = { new Circle { R = 2 }, new Square { S = 3 } };\nforeach (Shape s in shapes)\n{\n    Console.WriteLine(s.Area());\n}',
          notes: {
            3: 'virtual یعنی این متد در فرزندان قابل بازتعریف است.',
            9: 'override نسخه‌ی جدید متد والد را برای Circle می‌نویسد.',
            19: 'اگرچه متغیر از نوع Shape است، اجرا نسخه‌ی واقعی شیء را فراخوانی می‌کند.'
          },
          output: '12.56\n9' },
        { type: 'warn', text: 'اشتباه رایج: نوشتن متد با همان نام در فرزند بدون override. در این صورت متد پنهان (hide) می‌شود و چندریختی کار نمی‌کند؛ کامپایلر هشدار می‌دهد.' }
      ],
      quiz: [
        { q: 'برای بازتعریف متد والد در فرزند چه کلمه‌ای لازم است؟', options: ['new', 'override', 'static', 'base'], answer: 1, explain: 'override نسخه‌ی جدید متد virtual والد را می‌سازد.' },
        { q: 'اگر Shape s = new Circle(); و s.Area() را صدا بزنیم، کدام نسخه اجرا می‌شود؟', options: ['نسخه‌ی Shape', 'نسخه‌ی Circle', 'هر دو', 'خطا'], answer: 1, explain: 'با virtual و override، نسخه‌ی شیء واقعی (Circle) اجرا می‌شود.' }
      ]
    },

    'abstract-class': {
      id: 'abstract-class',
      title: 'کلاس انتزاعی (Abstract Class)',
      level: 'متوسط',
      prereq: ['polymorphism'],
      objectives: [
        'کلاس انتزاعی را تعریف کنید و بفهمید نمی‌توان از آن شیء ساخت.',
        'متد abstract بنویسید که فرزندان باید پیاده‌سازی کنند.',
        'کلاس انتزاعی را برای قالب مشترک بین کلاس‌های مرتبط به کار ببرید.'
      ],
      blocks: [
        { type: 'h', text: 'قالب ناقص که فرزندان کامل می‌کنند' },
        { type: 'p', text: 'کلاس abstract قالبی است که نمی‌توان مستقیم از آن شیء ساخت. می‌تواند متدهای کامل و متدهای abstract (بدون بدنه) داشته باشد. هر فرزند موظف است متدهای abstract را پیاده‌سازی کند.' },
        { type: 'code',
          code: 'abstract class Employee\n{\n    public string Name;\n    public abstract double Salary();\n    public void Show()\n    {\n        Console.WriteLine(Name + ": " + Salary());\n    }\n}\n\nclass Developer : Employee\n{\n    public override double Salary() { return 5000; }\n}\n\nDeveloper d = new Developer { Name = "Sara" };\nd.Show();',
          notes: {
            1: 'abstract یعنی این کلاس فقط برای ارث‌بری است.',
            4: 'Salary بدنه ندارد؛ هر فرزند باید آن را بنویسد.',
            17: 'Show از Salary استفاده می‌کند و نسخه‌ی Developer را فراخوانی می‌کند.'
          },
          output: 'Sara: 5000' },
        { type: 'warn', text: 'اشتباه رایج: تلاش برای new Employee(). کلاس abstract را نمی‌توان مستقیم ساخت؛ کامپایلر خطا می‌دهد.' }
      ],
      quiz: [
        { q: 'کدام کار با کلاس abstract مجاز است؟', options: ['new AbstractClass()', 'ارث‌بری از آن', 'حذف آن از پروژه', 'تغییر نام آن در زمان اجرا'], answer: 1, explain: 'کلاس abstract را نمی‌توان نمونه‌سازی کرد، اما می‌توان از آن ارث برد.' },
        { q: 'متد abstract در فرزند چه کاری باید انجام شود؟', options: ['حذف شود', 'پیاده‌سازی (override) شود', 'static شود', 'نادیده گرفته شود'], answer: 1, explain: 'فرزند باید متد abstract را با override کامل کند.' }
      ]
    },

    'interfaces': {
      id: 'interfaces',
      title: 'رابط‌ها (Interfaces)',
      level: 'متوسط',
      prereq: ['abstract-class'],
      objectives: [
        'Interface را تعریف کنید و قرارداد بودن آن را توضیح دهید.',
        'یک کلاس را به یک Interface متعهد کنید.',
        'تفاوت Interface و کلاس انتزاعی را بگویید.'
      ],
      blocks: [
        { type: 'h', text: 'قرارداد بدون پیاده‌سازی' },
        { type: 'p', text: 'Interface فقط امضای متدها را تعریف می‌کند و پیاده‌سازی ندارد. هر کلاسی که آن را می‌پذیرد باید همه‌ی آن متدها را داشته باشد. نام Interface معمولاً با I شروع می‌شود، مثل IPrintable.' },
        { type: 'code',
          code: 'interface IPrintable\n{\n    void Print();\n}\n\nclass Report : IPrintable\n{\n    public void Print()\n    {\n        Console.WriteLine("گزارش ماهانه");\n    }\n}\n\nIPrintable item = new Report();\nitem.Print();',
          notes: {
            1: 'Interface فقط قرارداد را تعریف می‌کند؛ بدنه ندارد.',
            6: 'کلاس Report قرارداد IPrintable را می‌پذیرد با : IPrintable.',
            15: 'متغیر از نوع Interface است ولی شیء Report را نگه می‌دارد.'
          },
          output: 'گزارش ماهانه' },
        { type: 'h', text: 'چرا Interface؟' },
        { type: 'p', text: 'کلاس C# فقط یک والد دارد، اما می‌تواند چند Interface را پیاده‌سازی کند. این کار انعطاف بیشتری نسبت به ارث‌بری می‌دهد.' },
        { type: 'warn', text: 'اشتباه رایج: فراموش کردن پیاده‌سازی یک متد Interface در کلاس. کامپایلر خطا می‌دهد تا قرارداد رعایت شود.' }
      ],
      quiz: [
        { q: 'Interface چه چیزی را تعریف می‌کند؟', options: ['پیاده‌سازی کامل متدها', 'قرارداد یا امضای متدها', 'فیلدهای خصوصی', 'شیء آماده'], answer: 1, explain: 'Interface امضای متدها را تعریف می‌کند و پیاده‌سازی را به کلاس‌ها می‌سپارد.' },
        { q: 'یک کلاس در C# چند Interface می‌تواند پیاده‌سازی کند؟', options: ['فقط یکی', 'حداکثر دو', 'چند تا', 'هیچ‌کدام'], answer: 2, explain: 'کلاس می‌تواند چندین Interface را پیاده‌سازی کند، اما فقط از یک کلاس ارث ببرد.' }
      ]
    },

    'composition': {
      id: 'composition',
      title: 'ترکیب اشیا (Composition)',
      level: 'متوسط',
      prereq: ['interfaces', 'encapsulation'],
      objectives: [
        'ترکیب را به‌عنوان «دارد-یک» توضیح دهید.',
        'یک شیء را از اشیای کوچک‌تر بسازید.',
        'تشخیص دهید کدام را باید ارث‌بری و کدام را ترکیب کرد.'
      ],
      blocks: [
        { type: 'h', text: 'دارد-یک، نه است-یک' },
        { type: 'p', text: 'در ترکیب، یک کلاس به جای ارث‌بری از کلاس دیگر، شیئی از آن را به‌عنوان فیلد نگه می‌دارد. ماشین یک موتور دارد؛ پس Car شامل Engine است و از آن ارث نمی‌برد.' },
        { type: 'code',
          code: 'class Engine\n{\n    public int Power = 150;\n}\n\nclass Car\n{\n    private Engine engine = new Engine();\n    public int Power => engine.Power;\n}\n\nCar c = new Car();\nConsole.WriteLine(c.Power);',
          notes: {
            8: 'Car یک Engine را در خود دارد؛ این ترکیب است.',
            9: 'قدرت را از موتور داخلی می‌خوانیم و بیرون می‌دهیم.'
          },
          output: '150' },
        { type: 'tip', text: 'ترکیب معمولاً انعطاف بیشتری دارد؛ می‌توانید موتور را بعداً تغییر دهید بدون اینکه ساختار Car عوض شود.' }
      ],
      quiz: [
        { q: 'ماشین یک موتور دارد. کدام رابطه درست است؟', options: ['Car از Engine ارث ببرد', 'Car شامل Engine باشد (ترکیب)', 'Engine از Car ارث ببرد', 'هیچ رابطه‌ای نیاز نیست'], answer: 1, explain: 'این رابطه‌ی دارد-یک است و با ترکیب مدل می‌شود.' },
        { q: 'مزیت ترکیب نسبت به ارث‌بری در چیست؟', options: ['سریع‌تر اجرا می‌شود', 'وابستگی کمتر و تغییرپذیری بیشتر', 'نیاز به کلاس ندارد', 'فقط با int کار می‌کند'], answer: 1, explain: 'ترکیب وابستگی‌ها را کم می‌کند و تغییر اجزا را آسان‌تر می‌سازد.' }
      ]
    },

    'static-members': {
      id: 'static-members',
      title: 'اعضای static',
      level: 'متوسط',
      prereq: ['composition'],
      objectives: [
        'تفاوت عضو static و عضو نمونه (instance) را بگویید.',
        'یک شمارنده‌ی مشترک بین همه‌ی شیءها بسازید.',
        'بدانید متد static نمی‌تواند به this یا فیلد نمونه دسترسی داشته باشد.'
      ],
      blocks: [
        { type: 'h', text: 'مال کلاس، نه مال شیء' },
        { type: 'p', text: 'عضو static متعلق به خود کلاس است و بین همه‌ی شیءها مشترک است. عضو نمونه (بدون static) برای هر شیء جداگانه وجود دارد. عضو static را با نام کلاس صدا می‌زنیم، نه با نام شیء.' },
        { type: 'code',
          code: 'class Counter\n{\n    public static int Count = 0;\n\n    public Counter()\n    {\n        Count++;\n    }\n}\n\nnew Counter();\nnew Counter();\nConsole.WriteLine(Counter.Count);',
          notes: {
            2: 'Count مشترک بین همه‌ی Counterها است.',
            7: 'هر ساخت شیء یک واحد به Count اضافه می‌کند.',
            13: 'دسترسی با نام کلاس انجام می‌شود.'
          },
          output: '2' },
        { type: 'warn', text: 'اشتباه رایج: استفاده از this در متد static یا دسترسی به فیلد نمونه از داخل آن. متد static فقط به اعضای static دسترسی دارد.' },
        { type: 'tip', text: 'کلاس Program در پروژه‌های کنسول که Main دارد static است؛ به همین دلیل متدهای ساده‌ی کنار آن هم اغلب static اعلام می‌شوند.' }
      ],
      quiz: [
        { q: 'عضو static چگونه صدا زده می‌شود؟', options: ['با نام شیء', 'با نام کلاس', 'فقط در سازنده', 'با this'], answer: 1, explain: 'عضو static متعلق به کلاس است و با نام کلاس دسترسی پیدا می‌کنیم.' },
        { q: 'بعد از ساخت سه شیء از Counter که سازنده‌اش Count++ دارد، مقدار Counter.Count چیست؟', options: ['1', '3', '0', 'هر شیء جدا'], answer: 1, explain: 'Count مشترک است و هر سه ساخت یک واحد اضافه می‌کنند؛ پس 3.' }
      ]
    }
  };

  Object.assign(window.CURRICULUM.lessons, lessons);
})();
