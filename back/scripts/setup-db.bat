@echo off
REM Script para configurar o banco de dados PostgreSQL no Windows
REM Execute com: scripts\setup-db.bat

echo 🗄️  Configurando banco de dados PostgreSQL...

REM Verificar se o PostgreSQL está acessível
pg_isready >nul 2>&1
if errorlevel 1 (
    echo ❌ PostgreSQL não está rodando. Inicie o PostgreSQL primeiro.
    exit /b 1
)

REM Criar banco de dados
echo 📊 Criando banco de dados...
psql -U postgres -c "CREATE DATABASE healthcare_survey;" 2>nul
if errorlevel 1 echo ℹ️  Banco de dados já existe

REM Executar migração
echo 🏗️  Executando migração...
psql -U postgres -d healthcare_survey -f database/migrations/001_initial_schema.sql

REM Inserir dados de exemplo (opcional)
set /p answer="🌱 Deseja inserir dados de exemplo? (y/N): "
if /i "%answer%"=="y" (
    echo 🌱 Inserindo dados de exemplo...
    psql -U postgres -d healthcare_survey -f database/seeds/001_sample_data.sql
)

echo ✅ Configuração do banco concluída!
echo 🔗 Para conectar: psql -U postgres -d healthcare_survey
pause
