# Healthcare Survey Backend - Módulo de Formulários

API REST para o sistema de questionários de saúde, focada na funcionalidade de **Formulários**. Esta aplicação permite criar, gerenciar e editar questionários que serão utilizados por profissionais da saúde para coleta de dados de pacientes.

## 🎯 Funcionalidade Desenvolvida

Este projeto implementa especificamente o **módulo de formulários**, que inclui:

- ✅ **CRUD completo de formulários**
- ✅ **Gerenciamento de questões** (texto, múltipla escolha radio, múltipla escolha checkbox)
- ✅ **Gerenciamento de alternativas** para questões de múltipla escolha
- ✅ **Validações de negócio** (questões de múltipla escolha devem ter pelo menos 2 alternativas)
- ✅ **API RESTful** seguindo boas práticas
- ✅ **Validação de entrada** com Joi
- ✅ **Tratamento de erros** robusto
- ✅ **Rate limiting** para proteção da API
- ✅ **Documentação completa** da API

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas com **alta coesão** e **baixo acoplamento**:

```
src/
├── config/          # Configurações (banco de dados)
├── controllers/     # Controladores (lógica de negócio)
├── models/          # Modelos e repositórios (acesso a dados)
├── routes/          # Definição das rotas da API
├── middlewares/     # Middlewares (validação, erros, rate limiting)
└── server.ts        # Ponto de entrada da aplicação
```

### Princípios Aplicados

- **Single Responsibility Principle**: Cada classe tem uma única responsabilidade
- **Dependency Injection**: Dependências são injetadas via construtor
- **Repository Pattern**: Separação entre lógica de negócio e acesso a dados
- **Error Handling**: Tratamento centralizado de erros
- **Validation**: Validação de entrada separada da lógica de negócio

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Tipagem estática
- **Express** - Framework web
- **PostgreSQL** - Banco de dados
- **Joi** - Validação de esquemas
- **Helmet** - Segurança HTTP
- **CORS** - Controle de acesso cross-origin
- **Rate Limiting** - Proteção contra spam

## 📋 Pré-requisitos

- Node.js >= 18.0.0
- npm >= 8.0.0
- PostgreSQL >= 13.0

## 🔧 Instalação

1. **Clone o repositório e instale dependências:**
   ```bash
   cd healthcare-survey-backend
   npm install
   ```

2. **Configure as variáveis de ambiente:**
   ```bash
   cp .env.example .env
   ```
   
   Edite o arquivo `.env` com suas configurações:
   ```env
   NODE_ENV=development
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=healthcare_survey
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   ```

3. **Configure o banco de dados:**
   
   **Windows:**
   ```cmd
   scripts\setup-db.bat
   ```
   
   **Linux/Mac:**
   ```bash
   chmod +x scripts/setup-db.sh
   ./scripts/setup-db.sh
   ```

4. **Inicie a aplicação:**
   ```bash
   # Desenvolvimento
   npm run dev
   
   # Produção
   npm run build
   npm start
   ```

## 📚 Documentação da API

### Base URL
```
http://localhost:3000
```

### Headers Obrigatórios
```json
{
  "Content-Type": "application/json"
}
```

---

## 🏥 Health Check

### `GET /api/health`

Verifica se a API está funcionando corretamente.

**Parâmetros:** Nenhum

**Resposta de Sucesso (200):**
```json
{
  "status": "ok",
  "timestamp": "2025-10-09T15:30:00.000Z",
  "uptime": "0 dias, 0 horas, 5 minutos"
}
```

---

## 📋 Endpoints de Formulários

### 1. `GET /api/formularios`

Lista todos os formulários ativos (sem questões).

**Parâmetros:** Nenhum

