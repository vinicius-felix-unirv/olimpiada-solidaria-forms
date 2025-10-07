// back/app.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Integra as rotas de questões
const questaoRoutes = require('./routes/questaoRoutes');
app.use('/questoes', questaoRoutes);

// Integra as rotas de relatórios
const relatorioRoutes = require('./routes/relatorioRoutes');
app.use('/relatorios', relatorioRoutes);

// Rota raiz para teste
app.get('/', (req, res) => {
  res.send('Backend rodando!');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});