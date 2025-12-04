# 🏗️ Arquitetura do Projeto

Este documento descreve a organização e arquitetura do Projeto Cosmos.

## 📂 Estrutura de Diretórios

```
projeto-cosmos/
│
├── 📱 app/                          # Next.js App Router (Páginas e API)
│   ├── page.tsx                     # Página principal - Ranking
│   ├── layout.tsx                   # Layout global com metadata
│   ├── globals.css                  # Estilos globais
│   │
│   ├── admin/                       # Área administrativa
│   │   ├── page.tsx                 # Dashboard admin (protegido)
│   │   └── login/page.tsx           # Login admin
│   │
│   └── api/                         # API Routes (Backend)
│       ├── players/route.ts         # CRUD de jogadores
│       ├── admin/
│       │   ├── login/route.ts       # Autenticação
│       │   └── validate/route.ts    # Validação de token
│       └── riot/                    # Proxy Riot API
│           ├── account/route.ts     # Busca de conta
│           ├── league/route.ts      # Dados de liga
│           └── match/route.ts       # Dados de partida
│
├── 🔧 lib/                          # Lógica Core do Sistema
│   ├── db.ts                        # Operações SQLite (CRUD)
│   ├── auth.ts                      # JWT + Autenticação
│   └── riot.ts                      # Cliente Riot Games API
│
├── 📦 src/                          # Código Fonte Organizado
│   ├── types/                       # TypeScript Definitions
│   │   ├── player.types.ts          # Tipos de jogadores
│   │   ├── auth.types.ts            # Tipos de autenticação
│   │   ├── riot.types.ts            # Tipos da Riot API
│   │   └── index.ts                 # Barrel export
│   │
│   ├── constants/                   # Valores Constantes
│   │   ├── tiers.ts                 # Tiers, ranks, cores
│   │   ├── riot.ts                  # Configs da Riot API
│   │   └── index.ts                 # Barrel export
│   │
│   ├── components/                  # Componentes React (futuro)
│   ├── utils/                       # Funções auxiliares (futuro)
│   └── index.ts                     # Barrel export principal
│
├── 📚 docs/                         # Documentação Completa
│   ├── START_HERE.md                # Guia rápido (5 min)
│   ├── DOCUMENTATION.md             # Docs completa (815 linhas)
│   └── REVISION_SUMMARY.md          # Resumo técnico
│
├── 🎨 public/                       # Assets Estáticos
│   └── assets/
│       ├── icons/                   # Ícones
│       └── images/                  # Imagens
│           └── cosmos-icone.png
│
├── 📝 Arquivos de Configuração
│   ├── .editorconfig                # Consistência de código
│   ├── .env.example                 # Template de variáveis
│   ├── .gitignore                   # Arquivos ignorados pelo Git
│   ├── eslint.config.mjs            # Configuração ESLint
│   ├── tsconfig.json                # Configuração TypeScript
│   ├── next.config.ts               # Configuração Next.js
│   ├── postcss.config.mjs           # Configuração PostCSS
│   └── package.json                 # Dependências e scripts
│
├── 📄 Documentos Raiz
│   ├── README.md                    # Apresentação do projeto
│   ├── CONTRIBUTING.md              # Guia de contribuição
│   └── LICENSE                      # Licença MIT
│
└── 🗄️ ranking.db                   # Banco SQLite (não versionado)
```

## 🔄 Fluxo de Dados

### 1. Autenticação Admin
```
Login Form → POST /api/admin/login → lib/auth.ts
                                        ↓
                                   Valida senha
                                        ↓
                                   Gera JWT token
                                        ↓
                            Retorna token → localStorage
                                        ↓
                         Rotas protegidas verificam token
```

### 2. Busca de Jogadores
```
Página Principal → GET /api/players → lib/db.ts
                                        ↓
                               Query SQL → SQLite
                                        ↓
                            Retorna lista ordenada por LP
                                        ↓
                              Renderiza ranking
```

### 3. Adicionar Jogador (Admin)
```
Admin Panel → POST /api/players → Valida JWT
                                      ↓
                                lib/db.ts
                                      ↓
                           INSERT no SQLite
                                      ↓
                          Retorna sucesso
                                      ↓
                        Atualiza lista na UI
```

### 4. Integração Riot API (Preparada)
```
API Route → lib/riot.ts → fetch() Riot API
                              ↓
                    Verifica RIOT_API_KEY
                              ↓
            KEY existe? → Request real
            KEY ausente? → Mock data
                              ↓
                    Retorna dados normalizados
```

## 🧩 Padrões de Arquitetura

