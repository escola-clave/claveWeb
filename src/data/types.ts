/**
 * Clave de Sales - Tipos TypeScript Padronizados
 * 
 * ✅ 100% ALINHADO COM SCHEMA PRISMA
 * ✅ FONTE ÚNICA DA VERDADE PARA TIPOS
 * ✅ USAR ESTES TIPOS EM TODO O PROJETO
 * 
 * Última atualização: 27/01/2025
 */

// ==================== ENUMS (Alinhados com Prisma) ====================

export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT', // ✅ Não ARTIST
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export enum CourseType {
  MUSIC = 'MUSIC',
  THEATER = 'THEATER',
}

export enum SeasonStatus {
  PLANNED = 'PLANNED',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
}

export enum ProjectType {
  ALBUM = 'ALBUM',
  PLAY = 'PLAY',
}

export enum ProjectStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  UPCOMING = 'UPCOMING',
}

export enum TrackSceneStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum StudentTrackSceneStatus {
  LOCKED = 'LOCKED',
  AVAILABLE = 'AVAILABLE',
  STUDYING = 'STUDYING',
  COMPLETED = 'COMPLETED',
}

export enum SubmissionStatus {
  PENDING = 'PENDING',
  PENDING_REVIEW = 'PENDING_REVIEW',
  REVIEWED = 'REVIEWED',
  APPROVED = 'APPROVED',
  NEEDS_REVISION = 'NEEDS_REVISION',
  REJECTED = 'REJECTED',
}

export enum ReviewType {
  POSITIVE = 'POSITIVE',
  CONSTRUCTIVE = 'CONSTRUCTIVE',
  CRITICAL = 'CRITICAL',
}

export enum PressResult {
  PASS = 'PASS',
  FAIL = 'FAIL',
}

export enum TourStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  BROKEN = 'BROKEN',
  FINISHED = 'FINISHED',
}

export enum StreakDayStatus {
  DONE = 'DONE',
  MISSED = 'MISSED',
  PAUSED = 'PAUSED',
}

export enum DailyMissionStatus {
  DONE = 'DONE',
  DONE_WITH_PENALTY = 'DONE_WITH_PENALTY',
  SKIPPED = 'SKIPPED',
}

export enum AchievementCategory {
  STREAK = 'STREAK',
  DEMOS = 'DEMOS',
  SOCIAL = 'SOCIAL',
  SPECIAL = 'SPECIAL',
}

export enum AchievementTier {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
}

export enum ArtistLevel {
  SHOWER = 'SHOWER',
  GARAGE = 'GARAGE',
  UNDERGROUND = 'UNDERGROUND',
  INDIE = 'INDIE',
  RISING_STAR = 'RISING_STAR',
  HEADLINER = 'HEADLINER',
  MAIN_STAGE = 'MAIN_STAGE',
}

// ==================== INTERFACES PRINCIPAIS ====================

/**
 * ✅ User - Identidade técnica do usuário
 */
export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
  mustChangePassword: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ StudentProfile - Perfil artístico do aluno
 */
