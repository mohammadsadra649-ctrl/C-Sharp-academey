<?php
// تنظیمات سرویس اجرای کد
return [
    // 'local'  : اجرای مستقیم dotnet روی همین سیستم (برای XAMPP روی localhost)
    // 'docker' : اجرای داخل کانتینر ایزوله (برای استفاده‌ی عمومی؛ Docker Desktop لازم است)
    'mode' => 'local',
    'timeout' => 10,            // ثانیه
    'max_code_bytes' => 8000,
    'max_stdin_bytes' => 2000,
    'allow_remote' => false,    // false یعنی فقط از 127.0.0.1 و ::1 پذیرفته شود
    'docker_image' => 'mcr.microsoft.com/dotnet/sdk:8.0',
    'docker_memory' => '256m',
    'docker_cpus' => '0.5',
    'docker_pids' => '64',
];
