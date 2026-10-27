# Guia de Deploy no aaPanel com PHP 8.5 e Versão em HTML Estático

Este guia orienta passo a passo como realizar a implantação contínua da aplicação **Sysmax Tecnologia** no **aaPanel** utilizando **PHP 8.5** via **Git**, bem como utilizar a **versão 100% em HTML estático**.

---

## 📋 Resumo da Arquitetura

O projeto foi estruturado com suporte híbrido para atender qualquer necessidade de infraestrutura:

1. **Deploy aaPanel com PHP 8.5 (Recomendado)**:
   - Utiliza `index.php` na raiz com tipagem estrita do PHP 8.5.
   - Serve os assets compilados do React 19 / Tailwind CSS em alta performance.
   - Fornece endpoints nativos em PHP:
     - `GET /api/health`: Diagnóstico do servidor aaPanel e versão do PHP.
     - `GET /api/elementor-template.json`: Download do template JSON oficial do Elementor.
     - `POST /api/lead`: Registro seguro de leads de contato sem depender de banco de dados (`leads.log`).
2. **Versão Estática em HTML (`html-version/`)**:
   - Totalmente independente de Node.js e PHP em tempo de execução.
   - Pode ser hospedada em qualquer servidor estático, cPanel, Apache, Nginx, GitHub Pages, Netlify ou Vercel.
3. **Servidor Full-Stack Node.js/Express (`server.ts`)**:
   - Mantido para desenvolvimento local (`npm run dev`) e servidores Node dedicados.

---

## 🛠️ Método 1: Deploy via Git no aaPanel com PHP 8.5

### Passo 1: Criar o Site no aaPanel
1. Acesse seu painel **aaPanel** (`https://seu-ip:8888`).
2. Vá no menu lateral **Website** -> clique em **Add site**.
3. Preencha os dados:
   - **Domain name**: `sysmax.com.br` (e `www.sysmax.com.br`).
   - **Root directory**: `/www/wwwroot/sysmax.com.br`.
   - **PHP Version**: Selecione **PHP-85** (ou PHP-8.5).
4. Clique em **Submit**.

### Passo 2: Clonar ou Conectar o Repositório Git
#### Opção A (Via Terminal SSH do aaPanel):
Acesse a pasta do site e clone o repositório:
```bash
cd /www/wwwroot/sysmax.com.br
git clone https://seu-repositorio-git.git .
```

#### Opção B (Via Módulo WebHook / Git do aaPanel):
1. No menu **App Store** do aaPanel, instale a extensão **WebHook**.
2. Adicione um novo WebHook chamado `Sysmax-Deploy`.
3. Na caixa de script do WebHook, insira:
```bash
#!/bin/bash
cd /www/wwwroot/sysmax.com.br
bash deploy-aapanel.sh
```
4. Copie a URL do WebHook gerada e cole nas configurações de Webhooks do seu GitHub/GitLab (evento *Push*).

### Passo 3: Configurar o Nginx no aaPanel
1. Na lista de sites, clique sobre o domínio `sysmax.com.br`.
2. Vá na aba **URL rewrite** (ou **Config**).
3. Copie o conteúdo do arquivo `nginx-aapanel.conf` gerado na raiz do projeto ou utilize as seguintes regras de reescrita:

```nginx
# URL Rewrite para Sysmax SPA + PHP 8.5 no aaPanel
location ~* ^/(api/elementor-template\.json|elementor\.json)$ {
    try_files /wordpress-elementor/sysmax-elementor-template.json /dist/sysmax-elementor-template.json /index.php?$query_string;
    add_header Content-Type "application/json; charset=utf-8";
    add_header Access-Control-Allow-Origin "*";
}

location / {
    try_files $uri $uri/ /dist/$uri /dist/index.html /index.php?$query_string;
}

location ~ [^/]\.php(/|$) {
    try_files $uri =404;
    fastcgi_pass unix:/tmp/php-cgi-85.sock;
    fastcgi_index index.php;
    include fastcgi.conf;
}
```
4. Clique em **Save**.