**Resposta de Sucesso (200):**
```json
[
  {
    "id": 1,
    "titulo": "Avaliação Nutricional",
    "descricao": "Questionário para avaliar hábitos alimentares",
    "instituicao": "Hospital São Paulo",
    "ativo": true,
    "created_at": "2025-10-09T10:00:00.000Z",
    "updated_at": "2025-10-09T10:00:00.000Z"
  },
  {
    "id": 2,
    "titulo": "Questionário de Saúde Mental",
    "descricao": "Avaliação do estado psicológico dos pacientes",
    "instituicao": "Clínica Bem-Estar",
    "ativo": true,
    "created_at": "2025-10-09T11:00:00.000Z",
    "updated_at": "2025-10-09T11:00:00.000Z"
  }
]
```

**Resposta de Erro (500):**
```json
{
  "error": "Erro interno do servidor",
  "message": "Erro ao buscar formulários"
}
```

---

### 2. `GET /api/formularios/:id`

Busca um formulário específico com todas suas questões e alternativas.

**Parâmetros de URL:**
- `id` (number) - ID do formulário

**Resposta de Sucesso (200):**
```json
{
  "id": 1,
  "titulo": "Avaliação Nutricional",
  "descricao": "Questionário para avaliar hábitos alimentares",
  "instituicao": "Hospital São Paulo",
  "ativo": true,
  "created_at": "2025-10-09T10:00:00.000Z",
  "updated_at": "2025-10-09T10:00:00.000Z",
  "questoes": [
    {
      "id": 1,
      "texto": "Qual sua faixa etária?",
      "tipo": "multipla_escolha",
      "obrigatoria": true,
      "ordem": 1,
      "alternativas": [
        {
          "id": 1,
          "texto": "18-25 anos",
          "ordem": 1
        },
        {
          "id": 2,
          "texto": "26-35 anos",
          "ordem": 2
        },
        {
          "id": 3,
          "texto": "36-50 anos",
          "ordem": 3
        },
        {
          "id": 4,
          "texto": "Mais de 50 anos",
          "ordem": 4
        }
      ]
    },
    {
      "id": 2,
      "texto": "Descreva seus hábitos alimentares:",
      "tipo": "texto",
      "obrigatoria": false,
      "ordem": 2,
      "alternativas": []
    }
  ]
}
```

**Resposta de Erro (404):**
```json
{
  "error": "Formulário não encontrado",
  "message": "Não foi possível encontrar o formulário com ID 999"
}
```

---

### 3. `POST /api/formularios`

Cria um novo formulário.

**Body esperado:**
```json
{
  "titulo": "Questionário de Saúde Mental",
  "descricao": "Avaliação do estado psicológico dos pacientes",
  "instituicao": "Clínica Bem-Estar"
}
```

**Campos obrigatórios:**
- `titulo` (string, 3-200 caracteres)
- `instituicao` (string, 3-200 caracteres)

**Campos opcionais:**
- `descricao` (string, máximo 1000 caracteres)

**Resposta de Sucesso (201):**
```json
{
  "id": 3,
  "titulo": "Questionário de Saúde Mental",
  "descricao": "Avaliação do estado psicológico dos pacientes",
  "instituicao": "Clínica Bem-Estar",
  "ativo": true,
  "created_at": "2025-10-09T12:00:00.000Z",
  "updated_at": "2025-10-09T12:00:00.000Z"
}
```

**Resposta de Erro de Validação (400):**
```json
{
  "error": "Dados inválidos",
  "details": [
    {
      "field": "titulo",
      "message": "Título deve ter entre 3 e 200 caracteres"
    }
  ]
}
```

---

### 4. `PUT /api/formularios/:id`

Atualiza um formulário existente.

**Parâmetros de URL:**
- `id` (number) - ID do formulário

**Body esperado:**
```json
{
  "titulo": "Avaliação Nutricional Atualizada",
  "descricao": "Questionário completo para avaliar hábitos alimentares e estilo de vida",
  "instituicao": "Hospital São Paulo - Departamento de Nutrição"
}
```