### Separation of Concerns
- **app/** - UI e Rotas (Next.js)
- **lib/** - Lógica de negócio
- **src/types** - Contratos de dados
- **src/constants** - Configurações

### Single Responsibility
Cada arquivo tem uma responsabilidade clara:
- `lib/db.ts` - Apenas operações de banco
- `lib/auth.ts` - Apenas autenticação
- `lib/riot.ts` - Apenas chamadas Riot API

### DRY (Don't Repeat Yourself)
- Tipos centralizados em `src/types`
- Constantes em `src/constants`
- Barrel exports para imports limpos

### Type Safety
- **100% TypeScript** com strict mode
- Interfaces explícitas para todos os dados
- No uso de `any` (substituído por `unknown` + type guards)

## 📡 API Design

### RESTful Endpoints
```typescript
GET    /api/players          # Lista todos
POST   /api/players          # Cria novo
DELETE /api/players?id=123   # Remove por ID

POST   /api/admin/login      # Autenticação
POST   /api/admin/validate   # Valida token
```

### Respostas Padronizadas
```typescript
// Sucesso
{ players: [...], count: 5 }

// Erro
{ error: "Mensagem de erro" }
```

## 🗄️ Modelo de Dados

### Tabela `players`
```sql
CREATE TABLE players (
  -- Identificação
  id INTEGER PRIMARY KEY,
  game_name TEXT NOT NULL,
  tag_line TEXT NOT NULL,
  puuid TEXT,
  
  -- Ranking
  tier TEXT DEFAULT 'UNRANKED',
  rank TEXT DEFAULT '',
  league_points INTEGER DEFAULT 0,
  
  -- Estatísticas
  wins INTEGER,
  losses INTEGER,
  kills REAL,
  deaths REAL,
  assists REAL,
  cs INTEGER,
  vision_score INTEGER,
  top_champions TEXT,  -- JSON array
  total_lp_gained INTEGER,
  
  -- Metadados
  created_at DATETIME,
  updated_at DATETIME,
  
  UNIQUE(game_name, tag_line)
);
```

## 🔐 Segurança

### Autenticação
- **JWT tokens** com expiração de 7 dias
- **bcryptjs** para hashing de senhas
- **Validação** em todas as rotas protegidas

### Proteção de Dados
- `.env` não versionado (Git)
- Variáveis sensíveis via ambiente
- Prepared statements (SQL injection protection)

### Headers de Segurança
```typescript
// Next.js aplica automaticamente:
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security
```

## 🚀 Performance

### Otimizações Implementadas
- **SQLite indexado** por LP
- **React.memo** em componentes pesados (futuro)
- **useCallback/useMemo** para evitar re-renders
- **Lazy loading** de imagens

### Caching
- **Next.js automatic caching** de rotas estáticas
- **Browser caching** de assets públicos

## 📦 Dependências Core

```json
{
  "next": "16.0.7",           // Framework full-stack
  "react": "19.2.0",          // UI library
  "typescript": "^5",         // Type safety
  "better-sqlite3": "^12.5.0", // Database
  "jsonwebtoken": "^9.0.3",   // Authentication
  "bcryptjs": "^3.0.3"        // Password hashing
}
```

## 🔮 Próximas Evoluções

### Componentes Reutilizáveis
```typescript
src/components/
├── PlayerCard.tsx       # Card de jogador
├── TierBadge.tsx        # Badge de tier
├── StatBar.tsx          # Barra de estatística
└── LoadingSpinner.tsx   # Spinner de loading
```

### Utilitários
```typescript
src/utils/
├── formatters.ts        # Formatação de dados
├── validators.ts        # Validações
└── calculators.ts       # Cálculos (KDA, win rate)
```

### Testes (Futuro)
```typescript
__tests__/
├── lib/
│   ├── db.test.ts
│   └── auth.test.ts
└── components/
    └── PlayerCard.test.tsx
```

## 📊 Métricas

- **28 arquivos essenciais** (após limpeza)
- **~1,400 linhas** de documentação
- **100% TypeScript** com strict mode
- **0 erros** ESLint/TypeScript
- **15 campos** por jogador no banco

## 🎯 Princípios Seguidos

✅ **Clean Code** - Nomes descritivos, funções pequenas  
✅ **SOLID** - Single responsibility, DI, ISP  
✅ **DRY** - Código não duplicado  
✅ **KISS** - Soluções simples e diretas  
✅ **YAGNI** - Apenas o necessário implementado  

---

**Última atualização:** Dezembro 2025  
**Versão:** 1.0.0
