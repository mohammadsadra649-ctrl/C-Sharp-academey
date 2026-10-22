# پکیج اسکریپت‌های پروژه‌های Unity (Unity 2019.4 LTS)

این پوشه اسکریپت‌های آماده‌ی دو پروژه‌ی آموزشی را دارد:
- **پلتفرمر دوبعدی**: PlayerController2D، EnemyPatrol، Coin، GameManager، MainMenu، CameraFollow
- **ماز/سه‌بعدی**: ThirdPersonMove، FirstPersonLook، SimplePool

## روش استفاده
1. یک پروژه‌ی جدید در Unity 2019.4 LTS با قالب 2D (برای پلتفرمر) یا 3D (برای ماز) بسازید.
2. محتوای پوشه‌ی `Assets/Scripts` را داخل پوشه‌ی Assets پروژه‌ی خود کپی کنید.
3. Scene ها را بسازید: Menu، Level1 و Level2 (برای پلتفرمر). Level ها را در Build Settings به ترتیب اضافه کنید.
4. تگ‌های Player و Enemy را در Tag Manager تعریف کنید و به شخصیت و دشمن بدهید.
5. روی شخصیت Rigidbody2D (یا Rigidbody برای 3D)، Collider و اسکریپت کنترل را بگذارید.
6. در Inspector فیلدهای عمومی (groundCheck، groundLayer، scoreText، target و...) را پر کنید.
7. دکمه‌های UI را با onClick به MainMenu.PlayGame و MainMenu.QuitGame وصل کنید.

## یادداشت
- این اسکریپت‌ها هماهنگ با درس‌های پروژه‌های Unity در سایت نوشته شده‌اند.
- فایل‌های Scene و Prefab به‌صورت آماده همراه این پکیج نیستند، چون باید داخل Unity ساخته شوند؛ مراحل بالا آن‌ها را راهنمایی می‌کند.
- برای اجرا باید Unity 2019.4 را داشته باشید؛ کدها در محیط اجرایی این سایت قابل اجرا نیستند.
