# Sysmax - Versão Pura em HTML / JS / CSS Estático

Esta pasta contém a **versão 100% estática em HTML** do site da Sysmax, totalmente desvinculada de Node.js em tempo de execução.

## 🚀 Como Usar esta Versão em HTML

### Opção 1: Deploy no aaPanel (Site Estático ou PHP 8.5)
1. No aaPanel, crie um novo site informando seu domínio (ex: `sysmax.com.br`).
2. Defina o tipo como **HTML estático** ou **PHP 8.5**.
3. Copie o conteúdo desta pasta (`html-version/`) diretamente para o diretório raiz do site (`/www/wwwroot/sysmax.com.br/`).
4. Pronto! O site funcionará imediatamente com máxima velocidade e sem necessidade de servidor Node.js rodando em segundo plano.

### Opção 2: cPanel / Hospedagem Compartilhada (HostGator, Locaweb, Hostinger, etc.)
1. Acesse o Gerenciador de Arquivos do seu cPanel.
2. Abra a pasta `public_html`.
3. Faça o upload de todos os arquivos desta pasta (`html-version/`).
4. O arquivo `.htaccess` incluído já garante o roteamento e cache automático.

### Opção 3: GitHub Pages / Vercel / Netlify / Cloudflare Pages / AWS S3
- Basta apontar o diretório de publicação para esta pasta `html-version` ou publicar seu conteúdo diretamente na raiz do repositório estático.

## 📁 Arquivos Incluídos:
- `index.html`: Código HTML estruturado com SEO, Core Web Vitals e montagem do app React.
- `assets/`: Bundles minificados de JavaScript e CSS com Tailwind.
- `index.php`: Wrapper PHP 8.5 opcional para servidores que priorizam PHP.
- `.htaccess`: Regras de reescrita, compressão Gzip e cache para Apache/LiteSpeed.
- `sysmax-elementor-template.json`: Template para importação no Elementor.
