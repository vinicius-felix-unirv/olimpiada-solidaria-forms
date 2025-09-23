# 📱 Olimpíada Solidária - Frontend

> **Aplicação mobile para levantamento de informações pelos profissionais da saúde da UNIRV**

## 🚀 **Stack Tecnológica**

### **Core Framework**
- **React Native** `0.79.6` - Framework mobile multiplataforma
- **Expo** `~53.0.22` - Plataforma de desenvolvimento React Native
- **Expo Router** `~5.1.5` - Navegação baseada em arquivos
- **TypeScript** `~5.8.3` - Tipagem estática

### **Estilização**
- **NativeWind** `4.1.23` - Tailwind CSS para React Native
- **Tailwind CSS** `^3.3.0` - Framework CSS utilitário
- **clsx** `^2.1.1` + **tailwind-merge** `^3.3.1` - Combinação de classes

### **Ícones & UI**
- **React Native Vector Icons** `^10.3.0` - Biblioteca de ícones
- **FontAwesome** - Conjunto de ícones utilizado
- **Class Variance Authority** `^0.7.1` - Variantes de componentes

### **Desenvolvimento**
- **Babel** `^7.25.2` - Transpilador JavaScript
- **Metro** - Bundler do React Native (configurado para NativeWind)

## 📁 **Estrutura do Diretório**

```
front/
├── 📱 app/                          # Expo Router (páginas)
│   ├── _layout.tsx                  # Layout raiz da aplicação
│   ├── index.tsx                    # Tela inicial (Home)
│   └── cadastro.tsx                 # Tela de cadastro médico ✅
│
├── 🎨 src/                          # Código fonte
│   ├── 🧩 components/               # Componentes reutilizáveis
│   │   ├── Button.tsx               # Componente de botão
│   │   ├── Checkbox.tsx             # Componente de checkbox
│   │   ├── Header.tsx               # Cabeçalho da aplicação
│   │   ├── Input.tsx                # Campo de entrada
│   │   ├── Select.tsx               # Campo de seleção
│   │   └── index.ts                 # Exports dos componentes
│   │
│   ├── 🔧 utils/                    # Funções utilitárias
│   │   ├── validators.ts            # Validações de formulário ✅
│   │   ├── apiHelpers.ts            # Helpers para API ✅
│   │   └── validators.test.ts       # Testes das validações
│   │
│   ├── 📋 types/                    # Interfaces TypeScript
│   │   └── index.ts                 # Tipos da aplicação ✅
│   │
│   ├── 📊 constants/                # Constantes e dados mock
│   │   └── mockData.ts              # Dados de teste ✅
│   │
│   ├── 🎨 lib/                      # Bibliotecas auxiliares
│   │   └── utils.ts                 # Função cn() para classes CSS
│   │
│   ├── 🌐 api/                      # Configurações de API
│   │   └── api.txt                  # Documentação de APIs futuras
│   │
│   ├── 🎣 hooks/                    # Custom React Hooks
│   │   └── hook.txt                 # Hooks futuros (auth, forms)
│   │
│   ├── 📄 pages/                    # Páginas futuras
│   │   └── pages.txt                # Documentação de páginas
│   │
│   ├── 🛣️ routes/                   # Configurações de rotas
│   │   └── routes.txt               # Rotas futuras
│   │
│   ├── 🔗 services/                 # Serviços externos
│   │   └── services.txt             # APIs e integrações
│   │
│   └── ⚙️ config/                   # Configurações
│       └── config.txt               # Configurações da aplicação
│
├── 🖼️ public/                       # Assets públicos
│   └── assets/                      # Imagens e ícones
│       ├── icon.png                 # Ícone da aplicação
│       ├── splash-icon.png          # Splash screen
│       ├── favicon.png              # Favicon web
│       ├── Logo UniRV_Prancheta...  # Logo UniRV
│       ├── logo Medicina-02 1.png   # Logo Medicina
│       └── Fasoft Aprovada-01 1.png # Logo Fasoft
│
├── ⚙️ Arquivos de Configuração
│   ├── app.json                     # Configuração do Expo
│   ├── babel.config.js              # Configuração do Babel + NativeWind
│   ├── metro.config.js              # Configuração do Metro + NativeWind
│   ├── tailwind.config.js           # Configuração do Tailwind (cores customizadas)
│   ├── tsconfig.json                # Configuração do TypeScript
│   ├── global.css                   # Estilos globais do Tailwind
│   ├── nativewind-env.d.ts          # Tipos do NativeWind
│   ├── package.json                 # Dependências do projeto
│   └── package-lock.json            # Lock das dependências
│
└── 📖 Documentação
    ├── STACK-TECNOLOGICA.md         # Este arquivo
    └── TELA-CADASTRO-DOCUMENTACAO.md # Documentação específica do cadastro
```

