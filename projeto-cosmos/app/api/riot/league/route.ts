import { NextResponse } from 'next/server';
import { getLeagueEntries } from '../../../../lib/riot';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const queue = url.searchParams.get('queue') || '';
  const tier = url.searchParams.get('tier') || '';
  const division = url.searchParams.get('division') || '';
  const platform = url.searchParams.get('platform') || 'na1';

  try {
    const data = await getLeagueEntries(queue, tier, division, platform);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: err.status || 500 });
  }
}
