import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

/**
 * Valida se o token JWT é válido
 * GET /api/admin/validate
 */
export async function GET(req: NextRequest) {
  const authResult = requireAuth(req);
  
  if (!authResult.authenticated) {
    return NextResponse.json(
      { error: authResult.error, authenticated: false },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: authResult.user,
  });
}
