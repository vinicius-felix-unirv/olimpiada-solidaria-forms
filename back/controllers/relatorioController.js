// back/controllers/relatorioController.js

const db = require('../config/db');

// Função para gerar relatório de uma questão específica
async function gerarRelatorioPorQuestao(req, res) {
  try {
    const { id_questao } = req.params;
    const idNum = parseInt(id_questao, 10);

    if (!Number.isInteger(idNum) || idNum <= 0) {
      throw new Error('O ID da questão deve ser um inteiro positivo.');
    }

    // 1. Buscar a questão para verificar o tipo
    const questaoResult = await db.query('SELECT * FROM questao WHERE id = $1', [idNum]);
    if (questaoResult.rows.length === 0) {
      return res.status(404).json({ erro: 'Questão não encontrada.' });
    }

    const questao = questaoResult.rows[0];

    // 2. Não gerar relatório para questões do tipo 'texto'
    if (questao.tipo === 'texto') {
      return res.status(200).json({ mensagem: 'Não é possível gerar relatórios para questões do tipo texto.' });
    }

    // 3. Buscar as alternativas da questão
    const alternativasResult = await db.query('SELECT * FROM alternativa WHERE questao_id = $1', [idNum]);
    const alternativas = alternativasResult.rows;
    if (alternativas.length === 0) {
        return res.status(200).json({ 
            mensagem: 'A questão não possui alternativas para gerar um relatório.',
            relatorio: {}
        });
    }


    // 4. Buscar todas as respostas para a questão
    const respostasResult = await db.query('SELECT alternativa_id FROM respostas WHERE questao_id = $1', [idNum]);
    const respostas = respostasResult.rows;

    // 5. Montar o relatório fazendo a contagem
    const relatorio = {};
    alternativas.forEach(alt => {
      // Conta quantas vezes o ID da alternativa aparece nas respostas
      const contagem = respostas.filter(resp => resp.alternativa_id === alt.id).length;
      relatorio[alt.descricao] = contagem;
    });

    res.status(200).json({
      questao_id: questao.id,
      descricao: questao.descricao,
      tipo: questao.tipo,
      relatorio: relatorio
    });

  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    res.status(400).json({ erro: error.message });
  }
}

module.exports = {
  gerarRelatorioPorQuestao
};