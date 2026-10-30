<?php
/**
 * Plugin Name: Sysmax - Telefonia, TI e Marketing Digital
 * Plugin URI: https://sysmax.com.br
 * Description: Landing page corporativa completa e de alta performance da Sysmax Tecnologia (PABX em Nuvem, WhatsApp Calling, Cloud Server, Suporte MSP, Locação de TI, Outsourcing de Impressão e Criação de Sites).
 * Version: 1.0.0
 * Author: Sysmax Tecnologia & Telecomunicações
 * Author URI: https://sysmax.com.br
 * License: GPL2
 * Text Domain: sysmax
 */

if (!defined('ABSPATH')) {
    exit; // Segurança contra acesso direto
}

define('SYSMAX_PLUGIN_VERSION', '1.0.0');
define('SYSMAX_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('SYSMAX_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * 1. Shortcode Principal: [sysmax_site] ou [sysmax_landing_page]
 * Permite inserir o site completo em qualquer página, widget do Elementor ou Gutenberg.
 */
function sysmax_render_landing_page($atts) {
    // Localiza dinamicamente os bundles compilados de CSS e JS na pasta do plugin
    $assets_dir = SYSMAX_PLUGIN_DIR . 'assets/';
    $assets_url = SYSMAX_PLUGIN_URL . 'assets/';

    $css_file = 'index-CvwcuY1N.css';
    $js_file = 'index-CoACIssa.js';

    if (is_dir($assets_dir)) {
        $files = scandir($assets_dir);
        foreach ($files as $file) {
            if (pathinfo($file, PATHINFO_EXTENSION) === 'css' && strpos($file, 'index') === 0) {
                $css_file = $file;
            }
            if (pathinfo($file, PATHINFO_EXTENSION) === 'js' && strpos($file, 'index') === 0) {
                $js_file = $file;
            }
        }
    }

    $css_url = $assets_url . $css_file;
    $js_url = $assets_url . $js_file;

    ob_start();
    ?>
    <div id="sysmax-wp-wrapper" class="sysmax-wordpress-container">
        <!-- Fontes Oficiais do Google -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

        <!-- Folha de Estilos Tailwind Compilada da Sysmax -->
        <link rel="stylesheet" href="<?php echo esc_url($css_url); ?>" id="sysmax-plugin-css">

        <!-- Container Raiz para Montagem da Aplicação React 19 -->
        <div id="root" class="sysmax-app-container bg-[#0B132B] text-slate-100 font-sans antialiased min-h-screen">
            <!-- Fallback visual de carregamento -->
            <div style="background-color: #0B132B; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #38bdf8; font-family: sans-serif; text-align: center; padding: 40px 20px;">
                <picture style="margin-bottom: 20px;">
                    <source media="(prefers-color-scheme: light)" srcset="https://apidata.sysmax.com.br/id-visual-chatwoot/Blue%20(2).png" />
                    <source media="(prefers-color-scheme: dark)" srcset="https://apidata.sysmax.com.br/id-visual-chatwoot/Blue.png" />
                    <img src="https://apidata.sysmax.com.br/id-visual-chatwoot/Blue.png" alt="Sysmax" style="height: 48px; width: auto;" />
                </picture>
                <div style="width: 44px; height: 44px; border: 3px solid rgba(56, 189, 248, 0.2); border-top-color: #38bdf8; border-radius: 50%; animation: sysmaxSpin 1s linear infinite; margin-bottom: 20px;"></div>
                <h2 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0 0 10px 0;">SYSMAX TECNOLOGIA & TELEFONIA</h2>
                <p style="color: #94a3b8; font-size: 14px; max-width: 480px; margin: 0;">Carregando plataforma corporativa...</p>
                <style>
                    @keyframes sysmaxSpin { to { transform: rotate(360deg); } }
                </style>
            </div>
        </div>

        <!-- Bundle JS da Aplicação -->
        <script type="module" crossorigin src="<?php echo esc_url($js_url); ?>" id="sysmax-plugin-js"></script>

        <!-- Reset de Conflitos com Temas WordPress -->
        <style>
            html, body {
                background-color: #0B132B !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow-x: hidden !important;
            }
            .elementor-section.elementor-section-boxed > .elementor-container,
            .elementor-widget-shortcode,
            .elementor-widget-html {
                padding: 0 !important;
                margin: 0 !important;
                max-width: 100% !important;
                width: 100% !important;
            }
            .elementor-page .elementor-inner {
                padding: 0 !important;
            }
        </style>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sysmax_site', 'sysmax_render_landing_page');
add_shortcode('sysmax_landing_page', 'sysmax_render_landing_page');

/**
 * 2. Adiciona Modelo de Página Nativo no WordPress: "Sysmax - Tela Cheia (Canvas)"
 * Permite ao usuário criar uma página no WordPress sem cabeçalho/rodapé do tema.
 */
function sysmax_add_page_template($templates) {
    $templates['sysmax-canvas-template.php'] = 'Sysmax - Tela Cheia (Canvas)';
    return $templates;
}
add_filter('theme_page_templates', 'sysmax_add_page_template');

function sysmax_load_page_template($template) {
    global $post;
    if ($post && get_post_meta($post->ID, '_wp_page_template', true) === 'sysmax-canvas-template.php') {
        $file = SYSMAX_PLUGIN_DIR . 'template-canvas.php';
        if (file_exists($file)) {
            return $file;
        }
    }
    return $template;
}
add_filter('template_include', 'sysmax_load_page_template');
