# Olimpíada Solidária - Forms

Projeto de criação de uma aplicação mobile para levantamento de informações pelos profissionais da saúde da Universidade de Rio Verde - UNIRV

## Estrutura de pastas

```
olimpiada-solidaria/
├── front/                    # Aplicação React Native (Expo)
│   ├── src/
│   │   ├── api/             # Configurações de API
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── config/          # Configurações gerais
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Telas da aplicação
│   │   ├── routes/          # Configuração de rotas
│   │   ├── services/        # Serviços e integrações
│   │   └── utils/           # Funções utilitárias
│   └── public/              # Assets públicos
├── back/                    # Backend da aplicação
└── README.md
```

## Stack Tecnológica

### Frontend
- **React Native** com **Expo**
- **TypeScript**
- **Expo Router** para navegação
- **NativeWind** (Tailwind CSS para React Native)
- **Font Awesome** para ícones
- **Shadcn/ui** com **Class Variance Authority** para componentes

### Arquitetura
- **Clean Architecture** para organização do código
- **Separação por branches** para cada tela/feature 