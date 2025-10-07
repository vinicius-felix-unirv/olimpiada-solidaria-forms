// back/routes/relatorioRoutes.js

const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');

// Rota para gerar o relatório de uma questão específica
// GET /relatorios/:id_questao
router.get('/:id_questao', relatorioController.gerarRelatorioPorQuestao);

module.exports = router;