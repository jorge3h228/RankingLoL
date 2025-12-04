import { NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth';

// Senha padrão (em produção, use variável de ambiente e hash)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json(
        { error: 'Senha é obrigatória' },
        { status: 400 }
      );
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Senha incorreta' },
        { status: 401 }
      );
    }

    // Gera token JWT com informações do admin
    const token = generateToken({
      userId: 'admin',
      role: 'admin',
    });

    return NextResponse.json({
      success: true,
      token,
      message: 'Login realizado com sucesso!',
      user: {
        id: 'admin',
        role: 'admin',
      }
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
