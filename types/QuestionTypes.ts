export interface Option {
  value: string;
  label: string;
}

export type QuestionType = 'text' | 'textarea' | 'radio' | 'checkbox' | 'select';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  label: string;
  required?: boolean;
}

export interface TextQuestion extends BaseQuestion {
  type: 'text';
  placeholder?: string;
}

export interface TextAreaQuestion extends BaseQuestion {
  type: 'textarea';
  placeholder?: string;
  numberOfLines?: number;
}

export interface RadioQuestion extends BaseQuestion {
  type: 'radio';
  options: Option[];
}

export interface CheckboxQuestion extends BaseQuestion {
  type: 'checkbox';
  options: Option[];
}

export interface SelectQuestion extends BaseQuestion {
  type: 'select';
  options: Option[];
  placeholder?: string;
}

export type Question = TextQuestion | TextAreaQuestion | RadioQuestion | CheckboxQuestion | SelectQuestion;

export interface FormData {
  [key: string]: string | string[];
}

export interface FormConfig {
  title: string;
  questions: Question[];
}