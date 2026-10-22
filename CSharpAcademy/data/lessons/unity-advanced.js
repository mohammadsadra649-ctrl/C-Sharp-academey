// تکمیل مسیر Unity (2019.4 و C# 7.3): مبانی پروژه، چرخه‌ی کامل، بردارها، رویداد، صدا، هوش مصنوعی، فیزیک و انیمیشن سه‌بعدی، UI و Coroutine
(function () {
  const unity = window.CURRICULUM.topics.find(t => t.id === 'unity');
  const ids = [
    'unity-setup', 'unity-project-structure', 'unity-script-communication',
    'unity-lifecycle-full', 'unity-vectors', 'unity-events-unityevent',
    'unity-coroutines', 'unity-audio', 'unity-enemy-ai',
    'unity-3d-physics', 'unity-3d-animation', 'unity-ui-menu'
  ];
  unity.lessons.push(...ids);
  const L = window.CURRICULUM.lessons;
  const base = { theme: 'unity', level: 'متوسط' };
  const add = (o) => { L[o.id] = Object.assign({}, base, o); };

  add({ id: 'unity-setup', title: 'نصب و تنظیم محیط Unity 2019.4', level: 'مبتدی', prereq: ['what-is-csharp'],
    objectives: ['Unity Hub را نصب کنید.', 'نسخه‌ی 2019.4 LTS را اضافه کنید.', 'یک پروژه‌ی 2D یا 3D بسازید.'],
    blocks: [
      { type: 'h', text: 'از کجا شروع کنیم؟' },
      { type: 'list', items: [
        'Unity Hub را از سایت Unity نصب کنید و با حساب کاربری وارد شوید.',
        'در بخش Installs، نسخه‌ی 2019.4 LTS را با ماژول Visual Studio یا VS Code اضافه کنید.',
        'در بخش Projects، New Project را بزنید و قالب 2D یا 3D را انتخاب کنید.',
        'پس از ساخت پروژه، پنجره‌های Scene، Game، Hierarchy، Inspector و Project را بررسی کنید.'
      ]},
      { type: 'warn', text: 'نسخه‌های جدیدتر Unity ممکن است API ها و ظاهر ادیتور را تغییر داده باشند. برای همراهی با این دوره، حتماً 2019.4 را انتخاب کنید.' },
      { type: 'tip', text: 'برای ویرایش کد، Visual Studio را در تنظیمات Unity (Preferences > External Tools) انتخاب کنید تا IntelliSense کار کند.' }
    ],
    quiz: [
      { q: 'کدام ابزار نسخه‌های Unity را مدیریت می‌کند؟', options: ['Unity Hub', 'Visual Studio Code', 'Git', 'Photoshop'], answer: 0, explain: 'Unity Hub نصب و مدیریت نسخه‌ها و پروژه‌ها را انجام می‌دهد.' },
      { q: 'برای همراهی با این دوره کدام نسخه انتخاب می‌شود؟', options: ['2019.4 LTS', '2023', '6000', 'هر نسخه‌ای'], answer: 0, explain: 'این دوره با Unity 2019.4 LTS و C# 7.3 نوشته شده است.' }
    ]
  });

  add({ id: 'unity-project-structure', title: 'ساختار پوشه‌های پروژه (Assets)', level: 'مبتدی', prereq: ['unity-setup'],
    objectives: ['پوشه‌های اصلی Assets را بشناسید.', 'بدانید Scene و Prefab کجا ذخیره می‌شوند.', 'یک ساختار مرتب برای پروژه بسازید.'],
    blocks: [
      { type: 'h', text: 'مرتب نگه داشتن پروژه' },
      { type: 'list', items: [
        'Assets/Scenes: فایل‌های صحنه (مثل Menu و Level1)',
        'Assets/Scripts: اسکریپت‌های C#',
        'Assets/Prefabs: الگوهای قابل تکرار مثل دشمن و سکه',
        'Assets/Sprites یا Assets/Models: تصاویر یا مدل‌های سه‌بعدی',
        'Assets/Audio: صدا و موسیقی',
        'Assets/Materials: متریال‌ها برای مدل‌های سه‌بعدی'
      ]},
      { type: 'warn', text: 'فایل‌ها را داخل Explorer سیستم جابه‌جا نکنید؛ از پنجره‌ی Project در Unity استفاده کنید تا ارجاع‌ها (.meta) حفظ شوند.' },
      { type: 'tip', text: 'فایل‌های .meta را هرگز حذف نکنید؛ Unity شناسه‌ی هر فایل را در آن‌ها نگه می‌دارد.' }
    ],
    quiz: [
      { q: 'الگوهای قابل تکرار مثل دشمن معمولاً در کدام پوشه قرار می‌گیرند؟', options: ['Scenes', 'Prefabs', 'Audio', 'Materials'], answer: 1, explain: 'Prefab الگوی قابل نمونه‌سازی است.' },
      { q: 'چرا نباید فایل‌های .meta را حذف کرد؟', options: ['حجم زیادی دارند', 'Unity شناسه‌ی فایل‌ها را در آن‌ها نگه می‌دارد', 'فقط برای 3D هستند', 'کامنت دارند'], answer: 1, explain: 'فایل meta شناسه و تنظیمات وارد کردن فایل را نگه می‌دارد.' }
    ]
  });

  add({ id: 'unity-script-communication', title: 'ارتباط بین اسکریپت‌ها', level: 'متوسط', prereq: ['unity-project-structure', 'unity-lifecycle'],
    objectives: ['یک اسکریپت را از اسکریپت دیگر با GetComponent پیدا کنید.', 'با فیلد public مرجع را در Inspector وصل کنید.', 'بفهمید چرا SendMessage را باید کم استفاده کرد.'],
    blocks: [
      { type: 'h', text: 'سه راه برای ارتباط' },
      { type: 'list', items: [
        'GetComponent: گرفتن کامپوننت روی همان GameObject',
        'فیلد public: وصل کردن دستی یک شیء در Inspector',
        'FindObjectOfType: پیدا کردن اولین نمونه در صحنه (برای موارد ساده)'
      ]},
      { type: 'code', code: 'using UnityEngine;\n\npublic class Attack : MonoBehaviour\n{\n    public PlayerHealth target;\n\n    public void Hit(int damage)\n    {\n        target.TakeDamage(damage);\n    }\n}', output: 'target در Inspector به شیء بازیکن وصل می‌شود.' },
      { type: 'warn', text: 'اشتباه رایج: استفاده‌ی زیاد از SendMessage یا FindObjectOfType در Update. این روش‌ها کندند و وابستگی‌های پنهان ایجاد می‌کنند.' }
    ],
    quiz: [
      { q: 'کدام روش برای وصل کردن دستی یک شیء به اسکریپت مناسب‌تر است؟', options: ['SendMessage', 'فیلد public در Inspector', 'Update', 'Debug.Log'], answer: 1, explain: 'فیلد public با درگ و دراپ در Inspector وصل می‌شود.' },
      { q: 'مشکل استفاده‌ی زیاد از FindObjectOfType در Update چیست؟', options: ['خطای کامپایل', 'کند شدن بازی', 'حذف صحنه', 'ساخت Prefab'], answer: 1, explain: 'جستجو در هر فریم هزینه‌ی زیادی دارد.' }
    ]
  });

  add({ id: 'unity-lifecycle-full', title: 'چرخه‌ی کامل: Awake، OnEnable، Start، FixedUpdate', level: 'متوسط', prereq: ['unity-lifecycle'],
    objectives: ['ترتیب Awake، OnEnable و Start را بدانید.', 'تفاوت Update و FixedUpdate را توضیح دهید.', 'OnDisable و OnDestroy را بشناسید.'],
    blocks: [
      { type: 'h', text: 'ترتیب اجرا' },
      { type: 'list', items: [
        'Awake: یک بار، هنگام ساخته شدن شیء (قبل از Start)',
        'OnEnable: هر بار که شیء فعال می‌شود',
        'Start: یک بار، قبل از اولین فریم',
        'FixedUpdate: در زمان‌های ثابت فیزیکی',
        'Update: هر فریم؛ LateUpdate: بعد از همه‌ی Updateها',
        'OnDisable و OnDestroy: هنگام غیرفعال شدن یا حذف شیء'
      ]},
      { type: 'code', code: 'using UnityEngine;\n\npublic class Lifecycle : MonoBehaviour\n{\n    void Awake() { Debug.Log("Awake"); }\n    void OnEnable() { Debug.Log("OnEnable"); }\n    void Start() { Debug.Log("Start"); }\n}', output: 'Awake\nOnEnable\nStart' },
      { type: 'warn', text: 'اشتباه رایج: فرض کردن ترتیب بین اشیای مختلف. ترتیب فقط برای یک اسکریپت روی یک شیء تضمین دارد؛ بین اشیای مختلف نباید به آن تکیه کنید.' }
    ],
    quiz: [
      { q: 'کدام متد زودتر از همه اجرا می‌شود؟', options: ['Start', 'Update', 'Awake', 'FixedUpdate'], answer: 2, explain: 'Awake قبل از Start و قبل از اولین فریم اجرا می‌شود.' },
      { q: 'برای کد فیزیکی و نیرو دادن به Rigidbody کدام مناسب‌تر است؟', options: ['Update', 'FixedUpdate', 'Awake', 'OnDestroy'], answer: 1, explain: 'FixedUpdate با گام ثابت فیزیکی اجرا می‌شود.' }
    ]
  });

  add({ id: 'unity-vectors', title: 'Vector2 و Vector3: محاسبات پایه', level: 'متوسط', prereq: ['unity-movement'],
    objectives: ['فاصله‌ی دو نقطه را با Distance بگیرید.', 'بردار جهت را با normalized بسازید.', 'با Lerp بین دو مقدار حرکت نرم انجام دهید.'],
    blocks: [
      { type: 'h', text: 'بردار یعنی جهت و اندازه' },
      { type: 'code', code: 'using UnityEngine;\n\nVector3 a = new Vector3(0, 0, 0);\nVector3 b = new Vector3(3, 4, 0);\n\nfloat dist = Vector3.Distance(a, b);\nVector3 dir = (b - a).normalized;\nVector3 mid = Vector3.Lerp(a, b, 0.5f);\n\nDebug.Log(dist);\nDebug.Log(mid);', output: '5\n(1.5, 2.0, 0.0)' },
      { type: 'tip', text: 'normalized اندازه‌ی بردار را 1 می‌کند و فقط جهت را نگه می‌دارد؛ برای حرکت با سرعت ثابت مفید است.' },
      { type: 'warn', text: 'اشتباه رایج: مقایسه‌ی فاصله با == دقیق. برای فاصله از < یا > استفاده کنید.' }
    ],
    quiz: [
      { q: 'فاصله‌ی (0,0) تا (3,4) چقدر است؟', options: ['7', '5', '12', '3'], answer: 1, explain: 'با قضیه‌ی فیثاغورس، فاصله برابر 5 است.' },
      { q: 'normalized یک بردار چه کاری می‌کند؟', options: ['جهت را حذف می‌کند', 'اندازه را 1 می‌کند و جهت را نگه می‌دارد', 'اندازه را دو برابر می‌کند', 'بردار را صفر می‌کند'], answer: 1, explain: 'بردار نرمال شده اندازه 1 دارد و فقط جهت را نشان می‌دهد.' }
    ]
  });

  add({ id: 'unity-events-unityevent', title: 'UnityEvent: رویداد قابل تنظیم در Inspector', level: 'متوسط', prereq: ['events', 'unity-script-communication'],
    objectives: ['UnityEvent را در یک اسکریپت تعریف کنید.', 'تابع را در Inspector به رویداد وصل کنید.', 'وقتی رویداد را اجرا کنید، توابع متصل صدا زده شوند.'],
    blocks: [
      { type: 'h', text: 'رویداد بدون نوشتن کد وصل‌کننده' },
      { type: 'code', code: 'using UnityEngine;\nusing UnityEngine.Events;\n\npublic class Trigger : MonoBehaviour\n{\n    public UnityEvent onActivate;\n\n    void OnTriggerEnter(Collider other)\n    {\n        if (other.CompareTag("Player")) onActivate.Invoke();\n    }\n}', output: 'هر تابعی که در Inspector به onActivate وصل شود، با برخورد اجرا می‌شود.' },
      { type: 'tip', text: 'UnityEvent برای طراحی‌گرها عالی است چون بدون کد قابل تنظیم است. برای منطق داخلی، event معمولی C# بهتر است.' }
    ],
    quiz: [
      { q: 'مزیت اصلی UnityEvent چیست؟', options: ['سرعت بیشتر', 'وصل کردن توابع در Inspector بدون کد', 'حذف Update', 'ذخیره‌ی بازی'], answer: 1, explain: 'UnityEvent توابع را در Inspector قابل وصل کردن می‌کند.' },
      { q: 'برای اجرای همه‌ی توابع متصل کدام را صدا می‌زنیم؟', options: ['onActivate.Add()', 'onActivate.Invoke()', 'onActivate.Start()', 'onActivate.Set()'], answer: 1, explain: 'Invoke همه‌ی توابع متصل را اجرا می‌کند.' }
    ]
  });

  add({ id: 'unity-coroutines', title: 'Coroutine: تأخیر بدون قفل کردن بازی', level: 'متوسط', prereq: ['unity-lifecycle'],
    objectives: ['Coroutine با IEnumerator بنویسید.', 'با yield return WaitForSeconds تأخیر بگذارید.', 'با StartCoroutine آن را اجرا کنید.'],
    blocks: [
      { type: 'h', text: 'کار در چند فریم' },
      { type: 'code', code: 'using System.Collections;\nusing UnityEngine;\n\npublic class Blink : MonoBehaviour\n{\n    void Start()\n    {\n        StartCoroutine(BlinkRoutine());\n    }\n\n    IEnumerator BlinkRoutine()\n    {\n        yield return new WaitForSeconds(1f);\n        Debug.Log("یک ثانیه گذشت");\n    }\n}', output: 'بعد از یک ثانیه: یک ثانیه گذشت' },
      { type: 'warn', text: 'اشتباه رایج: حلقه‌ی بی‌پایان داخل Coroutine بدون yield. این کار Unity را قفل می‌کند.' }
    ],
    quiz: [
      { q: 'نوع بازگشتی Coroutine چیست؟', options: ['void', 'IEnumerator', 'int', 'Task'], answer: 1, explain: 'Coroutine با IEnumerator نوشته می‌شود.' },
      { q: 'کدام دستور تأخیر یک ثانیه‌ای می‌دهد؟', options: ['yield return new WaitForSeconds(1f);', 'Sleep(1);', 'Time.wait(1);', 'await 1;'], answer: 0, explain: 'WaitForSeconds تأخیر بر حسب ثانیه می‌دهد.' }
    ]
  });

  add({ id: 'unity-audio', title: 'صدا و موسیقی با AudioSource', level: 'متوسط', prereq: ['unity-project-structure', 'unity-script-communication'],
    objectives: ['AudioClip را به AudioSource وصل کنید.', 'صدای افکت را با PlayOneShot پخش کنید.', 'حجم صدا را با volume تنظیم کنید.'],
    blocks: [
      { type: 'h', text: 'پخش صدا' },
      { type: 'code', code: 'using UnityEngine;\n\npublic class SoundFX : MonoBehaviour\n{\n    public AudioSource source;\n    public AudioClip jumpSound;\n\n    public void PlayJump()\n    {\n        source.PlayOneShot(jumpSound, 0.8f);\n    }\n}', output: 'با هر پرش، صدای پرش یک بار پخش می‌شود.' },
      { type: 'tip', text: 'موسیقی زمینه را با Loop روشن کنید؛ افکت‌های کوتاه را با PlayOneShot پخش کنید تا روی هم بیفتند.' }
    ],
    quiz: [
      { q: 'برای پخش یک افکت کوتاه بدون قطع صدای قبلی کدام مناسب است؟', options: ['Play', 'PlayOneShot', 'Stop', 'Pause'], answer: 1, explain: 'PlayOneShot افکت را بدون قطع صدای دیگر پخش می‌کند.' },
      { q: 'کدام خاصیت حجم صدا را کنترل می‌کند؟', options: ['volume', 'pitch', 'loop', 'clip'], answer: 0, explain: 'volume حجم صدای AudioSource را مشخص می‌کند.' }
    ]
  });

  add({ id: 'unity-enemy-ai', title: 'هوش مصنوعی ساده برای دشمن', level: 'متوسط', prereq: ['unity-vectors', 'unity-2d-physics'],
    objectives: ['حالت‌های ساده‌ی دشمن (گشت و تعقیب) را بسازید.', 'با فاصله تشخیص دهید بازیکن در محدوده است یا نه.', 'با enum وضعیت را مدیریت کنید.'],
    blocks: [
      { type: 'h', text: 'دو حالت: گشت و تعقیب' },
      { type: 'code', code: 'using UnityEngine;\n\npublic class EnemyAI : MonoBehaviour\n{\n    public Transform player;\n    public float detectRange = 5f;\n    public float speed = 2f;\n\n    void Update()\n    {\n        float dist = Vector2.Distance(transform.position, player.position);\n        if (dist <= detectRange)\n        {\n            Vector2 dir = (player.position - transform.position).normalized;\n            transform.Translate(dir * speed * Time.deltaTime);\n        }\n    }\n}', output: 'وقتی بازیکن نزدیک شود، دشمن به سمت او می‌رود.' },
      { type: 'tip', text: 'برای رفتارهای بیشتر، وضعیت‌ها را با enum (Patrol، Chase، Attack) جدا کنید؛ این الگو را در بخش معماری بازی می‌بینید.' }
    ],
    quiz: [
      { q: 'برای تشخیص نزدیک بودن بازیکن از چه چیزی استفاده شده است؟', options: ['Random', 'Vector2.Distance', 'Input.GetKey', 'Color'], answer: 1, explain: 'فاصله‌ی دو نقطه با Distance محاسبه می‌شود.' },
      { q: 'چرا dir را normalized می‌کنیم؟', options: ['برای سرعت ثابت حرکت', 'برای تغییر رنگ', 'برای حذف دشمن', 'لازم نیست'], answer: 0, explain: 'بردار نرمال شده فقط جهت دارد و سرعت با speed کنترل می‌شود.' }
    ]
  });

  add({ id: 'unity-3d-physics', title: '3D: فیزیک و برخورد با Rigidbody', level: 'متوسط', prereq: ['unity-physics', 'unity-3d-character'],
    objectives: ['Rigidbody سه‌بعدی را به شیء اضافه کنید.', 'با AddForce و ForceMode نیرو بدهید.', 'با OnCollisionEnter برخورد را تشخیص دهید.'],
    blocks: [
      { type: 'h', text: 'نیروی ضربه‌ای' },
      { type: 'code', code: 'using UnityEngine;\n\npublic class Launcher : MonoBehaviour\n{\n    private Rigidbody rb;\n\n    void Start()\n    {\n        rb = GetComponent<Rigidbody>();\n    }\n\n    void Update()\n    {\n        if (Input.GetKeyDown(KeyCode.Space))\n        {\n            rb.AddForce(Vector3.up * 5f, ForceMode.Impulse);\n        }\n    }\n\n    void OnCollisionEnter(Collision c)\n    {\n        Debug.Log("برخورد با " + c.gameObject.name);\n    }\n}', output: 'با فشردن Space شیء به بالا پرتاب می‌شود.' },
      { type: 'warn', text: 'اشتباه رایج: تغییر مستقیم position روی شیء دارای Rigidbody. از AddForce یا velocity استفاده کنید.' }
    ],
    quiz: [
      { q: 'ForceMode.Impulse برای چه نیرویی مناسب است؟', options: ['نیروی پیوسته‌ی کوچک', 'ضربه‌ی لحظه‌ای', 'تغییر رنگ', 'حذف فیزیک'], answer: 1, explain: 'Impulse نیروی ناگهانی و لحظه‌ای مثل یک ضربه است.' },
      { q: 'کدام متد برخورد سه‌بعدی را تشخیص می‌دهد؟', options: ['OnTriggerEnter2D', 'OnCollisionEnter', 'Start', 'Awake'], answer: 1, explain: 'OnCollisionEnter برای برخورد فیزیکی سه‌بعدی است.' }
    ]
  });

  add({ id: 'unity-3d-animation', title: '3D: انیمیشن شخصیت با Animator و پارامتر Bool', level: 'متوسط', prereq: ['unity-animation-basics', 'unity-3d-character'],
    objectives: ['پارامتر bool را در Animator Controller بسازید.', 'وضعیت زمین را از CharacterController بخوانید.', 'انیمیشن پرش را هماهنگ کنید.'],
    blocks: [
      { type: 'h', text: 'انیمیشن بر اساس زمین' },
      { type: 'code', code: 'using UnityEngine;\n\n[RequireComponent(typeof(CharacterController))]\npublic class PlayerAnimator3D : MonoBehaviour\n{\n    private Animator anim;\n    private CharacterController cc;\n\n    void Start()\n    {\n        anim = GetComponent<Animator>();\n        cc = GetComponent<CharacterController>();\n    }\n\n    void Update()\n    {\n        anim.SetBool("Grounded", cc.isGrounded);\n        anim.SetFloat("Speed", Mathf.Abs(Input.GetAxis("Vertical")));\n    }\n}', output: 'انیمیشن راه رفتن و ایستادن با حرکت شخصیت هماهنگ می‌شود.' },
      { type: 'warn', text: 'اشتباه رایج: نام پارامتر در کد با نام در Animator Controller فرق داشته باشد. حروف بزرگ و کوچک مهم است.' }
    ],
    quiz: [
      { q: 'برای خواندن وضعیت زمین در CharacterController از کدام خاصیت استفاده می‌شود؟', options: ['isGrounded', 'velocity', 'speed', 'position'], answer: 0, explain: 'isGrounded نشان می‌دهد شخصیت روی سطح است یا نه.' },
      { q: 'SetBool چه نوع پارامتری را تنظیم می‌کند؟', options: ['عدد اعشاری', 'درست/نادرست', 'متن', 'بردار'], answer: 1, explain: 'SetBool مقدار true یا false را برای پارامتر bool تنظیم می‌کند.' }
    ]
  });

  add({ id: 'unity-ui-menu', title: 'UI: دکمه، اسلایدر و منوی توقف', level: 'متوسط', prereq: ['unity-score', 'unity-menu-scenes'],
    objectives: ['دکمه را با onClick به تابع وصل کنید.', 'با Slider حجم صدا را تنظیم کنید.', 'با Time.timeScale بازی را متوقف کنید.'],
    blocks: [
      { type: 'h', text: 'منوی توقف و تنظیم صدا' },
      { type: 'code', code: 'using UnityEngine;\nusing UnityEngine.UI;\n\npublic class PauseMenu : MonoBehaviour\n{\n    public GameObject panel;\n    public Slider volumeSlider;\n    public AudioSource music;\n    private bool paused = false;\n\n    public void TogglePause()\n    {\n        paused = !paused;\n        Time.timeScale = paused ? 0f : 1f;\n        panel.SetActive(paused);\n    }\n\n    public void SetVolume()\n    {\n        music.volume = volumeSlider.value;\n    }\n}', output: 'با دکمه، بازی متوقف و منو باز می‌شود؛ اسلایدر حجم صدا را تغییر می‌دهد.' },
      { type: 'warn', text: 'اشتباه رایج: فراموش کردن بازگرداندن Time.timeScale به 1. بازی بعد از توقف هم متوقف می‌ماند.' }
    ],
    quiz: [
      { q: 'برای متوقف کردن بازی، کدام مقدار Time.timeScale مناسب است؟', options: ['1', '0', '-1', '100'], answer: 1, explain: 'با timeScale صفر، زمان بازی متوقف می‌شود.' },
      { q: 'دکمه‌ی UI چگونه به تابع وصل می‌شود؟', options: ['با onClick در Inspector یا AddListener', 'با Destroy', 'با Instantiate', 'با Random'], answer: 0, explain: 'از onClick در Inspector یا AddListener در کد استفاده می‌شود.' }
    ]
  });
})();
