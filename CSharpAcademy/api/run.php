<?php
// سرویس اجرای کد C#: دریافت کد، ساخت پروژه‌ی موقت، اجرا با محدودیت زمان/حجم، و پاسخ JSON
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

$cfg = require __DIR__ . '/config.php';

if (!$cfg['allow_remote']) {
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    if (!in_array($ip, ['127.0.0.1', '::1'], true)) {
        respond(403, ['ok' => false, 'error' => 'دسترسی از این آدرس مجاز نیست.']);
    }
}
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'فقط POST مجاز است.']);
}

$body = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($body) || !isset($body['code']) || !is_string($body['code'])) {
    respond(400, ['ok' => false, 'error' => 'ورودی نامعتبر است.']);
}
$code  = $body['code'];
$stdin = isset($body['stdin']) && is_string($body['stdin']) ? $body['stdin'] : '';

if ($code === '' || trim($code) === '') respond(400, ['ok' => false, 'error' => 'کدی برای اجرا وجود ندارد.']);
if (strlen($code) > $cfg['max_code_bytes']) respond(413, ['ok' => false, 'error' => 'کد بیش از حد طولانی است.']);
if (strlen($stdin) > $cfg['max_stdin_bytes']) respond(413, ['ok' => false, 'error' => 'ورودی بیش از حد طولانی است.']);

// ---- پروژه‌ی موقت ----
$dir = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'csrun_' . bin2hex(random_bytes(8));
if (!@mkdir($dir, 0700)) respond(500, ['ok' => false, 'error' => 'ساخت پوشه‌ی موقت ممکن نیست.']);

file_put_contents($dir . '/app.csproj', <<<XML
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>disable</Nullable>
    <InvariantGlobalization>true</InvariantGlobalization>
    <TreatWarningsAsErrors>false</TreatWarningsAsErrors>
  </PropertyGroup>
</Project>
XML);

// تنظیم UTF-8 در فایل جدا تا شماره‌ی خطوط کد کاربر تغییر نکند
file_put_contents($dir . '/ConsoleInit.cs', <<<CS
using System.Runtime.CompilerServices;
static class ConsoleInit
{
    [ModuleInitializer]
    internal static void Init()
    {
        Console.OutputEncoding = System.Text.Encoding.UTF8;
        Console.InputEncoding = System.Text.Encoding.UTF8;
    }
}
CS);
file_put_contents($dir . '/Program.cs', $code);

// ---- اجرا ----
putenv('DOTNET_CLI_TELEMETRY_OPTOUT=1');
putenv('DOTNET_NOLOGO=1');

if ($cfg['mode'] === 'docker') {
    $cmd = 'docker run --rm -i --network none'
         . ' --memory ' . escapeshellarg($cfg['docker_memory'])
         . ' --cpus ' . escapeshellarg($cfg['docker_cpus'])
         . ' --pids-limit ' . escapeshellarg($cfg['docker_pids'])
         . ' -v ' . escapeshellarg($dir . ':/app') . ' -w /app '
         . escapeshellarg($cfg['docker_image'])
         . ' dotnet run --project app.csproj';
} else {
    $cmd = 'dotnet run --project ' . escapeshellarg($dir . DIRECTORY_SEPARATOR . 'app.csproj');
}

$start = microtime(true);
$r = run_with_timeout($cmd, $dir, $stdin, (int) $cfg['timeout']);
$elapsedMs = (int) round((microtime(true) - $start) * 1000);
delete_dir($dir);

$text = $r['out'] . $r['err'];
$compileError = !$r['timedOut'] && $r['exit'] !== 0 && preg_match('/error CS\d+/', $text) === 1;

respond(200, [
    'ok'           => $r['exit'] === 0 && !$r['timedOut'],
    'stdout'       => $r['out'],
    'stderr'       => $r['err'],
    'exitCode'     => $r['exit'],
    'timedOut'     => $r['timedOut'],
    'compileError' => $compileError,
    'timeMs'       => $elapsedMs,
    'message'      => $r['timedOut'] ? 'زمان اجرا تمام شد (بیش از ' . (int) $cfg['timeout'] . ' ثانیه).' : null,
]);

// ============ توابع کمکی ============

function run_with_timeout(string $cmd, string $cwd, string $stdin, int $timeout): array
{
    $desc = [0 => ['pipe', 'r'], 1 => ['pipe', 'w'], 2 => ['pipe', 'w']];
    $proc = @proc_open($cmd, $desc, $pipes, $cwd);
    if (!is_resource($proc)) {
        return ['exit' => -1, 'out' => '', 'err' => 'اجرای دستور ممکن نیست؛ نصب dotnet و تنظیمات PHP را بررسی کنید.', 'timedOut' => false];
    }
    stream_set_blocking($pipes[1], false);
    stream_set_blocking($pipes[2], false);
    fwrite($pipes[0], $stdin);
    fclose($pipes[0]);

    $out = '';
    $err = '';
    $start = microtime(true);
    $timedOut = false;
    while (true) {
        $status = proc_get_status($proc);
        $out .= (string) stream_get_contents($pipes[1]);
        $err .= (string) stream_get_contents($pipes[2]);
        if (!$status['running']) break;
        if (microtime(true) - $start >= $timeout) {
            $timedOut = true;
            proc_terminate($proc, 9);
            break;
        }
        usleep(40000);
    }
    $out .= (string) stream_get_contents($pipes[1]);
    $err .= (string) stream_get_contents($pipes[2]);
    fclose($pipes[1]);
    fclose($pipes[2]);
    $code = proc_close($proc);

    return [
        'exit'     => $timedOut ? -1 : (int) $code,
        'out'      => mb_substr($out, 0, 20000),
        'err'      => mb_substr($err, 0, 5000),
        'timedOut' => $timedOut,
    ];
}

function delete_dir(string $dir): void
{
    if (!is_dir($dir)) return;
    foreach (scandir($dir) ?: [] as $f) {
        if ($f === '.' || $f === '..') continue;
        $p = $dir . DIRECTORY_SEPARATOR . $f;
        is_dir($p) ? delete_dir($p) : @unlink($p);
    }
    @rmdir($dir);
}

function respond(int $status, array $data): void
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}
