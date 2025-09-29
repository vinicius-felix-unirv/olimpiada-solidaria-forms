// Este arquivo configura a conexão com o banco de dados PostgreSQL.
// Como você ainda não tem acesso ao banco, a conexão real está comentada.
// Para testar agora, usaremos um mock in-memory. Quando tiver acesso ao DB,
// descomente a parte do 'pg' e configure as credenciais.

// Importa o módulo pg para conexão com PostgreSQL
// const { Pool } = require('pg');

// Configuração da pool de conexões (descomente quando tiver o DB)
// const pool = new Pool({
//   user: 'seu_usuario',      // Substitua pelo usuário do DB
//   host: 'localhost',        // Ou o host do Docker
//   database: 'nome_do_banco', // Nome do banco de dados
//   password: 'sua_senha',    // Senha do DB
//   port: 5432,               // Porta padrão do PostgreSQL
// });

// Exporta a pool para uso em outros arquivos
// module.exports = pool;

// Para teste in-memory (sem DB real), usamos um array simples como mock
let questoesMock = []; // Array para simular a tabela de questões
let idCounter = 1;     // Contador para simular autoincremento de ID

module.exports = {
  // Função mock para query (simula execução de SQL)
  query: (text, params) => {
    // Simula INSERT INTO questao (descricao, tipo, formulario_id) VALUES (...)
    if (text.startsWith('INSERT INTO questao')) {
      const [descricao, tipo, formulario_id] = params;
      const novaQuestao = {
        id: idCounter++,
        descricao,
        tipo,
        formulario_id
      };
      questoesMock.push(novaQuestao);
      return Promise.resolve({ rows: [novaQuestao] });
    }
    // Simula UPDATE questao SET ... WHERE id = ...
    else if (text.startsWith('UPDATE questao')) {
      const [descricao, tipo, formulario_id, id] = params;
      const questaoIndex = questoesMock.findIndex(q => q.id === id);
      if (questaoIndex === -1) {
        return Promise.reject(new Error('Questão não encontrada.'));
      }
      const questaoAtualizada = {
        ...questoesMock[questaoIndex],
        descricao,
        tipo,
        formulario_id
      };
      questoesMock[questaoIndex] = questaoAtualizada;
      return Promise.resolve({ rows: [questaoAtualizada] });
    }
    // Simula DELETE FROM questao WHERE id = ...
    else if (text.startsWith('DELETE FROM questao')) {
      const [id] = params;
      const questaoIndex = questoesMock.findIndex(q => q.id === id);
      if (questaoIndex === -1) {
        return Promise.reject(new Error('Questão não encontrada.'));
      }
      const questaoRemovida = questoesMock.splice(questaoIndex, 1)[0];
      return Promise.resolve({ rows: [questaoRemovida] });
    }
    // Simula SELECT * FROM questao WHERE id = ...
    else if (text.startsWith('SELECT * FROM questao WHERE id')) {
      const [id] = params;
      const questao = questoesMock.find(q => q.id === id);
      if (!questao) {
        return Promise.reject(new Error('Questão não encontrada.'));
      }
      return Promise.resolve({ rows: [questao] });
    }
    // Simula SELECT para outras verificações, se necessário
    else if (text.startsWith('SELECT')) {
      return Promise.resolve({ rows: questoesMock });
    }
    return Promise.reject(new Error('Query não suportada no mock'));
  }
};