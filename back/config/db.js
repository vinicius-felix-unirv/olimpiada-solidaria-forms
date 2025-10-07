// back/config/db.js

// Mock in-memory para simular o banco de dados
let questoesMock = [
    { id: 1, descricao: 'Qual é o seu sexo?', tipo: 'radio', formulario_id: 1 },
    { id: 2, descricao: 'Qual seu tipo sanguíneo?', tipo: 'select', formulario_id: 1 },
    { id: 3, descricao: 'Quais sintomas você sentiu?', tipo: 'checkbox', formulario_id: 1 },
    { id: 4, descricao: 'Descreva sua dúvida.', tipo: 'texto', formulario_id: 1 }
];
let alternativasMock = [
    // Alternativas para a Pergunta 1
    { id: 1, descricao: 'Masculino', questao_id: 1 },
    { id: 2, descricao: 'Feminino', questao_id: 1 },
    // Alternativas para a Pergunta 2
    { id: 3, descricao: 'A+', questao_id: 2 },
    { id: 4, descricao: 'A-', questao_id: 2 },
    { id: 5, descricao: 'B+', questao_id: 2 },
    { id: 6, descricao: 'O+', questao_id: 2 },
    { id: 7, descricao: 'O-', questao_id: 2 },
    // Alternativas para a Pergunta 3
    { id: 8, descricao: 'Febre', questao_id: 3 },
    { id: 9, descricao: 'Dor de cabeça', questao_id: 3 },
    { id: 10, descricao: 'Tosse', questao_id: 3 }
];
let respostasMock = [
    // Respostas para a Pergunta 1 (Sexo)
    { id: 1, numero_usuario: 100, formulario_id: 1, questao_id: 1, alternativa_id: 1 },
    { id: 2, numero_usuario: 101, formulario_id: 1, questao_id: 1, alternativa_id: 2 },
    { id: 3, numero_usuario: 102, formulario_id: 1, questao_id: 1, alternativa_id: 1 },
    // Respostas para a Pergunta 2 (Tipo Sanguíneo)
    { id: 4, numero_usuario: 100, formulario_id: 1, questao_id: 2, alternativa_id: 3 },
    { id: 5, numero_usuario: 101, formulario_id: 1, questao_id: 2, alternativa_id: 6 },
    // Respostas para a Pergunta 3 (Sintomas - Checkbox, pode ter mais de uma por usuário)
    { id: 6, numero_usuario: 100, formulario_id: 1, questao_id: 3, alternativa_id: 8 },
    { id: 7, numero_usuario: 100, formulario_id: 1, questao_id: 3, alternativa_id: 9 },
    { id: 8, numero_usuario: 101, formulario_id: 1, questao_id: 3, alternativa_id: 10 },
    { id: 9, numero_usuario: 102, formulario_id: 1, questao_id: 3, alternativa_id: 9 },
    { id: 10, numero_usuario: 102, formulario_id: 1, questao_id: 3, alternativa_id: 8 },
];

let idCounter = 5; // Contador para simular autoincremento de ID das questões

module.exports = {
  // Função mock para query (simula execução de SQL)
  query: (text, params) => {
    // Simula queries para a tabela 'questao'
    if (text.startsWith('INSERT INTO questao')) {
      const [descricao, tipo, formulario_id] = params;
      const novaQuestao = { id: idCounter++, descricao, tipo, formulario_id };
      questoesMock.push(novaQuestao);
      return Promise.resolve({ rows: [novaQuestao] });
    }
    if (text.startsWith('UPDATE questao')) {
      const [descricao, tipo, formulario_id, id] = params;
      const index = questoesMock.findIndex(q => q.id === id);
      if (index === -1) return Promise.reject(new Error('Questão não encontrada.'));
      questoesMock[index] = { ...questoesMock[index], descricao, tipo, formulario_id };
      return Promise.resolve({ rows: [questoesMock[index]] });
    }
    if (text.startsWith('DELETE FROM questao')) {
      const [id] = params;
      const index = questoesMock.findIndex(q => q.id === id);
      if (index === -1) return Promise.reject(new Error('Questão não encontrada.'));
      const removida = questoesMock.splice(index, 1);
      return Promise.resolve({ rows: removida });
    }
    if (text.startsWith('SELECT * FROM questao WHERE id')) {
        const [id] = params;
        const questao = questoesMock.filter(q => q.id === id);
        return Promise.resolve({ rows: questao });
    }

    // Simula queries para a tabela 'alternativa'
    if (text.startsWith('SELECT * FROM alternativa WHERE questao_id')) {
        const [questao_id] = params;
        const alternativas = alternativasMock.filter(a => a.questao_id === questao_id);
        return Promise.resolve({ rows: alternativas });
    }
    
    // Simula queries para a tabela 'respostas'
    if (text.startsWith('SELECT alternativa_id FROM respostas WHERE questao_id')) {
        const [questao_id] = params;
        const respostas = respostasMock.filter(r => r.questao_id === questao_id);
        return Promise.resolve({ rows: respostas });
    }
    
    // Simula SELECT geral (usado para verificações)
    if (text.startsWith('SELECT')) {
      return Promise.resolve({ rows: questoesMock });
    }

    return Promise.reject(new Error('Query não suportada no mock: ' + text));
  }
};