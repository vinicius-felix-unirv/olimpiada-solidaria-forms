const express = require('express');
const router = express.Router();
const questaoController = require('../controllers/questaoController');

// Rota para adicionar uma questão (POST /questoes/adicionar)
router.post('/adicionar', questaoController.adicionarQuestao);

// Rota para editar uma questão (PUT /questoes/:id)
router.put('/:id', questaoController.editarQuestao);

// Rota para remover uma questão (DELETE /questoes/:id)
router.delete('/:id', questaoController.removerQuestao);

module.exports = router;
