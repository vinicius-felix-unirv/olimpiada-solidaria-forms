# 🚀 Guia de Configuração Rápida

## 1. Pré-requisitos

Certifique-se de ter instalado:

- **PostgreSQL** (versão 13 ou superior)
- **Node.js** (versão 18 ou superior)
- **npm** (versão 8 ou superior)

## 2. Configuração do Banco de Dados

### Windows (PowerShell como Administrador)

```powershell
# Iniciar serviço do PostgreSQL (se não estiver rodando)
Start-Service postgresql-x64-14

# Conectar ao PostgreSQL
psql -U postgres

# No prompt do PostgreSQL:
CREATE DATABASE healthcare_survey;
\q
```

### Executar Migrações

```powershell
# No diretório do projeto
psql -U postgres -d healthcare_survey -f database/migrations/001_initial_schema.sql
psql -U postgres -d healthcare_survey -f database/seeds/001_sample_data.sql
```

## 3. Configuração da Aplicação

O arquivo `.env` já está configurado com valores padrão. Ajuste se necessário:

```env
DB_USER=postgres
DB_PASSWORD=postgres  # Altere para sua senha do PostgreSQL
```

## 4. Instalação e Execução

```powershell
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# A API estará disponível em: http://localhost:3000
```

## 5. Testando a API

### Health Check

```http
GET http://localhost:3000/api/health
```

### Listar Formulários

```http
GET http://localhost:3000/api/formularios
```

### Buscar Formulário Específico

```http
GET http://localhost:3000/api/formularios/1
```

### Criar Novo Formulário

```http
POST http://localhost:3000/api/formularios
Content-Type: application/json

{
  "titulo": "Meu Primeiro Formulário",
  "descricao": "Descrição do formulário",
  "questoes": [
    {
      "descricao": "Qual seu nome?",
      "tipo": "texto"
    },
    {
      "descricao": "Qual sua idade?",
      "tipo": "radio",
      "alternativas": [
        { "descricao": "18-25 anos" },
        { "descricao": "26-35 anos" },
        { "descricao": "36+ anos" }
      ]
    }
  ]
}
```

## 6. Comandos Úteis

```powershell
# Compilar TypeScript
npm run build

# Executar testes
npm test

# Iniciar em produção
npm start

# Verificar status do PostgreSQL
pg_isready
```

## 7. Resolução de Problemas

### PostgreSQL não conecta

- Verifique se o serviço está rodando: `Get-Service postgresql*`
- Inicie o serviço: `Start-Service postgresql-x64-14`
- Verifique a senha do usuário postgres

### Porta 3000 ocupada

- Altere a variável `PORT` no arquivo `.env`
- Ou finalize o processo que está usando a porta

### Erro de migração

- Verifique se o banco `healthcare_survey` existe
- Execute as migrações manualmente conforme instruções acima

## 8. Estrutura dos Dados

O sistema cria automaticamente dados de exemplo com:

- 2 formulários de demonstração
- Questões de diferentes tipos
- Alternativas para questões de múltipla escolha

Você pode visualizar os dados conectando ao banco:

```sql
psql -U postgres -d healthcare_survey
SELECT * FROM formulario;
SELECT * FROM questao;
SELECT * FROM alternativa;
```

## ✅ Próximos Passos

1. **Teste a API** usando os endpoints acima
2. **Explore os dados** no banco de dados
3. **Desenvolva outras funcionalidades** seguindo a mesma estrutura
4. **Adicione autenticação** quando necessário
5. **Implemente testes** para suas novas funcionalidades
