// پروژه‌های Unity کامل‌تر: پلتفرمر دوبعدی با منو و ذخیره، و ماز سه‌بعدی با کلید و در
(function () {
  const projects = window.CURRICULUM.topics.find(t => t.id === 'projects');
  projects.lessons.push('project-unity-platformer', 'project-unity-3d-maze');
  const L = window.CURRICULUM.lessons;

  L['project-unity-platformer'] = {
    id: 'project-unity-platformer', title: 'پروژه‌ی Unity: پلتفرمر دوبعدی کامل (منو، جان، دشمن، ذخیره)', level: 'متوسط', theme: 'unity',
    prereq: ['unity-2d-health', 'unity-menu-scenes', 'unity-save-progress', 'unity-camera-follow', 'unity-2d-physics'],
    objectives: ['یک بازی دوبعدی با چند مرحله بسازید.', 'دشمن با حرکت رفت‌وبرگشتی و آسیب به بازیکن داشته باشید.', 'پیشرفت مرحله‌ها را با PlayerPrefs ذخیره کنید.'],
    blocks: [
      { type: 'h', text: 'نقشه‌ی پروژه' },
      { type: 'list', items: [
        'Scene "Menu": دکمه‌ی Play که مرحله‌ی باز شده را بارگذاری می‌کند.',
        'Scene "Level1" و "Level2": زمین، سکو، سکه، دشمن و پرچم پایان.',
        'شخصیت (Player) با Platformer (از درس پرش)، و دوربین با CameraFollow.',
        'دشمن با Patrol حرکت می‌کند و با برخورد به بازیکن آسیب می‌زند.',
        'GameManager امتیاز را نگه می‌دارد و با رسیدن به پرچم، مرحله‌ی بعد را باز می‌کند.'
      ]},
      { type: 'h', text: 'اسکریپت دشمن (حرکت رفت‌وبرگشتی)' },
      { type: 'code', code: 'using UnityEngine;\n\npublic class Patrol : MonoBehaviour\n{\n    public float speed = 2f;\n    public float distance = 3f;\n    private Vector3 start;\n    private int dir = 1;\n\n    void Start()\n    {\n        start = transform.position;\n    }\n\n    void Update()\n    {\n        transform.Translate(Vector3.right * dir * speed * Time.deltaTime);\n        if (transform.position.x > start.x + distance) dir = -1;\n        if (transform.position.x < start.x - distance) dir = 1;\n    }\n}' },
      { type: 'h', text: 'آسیب به بازیکن از دشمن' },
      { type: 'code', code: 'using UnityEngine;\n\npublic class EnemyDamage : MonoBehaviour\n{\n    void OnTriggerEnter2D(Collider2D other)\n    {\n        if (other.CompareTag("Player"))\n        {\n            FindObjectOfType<GameManager>().PlayerHit();\n        }\n    }\n}' },
      { type: 'h', text: 'مدیر بازی: امتیاز، جان و پایان مرحله' },
      { type: 'code', code: 'using UnityEngine;\nusing UnityEngine.SceneManagement;\nusing UnityEngine.UI;\n\npublic class GameManager : MonoBehaviour\n{\n    public Text scoreText;\n    public int lives = 3;\n    private int score = 0;\n\n    public void AddScore(int amount)\n    {\n        score += amount;\n        scoreText.text = "امتیاز: " + score;\n    }\n\n    public void PlayerHit()\n    {\n        lives--;\n        if (lives <= 0)\n        {\n            SceneManager.LoadScene("Menu");\n        }\n    }\n\n    public void LevelComplete()\n    {\n        int next = SceneManager.GetActiveScene().buildIndex + 1;\n        PlayerPrefs.SetInt("UnlockedLevel", next);\n        PlayerPrefs.Save();\n        SceneManager.LoadScene("Menu");\n    }\n}', output: 'امتیاز و جان مدیریت می‌شوند؛ با پایان مرحله، پیشرفت ذخیره می‌شود.' },
      { type: 'h', text: 'راهنمای تست' },
      { type: 'list', items: [
        'ابتدا Build Settings را با همه‌ی Sceneها پر کنید.',
        'روی پرچم پایان، Trigger بگذارید که LevelComplete را صدا بزند.',
        'منو را بسته به UnlockedLevel طوری تنظیم کنید که فقط مرحله‌های باز را نشان دهد.'
      ]},
      { type: 'warn', text: 'اشتباه رایج: Scene جدید را به Build Settings اضافه نکردن؛ باعث خطای LoadScene می‌شود.' },
      { type: 'h', text: 'چالش تکمیلی' },
      { type: 'p', text: 'یک نوار جان روی UI اضافه کنید و هنگام بازگشت به منو، جان را به مقدار اولیه برگردانید.' }
    ],
    quiz: [
      { q: 'برای ذخیره‌ی مرحله‌ی باز شده از چه کلاسی استفاده شد؟', options: ['File', 'PlayerPrefs', 'Random', 'Physics2D'], answer: 1, explain: 'PlayerPrefs مقادیر ساده مثل شماره‌ی مرحله را نگه می‌دارد.' },
      { q: 'دشمن چرا با OnTriggerEnter2D آسیب می‌زند؟', options: ['برای سرعت', 'تا با برخورد با Trigger بازیکن رویداد تولید شود', 'Trigger لازم نیست', 'برای صدا'], answer: 1, explain: 'Trigger بدون توقف فیزیکی، رویداد برخورد را تولید می‌کند.' }
    ]
  };

  L['project-unity-3d-maze'] = {
    id: 'project-unity-3d-maze', title: 'پروژه‌ی Unity: ماز سه‌بعدی با کلید و در', level: 'متوسط', theme: 'unity',
    prereq: ['unity-3d-character', 'unity-3d-camera', 'unity-3d-lighting', 'unity-optimization'],
    objectives: ['یک ماز سه‌بعدی با کنترل اول‌شخص بسازید.', 'با Trigger کلید بردارید و در را باز کنید.', 'نورپردازی و بهینه‌سازی ساده را در پروژه اعمال کنید.'],
    blocks: [
      { type: 'h', text: 'نقشه‌ی پروژه' },
      { type: 'list', items: [
        'شخصیت با CharacterController و دوربین اول‌شخص (درس‌های قبلی).',
        'دیوارها و زمین به‌صورت Cube/Plane با Static برای بهینه‌سازی.',
        'یک Directional Light برای نور اصلی؛ نورهای Realtime را کم نگه دارید.',
        'یک کلید (Trigger) که با برخورد بازیکن، در را باز می‌کند.',
        'یک پرچم پایان که با برخورد، پیام برد نمایش می‌دهد.'
      ]},
      { type: 'h', text: 'کلید و در' },
      { type: 'code', code: 'using UnityEngine;\n\npublic class KeyPickup : MonoBehaviour\n{\n    public Door door;\n\n    void OnTriggerEnter(Collider other)\n    {\n        if (other.CompareTag("Player"))\n        {\n            door.Open();\n            gameObject.SetActive(false);\n        }\n    }\n}\n\npublic class Door : MonoBehaviour\n{\n    public void Open()\n    {\n        gameObject.SetActive(false);\n    }\n}', output: 'با برداشتن کلید، در ناپدید می‌شود و راه باز می‌شود.' },
      { type: 'h', text: 'پیام پایان' },
      { type: 'code', code: 'using UnityEngine;\n\npublic class Goal : MonoBehaviour\n{\n    void OnTriggerEnter(Collider other)\n    {\n        if (other.CompareTag("Player"))\n        {\n            Debug.Log("برنده شدی!");\n        }\n    }\n}' },
      { type: 'warn', text: 'اشتباه رایج: تگ Player را روی شخصیت نگذاشتن. CompareTag بدون تگ درست برخورد را تشخیص نمی‌دهد.' },
      { type: 'tip', text: 'برای بهینه‌سازی، دیوارهای ثابت را Static کنید و از Baked Lighting برای محیط استفاده کنید. Profiler را بعد از هر تغییر بزرگ بررسی کنید.' },
      { type: 'h', text: 'چالش تکمیلی' },
      { type: 'p', text: 'یک تایمر اضافه کنید که زمان رسیدن به پرچم را نشان دهد؛ از Time.time استفاده کنید.' }
    ],
    quiz: [
      { q: 'برای تشخیص برخورد کلید در فضای سه‌بعدی کدام متد صدا زده می‌شود؟', options: ['OnTriggerEnter2D', 'OnTriggerEnter', 'Start', 'Update'], answer: 1, explain: 'در فضای سه‌بعدی از OnTriggerEnter با Collider استفاده می‌شود.' },
      { q: 'چرا دیوارهای ثابت را Static می‌کنیم؟', options: ['برای رنگ', 'تا Unity بتواند کارآمدتر رندر و نور بپزد', 'برای حذف فیزیک', 'لازم نیست'], answer: 1, explain: 'اشیای Static در بهینه‌سازی رندر و Baking استفاده می‌شوند.' }
    ]
  };
})();
