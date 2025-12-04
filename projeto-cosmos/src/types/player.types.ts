/**
 * Tipos relacionados aos jogadores e rankings
 */

/**
 * Interface de um Campeão no Top 3
 * Contém dados de performance do jogador com esse campeão
 */
export interface TopChampion {
  championId: string;
  championName: string;
  championIcon: string;
  games: number;
  winRate: number;
}

/**
 * Interface completa de um jogador no sistema
 * Inclui dados do banco e campos computados
 */
export interface Player {
  id?: number;
  game_name: string;
  tag_line: string;
  puuid?: string;
  tier?: string;
  rank?: string;
  league_points?: number;
  wins?: number;
  losses?: number;
  kills?: number;
  deaths?: number;
  assists?: number;
  cs?: number; // Creep Score
  vision_score?: number; // Vision Score
  top_champions?: TopChampion[]; // Top 3 campeões com stats
  total_lp_gained?: number; // Points Difference Loss
  created_at?: string;
  updated_at?: string;
  // Campos computados (gerados pelas funções de busca)
  kda?: { kills: number; deaths: number; assists: number };
  topChampions?: TopChampion[];
  visionScore?: number;
  totalLPGained?: number;
}

/**
 * Tipo interno representando a estrutura raw do banco
 * Usado internamente pelo módulo db
 */
export interface PlayerRow {
  id: number;
  game_name: string;
  tag_line: string;
  puuid: string;
  tier: string;
  rank: string;
  league_points: number;
  wins: number;
  losses: number;
  kills: number;
  deaths: number;
  assists: number;
  cs: number;
  vision_score: number;
  top_champions: string;
  total_lp_gained: number;
  created_at: string;
  updated_at: string;
}
