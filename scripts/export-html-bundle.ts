import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const htmlVersionDir = path.resolve(rootDir, 'html-version');
const srcImagesDir = path.resolve(rootDir, 'src/assets/images');

function copyDirRecursive(src: string, dest: string) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Definição das páginas estáticas que devem ser geradas como arquivos .html reais
const STATIC_PAGES = [
  {
    filename: 'index.html',
    view: 'telefonia' as const,
    title: 'Sysmax - Telefonia Empresarial, WhatsApp Calling, Cloud, Locação & Marketing Digital',
    description: 'PABX em Nuvem, WhatsApp Calling, Cloud Server, Locação de TI (HaaS), Outsourcing de Impressão, Criação de Sites de Alta Performance e Suporte MSP.',
    h1: 'Telefonia Empresarial, TI Corporativa e Marketing Digital',
    canonical: 'index.html',
  },
  {
    filename: 'telefonia.html',
    view: 'telefonia' as const,
    title: 'Telefonia Fixa & PABX Virtual em Nuvem | Sysmax',
    description: 'PABX Virtual em Nuvem corporativo com ramais ilimitados, URA inteligente, gravação de chamadas e redução de até 70% nos custos de telefonia.',
    h1: 'Telefonia Fixa & PABX Virtual em Nuvem',
    canonical: 'telefonia.html',
  },
  {
    filename: 'locacao-de-equipamentos.html',
    view: 'locacao' as const,
    title: 'Locação de Equipamentos de TI (HaaS) | Sysmax',
    description: 'Locação corporativa de notebooks Dell/Lenovo, desktops, servidores Xeon e infraestrutura de TI em Brasília e todo o Brasil. SLA de 4h e 100% dedutível no IRPJ.',
    h1: 'Locação de Equipamentos de TI (Hardware as a Service)',
    canonical: 'locacao-de-equipamentos.html',
  },
  {
    filename: 'locacao.html',
    view: 'locacao' as const,
    title: 'Locação de Equipamentos de TI (HaaS) | Sysmax',
    description: 'Locação corporativa de computadores, notebooks e servidores com substituição rápida e suporte incluso.',
    h1: 'Locação de Equipamentos de TI',
    canonical: 'locacao-de-equipamentos.html',
  },
  {
    filename: 'outsourcing-de-impressao.html',
    view: 'impressao' as const,
    title: 'Outsourcing de Impressão & Gestão de Bilhetagem | Sysmax',
    description: 'Outsourcing e locação de impressoras térmicas e multifuncionais em Brasília e DF. Suprimentos e manutenção inclusos, bilhetagem e redução de custos de até 40%.',
    h1: 'Outsourcing de Impressão & Bilhetagem Corporativa',
    canonical: 'outsourcing-de-impressao.html',
  },
  {
    filename: 'impressao.html',
    view: 'impressao' as const,
    title: 'Outsourcing de Impressão & Gestão de Bilhetagem | Sysmax',
    description: 'Locação de multifuncionais e gestão de suprimentos e bilhetagem de impressão corporativa.',
    h1: 'Outsourcing de Impressão',
    canonical: 'outsourcing-de-impressao.html',
  },
  {
    filename: 'criacao-de-sites.html',
    view: 'criacao-sites' as const,
    title: 'Criação de Sites de Alta Performance & Web Design | Sysmax',
    description: 'Criação de Sites Profissionais, Landing Pages de alta conversão, E-commerce e Portais Corporativos com PageSpeed 95+, Mobile-First, SEO Google e integração WhatsApp.',
    h1: 'Criação de Sites de Alta Performance & Web Design',
    canonical: 'criacao-de-sites.html',
  },
  {
    filename: 'marketing-digital.html',
    view: 'criacao-sites' as const,
    title: 'Marketing Digital & Criação de Sites | Sysmax',
    description: 'Soluções integradas de Marketing Digital e Desenvolvimento Web para empresas que buscam alta conversão e presença dominante no Google.',
    h1: 'Marketing Digital & Criação de Sites',
    canonical: 'criacao-de-sites.html',
  },
  {
    filename: 'whatsapp-calling.html',
    view: 'whatsapp-calling' as const,
    title: 'WhatsApp Calling Integrado ao PABX | Sysmax ConectSIP',
    description: 'Faça e receba ligações do WhatsApp corporativo diretamente no seu PABX em nuvem com discagem rápida e identificação verificada da empresa.',
    h1: 'WhatsApp Calling Integrado ao PABX Corporativo',
    canonical: 'whatsapp-calling.html',
  },
  {
    filename: 'cloud-file-server.html',
    view: 'cloud' as const,
    title: 'Cloud File Server Corporativo & Armazenamento Seguro | Sysmax',
    description: 'Servidor de arquivos em nuvem corporativo com sincronização contínua, permissões granulares por pasta, controle de versão e conformidade total com a LGPD.',
    h1: 'Cloud File Server Corporativo',
    canonical: 'cloud-file-server.html',
  },
  {
    filename: 'cloud.html',
    view: 'cloud' as const,
    title: 'Cloud File Server Corporativo | Sysmax',
    description: 'Armazenamento seguro em nuvem corporativo para empresas.',
    h1: 'Cloud File Server',
    canonical: 'cloud-file-server.html',
  },
  {
    filename: 'suporte-ti.html',
    view: 'suporte-ti' as const,
    title: 'Suporte de TI Gerenciado MSP N1/N2/N3 | Sysmax',
    description: 'Suporte técnico ágil de TI corporativa com Helpdesk N1, N2 e N3, monitoramento 24/7, SLA garantido em contrato e atendimento presencial e remoto.',
    h1: 'Suporte de TI Gerenciado MSP',
    canonical: 'suporte-ti.html',
  },
  {
    filename: 'ti-gerenciada.html',
    view: 'ti' as const,
    title: 'Gestão Completa de TI & Governança Corporativa | Sysmax',
    description: 'Gestão terceirizada de TI para empresas: segurança da informação, SOC/NOC proativo, infraestrutura de rede e redução de riscos operacionais.',
    h1: 'Gestão Completa de TI Corporativa',
    canonical: 'ti-gerenciada.html',
  },
  {
    filename: 'ti.html',
    view: 'ti' as const,
    title: 'Gestão de TI Corporativa | Sysmax',
    description: 'Terceirização e governança de tecnologia corporativa.',
    h1: 'Gestão de TI',
    canonical: 'ti-gerenciada.html',
  },
];

