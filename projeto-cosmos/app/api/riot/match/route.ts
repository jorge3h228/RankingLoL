import { NextResponse } from 'next/server';
import { getMatchById } from '../../../../lib/riot';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const matchId = url.searchParams.get('matchId');
  const regional = url.searchParams.get('regional') || 'americas';

  if (!matchId) return NextResponse.json({ error: 'matchId query param required' }, { status: 400 });

  try {
    const data = await getMatchById(matchId, regional);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: err.status || 500 });
  }
}
