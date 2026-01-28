/**
 * 🎵 Clave de Sales - API TypeScript Definitions
 * Tipos e interfaces para integração com o backend
 */

// ============================================
// ENUMS
// ============================================

export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT' // ✅ Alinhado com Prisma (não ARTIST)
}

export enum CourseType {
  MUSIC = 'MUSIC',
  THEATER = 'THEATER'
}

export enum ProjectType {
  ALBUM = 'ALBUM',
  PLAY = 'PLAY'
}

export enum StudentTrackSceneStatus {
  LOCKED = 'LOCKED',
  AVAILABLE = 'AVAILABLE',
  STUDYING = 'STUDYING', // ✅ Alinhado com Prisma (não IN_PROGRESS)
  COMPLETED = 'COMPLETED'
}

export enum SubmissionStatus {
  PENDING = 'PENDING',
  PENDING_REVIEW = 'PENDING_REVIEW',
  REVIEWED = 'REVIEWED',
  APPROVED = 'APPROVED',
  NEEDS_REVISION = 'NEEDS_REVISION', // ✅ Alinhado com Prisma (não REVISION_NEEDED)
  REJECTED = 'REJECTED'
}

export enum DailyMissionStatus {
  DONE = 'DONE',
  DONE_WITH_PENALTY = 'DONE_WITH_PENALTY',
  SKIPPED = 'SKIPPED'
}

export enum TourShowStatus {
  LOCKED = 'LOCKED',
  AVAILABLE = 'AVAILABLE',
  COMPLETED = 'COMPLETED'
}

export enum TourStatus {
  UPCOMING = 'UPCOMING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export enum ArtistLevel {
  SHOWER = 'SHOWER',
  GARAGE = 'GARAGE',
  UNDERGROUND = 'UNDERGROUND',
  INDIE = 'INDIE',
  RISING_STAR = 'RISING_STAR',
  HEADLINER = 'HEADLINER',
  MAIN_STAGE = 'MAIN_STAGE'
}

export enum FanEventType {
  // Rotina
  ROUTINE_COMPLETED = 'ROUTINE_COMPLETED',
  ROUTINE_STREAK_5 = 'ROUTINE_STREAK_5',
  ROUTINE_STREAK_10 = 'ROUTINE_STREAK_10',
  ROUTINE_STREAK_30 = 'ROUTINE_STREAK_30',
  
  // Estúdio
  DEMO_SUBMITTED = 'DEMO_SUBMITTED',
  DEMO_APPROVED = 'DEMO_APPROVED',
  DEMO_EXCELLENCE = 'DEMO_EXCELLENCE',
  
  // Projetos
  TRACK_COMPLETED = 'TRACK_COMPLETED',
  PROJECT_COMPLETED = 'PROJECT_COMPLETED',
  
  // Coletiva
  PRESS_COMPLETED = 'PRESS_COMPLETED',
  
  // Turnês
  TOUR_SHOW_COMPLETED = 'TOUR_SHOW_COMPLETED',
  TOUR_COMPLETED = 'TOUR_COMPLETED',
  
  // Conquistas
  ACHIEVEMENT_UNLOCKED = 'ACHIEVEMENT_UNLOCKED',
  
  // Social
  LEVEL_UP = 'LEVEL_UP'
}

export enum NotificationType {
  TOUR_REMINDER = 'TOUR_REMINDER',
  PRESS_UNLOCKED = 'PRESS_UNLOCKED',
  REVIEW_RECEIVED = 'REVIEW_RECEIVED',
  ACHIEVEMENT_UNLOCKED = 'ACHIEVEMENT_UNLOCKED',
  LEVEL_UP = 'LEVEL_UP',
  STREAK_MILESTONE = 'STREAK_MILESTONE',
  PROJECT_DEADLINE = 'PROJECT_DEADLINE'
}

export enum AchievementCategory {
  ROUTINE = 'ROUTINE',
  STUDIO = 'STUDIO',
  PROJECT = 'PROJECT',
  SOCIAL = 'SOCIAL',
  TOUR = 'TOUR',
  SPECIAL = 'SPECIAL'
}

export enum ActivityType {
  LEVEL_UP = 'LEVEL_UP',
  DEMO_APPROVED = 'DEMO_APPROVED',
  ACHIEVEMENT_UNLOCKED = 'ACHIEVEMENT_UNLOCKED',
  PROJECT_COMPLETED = 'PROJECT_COMPLETED',
  TOUR_COMPLETED = 'TOUR_COMPLETED'
}

