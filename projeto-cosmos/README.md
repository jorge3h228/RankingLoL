# 🎮 Projeto Cosmos - Ranking LoL

> Sistema de ranking profissional para jogadores de League of Legends com integração à API da Riot Games

[![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3.x-003B57?logo=sqlite)](https://www.sqlite.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

## 📋 Sobre

Sistema completo de gerenciamento e visualização de rankings para jogadores de League of Legends. Inclui painel administrativo, integração com API da Riot Games, autenticação JWT e banco de dados SQLite.

## ✨ Funcionalidades

- 🏆 **Ranking em tempo real** com estatísticas detalhadas
- 👤 **Perfis de jogadores** com KDA, CS, Vision Score
- 🎖️ **Sistema de tiers** (Iron até Challenger)
- 🔐 **Painel administrativo** protegido por senha
- 🎯 **Top 3 campeões** por jogador
- 📊 **Estatísticas visuais** com gráficos de desempenho
- 🌐 **API REST** completa para integração
- 🔄 **Integração Riot API** (preparada para chave oficial)

## 🚀 Quick Start

```bash
# 1. Clone o repositório
git clone https://github.com/jorge3h228/RankingLoL.git
cd RankingLoL/projeto-cosmos

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite .env e adicione suas chaves

# 4. Inicie o servidor de desenvolvimento
npm run dev

# 5. Acesse no navegador
# http://localhost:3000
```

## 📚 Documentação

- 📖 **[START_HERE.md](./docs/START_HERE.md)** - Guia rápido de início (5 minutos)
- 📘 **[DOCUMENTATION.md](./docs/DOCUMENTATION.md)** - Documentação completa (815 linhas)
- 📝 **[REVISION_SUMMARY.md](./docs/REVISION_SUMMARY.md)** - Resumo técnico do projeto

## 🏗️ Estrutura do Projeto

```
projeto-cosmos/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Página principal (ranking)
│   ├── layout.tsx           # Layout global
│   ├── admin/               # Painel administrativo
│   │   ├── page.tsx         # Dashboard admin
│   │   └── login/           # Login admin
│   └── api/                 # API Routes
│       ├── players/         # CRUD de jogadores
│       ├── admin/           # Autenticação admin
│       └── riot/            # Proxy Riot API
├── lib/                     # Bibliotecas core
│   ├── db.ts               # Funções do banco SQLite
│   ├── auth.ts             # Autenticação JWT
│   └── riot.ts             # Cliente Riot API
├── src/                     # Código fonte organizado
│   ├── types/              # TypeScript types
│   │   ├── player.types.ts
│   │   ├── auth.types.ts
│   │   └── riot.types.ts
│   ├── constants/          # Constantes do projeto
│   │   ├── tiers.ts
│   │   └── riot.ts
│   ├── components/         # Componentes React (futuro)
│   └── utils/              # Funções auxiliares (futuro)
├── public/                  # Assets estáticos
│   └── assets/
│       ├── icons/
│       └── images/
├── docs/                    # Documentação
│   ├── START_HERE.md
│   ├── DOCUMENTATION.md
│   └── REVISION_SUMMARY.md
└── ranking.db              # Banco de dados SQLite
```

## 🛠️ Stack Tecnológico

### Core
- **Next.js 16.0.7** - Framework React full-stack
- **React 19.2.0** - Biblioteca UI
- **TypeScript 5.x** - Tipagem estática

### Database & Auth
- **SQLite** (better-sqlite3) - Banco de dados local
- **JWT** (jsonwebtoken) - Autenticação segura
- **bcryptjs** - Hashing de senhas

### Code Quality
- **ESLint 9.x** - Linter configurado
- **TypeScript** - Strict mode ativado

## 📡 API Endpoints

### Jogadores
```typescript
GET    /api/players          # Lista todos os jogadores
POST   /api/players          # Adiciona novo jogador
DELETE /api/players?id=123   # Remove jogador
```

### Admin
```typescript
POST   /api/admin/login      # Login admin
POST   /api/admin/validate   # Valida token JWT
```

### Riot Games (Proxy)
```typescript
GET /api/riot/account?gameName=X&tagLine=Y    # Busca conta
GET /api/riot/league?queue=RANKED_SOLO_5x5    # Busca ranks
GET /api/riot/match?matchId=BR1_123           # Busca partida
```

## 🔑 Variáveis de Ambiente

```env
# JWT Secret (OBRIGATÓRIO)
JWT_SECRET=sua-chave-super-secreta-aqui

# Senha do Admin (OBRIGATÓRIO)
ADMIN_PASSWORD=sua-senha-forte

# Riot API Key (OPCIONAL - usa mock se não fornecida)
RIOT_API_KEY=RGAPI-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

## 🎯 Comandos Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento (porta 3000)
npm run build    # Compila projeto para produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa ESLint
```

## 👤 Painel Admin

Acesse em: `http://localhost:3000/admin/login`

**Senha padrão:** Definida na variável `ADMIN_PASSWORD` do `.env`

### Funcionalidades Admin:
- ➕ Adicionar novos jogadores
- ❌ Remover jogadores existentes
- 📊 Visualizar lista completa
- 🔄 Atualizar dados em tempo real

## 🗄️ Banco de Dados

### Tabela `players` (15 campos):
```sql
- id, game_name, tag_line
- puuid, tier, rank, league_points
- wins, losses, kills, deaths, assists
- cs, vision_score, top_champions
- total_lp_gained, created_at, updated_at
```

## 🔒 Segurança

✅ Autenticação JWT com tokens de 7 dias  
✅ Senhas hasheadas com bcryptjs  
✅ Validação de tokens em rotas admin  
✅ Proteção contra SQL injection (prepared statements)  
✅ Variáveis sensíveis em `.env` (não versionado)

## 🎨 Design

- **Dark mode** por padrão
- **Responsivo** para mobile/desktop
- **Gradientes customizados** por tier
- **Animações suaves** CSS
- **Estrelas animadas** no background

## 📦 Dependências Principais

```json
{
  "next": "16.0.7",
  "react": "19.2.0",
  "typescript": "^5",
  "better-sqlite3": "^12.5.0",
  "jsonwebtoken": "^9.0.3",
  "bcryptjs": "^3.0.3"
}
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## 🐛 Issues

Encontrou um bug? Tem uma sugestão? Abra uma [issue](https://github.com/jorge3h228/RankingLoL/issues).

## 👨‍💻 Autor

**Jorge**
- GitHub: [@jorge3h228](https://github.com/jorge3h228)
- Repository: [RankingLoL](https://github.com/jorge3h228/RankingLoL)

---

⭐ Se este projeto foi útil, considere dar uma estrela no repositório!
