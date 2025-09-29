// Este arquivo contém a lógica de negócios para as questões.
// Inclui os métodos de adicionar, editar e remover questão.
// Deixei espaço para operações com alternativas (João Lázaro pode adicionar funções aqui ou em outro controller).

const db = require('../config/db'); // Conexão com DB (ou mock)
const { Questao } = require('../models/questao');

// Função para adicionar uma questão
async function adicionarQuestao(req, res) {
  try {
    const { descricao, tipo, formulario_id } = req.body;

    // Cria uma instância do modelo para validação (sem ID, pois é gerado pelo DB)
    new Questao(null, descricao, tipo, formulario_id);

    // Query SQL para inserir a questão
    // Quando usar DB real, isso insere na tabela 'questao'
    const queryText = 'INSERT INTO questao (descricao, tipo, formulario_id) VALUES ($1, $2, $3) RETURNING *';
    const result = await db.query(queryText, [descricao.trim(), tipo, formulario_id]);

    // Retorna a questão adicionada
    const questaoAdicionada = result.rows[0];
    res.status(201).json(questaoAdicionada);
  } catch (error) {
    console.error('Erro ao adicionar questão:', error);
    res.status(400).json({ erro: error.message });
  }
}

// Função para editar uma questão
async function editarQuestao(req, res) {
  try {
    const { id } = req.params;
    const { descricao, tipo, formulario_id } = req.body;

    // Valida o ID da URL
    const idNum = parseInt(id, 10);
    new Questao(idNum, descricao, tipo, formulario_id); // Valida todos os campos incluindo ID

    // Verifica se a questão existe (no DB real, isso previne updates em IDs inexistentes)
    const checkQuery = 'SELECT * FROM questao WHERE id = $1';
    const checkResult = await db.query(checkQuery, [idNum]);
    if (checkResult.rows.length === 0) {
      throw new Error('Questão não encontrada.');
    }

    // Query SQL para atualizar a questão
    const queryText = 'UPDATE questao SET descricao = $1, tipo = $2, formulario_id = $3 WHERE id = $4 RETURNING *';
    const result = await db.query(queryText, [descricao.trim(), tipo, formulario_id, idNum]);

    // Retorna a questão atualizada
    const questaoAtualizada = result.rows[0];
    res.status(200).json(questaoAtualizada);
  } catch (error) {
    console.error('Erro ao editar questão:', error);
    res.status(400).json({ erro: error.message });
  }
}

// Função para remover uma questão
async function removerQuestao(req, res) {
  try {
    const { id } = req.params;

    // Valida o ID da URL
    const idNum = parseInt(id, 10);
    if (!Number.isInteger(idNum) || idNum <= 0) {
      throw new Error('ID da questão deve ser um inteiro positivo.');
    }

    // Verifica se a questão existe (no DB real, isso previne deletes em IDs inexistentes)
    const checkQuery = 'SELECT * FROM questao WHERE id = $1';
    const checkResult = await db.query(checkQuery, [idNum]);
    if (checkResult.rows.length === 0) {
      throw new Error('Questão não encontrada.');
    }

    // Query SQL para deletar a questão
    const queryText = 'DELETE FROM questao WHERE id = $1 RETURNING *';
    const result = await db.query(queryText, [idNum]);

    // Retorna a questão removida (para confirmação)
    const questaoRemovida = result.rows[0];
    res.status(200).json({ mensagem: 'Questão removida com sucesso.', questao: questaoRemovida });
  } catch (error) {
    console.error('Erro ao remover questão:', error);
    res.status(400).json({ erro: error.message });
  }
}


// Espaço para funções relacionadas a alternativas para o João Lázaro implementar


module.exports = {
  adicionarQuestao,
  editarQuestao,
  removerQuestao
  // Adicione mais exports conforme necessário
};