export enum PressQuestionType {
  TEXT = 'TEXT',
  RATING = 'RATING',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE'
}

export enum PressStatus {
  AVAILABLE = 'AVAILABLE',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED'
}

// ============================================
// BASE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: Pagination;
}

// ============================================
// AUTHENTICATION
// ============================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  stageName: string;
  courseId: string;
  inviteCode?: string;
}

export interface RegisterResponse {
  userId: string;
  message: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

// ============================================
// USER
// ============================================

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  stageName: string;
  avatar?: string;
  courseId: string;
  courseName?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UpdateUserRequest {
  name?: string;
  stageName?: string;
  avatar?: string;
}

export interface UserCareer {
  userId: string;
  stageName: string;
  fans: number;
  level: FanLevel;
  levelName: string;
  currentStreak: number;
  longestStreak: number;
  totalXP: number;
  progress: {
    current: number;
    nextLevel: number;
    percentage: number;
  };
}

// ============================================
// ROUTINE
// ============================================

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: string;
  completed: boolean;
}

export interface StreakInfo {
  current: number;
  longest: number;
  canComplete: boolean;
  lastCompletedAt?: string;
}

export interface Routine {
  id: string;
  userId: string;
  date: string;
  status: RoutineStatus;
  courseType: CourseType;
  exercises: Exercise[];
  streakInfo: StreakInfo;
  completedAt?: string;
}

export interface CompleteRoutineRequest {
  routineId: string;
  completedExercises: string[];
  completedAt: string;
}

export interface RoutineRewards {
  fans: number;
  xp: number;
  streak: number;
}

export interface CompleteRoutineResponse {
  routineId: string;
  status: RoutineStatus;
  completedAt: string;
  rewards: RoutineRewards;
  achievements?: Achievement[];
}

export interface RoutineHistoryItem {
  id: string;
  date: string;
  status: RoutineStatus;
  completedAt?: string;
  fansEarned: number;
  xpEarned: number;
}

export interface RoutineHistory {
  routines: RoutineHistoryItem[];
  pagination: Pagination;
  stats: {
    totalCompleted: number;
    totalMissed: number;
    completionRate: number;
  };
}

// ============================================
// PROJECT
// ============================================

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  coverImage: string;
  type: ProjectType;
  courseId: string;
  status: string;
  totalTracks: number;
  completedTracks: number;
  progress: number;
  createdAt: string;
  deadline?: string;
  tracks?: Track[];
}

export interface ProjectListResponse {
  projects: Project[];
}

// ============================================
// TRACK
// ============================================

export interface Track {
  id: string;
  projectId: string;
  title: string;
  artist: string;
  region?: string;
  genre?: string;
  duration: number;
  lyrics?: string;
  audioUrl?: string;
  sheetMusicUrl?: string;
  status: TrackStatus;
  completedAt?: string;
  userProgress?: TrackUserProgress;
}

export interface TrackUserProgress {
  status: TrackStatus;
  completedAt?: string;
  demosSubmitted: number;
  lastDemoId?: string;
}

export interface UpdateTrackProgressRequest {
  status: TrackStatus;
  notes?: string;
}

export interface UpdateTrackProgressResponse {
  trackId: string;
  status: TrackStatus;
  updatedAt: string;
}

// ============================================
// DEMO
// ============================================

export interface Demo {
  id: string;
  userId: string;
  trackId: string;
  trackTitle: string;
  projectId: string;
  projectTitle?: string;
  status: DemoStatus;
  uploadedAt: string;
  reviewedAt?: string;
  audioUrl: string;
  notes?: string;
  review?: DemoReview;
}

export interface DemoReview {
  rating: number;
  feedback: string;
  teacherId: string;
  teacherName: string;
  reviewedAt: string;
}

export interface UploadDemoRequest {
  file: File;
  trackId: string;
  projectId: string;
  notes?: string;
}

export interface DemoRewards {
  fans: number;
  xp: number;
}

export interface UploadDemoResponse {
  demoId: string;
  trackId: string;
  projectId: string;
  status: DemoStatus;
  uploadedAt: string;
  audioUrl: string;
  rewards: DemoRewards;
}

export interface DemoListResponse {
  demos: Demo[];
  pagination: Pagination;
}

export interface ReviewDemoRequest {
  rating: number;
  feedback: string;
  status: DemoStatus;
}

