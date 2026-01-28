/**
 * Clave de Sales - Configuration Constants
 * 
 * IMPORTANTE: Este arquivo contém APENAS configurações do frontend.
 * Regras de negócio vêm do backend:
 * - Fan Rules (pontos por evento) → API (FanRule table)
 * - Níveis de artista (thresholds) → API ou calculado pelo backend
 * - Limites de quiz → API (PressQuiz, DailyMissionQuiz)
 * 
 * Mantenha aqui apenas:
 * - Configurações de UI (animações, debounce)
 * - Limites de upload (frontend validation)
 * - Feature flags
 * - Credenciais demo (dev only)
 */

export const CONFIG = {
  // UI Configuration (configurações de interface)
  UI: {
    ANIMATION_DURATION_MS: 300,
    NOTIFICATION_AUTO_DISMISS_MS: 5000,
    DEBOUNCE_DELAY_MS: 300,
    PAGINATION_DEFAULT_SIZE: 20,
  },

  // Upload Configuration (validação no frontend)
  UPLOAD: {
    MAX_FILE_SIZE_MB: 50,
    ALLOWED_AUDIO_FORMATS: ['mp3', 'wav', 'm4a', 'ogg'],
    MAX_DURATION_MINUTES: 10,
    MIN_DURATION_SECONDS: 10,
  },

  // API Configuration
  API: {
    BASE_URL: '/api', // Backend URL - configurar via ambiente de build
    TIMEOUT_MS: 10000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY_MS: 1000,
  },

  // Demo Credentials (Development Only)
  DEMO: {
    STUDENT_EMAIL: 'artista@demo.com',
    TEACHER_EMAIL: 'professor@demo.com',
    ADMIN_EMAIL: 'admin@demo.com',
    PASSWORD: 'demo123',
  },

  // Feature Flags (controle de features no frontend)
  FEATURES: {
    ENABLE_SOCIAL: true,
    ENABLE_ACHIEVEMENTS: true,
    ENABLE_TOURS: true,
    ENABLE_PRESS_QUIZ: true,
    ENABLE_ANALYTICS: false,
    ENABLE_NOTIFICATIONS: true,
  },

  // Nota: As configurações abaixo foram REMOVIDAS pois devem vir do backend:
  // - FAN_RULES → Vem da tabela FanRule (API)
  // - LEVEL_THRESHOLDS → Calculado pelo backend baseado em FanRule
  // - STREAK → Regras vêm do backend (Tour, FanRule)
  // - PRESS_QUIZ → Configurações vêm de PressQuiz table
};

export default CONFIG;