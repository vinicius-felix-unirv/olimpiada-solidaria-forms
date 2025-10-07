function validarDescricao(descricao) {
  if (!descricao || typeof descricao !== 'string' || descricao.trim().length === 0) {
    throw new Error('A descrição da alternativa não pode ser vazia.');
  }
}

function validarQuestaoId(questao_id) {
  if (!Number.isInteger(questao_id) || questao_id <= 0) {
    throw new Error('ID da questão associada deve ser um inteiro positivo.');
  }
}

function Alternativa(id, descricao, questao_id) {
  if (id && (!Number.isInteger(id) || id <= 0)) {
    this.id = id;
  }
  validarDescricao(descricao);
  this.descricao = descricao.trim();
  validarQuestaoId(questao_id);
  this.questao_id = questao_id;
}

module.exports = { Alternativa };