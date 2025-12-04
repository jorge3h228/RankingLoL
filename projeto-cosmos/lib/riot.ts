// servidor-side helper para chamar Riot API com modo MOCK quando não há API key
const RIOT_API_KEY = process.env.RIOT_API_KEY;
const MOCK_MODE = !RIOT_API_KEY;

function normalizeTag(tag: string) {
  if (!tag) return tag;
  return tag.startsWith('#') ? tag.slice(1) : tag;
}

async function riotFetch(url: string, init: RequestInit = {}) {
  if (MOCK_MODE) throw new Error('No RIOT_API_KEY configured; running in mock mode');

  const res = await fetch(url, {
    ...init,
    headers: {
      'X-Riot-Token': RIOT_API_KEY!,
      'Accept': 'application/json',
      ...(init.headers || {}),
    },
  });

  if (res.status === 429) {
    const retryAfter = res.headers.get('Retry-After') || '1';
    const err = new Error(`Rate limited. Retry after ${retryAfter}s`) as Error & { retryAfter?: number; status?: number };
    err.retryAfter = Number(retryAfter);
    err.status = 429;
    throw err;
  }

  if (!res.ok) {
    const text = await res.text();
    const err = new Error(`Riot API error ${res.status}: ${text}`) as Error & { status?: number };
    err.status = res.status;
    throw err;
  }

  return res.json();
}

// --- Mock data (used quando não há chave) ---
const MOCK_ACCOUNT = {
  puuid: 'MOCK-PUUID-001',
  gameName: 'Rei da Baixada',
  tagLine: 'MEC',
  id: 'MOCK-ACCOUNT-001',
};

const MOCK_MATCH = {
  metadata: { matchId: 'MOCK_MATCH_1', dataVersion: 'MockV1' },
  info: {
    gameDuration: 1800,
    participants: [
      { puuid: 'MOCK-PUUID-001', summonerName: 'Rei da Baixada', teamId: 100, championName: 'Yasuo' },
      { puuid: 'MOCK-PUUID-002', summonerName: 'Outro Player', teamId: 200, championName: 'Lux' },
    ],
  },
};

const MOCK_LEAGUE_ENTRIES = [
  {
    leagueId: 'MOCK-L1',
    summonerName: 'Rei da Baixada',
    summonerId: 'MOCK-ACCOUNT-001',
    queueType: 'RANKED_SOLO_5x5',
    tier: 'DIAMOND',
    rank: 'I',
    leaguePoints: 100,
  },
  {
    leagueId: 'MOCK-L2',
    summonerName: 'Outro Player',
    summonerId: 'MOCK-ACCOUNT-002',
    queueType: 'RANKED_SOLO_5x5',
    tier: 'GOLD',
    rank: 'IV',
    leaguePoints: 20,
  },
];

// --- Exported helpers ---
export async function getMatchById(matchId: string, regional: string = 'americas') {
  if (MOCK_MODE) {
    return MOCK_MATCH;
  }

  const base = `https://${regional}.api.riotgames.com`;
  const url = `${base}/lol/match/v5/matches/${encodeURIComponent(matchId)}`;
  return riotFetch(url);
}

export async function getAccountByRiotId(gameName: string, tagLine: string, platform = 'na1') {
  if (MOCK_MODE) {
    const norm = normalizeTag(tagLine || '');
    if ((gameName || '').toLowerCase() === 'rei da baixada' && norm.toLowerCase() === 'mec') return MOCK_ACCOUNT;
    return { ...MOCK_ACCOUNT, gameName, tagLine: norm };
  }

  const base = `https://${platform}.api.riotgames.com`;
  const url = `${base}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;
  return riotFetch(url);
}

export async function getLeagueEntries(queue: string, tier: string, division: string, platform = 'na1') {
  if (MOCK_MODE) {
    return MOCK_LEAGUE_ENTRIES.filter(e => e.queueType === queue || !queue);
  }

  const base = `https://${platform}.api.riotgames.com`;
  const url = `${base}/lol/league/v4/entries/${encodeURIComponent(queue)}/${encodeURIComponent(tier)}/${encodeURIComponent(division)}`;
  return riotFetch(url);
}

export const __mockMode = MOCK_MODE;
