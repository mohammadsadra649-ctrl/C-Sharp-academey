// تکمیل آرایه‌ها و مجموعه‌ها: Dictionary، HashSet، مرتب‌سازی و جست‌وجو، انتخاب ساختار مناسب
// این درس‌ها به انتهای موضوع «آرایه‌ها و مجموعه‌ها» اضافه می‌شوند.
(function () {
  const coll = window.CURRICULUM.topics.find(t => t.id === 'collections');
  coll.lessons.push('dictionary', 'hashset', 'sorting-searching', 'choose-collection');

  const lessons = {
    'dictionary': {
      id: 'dictionary',
      title: 'Dictionary<TKey, TValue>: جفت کلید و مقدار',
      level: 'متوسط',
      prereq: ['list-generic', 'generics'],
      objectives: [
        'Dictionary را با کلید و مقدار تعریف کنید.',
        'با کلید مقدار بخوانید، اضافه کنید و به‌روز کنید.',
        'قبل از خواندن، وجود کلید را با ContainsKey بررسی کنید.'
      ],
      blocks: [
        { type: 'h', text: 'جست‌وجو با کلید' },
        { type: 'p', text: 'Dictionary داده‌ها را به‌صورت جفت کلید و مقدار نگه می‌دارد. به جای اندیس عددی، با کلید (مثلاً نام یک فرد) مقدار را پیدا می‌کنیم. کلیدها در یک Dictionary تکراری نمی‌شوند.' },
        { type: 'code',
          code: 'Dictionary<string, int> ages = new Dictionary<string, int>();\nages["Ali"] = 20;\nages.Add("Sara", 25);\n\nConsole.WriteLine(ages["Sara"]);\n\nif (ages.ContainsKey("Reza"))\n{\n    Console.WriteLine(ages["Reza"]);\n}\nelse\n{\n    Console.WriteLine("پیدا نشد");\n}',
          notes: {
            1: 'کلید از نوع string و مقدار از نوع int است.',
            2: 'با دستور دادن به کلید، مقدار اضافه یا به‌روز می‌شود.',
            5: 'خواندن مقدار با کلید.',
            7: 'قبل از خواندن، وجود کلید را بررسی می‌کنیم.'
          },
          output: '25\nپیدا نشد' },
        { type: 'h', text: 'پیمایش' },
        { type: 'code',
          code: 'foreach (var pair in ages)\n{\n    Console.WriteLine(pair.Key + ": " + pair.Value);\n}',
          notes: { 1: 'هر عنصر یک KeyValuePair است که Key و Value دارد.' },
          output: 'Ali: 20\nSara: 25' },
        { type: 'warn', text: 'اشتباه رایج: خواندن ages["Reza"] وقتی کلید وجود ندارد. این کار KeyNotFoundException در زمان اجرا می‌دهد؛ ابتدا ContainsKey را بررسی کنید.' }
      ],
      quiz: [
        { q: 'برای خواندن امن از Dictionary قبل از آن چه بررسی کنیم؟', options: ['Length', 'ContainsKey', 'Count', 'IndexOf'], answer: 1, explain: 'ContainsKey مشخص می‌کند کلید وجود دارد یا نه، و از خطای کلید نایافت جلوگیری می‌کند.' },
        { q: 'اگر کلیدی را دوباره با مقدار جدید نسبت دهیم چه می‌شود؟', options: ['خطا می‌دهد', 'مقدار قبلی به‌روز می‌شود', 'کلید تکراری ساخته می‌شود', 'برنامه متوقف می‌شود'], answer: 1, explain: 'با نسبت دادن به یک کلید موجود، مقدار آن به‌روز می‌شود.' }
      ]
    },

    'hashset': {
      id: 'hashset',
      title: 'HashSet<T>: مجموعه‌ی بدون تکرار',
      level: 'متوسط',
      prereq: ['dictionary'],
      objectives: [
        'HashSet را برای نگه‌داری داده‌ی بدون تکرار به کار ببرید.',
        'با Contains بررسی سریع وجود داشتن عضو انجام دهید.',
        'تفاوت HashSet با List را بگویید.'
      ],
      blocks: [
        { type: 'h', text: 'هر عنصر فقط یک بار' },
        { type: 'p', text: 'HashSet<T> مجموعه‌ای است که عناصر تکراری ندارد. هنگام افزودن عنصر تکراری، نادیده گرفته می‌شود. بررسی وجود داشتن عضو با Contains در HashSet معمولاً بسیار سریع‌تر از List است.' },
        { type: 'code',
          code: 'HashSet<int> nums = new HashSet<int> { 1, 2, 2, 3, 3, 3 };\n\nConsole.WriteLine(nums.Count);\nConsole.WriteLine(nums.Contains(2));\nnums.Add(2);\nConsole.WriteLine(nums.Count);',
          notes: {
            1: 'اعداد تکراری هنگام ساخت حذف می‌شوند.',
            3: 'Count تعداد عناصر یکتا را می‌دهد.',
            4: 'Contains بررسی می‌کند عضو وجود دارد یا نه.',
            5: 'افزودن عدد تکراری تغییری ایجاد نمی‌کند.'
          },
          output: '3\nTrue\n3' },
        { type: 'tip', text: 'اگر تکرار داده مهم است، List بهتر است. اگر یکتایی مهم است، HashSet بهترین انتخاب است.' }
      ],
      quiz: [
        { q: 'بعد از افزودن عدد 5 دو بار به یک HashSet، چند بار در آن هست؟', options: ['دو بار', 'یک بار', 'صفر بار', 'خطا'], answer: 1, explain: 'HashSet عناصر تکراری ندارد؛ پس 5 فقط یک بار ذخیره می‌شود.' },
        { q: 'برای بررسی سریع وجود یک عضو در HashSet کدام متد مناسب است؟', options: ['Sort', 'Contains', 'Reverse', 'Insert'], answer: 1, explain: 'Contains برای بررسی وجود عضو به کار می‌رود.' }
      ]
    },

    'sorting-searching': {
      id: 'sorting-searching',
      title: 'مرتب‌سازی و جست‌وجو در آرایه و List',
      level: 'متوسط',
      prereq: ['hashset', 'arrays-basics'],
      objectives: [
        'آرایه و List را با Sort مرتب کنید.',
        'با IndexOf موقعیت یک عضو را پیدا کنید.',
        'بدانید BinarySearch فقط روی داده‌ی مرتب درست کار می‌کند.'
      ],
      blocks: [
        { type: 'h', text: 'مرتب‌سازی' },
        { type: 'p', text: 'Array.Sort آرایه را به ترتیب صعودی مرتب می‌کند و List<T>.Sort همین کار را روی List انجام می‌دهد. هر دو مستقیم روی همان داده تغییر ایجاد می‌کنند.' },
        { type: 'code',
          code: 'int[] numbers = { 5, 2, 9, 1 };\nArray.Sort(numbers);\nConsole.WriteLine(string.Join(", ", numbers));\nConsole.WriteLine(Array.IndexOf(numbers, 5));',
          notes: {
            2: 'آرایه به ترتیب صعودی مرتب می‌شود: 1، 2، 5، 9.',
            4: 'IndexOf اندیس اولین عنصر 5 را برمی‌گرداند؛ در آرایه‌ی مرتب‌شده اندیس آن 2 است.'
          },
          output: '1, 2, 5, 9\n2' },
        { type: 'h', text: 'جست‌وجوی دودویی' },
        { type: 'p', text: 'Array.BinarySearch سریع‌تر است، اما فقط روی آرایه‌ی مرتب‌شده درست کار می‌کند. اگر داده مرتب نباشد، نتیجه‌ی معتبری نمی‌دهد.' },
        { type: 'warn', text: 'اشتباه رایج: استفاده از BinarySearch روی آرایه‌ی مرتب‌نشده. ابتدا Sort را اجرا کنید.' }
      ],
      quiz: [
        { q: 'بعد از Array.Sort، آرایه {3, 1, 2} چه ترتیبی دارد؟', options: ['{3, 2, 1}', '{1, 2, 3}', '{1, 3, 2}', 'تغییر نمی‌کند'], answer: 1, explain: 'Sort به ترتیب صعودی مرتب می‌کند.' },
        { q: 'BinarySearch روی چه داده‌ای درست کار می‌کند؟', options: ['هر داده‌ای', 'داده‌ی مرتب‌شده', 'فقط متن', 'فقط Dictionary'], answer: 1, explain: 'جست‌وجوی دودویی به مرتب بودن داده نیاز دارد.' }
      ]
    },

    'choose-collection': {
      id: 'choose-collection',
      title: 'انتخاب ساختار داده‌ی مناسب',
      level: 'متوسط',
      prereq: ['sorting-searching'],
      objectives: [
        'بر اساس نیاز مسئله، ساختار داده‌ی مناسب را انتخاب کنید.',
        'مزایا و محدودیت هر ساختار را مقایسه کنید.',
        'بدانید انتخاب درست چه تأثیری بر سرعت و خوانایی دارد.'
      ],
      blocks: [
        { type: 'h', text: 'سؤال درست را بپرسید' },
        { type: 'p', text: 'قبل از انتخاب ساختار داده، سه سؤال بپرسید: آیا ترتیب مهم است؟ آیا تکرار مجاز است؟ آیا باید با کلید به داده برسم؟ پاسخ‌ها مسیر را روشن می‌کنند.' },
        { type: 'list', items: [
          'آرایه: اندازه‌ی ثابت و دسترسی با اندیس، برای داده‌های معلوم.',
          'List<T>: اندازه‌ی متغیر و ترتیب حفظ‌شده، برای فهرست‌های عمومی.',
          'Dictionary: دسترسی سریع با کلید، برای جست‌وجو بر اساس شناسه یا نام.',
          'HashSet: داده‌ی یکتا و بررسی سریع وجود، برای حذف تکرار یا عضویت.'
        ]},
        { type: 'tip', text: 'مثال: برای شمارش تعداد هر کلمه در متن، Dictionary<string, int> مناسب است. برای پیدا کردن کلمات یکتا، HashSet<string>.' }
      ],
      quiz: [
        { q: 'برای جست‌وجوی سریع نمره‌ی دانش‌آموز بر اساس نام، کدام مناسب‌تر است؟', options: ['آرایه', 'Dictionary<string, int>', 'HashSet<int>', 'List بدون کلید'], answer: 1, explain: 'Dictionary با کلید نام، دسترسی مستقیم به نمره را می‌دهد.' },
        { q: 'برای حذف شماره‌های تکراری از یک فهرست کدام مناسب است؟', options: ['HashSet<int>', 'int[] بدون تغییر', 'Dictionary<int,int>', 'string'], answer: 0, explain: 'HashSet فقط عناصر یکتا نگه می‌دارد و تکرار را خودکار حذف می‌کند.' }
      ]
    }
  };

  Object.assign(window.CURRICULUM.lessons, lessons);
})();
