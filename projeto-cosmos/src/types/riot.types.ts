/**
 * Tipos relacionados à API da Riot Games
 */

/**
 * Plataformas regionais da Riot
 */
export type RiotPlatform = 'br1' | 'na1' | 'euw1' | 'eun1' | 'kr' | 'jp1' | 'la1' | 'la2' | 'oc1' | 'tr1' | 'ru';

/**
 * Regiões continentais da Riot
 */
export type RiotRegion = 'americas' | 'europe' | 'asia' | 'sea';

/**
 * Dados de conta da Riot
 */
export interface RiotAccount {
  puuid: string;
  gameName: string;
  tagLine: string;
}

/**
 * Dados de ranking/liga
 */
export interface RiotLeagueEntry {
  summonerId: string;
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}

/**
 * Dados de partida
 */
export interface RiotMatch {
  metadata: {
    matchId: string;
    participants: string[];
  };
  info: {
    gameCreation: number;
    gameDuration: number;
    gameMode: string;
    participants: RiotMatchParticipant[];
  };
}

/**
 * Dados de participante em uma partida
 */
export interface RiotMatchParticipant {
  puuid: string;
  summonerName: string;
  championName: string;
  championId: number;
  teamId: number;
  kills: number;
  deaths: number;
  assists: number;
  totalMinionsKilled: number;
  visionScore: number;
  win: boolean;
}