**Resposta de Sucesso (200):**
```json
{
  "id": 1,
  "titulo": "Avaliação Nutricional Atualizada",
  "descricao": "Questionário completo para avaliar hábitos alimentares e estilo de vida",
  "instituicao": "Hospital São Paulo - Departamento de Nutrição",
  "ativo": true,
  "created_at": "2025-10-09T10:00:00.000Z",
  "updated_at": "2025-10-09T13:00:00.000Z"
}
```

**Resposta de Erro (404):**
```json
{
  "error": "Formulário não encontrado",
  "message": "Não foi possível encontrar o formulário com ID 999"
}
```

---

### 5. `DELETE /api/formularios/:id`

Desativa um formulário (soft delete).

**Parâmetros de URL:**
- `id` (number) - ID do formulário

**Resposta de Sucesso (200):**
```json
{
  "message": "Formulário desativado com sucesso"
}
```

**Resposta de Erro (404):**
```json
{
  "error": "Formulário não encontrado",
  "message": "Não foi possível encontrar o formulário com ID 999"
}
```

---

## ❓ Endpoints de Questões

### 1. `POST /api/formularios/:id/questoes`

Adiciona uma nova questão a um formulário.

**Parâmetros de URL:**
- `id` (number) - ID do formulário

**Body para Questão de Múltipla Escolha:**
```json
{
  "texto": "Com que frequência você consome frutas?",
  "tipo": "multipla_escolha",
  "obrigatoria": true,
  "ordem": 2,
  "alternativas": [
    {
      "texto": "Diariamente",
      "ordem": 1
    },
    {
      "texto": "Algumas vezes por semana",
      "ordem": 2
    },
    {
      "texto": "Raramente",
      "ordem": 3
    },
    {
      "texto": "Nunca",
      "ordem": 4
    }
  ]
}
```

**Body para Questão de Texto:**
```json
{
  "texto": "Descreva seus hábitos alimentares atuais:",
  "tipo": "texto",
  "obrigatoria": false,
  "ordem": 3
}
```

**Tipos de questão válidos:**
- `texto` - Resposta em texto livre
- `multipla_escolha` - Seleção única (radio button)

**Resposta de Sucesso (201):**
```json
{
  "id": 3,
  "texto": "Com que frequência você consome frutas?",
  "tipo": "multipla_escolha",
  "obrigatoria": true,
  "ordem": 2,
  "formulario_id": 1,
  "alternativas": [
    {
      "id": 5,
      "texto": "Diariamente",
      "ordem": 1,
      "questao_id": 3
    },
    {
      "id": 6,
      "texto": "Algumas vezes por semana",
      "ordem": 2,
      "questao_id": 3
    }
  ]
}
```

---

### 2. `GET /api/formularios/:id/questoes`

Lista todas as questões de um formulário.

**Parâmetros de URL:**
- `id` (number) - ID do formulário

**Resposta de Sucesso (200):**
```json
[
  {
    "id": 1,
    "texto": "Qual sua faixa etária?",
    "tipo": "multipla_escolha",
    "obrigatoria": true,
    "ordem": 1,
    "alternativas": [
      {
        "id": 1,
        "texto": "18-25 anos",
        "ordem": 1
      },
      {
        "id": 2,
        "texto": "26-35 anos",
        "ordem": 2
      }
    ]
  },
  {
    "id": 2,
    "texto": "Descreva seus hábitos:",
    "tipo": "texto",
    "obrigatoria": false,
    "ordem": 2,
    "alternativas": []
  }
]
```

---

## 🚫 Códigos de Erro

| Código | Descrição | Quando ocorre |
|--------|-----------|---------------|
| `200` | OK | Requisição bem-sucedida |
| `201` | Created | Recurso criado com sucesso |
| `400` | Bad Request | Dados de entrada inválidos |
| `404` | Not Found | Recurso não encontrado |
| `429` | Too Many Requests | Muitas requisições (rate limit) |
| `500` | Internal Server Error | Erro interno do servidor |

---

## 📝 Exemplos de Teste

### Usando cURL:

