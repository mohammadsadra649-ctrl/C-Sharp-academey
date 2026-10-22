// تکمیل مسیر Unity (Unity 2019.4 و C# 7.3): دوربین، انیمیشن و Object Pooling
// بعد از unity-2019.js بارگذاری می‌شود.
(function () {
  const unity = window.CURRICULUM.topics.find(t => t.id === 'unity');
  unity.lessons.push('unity-camera-follow', 'unity-animation-basics', 'unity-object-pooling');

  const L = window.CURRICULUM.lessons;

  L['unity-camera-follow'] = {
    id: 'unity-camera-follow', title: 'دوربین دنبال‌کننده', level: 'متوسط', theme: 'unity',
    prereq: ['unity-movement', 'unity-lifecycle'],
    objectives: ['یک دوربین را به شیء هدف وصل کنید.', 'بفهمید چرا از LateUpdate استفاده می‌شود.', 'فاصله‌ی دوربین را با offset تنظیم کنید.'],
    blocks: [
      { type: 'h', text: 'دوربین بعد از حرکت شخصیت' },
      { type: 'p', text: 'دوربین باید بعد از حرکت شخصیت به موقعیت جدید برود، وگرنه لرزش دیده می‌شود. برای این کار از LateUpdate استفاده می‌کنیم که بعد از همه‌ی Update ها اجرا می‌شود. offset فاصله‌ی ثابت دوربین از هدف است و در Inspector قابل تنظیم است.' },
      { type: 'code', code: 'using UnityEngine;\n\npublic class CameraFollow : MonoBehaviour\n{\n    public Transform target;\n    public Vector3 offset = new Vector3(0f, 2f, -10f);\n\n    void LateUpdate()\n    {\n        transform.position = target.position + offset;\n    }\n}', output: 'دوربین همیشه با فاصله‌ی ثابت پشت شخصیت حرکت می‌کند.' },
      { type: 'warn', text: 'اشتباه رایج: قرار دادن این منطق در Update. ترتیب اجرای Update ها تضمین نیست و ممکن است دوربین یک فریم عقب بماند.' }
    ],
    quiz: [
      { q: 'چرا دوربین را در LateUpdate به‌روز می‌کنیم؟', options: ['سریع‌تر است', 'بعد از حرکت هدف اجرا می‌شود', 'فقط در Start کار می‌کند', 'به فیزیک نیاز دارد'], answer: 1, explain: 'LateUpdate بعد از Update ها اجرا می‌شود و موقعیت هدف را نهایی می‌بیند.' },
      { q: 'offset در این کد چه کاری می‌کند؟', options: ['سرعت را تغییر می‌دهد', 'فاصله‌ی ثابت دوربین از هدف را مشخص می‌کند', 'رنگ را عوض می‌کند', 'شیء را حذف می‌کند'], answer: 1, explain: 'offset جابه‌جایی ثابت دوربین نسبت به هدف است.' }
    ]
  };

  L['unity-animation-basics'] = {
    id: 'unity-animation-basics', title: 'سیستم انیمیشن: Animator و پارامتر', level: 'متوسط', theme: 'unity',
    prereq: ['unity-movement', 'unity-lifecycle'],
    objectives: ['بفهمید Animator و Animator Controller چه نقشی دارند.', 'یک پارامتر انیمیشن را از کد تنظیم کنید.', 'انیمیشن راه رفتن را با سرعت حرکت هماهنگ کنید.'],
    blocks: [
      { type: 'h', text: 'انیمیشن بر اساس وضعیت' },
      { type: 'p', text: 'در Unity، Animator Controller تصمیم می‌گیرد کدام انیمیشن (Clip) در چه وضعیتی پخش شود. اسکریپت با تنظیم پارامترها (مثل Speed) به Animator می‌گوید وضعیت بازی چیست.' },
      { type: 'code', code: 'using UnityEngine;\n\npublic class PlayerAnim : MonoBehaviour\n{\n    private Animator anim;\n\n    void Start()\n    {\n        anim = GetComponent<Animator>();\n    }\n\n    void Update()\n    {\n        float speed = Mathf.Abs(Input.GetAxis("Horizontal"));\n        anim.SetFloat("Speed", speed);\n    }\n}', output: 'با حرکت، انیمیشن راه رفتن پخش می‌شود.' },
      { type: 'tip', text: 'نام پارامتر ("Speed") باید دقیقاً همان نامی باشد که در Animator Controller ساخته‌اید؛ حروف بزرگ و کوچک مهم است.' },
      { type: 'warn', text: 'اشتباه رایج: صدا زدن SetFloat با نام پارامتری که وجود ندارد. Unity هشدار می‌دهد و انیمیشن تغییر نمی‌کند.' }
    ],
    quiz: [
      { q: 'کدام بخش تصمیم می‌گیرد کدام انیمیشن پخش شود؟', options: ['Rigidbody', 'Animator Controller', 'Camera', 'Canvas'], answer: 1, explain: 'Animator Controller وضعیت‌ها و انتقال بین انیمیشن‌ها را مدیریت می‌کند.' },
      { q: 'چرا Mathf.Abs برای Speed استفاده شده است؟', options: ['برای جلوگیری از مقدار منفی', 'برای افزایش سرعت', 'برای حذف انیمیشن', 'برای ساخت Prefab'], answer: 0, explain: 'سرعت راه رفتن جهت ندارد؛ قدرمطلق مقدار منفی و مثبت را یکسان می‌کند.' }
    ]
  };

  L['unity-object-pooling'] = {
    id: 'unity-object-pooling', title: 'Object Pooling: استفاده‌ی مجدد از اشیا', level: 'متوسط', theme: 'unity',
    prereq: ['unity-spawn'],
    objectives: ['بفهمید چرا ساختن و حذف مکرر اشیا هزینه دارد.', 'یک pool ساده با Queue بسازید.', 'اشیای pool را فعال و غیرفعال کنید.'],
    blocks: [
      { type: 'h', text: 'ساختن کمتر، استفاده‌ی بیشتر' },
      { type: 'p', text: 'ساختن و حذف مکرر گلوله یا دشمن باعث کند شدن بازی و فشار به Garbage Collector می‌شود. Object Pooling چند شیء را از قبل می‌سازد، آن‌ها را غیرفعال نگه می‌دارد و هر بار که لازم شد، یکی را فعال می‌کند.' },
      { type: 'code', code: 'using System.Collections.Generic;\nusing UnityEngine;\n\npublic class SimplePool : MonoBehaviour\n{\n    public GameObject prefab;\n    public int size = 10;\n    private Queue<GameObject> pool = new Queue<GameObject>();\n\n    void Start()\n    {\n        for (int i = 0; i < size; i++)\n        {\n            GameObject o = Instantiate(prefab);\n            o.SetActive(false);\n            pool.Enqueue(o);\n        }\n    }\n\n    public GameObject Get()\n    {\n        GameObject o = pool.Dequeue();\n        o.SetActive(true);\n        pool.Enqueue(o);\n        return o;\n    }\n}', output: 'اشیا از قبل ساخته و دوباره استفاده می‌شوند.' },
      { type: 'warn', text: 'این نمونه ساده است: اگر همه‌ی اشیا در حال استفاده باشند، Get همان شیء قدیمی را دوباره فعال می‌کند. در بازی واقعی باید وضعیت فعال بودن را بررسی کنید.' }
    ],
    quiz: [
      { q: 'هدف اصلی Object Pooling چیست؟', options: ['افزایش تعداد دشمنان', 'کاهش ساخت و حذف مکرر اشیا', 'حذف فیزیک', 'تغییر دوربین'], answer: 1, explain: 'با استفاده‌ی مجدد از اشیا، هزینه‌ی Instantiate و Destroy کم می‌شود.' },
      { q: 'با SetActive(false) چه اتفاقی می‌افتد؟', options: ['شیء حذف می‌شود', 'شیء غیرفعال و نامرئی می‌شود', 'بازی متوقف می‌شود', 'شیء کپی می‌شود'], answer: 1, explain: 'SetActive(false) شیء را غیرفعال می‌کند بدون اینکه از حافظه حذف شود.' }
    ]
  };
})();
