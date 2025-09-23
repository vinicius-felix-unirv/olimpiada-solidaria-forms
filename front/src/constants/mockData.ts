/**
 * Dados mockados para testes e desenvolvimento
 * Use estes dados para testar o formulário de cadastro
 */

import { CadastroMedicoForm } from '../types';

// ===== DADOS DE TESTE VÁLIDOS =====

export const MOCK_VALID_DATA: CadastroMedicoForm = {
  nomeCompleto: 'Dr. João Silva Santos',
  crm: '12345/SP',
  especialidade: 'Cardiologia',
  instituicao: 'Hospital das Clínicas',
  email: 'joao.silva@hospital.com.br',
  telefone: '(11) 91234-5678',
  senha: 'senha123',
  confirmarSenha: 'senha123',
};

// Dados para testes (sem CRM real)
export const MOCK_TEST_DATA: CadastroMedicoForm = {
  nomeCompleto: 'Dr. Teste Silva',
  crm: '123/TE',
  especialidade: 'Clínica Geral',
  instituicao: 'Clínica Teste',
  email: 'teste@email.com',
  telefone: '(11) 98765-4321',
  senha: 'teste123',
  confirmarSenha: 'teste123',
};

// ===== EXEMPLOS DE TELEFONES =====

export const TELEFONE_EXAMPLES = {
  fixo_sp: '(11) 3456-7890',
  fixo_rj: '(21) 2345-6789',
  celular_sp: '(11) 91234-5678',
  celular_rj: '(21) 98765-4321',
  celular_mg: '(31) 99999-8888',
};

// ===== EXEMPLOS DE CRM =====

export const CRM_EXAMPLES = {
  // CRMs reais (para referência, não usar em testes)
  real_sp: '12345/SP',
  real_rj: '67890/RJ',
  real_mg: '11111/MG',
  
  // CRMs para teste (usar estes)
  teste_1: '123/TE',
  teste_2: '456/XX',
  teste_3: '789/AB',
  teste_4: '999/ZZ',
};

// ===== ESPECIALIDADES COMUNS =====

export const ESPECIALIDADES_MOCK = [
  'Cardiologia',
  'Dermatologia',
  'Endocrinologia',
  'Gastroenterologia',
  'Ginecologia',
  'Neurologia',
  'Oftalmologia',
  'Ortopedia',
  'Pediatria',
  'Psiquiatria',
  'Radiologia',
  'Urologia',
  'Clínica Geral',
  'Medicina de Família',
];

// ===== INSTITUIÇÕES EXEMPLO =====

export const INSTITUICOES_MOCK = [
  'Hospital das Clínicas',
  'Hospital Albert Einstein',
  'Hospital Sírio-Libanês',
  'Santa Casa de Misericórdia',
  'Hospital São Luiz',
  'Clínica Particular',
  'UBS - Unidade Básica de Saúde',
  'Hospital Universitário',
];

// ===== DADOS INVÁLIDOS PARA TESTE =====

export const MOCK_INVALID_DATA = {
  telefone_curto: '119999',
  telefone_longo: '11999999999999',
  telefone_sem_9: '11812345678',
  crm_sem_uf: '12345',
  crm_uf_invalida: '12345/123',
  crm_muito_longo: '12345678/SP',
  email_invalido: 'email@',
  email_sem_dominio: 'email@.com',
  senha_curta: '123',
};

// ===== HELPER PARA PREENCHER FORMULÁRIO =====

export const fillFormWithTestData = (formData: CadastroMedicoForm): CadastroMedicoForm => ({
  ...MOCK_TEST_DATA,
  ...formData, // Override com dados específicos se necessário
});

// ===== FORMATO ESPERADO PELA API =====

export const API_DATA_EXAMPLE = {
  nome_completo: 'Dr. João Silva Santos',
  crm: '12345/SP',
  especialidade: 'Cardiologia',
  instituicao: 'Hospital das Clínicas',
  email: 'joao.silva@hospital.com.br',
  telefone: '11912345678', // Apenas números
  senha: 'senha123', // Será hasheada no backend
};

// ===== MENSAGENS DE SUCESSO/ERRO =====

export const MESSAGES = {
  success: {
    cadastro: 'Cadastro realizado com sucesso!',
    validacao: 'Todos os campos estão válidos.',
  },
  error: {
    network: 'Erro de conexão. Tente novamente.',
    server: 'Erro interno do servidor.',
    validation: 'Por favor, corrija os campos destacados.',
    duplicate: 'Este CRM já está cadastrado.',
  },
};