// Script JavaScript Vanilla embutido para funcionamento 100% offline e sem servidor (compatível com file:///)
const VANILLA_INTERACTIVE_SCRIPT = `
(function() {
  // 1. Suporte a Navegação de Páginas Estáticas via Links e Menus
  document.addEventListener('click', function(e) {
    var target = e.target.closest('button, a');
    if (!target) return;
    
    // Ignorar submissão de formulários
    if (target.getAttribute('type') === 'submit') return;

    var href = target.getAttribute('href');

    // Se já é um link direto para um arquivo .html, deixa o navegador navegar nativamente!
    if (href && (href.endsWith('.html') || href.includes('.html#'))) {
      return;
    }

    // Se já é um link para ancoragem interna (#id), realiza scroll suave
    if (href && href.startsWith('#')) {
      e.preventDefault();
      var id = href.substring(1);
      var el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    var text = (target.textContent || '').trim().toLowerCase();

    // Navegação contextual para os arquivos .html físicos das páginas
    var destination = null;
    if (text.includes('locação') || text.includes('locacao') || text.includes('haas')) {
      if (text.includes('impress')) {
        destination = 'outsourcing-de-impressao.html';
      } else {
        destination = 'locacao-de-equipamentos.html';
      }
    } else if (text.includes('outsourcing') || text.includes('impressão') || text.includes('impressao')) {
      destination = 'outsourcing-de-impressao.html';
    } else if (text.includes('criação de site') || text.includes('criacao de site') || text.includes('marketing digital')) {
      destination = 'criacao-de-sites.html';
    } else if (text.includes('telefonia fixa') || text.includes('pabx virtual') || target.getAttribute('aria-label') === 'Sysmax - Página Inicial' || target.getAttribute('aria-label') === 'Sysmax Telefonia e TI - Página Inicial') {
      destination = 'index.html';
    } else if (text.includes('whatsapp calling')) {
      destination = 'whatsapp-calling.html';
    } else if (text.includes('cloud file server') || text.includes('armazenamento & nuvem')) {
      destination = 'cloud-file-server.html';
    } else if (text.includes('suporte de ti') || text.includes('suporte msp') || text.includes('help desk')) {
      destination = 'suporte-ti.html';
    } else if (text.includes('gestão de ti') || text.includes('ti gerenciada') || text.includes('msp')) {
      destination = 'ti-gerenciada.html';
    } else if (text.includes('solicitar cotação') || text.includes('orçamento') || text.includes('falar com especialista') || text.includes('simular')) {
      var contactEl = document.getElementById('contato-site') || 
                       document.getElementById('contato-locacao') || 
                       document.getElementById('contato-impressao') || 
                       document.getElementById('contato-cloud') || 
                       document.getElementById('contato-suporte') || 
                       document.getElementById('form-ti') || 
                       document.getElementById('contato');
      if (contactEl) {
        e.preventDefault();
        contactEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    if (destination) {
      var currentPath = window.location.pathname.split('/').pop() || 'index.html';
      if (currentPath !== destination) {
        e.preventDefault();
        window.location.href = destination;
      }
    }
  });

  // 2. Interatividade do Menu "Serviços" (Dropdown) e Menu Mobile
  window.addEventListener('DOMContentLoaded', function() {
    // Dropdown de Serviços
    var serviceButtons = document.querySelectorAll('button');
    serviceButtons.forEach(function(btn) {
      if ((btn.textContent || '').trim().includes('Serviços')) {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          var dropdown = btn.parentElement.querySelector('.absolute');
          if (dropdown) {
            dropdown.classList.toggle('hidden');
          }
        });
      }
    });

    // FAQ Accordion Toggle
    var faqQuestions = document.querySelectorAll('button');
    faqQuestions.forEach(function(btn) {
      var nextEl = btn.nextElementSibling;
      if (nextEl && nextEl.tagName === 'DIV' && btn.querySelector('svg')) {
        btn.addEventListener('click', function() {
          nextEl.classList.toggle('hidden');
          var svg = btn.querySelector('svg');
          if (svg) svg.classList.toggle('rotate-180');
        });
      }
    });

    // Suporte ao envio de formulário direto para WhatsApp
    var forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var nameInput = form.querySelector('input[type="text"]');
        var phoneInput = form.querySelector('input[type="tel"]');
        var emailInput = form.querySelector('input[type="email"]');
        var serviceSelect = form.querySelector('select');
        var notesText = form.querySelector('textarea');

        var name = nameInput ? nameInput.value : '';
        var phone = phoneInput ? phoneInput.value : '';
        var email = emailInput ? emailInput.value : '';
        var service = serviceSelect ? serviceSelect.value : document.title;
        var notes = notesText ? notesText.value : '';

        var proto = 'SMX-2026-' + Math.floor(1000 + Math.random() * 9000);
        var msg = 'Olá Sysmax! Gostaria de uma proposta corporativa:\\n\\n' +
                  '📌 Protocolo: ' + proto + '\\n' +
                  '👤 Nome: ' + name + '\\n' +
                  '📱 Telefone: ' + phone + '\\n' +
                  '✉️ E-mail: ' + email + '\\n' +
                  '💼 Serviço de Interesse: ' + service;
        if (notes) msg += '\\n📝 Observações: ' + notes;

        var waUrl = 'https://wa.me/556140428042?text=' + encodeURIComponent(msg);
        window.open(waUrl, '_blank');
      });
    });
  });
})();
`;

