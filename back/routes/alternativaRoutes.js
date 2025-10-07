const express = require('express');
const router = express.Router();
const alternativaController = require('../controllers/alternativaController');

router.post('/:questao_id', alternativaController.salvarAlternativas);
router.get('/:questao_id', alternativaController.listarAlternativas);

module.exports = router;
