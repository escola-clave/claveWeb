/**
 * Clave de Sales - Polling Strategy
 * 
 * Sistema de atualização inteligente SEM WebSockets.
 * Atualiza dados em momentos estratégicos para simular tempo real.
 * 
 * Quando usar WebSockets?
 * - Se precisar de latência < 5 segundos
 * - Se tiver múltiplos usuários editando simultaneamente
 * - Se tiver chat/colaboração em tempo real
 * 
 * Para Clave de Sales, polling é suficiente porque:
 * - Delay de 10-30s é aceitável
 * - Maioria das ações são individuais
 * - Mais simples de implementar e escalar
 */

import { useEffect, useRef } from 'react';

export interface PollingConfig {
  interval: number;           // Intervalo em ms
  enabled?: boolean;          // Se polling está ativo
  onFocus?: boolean;          // Atualizar quando janela recebe foco
  onVisibilityChange?: boolean; // Atualizar quando tab fica visível
}

/**
 * Hook de polling inteligente
 * 
 * @example
 * ```typescript
 * // Atualizar notificações a cada 30s
 * usePolling(
 *   async () => {
 *     const notifications = await ApiService.getNotifications();
 *     setNotifications(notifications);
 *   },
 *   { interval: 30000, onFocus: true }
 * );
 * ```
 */
export function usePolling(
  callback: () => Promise<void> | void,
  config: PollingConfig
) {
  const { interval, enabled = true, onFocus = false, onVisibilityChange = false } = config;
  const intervalRef = useRef<NodeJS.Timeout>();
  const callbackRef = useRef(callback);

  // Atualizar callback ref
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Polling interval
  useEffect(() => {
    if (!enabled) return;

    const poll = () => {
      callbackRef.current();
    };

    // Executar imediatamente
    poll();

    // Configurar intervalo
    intervalRef.current = setInterval(poll, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [interval, enabled]);

  // Polling on focus
  useEffect(() => {
    if (!enabled || !onFocus) return;

    const handleFocus = () => {
      callbackRef.current();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [enabled, onFocus]);

  // Polling on visibility change
  useEffect(() => {
    if (!enabled || !onVisibilityChange) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        callbackRef.current();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enabled, onVisibilityChange]);
}

/**
 * Intervalos recomendados por tipo de dado
 */
export const POLLING_INTERVALS = {
  // Notificações - 30s (não é crítico, pode ter delay)
  NOTIFICATIONS: 30000,
  
  // Stats do artista - 60s (atualiza depois de ações)
  ARTIST_STATS: 60000,
  
  // Ranking - 2min (não muda constantemente)
  LEADERBOARD: 120000,
  
  // Projetos ativos - 5min (raramente mudam)
  ACTIVE_PROJECTS: 300000,
  
  // Turnês - 10min (checagem de streak)
  TOURS: 600000,
};

/**
 * Hook específico para notificações
 * Atualiza a cada 30s + quando janela recebe foco
 */
export function useNotificationPolling(callback: () => Promise<void> | void) {
  usePolling(callback, {
    interval: POLLING_INTERVALS.NOTIFICATIONS,
    enabled: true,
    onFocus: true,
    onVisibilityChange: true,
  });
}

/**
 * Hook específico para stats do artista
 * Atualiza a cada 60s + quando janela recebe foco
 */
export function useArtistStatsPolling(callback: () => Promise<void> | void) {
  usePolling(callback, {
    interval: POLLING_INTERVALS.ARTIST_STATS,
    enabled: true,
    onFocus: true,
  });
}

/**
 * Hook específico para leaderboard
 * Atualiza a cada 2min
 */
export function useLeaderboardPolling(callback: () => Promise<void> | void) {
  usePolling(callback, {
    interval: POLLING_INTERVALS.LEADERBOARD,
    enabled: true,
    onVisibilityChange: true,
  });
}