## 📦 **Dependências**

### **Produção**
```json
{
  "@fortawesome/fontawesome-svg-core": "^6.7.2",
  "@fortawesome/free-solid-svg-icons": "^7.0.1", 
  "@fortawesome/react-native-fontawesome": "^0.3.2",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "expo": "~53.0.22",
  "expo-router": "~5.1.5",
  "expo-status-bar": "~2.2.3",
  "nativewind": "4.1.23",
  "react": "19.0.0",
  "react-dom": "19.0.0",
  "react-native": "0.79.6",
  "react-native-vector-icons": "^10.3.0",
  "react-native-web": "^0.20.0",
  "tailwind-merge": "^3.3.1",
  "tailwindcss": "^3.3.0"
}
```

### **Desenvolvimento**
```json
{
  "@babel/core": "^7.25.2",
  "@types/react": "~19.0.10",
  "typescript": "~5.8.3"
}
```

## 🛠️ **Configuração do Ambiente**

### **Pré-requisitos**
- **Node.js** 18+ 
- **npm** ou **yarn**
- **Expo CLI** (global): `npm install -g @expo/cli`
- **Git** para controle de versão

### **Instalação**
```bash
# Clone o repositório
git clone <url-do-repositorio>
cd olimpiada-solidaria/front

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npx expo start
```

### **Scripts Disponíveis**
```bash
npm start          # Inicia o Expo Dev Server
npm run android    # Abre no emulador Android
npm run ios        # Abre no simulador iOS
npm run web        # Abre no navegador
```

## 🎨 **Sistema de Design**

### **Cores Personalizadas (Figma)**
```javascript
// tailwind.config.js
colors: {
  'primary-blue': '#004F9E',      // Azul principal header
  'button-blue': '#0254EB',       // Azul botão
  'element-blue': '#3576EF',      // Azul elementos (dropdown, checkbox)
  'light-blue': '#A9C2F0',       // Azul claro (círculo ícone)
  'very-light-blue': '#EFF4FC',  // Azul muito claro
  'light-gray': '#F4F4F4',       // Cinza claro
  'medium-gray': '#D9D9D9',      // Cinza médio footer
  'success-green': '#329A24',     // Verde footer
  'input-bg': 'rgba(217, 217, 217, 0.3)',
  'terms-bg': 'rgba(217, 217, 217, 0.35)',
  'icon-circle-bg': 'rgba(169, 194, 240, 0.5)',
  'text-gray': 'rgba(0, 0, 0, 0.5)',
}
```

### **Dimensões Customizadas**
```javascript
height: {
  '15': '60px',   // Header logos
  '35': '140px',  // Header InfoMed
  '14': '56px',   // Inputs e botão
  '12.5': '50px', // Footer
}
```

## 🧪 **Funcionalidades Implementadas**

### ✅ **Tela de Cadastro Médico** (`/cadastro`)
- **Validações completas**: Telefone BR, CRM, Email, Senhas
- **Formatação automática**: Telefone brasileiro
- **Feedback visual**: Bordas vermelhas, mensagens de erro
- **Estados de loading**: Botão com indicador de carregamento
- **Dev mode secreto**: Ativado clicando 5x no logo Fasoft
- **Dados de teste**: Preenchimento automático para desenvolvimento
- **Preparação para API**: Dados formatados corretamente

### ✅ **Tela Inicial** (`/`)
- **Interface limpa**: Sem header desnecessário
- **Navegação**: Botões para Cadastro e Login
- **Design responsivo**: Centralizado e profissional

## 🔧 **Padrões de Desenvolvimento**

### **Estrutura de Componentes**
```typescript
// Exemplo de componente
interface ComponentProps {
  // Props tipadas
}

export function Component({ ...props }: ComponentProps) {
  // Lógica do componente
  return (
    <View className="tailwind-classes">
      {/* JSX */}
    </View>
  );
}
```

### **Validações**
```typescript
// src/utils/validators.ts
export function validateField(value: string): ValidationResult {
  // Lógica de validação
  return { ok: boolean, reason?: string };
}
```

### **Tipos TypeScript**
```typescript
// src/types/index.ts
export interface FormData {
  // Estrutura de dados
}
```

### **Estilização com NativeWind**
```jsx
// Usar classes Tailwind
<View className="flex-1 bg-white p-4">
  <Text className="text-lg font-semibold text-primary-blue">
    Título
  </Text>
</View>

// StyleSheet apenas para posicionamento absoluto complexo
const styles = StyleSheet.create({
  complexPositioning: {
    position: 'absolute',
    // ...
  }
});
```