### Passo 4: Executar o Primeiro Build
No terminal do aaPanel, dentro da pasta do site:
```bash
cd /www/wwwroot/sysmax.com.br
npm install
npm run build
```
*(Se o servidor aaPanel não possuir Node.js instalado, você pode instalar o Node.js v20/v22 através do menu "App Store -> Node.js Version Manager" ou compilar em sua máquina local e subir as pastas `dist/` e `html-version/`).*

### Passo 5: Testar o Deploy
Abra em seu navegador:
- `https://sysmax.com.br/` -> Aplicação completa com menu **Marketing Digital -> Criação de Sites**, simulador interativo, PABX e Outsourcing.
- `https://sysmax.com.br/api/health` -> Retorna o status JSON confirmando a execução em PHP 8.5.
- `https://sysmax.com.br/api/elementor-template.json` -> Baixa o JSON pronto para importação no Elementor.

---

## 🌐 Método 2: Como Usar a Versão em HTML Estático

Se você deseja hospedar o site em uma hospedagem que não suporta Node.js ou prefere servir exclusivamente arquivos HTML, CSS e JavaScript estáticos:

1. Execute o comando de compilação:
   ```bash
   npm run build
   ```
   *(Este comando gera automaticamente a pasta `html-version/` com todos os arquivos prontos).*
2. Acesse a pasta `html-version/`:
   ```text
   html-version/
   ├── index.html                       # Página HTML pura com SEO e scripts
   ├── assets/                          # CSS minificado e JS com React 19
   ├── .htaccess                        # Otimizado com cache e compressão Gzip
   ├── index.php                        # Fallback PHP 8.5 opcional
   └── sysmax-elementor-template.json   # Template Elementor
   ```
3. **No aaPanel**:
   - Crie um site selecionando **Static site** (ou PHP 8.5).
   - Copie todo o conteúdo de `html-version/` para dentro de `/www/wwwroot/seu-site/`.
4. **No cPanel / HostGator / Hostinger / Locaweb**:
   - Faça upload do conteúdo da pasta `html-version/` diretamente para a pasta `public_html/`.
5. **No GitHub Pages / Netlify / Vercel**:
   - Aponte a pasta raiz de publicação para `html-version`.

---

## 🧩 Integração com WordPress / Elementor

1. Acesse o painel do seu WordPress.
2. Vá em **Modelos** -> **Modelos Salvos** -> clique em **Importar Modelos**.
3. Selecione o arquivo `wordpress-elementor/sysmax-elementor-template.json` (ou baixe via `/api/elementor-template.json`).
4. Crie uma nova página, edite com o Elementor, mude o layout da página para **Elementor Canvas** e insira o modelo importado.
5. Todo o conteúdo pode ser editado pelo widget HTML no painel lateral do Elementor.

---

## ⚠️ Resolução de Erros Comuns

### Erro `ERESOLVE could not resolve` no `npm install`
Se o seu servidor aaPanel tiver uma versão do NPM que valide rigorosamente peer dependencies (ex: `esbuild` vs `vite`), você tem 2 formas imediatas de resolver:

1. **Atualizar o repositório (`git pull`)**:
   O repositório já foi corrigido com o arquivo `.npmrc` (`legacy-peer-deps=true`) e a remoção da dependência conflitante no `package.json`.
   ```bash
   git pull origin main
   npm install
   ```

2. **Se preferir rodar manualmente sem atualizar o Git agora**:
   ```bash
   npm install --legacy-peer-deps
   # e em seguida
   npm run build
   ```

---

## 📞 Contatos & Suporte Sysmax
- **Telefone Oficial**: (61) 4042-8042
- **WhatsApp Direto**: +55 (61) 4042-8042
- **E-mail**: contato@sysmax.com.br
- **Localização**: Brasília - DF