export interface ReviewDemoResponse {
  demoId: string;
  status: DemoStatus;
  rating: number;
  reviewedAt: string;
  studentNotified: boolean;
  rewards: DemoRewards;
}

// ============================================
// PRESS CONFERENCE
// ============================================

export interface PressRequirements {
  allTracksCompleted: boolean;
  minimumFans: boolean;
  currentFans?: number;
  requiredFans?: number;
  pendingTracks?: string[];
}

export interface PressAvailability {
  available: boolean;
  reason: string;
  requirements: PressRequirements;
}

export interface PressQuestion {
  id: string;
  question: string;
  type: PressQuestionType;
  required: boolean;
  min?: number;
  max?: number;
  options?: string[];
}

export interface PressConference {
  id: string;
  projectId: string;
  userId?: string;
  status: PressStatus;
  questions: PressQuestion[];
  startedAt: string;
  expiresAt: string;
  submittedAt?: string;
}

export interface StartPressRequest {
  projectId: string;
}

export interface PressAnswer {
  questionId: string;
  answer: string;
}

export interface SubmitPressRequest {
  answers: PressAnswer[];
}

export interface PressBadge {
  id: string;
  title: string;
  description: string;
}

export interface PressRewards {
  fans: number;
  xp: number;
  badge?: PressBadge;
}

export interface SubmitPressResponse {
  pressId: string;
  status: PressStatus;
  submittedAt: string;
  rewards: PressRewards;
}

export interface PressHistoryItem {
  id: string;
  projectId: string;
  projectTitle: string;
  status: PressStatus;
  submittedAt: string;
  fansEarned: number;
  xpEarned: number;
}

export interface PressHistory {
  pressConferences: PressHistoryItem[];
}

// ============================================
// CAREER
// ============================================

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  unlocked: boolean;
  unlockedAt?: string;
  fans: number;
  xp: number;
  progress?: {
    current: number;
    total: number;
    percentage: number;
  };
}

export interface AchievementList {
  achievements: Achievement[];
  stats: {
    totalAchievements: number;
    unlockedAchievements: number;
    completionRate: number;
  };
}

export interface TourShow {
  id: string;
  city: string;
  date: string;
  status: TourShowStatus;
  canComplete: boolean;
  completedAt?: string;
}

export interface TourRewards {
  fansPerShow: number;
  xpPerShow: number;
  completionBonus: {
    fans: number;
    xp: number;
  };
}

export interface TourProgress {
  completedShows: number;
  totalShows: number;
  percentage: number;
}

export interface Tour {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: TourStatus;
  shows: TourShow[];
  rewards: TourRewards;
  progress: TourProgress;
  completedShows?: number;
  totalShows?: number;
  fansEarned?: number;
  xpEarned?: number;
}

export interface TourList {
  currentTour?: Tour;
  pastTours: Tour[];
}

export interface CareerStats {
  fans: number;
  level: FanLevel;
  levelName: string;
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  totalDemosSubmitted: number;
  totalDemosApproved: number;
  approvalRate: number;
  totalProjectsCompleted: number;
  totalProjectsInProgress: number;
  totalAchievementsUnlocked: number;
  totalToursCompleted: number;
  totalShowsCompleted: number;
  joinedAt: string;
  daysActive: number;
}

// ============================================
// FAN ENGINE
// ============================================

export interface FanEventRequest {
  eventType: FanEventType;
  metadata?: Record<string, any>;
}

export interface LevelData {
  level: FanLevel;
  levelName: string;
  minFans: number;
  maxFans: number | null;
  perks?: string[];
}

export interface FanEventResponse {
  eventId: string;
  eventType: FanEventType;
  fansGained: number;
  xpGained: number;
  previousFans: number;
  currentFans: number;
  previousLevel: FanLevel;
  currentLevel: FanLevel;
  leveledUp: boolean;
  newLevelData?: LevelData;
  rewards?: {
    fans: number;
    xp: number;
    badge?: {
      id: string;
      title: string;
      description: string;
    };
  };
  processedAt: string;
}

export interface FanLevelInfo extends LevelData {
  icon: string;
  color: string;
}

export interface FanLevelList {
  levels: FanLevelInfo[];
}

export interface FanHistoryEvent {
  id: string;
  eventType: FanEventType;
  fansChange: number;
  xpChange: number;
  totalFans: number;
  description: string;
  createdAt: string;
}

export interface FanHistory {
  events: FanHistoryEvent[];
  pagination: Pagination;
}

