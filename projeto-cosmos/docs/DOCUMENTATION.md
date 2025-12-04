# 📚 Projeto Cosmos - Documentação Profissional

**Ranking Interestelar de League of Legends com Tema Cosmic**

> Status: ✅ Em Produção | Versão: 1.0.0 | Atualizado: Dezembro 2025

---

## 📖 Índice

1. [Visão Geral](#visão-geral)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Instalação & Setup](#instalação--setup)
5. [Uso & Funcionalidades](#uso--funcionalidades)
6. [API REST](#api-rest)
7. [Autenticação JWT](#autenticação-jwt)
8. [Integração Riot API](#integração-riot-api)
9. [Banco de Dados](#banco-de-dados)
10. [Estilo & Design](#estilo--design)
11. [Troubleshooting](#troubleshooting)
12. [Contribuindo](#contribuindo)

---

## 🎯 Visão Geral

**Projeto Cosmos** é uma plataforma web para exibir rankings de jogadores de League of Legends com:

- 🎨 **Interface Cosmic**: Tema visual futurista com gradientes violeta/rosa, estrelas animadas
- 🏆 **Ranking Inteligente**: Ordenação automática por League Points (LP)
- 👥 **Painel Admin**: Gerenciamento seguro de jogadores via JWT
- 📊 **Estatísticas Detalhadas**: KDA, CS, Vision Score, Top Campeões, W/L
- 🔌 **Integração Riot API**: Pronto para sincronizar dados reais (em desenvolvimento)
- 🎭 **Modo Mock**: Funciona sem API key para desenvolvimento

**Comunidade**: Discord Cosmos

---

## 🏗️ Stack Tecnológico

| Categoria | Tecnologia | Versão | Uso |
|-----------|-----------|--------|-----|
| **Framework** | Next.js | 16.0.7 | Full-stack React com server-side rendering |
| **Runtime** | React | 19.2.0 | Componentes UI e estado |
| **Linguagem** | TypeScript | 5.x | Type-safety em todo projeto |
| **Styling** | Tailwind CSS | 4.x | Utilitários CSS (não utilizado ainda) |
| **BD Local** | SQLite | - | Persistência local com better-sqlite3 |
| **Autenticação** | JWT | - | Tokens com jsonwebtoken |
| **Segurança** | bcryptjs | 3.0.3 | Hash de senhas |
| **Linting** | ESLint | 9.x | Code quality |
| **Fonts** | Google Fonts | - | Orbitron (títulos), Space Mono (dados) |

**Dependências Principais**:
```json
{
  "dependencies": {
    "next": "16.0.7",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "better-sqlite3": "^12.5.0",
    "jsonwebtoken": "^9.0.3",
    "bcryptjs": "^3.0.3"
  },
  "devDependencies": {
    "typescript": "^5",
    "tailwindcss": "^4",
    "eslint": "^9"
  }
}
```

---

## 📂 Estrutura do Projeto

```
projeto-cosmos/
├── 📄 Configuração
│   ├── package.json              # Dependencies & scripts
│   ├── tsconfig.json             # TypeScript config
│   ├── next.config.ts            # Next.js config
│   ├── postcss.config.mjs         # PostCSS (Tailwind)
│   ├── eslint.config.mjs          # ESLint rules
│   └── .env.example              # Template variáveis ambiente
│
├── 🎨 Aplicação Frontend
│   ├── app/
│   │   ├── page.tsx              # ⭐ Página Ranking (público)
│   │   ├── layout.tsx            # Layout raiz com fonts
│   │   ├── globals.css           # Estilos globais
│   │   ├── favicon.ico           # Ícone abas navegador
│   │   ├── admin/
│   │   │   ├── page.tsx          # 🔒 Painel Admin (protegido)
│   │   │   └── login/
│   │   │       └── page.tsx      # 🔐 Login page
│   │   └── api/                  # Backend routes
│   │       ├── players/
│   │       │   └── route.ts      # GET/POST/DELETE players
│   │       ├── admin/
│   │       │   ├── login/
│   │       │   │   └── route.ts  # POST /api/admin/login
│   │       │   └── validate/
│   │       │       └── route.ts  # GET /api/admin/validate
│   │       └── riot/              # Integração Riot API
│   │           ├── account/
│   │           │   └── route.ts  # GET account info
│   │           ├── league/
│   │           │   └── route.ts  # GET league data
│   │           └── match/
│   │               └── route.ts  # GET match history
│
├── 🔧 Bibliotecas
│   └── lib/
│       ├── auth.ts               # JWT functions
│       ├── db.ts                 # SQLite operations
│       └── riot.ts               # Riot API client
│
├── 🎨 Assets
│   └── public/
│       └── assets/
│           └── images/
│               └── cosmos-icone.png
│
├── 💾 Banco de Dados
│   └── ranking.db                # SQLite database
│
└── 📚 Documentação
    ├── DOCUMENTATION.md          # Esta arquivo
    └── .gitignore               # Git exclusões
```

**Total de Arquivos Essenciais**: 26 arquivos

---

## 🚀 Instalação & Setup

### Pré-requisitos
- Node.js 18+ (com npm)
- Git

### 1. Clonar & Instalar

```bash
# Clone o repositório
git clone https://github.com/jorge3h228/RankingLoL.git
cd RankingLoL/projeto-cosmos

# Instale dependências
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie `.env.local` na raiz do projeto:

```bash
# Segurança
ADMIN_PASSWORD=seu_senha_admin_segura
JWT_SECRET=sua_chave_jwt_secreta_muito_longa

# Riot API (opcional, modo mock sem isso)
RIOT_API_KEY=RGAPI-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Next.js
NODE_ENV=development
```

**Valores Padrão** (desenvolvimento):
```bash
ADMIN_PASSWORD=admin123
JWT_SECRET=seu-secret-jwt-muito-seguro-nao-use-isso-em-producao
```

### 3. Iniciar Servidor

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Produção (build + start)
npm run build
npm run start

# Lint verificação
npm run lint
```

**Saída esperada**:
```
> ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

Acesse: `http://localhost:3000`

---

## 🎮 Uso & Funcionalidades

### Página Principal (Pública)

**URL**: `http://localhost:3000`

**Funcionalidades**:
- ✅ Visualizar ranking de jogadores ordenado por LP (decrescente)
- ✅ Ver top 3 campeões com ícones e taxa de vitória
- ✅ Exibir estatísticas: KDA, CS, Vision Score, W/L
- ✅ PDL (Points Difference Loss) - ganho/perda de LP
- ✅ Card especial para #1 com efeito visual destaque
- ✅ Hover animations para interatividade
- ✅ Tema cosmic: gradientes violeta/rosa, 60 estrelas animadas
- ✅ Indicador "Modo Mock" quando em desenvolvimento

**Layout Cards**:
```
┌─────────────────────────────────────────────┐
│ #1 | Icaro#Cosmos      DIAMOND II - 75 LP   │
│     +275 PDL                                  │
├─────────────────────────────────────────────┤
│ TOP CAMPEÕES: [Thresh 62%] [Tahm 58%] [Nami 55%]
├─────────────────────────────────────────────┤
│ KDA: 4.2/2.1/12.5 │ CS: 245 │ VISÃO: 52     │
│ TAXA: 127V | 89D                            │
└─────────────────────────────────────────────┘
```

### Painel Admin (Protegido)

**URL**: `http://localhost:3000/admin`

**Autenticação**:
1. Clique "🔐 Painel Admin" na página principal
2. Insira senha: `admin123` (configurável)
3. Receba JWT token válido por 7 dias

**Funcionalidades**:
- ✅ Adicionar novo jogador (modal com campos)
- ✅ Listar jogadores com dados completos
- ✅ Remover jogador
- ✅ Logout seguro (apaga token)
- ✅ Indicador mock mode ativo

**Fields Adicionar Jogador**:
```
Jogador:
- Game Name (ex: Phoenix)
- Tag Line (ex: BR)
- Tier (IRON, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND, MASTER, GRANDMASTER)
- Rank (I, II, III, IV - só para não-Grandmaster)
- League Points (0-100)
- Wins / Losses
- Kills / Deaths / Assists
- CS (Creep Score)
- Vision Score
- Top 3 Campeões (JSON com icon URLs)
```

---

## 🔌 API REST

### Endpoints Públicos

#### `GET /api/players`
**Descrição**: Retorna lista de todos os jogadores

**Resposta** (200 OK):
```json
{
  "players": [
    {
      "id": 1,
      "game_name": "Icaro",
      "tag_line": "Cosmos",
      "tier": "DIAMOND",
      "rank": "II",
      "league_points": 75,
      "wins": 127,
      "losses": 89,
      "kills": 4.2,
      "deaths": 2.1,
      "assists": 12.5,
      "cs": 245,
      "vision_score": 52,
      "total_lp_gained": 275,
      "kda": { "kills": 4.2, "deaths": 2.1, "assists": 12.5 },
      "topChampions": [
        {
          "championId": "412",
          "championName": "Thresh",
          "championIcon": "https://ddragon.leagueoflegends.com/...",
          "games": 87,
          "winRate": 62
        }
      ],
      "visionScore": 52,
      "totalLPGained": 275,
      "created_at": "2025-12-04 19:15:45",
      "updated_at": "2025-12-04 19:15:45"
    }
  ],
  "mockMode": true
}
```

---

### Endpoints Protegidos (Requer JWT)

#### `POST /api/admin/login`
**Descrição**: Gera JWT token para acesso admin

**Body**:
```json
{
  "password": "admin123"
}
```

**Resposta** (200 OK):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "admin",
    "role": "admin"
  }
}
```

**Erro** (401 Unauthorized):
```json
{
  "success": false,
  "error": "Senha inválida"
}
```

---

#### `GET /api/admin/validate`
**Descrição**: Valida se JWT está válido

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Resposta** (200 OK):
```json
{
  "valid": true,
  "user": {
    "userId": "admin",
    "role": "admin"
  }
}
```

**Erro** (401 Unauthorized):
```json
{
  "valid": false,
  "error": "Token inválido ou expirado"
}
```

---

#### `POST /api/players`
**Descrição**: Adicionar novo jogador (requer JWT)

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body**:
```json
{
  "game_name": "Phoenix",
  "tag_line": "BR",
  "tier": "DIAMOND",
  "rank": "I",
  "league_points": 95,
  "wins": 145,
  "losses": 72,
  "kills": 6.5,
  "deaths": 1.8,
  "assists": 8.2,
  "cs": 287,
  "vision_score": 48,
  "total_lp_gained": 320,
  "topChampions": [
    {
      "championId": "236",
      "championName": "Lucian",
      "championIcon": "https://ddragon.leagueoflegends.com/cdn/14.22.1/img/champion/Lucian.png",
      "games": 112,
      "winRate": 68
    }
  ]
}
```

**Resposta** (200 OK):
```json
{
  "success": true,
  "playerId": 2,
  "message": "Jogador adicionado com sucesso!",
  "mockMode": true
}
```

---

#### `DELETE /api/players/:id`
**Descrição**: Remover jogador (requer JWT)

**Headers**:
```
Authorization: Bearer <token>
```

**Resposta** (200 OK):
```json
{
  "success": true,
  "message": "Jogador removido com sucesso!"
}
```

---

### Teste via cURL

```bash
# 1. Obter token
TOKEN=$(curl -s -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password":"admin123"}' | jq -r '.token')

# 2. Adicionar jogador
curl -X POST http://localhost:3000/api/players \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "game_name": "Nova",
    "tag_line": "Player",
    "tier": "GOLD",
    "rank": "III",
    "league_points": 50,
    "wins": 100,
    "losses": 90,
    "kills": 5,
    "deaths": 3,
    "assists": 10,
    "cs": 200,
    "vision_score": 40,
    "total_lp_gained": 150,
    "topChampions": []
  }'

# 3. Listar jogadores
curl http://localhost:3000/api/players | jq '.'

# 4. Remover jogador
curl -X DELETE http://localhost:3000/api/players/2 \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🔐 Autenticação JWT

### Fluxo

```
┌─────────────┐
│  Usuário    │
└──────┬──────┘
       │ 1. POST /api/admin/login
       │    { password: "admin123" }
       ↓
┌─────────────────────────────┐
│  Servidor                   │
│ - Verifica senha            │
│ - Gera JWT                  │
│ - Expires: 7 dias           │
└──────┬──────────────────────┘
       │ 2. Responde token
       ↓
┌─────────────┐
│  Frontend   │ Armazena em localStorage
└──────┬──────┘
       │ 3. Requisições com Authorization header
       │    Authorization: Bearer <token>
       ↓
┌─────────────────────────────┐
│  Servidor                   │
│ - Verifica JWT signature    │
│ - Valida expiration         │
│ - Autoriza ação             │
└─────────────────────────────┘
```

### Implementação

**Arquivo**: `lib/auth.ts`

```typescript
// Gerar token
generateToken(payload): string

// Verificar token
verifyToken(token): JWTPayload | null

// Middleware proteção
requireAuth(request): JWTPayload
```

**Payload JWT**:
```typescript
{
  userId: "admin",
  role: "admin",
  iat: 1703000000,  // Issued at
  exp: 1703604000   // Expiration (7 dias)
}
```

### Variáveis de Ambiente

```bash
# .env.local
JWT_SECRET=sua-chave-super-secreta-com-muitos-caracteres
ADMIN_PASSWORD=senha_admin_segura_123
```

⚠️ **Segurança em Produção**:
- Use senhas fortes (20+ caracteres)
- Use JWT_SECRET de 32+ caracteres
- Implemente rate limiting no login
- Use HTTPS sempre
- Implemente refresh tokens

---

## 🎮 Integração Riot API

### Status: ✅ Pronto para Integração

**Arquivo**: `lib/riot.ts`

**Funcionalidades Preparadas**:
- ✅ Cliente Riot API autenticado
- ✅ Modo mock quando sem API key
- ✅ Tipos TypeScript definidos
- ✅ Endpoints preparados para:
  - Account lookup (nome#tag)
  - League data (rank, LP, wins/losses)
  - Match history
  - Summoner info

### Como Ativar

#### 1. Obter API Key

1. Acesse: https://developer.riotgames.com/
2. Crie conta / faça login
3. Crie uma aplicação
4. Copie a API Key

#### 2. Configurar Variável

```bash
# .env.local
RIOT_API_KEY=RGAPI-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

#### 3. Reinicar Servidor

```bash
npm run dev
```

#### 4. Testar Endpoints

```bash
# Account lookup
curl "http://localhost:3000/api/riot/account?gameName=Faker&tagLine=T1"

# League data
curl "http://localhost:3000/api/riot/league?summonerId=..."

# Match history
curl "http://localhost:3000/api/riot/match?puuid=..."
```

### Endpoints Disponíveis

**`GET /api/riot/account?gameName={name}&tagLine={tag}`**

Busca informações de conta

**`GET /api/riot/league?queue={queue}&tier={tier}&division={division}`**

Busca dados de liga

**`GET /api/riot/match?matchId={id}&regional={region}`**

Busca partida

---

## 💾 Banco de Dados

### Tecnologia: SQLite + better-sqlite3

**Arquivo**: `ranking.db` (criado automaticamente)

### Schema

```sql
CREATE TABLE players (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  game_name TEXT NOT NULL,
  tag_line TEXT NOT NULL,
  puuid TEXT,
  tier TEXT,
  rank TEXT,
  league_points INTEGER DEFAULT 0,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  kills REAL DEFAULT 0,
  deaths REAL DEFAULT 0,
  assists REAL DEFAULT 0,
  cs INTEGER DEFAULT 0,
  vision_score INTEGER DEFAULT 0,
  top_champions TEXT,           -- JSON array
  total_lp_gained INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Operações

**Arquivo**: `lib/db.ts`

```typescript
// Operações disponíveis:
getAllPlayers(): Player[]
getPlayerById(id): Player | null
addPlayer(data): Player
updatePlayer(id, data): Player
deletePlayer(id): boolean
```

### Backup & Restore

```bash
# Backup
cp ranking.db ranking.db.backup

# Restaurar
cp ranking.db.backup ranking.db

# Reset (delete)
rm ranking.db  # Será recriado na próxima execução
```

---

## 🎨 Estilo & Design

### Tema: Cosmic Galaxy

**Cores Principais**:
- Fundo: Gradiente violeta `#0a0015` → `#2d1b4e`
- Destaque: Violeta `#a855f7`, Rosa `#ec4899`
- Texto: Roxo claro `#c4b5fd`, Branco `#f3e8ff`
- Cards: `rgba(26, 0, 51, 0.6)` com backdrop blur

### Animações

| Animação | Duração | Uso |
|----------|---------|-----|
| `gradientShift` | 15s | Fundo ondulante |
| `float` | 3s | Logo flutuante |
| `twinkle` | 2-5s | Estrelas piscantes |
| `hover` | 0.3s | Interatividade cards |

### Fontes

- **Orbitron** (Google): Títulos futuristas
- **Space Mono** (Google): Dados técnicos monospace

### Responsividade

- Mobile: 320px (stack vertical)
- Tablet: 768px (grid 2 colunas)
- Desktop: 1000px max-width (container)
- Escalas automáticas com flexbox/grid

---

## 🔧 Troubleshooting

### ❌ "Port 3000 in use"

```bash
# Linux/Mac
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### ❌ "Database table has no column"

```bash
# Reset banco de dados
rm ranking.db
npm run dev  # Recria schema automaticamente
```

### ❌ "JWT Token Invalid"

1. Verifique JWT_SECRET no `.env.local`
2. Token expirou? (7 dias) → Faça novo login
3. Token corrompido? → Apague localStorage

```javascript
// Console do navegador
localStorage.clear()  // Apaga tokens salvos
```

### ❌ "Modo Mock não funciona"

```bash
# Verifique variáveis
echo $RIOT_API_KEY  # Deve estar vazio ou undefined

# Se não funcionar, reinicie:
pkill -f "npm run dev"
npm run dev
```

### ❌ TypeScript errors

```bash
# Recompile
npm run build

# Ou lint
npm run lint -- --fix
```

---

## 📝 Contribuindo

### Fluxo de Contribuição

1. Fork o repositório
2. Crie branch: `git checkout -b feature/sua-feature`
3. Commit: `git commit -m "feat: descrição"`
4. Push: `git push origin feature/sua-feature`
5. Abra PR descrevendo mudanças

### Padrões de Código

- TypeScript strict mode ✅
- Comentários para lógica complexa ✅
- Testes unitários (se possível) ✅
- ESLint passing ✅

### Próximas Features

- [ ] Integração completa Riot API
- [ ] Dashboard com gráficos trending
- [ ] Sistema de notificações
- [ ] Cache inteligente
- [ ] Analytics
- [ ] Dark/Light mode toggle
- [ ] Export dados (CSV/JSON)
- [ ] Webhook Discord sync

---

## 📞 Suporte

- **Discord**: [Comunidade Cosmos]
- **Issues**: GitHub Issues
- **Email**: contato@projeto-cosmos.dev

---

## 📄 Licença

MIT © 2025 Projeto Cosmos

---

**Desenvolvido com ⚡ para a comunidade Discord Cosmos**

*Ultima atualização: Dezembro 2025*
