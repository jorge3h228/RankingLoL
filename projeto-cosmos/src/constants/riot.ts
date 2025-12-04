/**
 * Constantes da API da Riot Games
 */

/**
 * Mapeamento de plataforma para região continental
 */
export const PLATFORM_TO_REGION: Record<string, string> = {
  br1: 'americas',
  na1: 'americas',
  la1: 'americas',
  la2: 'americas',
  euw1: 'europe',
  eun1: 'europe',
  tr1: 'europe',
  ru: 'europe',
  kr: 'asia',
  jp1: 'asia',
  oc1: 'sea'
};

/**
 * Tipos de fila ranqueada
 */
export const QUEUE_TYPES = {
  RANKED_SOLO: 'RANKED_SOLO_5x5',
  RANKED_FLEX: 'RANKED_FLEX_SR',
  RANKED_TFT: 'RANKED_TFT'
} as const;

/**
 * Timeout padrão para requisições à API da Riot (ms)
 */
export const RIOT_API_TIMEOUT = 10000;

/**
 * Delay entre requisições para evitar rate limit (ms)
 */
export const RIOT_API_DELAY = 1200;
