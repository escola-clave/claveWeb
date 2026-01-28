/**
 * Hook customizado para chamadas de API com loading e error handling
 */

import { useState, useCallback } from 'react';
import ApiService from '../services/api.service';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setState({ data: null, loading: true, error: null });
      
      try {
        const result = await apiFunction(...args);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        setState({ data: null, loading: false, error: err });
        return null;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Hooks específicos para cada funcionalidade
export function useAuth() {
  const login = useApi(ApiService.login);
  const logout = useApi(ApiService.logout);
  
  return { login, logout };
}

export function useCareer() {
  const getStats = useApi(ApiService.getCareerStats);
  const updateStats = useApi(ApiService.updateCareerStats);
  
  return { getStats, updateStats };
}

export function useDailyRoutine() {
  const getRoutine = useApi(ApiService.getDailyRoutine);
  const completeRoutine = useApi(ApiService.completeDailyRoutine);
  
  return { getRoutine, completeRoutine };
}

export function useProjects() {
  const getProjects = useApi(ApiService.getProjects);
  const getProjectById = useApi(ApiService.getProjectById);
  const getTracks = useApi(ApiService.getProjectTracks);
  
  return { getProjects, getProjectById, getTracks };
}

export function useDemos() {
  const submitDemo = useApi(ApiService.submitDemo);
  const getDemos = useApi(ApiService.getDemos);
  const getDemoById = useApi(ApiService.getDemoById);
  
  return { submitDemo, getDemos, getDemoById };
}

export function useEvaluations() {
  const getEvaluations = useApi(ApiService.getEvaluations);
  const submitEvaluation = useApi(ApiService.submitEvaluation);
  
  return { getEvaluations, submitEvaluation };
}

export function usePressQuiz() {
  const getQuiz = useApi(ApiService.getPressQuiz);
  const submitAnswers = useApi(ApiService.submitPressQuizAnswer);
  
  return { getQuiz, submitAnswers };
}

export function useAchievements() {
  const getAchievements = useApi(ApiService.getAchievements);
  const unlockAchievement = useApi(ApiService.unlockAchievement);
  
  return { getAchievements, unlockAchievement };
}

export function useTours() {
  const getTours = useApi(ApiService.getTours);
  const getTourById = useApi(ApiService.getTourById);
  const checkIn = useApi(ApiService.checkInTour);
  
  return { getTours, getTourById, checkIn };
}

export function useNotifications() {
  const getNotifications = useApi(ApiService.getNotifications);
  const markAsRead = useApi(ApiService.markNotificationAsRead);
  const markAllAsRead = useApi(ApiService.markAllNotificationsAsRead);
  
  return { getNotifications, markAsRead, markAllAsRead };
}

export function useSocial() {
  const getLeaderboard = useApi(ApiService.getLeaderboard);
  const getRanking = useApi(ApiService.getUserRanking);
  
  return { getLeaderboard, getRanking };
}

export function useAnalytics() {
  const getAnalytics = useApi(ApiService.getAnalytics);
  
  return { getAnalytics };
}

export default useApi;