async function exportHtmlBundle() {
  console.log('🚀 Iniciando Gerador de Site Estático (SSG) - Versão HTML Pura...');

  // Ensure directories exist
  if (!fs.existsSync(distDir)) {
    console.error('❌ Erro: Diretório dist/ não encontrado. Execute "vite build" primeiro.');
    process.exit(1);
  }

  if (!fs.existsSync(htmlVersionDir)) {
    fs.mkdirSync(htmlVersionDir, { recursive: true });
  }

  const htmlAssetsDir = path.resolve(htmlVersionDir, 'assets');
  if (!fs.existsSync(htmlAssetsDir)) {
    fs.mkdirSync(htmlAssetsDir, { recursive: true });
  }

  // 1. Copiar todos os arquivos compilados de dist/assets para html-version/assets
  const distAssetsDir = path.resolve(distDir, 'assets');
  if (fs.existsSync(distAssetsDir)) {
    copyDirRecursive(distAssetsDir, htmlAssetsDir);
  }

  // 2. Copiar imagens originais unhashed para assets e assets/images para compatibilidade total
  if (fs.existsSync(srcImagesDir)) {
    const imagesDestDir = path.resolve(htmlAssetsDir, 'images');
    if (!fs.existsSync(imagesDestDir)) {
      fs.mkdirSync(imagesDestDir, { recursive: true });
    }
    copyDirRecursive(srcImagesDir, imagesDestDir);
    copyDirRecursive(srcImagesDir, htmlAssetsDir);

    // Também criar pasta src/assets/images dentro de html-version caso haja links diretos
    const srcImagesMock = path.resolve(htmlVersionDir, 'src/assets/images');
    if (!fs.existsSync(srcImagesMock)) {
      fs.mkdirSync(srcImagesMock, { recursive: true });
    }
    copyDirRecursive(srcImagesDir, srcImagesMock);
  }

  // Copiar logos Sysmax locais para todas as localizações estratégicas (assets e raiz)
  const publicDir = path.resolve(rootDir, 'public');
  const logoFiles = ['sysmax-logo-dark.png', 'sysmax-logo-light.png'];
  for (const logo of logoFiles) {
    const srcLogo = path.resolve(publicDir, logo);
    if (fs.existsSync(srcLogo)) {
      fs.copyFileSync(srcLogo, path.resolve(htmlAssetsDir, logo));
      fs.copyFileSync(srcLogo, path.resolve(htmlVersionDir, logo));
      if (fs.existsSync(distDir)) {
        fs.copyFileSync(srcLogo, path.resolve(distDir, logo));
        const distAssets = path.resolve(distDir, 'assets');
        if (fs.existsSync(distAssets)) {
          fs.copyFileSync(srcLogo, path.resolve(distAssets, logo));
        }
      }
    }
  }

  // 3. Localizar arquivos compilados de CSS e JS
  let cssFile = 'index.css';
  let jsFile = 'index.js';
  const assetFiles = fs.readdirSync(htmlAssetsDir);
  const foundCss = assetFiles.find((f) => f.startsWith('index-') && f.endsWith('.css'));
  const foundJs = assetFiles.find((f) => f.startsWith('index-') && f.endsWith('.js'));
  if (foundCss) cssFile = foundCss;
  if (foundJs) jsFile = foundJs;

  console.log(`🎨 Folha de Estilos Tailwind: ${cssFile}`);
  console.log(`⚡ Script da Aplicação: ${jsFile}`);

  // 4. Iniciar servidor Vite SSR para pré-renderizar cada página com marcação HTML completa
  console.log('🏗️ Pré-renderizando componentes React em HTML puro via SSR...');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  const { default: App } = await vite.ssrLoadModule('/src/App.tsx');

  // Gerar cada página física em HTML
  for (const page of STATIC_PAGES) {
    console.log(`📄 Gerando: html-version/${page.filename} (View: ${page.view})...`);

    // Renderiza a árvore de componentes completa do React para esta página específica
    const renderedAppHtml = renderToString(
      React.createElement(App, { initialView: page.view })
    );

    // Pós-processamento dos caminhos de imagem para caminhos relativos perfeitos
    let processedHtml = renderedAppHtml
      .replace(/\/src\/assets\/images\//g, './assets/')
      .replace(/src="\/src\/assets\//g, 'src="./assets/');

    // Constrói o documento HTML 5 estático completo
    const fullHtmlDocument = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${page.title}</title>
    <meta name="description" content="${page.description}" />
    <link rel="canonical" href="${page.canonical}" />
    
    <!-- Open Graph / Redes Sociais -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${page.title}" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:image" content="https://apidata.sysmax.com.br/id-visual-chatwoot/Blue.png" />
    
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${page.title}" />
    <meta name="twitter:description" content="${page.description}" />
    <meta name="twitter:image" content="https://apidata.sysmax.com.br/id-visual-chatwoot/Blue.png" />

    <!-- Favicons Oficiais -->
    <link rel="icon" type="image/png" href="https://apidata.sysmax.com.br/id-visual-chatwoot/Blue%20(2).png" />
    <link rel="apple-touch-icon" href="https://apidata.sysmax.com.br/id-visual-chatwoot/Blue%20(2).png" />

    <!-- Fontes do Google -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

    <!-- Folha de Estilos Tailwind Compilada da Sysmax -->
    <link rel="stylesheet" href="./assets/${cssFile}">

    <style>
      /* Suporte a navegação suave e estilo escuro corporativo */
      html {
        scroll-behavior: smooth;
        background-color: #0B132B;
        color: #f8fafc;
      }
      body {
        margin: 0;
        padding: 0;
        min-height: 100vh;
        background-color: #0B132B;
        overflow-x: hidden;
      }
    </style>
  </head>
  <body class="bg-[#0B132B] text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-slate-950">
    <!-- Conteúdo Pré-Renderizado em HTML Puro da Sysmax -->
    <div id="root" class="sysmax-app-container">
      ${processedHtml}
    </div>

    <!-- Script Vanilla para Interatividade 100% Funcional sem Dependências -->
    <script>
      window.__SYSMAX_PAGE_VIEW__ = "${page.view}";
      ${VANILLA_INTERACTIVE_SCRIPT}
    </script>

    <!-- Bundle React Opcional para Progressive Enhancement em Servidores Web -->
    <script type="module" crossorigin src="./assets/${jsFile}"></script>
  </body>
</html>
`;

    // Salvar o arquivo físico na pasta html-version
    const targetFilePath = path.resolve(htmlVersionDir, page.filename);
    fs.writeFileSync(targetFilePath, fullHtmlDocument, 'utf-8');
  }

  await vite.close();

  // 5. Salvar arquivo .htaccess configurado para Apache / LiteSpeed
  const htaccessContent = `# Sysmax - Configuração Estática para Apache / LiteSpeed / cPanel
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Mapeamentos amigáveis sem extensão .html
  RewriteRule ^telefonia$ telefonia.html [L]
  RewriteRule ^locacao-de-equipamentos$ locacao-de-equipamentos.html [L]
  RewriteRule ^locacao$ locacao-de-equipamentos.html [L]
  RewriteRule ^outsourcing-de-impressao$ outsourcing-de-impressao.html [L]
  RewriteRule ^impressao$ outsourcing-de-impressao.html [L]
  RewriteRule ^criacao-de-sites$ criacao-de-sites.html [L]
  RewriteRule ^marketing-digital$ criacao-de-sites.html [L]
  RewriteRule ^whatsapp-calling$ whatsapp-calling.html [L]
  RewriteRule ^cloud-file-server$ cloud-file-server.html [L]
  RewriteRule ^suporte-ti$ suporte-ti.html [L]
  RewriteRule ^ti-gerenciada$ ti-gerenciada.html [L]

  # Se o arquivo existir, serve direto
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Fallback padrão
  RewriteRule ^ index.html [L]
</IfModule>

# Compressão Gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json application/xml image/svg+xml
</IfModule>

# Cache de Assets Estáticos
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
`;
  fs.writeFileSync(path.resolve(htmlVersionDir, '.htaccess'), htaccessContent, 'utf-8');

  // 6. Salvar index.php inteligente para servidores com PHP 8.5
  const phpContent = `<?php
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
`;
  fs.writeFileSync(path.resolve(htmlVersionDir, 'index.php'), phpContent, 'utf-8');

  // 7. Copiar também os arquivos HTML gerados para a pasta dist/ para servir no servidor Express e Nginx
  for (const page of STATIC_PAGES) {
    const srcHtml = path.resolve(htmlVersionDir, page.filename);
    const destHtml = path.resolve(distDir, page.filename);
    if (fs.existsSync(srcHtml) && fs.existsSync(distDir)) {
      fs.copyFileSync(srcHtml, destHtml);
    }
  }

  // 8. Salvar README detalhado para a versão HTML
  const readmeContent = `# Sysmax - Versão 100% Pura em HTML + CSS + JS

Esta pasta contém todos os arquivos HTML estáticos físicos e independentes de todas as páginas da Sysmax Tecnologia, com estilo Tailwind CSS embutido e interatividade pronta.

## 📁 Todas as Páginas Feitas Estão Disponíveis Fisicamente:

| Arquivo HTML | Serviço Correspondente | Descrição |
| :--- | :--- | :--- |
| index.html | Página Principal (Telefonia) | PABX Virtual em Nuvem, Telefonia Fixa VoIP, Simulador de Ramais e Formulário. |
| locacao-de-equipamentos.html | Locação de Equipamentos (HaaS) | Submenu em Serviços: Catálogo de Notebooks, Desktops, Servidores, Switches, Simulador de Locação e Economia OPEX. |
| outsourcing-de-impressao.html | Outsourcing de Impressão | Submenu em Locação: Multifuncionais, Térmicas, Bilhetagem de Impressão e Redução de até 40% em Toners. |
| criacao-de-sites.html | Criação de Sites (Web Design) | Submenu em Marketing Digital: Landing Pages, Institucional, E-commerce, Portais e Simulador de Orçamento em 5 etapas. |
| marketing-digital.html | Marketing Digital | Alias oficial da página de Criação de Sites de Alta Performance. |
| whatsapp-calling.html | WhatsApp Calling | ConectSIP, ligações corporativas pelo WhatsApp integradas no PABX. |
| cloud-file-server.html | Cloud File Server | Servidor de Arquivos em Nuvem, permissões por pasta e conformidade LGPD. |
| suporte-ti.html | Suporte de TI MSP | Helpdesk corporativo N1, N2, N3, monitoramento 24/7 e SLA de 4 horas. |
| ti-gerenciada.html | Gestão Completa de TI | Terceirização e governança estratégica de tecnologia para empresas. |

---

## 🚀 Como Usar e Testar

### 1. Testar Localmente no seu Computador (Sem Servidor):
- Basta dar dois cliques em qualquer arquivo .html (ex: criacao-de-sites.html ou locacao-de-equipamentos.html).
- A página abrirá no seu navegador (Google Chrome, Edge, Safari, Firefox) com o design visual completo, cores escuras corporativas, logos, cards e botões funcionais!

### 2. Publicar no aaPanel:
- Crie um site informando seu domínio (ex: sysmax.com.br).
- Defina como HTML Estático ou PHP 8.5.
- Copie todo o conteúdo desta pasta (html-version/) para a raiz do site (/www/wwwroot/sysmax.com.br/).
- Todas as páginas funcionarão diretamente com URLs como:
  - https://sysmax.com.br/criacao-de-sites.html (ou /criacao-de-sites)
  - https://sysmax.com.br/locacao-de-equipamentos.html (ou /locacao-de-equipamentos)
  - https://sysmax.com.br/outsourcing-de-impressao.html (ou /outsourcing-de-impressao)

### 3. Publicar no cPanel (HostGator, Hostinger, Locaweb):
- Abra a pasta public_html.
- Envie todos os arquivos desta pasta. O arquivo .htaccess incluído já cuida de remover o .html da URL e do cache rápido.
`;
  fs.writeFileSync(path.resolve(htmlVersionDir, 'README.md'), readmeContent, 'utf-8');

  console.log('🎉 Todas as páginas HTML estáticas foram geradas com sucesso!');
  console.log(`📁 Localização dos arquivos: ${htmlVersionDir}`);
  process.exit(0);
}

exportHtmlBundle().catch((err) => {
  console.error('Erro ao gerar bundle HTML estático:', err);
  process.exit(1);
});
