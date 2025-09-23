/**
 * Helpers para preparação de dados para API
 */

import { CadastroMedicoForm, CadastroMedicoAPI } from '../types';
import { sanitizeString } from './validators';

/**
 * Prepara dados do formulário para envio à API
 * 
 * @param formData - Dados do formulário
 * @returns Dados formatados para API
 */
export function prepareApiData(formData: CadastroMedicoForm): CadastroMedicoAPI {
  return {
    nome_completo: sanitizeString(formData.nomeCompleto),
    crm: formData.crm.toUpperCase().trim(),
    especialidade: sanitizeString(formData.especialidade),
    instituicao: sanitizeString(formData.instituicao),
    email: formData.email.toLowerCase().trim(),
    telefone: formData.telefone.replace(/\D/g, ''), // Remove tudo que não é número
    senha: formData.senha, // Será hasheada no backend
  };
}

/**
 * Valida se todos os campos obrigatórios estão preenchidos
 * 
 * @param formData - Dados do formulário
 * @returns True se todos os campos estão preenchidos
 */
export function hasRequiredFields(formData: CadastroMedicoForm): boolean {
  const requiredFields: (keyof CadastroMedicoForm)[] = [
    'nomeCompleto',
    'crm',
    'especialidade',
    'instituicao',
    'email',
    'telefone',
    'senha',
    'confirmarSenha',
  ];

  return requiredFields.every(field => {
    const value = formData[field];
    return value && value.trim().length > 0;
  });
}

/**
 * Remove dados sensíveis para logs (não loga senhas)
 * 
 * @param data - Dados a serem logados
 * @returns Dados sem informações sensíveis
 */
export function sanitizeForLog(data: any): any {
  if (!data || typeof data !== 'object') return data;

  const sanitized = { ...data };
  
  // Remove campos sensíveis
  const sensitiveFields = ['senha', 'password', 'confirmarSenha', 'confirmPassword'];
  
  sensitiveFields.forEach(field => {
    if (sanitized[field]) {
      sanitized[field] = '[REDACTED]';
    }
  });

  return sanitized;
}

/**
 * Cria headers padrão para requisições API
 * 
 * @param includeAuth - Se deve incluir token de autenticação
 * @returns Headers para requisição
 */
export function createApiHeaders(includeAuth: boolean = false): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (includeAuth) {
    // TODO: Implementar quando tiver autenticação
    // const token = getAuthToken();
    // if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Simula uma chamada de API (para desenvolvimento)
 * 
 * @param data - Dados a serem enviados
 * @param delay - Delay em ms para simular latência
 * @returns Promise com resposta simulada
 */
export async function mockApiCall<T>(
  data: T,
  delay: number = 1500
): Promise<{ success: boolean; data?: T; message?: string }> {
  
  // Log dos dados (sem senhas)
  console.log('📤 Enviando dados para API:', sanitizeForLog(data));
  
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // Simula sucesso (95% das vezes)
  const isSuccess = Math.random() > 0.05;
  
  if (isSuccess) {
    console.log('✅ Cadastro realizado com sucesso!');
    return {
      success: true,
      data,
      message: 'Cadastro realizado com sucesso!',
    };
  } else {
    console.log('❌ Erro simulado na API');
    return {
      success: false,
      message: 'Erro simulado: Tente novamente em alguns instantes.',
    };
  }
}
