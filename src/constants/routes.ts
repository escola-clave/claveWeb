/**
 * Clave de Sales - Route Constants
 * Navigation routes and deep links
 */

export const ROUTES = {
  LOGIN: 'login',
  PALCO: 'palco',
  ROTINA: 'rotina',
  PROJETOS: 'projetos',
  ESTUDIO: 'estudio',
  CARREIRA: 'carreira',
  SOCIAL: 'social',
  IMPRENSA: 'imprensa',
  NOTIFICACOES: 'notificacoes',
} as const;

export type RouteType = typeof ROUTES[keyof typeof ROUTES];

export default ROUTES;