```bash
# 1. Health Check
curl http://localhost:3000/api/health

# 2. Listar formulários
curl http://localhost:3000/api/formularios

# 3. Criar formulário
curl -X POST http://localhost:3000/api/formularios \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Teste de API",
    "descricao": "Formulário de teste",
    "instituicao": "Teste Corp"
  }'

# 4. Buscar formulário por ID
curl http://localhost:3000/api/formularios/1

# 5. Adicionar questão
curl -X POST http://localhost:3000/api/formularios/1/questoes \
  -H "Content-Type: application/json" \
  -d '{
    "texto": "Como você avalia sua saúde?",
    "tipo": "multipla_escolha",
    "obrigatoria": true,
    "ordem": 1,
    "alternativas": [
      {"texto": "Excelente", "ordem": 1},
      {"texto": "Boa", "ordem": 2},
      {"texto": "Regular", "ordem": 3},
      {"texto": "Ruim", "ordem": 4}
    ]
  }'
```

### Usando arquivo de teste (REST Client):

O projeto inclui o arquivo `api-tests.http` com exemplos prontos para teste usando a extensão REST Client do VS Code.

## 🔒 Validações Implementadas

### Formulário
- **Título**: obrigatório, 3-255 caracteres
- **Descrição**: opcional, máximo 1000 caracteres
- **Questões**: pelo menos 1 questão obrigatória

### Questões
- **Descrição**: obrigatória, 3-1000 caracteres
- **Tipo**: deve ser 'texto', 'radio' ou 'checkbox'
- **Alternativas**: 
  - Questões de múltipla escolha: mínimo 2 alternativas
  - Questões de texto: não devem ter alternativas

### Alternativas
- **Descrição**: obrigatória, 1-500 caracteres

## 🛡️ Segurança

- **Rate Limiting**: Limite de requisições por IP
- **Helmet**: Headers de segurança HTTP
- **CORS**: Controle de acesso cross-origin
- **Validação de entrada**: Sanitização e validação de todos os dados
- **SQL Injection**: Uso de queries parametrizadas
- **Error Handling**: Não exposição de dados sensíveis

## 🧪 Testes

```bash
# Executar testes
npm test

# Testes com cobertura
npm run test:coverage
```

## 📊 Banco de Dados

### Esquema Principal

```sql
-- Tabela de formulários
formulario (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)

-- Tabela de questões
questao (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    tipo VARCHAR(50) CHECK (tipo IN ('texto', 'radio', 'checkbox')),
    formulario_id INTEGER REFERENCES formulario(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)

-- Tabela de alternativas
alternativa (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    questao_id INTEGER REFERENCES questao(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)
```

## 🤝 Colaboração

Este projeto foi desenvolvido como parte de um sistema maior. Para trabalhar em outras funcionalidades:

1. **Crie uma nova branch** baseada na main:
   ```bash
   git checkout -b feature/nome-da-funcionalidade
   ```

2. **Desenvolva sua funcionalidade** seguindo a mesma estrutura de pastas

3. **Evite conflitos** mantendo as funcionalidades separadas

4. **Integração**: Use os mesmos middlewares e padrões estabelecidos

## 🚀 Deploy

### Variáveis de Ambiente - Produção

```env
NODE_ENV=production
PORT=3000
DB_HOST=seu_host_producao
DB_PORT=5432
DB_NAME=healthcare_survey
DB_USER=seu_usuario_producao
DB_PASSWORD=sua_senha_producao
```

### Build

```bash
npm run build
npm start
```

## 📝 Logs

Em desenvolvimento, os logs são exibidos no console. Em produção, configure um sistema de logs adequado.

## 🤝 Contribuição

1. Mantenha a estrutura de pastas existente
2. Siga os padrões de código estabelecidos
3. Adicione testes para novas funcionalidades
4. Mantenha a documentação atualizada
5. Use TypeScript rigorosamente

## 📄 Licença

Este projeto está sob licença ISC.

---

**Desenvolvido com ❤️ para facilitar o trabalho dos profissionais da saúde**
