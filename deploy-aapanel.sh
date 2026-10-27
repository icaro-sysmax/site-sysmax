#!/usr/bin/env bash
# ==============================================================================
# SYSMAX TECNOLOGIA - SCRIPT DE DEPLOY CONTÍNUO VIA GIT NO AAPANEL (PHP 8.5)
# ==============================================================================
# Use este script no aaPanel:
# 1. No menu "WebHook" do aaPanel, crie um novo WebHook apontando para seu repositório.
# 2. Cole este script na área de execução de tarefas.
# 3. Ou execute manualmente no terminal do aaPanel: bash deploy-aapanel.sh
# ==============================================================================

set -e

SITE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SITE_DIR"

echo "=========================================================="
echo "🚀 Iniciando Deploy Sysmax via Git no aaPanel"
echo "📅 Data: $(date '+%Y-%m-%d %H:%M:%S')"
echo "📂 Diretório: $SITE_DIR"
echo "🐘 Versão PHP: $(php -v | head -n 1 || echo 'PHP não localizado no PATH')"
echo "=========================================================="

# 1. Atualizar repositório Git
if [ -d ".git" ]; then
    echo "📥 Atualizando código do repositório Git..."
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "main")
    git fetch origin "$CURRENT_BRANCH"
    git reset --hard "origin/$CURRENT_BRANCH"
    echo "✅ Código atualizado com sucesso no branch: $CURRENT_BRANCH"
else
    echo "⚠️ Diretório .git não encontrado. Prosseguindo com build local..."
fi

# 2. Verificar ambiente Node.js / NPM para compilação
if command -v npm >/dev/null 2>&1; then
    echo "📦 Node.js e NPM detectados: $(node -v) / NPM $(npm -v)"
    echo "⚡ Instalando dependências..."
    npm install --no-audit --prefer-offline || npm install
    
    echo "🏗️ Compilando assets de produção, template Elementor e versão HTML..."
    npm run build
    echo "✅ Build concluído com sucesso!"
else
    echo "ℹ️ Node.js não detectado no servidor aaPanel."
    if [ -d "dist" ] && [ -f "dist/index.html" ]; then
        echo "✅ Diretório dist/ pré-compilado encontrado e pronto para uso."
    elif [ -d "html-version" ] && [ -f "html-version/index.html" ]; then
        echo "✅ Versão estática html-version/ pronta para uso."
    else
        echo "⚠️ Atenção: Compile os arquivos localmente com 'npm run build' e envie a pasta dist/"
    fi
fi

# 3. Ajustar permissões para o usuário padrão do aaPanel (www)
echo "🔒 Ajustando permissões de arquivos (usuário www do aaPanel)..."
if id "www" >/dev/null 2>&1; then
    chown -R www:www "$SITE_DIR" 2>/dev/null || true
fi
chmod -R 755 "$SITE_DIR" 2>/dev/null || true

# Garantir permissão de escrita no arquivo de leads (se gerado)
if [ -f "leads.log" ]; then
    chmod 666 leads.log
fi

# 4. Limpeza de Opcache e Recarregamento do PHP-FPM 8.5
echo "🔄 Recarregando serviço PHP-FPM 8.5..."
if command -v systemctl >/dev/null 2>&1; then
    systemctl reload php-fpm-85 2>/dev/null || true
elif [ -f "/etc/init.d/php-fpm-85" ]; then
    /etc/init.d/php-fpm-85 reload 2>/dev/null || true
fi

echo "=========================================================="
echo "🎉 DEPLOY CONCLUÍDO COM SUCESSO!"
echo "🌐 URL: Acesse seu domínio configurado no aaPanel"
echo "📄 Template Elementor: /api/elementor-template.json"
echo "📁 Versão HTML Pura: $SITE_DIR/html-version/"
echo "=========================================================="
exit 0
