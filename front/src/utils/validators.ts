/**
 * Funções utilitárias para validação de formulários
 * Responsáveis por feedback rápido ao usuário e ativação de botões
 */

// Tipos de retorno das validações
export interface PhoneValidationResult {
  ok: boolean;
  type?: 'fixo' | 'celular';
  reason?: string;
}

export interface CrmValidationResult {
  ok: boolean;
  numero?: string;
  uf?: string;
  reason?: string;
}

export interface EmailValidationResult {
  ok: boolean;
  reason?: string;
}

export interface PasswordValidationResult {
  ok: boolean;
  reason?: string;
}

// Estados brasileiros válidos para CRM
const VALID_UFS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

/**
 * Valida telefone brasileiro (fixo ou celular)
 * 
 * @param phone - Número de telefone a ser validado
 * @returns Objeto com resultado da validação
 * 
 * Regras:
 * - Fixo: 10 dígitos (DDD + 8 dígitos)
 * - Celular: 11 dígitos (DDD + 9 + 8 dígitos), 3º dígito deve ser 9
 * - Remove caracteres não numéricos
 * - Remove prefixo 55 se presente
 */
export function validatePhone(phone: string): PhoneValidationResult {
  if (!phone || typeof phone !== 'string') {
    return { ok: false, reason: 'Telefone é obrigatório' };
  }

  // Remove caracteres não numéricos
  let cleanPhone = phone.replace(/\D/g, '');
  
  // Remove prefixo 55 se presente no início
  if (cleanPhone.startsWith('55') && cleanPhone.length > 11) {
    cleanPhone = cleanPhone.substring(2);
  }

  // Verifica se está vazio após limpeza
  if (!cleanPhone) {
    return { ok: false, reason: 'Telefone deve conter números' };
  }

  // Valida telefone fixo (10 dígitos)
  if (cleanPhone.length === 10) {
    // Verifica se DDD é válido (11-99)
    const ddd = parseInt(cleanPhone.substring(0, 2));
    if (ddd < 11 || ddd > 99) {
      return { ok: false, reason: 'DDD inválido' };
    }
    
    return { ok: true, type: 'fixo' };
  }

  // Valida telefone celular (11 dígitos)
  if (cleanPhone.length === 11) {
    // Verifica se DDD é válido (11-99)
    const ddd = parseInt(cleanPhone.substring(0, 2));
    if (ddd < 11 || ddd > 99) {
      return { ok: false, reason: 'DDD inválido' };
    }

    // Verifica se o 3º dígito é 9 (celular)
    if (cleanPhone[2] !== '9') {
      return { ok: false, reason: 'Celular deve ter 9 como terceiro dígito' };
    }

    return { ok: true, type: 'celular' };
  }

  // Comprimento inválido
  if (cleanPhone.length < 10) {
    return { ok: false, reason: 'Telefone muito curto' };
  } else {
    return { ok: false, reason: 'Telefone muito longo' };
  }
}

/**
 * Valida CRM médico brasileiro (flexível para testes)
 * 
 * @param crm - CRM no formato "número/UF" ou "número-UF"
 * @returns Objeto com resultado da validação
 * 
 * Regras flexíveis:
 * - Formato: número/UF ou número-UF
 * - Número: 1 a 7 dígitos (aceita "123", "00000" para testes)
 * - UF: qualquer combinação de 2 letras (permite "XX", "TE" para testes)
 */
export function validateCrm(crm: string): CrmValidationResult {
  if (!crm || typeof crm !== 'string') {
    return { ok: false, reason: 'CRM é obrigatório' };
  }

  // Remove espaços extras
  const cleanCrm = crm.trim();
  
  // Verifica formato básico com / ou -
  const separatorMatch = cleanCrm.match(/^(.{1,7})[\/\-]([A-Za-z]{2})$/);
  
  if (!separatorMatch) {
    return { 
      ok: false, 
      reason: 'Formato inválido. Use: número/UF (ex: 12345/SP ou 123/TE para teste)' 
    };
  }

  const [, numero, uf] = separatorMatch;
  
  // Validação flexível do número (aceita qualquer coisa de 1 a 7 caracteres)
  if (numero.length < 1 || numero.length > 7) {
    return { ok: false, reason: 'Número do CRM deve ter entre 1 e 7 caracteres' };
  }

  // UF flexível (qualquer 2 letras)
  const ufUpper = uf.toUpperCase();
  if (!/^[A-Z]{2}$/.test(ufUpper)) {
    return { ok: false, reason: 'UF deve ter exatamente 2 letras' };
  }

  return { 
    ok: true, 
    numero: numero,
    uf: ufUpper 
  };
}

