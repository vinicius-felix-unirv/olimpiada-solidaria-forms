const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Porta do servidor (pode alterar)

// Middleware para parsear JSON
app.use(bodyParser.json());

// Integra as rotas de questões
const questaoRoutes = require('./routes/questaoRoutes');
app.use('/questoes', questaoRoutes);

// Integra as rotas de alternativas (NOVA LINHA)
const alternativaRoutes = require('./routes/alternativaRoutes');
app.use('/alternativas', alternativaRoutes); // Define o prefixo /alternativas

// Rota raiz para teste
app.get('/', (req, res) => {
  res.send('Backend rodando!');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});