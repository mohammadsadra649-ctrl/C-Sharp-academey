// بخش یونیتی — هدف: Unity 2019.4 LTS و C# 7.3
// نکته: در Unity 2019.4 از ویژگی‌های C# 8 و بالاتر (مثل switch expression و using declaration) استفاده نکنید.
(function () {
  const topic = {
    id: 'unity',
    theme: 'unity',
    title: 'بازی‌سازی با Unity',
    desc: 'با C# در Unity بازی بسازید: حرکت، فیزیک، برخورد و رابط کاربری. مثال‌ها برای Unity 2019.4 LTS نوشته شده‌اند.',
    level: 'مبتدی',
    lessons: ['unity-intro', 'unity-lifecycle', 'unity-movement', 'unity-physics', 'unity-spawn', 'unity-score']
  };
  window.CURRICULUM.topics.push(topic);

  const lessons = {
    'unity-intro': {
      id: 'unity-intro',
      title: 'مفاهیم پایه Unity: GameObject و Component',
      level: 'مبتدی',
      theme: 'unity',
      prereq: ['first-program'],
      objectives: [
        'بدانید Unity 2019.4 چیست و چرا نسخه LTS را انتخاب می‌کنیم.',
        'تفاوت GameObject و Component را توضیح دهید.',
        'نقش Inspector و Hierarchy را بشناسید.'
      ],
      blocks: [
        { type: 'h', text: 'Unity 2019.4 LTS' },
        { type: 'p', text: 'Unity یک موتور بازی‌سازی است و C# زبان اصلی برنامه‌نویسی آن است. نسخه 2019.4 یک نسخه LTS (پشتیبانی بلندمدت) است؛ یعنی برای آموزش و پروژه‌های پایدار مناسب است.' },
        { type: 'warn', text: 'اشتباه رایج: کدهای آنلاین را بدون بررسی نسخه کپی نکنید. Unity 2019.4 از C# 7.3 استفاده می‌کند و ویژگی‌های جدیدتر (مثل switch expression) در آن کامپایل نمی‌شوند. همچنین بعضی API ها مثل Rigidbody.linearVelocity فقط در نسخه‌های جدیدتر وجود دارند؛ در این نسخه از Rigidbody.velocity استفاده کنید.' },
        { type: 'h', text: 'GameObject و Component' },
        { type: 'p', text: 'هر چیزی که در صحنه (Scene) می‌بینید یک GameObject است؛ مثل یک مکعب، دوربین یا یک چراغ. GameObject خودش تقریباً خالی است و رفتار آن با افزودن Component مشخص می‌شود؛ مثل Transform برای مکان، Rigidbody برای فیزیک، یا اسکریپت C# که خودتان می‌نویسید.' },
        { type: 'list', items: [
          'Hierarchy: فهرست GameObjectهای صحنه',
          'Inspector: نمایش و تنظیم Componentهای GameObject انتخاب‌شده',
          'Scene view: محیط ساخت صحنه؛ Game view: نمای نهایی بازی',
          'Transform: هر GameObject یک Transform دارد که موقعیت، چرخش و مقیاس آن را مشخص می‌کند'
        ]},
        { type: 'tip', text: 'اسکریپت C# با نوشتن کلاسی که از MonoBehaviour ارث‌بری می‌کند ساخته می‌شود. این کلاس را روی یک GameObject می‌کشید تا Component آن شود.' }
      ],
      quiz: [
        { q: 'کدام مورد رفتار یک GameObject را تعیین می‌کند؟', options: ['نام آن', 'Componentهای آن', 'رنگ Hierarchy', 'اندازه Game view'], answer: 1, explain: 'GameObject با Componentهایی که به آن اضافه می‌شود رفتار پیدا می‌کند.' },
        { q: 'نسخه 2019.4 از کدام نسخه C# استفاده می‌کند؟', options: ['C# 6', 'C# 7.3', 'C# 9', 'C# 12'], answer: 1, explain: 'Unity 2019.4 از C# 7.3 پشتیبانی می‌کند؛ بنابراین ویژگی‌های جدیدتر در آن کار نمی‌کنند.' }
      ]
    },

    'unity-lifecycle': {
      id: 'unity-lifecycle',
      title: 'چرخه اجرای اسکریپت: Start و Update',
      level: 'مبتدی',
      theme: 'unity',
      prereq: ['unity-intro', 'if-statement'],
      objectives: [
        'بفهمید Start یک بار و Update در هر فریم اجرا می‌شود.',
        'با Debug.Log پیام در Console چاپ کنید.',
        'بدانید چرا باید تایم‌گیری را در Update با Time.deltaTime انجام داد.'
      ],
      blocks: [
        { type: 'h', text: 'MonoBehaviour' },
        { type: 'p', text: 'کلاس پایه‌ی اسکریپت‌های Unity، MonoBehaviour است. Unity برای هر اسکریپت، متدهای خاصی را در زمان‌های مشخص صدا می‌زند؛ به این ترتیب شما فقط منطق بازی را می‌نویسید و زمان‌بندی با Unity است.' },
        { type: 'code',
          code: 'using UnityEngine;\n\npublic class Hello : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log("Start");\n    }\n\n    void Update()\n    {\n        // هر فریم اجرا می‌شود\n    }\n}',
          notes: {
            1: 'کلاس‌های Unity در فضای نام UnityEngine قرار دارند.',
            3: 'کلاس ما از MonoBehaviour ارث‌بری می‌کند تا Unity آن را بشناسد.',
            6: 'Start قبل از اولین فریم و فقط یک بار اجرا می‌شود.',
            11: 'Update در هر فریم صدا زده می‌شود؛ پس عددش به سرعت کامپیوتر بستگی دارد.'
          },
          output: 'در Console: Start' },
        { type: 'h', text: 'فریم و Time.deltaTime' },
        { type: 'p', text: 'تعداد فریم‌ها در ثانیه در هر کامپیوتر فرق دارد. اگر حرکت را فقط با عدد ثابت در هر فریم انجام دهیم، سرعت بازی روی کامپیوترهای مختلف متفاوت می‌شود. Time.deltaTime زمان گذشته از فریم قبلی (بر حسب ثانیه) را می‌دهد؛ با ضرب کردن در آن، حرکت در واحد زمان یکسان می‌شود.' },
        { type: 'warn', text: 'اشتباه رایج: منطق حرکت را در Start بنویسید. Start فقط یک بار اجرا می‌شود؛ حرکت پیوسته باید در Update باشد.' },
        { type: 'tip', text: 'Debug.Log پیام‌ها را در پنجره Console نشان می‌دهد. از آن برای فهمیدن ترتیب اجرای کد استفاده کنید.' }
      ],
      quiz: [
        { q: 'کدام متد Unity در هر فریم اجرا می‌شود؟', options: ['Start', 'Awake', 'Update', 'OnDestroy'], answer: 2, explain: 'Update در هر فریم صدا زده می‌شود. Start فقط یک بار، قبل از اولین فریم اجرا می‌شود.' },
        { q: 'Time.deltaTime برای چه چیزی استفاده می‌شود؟', options: ['نمایش ساعت', 'یکسان کردن سرعت حرکت روی کامپیوترهای مختلف', 'حذف GameObject', 'تغییر رنگ'], answer: 1, explain: 'با ضرب حرکت در deltaTime، حرکت به زمان وابسته می‌شود و نه به تعداد فریم‌ها.' }
      ]
    },

    'unity-movement': {
      id: 'unity-movement',
      title: 'حرکت دادن شخصیت با ورودی',
      level: 'مبتدی',
      theme: 'unity',
      prereq: ['unity-lifecycle', 'variables'],
      objectives: [
        'با Input.GetAxis ورودی کیبورد را بخوانید.',
        'یک متغیر عمومی را از Inspector تنظیم کنید.',
        'با Transform.Translate یک GameObject را جابه‌جا کنید.'
      ],
      blocks: [
        { type: 'h', text: 'ورودی بازیکن' },
        { type: 'p', text: 'Input.GetAxis("Horizontal") مقداری بین -1 و 1 برمی‌گرداند. کلیدهای چپ و راست مقدار منفی و مثبت می‌دهند. این نام‌ها در تنظیمات Input Manager تعریف شده‌اند و به‌صورت پیش‌فرض وجود دارند.' },
        { type: 'code',
          code: 'using UnityEngine;\n\npublic class PlayerMove : MonoBehaviour\n{\n    public float speed = 5f;\n\n    void Update()\n    {\n        float h = Input.GetAxis("Horizontal");\n        float v = Input.GetAxis("Vertical");\n        Vector3 dir = new Vector3(h, 0f, v);\n        transform.Translate(dir * speed * Time.deltaTime);\n    }\n}',
          notes: {
            5: 'public باعث می‌شود speed در Inspector دیده و تغییر داده شود.',
            9: 'مقدار افقی (چپ/راست) را می‌خوانیم.',
            10: 'مقدار عمودی (جلو/عقب) را می‌خوانیم.',
            12: 'حرکت را با سرعت و deltaTime ضرب می‌کنیم تا روی همه‌ی سیستم‌ها یکسان باشد.'
          },
          output: 'با کلیدهای جهت‌نما، مکعب در صحنه جابه‌جا می‌شود.' },
        { type: 'h', text: 'تنظیم از Inspector' },
        { type: 'p', text: 'چون speed عمومی (public) است، پس از افزودن اسکریپت به GameObject، در Inspector یک فیلد برای آن ظاهر می‌شود. می‌توانید بدون تغییر کد سرعت را عوض کنید.' },
        { type: 'warn', text: 'اشتباه رایج: فراموش کردن افزودن اسکریپت به GameObject. اسکریپت فقط وقتی اجرا می‌شود که روی یک GameObject باشد.' }
      ],
      quiz: [
        { q: 'Input.GetAxis("Horizontal") در بیشترین حالت چه مقداری می‌دهد؟', options: ['0 تا 100', 'بین -1 و 1', 'فقط true یا false', 'یک رشته'], answer: 1, explain: 'مقدار محور بین -1 و 1 است و بسته به کلید فشرده‌شده منفی یا مثبت می‌شود.' },
        { q: 'چرا speed را public تعریف می‌کنیم؟', options: ['تا سریع‌تر اجرا شود', 'تا در Inspector قابل تنظیم باشد', 'تا فقط در Start استفاده شود', 'این کار لازم نیست'], answer: 1, explain: 'فیلدهای public در Inspector نمایش داده می‌شوند و می‌توان مقدارشان را بدون تغییر کد عوض کرد.' }
      ]
    },

    'unity-physics': {
      id: 'unity-physics',
      title: 'فیزیک و برخورد با Rigidbody',
      level: 'متوسط',
      theme: 'unity',
      prereq: ['unity-movement'],
      objectives: [
        'Rigidbody را به یک GameObject اضافه کنید.',
        'نیرو را در FixedUpdate اعمال کنید.',
        'با OnCollisionEnter به برخورد واکنش نشان دهید.'
      ],
      blocks: [
        { type: 'h', text: 'Rigidbody و FixedUpdate' },
        { type: 'p', text: 'برای حرکت‌های فیزیکی، GameObject باید Rigidbody داشته باشد. تغییرات فیزیکی باید در FixedUpdate انجام شوند، چون FixedUpdate در زمان‌های ثابت و مستقل از فریم اجرا می‌شود و فیزیک را پایدار نگه می‌دارد.' },
        { type: 'code',
          code: 'using UnityEngine;\n\npublic class Ball : MonoBehaviour\n{\n    private Rigidbody rb;\n\n    void Start()\n    {\n        rb = GetComponent<Rigidbody>();\n    }\n\n    void FixedUpdate()\n    {\n        rb.AddForce(Vector3.right * 2f);\n    }\n\n    void OnCollisionEnter(Collision collision)\n    {\n        if (collision.gameObject.CompareTag("Enemy"))\n        {\n            Debug.Log("برخورد با دشمن");\n        }\n    }\n}',
          notes: {
            8: 'GetComponent رفرنس Rigidbody همین GameObject را می‌گیرد.',
            12: 'هر مرحله‌ی فیزیکی نیروی ثابت به سمت راست اضافه می‌کند.',
            16: 'OnCollisionEnter وقتی صدا زده می‌شود که این GameObject به چیزی برخورد کند.',
            17: 'CompareTag با تگی که در Inspector تعریف شده کار می‌کند؛ اگر تگ Enemy وجود نداشته باشد، خطا می‌گیرید.'
          },
          output: 'در Console هنگام برخورد با دشمن: برخورد با دشمن' },
        { type: 'warn', text: 'اشتباه رایج: تغییر مستقیم transform.position روی یک Rigidbody باعث رفتار غیرواقعی فیزیک می‌شود. برای حرکت فیزیکی از AddForce یا velocity استفاده کنید.' },
        { type: 'tip', text: 'برای تعریف تگ جدید، در Inspector روی فیلد Tag کلیک کنید و Add Tag را انتخاب کنید.' }
      ],
      quiz: [
        { q: 'حرکت فیزیکی باید در کدام متد انجام شود؟', options: ['Start', 'FixedUpdate', 'OnDestroy', 'Awake'], answer: 1, explain: 'FixedUpdate در زمان‌های ثابت اجرا می‌شود و برای فیزیک مناسب است.' },
        { q: 'OnCollisionEnter کی صدا زده می‌شود؟', options: ['هر فریم', 'وقتی بازی شروع می‌شود', 'وقتی برخورد شروع می‌شود', 'وقتی بازی تمام می‌شود'], answer: 2, explain: 'این متد در لحظه‌ی شروع برخورد با یک Collider دیگر فراخوانی می‌شود.' }
      ]
    },

    'unity-spawn': {
      id: 'unity-spawn',
      title: 'ساخت و حذف GameObject با Instantiate و Destroy',
      level: 'متوسط',
      theme: 'unity',
      prereq: ['unity-physics'],
      objectives: [
        'یک Prefab را با Instantiate در صحنه بسازید.',
        'یک GameObject را با Destroy بعد از مدت مشخص حذف کنید.',
        'تفاوت GameObject در صحنه و Prefab را توضیح دهید.'
      ],
      blocks: [
        { type: 'h', text: 'Prefab چیست؟' },
        { type: 'p', text: 'Prefab یک الگوی ذخیره‌شده از GameObject است؛ مثل قالب کیک. هر بار که Instantiate را صدا بزنید، یک کپی از آن در صحنه ساخته می‌شود. برای سکه، دشمن یا گلوله بسیار کاربردی است.' },
        { type: 'code',
          code: 'using UnityEngine;\n\npublic class Spawner : MonoBehaviour\n{\n    public GameObject coinPrefab;\n\n    void Start()\n    {\n        GameObject coin = Instantiate(coinPrefab, new Vector3(0f, 1f, 0f), Quaternion.identity);\n        Destroy(coin, 2f);\n    }\n}',
          notes: {
            5: 'به Inspector یک فیلد برای Prefab می‌دهیم که با drag and drop پر می‌شود.',
            8: 'Instantiate یک کپی از Prefab را در موقعیت مشخص می‌سازد؛ Quaternion.identity یعنی بدون چرخش.',
            9: 'Destroy بعد از 2 ثانیه این GameObject را از صحنه حذف می‌کند.'
          },
          output: 'یک سکه در صحنه ظاهر می‌شود و بعد از 2 ثانیه ناپدید می‌شود.' },
        { type: 'warn', text: 'اشتباه رایج: فراموش کردن پر کردن فیلد coinPrefab در Inspector. در این صورت Instantiate خطای null می‌دهد.' },
        { type: 'tip', text: 'اگر تعداد زیاد اشیا می‌سازید، Object Pooling سریع‌تر و بهینه‌تر است؛ این موضوع در درس‌های پیشرفته‌تر توضیح داده می‌شود.' }
      ],
      quiz: [
        { q: 'Instantiate چه کاری انجام می‌دهد؟', options: ['یک GameObject را حذف می‌کند', 'یک کپی از Prefab در صحنه می‌سازد', 'بازی را متوقف می‌کند', 'تگ تعریف می‌کند'], answer: 1, explain: 'Instantiate یک نمونه از Prefab را در صحنه ایجاد می‌کند.' },
        { q: 'Destroy(obj, 2f) چه کاری می‌کند؟', options: ['obj را فوراً حذف می‌کند', 'بعد از 2 ثانیه obj را حذف می‌کند', 'عدد 2 را به obj می‌دهد', 'obj را دو بار کپی می‌کند'], answer: 1, explain: 'پارامتر دوم تأخیر بر حسب ثانیه است؛ پس حذف بعد از 2 ثانیه انجام می‌شود.' }
      ]
    },

    'unity-score': {
      id: 'unity-score',
      title: 'امتیاز و رابط کاربری با Text',
      level: 'متوسط',
      theme: 'unity',
      prereq: ['unity-spawn'],
      objectives: [
        'یک متن UI در Canvas بسازید.',
        'امتیاز را در کد افزایش دهید و روی صفحه نشان دهید.',
        'با using UnityEngine.UI به کامپوننت Text دسترسی پیدا کنید.'
      ],
      blocks: [
        { type: 'h', text: 'Canvas و Text' },
        { type: 'p', text: 'رابط کاربری (UI) در Unity داخل یک Canvas ساخته می‌شود. در نسخه 2019.4 برای نمایش متن ساده می‌توانید از کامپوننت Text (از فضای نام UnityEngine.UI) استفاده کنید. برای متن‌های حرفه‌ای‌تر، پکیج TextMesh Pro هم در دسترس است.' },
        { type: 'code',
          code: 'using UnityEngine;\nusing UnityEngine.UI;\n\npublic class ScoreManager : MonoBehaviour\n{\n    public Text scoreText;\n    private int score = 0;\n\n    void Start()\n    {\n        UpdateText();\n    }\n\n    public void AddScore(int amount)\n    {\n        score += amount;\n        UpdateText();\n    }\n\n    void UpdateText()\n    {\n        scoreText.text = "امتیاز: " + score;\n    }\n}',
          notes: {
            2: 'برای کار با Text باید فضای نام UnityEngine.UI را اضافه کنیم.',
            6: 'فیلد scoreText را در Inspector به یک Text در Canvas وصل می‌کنیم.',
            16: 'AddScore را از جای دیگر بازی (مثلاً برخورد با سکه) صدا می‌زنیم.',
            21: 'متن نمایش‌داده‌شده فقط با تغییر خاصیت text به‌روز می‌شود.'
          },
          output: 'امتیاز: 0 و بعد از هر AddScore(10) مثلاً: امتیاز: 10' },
        { type: 'warn', text: 'اشتباه رایج: فراموش کردن using UnityEngine.UI. در این صورت Text شناخته نمی‌شود و کامپایلر خطا می‌دهد.' },
        { type: 'tip', text: 'اگر در کد جایی Text می‌بینید و با UnityEngine.UI تفاوت دارد، مطمئن شوید که نوع Text را درست انتخاب کرده‌اید.' }
      ],
      quiz: [
        { q: 'برای استفاده از کامپوننت Text در نسخه 2019.4 کدام using لازم است؟', options: ['using UnityEngine.Text;', 'using UnityEngine.UI;', 'using System.Text;', 'نیازی نیست'], answer: 1, explain: 'کامپوننت Text در فضای نام UnityEngine.UI قرار دارد.' },
        { q: 'برای به‌روزرسانی متن امتیاز کدام کار درست است؟', options: ['scoreText = "امتیاز"', 'scoreText.text = "امتیاز: " + score;', 'Destroy(scoreText);', 'Instantiate(scoreText);'], answer: 1, explain: 'متن نمایش‌داده‌شده را از طریق خاصیت text تغییر می‌دهیم.' }
      ]
    }
  };

  Object.assign(window.CURRICULUM.lessons, lessons);
})();
