const db = require('../config/db');
const { Alternativa } = require('../models/alternativa');
const { validarId: validarQuestaoId } = require('../models/questao');

async function salvarAlternativas(req, res) {
  try {
    const questao_id = parseInt(req.params.questao_id, 10);
    const { alternativas } = req.body;
    validarQuestaoId(questao_id);

    if (!Array.isArray(alternativas) || alternativas.length < 2) {
      throw new Error('É obrigatório fornecer pelo menos duas alternativas.');
    }
    if (alternativas.some(alt => !alt || alt.trim().length === 0)) {
      throw new Error('Alternativas não podem ser vazias.');
    }
    const descricoesUnicas = new Set(alternativas.map(alt => alt.trim()));
    if (descricoesUnicas.size !== alternativas.length) {
      throw new Error('Não é permitido adicionar alternativas com a mesma descrição.');
    }

    await db.query('DELETE FROM alternativa WHERE questao_id = $1', [questao_id]);
    
    const alternativasSalvas = [];
    for (const desc of descricoesUnicas) {
      new Alternativa(null, desc, questao_id);
      const result = await db.query('INSERT INTO alternativa (descricao, questao_id) VALUES ($1, $2) RETURNING *', [desc, questao_id]);
      alternativasSalvas.push(result.rows[0]);
    }
    
    res.status(201).json({ mensagem: 'Alternativas salvas com sucesso.', alternativas: alternativasSalvas });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}

async function listarAlternativas(req, res) {
    try {
      const questao_id = parseInt(req.params.questao_id, 10);
      validarQuestaoId(questao_id);
      const result = await db.query('SELECT * FROM alternativa WHERE questao_id = $1', [questao_id]);
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
}

module.exports = { salvarAlternativas, listarAlternativas };
