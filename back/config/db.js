let questoesMock = [];
let alternativasMock = [];
let questaoIdCounter = 1;
let alternativaIdCounter = 1;

module.exports = {
  // Função mock que simula a execução de queries SQL
  query: (text, params) => {
    console.log('Executando query mock:', text, params); // Log para ajudar a depurar

    // --- Lógica para a tabela QUESTAO ---

    // Simula: INSERT INTO questao (descricao, tipo, formulario_id) VALUES ($1, $2, $3)
    if (text.startsWith('INSERT INTO questao')) {
      const [descricao, tipo, formulario_id] = params;
      const novaQuestao = { id: questaoIdCounter++, descricao, tipo, formulario_id };
      questoesMock.push(novaQuestao);
      return Promise.resolve({ rows: [novaQuestao] });
    }

    // Simula: UPDATE questao SET ... WHERE id = $4
    if (text.startsWith('UPDATE questao')) {
      const [descricao, tipo, formulario_id, id] = params;
      const index = questoesMock.findIndex(q => q.id === id);
      if (index === -1) {
        return Promise.reject(new Error('Questão não encontrada para atualização.'));
      }
      questoesMock[index] = { ...questoesMock[index], descricao, tipo, formulario_id };
      return Promise.resolve({ rows: [questoesMock[index]] });
    }

    // Simula: DELETE FROM questao WHERE id = $1
    if (text.startsWith('DELETE FROM questao')) {
      const [id] = params;
      const index = questoesMock.findIndex(q => q.id === id);
      if (index === -1) {
        return Promise.reject(new Error('Questão não encontrada para remoção.'));
      }
      const [removida] = questoesMock.splice(index, 1);
      return Promise.resolve({ rows: [removida] });
    }

    // Simula: SELECT * FROM questao WHERE id = $1
    if (text.startsWith('SELECT * FROM questao WHERE id')) {
      const [id] = params;
      const questao = questoesMock.find(q => q.id === id);
      return Promise.resolve({ rows: questao ? [questao] : [] });
    }

    // --- Lógica para a tabela ALTERNATIVA ---

    // Simula: INSERT INTO alternativa (descricao, questao_id) VALUES ($1, $2)
    if (text.startsWith('INSERT INTO alternativa')) {
      const [descricao, questao_id] = params;
      const novaAlternativa = { id: alternativaIdCounter++, descricao, questao_id };
      alternativasMock.push(novaAlternativa);
      return Promise.resolve({ rows: [novaAlternativa] });
    }

    // Simula: SELECT * FROM alternativa WHERE questao_id = $1
    if (text.startsWith('SELECT * FROM alternativa WHERE questao_id')) {
      const [questao_id] = params;
      const resultado = alternativasMock.filter(a => a.questao_id === questao_id);
      return Promise.resolve({ rows: resultado });
    }

    // Simula: DELETE FROM alternativa WHERE questao_id = $1
    if (text.startsWith('DELETE FROM alternativa WHERE questao_id')) {
      const [questao_id] = params;
      const removidas = alternativasMock.filter(a => a.questao_id === questao_id);
      alternativasMock = alternativasMock.filter(a => a.questao_id !== questao_id);
      return Promise.resolve({ rows: removidas }); // Retorna as que foram removidas, para consistência
    }

    // Se a query não for reconhecida pelo mock
    return Promise.reject(new Error('Query não suportada no mock: ' + text));
  }
};