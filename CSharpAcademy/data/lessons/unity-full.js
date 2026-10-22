// مسیر کامل Unity (2019.4 و C# 7.3): Prefab Variants، بازی دوبعدی، منو و ذخیره، بازی سه‌بعدی، بهینه‌سازی
// بعد از unity-more.js بارگذاری می‌شود.
(function () {
  const unity = window.CURRICULUM.topics.find(t => t.id === 'unity');
  const newIds = [
    'unity-prefab-variants',
    'unity-2d-sprite', 'unity-2d-physics', 'unity-2d-health',
    'unity-menu-scenes', 'unity-save-progress',
    'unity-3d-character', 'unity-3d-camera', 'unity-3d-lighting',
    'unity-optimization'
  ];
  unity.lessons.push(...newIds);

  const L = window.CURRICULUM.lessons;
  const U = { theme: 'unity', level: 'متوسط' };

  L['unity-prefab-variants'] = Object.assign({ id: 'unity-prefab-variants', title: 'Prefab Variants: تغییر یک نسخه بدون دست زدن به اصل', prereq: ['unity-spawn'],
    objectives: ['تفاوت Prefab و Prefab Variant را بگویید.', 'یک Variant بسازید و فقط تغییرات لازم را اعمال کنید.', 'بفهمید تغییر Prefab اصلی روی Variant ها اثر می‌گذارد.'],
    blocks: [
      { type: 'h', text: 'اصل و نسخه‌ی تغییریافته' },
      { type: 'p', text: 'Prefab Variant نسخه‌ای از یک Prefab است که به اصل وصل می‌ماند. مثلاً دشمن عادی را Prefab کنید، سپس یک Variant برای دشمن سریع بسازید و فقط سرعت یا رنگ را عوض کنید. اگر بعداً اصل را اصلاح کنید، همه‌ی Variant ها بخش‌های بدون تغییر را دریافت می‌کنند.' },
      { type: 'list', items: [
        'ساخت: روی Prefab راست‌کلیک کنید و Create > Prefab Variant را بزنید.',
        'تغییر: فقط ویژگی‌های لازم را در Variant عوض کنید؛ Unity آن‌ها را به‌صورت override نگه می‌دارد.',
        'بازگشت: با Revert می‌توانید تغییر یک ویژگی را به مقدار اصل برگردانید.'
      ]},
      { type: 'warn', text: 'اشتباه رایج: کپی کردن Prefab به‌جای ساخت Variant. با کپی، اصلاح اصل روی نسخه‌ی کپی‌شده اثری ندارد.' }
    ],
    quiz: [
      { q: 'مزیت اصلی Prefab Variant نسبت به کپی کردن Prefab چیست؟', options: ['سریع‌تر اجرا می‌شود', 'اصلاح اصل روی Variant ها اثر می‌گذارد', 'نیاز به Inspector ندارد', 'فقط برای 2D است'], answer: 1, explain: 'Variant به اصل وصل است، پس اصلاح اصل به نسخه‌ها منتقل می‌شود.' },
      { q: 'برای برگرداندن یک ویژگی به مقدار اصل چه باید کرد؟', options: ['حذف Prefab', 'Revert', 'Instantiate', 'SetActive(false)'], answer: 1, explain: 'Revert مقدار اصلی ویژگی را برمی‌گرداند.' }
    ]
  }, U);

  L['unity-2d-sprite'] = Object.assign({ id: 'unity-2d-sprite', title: '2D: Sprite و Sprite Renderer', prereq: ['unity-intro', 'unity-movement'],
    objectives: ['Sprite را به یک GameObject با Sprite Renderer اضافه کنید.', 'با flipX جهت شخصیت را تغییر دهید.', 'تنظیم Sorting Layer را برای ترتیب نمایش بفهمید.'],
    blocks: [
      { type: 'h', text: 'تصویر دوبعدی در صحنه' },
      { type: 'p', text: 'در بازی دوبعدی، تصاویر با Sprite Renderer نمایش داده می‌شوند. برای اینکه شخصیت به سمت حرکت نگاه کند، کافی است مقدار flipX را تغییر دهیم.' },
      { type: 'code', code: 'using UnityEngine;\n\npublic class Facing : MonoBehaviour\n{\n    private SpriteRenderer sr;\n\n    void Start()\n    {\n        sr = GetComponent<SpriteRenderer>();\n    }\n\n    void Update()\n    {\n        float h = Input.GetAxis("Horizontal");\n        if (h != 0) sr.flipX = h < 0;\n    }\n}', output: 'وقتی به چپ می‌روید، تصویر آینه می‌شود.' },
      { type: 'tip', text: 'برای ترتیب نمایش (مثلاً پس‌زمینه پشت شخصیت)، از Sorting Layer و Order in Layer استفاده کنید.' }
    ],
    quiz: [
      { q: 'کدام کامپوننت تصویر Sprite را نمایش می‌دهد؟', options: ['Rigidbody2D', 'SpriteRenderer', 'Collider2D', 'Camera'], answer: 1, explain: 'SpriteRenderer تصویر دوبعدی را روی صحنه نمایش می‌دهد.' },
      { q: 'برای آینه کردن تصویر به سمت چپ کدام خاصیت را تغییر می‌دهیم؟', options: ['flipY', 'flipX', 'color', 'sortingOrder'], answer: 1, explain: 'flipX تصویر را افقی برمی‌گرداند.' }
    ]
  }, U);

  L['unity-2d-physics'] = Object.assign({ id: 'unity-2d-physics', title: '2D: Rigidbody2D، Collider2D و پرش', prereq: ['unity-2d-sprite', 'unity-physics'],
    objectives: ['Rigidbody2D و Collider2D را برای شخصیت تنظیم کنید.', 'با OverlapCircle بررسی کنید شخصیت روی زمین است.', 'پرش را با velocity پیاده‌سازی کنید.'],
    blocks: [
      { type: 'h', text: 'حرکت و پرش دوبعدی' },
      { type: 'p', text: 'Rigidbody2D شخصیت را تحت فیزیک قرار می‌دهد و Collider2D شکل برخورد آن را مشخص می‌کند. برای پرش فقط وقتی مجاز است که شخصیت روی زمین باشد؛ این را با یک دایره‌ی کوچک زیر پای شخصیت و لایه‌ی Ground بررسی می‌کنیم.' },
      { type: 'code', code: 'using UnityEngine;\n\npublic class Platformer : MonoBehaviour\n{\n    public float speed = 5f;\n    public float jumpForce = 10f;\n    public Transform groundCheck;\n    public LayerMask groundLayer;\n    private Rigidbody2D rb;\n\n    void Start()\n    {\n        rb = GetComponent<Rigidbody2D>();\n    }\n\n    void Update()\n    {\n        rb.velocity = new Vector2(Input.GetAxis("Horizontal") * speed, rb.velocity.y);\n\n        bool grounded = Physics2D.OverlapCircle(groundCheck.position, 0.2f, groundLayer);\n        if (Input.GetButtonDown("Jump") && grounded)\n        {\n            rb.velocity = new Vector2(rb.velocity.x, jumpForce);\n        }\n    }\n}', output: 'شخصیت با کلیدهای جهت‌نما حرکت و با Space فقط روی زمین می‌پرد.' },
      { type: 'warn', text: 'اشتباه رایج: تغییر transform.position برای حرکت روی Rigidbody2D. این کار فیزیک را به هم می‌ریزد؛ از velocity استفاده کنید.' },
      { type: 'tip', text: 'در Unity 2019.4 خاصیت velocity برای Rigidbody2D است. در نسخه‌های جدیدتر نام آن ممکن است متفاوت باشد.' }
    ],
    quiz: [
      { q: 'Collider2D چه نقشی دارد؟', options: ['نمایش تصویر', 'تعیین شکل برخورد', 'پخش صدا', 'ذخیره بازی'], answer: 1, explain: 'Collider2D شکل برخورد فیزیکی شیء را مشخص می‌کند.' },
      { q: 'چرا پرش فقط با grounded بودن انجام می‌شود؟', options: ['برای سرعت بیشتر', 'جلوگیری از پرش در هوا', 'بازی ذخیره شود', 'تصویر عوض شود'], answer: 1, explain: 'شرط grounded مانع پرش مکرر در هوا می‌شود.' }
    ]
  }, U);

  L['unity-2d-health'] = Object.assign({ id: 'unity-2d-health', title: '2D: آسیب، جان و مرگ شخصیت', prereq: ['unity-2d-physics', 'events'],
    objectives: ['با Trigger برخورد با دشمن را تشخیص دهید.', 'جان را کم کنید و وضعیت مرگ را مدیریت کنید.', 'از تگ برای تشخیص دشمن استفاده کنید.'],
    blocks: [
      { type: 'h', text: 'برخورد که آسیب می‌زند' },
      { type: 'p', text: 'اگر Collider2D یک شیء را Trigger کنید، شیء عبور می‌کند ولی رویداد OnTriggerEnter2D صدا زده می‌شود. این روش برای آسیب، سکه و نقطه‌ی پایان مرحله مناسب است.' },
      { type: 'code', code: 'using UnityEngine;\n\npublic class PlayerHealth : MonoBehaviour\n{\n    public int maxHealth = 3;\n    private int health;\n\n    void Start()\n    {\n        health = maxHealth;\n    }\n\n    void OnTriggerEnter2D(Collider2D other)\n    {\n        if (other.CompareTag("Enemy"))\n        {\n            health--;\n            if (health <= 0)\n            {\n                Debug.Log("مرگ");\n                gameObject.SetActive(false);\n            }\n        }\n    }\n}', output: 'با هر برخورد با دشمن، یک جان کم می‌شود.' },
      { type: 'warn', text: 'اشتباه رایج: فراموش کردن تعریف تگ Enemy در Tag Manager. CompareTag با تگ ناشناخته کار نمی‌کند.' }
    ],
    quiz: [
      { q: 'در Trigger برای دریافت برخورد کدام متد صدا زده می‌شود؟', options: ['OnCollisionEnter', 'OnTriggerEnter2D', 'Start', 'FixedUpdate'], answer: 1, explain: 'OnTriggerEnter2D برای Trigger های دوبعدی صدا زده می‌شود.' },
      { q: 'تفاوت Trigger با Collision چیست؟', options: ['Trigger صدا ندارد', 'Trigger شیء را متوقف نمی‌کند', 'Trigger فقط در 3D است', 'هیچ تفاوتی نیست'], answer: 1, explain: 'Trigger اجازه‌ی عبور می‌دهد و فقط رویداد تولید می‌کند.' }
    ]
  }, U);

  L['unity-menu-scenes'] = Object.assign({ id: 'unity-menu-scenes', title: 'منو و مدیریت Sceneها', prereq: ['unity-intro', 'events'],
    objectives: ['چند Scene بسازید و در Build Settings ثبت کنید.', 'با SceneManager بین صحنه‌ها جابه‌جا شوید.', 'دکمه‌ی منوی اصلی را به کد وصل کنید.'],
    blocks: [
      { type: 'h', text: 'منوی اصلی و مرحله‌ها' },
      { type: 'p', text: 'هر بخش بازی (منو، مرحله‌ها) می‌تواند یک Scene جدا باشد. برای جابه‌جایی باید هر Scene را در Build Settings اضافه کنید، وگرنه Unity آن را پیدا نمی‌کند.' },
      { type: 'code', code: 'using UnityEngine;\nusing UnityEngine.SceneManagement;\n\npublic class MainMenu : MonoBehaviour\n{\n    public void PlayGame()\n    {\n        SceneManager.LoadScene("Level1");\n    }\n\n    public void QuitGame()\n    {\n        Application.Quit();\n    }\n}', output: 'با کلیک روی دکمه‌ی Play، مرحله‌ی اول بارگذاری می‌شود.' },
      { type: 'tip', text: 'دکمه‌ی UI را انتخاب کنید و در Inspector تابع PlayGame را به OnClick اضافه کنید. Application.Quit در Editor اثری ندارد.' },
      { type: 'warn', text: 'اشتباه رایج: فراموش کردن افزودن Scene به Build Settings. نتیجه: خطا در زمان اجرای LoadScene.' }
    ],
    quiz: [
      { q: 'برای اینکه Unity یک Scene را در زمان اجرا پیدا کند، کجا باید ثبت شود؟', options: ['Hierarchy', 'Build Settings', 'Project Settings > Tags', 'Inspector'], answer: 1, explain: 'Sceneهای لازم باید در Build Settings اضافه شوند.' },
      { q: 'کدام تابع Scene را بارگذاری می‌کند؟', options: ['Instantiate', 'SceneManager.LoadScene', 'PlayerPrefs.Get', 'Destroy'], answer: 1, explain: 'SceneManager.LoadScene صحنه‌ی مشخص شده را بارگذاری می‌کند.' }
    ]
  }, U);

  L['unity-save-progress'] = Object.assign({ id: 'unity-save-progress', title: 'ذخیره‌ی پیشرفت با PlayerPrefs', prereq: ['unity-menu-scenes'],
    objectives: ['مقدار عددی را با PlayerPrefs ذخیره کنید.', 'مقدار پیش‌فرض را در GetInt تعیین کنید.', 'بدانید PlayerPrefs برای داده‌های حجیم مناسب نیست.'],
    blocks: [
      { type: 'h', text: 'ذخیره‌ی ساده روی دستگاه' },
      { type: 'p', text: 'PlayerPrefs کلید و مقدار ساده (عدد، رشته، float) را روی دستگاه بازیکن نگه می‌دارد. برای ذخیره‌ی آخرین مرحله‌ی باز شده یا بیشترین امتیاز مناسب است.' },
      { type: 'code', code: 'using UnityEngine;\n\npublic class Progress : MonoBehaviour\n{\n    public void SaveLevel(int level)\n    {\n        PlayerPrefs.SetInt("UnlockedLevel", level);\n        PlayerPrefs.Save();\n    }\n\n    public int LoadLevel()\n    {\n        return PlayerPrefs.GetInt("UnlockedLevel", 1);\n    }\n}', output: 'اگر ذخیره‌ای نباشد، مرحله‌ی 1 برگردانده می‌شود.' },
      { type: 'warn', text: 'اشتباه رایج: ذخیره‌ی اطلاعات حساس یا حجیم با PlayerPrefs. برای داده‌های ساختاری از فایل JSON استفاده کنید.' }
    ],
    quiz: [
      { q: 'مقدار دوم GetInt چه کاری می‌کند؟', options: ['مقدار را حذف می‌کند', 'پیش‌فرض را وقتی کلید نیست برمی‌گرداند', 'کلید جدید می‌سازد', 'بازی را ذخیره می‌کند'], answer: 1, explain: 'مقدار دوم، پیش‌فرض است که وقتی کلید ذخیره نشده باشد برگردانده می‌شود.' },
      { q: 'PlayerPrefs برای چه داده‌ای مناسب است؟', options: ['داده‌های ساختاری حجیم', 'مقادیر ساده مثل مرحله و امتیاز', 'تصاویر', 'فایل صوتی'], answer: 1, explain: 'PlayerPrefs برای مقادیر ساده مناسب است، نه داده‌های حجیم.' }
    ]
  }, U);

  L['unity-3d-character'] = Object.assign({ id: 'unity-3d-character', title: '3D: کنترل شخصیت با CharacterController', prereq: ['unity-movement', 'unity-physics'],
    objectives: ['CharacterController را برای شخصیت سه‌بعدی تنظیم کنید.', 'حرکت و جاذبه را با Move پیاده‌سازی کنید.', 'پرش را فقط روی زمین مجاز کنید.'],
    blocks: [
      { type: 'h', text: 'حرکت سه‌بعدی بدون لغزش' },
      { type: 'p', text: 'CharacterController یک کپسول برخورد ساده برای شخصیت است و با Move حرکت می‌کند. برای جاذبه باید خودمان سرعت عمودی را کم کنیم، چون CharacterController خودکار سقوط نمی‌کند.' },
      { type: 'code', code: 'using UnityEngine;\n\n[RequireComponent(typeof(CharacterController))]\npublic class ThirdPersonMove : MonoBehaviour\n{\n    public float speed = 5f;\n    public float jumpHeight = 1.5f;\n    public float gravity = -20f;\n    private CharacterController controller;\n    private Vector3 velocity;\n\n    void Start()\n    {\n        controller = GetComponent<CharacterController>();\n    }\n\n    void Update()\n    {\n        if (controller.isGrounded && velocity.y < 0) velocity.y = -2f;\n\n        Vector3 move = transform.right * Input.GetAxis("Horizontal") + transform.forward * Input.GetAxis("Vertical");\n        controller.Move(move * speed * Time.deltaTime);\n\n        if (Input.GetButtonDown("Jump") && controller.isGrounded)\n            velocity.y = Mathf.Sqrt(jumpHeight * -2f * gravity);\n\n        velocity.y += gravity * Time.deltaTime;\n        controller.Move(velocity * Time.deltaTime);\n    }\n}', output: 'شخصیت حرکت می‌کند، می‌پرد و روی زمین می‌ایستد.' },
      { type: 'warn', text: 'اشتباه رایج: تغییر transform.position برای حرکت CharacterController. از Move استفاده کنید تا برخورد درست کار کند.' }
    ],
    quiz: [
      { q: 'چرا باید جاذبه را خودمان اعمال کنیم؟', options: ['Unity جاذبه ندارد', 'CharacterController خودکار سقوط نمی‌کند', 'فقط در 2D لازم است', 'برای سرعت است'], answer: 1, explain: 'CharacterController حرکت را انجام می‌دهد اما جاذبه‌ی خودکار ندارد.' },
      { q: 'کدام خاصیت نشان می‌دهد شخصیت روی زمین است؟', options: ['velocity', 'isGrounded', 'speed', 'gravity'], answer: 1, explain: 'isGrounded مشخص می‌کند CharacterController روی سطح ایستاده است یا نه.' }
    ]
  }, U);

  L['unity-3d-camera'] = Object.assign({ id: 'unity-3d-camera', title: '3D: دوربین اول‌شخص و سوم‌شخص', prereq: ['unity-3d-character', 'unity-camera-follow'],
    objectives: ['با ماوس دوربین اول‌شخص را بچرخانید.', 'بفهمید تفاوت دوربین اول‌شخص و سوم‌شخص چیست.', 'قفل ماوس را مدیریت کنید.'],
    blocks: [
      { type: 'h', text: 'دید از چشم یا از پشت سر' },
      { type: 'p', text: 'در دوربین اول‌شخص، دوربین در سر شخصیت است و ماوس جهت نگاه را تعیین می‌کند. بدنه‌ی شخصیت به چرخش افقی و دوربین به چرخش عمودی وابسته است. در دوربین سوم‌شخص، دوربین از پشت شخصیت دنبال می‌شود (مثل درس قبل).' },
      { type: 'code', code: 'using UnityEngine;\n\npublic class FirstPersonLook : MonoBehaviour\n{\n    public float sensitivity = 2f;\n    public Transform body;\n    private float pitch = 0f;\n\n    void Start()\n    {\n        Cursor.lockState = CursorLockMode.Locked;\n        Cursor.visible = false;\n    }\n\n    void Update()\n    {\n        float mx = Input.GetAxis("Mouse X") * sensitivity;\n        float my = Input.GetAxis("Mouse Y") * sensitivity;\n\n        body.Rotate(0f, mx, 0f);\n        pitch = Mathf.Clamp(pitch - my, -80f, 80f);\n        transform.localRotation = Quaternion.Euler(pitch, 0f, 0f);\n    }\n}', output: 'با حرکت ماوس، نگاه بالا و پایین و چپ و راست تغییر می‌کند.' },
      { type: 'tip', text: 'Mathf.Clamp جلوگیری از چرخش بیش از حد سر به بالا یا پایین است.' }
    ],
    quiz: [
      { q: 'در دوربین اول‌شخص کدام ورودی جهت نگاه را تعیین می‌کند؟', options: ['Horizontal', 'Mouse X و Mouse Y', 'Jump', 'Fire1'], answer: 1, explain: 'ماوس جهت نگاه را در دوربین اول‌شخص تعیین می‌کند.' },
      { q: 'Mathf.Clamp در این کد چه کاری می‌کند؟', options: ['سرعت را زیاد می‌کند', 'چرخش عمودی را محدود می‌کند', 'ماوس را حذف می‌کند', 'Scene را عوض می‌کند'], answer: 1, explain: 'Clamp مقدار pitch را بین -80 و 80 نگه می‌دارد.' }
    ]
  }, U);

  L['unity-3d-lighting'] = Object.assign({ id: 'unity-3d-lighting', title: '3D: نورپردازی پایه', prereq: ['unity-intro'],
    objectives: ['نور Directional را بشناسید و در صحنه بگذارید.', 'سایه را فعال کنید.', 'بفهمید Baking چیست و کی لازم است.'],
    blocks: [
      { type: 'h', text: 'روشن کردن صحنه' },
      { type: 'p', text: 'نور Directional مثل خورشید است و جهت آن مهم است؛ اندازه‌ی شیء بر نور تأثیری ندارد. برای سایه، در تنظیمات نور گزینه‌ی Shadow Type را روی Soft Shadows یا Hard Shadows بگذارید.' },
      { type: 'list', items: [
        'Directional Light: نور خورشید؛ جهت را با Rotation تنظیم کنید.',
        'Point و Spot Light: نور محلی از یک نقطه یا مخروط.',
        'Baked Lighting: نور و سایه‌های ثابت را از قبل محاسبه و ذخیره می‌کند تا زمان اجرا سبک‌تر شود.',
        'Realtime Lighting: نور در زمان اجرا محاسبه می‌شود؛ برای اشیای متحرک مناسب‌تر است.'
      ]},
      { type: 'tip', text: 'برای اشیای ثابت و صحنه‌های ایستا، Baking کارایی را بالا می‌برد. برای شخصیت‌های متحرک به نور Realtime نیاز دارید.' },
      { type: 'warn', text: 'اشتباه رایج: گذاشتن نورهای Realtime زیاد. هر نور اضافی هزینه‌ی محاسبه دارد و بازی را کند می‌کند.' }
    ],
    quiz: [
      { q: 'کدام نور شبیه خورشید است؟', options: ['Point Light', 'Spot Light', 'Directional Light', 'Area Light'], answer: 2, explain: 'Directional Light نور موازی و بی‌نهایت دور مانند خورشید است.' },
      { q: 'Baking برای چیست؟', options: ['ساخت شیء', 'محاسبه‌ی قبلی نور ثابت برای کاهش بار اجرا', 'پخش صدا', 'ذخیره‌ی بازی'], answer: 1, explain: 'Baking نور را از قبل محاسبه می‌کند تا زمان اجرا سبک‌تر شود.' }
    ]
  }, U);

  L['unity-optimization'] = Object.assign({ id: 'unity-optimization', title: 'بهینه‌سازی عملکرد بازی', prereq: ['unity-object-pooling', 'unity-3d-lighting'],
    objectives: ['با Profiler گلوگاه‌ها را پیدا کنید.', 'از Find و GetComponent در Update پرهیز کنید.', 'تعداد Draw Call را کم کنید.'],
    blocks: [
      { type: 'h', text: 'اول اندازه بگیرید، بعد بهینه کنید' },
      { type: 'p', text: 'قبل از بهینه‌سازی، باید بدانید کدام بخش کند است. پنجره‌ی Profiler (Window > Analysis > Profiler) زمان CPU، GPU و حافظه را نشان می‌دهد.' },
      { type: 'code', code: 'using UnityEngine;\n\npublic class Enemy : MonoBehaviour\n{\n    private Transform player;\n\n    void Start()\n    {\n        player = GameObject.FindWithTag("Player").transform;\n    }\n\n    void Update()\n    {\n        transform.position = Vector3.MoveTowards(transform.position, player.position, 2f * Time.deltaTime);\n    }\n}', output: 'دشمن به‌سمت بازیکن می‌رود؛ جستجوی بازیکن فقط یک بار در Start انجام می‌شود.' },
      { type: 'list', items: [
        'جستجو (Find) و GetComponent را در Start ذخیره کنید، نه در Update.',
        'اشیای زیاد و یکسان را با Object Pooling استفاده کنید.',
        'اشیای ثابت را Static کنید تا Batching بهتر انجام شود.',
        'تعداد نورها و سایه‌های Realtime را کم کنید.'
      ]},
      { type: 'warn', text: 'اشتباه رایج: بهینه‌سازی بدون Profiler. ممکن است تلاش شما روی بخشی باشد که اصلاً مشکل ندارد.' }
    ],
    quiz: [
      { q: 'ابزار اندازه‌گیری گلوگاه‌های عملکرد در Unity کدام است؟', options: ['Inspector', 'Profiler', 'Hierarchy', 'Tags'], answer: 1, explain: 'Profiler زمان و منابع مصرفی هر بخش را نشان می‌دهد.' },
      { q: 'چرا FindWithTag را در Update نباید صدا زد؟', options: ['خطا می‌دهد', 'هر فریم جستجو کند و کند می‌شود', 'تگ را حذف می‌کند', 'بازیکن را جابه‌جا می‌کند'], answer: 1, explain: 'جستجو در هر فریم هزینه‌ی زیادی دارد؛ بهتر است یک بار در Start انجام شود.' }
    ]
  }, U);
})();
