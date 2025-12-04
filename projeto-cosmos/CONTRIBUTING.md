# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o Projeto Cosmos! Este documento fornece diretrizes para contribuições.

## 📋 Código de Conduta

- Seja respeitoso e profissional
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Mostre empatia com outros membros

## 🚀 Como Contribuir

### 1. Fork & Clone

```bash
# Fork no GitHub e clone seu fork
git clone https://github.com/SEU-USERNAME/RankingLoL.git
cd RankingLoL/projeto-cosmos
```

### 2. Crie uma Branch

```bash
# Para novas funcionalidades
git checkout -b feature/nome-da-funcionalidade

# Para correções de bugs
git checkout -b fix/descricao-do-bug

# Para documentação
git checkout -b docs/descricao-da-mudanca
```

### 3. Faça suas Mudanças

#### Estrutura de Código
- Use **TypeScript** com tipagem estrita
- Siga o padrão **ESLint** configurado
- Mantenha componentes pequenos e focados
- Adicione **comentários** em código complexo

#### Convenções de Nomenclatura
```typescript
// Componentes: PascalCase
export default function PlayerCard() {}

// Funções: camelCase
function calculateKDA() {}

// Constantes: UPPER_SNAKE_CASE
const API_TIMEOUT = 5000;

// Tipos/Interfaces: PascalCase
interface PlayerData {}
```

#### Organização de Arquivos
```
src/
├── types/          # Interfaces e tipos TypeScript
├── constants/      # Valores constantes
├── components/     # Componentes React reutilizáveis
└── utils/          # Funções auxiliares

lib/                # Lógica core (db, auth, apis)
app/                # Páginas e rotas Next.js
```

### 4. Teste suas Mudanças

```bash
# Execute o linter
npm run lint

# Teste localmente
npm run dev

# Verifique no navegador
# http://localhost:3000
```

### 5. Commit com Mensagens Claras

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Exemplos:
git commit -m "feat: adiciona filtro por tier no ranking"
git commit -m "fix: corrige cálculo de KDA em jogadores sem mortes"
git commit -m "docs: atualiza README com novas instruções"
git commit -m "refactor: move tipos para pasta src/types"
git commit -m "style: corrige indentação em PlayerCard"
git commit -m "perf: otimiza query de busca de jogadores"
```

#### Tipos de Commit:
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (sem mudança de lógica)
- `refactor`: Refatoração de código
- `perf`: Melhoria de performance
- `test`: Adiciona/corrige testes
- `chore`: Tarefas de build/config

### 6. Push e Pull Request

```bash
# Push para seu fork
git push origin feature/nome-da-funcionalidade
```

Abra um Pull Request no GitHub com:
- **Título claro** descrevendo a mudança
- **Descrição detalhada** do que foi feito e por quê
- **Screenshots** se houver mudanças visuais
- **Referência** a issues relacionadas (#123)

## 📝 Checklist do Pull Request

- [ ] Código segue o padrão ESLint
- [ ] Sem erros do TypeScript
- [ ] Funcionalidade testada localmente
- [ ] Comentários adicionados onde necessário
- [ ] README atualizado (se aplicável)
- [ ] Commits seguem padrão Conventional Commits
- [ ] Sem arquivos desnecessários (node_modules, .env, etc)

## 🐛 Reportando Bugs

Ao reportar um bug, inclua:
1. **Descrição clara** do problema
2. **Passos para reproduzir**
3. **Comportamento esperado** vs **comportamento atual**
4. **Screenshots** se aplicável
5. **Ambiente**: OS, Browser, Node version

## 💡 Sugerindo Funcionalidades

Para sugerir novas funcionalidades:
1. **Verifique** se já não existe issue similar
2. **Descreva** o problema que a funcionalidade resolve
3. **Explique** a solução proposta
4. **Considere alternativas** e trade-offs

## 📚 Recursos Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Riot Games API](https://developer.riotgames.com/)

## ❓ Dúvidas?

Se tiver dúvidas sobre como contribuir:
- Abra uma [Discussion](https://github.com/jorge3h228/RankingLoL/discussions)
- Entre em contato via Issues

---

Obrigado por contribuir! 🎉
