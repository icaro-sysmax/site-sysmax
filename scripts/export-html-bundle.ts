import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const htmlVersionDir = path.resolve(rootDir, 'html-version');

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

async function exportHtmlBundle() {
  console.log('📦 Gerando versão estática pura em HTML para deploy imediato...');

  if (!fs.existsSync(distDir)) {
    console.error('❌ Erro: Diretório dist/ não encontrado. Execute "vite build" primeiro.');
    process.exit(1);
  }

  // Ensure target html-version directory exists
  if (!fs.existsSync(htmlVersionDir)) {
    fs.mkdirSync(htmlVersionDir, { recursive: true });
  }

  // Copy dist contents to html-version
  copyDirRecursive(distDir, htmlVersionDir);

  // Standalone .htaccess for Apache / LiteSpeed in html-version
  const htaccessContent = `# Sysmax - Configuração Estática para Apache / LiteSpeed
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
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

  // Standalone index.php for environments that default to index.php or use PHP 8.5
  const phpContent = `<?php
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
`;
  fs.writeFileSync(path.resolve(htmlVersionDir, 'index.php'), phpContent, 'utf-8');

  // Standalone README for html-version
  const readmeContent = `# Sysmax - Versão Pura em HTML / JS / CSS Estático

Esta pasta contém a **versão 100% estática em HTML** do site da Sysmax, totalmente desvinculada de Node.js em tempo de execução.

## 🚀 Como Usar esta Versão em HTML

### Opção 1: Deploy no aaPanel (Site Estático ou PHP 8.5)
1. No aaPanel, crie um novo site informando seu domínio (ex: \`sysmax.com.br\`).
2. Defina o tipo como **HTML estático** ou **PHP 8.5**.
3. Copie o conteúdo desta pasta (\`html-version/\`) diretamente para o diretório raiz do site (\`/www/wwwroot/sysmax.com.br/\`).
4. Pronto! O site funcionará imediatamente com máxima velocidade e sem necessidade de servidor Node.js rodando em segundo plano.

### Opção 2: cPanel / Hospedagem Compartilhada (HostGator, Locaweb, Hostinger, etc.)
1. Acesse o Gerenciador de Arquivos do seu cPanel.
2. Abra a pasta \`public_html\`.
3. Faça o upload de todos os arquivos desta pasta (\`html-version/\`).
4. O arquivo \`.htaccess\` incluído já garante o roteamento e cache automático.

### Opção 3: GitHub Pages / Vercel / Netlify / Cloudflare Pages / AWS S3
- Basta apontar o diretório de publicação para esta pasta \`html-version\` ou publicar seu conteúdo diretamente na raiz do repositório estático.

## 📁 Arquivos Incluídos:
- \`index.html\`: Código HTML estruturado com SEO, Core Web Vitals e montagem do app React.
- \`assets/\`: Bundles minificados de JavaScript e CSS com Tailwind.
- \`index.php\`: Wrapper PHP 8.5 opcional para servidores que priorizam PHP.
- \`.htaccess\`: Regras de reescrita, compressão Gzip e cache para Apache/LiteSpeed.
- \`sysmax-elementor-template.json\`: Template para importação no Elementor.
`;
  fs.writeFileSync(path.resolve(htmlVersionDir, 'README.md'), readmeContent, 'utf-8');

  console.log(`✅ Versão HTML exportada com sucesso em: ${htmlVersionDir}`);
}

exportHtmlBundle().catch((err) => {
  console.error('Erro ao exportar versão HTML:', err);
  process.exit(1);
});
