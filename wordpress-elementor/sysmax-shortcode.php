<?php
/**
 * Sysmax - Integração WordPress & Elementor via Shortcode
 * 
 * Como utilizar:
 * 1. Cole este código no arquivo `functions.php` do seu tema filho (child theme),
 *    ou adicione como um novo snippet no plugin gratuito "WPCode / Code Snippets".
 * 2. Faça o upload dos arquivos da pasta `dist/assets` para a pasta:
 *    `wp-content/uploads/sysmax/assets/`
 * 3. No Elementor, adicione um widget "Shortcode" ou "Código Curto" e insira:
 *    [sysmax_landing_page]
 * 4. Configure o modelo de página no Elementor como "Elementor Canvas".
 */

if (!defined('ABSPATH')) {
    exit; // Segurança contra acesso direto
}

function sysmax_register_landing_shortcode($atts) {
    // Busca automática dos arquivos compilados no diretório de uploads
    $upload_dir = wp_upload_dir();
    $sysmax_dir = $upload_dir['basedir'] . '/sysmax/assets';
    $sysmax_url = $upload_dir['baseurl'] . '/sysmax/assets';

    $js_file = '';
    $css_file = '';

    if (is_dir($sysmax_dir)) {
        $files = scandir($sysmax_dir);
        foreach ($files as $file) {
            if (pathinfo($file, PATHINFO_EXTENSION) === 'js' && strpos($file, 'index') !== false) {
                $js_file = $sysmax_url . '/' . $file;
            }
            if (pathinfo($file, PATHINFO_EXTENSION) === 'css' && strpos($file, 'index') !== false) {
                $css_file = $sysmax_url . '/' . $file;
            }
        }
    }

    // Fallbacks padrão caso os nomes originais sejam renomeados
    if (empty($js_file)) {
        $js_file = $sysmax_url . '/index.js';
    }
    if (empty($css_file)) {
        $css_file = $sysmax_url . '/index.css';
    }

    ob_start();
    ?>
    <div class="sysmax-wordpress-container">
        <!-- Fontes Oficiais -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
        
        <!-- CSS Compilado -->
        <link rel="stylesheet" href="<?php echo esc_url($css_file); ?>">
        
        <!-- Elemento Raiz do React -->
        <div id="root"></div>
        
        <!-- JS Compilado (ES Module) -->
        <script type="module" crossorigin src="<?php echo esc_url($js_file); ?>"></script>
        
        <style>
            html, body {
                background-color: #0B132B !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow-x: hidden !important;
            }
            .elementor-widget-shortcode {
                margin: 0 !important;
                padding: 0 !important;
            }
        </style>
    </div>
    <?php
    return ob_get_clean();
}

add_shortcode('sysmax_landing_page', 'sysmax_register_landing_shortcode');
add_shortcode('sysmax_telefonia', 'sysmax_register_landing_shortcode');
