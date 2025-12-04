/**
 * Constantes relacionadas às tiers/ranks do League of Legends
 */

export const TIERS = [
  'IRON',
  'BRONZE',
  'SILVER',
  'GOLD',
  'PLATINUM',
  'EMERALD',
  'DIAMOND',
  'MASTER',
  'GRANDMASTER',
  'CHALLENGER',
  'UNRANKED'
] as const;

export type Tier = typeof TIERS[number];

export const RANKS = ['IV', 'III', 'II', 'I'] as const;

export type Rank = typeof RANKS[number];

/**
 * Cores por tier
 */
export const TIER_COLORS: Record<string, string> = {
  IRON: '#6B5B4F',
  BRONZE: '#A0715E',
  SILVER: '#8CA3B0',
  GOLD: '#E0AA3E',
  PLATINUM: '#4DB5BD',
  EMERALD: '#00B383',
  DIAMOND: '#6495ED',
  MASTER: '#C27BFA',
  GRANDMASTER: '#FF4655',
  CHALLENGER: '#F4C874',
  UNRANKED: '#71798F'
};

/**
 * Gradientes por tier
 */
export const TIER_GRADIENTS: Record<string, string> = {
  IRON: 'linear-gradient(135deg, #6B5B4F 0%, #3C342F 100%)',
  BRONZE: 'linear-gradient(135deg, #A0715E 0%, #7D4D3A 100%)',
  SILVER: 'linear-gradient(135deg, #8CA3B0 0%, #5A6D7A 100%)',
  GOLD: 'linear-gradient(135deg, #E0AA3E 0%, #C88B1B 100%)',
  PLATINUM: 'linear-gradient(135deg, #4DB5BD 0%, #2A8891 100%)',
  EMERALD: 'linear-gradient(135deg, #00B383 0%, #007F5A 100%)',
  DIAMOND: 'linear-gradient(135deg, #6495ED 0%, #3B5998 100%)',
  MASTER: 'linear-gradient(135deg, #C27BFA 0%, #8B3FA8 100%)',
  GRANDMASTER: 'linear-gradient(135deg, #FF4655 0%, #D62839 100%)',
  CHALLENGER: 'linear-gradient(135deg, #F4C874 0%, #E6A63E 100%)',
  UNRANKED: 'linear-gradient(135deg, #71798F 0%, #4A5162 100%)'
};
