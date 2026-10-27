<?php
/**
 * Sysmax Tecnologia & Telecomunicações
 * Entry point para Deploy via Git no aaPanel com PHP 8.5
 *
 * Suporta execução em Nginx / Apache / OpenLiteSpeed no aaPanel.
 * Serve a aplicação compilada, APIs REST em PHP e fallback estático em HTML.
 */

declare(strict_types=1);

// Configurações de cabeçalhos de segurança para PHP 8.5
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');

$requestUri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$requestUri = rtrim($requestUri, '/');
if (empty($requestUri)) {
    $requestUri = '/';
}

// 1. Rota de API: Template do Elementor em JSON (sem depender de Node.js)
if ($requestUri === '/api/elementor-template.json' || $requestUri === '/elementor.json' || isset($_GET['elementor_json'])) {
    $elementorJsonPath = __DIR__ . '/wordpress-elementor/sysmax-elementor-template.json';
    if (!file_exists($elementorJsonPath)) {
        $elementorJsonPath = __DIR__ . '/dist/sysmax-elementor-template.json';
    }

    if (file_exists($elementorJsonPath)) {
        header('Content-Type: application/json; charset=utf-8');
        header('Content-Disposition: attachment; filename="sysmax-elementor-template.json"');
        readfile($elementorJsonPath);
        exit;
    } else {
        http_response_code(404);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['error' => 'Template do Elementor não encontrado. Execute npm run build.'], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

// 2. Rota de API: Health Check do servidor aaPanel / PHP 8.5
if ($requestUri === '/api/health') {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'status' => 'online',
        'server' => 'aaPanel',
        'php_version' => PHP_VERSION,
        'app' => 'Sysmax Soluções em Telefonia, TI e Marketing Digital',
        'timestamp' => date('c'),
        'has_dist' => is_dir(__DIR__ . '/dist'),
        'elementor_json_available' => file_exists(__DIR__ . '/wordpress-elementor/sysmax-elementor-template.json'),
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// 3. Rota de API: Envio de Formulário de Lead / Contato em PHP 8.5
if ($requestUri === '/api/lead' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json; charset=utf-8');
    
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true) ?? $_POST;
    
    $nome = htmlspecialchars(trim((string)($data['name'] ?? '')));
    $empresa = htmlspecialchars(trim((string)($data['company'] ?? '')));
    $telefone = htmlspecialchars(trim((string)($data['phone'] ?? '')));
    $email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $servico = htmlspecialchars(trim((string)($data['service'] ?? 'Geral')));
    $mensagem = htmlspecialchars(trim((string)($data['message'] ?? $data['notes'] ?? '')));

    if (empty($nome) || empty($telefone) || !$email) {
        http_response_code(400);
        echo json_encode(['error' => 'Por favor, preencha todos os campos obrigatórios.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $protocolo = 'SMX-' . date('Y') . '-' . rand(1000, 9999);

    // Registro em log seguro de leads no servidor
    $logEntry = sprintf(
        "[%s] Protocolo: %s | Nome: %s | Empresa: %s | Tel: %s | Email: %s | Servico: %s\n",
        date('Y-m-d H:i:s'),
        $protocolo,
        $nome,
        $empresa,
        $telefone,
        $email,
        $servico
    );
    @file_put_contents(__DIR__ . '/leads.log', $logEntry, FILE_APPEND | LOCK_EX);

    echo json_encode([
        'success' => true,
        'protocol' => $protocolo,
        'message' => 'Solicitação registrada com sucesso no servidor aaPanel!',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 4. Servir a Aplicação Compilada em Produção (dist/index.html) ou index.html raiz
$indexPath = __DIR__ . '/dist/index.html';
if (!file_exists($indexPath)) {
    $indexPath = __DIR__ . '/index.html';
}

if (file_exists($indexPath)) {
    // Cache control para a página principal
    header('Cache-Control: no-cache, must-revalidate');
    header('Content-Type: text/html; charset=utf-8');
    readfile($indexPath);
    exit;
}

// Fallback amigável caso o build ainda não tenha sido executado
http_response_code(503);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Sysmax - Implantação aaPanel PHP 8.5</title>
    <style>
        body { font-family: system-ui, sans-serif; background: #0B132B; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        .card { background: #1c2541; padding: 40px; border-radius: 16px; border: 1px solid #3a506b; max-width: 500px; text-align: center; }
        h1 { color: #38bdf8; font-size: 24px; }
        p { color: #94a3b8; font-size: 14px; line-height: 1.6; }
        code { background: #0B132B; padding: 4px 8px; border-radius: 6px; color: #34d399; font-size: 13px; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Sysmax Tecnologia & Telecom</h1>
        <p>Servidor aaPanel com PHP <?= htmlspecialchars(PHP_VERSION) ?> operacional.</p>
        <p>Para gerar os arquivos estáticos de produção, execute no terminal do aaPanel:</p>
        <p><code>npm run build</code></p>
    </div>
</body>
</html>
