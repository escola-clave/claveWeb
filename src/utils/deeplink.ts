/**
 * Clave de Sales - Deep Link System
 * 
 * Sistema de navegação baseado em notificações do backend.
 * Usa sourceType e sourceId para navegar para o contexto específico.
 */

import type { Notification } from '../data/types'; // ✅ Importar de types.ts

export interface DeepLinkContext {
  view: 'palco' | 'rotina' | 'projetos' | 'estudio' | 'carreira' | 'social' | 'imprensa';
  params?: {
    projectId?: string;
    trackId?: string;
    submissionId?: string;
    reviewId?: string;
    quizId?: string;
    achievementId?: string;
    tourId?: string;
  };
  action?: 'open' | 'highlight' | 'scroll-to';
}

/**
 * Parseia uma notificação e retorna o contexto de navegação
 * 
 * @param notification - Notificação do backend
 * @returns Contexto de navegação com view e parâmetros
 * 
 * @example
 * ```typescript
 * const notification = {
 *   sourceType: 'REVIEW',
 *   sourceId: 'review-123',
 *   actionUrl: '/estudio/submission/sub-456'
 * };
 * 
 * const context = parseDeepLink(notification);
 * // { view: 'estudio', params: { submissionId: 'sub-456', reviewId: 'review-123' } }
 * ```
 */
export function parseDeepLink(notification: Notification): DeepLinkContext {
  const { sourceType, sourceId, actionUrl } = notification;

  // Se tem actionUrl customizada, parsear primeiro
  if (actionUrl) {
    return parseActionUrl(actionUrl, sourceType, sourceId);
  }

  // Mapear sourceType para contexto de navegação
  switch (sourceType) {
    // Rotina Diária
    case 'DAILY_MISSION':
      return {
        view: 'rotina',
        params: {},
        action: 'open',
      };

    // Projeto/Faixa
    case 'PROJECT':
      return {
        view: 'projetos',
        params: {
          projectId: sourceId || undefined,
        },
        action: 'open',
      };

    case 'TRACK_SCENE':
      return {
        view: 'projetos',
        params: {
          trackId: sourceId || undefined,
        },
        action: 'scroll-to',
      };

    // Estúdio/Submission
    case 'SUBMISSION':
      return {
        view: 'estudio',
        params: {
          submissionId: sourceId || undefined,
        },
        action: 'highlight',
      };

    case 'REVIEW':
      // Review precisa buscar a submission relacionada
      // O backend deve incluir submissionId no actionUrl ou como metadata
      return {
        view: 'estudio',
        params: {
          reviewId: sourceId || undefined,
          // submissionId virá do actionUrl ou será buscado via API
        },
        action: 'open',
      };

    // Coletiva de Imprensa
    case 'PRESS_QUIZ':
    case 'PRESS_ATTEMPT':
      return {
        view: 'imprensa',
        params: {
          quizId: sourceId || undefined,
        },
        action: 'open',
      };

    // Conquista
    case 'ACHIEVEMENT':
      return {
        view: 'carreira',
        params: {
          achievementId: sourceId || undefined,
        },
        action: 'highlight',
      };

    // Turnê
    case 'TOUR':
      return {
        view: 'carreira',
        params: {
          tourId: sourceId || undefined,
        },
        action: 'scroll-to',
      };

    // Ranking/Social
    case 'RANKING':
    case 'LEADERBOARD':
      return {
        view: 'social',
        params: {},
        action: 'open',
      };

    // Default: ir para Palco
    default:
      console.warn(`Unknown sourceType: ${sourceType}. Navigating to Palco.`);
      return {
        view: 'palco',
        params: {},
      };
  }
}

/**
 * Parseia actionUrl customizada do backend
 * Formato esperado: /view/entity/id ou /view?param=value
 * 
 * @example
 * ```
 * /estudio/submission/sub-123
 * /projetos/project/proj-456/track/track-789
 * /imprensa?quizId=quiz-123
 * ```
 */
function parseActionUrl(
  actionUrl: string,
  sourceType?: string | null,
  sourceId?: string | null
): DeepLinkContext {
  try {
    // Remove leading slash
    const cleanUrl = actionUrl.startsWith('/') ? actionUrl.slice(1) : actionUrl;
    
    // Split por ? para separar path e query
    const [path, query] = cleanUrl.split('?');
    const pathParts = path.split('/');
    
    // Primeira parte é sempre a view
    const view = pathParts[0] as DeepLinkContext['view'];
    
    // Parse query params se existirem
    const queryParams = query ? parseQueryString(query) : {};
    
    // Parse path params
    const pathParams = parsePathParams(pathParts.slice(1));
    
    return {
      view: view || 'palco',
      params: {
        ...pathParams,
        ...queryParams,
        // Incluir sourceId como fallback
        ...(sourceId && !pathParams.submissionId && !pathParams.projectId ? 
          { [getParamNameForSourceType(sourceType)]: sourceId } : {}
        ),
      },
      action: 'open',
    };
  } catch (error) {
    console.error('Error parsing actionUrl:', error);
    return {
      view: 'palco',
      params: {},
    };
  }
}

/**
 * Parseia path params no formato /entity/id/entity2/id2
 * Ex: /submission/sub-123/review/rev-456
 */
function parsePathParams(parts: string[]): Record<string, string> {
  const params: Record<string, string> = {};
  
  for (let i = 0; i < parts.length; i += 2) {
    const key = parts[i];
    const value = parts[i + 1];
    
    if (key && value) {
      params[`${key}Id`] = value;
    }
  }
  
  return params;
}

/**
 * Parseia query string no formato key=value&key2=value2
 */
function parseQueryString(query: string): Record<string, string> {
  const params: Record<string, string> = {};
  
  query.split('&').forEach(pair => {
    const [key, value] = pair.split('=');
    if (key && value) {
      params[key] = decodeURIComponent(value);
    }
  });
  
  return params;
}

/**
 * Mapeia sourceType para nome do parâmetro
 */
function getParamNameForSourceType(sourceType?: string | null): string {
  if (!sourceType) return 'id';
  
  const typeMap: Record<string, string> = {
    'PROJECT': 'projectId',
    'TRACK_SCENE': 'trackId',
    'SUBMISSION': 'submissionId',
    'REVIEW': 'reviewId',
    'PRESS_QUIZ': 'quizId',
    'PRESS_ATTEMPT': 'quizId',
    'ACHIEVEMENT': 'achievementId',
    'TOUR': 'tourId',
  };
  
  return typeMap[sourceType] || 'id';
}

/**
 * Constrói actionUrl a partir de contexto
 * Útil para gerar deeplinks programaticamente
 * 
 * @example
 * ```typescript
 * buildActionUrl({
 *   view: 'estudio',
 *   params: { submissionId: 'sub-123' }
 * });
 * // Returns: '/estudio/submission/sub-123'
 * ```
 */
export function buildActionUrl(context: DeepLinkContext): string {
  const { view, params } = context;
  
  if (!params || Object.keys(params).length === 0) {
    return `/${view}`;
  }
  
  // Construir path params
  const pathParts: string[] = [];
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      // Remove 'Id' do final da key
      const entityName = key.replace(/Id$/, '');
      pathParts.push(entityName, value);
    }
  });
  
  return `/${view}/${pathParts.join('/')}`;
}

/**
 * Valida se um deeplink context é válido
 */
export function isValidDeepLink(context: DeepLinkContext): boolean {
  const validViews: DeepLinkContext['view'][] = [
    'palco', 'rotina', 'projetos', 'estudio', 'carreira', 'social', 'imprensa'
  ];
  
  return validViews.includes(context.view);
}
