# 🤝 Guia de Contribuição - Olimpíada Solidária

## 🚀 **Quick Start para Novos Contribuintes**

### **1. Configuração Inicial**
```bash
# Clone e acesse o projeto
git clone <url-do-repositorio>
cd olimpiada-solidaria/front

# Instale dependências
npm install

# Inicie o servidor
npx expo start

# Teste no navegador
# Pressione 'w' no terminal do Expo
```

### **2. Estrutura de Desenvolvimento**
```
Sua responsabilidade:
├── app/sua-tela.tsx          # Sua nova tela
├── src/components/           # Componentes reutilizáveis
└── src/utils/               # Validações/helpers específicos
```

## 📋 **Checklist para Nova Tela**

### **Antes de Começar**
- [ ] Ler [STACK-TECNOLOGICA.md](./STACK-TECNOLOGICA.md) completo
- [ ] Configurar ambiente local
- [ ] Testar tela de cadastro existente
- [ ] Criar branch: `git checkout -b feature/minha-tela`

### **Durante o Desenvolvimento**
- [ ] Usar **NativeWind** para estilização (não StyleSheet)
- [ ] Seguir **cores do Figma** (ver `tailwind.config.js`)
- [ ] Criar **interfaces TypeScript** em `src/types/`
- [ ] Implementar **validações** em `src/utils/validators.ts`
- [ ] Adicionar **dados de teste** em `src/constants/mockData.ts`

### **Padrões Obrigatórios**
- [ ] **TypeScript**: Todas as props e estados tipados
- [ ] **NativeWind**: Classes Tailwind ao invés de StyleSheet
- [ ] **Validação**: Feedback visual com bordas vermelhas
- [ ] **Loading States**: Botões com indicador de carregamento
- [ ] **Dados Mock**: Funcionalidade testável sem backend

### **Antes do Commit**
- [ ] Testar em **web** e **mobile**
- [ ] Verificar **console** sem erros
- [ ] **Documentar** funcionalidades no README da tela
- [ ] Commit descritivo: `feat: implementa tela de login`

## 🎨 **Padrões de UI**

### **Cores (usar sempre estas)**
```jsx
// Botões principais
className="bg-button-blue text-white"

// Botões secundários  
className="bg-light-gray text-black"

// Inputs
className="bg-input-bg border-gray-300"

// Inputs com erro
className="bg-input-bg border-red-500"

// Links clicáveis
className="text-button-blue font-medium"

// Texto normal
className="text-black"

// Texto secundário
className="text-text-gray"
```

### **Componentes Reutilizáveis**
```jsx
// Importar componentes existentes
import { Input, Button, Header } from '../src/components';

// Usar ao invés de criar do zero
<Input
  label="Email"
  placeholder="seu@email.com"
  error={validationErrors.email}
  onBlur={() => handleValidation('email')}
/>
```

### **Validação Padrão**
```jsx
// Estados obrigatórios
const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
const [fieldsTouched, setFieldsTouched] = useState<FieldsTouched>({});

// Validação no blur
const handleInputBlur = (field: string) => {
  setFieldsTouched(prev => ({ ...prev, [field]: true }));
  
  const validation = validateField(formData[field]);
  if (!validation.ok) {
    setValidationErrors(prev => ({ ...prev, [field]: validation.reason }));
  }
};

// Feedback visual
<TextInput
  className={`bg-input-bg rounded-xl h-14 ${
    validationErrors.field ? 'border border-red-500' : ''
  }`}
  onBlur={() => handleInputBlur('field')}
/>

{validationErrors.field && (
  <Text className="text-red-500 text-sm mt-1">
    {validationErrors.field}
  </Text>
)}
```

## 🔧 **Funcionalidades Específicas**

### **Tela de Login** (Próxima)
```typescript
// Estrutura sugerida
interface LoginForm {
  email: string;
  senha: string;
}

// Validações necessárias
- validateEmail() ✅ (já existe)
- validatePassword() ✅ (já existe)
- Autenticação JWT (implementar)

// Navegação
Login → Menu Principal
```

