// Este arquivo define o modelo de Questão.
// Como usamos Node puro com pg, não há ORM como Sequelize.
// O modelo é representado por um objeto simples, mas com validações.

// Tipos de alternativas permitidos (enum-like)
const TIPOS_ALTERNATIVAS = ['texto', 'checkbox', 'radio', 'select'];

// Função para validar o tipo de alternativa
function validarTipo(tipo) {
  if (!TIPOS_ALTERNATIVAS.includes(tipo)) {
    throw new Error('Tipo de alternativa inválido. Deve ser um dos seguintes: texto, checkbox, radio, select.');
  }
}

// Função para validar a descrição
function validarDescricao(descricao) {
  if (!descricao || typeof descricao !== 'string') {
    throw new Error('Descrição da questão deve ser uma string não vazia.');
  }
  if (descricao.trim().length === 0) {
    throw new Error('Descrição da questão não pode ser vazia ou conter apenas espaços.');
  }
  if (descricao.length > 1000) { // Limite arbitrário para evitar descrições excessivamente longas
    throw new Error('Descrição da questão não pode exceder 1000 caracteres.');
  }
}

// Função para validar o formulario_id
function validarFormularioId(formulario_id) {
  if (!Number.isInteger(formulario_id) || formulario_id <= 0) {
    throw new Error('ID do formulário deve ser um inteiro positivo.');
  }
}

// Função para validar o id da questão (para editar/remover)
function validarId(id) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('ID da questão deve ser um inteiro positivo.');
  }
}

// Modelo de Questão (função construtora)
function Questao(id, descricao, tipo, formulario_id) {
  if (id) { // Para edição, valida ID
    validarId(id);
    this.id = id;
  }
  validarDescricao(descricao);
  this.descricao = descricao.trim(); // Remove espaços extras
  validarTipo(tipo);
  this.tipo = tipo;
  validarFormularioId(formulario_id);
  this.formulario_id = formulario_id;
}

// Exporta o modelo e funções úteis
module.exports = {
  Questao,
  validarTipo,
  validarDescricao,
  validarFormularioId,
  validarId,
  TIPOS_ALTERNATIVAS
};