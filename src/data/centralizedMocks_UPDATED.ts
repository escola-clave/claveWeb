/**
 * Clave de Sales - Centralized Mock Data (ATUALIZADO)
 * 
 * ✅ USANDO TIPOS CORRETOS DE src/data/types.ts
 * ✅ ALINHADO 100% COM SCHEMA PRISMA
 * ✅ NOMENCLATURA PADRONIZADA
 * 
 * MIGRAÇÃO:
 * - Song → TrackScene
 * - Track → TrackScene (quando se refere a música)
 * - Demo → Submission
 * - Evaluation → Review
 * - TrackLesson → StudyTrack
 * - ARTIST → STUDENT
 */

import type {
  User,
  StudentProfile,
  Project,
  TrackScene,
  Submission,
  Review,
  PressQuiz,
  Achievement,
  Tour,
  Notification,
  FanTransaction,
  Career,
  StudentTrackScene,
  StudyTrack,
  CareerStats,
  DailyRoutine,
  UserRole,
  CourseType,
  ProjectType,
  ProjectStatus,
  SubmissionStatus,
  ReviewType,
  ArtistLevel,
  AchievementCategory,
  AchievementTier,
  TourStatus,
} from './types';

// ==================== MOCK DATA ATUALIZADO ====================

export const MOCK_DATA = {
  // ===== USUÁRIOS =====
  users: [
    {
      id: 'user-1',
      name: 'Sofia Mendes',
      email: 'artista@demo.com',
      passwordHash: 'hashed_demo123',
      role: UserRole.STUDENT, // ✅ Não ARTIST
      status: 'ACTIVE' as const,
      mustChangePassword: false,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    // ... outros usuários
  ] as User[],

  // ===== STUDENT PROFILES =====
  studentProfiles: [
    {
      userId: 'user-1',
      stageName: 'Sofia M.', // ✅ Nome artístico
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
      bio: 'Artista de MPB',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
  ] as StudentProfile[],

  // ===== PROJETOS =====
  projects: [
    {
      id: 'proj-1',
      templateId: 'template-1',
      projectTemplateVersion: 1,
      classId: 'class-1',
      seasonId: 'season-1',
      name: 'Vozes do Brasil',
      description: 'Uma jornada pela riqueza musical brasileira',
      coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
      status: ProjectStatus.ACTIVE,
      isVisible: true,
      releasedAt: new Date('2024-01-15'),
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
  ] as Project[],

  // ===== TRACK SCENES (Músicas/Cenas) =====
  trackScenes: [
    {
      id: 'track-1',
      projectId: 'proj-1',
      templateId: 'template-track-1',
      trackSceneTemplateVersion: 1,
      title: 'Garota de Ipanema',
      artist: 'Tom Jobim e Vinícius de Moraes',
      description: 'Obra-prima da Bossa Nova',
      technicalInstruction: 'Atenção à leveza vocal, respiração controlada', // ✅ Não technicalNotes
      lyrics: 'Olha que coisa mais linda...',
      order: 1,
      status: 'PUBLISHED' as const,
      isVisible: true,
      demoRequired: true,
      pressQuizRequired: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
  ] as TrackScene[],

  // ===== SUBMISSIONS (Demos) =====
  submissions: [
    {
      id: 'sub-1',
      studentId: 'user-1',
      trackSceneId: 'track-1', // ✅ Não trackId, não songId
      attemptNumber: 1,
      mediaUrl: 'https://example.com/demo1.mp3', // ✅ Não audioUrl
      notes: 'Primeira tentativa',
      status: SubmissionStatus.APPROVED,
      pressUnlocked: true,
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-22'),
      reviewedAt: new Date('2024-01-22'),
    },
  ] as Submission[],

  // ===== REVIEWS (Avaliações) =====
  reviews: [
    {
      id: 'review-1',
      submissionId: 'sub-1', // ✅ Não demoId
      teacherId: 'teacher-1',
      teacherName: 'Prof. João Santos',
      type: ReviewType.POSITIVE,
      rating: 4.5,
      feedback: 'Excelente interpretação!',
      technicalNotes: 'Trabalhar mais o vibrato', // ✅ Correto aqui
      approved: true,
      createdAt: new Date('2024-01-22'),
      updatedAt: new Date('2024-01-22'),
    },
  ] as Review[],

  // ===== STUDY TRACKS (Faixas de Estudo) =====
  studyTracks: [
    {
      id: 'study-track-1',
      trackSceneId: 'track-1', // ✅ Não trackId
      templateId: 'template-study-1',
      categoryId: 'cat-harmony',
      categoryKey: 'HARMONY',
      title: 'Harmonia e Progressão de Acordes',
      description: 'Domine a progressão harmônica',
      technicalNotes: 'Foque na transição suave', // ✅ Correto aqui
      order: 1,
      estimatedMinutes: 15,
      isRequired: true,
      isVisible: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
  ] as StudyTrack[],

  // ===== PRESS QUIZZES =====
  pressQuizzes: [
    {
      id: 'quiz-1',
      trackSceneId: 'track-1', // ✅ Não trackId
      seasonId: 'season-1',
      version: 1,
      questionsJson: {
        questions: [
          {
            question: 'Qual é o contexto histórico?',
            options: ['Opção 1', 'Opção 2'],
            correctAnswer: 1,
          },
        ],
      },
      maxAttempts: 3,
      passingScore: 70,
      status: 'PUBLISHED' as const,
      isActive: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
  ] as PressQuiz[],

  // ===== CAREER STATS =====
  careerStats: {
    'user-1': {
      level: ArtistLevel.INDIE,
      fans: 8750,
      currentStreak: 12,
      longestStreak: 28,
      totalDemos: 15,
      approvedDemos: 12,
      achievements: 8,
      toursCompleted: 2,
      lastActivityDate: new Date(),
    },
  } as Record<string, CareerStats>,

  // ===== ACHIEVEMENTS =====
  achievements: [
    {
      id: 'ach-1',
      title: 'Primeira Demo',
      description: 'Envie sua primeira demo',
      icon: '🎤',
      category: AchievementCategory.DEMOS,
      tier: AchievementTier.BRONZE,
      requirement: 1,
      fansReward: 100,
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
  ] as Achievement[],

  // ===== TOURS =====
  tours: [
    {
      id: 'tour-1',
      studentId: 'user-1',
      seasonId: 'season-1',
      name: 'Turnê Bossa Nova',
      description: 'Celebre sua consistência',
      requiredStreak: 7,
      status: TourStatus.ACTIVE,
      completed: false,
      startedAt: new Date('2024-01-01'),
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
  ] as Tour[],

  // ===== NOTIFICATIONS =====
  notifications: [
    {
      id: 'notif-1',
      userId: 'user-1',
      type: 'REVIEW_RECEIVED',
      title: 'Demo Aprovada! 🎉',
      message: 'Sua demo foi aprovada',
      icon: '✅',
      color: 'green',
      sourceType: 'REVIEW', // ✅ Deep link
      sourceId: 'review-1',
      actionUrl: '/estudio/submission/sub-1/review/review-1',
      createdAt: new Date(),
    },
  ] as Notification[],

  // ===== FAN TRANSACTIONS =====
  fanTransactions: [
    {
      id: 'ft-1',
      studentId: 'user-1',
      seasonId: 'season-1',
      eventId: 'event-1',
      amount: 50,
      reason: 'Rotina Diária Completa',
      createdAt: new Date(),
    },
  ] as FanTransaction[],
};

export default MOCK_DATA;
