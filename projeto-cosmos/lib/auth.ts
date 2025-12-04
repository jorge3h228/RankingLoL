import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

// Chave secreta JWT (em produção, use variável de ambiente segura)
const JWT_SECRET = process.env.JWT_SECRET || 'seu-secret-super-secreto-aqui-mude-em-producao';

/**
 * Payload do JWT
 * Contém informações do usuário autenticado
 * - userId: identificador único
 * - role: nível de acesso (admin)
 * - iat: issued at (automático)
 * - exp: expiration (automático, 7 dias)
 */
export interface JWTPayload {
  userId: string;
  role: 'admin';
  iat?: number;
  exp?: number;
}

/**
 * Gera um token JWT válido por 7 dias
 * Usado após autenticação bem-sucedida no login
 * @param payload - Dados do usuário
 * @returns Token JWT string para usar em Authorization header
 */
export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d', // Token expira em 7 dias
  });
}

/**
 * Verifica e decodifica um token JWT
 * Valida assinatura e expiration automaticamente
 * @param token - Token JWT string
 * @returns Payload se válido, null se inválido/expirado
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Extrai token do header Authorization
 * Formato esperado: "Bearer <token>"
 * @param req - NextRequest com headers
 * @returns Token string ou null se inválido
 */
export function extractToken(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader) return null;
  
  // Formato: "Bearer TOKEN"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
  
  return parts[1];
}

/**
 * Middleware para verificar autenticação
 */
export function requireAuth(req: NextRequest): { authenticated: boolean; user?: JWTPayload; error?: string } {
  const token = extractToken(req);
  
  if (!token) {
    return { authenticated: false, error: 'Token não fornecido' };
  }
  
  const user = verifyToken(token);
  
  if (!user) {
    return { authenticated: false, error: 'Token inválido ou expirado' };
  }
  
  return { authenticated: true, user };
}
