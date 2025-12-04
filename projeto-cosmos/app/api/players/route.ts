import { NextRequest, NextResponse } from 'next/server';
import { getAllPlayers, addPlayer, deletePlayer, getPlayerByNameTag } from '@/lib/db';
import { getAccountByRiotId, __mockMode } from '@/lib/riot';
import { requireAuth } from '@/lib/auth';

// GET - Listar todos os jogadores (público)
export async function GET() {
  try {
    const players = getAllPlayers();
    return NextResponse.json({ players, mockMode: __mockMode });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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
    const { gameName, tagLine } = await req.json();

    if (!gameName || !tagLine) {
      return NextResponse.json(
        { error: 'gameName e tagLine são obrigatórios' },
        { status: 400 }
      );
    }

    // Normaliza tagLine (remove # se tiver)
    const normalizedTag = tagLine.replace('#', '');

    // Verifica se já existe
    const existing = getPlayerByNameTag(gameName, normalizedTag);
    if (existing) {
      return NextResponse.json(
        { error: 'Jogador já cadastrado no ranking' },
        { status: 409 }
      );
    }

    // Busca dados da Riot API (funcionará em mock mode ou real)
    let accountData;
    try {
      accountData = await getAccountByRiotId(gameName, normalizedTag);
    } catch (error: any) {
      // Se a API falhar, cadastra com dados mínimos
      accountData = {
        gameName,
        tagLine: normalizedTag,
        puuid: null,
      };
    }

    // TODO: Buscar dados de ranked quando tiver a API key configurada
    // Por enquanto, cadastra com dados default
    const playerId = addPlayer({
      game_name: accountData.gameName || gameName,
      tag_line: accountData.tagLine || normalizedTag,
      puuid: accountData.puuid,
      tier: 'UNRANKED',
      rank: '',
      league_points: 0,
      wins: 0,
      losses: 0,
    });

    return NextResponse.json({
      success: true,
      playerId,
      message: 'Jogador adicionado com sucesso!',
      mockMode: __mockMode,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
