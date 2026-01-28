/**
 * Clave de Sales - Text Constants
 * 
 * IMPORTANTE: Este arquivo contém APENAS textos de interface fixa (UI labels).
 * Dados dinâmicos vêm do backend:
 * - Conquistas (achievements) → API
 * - Níveis de artista → API (FanRule)
 * - Descrições de projetos → API (ProjectTemplate)
 * - Mensagens de notificação → API (Notification)
 * - Textos de quiz → API (DailyMissionQuiz, PressQuiz)
 * - Feedbacks de professores → API (Review)
 */

export const TEXTS = {
  // App General
  APP_NAME: 'Clave de Sales',
  APP_TAGLINE: 'Sua jornada artística começa aqui',

  // Authentication
  AUTH: {
    LOGIN_TITLE: 'Bem-vindo de volta!',
    LOGIN_SUBTITLE: 'Entre para continuar sua jornada artística',
    EMAIL_LABEL: 'Email',
    PASSWORD_LABEL: 'Senha',
    LOGIN_BUTTON: 'Entrar',
    LOGGING_IN: 'Entrando...',
    FORGOT_PASSWORD: 'Esqueceu sua senha?',
    DEMO_CREDENTIALS: 'Use: artista@demo.com / demo123',
    ERROR_INVALID_CREDENTIALS: 'Email ou senha inválidos',
    ERROR_NETWORK: 'Erro de conexão. Tente novamente.',
  },

  // Navigation (UI labels fixas)
  NAV: {
    PALCO: 'Palco',
    ROTINA: 'Rotina',
    PROJETOS: 'Projetos',
    ESTUDIO: 'Estúdio',
    CARREIRA: 'Carreira',
    SOCIAL: 'Social',
    IMPRENSA: 'Imprensa',
    NOTIFICACOES: 'Notificações',
  },

  // Palco (Dashboard) - Labels de UI
  PALCO: {
    TITLE: 'Palco Principal',
    WELCOME: 'Bem-vindo,',
    YOUR_STREAK: 'Sua Sequência',
    DAYS: 'dias',
    FANS: 'fãs',
    DAILY_ROUTINE: 'Rotina Diária',
    DAILY_ROUTINE_DESC: 'Complete sua passagem de som',
    MY_PROJECTS: 'Meus Projetos',
    STUDIO: 'Estúdio',
    STUDIO_DESC: 'Grave e envie suas demos',
    CAREER: 'Carreira',
    CAREER_DESC: 'Veja seu progresso e conquistas',
    QUICK_STATS: 'Estatísticas Rápidas',
    RECENT_ACTIVITY: 'Atividade Recente',
  },

  // Rotina Diária - Labels de UI
  ROTINA: {
    TITLE: 'Rotina Diária',
    SUBTITLE: 'Complete seus exercícios para manter a sequência',
    START_ROUTINE: 'Começar Rotina',
    COMPLETE_ROUTINE: 'Concluir Rotina',
    ROUTINE_COMPLETED: 'Rotina Concluída!',
    ROUTINE_COMPLETED_DESC: 'Você ganhou +50 fãs',
    EXERCISES: 'Exercícios',
    WARMUP: 'Aquecimento',
    PRACTICE: 'Prática',
    COOLDOWN: 'Relaxamento',
    SKIP_TODAY: 'Pular Hoje',
    CONTINUE: 'Continuar',
    REWARD: 'Recompensa',
    FANS_EARNED: 'fãs ganhos',
    QUIZ: 'Quiz',
    QUIZ_TITLE: 'Quiz de Aquecimento',
    QUIZ_DESC: 'Teste seus conhecimentos antes de começar',
    SUBMIT_QUIZ: 'Enviar Respostas',
    CORRECT: 'Correto!',
    INCORRECT: 'Incorreto',
    // Nota: Títulos e conteúdos de exercícios vêm da API (DailyMissionTemplate)
  },

  // Projetos - Labels de UI
  PROJETOS: {
    TITLE: 'Projetos',
    SUBTITLE: 'Seus álbuns e peças da temporada',
    ACTIVE_PROJECTS: 'Projetos Ativos',
    COMPLETED_PROJECTS: 'Projetos Concluídos',
    UPCOMING_PROJECTS: 'Próximos Projetos',
    TRACKS: 'Faixas',
    SCENES: 'Cenas',
    PROGRESS: 'Progresso',
    START_PROJECT: 'Começar Projeto',
    CONTINUE_PROJECT: 'Continuar Projeto',
    VIEW_DETAILS: 'Ver Detalhes',
    TECHNICAL_NOTES: 'Notas Técnicas',
    LYRICS: 'Letra',
    MATERIALS: 'Materiais',
    RECORD_DEMO: 'Gravar Demo',
    LOCKED: 'Bloqueado',
    UNLOCK_PREVIOUS: 'Complete a faixa anterior para desbloquear',
    // Nota: Nomes, descrições e conteúdos vêm da API (Project, TrackScene)
  },

  // Estúdio - Labels de UI
  ESTUDIO: {
    TITLE: 'Estúdio',
    SUBTITLE: 'Grave e envie suas performances',
    RECORD_NEW: 'Gravar Nova Performance',
    RECORD_DESC: 'Envie sua demo para avaliação',
    RECORDING_HISTORY: 'Histórico de Gravações',
    SELECT_TRACK: 'Selecione a Faixa',
    START_RECORDING: 'Clique para começar a gravar',
    RECORDING: 'Gravando...',
    STOP_RECORDING: 'Parar Gravação',
    RECORDING_COMPLETE: 'Gravação concluída!',
    DURATION: 'Duração',
    RECORD_AGAIN: 'Gravar Novamente',
    LISTEN: 'Ouvir',
    SUBMIT_DEMO: 'Enviar Demo',
    SUBMIT_REWARD: '+300 fãs',
    CANCEL: 'Cancelar',
    PENDING_REVIEW: 'Aguardando',
    APPROVED: 'Aprovada',
    NEEDS_REVISION: 'Revisão',
    REJECTED: 'Rejeitada',
    FEEDBACK_POSITIVE: 'Avaliação Positiva! 🎉',
    FEEDBACK_CONSTRUCTIVE: 'Feedback Construtivo',
    FEEDBACK_CRITICAL: 'Feedback Crítico',
    TEACHER_ROLE: 'Produtor Musical',
    FANS_EARNED: 'fãs conquistados',
    PRESS_UNLOCKED: 'Coletiva de Imprensa Liberada!',
    PRESS_UNLOCKED_DESC: 'Sua performance foi aprovada! Agora você pode enfrentar a imprensa e ganhar ainda mais fãs.',
    GO_TO_PRESS: 'Ir para Coletiva de Imprensa',
    BACK_TO_STUDIO: 'Voltar ao Estúdio',
    INFO_TIP: '💡 Após enviar sua demo, o produtor irá avaliar e deixar comentários. Feedbacks positivos liberam a Coletiva de Imprensa!',
    SILENT_ENVIRONMENT: 'Certifique-se de estar em um ambiente silencioso',
    // Nota: Feedbacks dos professores vêm da API (Review.comment)
  },

  // Carreira - Labels de UI
  CARREIRA: {
    TITLE: 'Carreira',
    SUBTITLE: 'Seu progresso e conquistas',
    YOUR_LEVEL: 'Seu Nível',
    CURRENT_LEVEL: 'Nível Atual',
    NEXT_LEVEL: 'Próximo Nível',
    TOTAL_FANS: 'Total de Fãs',
    CURRENT_STREAK: 'Sequência Atual',
    LONGEST_STREAK: 'Maior Sequência',
    TOTAL_DEMOS: 'Demos Enviadas',
    APPROVED_DEMOS: 'Demos Aprovadas',
    ACHIEVEMENTS: 'Conquistas',
    TOURS_COMPLETED: 'Turnês Completadas',
    FANS_HISTORY: 'Histórico de Fãs',
    UNLOCKED: 'Desbloqueada',
    LOCKED: 'Bloqueada',
    UNLOCK_AT: 'Desbloqueie em',
    VIEW_ALL: 'Ver Todas',
    STATISTICS: 'Estatísticas',
    ACTIVITY: 'Atividade',
    // Nota: Títulos e descrições de conquistas vêm da API (Achievement)
    // Nota: Níveis de artista vêm da API ou CONFIG (FanRule)
  },

  // Social / Ranking - Labels de UI
  SOCIAL: {
    TITLE: 'Social',
    SUBTITLE: 'Rankings e comunidade',
    LEADERBOARD: 'Ranking',
    YOUR_POSITION: 'Sua Posição',
    TOP_ARTISTS: 'Top Artistas',
    FRIENDS: 'Amigos',
    COMPARE: 'Comparar',
    FOLLOW: 'Seguir',
    FOLLOWING: 'Seguindo',
    FANS: 'Fãs',
    RANK: 'Rank',
    // Nota: Dados de usuários e ranking vêm da API (Career, StudentProfile)
  },

  // Coletiva de Imprensa - Labels de UI
  IMPRENSA: {
    TITLE: 'Coletiva de Imprensa',
    SUBTITLE: 'Responda às perguntas da imprensa',
    START_INTERVIEW: 'Começar Entrevista',
    QUESTION: 'Pergunta',
    ANSWER: 'Responder',
    SUBMIT_ANSWERS: 'Enviar Respostas',
    SCORE: 'Pontuação',
    PASSING_SCORE: 'Pontuação Mínima',
    ATTEMPTS_LEFT: 'Tentativas Restantes',
    RESULT_PASS: 'Aprovado! 🎉',
    RESULT_FAIL: 'Reprovado',
    RESULT_PASS_DESC: 'Parabéns! Você conquistou a imprensa.',
    RESULT_FAIL_DESC: 'Estude mais e tente novamente.',
    TRY_AGAIN: 'Tentar Novamente',
    BACK: 'Voltar',
    UNLOCKED_PROJECTS: 'Novos Projetos Desbloqueados!',
    // Nota: Perguntas e respostas do quiz vêm da API (PressQuiz.questionsJson)
    // Nota: Manchetes geradas vêm da API (PressAttempt.headline, .subtitle)
  },

  // Notificações - Labels de UI
  NOTIFICACOES: {
    TITLE: 'Notificações',
    SUBTITLE: 'Atualizações e novidades',
    MARK_ALL_READ: 'Marcar todas como lidas',
    NO_NOTIFICATIONS: 'Sem notificações',
    NO_NOTIFICATIONS_DESC: 'Você está em dia com tudo!',
    NEW: 'Nova',
    TODAY: 'Hoje',
    YESTERDAY: 'Ontem',
    THIS_WEEK: 'Esta Semana',
    OLDER: 'Mais Antigas',
    // Nota: Conteúdo das notificações vem da API (Notification.title, .message)
  },

  // Common Actions (UI labels fixas)
  ACTIONS: {
    CONTINUE: 'Continuar',
    CANCEL: 'Cancelar',
    SAVE: 'Salvar',
    DELETE: 'Excluir',
    EDIT: 'Editar',
    CLOSE: 'Fechar',
    CONFIRM: 'Confirmar',
    BACK: 'Voltar',
    NEXT: 'Próximo',
    PREVIOUS: 'Anterior',
    SUBMIT: 'Enviar',
    START: 'Começar',
    FINISH: 'Finalizar',
    VIEW: 'Ver',
    PLAY: 'Reproduzir',
    PAUSE: 'Pausar',
    STOP: 'Parar',
  },

  // Status Messages (UI labels fixas)
  STATUS: {
    LOADING: 'Carregando...',
    SAVING: 'Salvando...',
    SUCCESS: 'Sucesso!',
    ERROR: 'Erro',
    WARNING: 'Atenção',
    INFO: 'Informação',
    COMPLETED: 'Concluído',
    PENDING: 'Pendente',
    IN_PROGRESS: 'Em Progresso',
  },

  // Time/Date (UI labels fixas)
  TIME: {
    SECONDS: 'segundos',
    MINUTES: 'minutos',
    HOURS: 'horas',
    DAYS: 'dias',
    WEEKS: 'semanas',
    MONTHS: 'meses',
    YEARS: 'anos',
    AGO: 'atrás',
    TODAY: 'Hoje',
    YESTERDAY: 'Ontem',
    TOMORROW: 'Amanhã',
  },

  // Errors (Mensagens genéricas de erro)
  ERRORS: {
    GENERIC: 'Algo deu errado. Tente novamente.',
    NETWORK: 'Erro de conexão. Verifique sua internet.',
    NOT_FOUND: 'Conteúdo não encontrado.',
    UNAUTHORIZED: 'Você não tem permissão para isso.',
    VALIDATION: 'Verifique os dados inseridos.',
    TIMEOUT: 'A requisição demorou muito. Tente novamente.',
  },
};

export default TEXTS;