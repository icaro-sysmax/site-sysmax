# Guia Oficial de Implantação e Edição no Elementor (WordPress) - Sysmax

Este projeto foi configurado com suporte nativo a **Modelos JSON do Elementor**, servidor **Express** full-stack e scripts automatizados de compilação, permitindo que a landing page seja importada com 1 clique e editada diretamente pelo plugin do Elementor no WordPress.

---

## 🎯 Método Principal: Importação Direta do Arquivo JSON no Elementor

O arquivo oficial gerado é:
📁 **`wordpress-elementor/sysmax-elementor-template.json`**  
*(Também disponível para download direto pela URL: `http://seu-servidor:3000/api/elementor-template.json?download=1` ou `/elementor.json`)*

### Passo a Passo para Importar no WordPress:

1. **Acessar o Painel do WordPress**:
   - Vá no menu lateral em **Modelos (Templates)** > **Modelos Salvos (Saved Templates)**.
2. **Importar o Modelo JSON**:
   - No topo da página, clique no botão **Importar Modelos**.
   - Selecione o arquivo **`sysmax-elementor-template.json`** e clique em **Importar Agora**.
3. **Usar em uma Página**:
   - Vá em **Páginas > Adicionar Nova**.
   - Dê o título desejado (ex: *Sysmax Soluções Corporativas*) e clique em **Editar com Elementor**.
   - No editor do Elementor, clique no ícone da **Pasta (Adicionar Modelo)**.
   - Vá na aba **Meus Modelos**, localize **"Sysmax - Telefonia, TI, Cloud & Locacao (Completo)"** e clique em **Inserir**.
   - Se o Elementor perguntar se deseja importar também as configurações do documento, clique em **Sim**.

---

## ✏️ Como Editar a Página com o Plugin Elementor

O modelo foi projetado para que o editor do Elementor tenha controle visual e de código:

1. **Edição do Widget HTML no Painel Lateral**:
   - No editor visual do Elementor, clique sobre o conteúdo da Sysmax.
   - O painel esquerdo do Elementor exibirá o campo **Código HTML**.
   - Nele você pode:
     - Ajustar o caminho dos assets (`/wp-content/uploads/sysmax/assets/...` ou URL absoluta do seu CDN/hospedagem);
     - Adicionar scripts de rastreamento específicos (Meta Pixel, Google Analytics, Tag Manager);
     - Inserir textos ou avisos personalizados.
2. **Controle de Layout da Seção**:
   - Na aba **Layout** da seção no Elementor:
     - **Largura do Conteúdo:** Largura Total (Full Width);
     - **Esticar Seção:** Ativado;
     - **Espaçamento de Colunas:** Sem Espaçamento (No Gap).
3. **Adicionar Novos Widgets Nativos do Elementor**:
   - Você pode arrastar qualquer widget nativo do Elementor (títulos, formulários do Elementor Pro, botões, carrosséis, cabeçalhos ou rodapés personalizados) acima ou abaixo da aplicação Sysmax.
4. **Configuração de Responsividade**:
   - O modelo já é 100% responsivo para Mobile, Tablet e Desktop. Você pode usar a barra de alternância responsiva do Elementor para testar ou ajustar margens adicionais.

---

## ⚙️ Arquitetura do Servidor Express & Scripts

O projeto conta com arquitetura full-stack Node.js + Express:

### Scripts Configurados no `package.json`:

- **Desenvolvimento Local com Express + Vite Middleware**:
  ```bash
  npm run dev
  ```
  Inicia `tsx server.ts` na porta 3000 com middlewares do Vite montados, hot-reload e endpoints de API ativos.

- **Compilação de Produção e Geração do JSON**:
  ```bash
  npm run build
  ```
  1. Executa o build de produção do Vite em `/dist`.
  2. Executa o script automatizado `scripts/generate-elementor-json.ts`, que identifica os hashes reais dos bundles (`index-[hash].js` e `index-[hash].css`) e regenera o `sysmax-elementor-template.json` atualizado.

- **Inicialização em Produção (Full-Stack)**:
  ```bash
  npm start
  ```
  Executa `node server.ts` em modo de produção, servindo a aplicação compilada e os endpoints da API.

- **Testes Unitários**:
  ```bash
  npm test
  ```
  Executa os testes automatizados da lógica pura com 100% de aprovação.

---

## 🌐 Endpoints da API no Express

| Rota | Descrição |
| :--- | :--- |
| `GET /api/elementor-template.json` | Baixa o arquivo JSON oficial pronto para importação no Elementor |
| `GET /api/elementor-template` | Retorna o payload JSON da estrutura do Elementor |
| `GET /elementor.json` | Alias rápido para download do JSON |
| `GET /api/health` | Status de saúde da aplicação e confirmação da disponibilidade do template |

---

## 📁 Hospedagem dos Arquivos Estáticos no WordPress

Para que os scripts e estilos sejam carregados no seu WordPress:
1. No seu servidor WordPress, acesse a pasta:
   ```text
   /wp-content/uploads/
   ```
2. Crie a pasta `sysmax/` e envie a pasta `assets/` gerada dentro de `/dist`.
3. O caminho final dos arquivos será:
   ```text
   /wp-content/uploads/sysmax/assets/
   ```
*(O template JSON já vem pré-configurado exatamente para essa estrutura padrão do WordPress).*