/**
 * Formata telefone para exibição
 * @param phone - Telefone limpo (apenas números)
 * @returns Telefone formatado para exibição
 */
export function formatPhone(phone: string): string {
  const clean = phone.replace(/\D/g, '');
  
  if (clean.length === 10) {
    // Fixo: (11) 1234-5678
    return `(${clean.substring(0, 2)}) ${clean.substring(2, 6)}-${clean.substring(6)}`;
  } else if (clean.length === 11) {
    // Celular: (11) 91234-5678
    return `(${clean.substring(0, 2)}) ${clean.substring(2, 7)}-${clean.substring(7)}`;
  }
  
  return phone; // Retorna original se não conseguir formatar
}

/**
 * Valida email
 * 
 * @param email - Email a ser validado
 * @returns Objeto com resultado da validação
 */
export function validateEmail(email: string): EmailValidationResult {
  if (!email || typeof email !== 'string') {
    return { ok: false, reason: 'Email é obrigatório' };
  }

  const cleanEmail = email.trim().toLowerCase();
  
  if (!cleanEmail) {
    return { ok: false, reason: 'Email é obrigatório' };
  }

  // Regex básico para email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(cleanEmail)) {
    return { ok: false, reason: 'Email inválido' };
  }

  // Validações adicionais
  if (cleanEmail.length > 254) {
    return { ok: false, reason: 'Email muito longo' };
  }

  if (cleanEmail.includes('..')) {
    return { ok: false, reason: 'Email inválido' };
  }

  return { ok: true };
}

/**
 * Valida senha
 * 
 * @param password - Senha a ser validada
 * @returns Objeto com resultado da validação
 */
export function validatePassword(password: string): PasswordValidationResult {
  if (!password || typeof password !== 'string') {
    return { ok: false, reason: 'Senha é obrigatória' };
  }

  if (password.length < 6) {
    return { ok: false, reason: 'Senha deve ter pelo menos 6 caracteres' };
  }

  if (password.length > 128) {
    return { ok: false, reason: 'Senha muito longa' };
  }

  // Verifica se tem pelo menos uma letra e um número (opcional, pode remover)
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  
  if (!hasLetter || !hasNumber) {
    return { ok: false, reason: 'Senha deve conter pelo menos uma letra e um número' };
  }

  return { ok: true };
}

/**
 * Valida confirmação de senha
 * 
 * @param password - Senha original
 * @param confirmPassword - Confirmação da senha
 * @returns Objeto com resultado da validação
 */
export function validatePasswordConfirmation(password: string, confirmPassword: string): PasswordValidationResult {
  if (!confirmPassword || typeof confirmPassword !== 'string') {
    return { ok: false, reason: 'Confirmação de senha é obrigatória' };
  }

  if (password !== confirmPassword) {
    return { ok: false, reason: 'Senhas não coincidem' };
  }

  return { ok: true };
}

/**
 * Formata CRM para exibição
 * @param crm - CRM no formato número/UF
 * @returns CRM formatado
 */
export function formatCrm(crm: string): string {
  const validation = validateCrm(crm);
  if (validation.ok && validation.numero && validation.uf) {
    return `${validation.numero}/${validation.uf}`;
  }
  return crm;
}

/**
 * Sanitiza string removendo espaços extras e caracteres perigosos
 * @param input - String a ser sanitizada
 * @returns String sanitizada
 */
export function sanitizeString(input: string): string {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/\s+/g, ' ') // Remove espaços extras
    .replace(/[<>]/g, ''); // Remove caracteres básicos de XSS
}

