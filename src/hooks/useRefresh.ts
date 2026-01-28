/**
 * Clave de Sales - Manual Refresh Strategy
 * 
 * Atualização manual após ações importantes do usuário.
 * Complementa o polling para sensação de tempo real sem WebSockets.
 */

import { useState, useCallback } from 'react';

export interface RefreshState {
  isRefreshing: boolean;
  lastRefresh: Date | null;
  error: Error | null;
}

/**
 * Hook para refresh manual de dados
 * 
 * @example
 * ```typescript
 * const { refresh, isRefreshing } = useRefresh(async () => {
 *   const data = await ApiService.getNotifications();
 *   setNotifications(data);
 * });
 * 
 * // Após submeter demo
 * await submitDemo(data);
 * await refresh(); // Atualiza stats imediatamente
 * ```
 */
export function useRefresh(callback: () => Promise<void>) {
  const [state, setState] = useState<RefreshState>({
    isRefreshing: false,
    lastRefresh: null,
    error: null,
  });

  const refresh = useCallback(async () => {
    setState(prev => ({ ...prev, isRefreshing: true, error: null }));

    try {
      await callback();
      setState({
        isRefreshing: false,
        lastRefresh: new Date(),
        error: null,
      });
    } catch (error) {
      setState({
        isRefreshing: false,
        lastRefresh: new Date(),
        error: error as Error,
      });
    }
  }, [callback]);

  return {
    refresh,
    isRefreshing: state.isRefreshing,
    lastRefresh: state.lastRefresh,
    error: state.error,
  };
}

/**
 * Momentos estratégicos para atualizar dados (sem WebSockets):
 * 
 * 1. APÓS AÇÕES DO USUÁRIO (refresh manual)
 *    - Completar rotina → refresh stats + notificações
 *    - Submeter demo → refresh projetos + stats
 *    - Responder quiz → refresh stats + notificações
 * 
 * 2. POLLING PERIÓDICO (background)
 *    - Notificações a cada 30s
 *    - Stats a cada 60s
 *    - Ranking a cada 2min
 * 
 * 3. QUANDO JANELA RECEBE FOCO
 *    - Atualizar tudo que mudou enquanto estava fora
 * 
 * 4. PULL-TO-REFRESH
 *    - Usuário puxa lista para baixo → atualiza
 * 
 * Com essa estratégia, usuário tem sensação de tempo real
 * sem complexidade de WebSockets!
 */

/**
 * Exemplo de uso completo:
 * 
 * ```typescript
 * // No ArtistContext
 * const { refresh: refreshStats } = useRefresh(async () => {
 *   const stats = await ApiService.getArtistStats();
 *   setStats(stats);
 * });
 * 
 * const { refresh: refreshNotifications } = useRefresh(async () => {
 *   const notifications = await ApiService.getNotifications();
 *   setNotifications(notifications);
 * });
 * 
 * // Polling automático
 * useNotificationPolling(refreshNotifications);
 * useArtistStatsPolling(refreshStats);
 * 
 * // Após ações importantes
 * const completeRoutine = async () => {
 *   await ApiService.completeRoutine();
 *   await refreshStats();        // Atualiza stats
 *   await refreshNotifications(); // Atualiza notificações
 *   toast.success('Rotina completa! +50 fãs');
 * };
 * 
 * const submitDemo = async (data) => {
 *   await ApiService.submitDemo(data);
 *   await refreshStats();        // Atualiza stats
 *   await refreshNotifications(); // Checa se tem notificação
 *   toast.success('Demo enviada! +300 fãs');
 * };
 * ```
 */

export default useRefresh;
