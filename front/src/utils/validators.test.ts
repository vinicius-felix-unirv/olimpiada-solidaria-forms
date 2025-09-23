/**
 * Testes para funções de validação
 * 
 * Para rodar quando configurar Jest:
 * npm test validators.test.ts
 * 
 * Por enquanto, apenas documentação dos casos de teste
 * para não adicionar dependências ao projeto colaborativo
 */

import { validatePhone, validateCrm, formatPhone, formatCrm } from './validators';

// ===== CASOS DE TESTE PARA TELEFONE =====

// Casos válidos - Telefone Fixo
console.log('=== TESTES TELEFONE FIXO ===');
console.log('(11) 1234-5678:', validatePhone('1112345678')); // { ok: true, type: 'fixo' }
console.log('Com formatação:', validatePhone('(11) 1234-5678')); // { ok: true, type: 'fixo' }
console.log('Com espaços:', validatePhone('11 1234 5678')); // { ok: true, type: 'fixo' }

// Casos válidos - Telefone Celular
console.log('\n=== TESTES TELEFONE CELULAR ===');
console.log('(11) 91234-5678:', validatePhone('11912345678')); // { ok: true, type: 'celular' }
console.log('Com formatação:', validatePhone('(11) 91234-5678')); // { ok: true, type: 'celular' }
console.log('Com prefixo 55:', validatePhone('5511912345678')); // { ok: true, type: 'celular' }

// Casos inválidos
console.log('\n=== TESTES TELEFONE INVÁLIDOS ===');
console.log('Muito curto:', validatePhone('1123456')); // { ok: false, reason: 'Telefone muito curto' }
console.log('Muito longo:', validatePhone('119123456789')); // { ok: false, reason: 'Telefone muito longo' }
console.log('Celular sem 9:', validatePhone('11812345678')); // { ok: false, reason: 'Celular deve ter 9 como terceiro dígito' }
console.log('DDD inválido:', validatePhone('0912345678')); // { ok: false, reason: 'DDD inválido' }
console.log('Vazio:', validatePhone('')); // { ok: false, reason: 'Telefone é obrigatório' }
console.log('Só letras:', validatePhone('abcdefghij')); // { ok: false, reason: 'Telefone deve conter números' }

// ===== CASOS DE TESTE PARA CRM =====

// Casos válidos - CRM Real
console.log('\n=== TESTES CRM VÁLIDOS ===');
console.log('12345/SP:', validateCrm('12345/SP')); // { ok: true, numero: '12345', uf: 'SP' }
console.log('123456/RJ:', validateCrm('123456/RJ')); // { ok: true, numero: '123456', uf: 'RJ' }
console.log('Com hífen:', validateCrm('12345-SP')); // { ok: true, numero: '12345', uf: 'SP' }
console.log('Minúsculo:', validateCrm('12345/sp')); // { ok: true, numero: '12345', uf: 'SP' }

// Casos válidos - CRM para Teste (flexível)
console.log('\n=== TESTES CRM PARA TESTE ===');
console.log('123/TE:', validateCrm('123/TE')); // { ok: true, numero: '123', uf: 'TE' }
console.log('00000/XX:', validateCrm('00000/XX')); // { ok: true, numero: '00000', uf: 'XX' }
console.log('999/AB:', validateCrm('999/AB')); // { ok: true, numero: '999', uf: 'AB' }

// Casos inválidos
console.log('\n=== TESTES CRM INVÁLIDOS ===');
console.log('Sem separador:', validateCrm('12345SP')); // { ok: false, reason: 'Formato inválido...' }
console.log('Número muito longo:', validateCrm('12345678/SP')); // { ok: false, reason: 'Número do CRM deve ter entre 1 e 7 caracteres' }
console.log('UF com 1 letra:', validateCrm('12345/S')); // { ok: false, reason: 'UF deve ter exatamente 2 letras' }
console.log('UF com 3 letras:', validateCrm('12345/SPP')); // { ok: false, reason: 'Formato inválido...' }
console.log('Vazio:', validateCrm('')); // { ok: false, reason: 'CRM é obrigatório' }

// ===== TESTES DE FORMATAÇÃO =====

console.log('\n=== TESTES FORMATAÇÃO TELEFONE ===');
console.log('Fixo:', formatPhone('1112345678')); // (11) 1234-5678
console.log('Celular:', formatPhone('11912345678')); // (11) 91234-5678

console.log('\n=== TESTES FORMATAÇÃO CRM ===');
console.log('CRM válido:', formatCrm('12345/sp')); // 12345/SP
console.log('CRM inválido:', formatCrm('inválido')); // inválido

console.log('\n=== TODOS OS TESTES EXECUTADOS ===');
console.log('Verifique os resultados acima para validar as funções');
console.log('Para rodar testes automatizados, configure Jest no projeto');
