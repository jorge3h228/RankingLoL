import { NextResponse } from 'next/server';
import { getAccountByRiotId } from '../../../../lib/riot';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const gameName = url.searchParams.get('gameName');
  const tagLine = url.searchParams.get('tagLine');
  const platform = url.searchParams.get('platform') || 'na1';

  if (!gameName || !tagLine) return NextResponse.json({ error: 'gameName and tagLine are required' }, { status: 400 });

  try {
    const data = await getAccountByRiotId(gameName, tagLine, platform);
    return NextResponse.json(data);
  } catch (err: unknown) {
    const error = err as Error & { status?: number };
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
}
