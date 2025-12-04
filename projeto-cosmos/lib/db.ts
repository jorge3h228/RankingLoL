import Database from 'better-sqlite3';
import path from 'path';
import type { Player, PlayerRow, TopChampion } from '@/types';

// Inicializa banco de dados SQLite na raiz do projeto
const dbPath = path.join(process.cwd(), 'ranking.db');
const db = new Database(dbPath);

/**
 * Cria tabela players se não existir
 * Contém todos os campos necessários para stats completos
 * UNIQUE(game_name, tag_line) impede duplicatas
 */
db.exec(`
  CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_name TEXT NOT NULL,
    tag_line TEXT NOT NULL,
    puuid TEXT,
    tier TEXT DEFAULT 'UNRANKED',
    rank TEXT DEFAULT '',
    league_points INTEGER DEFAULT 0,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    kills REAL DEFAULT 0,
    deaths REAL DEFAULT 0,
    assists REAL DEFAULT 0,
    cs INTEGER DEFAULT 0,
    vision_score INTEGER DEFAULT 0,
    top_champions TEXT DEFAULT '[]',
    total_lp_gained INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(game_name, tag_line)
  )
`);

// Re-exporta tipos para retrocompatibilidade
export type { TopChampion, Player, PlayerRow } from '@/types';

// ===== OPERAÇÕES CRUD =====

/**
 * Adiciona novo jogador ao banco
 * Gera PUUID mock se não fornecido
 */
export function addPlayer(player: Omit<Player, 'id' | 'created_at' | 'updated_at'>) {
  const stmt = db.prepare(`
    INSERT INTO players (game_name, tag_line, puuid, tier, rank, league_points, wins, losses, kills, deaths, assists, cs, vision_score, top_champions, total_lp_gained)
    VALUES (@game_name, @tag_line, @puuid, @tier, @rank, @league_points, @wins, @losses, @kills, @deaths, @assists, @cs, @vision_score, @top_champions, @total_lp_gained)
  `);
  
  const result = stmt.run({
    game_name: player.game_name,
    tag_line: player.tag_line,
    puuid: player.puuid || `MOCK-PUUID-${Date.now()}`,
    tier: player.tier || 'UNRANKED',
    rank: player.rank || '',
    league_points: player.league_points || 0,
    wins: player.wins || 0,
    losses: player.losses || 0,
    kills: player.kills || 0,
    deaths: player.deaths || 0,
    assists: player.assists || 0,
    cs: player.cs || 0,
    vision_score: player.vision_score || 0,
    top_champions: JSON.stringify(player.top_champions || []),
    total_lp_gained: player.total_lp_gained || 0,
  });

  return result.lastInsertRowid;
}

/**
 * Lista todos os jogadores ordenados por LP (decrescente)
 * Parseia JSON dos campeões automaticamente
 */
export function getAllPlayers(): Player[] {
  const stmt = db.prepare('SELECT * FROM players ORDER BY league_points DESC');
  const players = stmt.all() as PlayerRow[];
  
  return players.map(({ top_champions, ...player }) => ({
    ...player,
    kda: {
      kills: player.kills || 0,
      deaths: player.deaths || 0,
      assists: player.assists || 0
    },
    topChampions: JSON.parse(top_champions || '[]') as TopChampion[],
    visionScore: player.vision_score,
    totalLPGained: player.total_lp_gained
  }));
}

// Buscar jogador por ID
export function getPlayerById(id: number): Player | undefined {
  const stmt = db.prepare('SELECT * FROM players WHERE id = ?');
  const row = stmt.get(id) as PlayerRow | undefined;
  if (!row) return undefined;
  
  const { top_champions, ...player } = row;
  return {
    ...player,
    kda: {
      kills: player.kills || 0,
      deaths: player.deaths || 0,
      assists: player.assists || 0
    },
    topChampions: JSON.parse(top_champions || '[]') as TopChampion[],
    visionScore: player.vision_score,
    totalLPGained: player.total_lp_gained
  };
}

// Buscar jogador por nome e tag
export function getPlayerByNameTag(gameName: string, tagLine: string): Player | undefined {
  const stmt = db.prepare('SELECT * FROM players WHERE game_name = ? AND tag_line = ?');
  const row = stmt.get(gameName, tagLine) as PlayerRow | undefined;
  if (!row) return undefined;
  
  const { top_champions, ...player } = row;
  return {
    ...player,
    kda: {
      kills: player.kills || 0,
      deaths: player.deaths || 0,
      assists: player.assists || 0
    },
    topChampions: JSON.parse(top_champions || '[]') as TopChampion[],
    visionScore: player.vision_score,
    totalLPGained: player.total_lp_gained
  };
}

// Atualizar jogador
export function updatePlayer(id: number, data: Partial<Player>) {
  const fields = Object.keys(data)
    .filter(key => key !== 'id' && key !== 'created_at')
    .map(key => `${key} = @${key}`)
    .join(', ');

  if (!fields) return;

  const stmt = db.prepare(`
    UPDATE players 
    SET ${fields}, updated_at = CURRENT_TIMESTAMP
    WHERE id = @id
  `);

  stmt.run({ ...data, id });
}

// Deletar jogador
export function deletePlayer(id: number) {
  const stmt = db.prepare('DELETE FROM players WHERE id = ?');
  stmt.run(id);
}

export default db;