// ============================================
// SOCIAL
// ============================================

export interface RankingEntry {
  rank: number;
  userId: string;
  stageName: string;
  avatar?: string;
  fans: number;
  level: FanLevel;
  levelName: string;
  change?: number;
}

export interface Ranking {
  period: 'ALL_TIME' | 'MONTHLY' | 'WEEKLY';
  updatedAt: string;
  currentUser: RankingEntry;
  ranking: RankingEntry[];
}

export interface ActivityMetadata {
  previousLevel?: FanLevel;
  newLevel?: FanLevel;
  fans?: number;
  trackTitle?: string;
  rating?: number;
  achievementId?: string;
  achievementTitle?: string;
  projectTitle?: string;
  tourName?: string;
}

export interface Activity {
  id: string;
  userId: string;
  stageName: string;
  avatar?: string;
  type: ActivityType;
  description: string;
  metadata?: ActivityMetadata;
  createdAt: string;
}

export interface Feed {
  activities: Activity[];
  pagination: Pagination;
}

// ============================================
// NOTIFICATIONS
// ============================================

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  deeplink: 'rotina' | 'estudio' | 'projetos' | 'carreira' | 'social';
  readAt?: string;
  createdAt: string;
}

export interface NotificationList {
  notifications: Notification[];
  pagination: Pagination;
  unreadCount: number;
}

export interface MarkNotificationReadResponse {
  notificationId: string;
  readAt: string;
}

export interface MarkAllNotificationsReadResponse {
  readCount: number;
  readAt: string;
}

// ============================================
// ADMIN
// ============================================

export interface CreateCourseRequest {
  name: string;
  type: CourseType;
  description: string;
  duration: number;
  maxStudents: number;
}

export interface Course {
  id: string;
  name: string;
  type: CourseType;
  status: string;
  description?: string;
  enrolledStudents?: number;
  maxStudents?: number;
  createdAt: string;
}

export interface CourseList {
  courses: Course[];
}

export interface CreateTeacherRequest {
  name: string;
  email: string;
  password: string;
  courseIds: string[];
  specialty?: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  specialty?: string;
  createdAt: string;
}

export interface Student {
  id: string;
  name: string;
  stageName: string;
  email: string;
  courseId: string;
  courseName: string;
  status: string;
  fans: number;
  level: FanLevel;
  currentStreak: number;
  enrolledAt: string;
  lastActivityAt: string;
}

export interface StudentList {
  students: Student[];
  pagination: Pagination;
}

export interface AdminAnalytics {
  overview: {
    totalStudents: number;
    activeStudents: number;
    totalTeachers: number;
    totalCourses: number;
  };
  engagement: {
    avgDailyActiveUsers: number;
    avgStreakLength: number;
    routineCompletionRate: number;
    demoSubmissionRate: number;
  };
  progression: {
    avgFansPerStudent: number;
    totalDemosSubmitted: number;
    totalDemosApproved: number;
    approvalRate: number;
  };
  topPerformers: Array<{
    userId: string;
    stageName: string;
    fans: number;
    level: FanLevel;
  }>;
}

// ============================================
// TEACHER
// ============================================

export interface PendingDemo {
  id: string;
  studentId: string;
  studentName: string;
  stageName: string;
  trackId: string;
  trackTitle: string;
  projectId: string;
  projectTitle: string;
  uploadedAt: string;
  audioUrl: string;
  notes?: string;
}

export interface PendingDemoList {
  demos: PendingDemo[];
  pagination: Pagination;
}

export interface TeacherStudent {
  id: string;
  name: string;
  stageName: string;
  courseId: string;
  fans: number;
  level: FanLevel;
  currentStreak: number;
  demosSubmitted: number;
  demosApproved: number;
  lastActivityAt: string;
}

export interface TeacherStudentList {
  students: TeacherStudent[];
}

export interface CreateProjectRequest {
  title: string;
  subtitle: string;
  description: string;
  type: ProjectType;
  courseId: string;
  coverImage: string;
  deadline?: string;
  tracks: Array<{
    title: string;
    artist: string;
    region?: string;
    genre?: string;
    duration: number;
    audioUrl?: string;
    lyricsUrl?: string;
  }>;
}

export interface CreateProjectResponse {
  projectId: string;
  title: string;
  status: string;
  totalTracks: number;
  createdAt: string;
}

// ============================================
// API CLIENT HELPER TYPES
// ============================================

export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}
