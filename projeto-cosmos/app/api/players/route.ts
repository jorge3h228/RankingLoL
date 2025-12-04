import { NextRequest, NextResponse } from 'next/server';
import { getAllPlayers, addPlayer, deletePlayer, getPlayerByNameTag } from '@/lib/db';
import { getAccountByRiotId, __mockMode } from '@/lib/riot';
import { requireAuth } from '@/lib/auth';

// GET - Listar todos os jogadores (público)
export async function GET() {
  try {
    const players = getAllPlayers();
    return NextResponse.json({ players, mockMode: __mockMode });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro ao buscar jogadores';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST - Adicionar novo jogador (requer autenticação)
export async function POST(req: NextRequest) {
  // Verifica autenticação
  const authResult = requireAuth(req);
  if (!authResult.authenticated) {
    return NextResponse.json(
      { error: 'Não autorizado. Faça login para adicionar jogadores.' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const {
      game_name,
      gameName,
      tag_line,
      tagLine,
      puuid,
      tier = 'UNRANKED',
      rank = '',
      league_points = 0,
      wins = 0,
      losses = 0,
      kills = 0,
      deaths = 0,
      assists = 0,
      cs = 0,
      vision_score = 0,
      topChampions = [],
      total_lp_gained = 0
    } = body;

    // Suporta ambos os formatos de nomenclatura
    const playerName = game_name || gameName;
    const playerTag = tag_line || tagLine;

    if (!playerName || !playerTag) {
      return NextResponse.json(
        { error: 'gameName/game_name e tagLine/tag_line são obrigatórios' },
        { status: 400 }
      );
    }

    // Normaliza tagLine (remove # se tiver)
    const normalizedTag = playerTag.replace('#', '');

    // Verifica se já existe
    const existing = getPlayerByNameTag(playerName, normalizedTag);
    if (existing) {
      return NextResponse.json(
        { error: 'Jogador já cadastrado no ranking' },
        { status: 409 }
      );
    }

    // Busca dados da Riot API (funcionará em mock mode ou real)
    let accountData;
    try {
      accountData = await getAccountByRiotId(playerName, normalizedTag);
    } catch {
      // Se a API falhar, usa os dados fornecidos ou valores default
      accountData = {
        gameName: playerName,
        tagLine: normalizedTag,
        puuid: puuid,
      };
    }

    // Adiciona o jogador com todos os campos
    const playerId = addPlayer({
      game_name: accountData.gameName || playerName,
      tag_line: accountData.tagLine || normalizedTag,
      puuid: accountData.puuid || puuid,
      tier,
      rank,
      league_points,
      wins,
      losses,
      kills,
      deaths,
      assists,
      cs,
      vision_score,
      top_champions: topChampions,
      total_lp_gained,
    });

    return NextResponse.json({
      success: true,
      playerId,
      message: 'Jogador adicionado com sucesso!',
      mockMode: __mockMode,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro ao adicionar jogador';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - Remover jogador (requer autenticação)
export async function DELETE(req: NextRequest) {
  // Verifica autenticação
  const authResult = requireAuth(req);
  if (!authResult.authenticated) {
    return NextResponse.json(
      { error: 'Não autorizado. Faça login para remover jogadores.' },
      { status: 401 }
    );
  }

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
    }

    deletePlayer(Number(id));
    return NextResponse.json({ success: true, message: 'Jogador removido' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro ao remover jogador';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
