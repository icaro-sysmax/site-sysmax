<?php
/**
 * Sysmax Tecnologia & Telecomunicações
 * Wrapper PHP 8.5 para versão HTML estática.
 */
declare(strict_types=1);

header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Content-Type: text/html; charset=utf-8');

$htmlFile = __DIR__ . '/index.html';
if (file_exists($htmlFile)) {
    readfile($htmlFile);
} else {
    echo "<h1>Sysmax Tecnologia</h1><p>Arquivo index.html não encontrado.</p>";
}