### **Menu Principal**
```typescript
// Funcionalidades esperadas
- Lista de opções (Cadastros, Relatórios, Perfil)
- Header com nome do usuário
- Botão de logout
- Navegação para outras telas
```

### **Relatórios**
```typescript
// Funcionalidades esperadas  
- Filtros de data/período
- Lista de cadastros realizados
- Exportação de dados
- Gráficos/estatísticas
```

## 🧪 **Testes e Dados Mock**

### **Sempre Implementar**
```typescript
// Em src/constants/mockData.ts
export const MOCK_LOGIN_DATA = {
  email: 'admin@unirv.edu.br',
  senha: 'admin123'
};

// Função para preencher automaticamente
const fillTestData = () => {
  setFormData(MOCK_LOGIN_DATA);
};
```

### **Dev Mode (Opcional)**
Se quiser implementar dev mode na sua tela:
```typescript
// Clique secreto em algum elemento
const [devMode, setDevMode] = useState(false);

// Botão de teste (apenas se dev mode ativo)
{devMode && (
  <TouchableOpacity onPress={fillTestData}>
    <Text>🔧 [DEV] Preencher dados</Text>
  </TouchableOpacity>
)}
```

## 📱 **Navegação**

### **Adicionar Nova Tela**
```typescript
// 1. Criar arquivo app/minha-tela.tsx
export default function MinhaTela() {
  return (
    <View className="flex-1 bg-white">
      {/* Sua implementação */}
    </View>
  );
}

// 2. Adicionar em app/_layout.tsx
<Stack.Screen 
  name="minha-tela" 
  options={{ 
    title: "Minha Tela",
    headerShown: true 
  }} 
/>

// 3. Navegar de outras telas
import { Link } from 'expo-router';

<Link href="/minha-tela" asChild>
  <TouchableOpacity>
    <Text>Ir para Minha Tela</Text>
  </TouchableOpacity>
</Link>
```

## 🚫 **O que NÃO fazer**

### **Evitar**
- ❌ StyleSheet para estilização básica (usar NativeWind)
- ❌ Cores hardcoded (usar as do `tailwind.config.js`)
- ❌ Componentes sem TypeScript
- ❌ Validações sem feedback visual
- ❌ Funcionalidades sem dados de teste
- ❌ Commits sem descrição clara
- ❌ Modificar arquivos de configuração sem necessidade

### **Cuidados**
- ⚠️ Não quebrar funcionalidades existentes
- ⚠️ Testar sempre antes de fazer push
- ⚠️ Não commitar `node_modules` ou arquivos temporários
- ⚠️ Não modificar as cores do Figma sem aprovação

## 🆘 **Ajuda e Suporte**

### **Problemas Comuns**
```bash
# Metro não inicia
npx expo start --clear

# Dependências quebradas
rm -rf node_modules package-lock.json
npm install

# Cache do Expo
npx expo install --fix
```

### **Dúvidas Técnicas**
1. **Consultar**: [STACK-TECNOLOGICA.md](./STACK-TECNOLOGICA.md) principal
2. **Examinar**: Código da tela de cadastro (`app/cadastro.tsx`)
3. **Testar**: Funcionalidades existentes para entender padrões

### **Recursos**
- 📖 [Expo Docs](https://docs.expo.dev/)
- 🎨 [NativeWind](https://www.nativewind.dev/)
- ⚡ [Tailwind CSS](https://tailwindcss.com/)

---

## 🎯 **Resumo para Começar**

1. **Clone** e configure o ambiente
2. **Teste** a tela de cadastro existente  
3. **Estude** o código em `app/cadastro.tsx`
4. **Crie** sua branch: `feature/nome-da-tela`
5. **Implemente** seguindo os padrões
6. **Teste** em web e mobile
7. **Documente** e faça commit
8. **Abra** Pull Request

**🚀 Boa sorte no desenvolvimento!**
