# 📋 Tela de Cadastro Médico - Documentação

> **📖 Para informações gerais do projeto, stack e configuração, veja [STACK-TECNOLOGICA.md](./STACK-TECNOLOGICA.md)**

---

## 🎯 **Funcionalidades Implementadas**

### ✅ **Validações Completas**
- **Telefone BR**: Fixo (10 dígitos) e Celular (11 dígitos com 9)
- **CRM Flexível**: Formato número/UF (aceita dados de teste)
- **Email**: Validação básica com regex
- **Senha**: Mínimo 6 caracteres com letra e número
- **Confirmação**: Verifica se senhas coincidem

### ✅ **UX/UI Profissional**
- **Feedback Visual**: Bordas vermelhas e mensagens de erro
- **Loading States**: Botão com estado de carregamento
- **Formatação Automática**: Telefone formatado enquanto digita
- **Validação onBlur**: Valida quando sai do campo
- **Botão Inteligente**: Desabilitado quando formulário inválido

### ✅ **Arquitetura Limpa**
- **TypeScript**: Interfaces bem definidas
- **Separação de Responsabilidades**: Utils, types, constants
- **Preparação para API**: Dados formatados corretamente
- **Segurança**: Sanitização e logs sem senhas

## 🧪 **Como Testar**

### **1. Dados de Teste Rápido**
Clique no botão **"📝 Preencher com dados de teste"** para preencher automaticamente.

### **2. Dados Manuais Válidos**
```
Nome: Dr. João Silva Santos
CRM: 123/TE (para teste) ou 12345/SP (real)
Especialidade: Cardiologia
Instituição: Hospital das Clínicas
Email: joao@hospital.com
Telefone: (11) 91234-5678 ou (11) 1234-5678
Senha: senha123
```

### **3. Testando Validações**
- **CRM inválido**: `12345` (sem UF)
- **Telefone inválido**: `11812345678` (celular sem 9)
- **Email inválido**: `email@` (sem domínio)
- **Senha fraca**: `123` (muito curta)

## 🔌 **Integração com Backend**

### **Formato de Dados Enviados**
```json
{
  "nome_completo": "Dr. João Silva Santos",
  "crm": "12345/SP",
  "especialidade": "Cardiologia", 
  "instituicao": "Hospital das Clínicas",
  "email": "joao@hospital.com",
  "telefone": "11912345678",
  "senha": "senha123"
}
```

### **Dados Limpos Automaticamente**
- **Email**: Convertido para minúsculo
- **Telefone**: Apenas números (remove formatação)
- **CRM**: Convertido para maiúsculo
- **Strings**: Removidos espaços extras e caracteres perigosos

### **Logs Seguros**
- Senhas **NUNCA** aparecem nos logs
- Função `sanitizeForLog()` remove dados sensíveis
- Console mostra dados preparados para debug

## 📁 **Estrutura de Arquivos**

```
front/src/
├── types/
│   └── index.ts              # Interfaces TypeScript
├── utils/
│   ├── validators.ts         # Validações de formulário
│   └── apiHelpers.ts         # Preparação de dados para API
├── constants/
│   └── mockData.ts           # Dados de teste e exemplos
└── app/
    └── cadastro.tsx          # Componente principal
```

## 🚀 **Próximos Passos para Integração**

### **1. Substituir API Mock**
No arquivo `cadastro.tsx`, trocar:
```typescript
const response = await mockApiCall(apiData);
```

Por:
```typescript
const response = await fetch('/api/cadastro', {
  method: 'POST',
  headers: createApiHeaders(),
  body: JSON.stringify(apiData)
});
```

### **2. Tratamento de Erros Específicos**
```typescript
// Exemplo de tratamento de CRM duplicado
if (response.error === 'CRM_ALREADY_EXISTS') {
  setValidationErrors({ crm: 'Este CRM já está cadastrado' });
}
```

### **3. Adicionar Autenticação**
- Implementar tokens JWT
- Atualizar `createApiHeaders(true)` com token

## 🔍 **Validações Disponíveis**

### **Telefone (`validatePhone`)**
```typescript
validatePhone('11912345678') // { ok: true, type: 'celular' }
validatePhone('1123456789')  // { ok: true, type: 'fixo' }
validatePhone('11812345678') // { ok: false, reason: 'Celular deve ter 9...' }
```

### **CRM (`validateCrm`)**
```typescript
validateCrm('12345/SP') // { ok: true, numero: '12345', uf: 'SP' }
validateCrm('123/TE')   // { ok: true, numero: '123', uf: 'TE' } (teste)
validateCrm('12345')    // { ok: false, reason: 'Formato inválido...' }
```

### **Email (`validateEmail`)**
```typescript
validateEmail('test@email.com') // { ok: true }
validateEmail('invalid@')       // { ok: false, reason: 'Email inválido' }
```

## 📊 **Dados de Teste Disponíveis**

Arquivo `mockData.ts` contém:
- **MOCK_VALID_DATA**: Dados completos válidos
- **MOCK_TEST_DATA**: Dados para teste (CRM fictício)
- **TELEFONE_EXAMPLES**: Exemplos de telefones
- **CRM_EXAMPLES**: Exemplos de CRMs
- **MOCK_INVALID_DATA**: Dados inválidos para teste

## ✅ **Checklist de Entrega**

- [x] ✅ Validações funcionando
- [x] ✅ NativeWind configurado
- [x] ✅ TypeScript types definidos
- [x] ✅ Estados de loading
- [x] ✅ Preparação de dados para API
- [x] ✅ Dados de teste documentados
- [x] ✅ Logs seguros (sem senhas)
- [x] ✅ Feedback visual completo
- [x] ✅ Reset de formulário após sucesso
- [x] ✅ Tratamento de erros

## 🎉 **Branch Pronta para Merge!**

A tela de cadastro está **100% funcional** e **pronta para integração** com o backend. Todos os dados são validados, formatados e preparados no formato correto para a API.

**Desenvolvido com ❤️ usando NativeWind + TypeScript**
