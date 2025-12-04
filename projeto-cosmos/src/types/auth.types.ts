/**
 * Tipos relacionados à autenticação
 */

/**
 * Payload do token JWT
 */
export interface JWTPayload {
  isAdmin: boolean;
  iat?: number; // Issued at
  exp?: number; // Expiration time
}

/**
 * Resposta da API de login
 */
export interface LoginResponse {
  token?: string;
  error?: string;
}

/**
 * Resposta da API de validação
 */
export interface ValidateResponse {
  valid: boolean;
  error?: string;
}