export interface StudentProfile {
  userId: string;
  stageName: string; // Nome artístico (funciona para música e teatro)
  avatarUrl?: string;
  bio?: string;
  specialization?: string; // Especialização: Música: "Voz", "Violão" | Teatro: "Interpretação", "Direção"
  genres?: string[]; // Gêneros/Estilos: Música: ["MPB", "Jazz"] | Teatro: ["Drama", "Comédia"]
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ TeacherProfile - Perfil do professor
 */
export interface TeacherProfile {
  userId: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ School - Escola/Instituição
 */
export interface School {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ Course - Curso (Música/Teatro)
 */
export interface Course {
  id: string;
  schoolId: string;
  name: string;
  type: CourseType;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ Season - Temporada/Semestre
 */
export interface Season {
  id: string;
  courseId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: SeasonStatus;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ Class - Turma
 */
export interface Class {
  id: string;
  seasonId: string;
  name: string;
  maxStudents: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ ProjectTemplate - Template reutilizável de projeto
 */
export interface ProjectTemplate {
  id: string;
  courseId: string;
  name: string;
  type: ProjectType;
  description?: string;
  coverImage?: string;
  version: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ Project - Instância de projeto para uma turma
 */
export interface Project {
  id: string;
  templateId: string;
  projectTemplateVersion: number;
  classId: string;
  seasonId: string;
  name: string;
  description?: string;
  coverImage?: string;
  status: ProjectStatus;
  isVisible: boolean;
  releasedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ TrackSceneTemplate - Template de música/cena
 */
export interface TrackSceneTemplate {
  id: string;
  projectTemplateId: string;
  title: string;
  artist?: string;
  description?: string;
  technicalInstruction?: string; // ✅ Instrução técnica
  lyrics?: string;
  order: number;
  unlockAfterTrackId?: string;
  demoRequired: boolean;
  pressQuizRequired: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ TrackScene - Instância de música/cena (NÃO "Song" ou "Track")
 */
export interface TrackScene {
  id: string;
  projectId: string;
  templateId: string;
  trackSceneTemplateVersion: number;
  title: string;
  artist?: string;
  description?: string;
  videoUrl?: string;
  technicalInstruction?: string; // ✅ Não technicalNotes
  lyrics?: string;
  order: number;
  status: TrackSceneStatus;
  isVisible: boolean;
  demoRequired: boolean;
  pressQuizRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ StudyTrackCategory - Categoria customizável de faixa de estudo
 */
export interface StudyTrackCategory {
  id: string;
  courseId: string;
  name: string;
  key: string; // Ex: "HARMONY", "BLOCKING"
  icon?: string;
  color?: string;
  description?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ StudyTrackTemplate - Template reutilizável de faixa de estudo
 */
export interface StudyTrackTemplate {
  id: string;
  trackSceneTemplateId: string;
  categoryId?: string;
  categoryKey?: string;
  title: string;
  description?: string;
  technicalNotes?: string; // ✅ Correto aqui
  videoUrl?: string;
  audioUrl?: string;
  pdfUrl?: string;
  order: number;
  estimatedMinutes: number;
  isRequired: boolean;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ StudyTrack - Instância de faixa de estudo (NÃO "TrackLesson")
 */
export interface StudyTrack {
  id: string;
  trackSceneId: string; // ✅ Não trackId
  templateId: string;
  categoryId?: string;
  categoryKey?: string;
  title: string;
  description?: string;
  technicalNotes?: string; // ✅ Correto aqui
  videoUrl?: string;
  audioUrl?: string;
  pdfUrl?: string;
  order: number;
  estimatedMinutes: number;
  isRequired: boolean;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ StudentStudyTrack - Progresso do aluno em faixa de estudo
 */
export interface StudentStudyTrack {
  id: string;
  studentId: string;
  studyTrackId: string;
  completed: boolean;
  completedAt?: Date;
  notes?: string;
  practiceTime: number; // minutos
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ StudentTrackScene - Progresso do aluno em música/cena
 */
export interface StudentTrackScene {
  id: string;
  studentId: string;
  trackSceneId: string; // ✅ Não trackId, não songId
  status: StudentTrackSceneStatus;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ Submission - Demo enviada (NÃO "Demo")
 */
export interface Submission {
  id: string;
  studentId: string;
  trackSceneId: string; // ✅ Não trackId, não songId
  attemptNumber: number;
  mediaUrl?: string; // ✅ Não audioUrl
  notes?: string;
  status: SubmissionStatus;
  pressUnlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  reviewedAt?: Date;
}

/**
 * ✅ Review - Avaliação do professor (NÃO "Evaluation")
 */
export interface Review {
  id: string;
  submissionId: string; // ✅ Não demoId
  teacherId: string;
  teacherName: string;
  type: ReviewType;
  rating?: number;
  comment?: string;
  feedback?: string;
  technicalNotes?: string; // ✅ Correto aqui
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ PressQuiz - Quiz de coletiva de imprensa
 */
export interface PressQuiz {
  id: string;
  trackSceneId: string; // ✅ Não trackId
  seasonId: string;
  version: number;
  questionsJson?: any; // JSON
  maxAttempts: number;
  passingScore: number;
  status: TrackSceneStatus;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ PressAttempt - Tentativa de quiz de imprensa
 */
export interface PressAttempt {
  id: string;
  studentId: string;
  submissionId: string;
  pressQuizId: string;
  attemptNumber: number;
  answersJson?: any; // JSON
  score?: number;
  result: PressResult;
  headline?: string;
  subtitle?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ DailyMissionTemplate - Template de rotina diária
 */
export interface DailyMissionTemplate {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  videoUrl?: string;
  order: number;
  status: string; // DailyMissionTemplateStatus
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ DailyMission - Rotina diária do aluno
 */
export interface DailyMission {
  id: string;
  templateId: string;
  studentId: string;
  seasonId: string;
  date: Date;
  status: DailyMissionStatus;
  attemptsCount: number;
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ Tour - Turnê do aluno
 */
export interface Tour {
  id: string;
  studentId: string;
  seasonId: string;
  name: string;
  description?: string;
  requiredStreak: number;
  status: TourStatus;
  completed: boolean;
  startedAt: Date;
  endedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ TourShow - Show da turnê
 */
export interface TourShow {
  id: string;
  tourId: string;
  city: string;
  venue: string;
  date: Date;
  checkedIn: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ Career - Carreira do aluno na temporada
 */
export interface Career {
  id: string;
  studentId: string;
  seasonId: string;
  fans: number;
  level: ArtistLevel;
  levelNumber: number;
  currentStreak: number;
  longestStreak: number;
  totalDemos: number;
  approvedDemos: number;
  totalAchievements: number;
  toursCompleted: number;
  lastActiveDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ Achievement - Conquista disponível
 */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon?: string;
  iconUrl?: string; // ✅ Compatibilidade com mocks
  category: AchievementCategory;
  tier: AchievementTier;
  requirement?: number;
  fansReward?: number;
  fanReward?: number; // ✅ Compatibilidade com mocks
  isActive?: boolean;
  unlocked?: boolean; // ✅ Para Social.tsx
  unlockedAt?: Date; // ✅ Para Social.tsx
  createdAt: Date;
  updatedAt?: Date;
}

/**
 * ✅ StudentAchievement - Conquista desbloqueada pelo aluno
 */
export interface StudentAchievement {
  id: string;
  studentId: string;
  achievementId: string;
  unlocked: boolean;
  unlockedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ✅ FanTransaction - Transação de fãs
 */
export interface FanTransaction {
  id: string;
  studentId: string;
  seasonId: string;
  eventId: string;
  amount: number;
  reason: string;
  createdAt: Date;
}

/**
 * ✅ Notification - Notificação do usuário
 */
export interface Notification {
  id: string;
  userId: string;
  type: string; // Ex: 'REVIEW_RECEIVED', 'PRESS_UNLOCKED'
  title: string;
  message: string;
  read: boolean;
  icon?: string;
  color?: string;
  sourceType?: string | null; // Deep link: 'SUBMISSION', 'REVIEW', 'PROJECT', 'ACHIEVEMENT', etc
  sourceId?: string | null; // ID da entidade origem
  actionUrl?: string | null; // URL customizada para navegação
  metadata?: Record<string, any>; // Dados adicionais (submissionId, trackSceneId, etc)
  readAt?: Date;
  createdAt: Date;
}

// ==================== TIPOS AUXILIARES ====================

/**
 * CareerStats - Estatísticas agregadas (para compatibilidade)
 */
export interface CareerStats {
  level: ArtistLevel;
  fans: number;
  currentStreak: number;
  longestStreak: number;
  totalDemos: number;
  approvedDemos: number;
  achievements: number;
  toursCompleted: number;
  lastActivityDate?: Date;
}

/**
 * DailyRoutine - Rotina diária formatada (para UI)
 */
export interface DailyRoutine {
  id: string;
  date: string;
  type: CourseType;
  title: string;
  description: string;
  exercises: Array<{
    id: string;
    title: string;
    description: string;
    videoUrl?: string;
    duration: number;
  }>;
  completed: boolean;
  completedAt?: Date;
}

// ==================== EXPORTS ====================
// Apenas enums existem em runtime e podem ser exportados como valores
// Interfaces e tipos devem ser importados com 'import type'

export default {
  UserRole,
  UserStatus,
  CourseType,
  SeasonStatus,
  ProjectType,
  ProjectStatus,
  TrackSceneStatus,
  StudentTrackSceneStatus,
  SubmissionStatus,
  ReviewType,
  PressResult,
  TourStatus,
  StreakDayStatus,
  DailyMissionStatus,
  AchievementCategory,
  AchievementTier,
  ArtistLevel,
};
