import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const wpElementorDir = path.resolve(rootDir, 'wordpress-elementor');

async function generateElementorJson() {
  console.log('⚡ Gerando arquivo JSON para importação no Elementor...');

  // Ensure directories exist
  if (!fs.existsSync(wpElementorDir)) {
    fs.mkdirSync(wpElementorDir, { recursive: true });
  }

  // Detect compiled asset names from dist/assets
  let cssFile = 'index.css';
  let jsFile = 'index.js';

  if (fs.existsSync(distDir)) {
    const assetsDir = path.resolve(distDir, 'assets');
    if (fs.existsSync(assetsDir)) {
      const files = fs.readdirSync(assetsDir);
      const foundCss = files.find((f) => f.startsWith('index-') && f.endsWith('.css'));
      const foundJs = files.find((f) => f.startsWith('index-') && f.endsWith('.js'));
      if (foundCss) cssFile = foundCss;
      if (foundJs) jsFile = foundJs;
    }
  }

  // Read index.html if available to extract any head tags
  let headTags = '';
  const indexPath = path.resolve(distDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    const htmlContent = fs.readFileSync(indexPath, 'utf-8');
    // Extract fonts or metadata if present
    const fontMatches = htmlContent.match(/<link[^>]+fonts[^>]+>/g);
    if (fontMatches) {
      headTags = fontMatches.join('\n');
    }
  }

  if (!headTags) {
    headTags = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">`;
  }

  // HTML content designed specifically to be editable directly in the Elementor HTML widget
  const elementorHtmlWidgetContent = `<!--
  SYSMAX TECNOLOGIA & TELEFONIA - MODELO DE PÁGINA PARA ELEMENTOR
  ==============================================================
  Este widget HTML foi configurado para ser 100% editável no painel lateral do Elementor.
  
  COMO EDITAR NO ELEMENTOR:
  1. No painel esquerdo do Elementor, clique no widget "HTML".
  2. Altere o caminho dos scripts se hospedar em pasta diferente de /wp-content/uploads/sysmax/assets/.
  3. Você pode adicionar outros widgets do Elementor acima ou abaixo desta seção livremente.
-->

${headTags}

<!-- Folha de Estilos Tailwind CSS compilada da Sysmax -->
<link rel="stylesheet" href="/wp-content/uploads/sysmax/assets/${cssFile}" id="sysmax-compiled-css">

<!-- Fallback inteligente caso os assets estejam na raiz ou subpasta -->
<script>
  (function() {
    // Detecta se os assets estão em /wp-content/uploads/sysmax/assets/ ou em caminho alternativo
    var testCss = document.getElementById('sysmax-compiled-css');
    if (testCss) {
      testCss.onerror = function() {
        console.warn('Sysmax: Tentando carregar assets de caminho relativo alternativo...');
        var altCss = document.createElement('link');
        altCss.rel = 'stylesheet';
        altCss.href = './assets/${cssFile}';
        document.head.appendChild(altCss);
      };
    }
  })();
</script>

<!-- Container Raiz da Aplicação Sysmax (Montagem do React 19) -->
<div id="root" class="sysmax-app-container bg-[#0B132B] text-slate-100 font-sans antialiased min-h-screen">
  <!-- Fallback de carregamento visual para pré-visualização no editor do Elementor -->
  <div style="background-color: #0B132B; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #38bdf8; font-family: sans-serif; text-align: center; padding: 40px 20px;">
    <picture style="margin-bottom: 20px;">
      <source media="(prefers-color-scheme: light)" srcset="https://apidata.sysmax.com.br/id-visual-chatwoot/Blue%20(2).png" />
      <source media="(prefers-color-scheme: dark)" srcset="https://apidata.sysmax.com.br/id-visual-chatwoot/Blue.png" />
      <img src="https://apidata.sysmax.com.br/id-visual-chatwoot/Blue.png" alt="Sysmax" style="height: 48px; width: auto; object-contain: contain;" />
    </picture>
    <div style="width: 44px; height: 44px; border: 3px solid rgba(56, 189, 248, 0.2); border-top-color: #38bdf8; border-radius: 50%; animation: sysmaxSpin 1s linear infinite; margin-bottom: 20px;"></div>
    <h2 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0 0 10px 0;">SYSMAX TECNOLOGIA & TELEFONIA</h2>
    <p style="color: #94a3b8; font-size: 14px; max-width: 480px; margin: 0;">Carregando plataforma corporativa com PABX em Nuvem, WhatsApp Calling, Cloud Server, Locação de TI, Outsourcing e Criação de Sites...</p>
    <style>
      @keyframes sysmaxSpin { to { transform: rotate(360deg); } }
    </style>
  </div>
</div>

<!-- Bundle JavaScript Interativo da Aplicação -->
<script type="module" src="/wp-content/uploads/sysmax/assets/${jsFile}" id="sysmax-compiled-js"></script>

<!-- Estilos Globais para garantir Compatibilidade com Temas WordPress e Elementor Canvas -->
<style>
  /* Reset de conflitos com temas WordPress (Astra, Hello Elementor, Divi, etc.) */
  html, body {
    background-color: #0B132B !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow-x: hidden !important;
  }
  .elementor-section.elementor-section-boxed > .elementor-container {
    max-width: 100% !important;
    width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  .elementor-widget-html,
  .elementor-widget-html .elementor-widget-container {
    padding: 0 !important;
    margin: 0 !important;
  }
  .elementor-page .elementor-inner {
    padding: 0 !important;
  }
  /* Estilização para o painel de edição do Elementor */
  .elementor-editor-active .sysmax-app-container {
    outline: 2px dashed rgba(56, 189, 248, 0.4);
    outline-offset: -2px;
  }
</style>
`;

  // Construct the official Elementor Template JSON Schema (version 0.4 standard)
  const elementorTemplate = {
    version: '0.4',
    title: 'Sysmax - Telefonia, TI, Cloud & Locacao (Completo)',
    type: 'page',
    page_settings: {
      template: 'elementor_canvas',
      page_background_background: 'classic',
      page_background_color: '#0B132B',
      margin: {
        unit: 'px',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        isLinked: true,
      },
      padding: {
        unit: 'px',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        isLinked: true,
      },
    },
    content: [
      {
        id: 'sysmax_sec_' + Math.random().toString(36).substring(2, 9),
        elType: 'section',
        isInner: false,
        settings: {
          layout: 'full_width',
          stretch_section: 'section-stretched',
          gap: 'no',
          content_width: {
            unit: '%',
            size: 100,
          },
          structure: '10',
          background_background: 'classic',
          background_color: '#0B132B',
          margin: {
            unit: 'px',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
            isLinked: true,
          },
          padding: {
            unit: 'px',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
            isLinked: true,
          },
          animation: '',
        },
        defaultEditSettings: {
          defaultEditRoute: 'content',
        },
        elements: [
          {
            id: 'sysmax_col_' + Math.random().toString(36).substring(2, 9),
            elType: 'column',
            isInner: false,
            settings: {
              _column_size: 100,
              _inline_size: null,
              margin: {
                unit: 'px',
                top: '0',
                right: '0',
                bottom: '0',
                left: '0',
                isLinked: true,
              },
              padding: {
                unit: 'px',
                top: '0',
                right: '0',
                bottom: '0',
                left: '0',
                isLinked: true,
              },
            },
            defaultEditSettings: {
              defaultEditRoute: 'content',
            },
            elements: [
              {
                id: 'sysmax_widget_' + Math.random().toString(36).substring(2, 9),
                elType: 'widget',
                isInner: false,
                widgetType: 'html',
                settings: {
                  html: elementorHtmlWidgetContent,
                },
                defaultEditSettings: {
                  defaultEditRoute: 'content',
                },
                elements: [],
              },
            ],
          },
        ],
      },
    ],
  };

  const jsonString = JSON.stringify(elementorTemplate, null, 2);

  // Write to wordpress-elementor/sysmax-elementor-template.json
  const targetWpJson = path.resolve(wpElementorDir, 'sysmax-elementor-template.json');
  fs.writeFileSync(targetWpJson, jsonString, 'utf-8');
  console.log(`✅ Gerado: ${targetWpJson}`);

  // Also write to dist/sysmax-elementor-template.json and dist/elementor.json if dist exists
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.resolve(distDir, 'sysmax-elementor-template.json'), jsonString, 'utf-8');
    fs.writeFileSync(path.resolve(distDir, 'elementor.json'), jsonString, 'utf-8');
    console.log(`✅ Copiado para pasta dist: dist/sysmax-elementor-template.json e dist/elementor.json`);
  }

  // Update elementor-html-widget.html with latest compiled assets
  const targetHtmlWidget = path.resolve(wpElementorDir, 'elementor-html-widget.html');
  fs.writeFileSync(targetHtmlWidget, elementorHtmlWidgetContent, 'utf-8');
  console.log(`✅ Atualizado: ${targetHtmlWidget}`);

  console.log('🎉 Modelo Elementor JSON gerado com sucesso!');
  process.exit(0);
}

generateElementorJson().catch((err) => {
  console.error('Erro ao gerar template Elementor:', err);
  process.exit(1);
});
