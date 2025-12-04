import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'ranking.db');
const db = new Database(dbPath);

// Cria a tabela de jogadores se não existir
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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(game_name, tag_line)
  )
`);

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
  created_at?: string;
  updated_at?: string;
}

// ===== CRUD OPERATIONS =====

// Adicionar jogador
export function addPlayer(player: Omit<Player, 'id' | 'created_at' | 'updated_at'>) {
  const stmt = db.prepare(`
    INSERT INTO players (game_name, tag_line, puuid, tier, rank, league_points, wins, losses)
    VALUES (@game_name, @tag_line, @puuid, @tier, @rank, @league_points, @wins, @losses)
  `);
  
  const result = stmt.run({
    game_name: player.game_name,
    tag_line: player.tag_line,
    puuid: player.puuid || null,
    tier: player.tier || 'UNRANKED',
    rank: player.rank || '',
    league_points: player.league_points || 0,
    wins: player.wins || 0,
    losses: player.losses || 0,
  });

  return result.lastInsertRowid;
}

// Listar todos os jogadores
export function getAllPlayers(): Player[] {
  const stmt = db.prepare('SELECT * FROM players ORDER BY league_points DESC');
  return stmt.all() as Player[];
}

// Buscar jogador por ID
export function getPlayerById(id: number): Player | undefined {
  const stmt = db.prepare('SELECT * FROM players WHERE id = ?');
  return stmt.get(id) as Player | undefined;
}

// Buscar jogador por nome e tag
export function getPlayerByNameTag(gameName: string, tagLine: string): Player | undefined {
  const stmt = db.prepare('SELECT * FROM players WHERE game_name = ? AND tag_line = ?');
  return stmt.get(gameName, tagLine) as Player | undefined;
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
