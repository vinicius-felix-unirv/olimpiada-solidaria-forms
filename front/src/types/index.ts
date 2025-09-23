/**
 * Tipos TypeScript para o projeto Olimpíada Solidária
 */

// ===== FORMULÁRIO DE CADASTRO =====

export interface CadastroMedicoForm {
  nomeCompleto: string;
  crm: string;
  especialidade: string;
  instituicao: string;
  email: string;
  telefone: string;
  senha: string;
  confirmarSenha: string;
}

// Dados preparados para envio à API
export interface CadastroMedicoAPI {
  nome_completo: string;
  crm: string;
  especialidade: string;
  instituicao: string;
  email: string;
  telefone: string; // Apenas números
  senha: string;
}

// ===== ESTADOS DE VALIDAÇÃO =====

export interface ValidationErrors {
  [key: string]: string;
}

export interface FieldsTouched {
  [key: string]: boolean;
}

// ===== RESPOSTAS DA API =====

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface CadastroResponse {
  id: string;
  nome_completo: string;
  crm: string;
  email: string;
  created_at: string;
}

// ===== ESTADOS DE LOADING =====

export interface LoadingStates {
  isSubmitting: boolean;
  isValidating: boolean;
}

// ===== ESPECIALIDADES MÉDICAS =====

export interface EspecialidadeMedica {
  id: string;
  nome: string;
  codigo?: string;
}

// ===== CONSTANTES =====

export const FORM_FIELDS = {
  NOME_COMPLETO: 'nomeCompleto',
  CRM: 'crm',
  ESPECIALIDADE: 'especialidade',
  INSTITUICAO: 'instituicao',
  EMAIL: 'email',
  TELEFONE: 'telefone',
  SENHA: 'senha',
  CONFIRMAR_SENHA: 'confirmarSenha',
} as const;

export type FormField = typeof FORM_FIELDS[keyof typeof FORM_FIELDS];

// ===== FORMULÁRIOS DINÂMICOS =====

export type QuestionType = 'text' | 'select' | 'checkbox' | 'radio';

export interface QuestionOption {
  id: string;
  label: string;
  value: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  placeholder?: string;
  options?: QuestionOption[];
  required?: boolean;
  answer?: string | string[];
}

export interface DynamicForm {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface FormBuilderState {
  currentForm: DynamicForm;
  isEditing: boolean;
  editingQuestionId?: string;
}

// ===== NAVEGAÇÃO =====

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  active?: boolean;
}