## 🚀 **Guia para Novos Desenvolvedores**

### **1. Criando Nova Tela**
```bash
# Criar arquivo em app/
touch app/nova-tela.tsx

# Adicionar no _layout.tsx
<Stack.Screen name="nova-tela" options={{ title: "Nova Tela" }} />
```

### **2. Adicionando Validações**
```typescript
// Em src/utils/validators.ts
export function validateNewField(value: string): ValidationResult {
  // Sua validação aqui
}
```

### **3. Criando Componente**
```typescript
// Em src/components/NovoComponente.tsx
interface NovoComponenteProps {
  // Props
}

export function NovoComponente(props: NovoComponenteProps) {
  // Implementação
}

// Adicionar em src/components/index.ts
export { NovoComponente } from './NovoComponente';
```

### **4. Dados de Teste**
```typescript
// Em src/constants/mockData.ts
export const MOCK_NOVA_FUNCIONALIDADE = {
  // Seus dados de teste
};
```

## 🔒 **Boas Práticas**

### **Segurança**
- ✅ Nunca loggar senhas no console
- ✅ Sanitizar inputs antes de enviar para API
- ✅ Validar dados no front-end E back-end
- ✅ Usar função `sanitizeForLog()` para logs seguros

### **Performance**
- ✅ Usar NativeWind ao invés de StyleSheet quando possível
- ✅ Componentes funcionais com hooks
- ✅ Evitar re-renders desnecessários
- ✅ Otimizar imagens (usar `resizeMode="contain"`)

### **Manutenibilidade**
- ✅ Código TypeScript tipado
- ✅ Componentes pequenos e focados
- ✅ Separação clara de responsabilidades
- ✅ Documentação inline quando necessário

## 🧪 **Testes**

### **Dados de Teste Disponíveis**
```typescript
// src/constants/mockData.ts
MOCK_TEST_DATA     // Dados completos para teste
TELEFONE_EXAMPLES  // Exemplos de telefones válidos
CRM_EXAMPLES       // Exemplos de CRMs (incluindo teste)
```

### **Dev Mode**
- **Ativar**: 5 cliques no logo Fasoft
- **Desativar**: 3 cliques no logo Fasoft OU botão vermelho
- **Funcionalidades**: Preenchimento automático, logs extras, placeholders de teste

## 📋 **Próximas Implementações**

### **Telas Pendentes**
- [ ] **Login** (`/login`)
- [ ] **Menu Principal** (`/menu`)
- [ ] **Relatórios** (`/relatorios`)
- [ ] **Perfil** (`/perfil`)

### **Funcionalidades**
- [ ] **Autenticação JWT**
- [ ] **Integração com API real**
- [ ] **Offline support**
- [ ] **Push notifications**

## 🤝 **Colaboração**

### **Workflow Git**
```bash
# Criar branch para nova feature
git checkout -b feature/nome-da-feature

# Fazer commits descritivos
git commit -m "feat: implementa validação de CPF"

# Push da branch
git push origin feature/nome-da-feature

# Criar Pull Request
```

### **Convenções de Commit**
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação/estilo
- `refactor:` Refatoração
- `test:` Testes

## 📞 **Suporte**

### **Problemas Comuns**
1. **Metro não inicia**: `npx expo start --clear`
2. **Cache issues**: Deletar `node_modules` e `package-lock.json`, depois `npm install`
3. **Tipos do NativeWind**: Verificar se `nativewind-env.d.ts` existe
4. **Ícones não aparecem**: Verificar se `react-native-vector-icons` está linkado

### **Recursos Úteis**
- [Documentação Expo](https://docs.expo.dev/)
- [NativeWind Docs](https://www.nativewind.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Native](https://reactnative.dev/)

---

## 🎯 **Status do Projeto**

| Funcionalidade | Status | Responsável | Observações |
|----------------|--------|-------------|-------------|
| **Tela Cadastro** | ✅ Completa | @MarquesV | Validações + NativeWind + Dev Mode |
| **Tela Inicial** | ✅ Básica | @MarquesV | Navegação funcional |
| **Configuração Base** | ✅ Completa | @MarquesV | NativeWind + Expo Router + TypeScript |
| **Tela Login** | ⏳ Pendente | - | Aguardando desenvolvedor |
| **Menu Principal** | ⏳ Pendente | - | Aguardando desenvolvedor |
| **Relatórios** | ⏳ Pendente | - | Aguardando desenvolvedor |

---

**📱 Projeto preparado para desenvolvimento colaborativo!**  
**🚀 Base sólida com TypeScript + NativeWind + Expo Router**  
**📋 Documentação completa para facilitar onboarding da equipe**

*Última atualização: Setembro 2025*
