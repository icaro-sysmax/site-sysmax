<?php
/**
 * Sysmax Tecnologia & Telecomunicações
 * Roteador Inteligente PHP 8.5 para Versão HTML Estática
 */
declare(strict_types=1);

header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Referrer-Policy: strict-origin-when-cross-origin');

$requestUri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$requestUri = trim($requestUri, '/');

// Mapeamento de rotas amigáveis para arquivos HTML reais
$routeMap = [
    '' => 'index.html',
    'telefonia' => 'telefonia.html',
    'locacao-de-equipamentos' => 'locacao-de-equipamentos.html',
    'locacao' => 'locacao-de-equipamentos.html',
    'outsourcing-de-impressao' => 'outsourcing-de-impressao.html',
    'impressao' => 'outsourcing-de-impressao.html',
    'criacao-de-sites' => 'criacao-de-sites.html',
    'marketing-digital' => 'criacao-de-sites.html',
    'whatsapp-calling' => 'whatsapp-calling.html',
    'cloud-file-server' => 'cloud-file-server.html',
    'cloud' => 'cloud-file-server.html',
    'suporte-ti' => 'suporte-ti.html',
    'ti-gerenciada' => 'ti-gerenciada.html',
    'ti' => 'ti-gerenciada.html',
];

$targetHtml = $routeMap[$requestUri] ?? ($requestUri . '.html');
$filePath = __DIR__ . '/' . $targetHtml;

if (!file_exists($filePath)) {
    $filePath = __DIR__ . '/index.html';
}

if (file_exists($filePath)) {
    header('Content-Type: text/html; charset=utf-8');
    readfile($filePath);
    exit;
}

http_response_code(404);
echo "<h1>Página não encontrada</h1>";
