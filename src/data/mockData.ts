/**
 * Clave de Sales - Mock Data Compatibility Layer
 * 
 * Este arquivo mantém compatibilidade com imports antigos.
 * Todos os dados estão em centralizedMocks.ts
 */

import MOCK_DATA from './centralizedMocks';

// Re-export everything from centralizedMocks for backwards compatibility
export * from './centralizedMocks';

// Fan Engine
export const FAN_RULES = MOCK_DATA.fanRules || [];
export const MOCK_FAN_TRANSACTIONS = MOCK_DATA.fanTransactions || [];
export const CURRENT_CAREER = MOCK_DATA.careers?.[0];
export const CURRENT_TOUR = MOCK_DATA.tours?.[0];

// Helper function
export function getFanRuleByEventType(eventType: string) {
  return FAN_RULES.find((rule: any) => rule.eventType === eventType);
}

// Teachers
export const MOCK_TEACHER_USERS = MOCK_DATA.teachers || [];
export const MOCK_TEACHERS = MOCK_DATA.teachers || [];

// Social
export const MOCK_RANKING = MOCK_DATA.rankings || [];
export const MOCK_ACHIEVEMENTS = MOCK_DATA.achievements || [];

// Notifications
export const MOCK_NOTIFICATIONS = MOCK_DATA.notifications || [];

// Types (re-export from centralizedMocks)
export type { FanTransaction, Career, Tour } from './centralizedMocks';