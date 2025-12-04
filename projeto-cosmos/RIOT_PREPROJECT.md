# Riot API - Pre-projeto (mock enabled)

Este diretório contém um cliente server-side para a Riot API com modo *mock* — assim você pode construir e demonstrar o projeto sem possuir a `RIOT_API_KEY` ainda.

- Arquivo principal: `lib/riot.ts`
- Rotas de exemplo (app router):
  - `app/api/riot/account` → `GET ?gameName=...&tagLine=...`
  - `app/api/riot/match` → `GET ?matchId=...&regional=...`
  - `app/api/riot/league` → `GET ?queue=...&tier=...&division=...`

Modo de uso (sem chave / mock):
- Se não houver `RIOT_API_KEY` nas variáveis de ambiente, o cliente roda em *mock mode* e retorna dados fictícios. Útil para demonstração ao solicitar a chave.

Exemplo (mock) para testar o RiotID que você forneceu:
```
curl "http://localhost:3000/api/riot/account?gameName=Rei%20da%20Baixada&tagLine=%23MEC"
```

Página de teste front-end (Next.js app router):

Abra `http://localhost:3000/riot-test` para usar a interface que chama todas as rotas e mostra os resultados em JSON.

Quando receber a chave da Riot:
1. Crie `projeto-cosmos/.env.local` com:
```
RIOT_API_KEY=coloque_sua_chave_aqui
```
2. Reinicie o servidor (`npm run dev`).

Notas:
- Rotas usam `fetch` server-side; não exponha a chave no client.
- Implementação atual retorna mock se não houver chave — substitua/adapte para adicionar caching, retries e logging quando for para produção.
