#!/bin/bash

# Script para configurar o banco de dados PostgreSQL
# Execute com: ./scripts/setup-db.sh

echo "🗄️  Configurando banco de dados PostgreSQL..."

# Verificar se o PostgreSQL está rodando
if ! pg_isready &> /dev/null; then
    echo "❌ PostgreSQL não está rodando. Inicie o PostgreSQL primeiro."
    exit 1
fi

# Criar banco de dados
echo "📊 Criando banco de dados..."
psql -U postgres -c "CREATE DATABASE healthcare_survey;" 2>/dev/null || echo "ℹ️  Banco de dados já existe"

# Executar migração
echo "🏗️  Executando migração..."
psql -U postgres -d healthcare_survey -f database/migrations/001_initial_schema.sql

# Inserir dados de exemplo (opcional)
read -p "🌱 Deseja inserir dados de exemplo? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Inserindo dados de exemplo..."
    psql -U postgres -d healthcare_survey -f database/seeds/001_sample_data.sql
fi

echo "✅ Configuração do banco concluída!"
echo "🔗 Para conectar: psql -U postgres -d healthcare_survey"
