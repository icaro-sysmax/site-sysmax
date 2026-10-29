# 🚀 Guia Definitivo: Como Exportar e Usar o Site no WordPress & Elementor

Se você está tendo dificuldades para exportar o site para o WordPress, não se preocupe! Desenvolvemos **4 métodos simples**, desde uma instalação em 1 clique via plugin até a importação direta no Elementor.

---

## 🏆 MÉTODO 1 (O MAIS FÁCIL): Instalar o Plugin Oficial em 1 Clique

Criamos um **Plugin WordPress completo e pronto para uso** (`sysmax-landing-page.zip`) que já contém todos os scripts, estilos Tailwind, imagens e formulários compactados. Com ele, você não precisa configurar FTP nem pastas manuais.

### Passo a Passo:
1. **Baixar o arquivo do Plugin**:
   - Pegue o arquivo `sysmax-landing-page.zip` gerado na pasta `wordpress-elementor/` do seu projeto.
   - Ou baixe diretamente pelo seu navegador acessando a URL do seu servidor:
     ```text
     https://seu-dominio.com.br/api/download-wordpress-plugin
     # ou
     https://seu-dominio.com.br/sysmax-landing-page.zip
     ```
2. **Instalar no seu WordPress**:
   - Acesse o painel administrativo do WordPress (`seusite.com.br/wp-admin`).
   - No menu lateral esquerdo, vá em **Plugins** > **Adicionar Novo (Add New)**.
   - No topo, clique no botão **Enviar Plugin (Upload Plugin)**.
   - Selecione o arquivo **`sysmax-landing-page.zip`** e clique em **Instalar Agora**.
   - Em seguida, clique em **Ativar Plugin**.
3. **Publicar a Página (2 formas)**:
   - **Forma A (Sem Elementor - Mais rápida)**:
     - Vá em **Páginas > Adicionar Nova**.
     - No menu lateral direito da página, em **Modelo (Page Template)**, selecione **Sysmax - Tela Cheia (Canvas)**.
     - Clique em **Publicar**. Pronto! Sua landing page corporativa estará no ar!
   - **Forma B (Dentro do Elementor)**:
     - Crie uma nova página e clique em **Editar com Elementor**.
     - Nas configurações da página (ícone de engrenagem no canto inferior esquerdo), mude o **Layout da Página** para **Elementor Canvas**.
     - Arraste o widget **Shortcode (Código Curto)** para a página.
     - Digite:
       ```text
       [sysmax_site]
       ```
     - Clique em **Publicar** / **Atualizar**.

---

## ⚡ MÉTODO 2: Copiar e Colar no Widget HTML do Elementor (Sem Upload)

Se você não quiser instalar plugins extras e já usa o Elementor:

1. **Abrir o arquivo de código**:
   - Abra o arquivo **`wordpress-elementor/elementor-html-widget.html`** no seu editor de texto ou bloco de notas.
   - Copie todo o código (Ctrl + A e depois Ctrl + C).
2. **Colar no Elementor**:
   - No WordPress, vá em **Páginas > Adicionar Nova** e clique em **Editar com Elementor**.
   - No canto inferior esquerdo (ícone da engrenagem), mude o **Layout da Página** para **Elementor Canvas** (para remover cabeçalhos/rodapés do tema WordPress).
   - Na barra de widgets à esquerda, procure por **HTML** e arraste para o meio da tela.
   - No campo de texto **Código HTML**, cole o código copiado.
   - Clique em **Publicar**.

---

## 📄 MÉTODO 3: Importação do Modelo JSON no Elementor

Se você deseja importar o modelo oficial `.json` do Elementor:

### ⚠️ Importante antes de importar:
Por segurança, o WordPress bloqueia o upload de arquivos `.json` por padrão. Para liberar:
1. No menu lateral do WordPress, vá em **Elementor > Configurações > Avançado**.
2. Localize a opção **"Habilitar uploads de arquivos não filtrados"** (Enable Unfiltered File Uploads).
3. Mude para **Habilitar (Enable)** e clique em **Salvar alterações**.

### Como Importar:
1. **Baixar o arquivo JSON**:
   - Acesse no navegador: `https://seu-dominio.com.br/api/elementor-template.json` (ou pegue em `wordpress-elementor/sysmax-elementor-template.json`).
2. **Importar no WordPress**:
   - Vá no menu lateral em **Modelos (Templates) > Modelos Salvos**.
   - No topo, clique em **Importar Modelos**.
   - Selecione o arquivo `sysmax-elementor-template.json` e clique em **Importar Agora**.
3. **Inserir em uma Página**:
   - Crie uma nova página, defina o layout para **Elementor Canvas** e clique em **Editar com Elementor**.
   - Clique no ícone de pasta cinza (**Adicionar Modelo**).
   - Vá na aba **Meus Modelos**, localize **"Sysmax - Telefonia, TI, Cloud & Locacao"** e clique em **Inserir**.
   - Se perguntar sobre importar configurações do documento, clique em **Sim**.

---

## 🌐 MÉTODO 4: Servir em Subpasta ou Subdomínio (Sem Depender de WordPress)

Se você deseja a máxima velocidade possível (Nota 100 no Google PageSpeed):

1. Acesse o Gerenciador de Arquivos do seu servidor (aaPanel ou cPanel).
2. Crie uma pasta dentro da raiz do seu WordPress chamada, por exemplo, `/lp/` ou `/solucoes/` (caminho: `/public_html/lp/`).
3. Envie todo o conteúdo da pasta **`html-version/`** para dentro dessa nova pasta.
4. Seu site funcionará instantaneamente no link:
   ```text
   https://seusite.com.br/lp/
   ```
   *(Completamente funcional, com menus, simuladores e formulários de WhatsApp).*

---

## ❓ Principais Dúvidas e Soluções (Troubleshooting)

| Dúvida / Erro comum | Solução |
| :--- | :--- |
| **"Desculpe, este tipo de arquivo não é permitido por razões de segurança" ao enviar JSON** | Use o **Método 1 (Plugin .zip)** ou habilite em *Elementor > Configurações > Avançado > Habilitar uploads não filtrados*. |
| **A página fica com o cabeçalho/menu antigo do meu tema WordPress em cima** | Mude o modelo da página para **Elementor Canvas** (no editor do Elementor, clique na engrenagem no rodapé esquerdo e mude "Layout da Página" para "Elementor Canvas"). |
| **Aparece uma barra branca nas laterais** | Na seção do Elementor, defina **Largura do Conteúdo = Largura Total** e **Espaçamento = Sem Espaçamento**. |
| **Quero alterar o número do WhatsApp de destino** | O número padrão é `(61) 4042-8042`. Você pode alterar diretamente pelo widget HTML ou no arquivo do plugin. |
