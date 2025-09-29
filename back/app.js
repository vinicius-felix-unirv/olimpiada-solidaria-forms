// Este é o arquivo principal do backend.
// Configura o servidor Express e integra as rotas.

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Porta do servidor (pode alterar)

// Middleware para parsear JSON
app.use(bodyParser.json());

// Integra as rotas de questões
const questaoRoutes = require('./routes/questaoRoutes');
app.use('/questoes', questaoRoutes);

// Rota raiz para teste
app.get('/', (req, res) => {
  res.send('Backend rodando!');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Quando integrar com o DB real, certifique-se de que a conexão em db.js está ativa.
// Para testar agora: rode 'node app.js' e use Postman ou curl para:
// - POST http://localhost:3000/questoes/adicionar com body { "descricao": "Qual é o seu nome?", "tipo": "texto", "formulario_id": 1 }
// - PUT http://localhost:3000/questoes/1 com body { "descricao": "Nome completo?", "tipo": "texto", "formulario_id": 1 }
// - DELETE http://localhost:3000/questoes/1
// Isso usará o mock in-memory.