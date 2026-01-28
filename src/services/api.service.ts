/**
 * Clave de Sales - API Service
 * Serviço centralizado para todas as chamadas de API (mockadas)
 * Simula latência real e possíveis erros
 * 
 * ✅ ATUALIZADO: Usando tipos corretos (Submission, Review, TrackScene, etc)
 * ✅ PADRONIZADO: Response wrapper { success, data }
 */

import { MOCK_DATA } from '../data/centralizedMocks';
import { SubmissionStatus } from '../data/types';
import type {
  Submission,
  Review,
  TrackScene,
  User,
  Project,
  PressQuiz,
  Achievement,
  Tour,
  Notification,
} from '../data/types';

// ==================== TIPOS DE RESPONSE PADRONIZADOS ====================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

// Helper para criar response de sucesso
function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
  };
}

// Helper para criar response de erro
function createErrorResponse(code: string, message: string): ApiErrorResponse {
  return {
    success: false,
    error: { code, message },
  };
}

// Simula delay de rede
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Simula chance de erro (5%)
const simulateNetworkError = () => {
  if (Math.random() < 0.05) {
    throw new Error('Network error - please try again');
  }
};

export class ApiService {
  // ==================== AUTH ====================
  
  static async login(email: string, password: string): Promise<ApiResponse<{
    user: User;
    token: string;
    expiresIn: number;
  }>> {
    await delay(800);
    simulateNetworkError();
    
    const user = MOCK_DATA.users.find(u => u.email === email);
    if (!user || password !== 'demo123') {
      throw createErrorResponse('INVALID_CREDENTIALS', 'Credenciais inválidas');
    }
    
    return createSuccessResponse({
      user,
      token: `mock_token_${Date.now()}`,
      expiresIn: 3600,
    });
  }

  static async logout(): Promise<ApiResponse<{ message: string }>> {
    await delay(300);
    return createSuccessResponse({ message: 'Logout realizado com sucesso' });
  }

  static async refreshToken(token: string): Promise<ApiResponse<{
    token: string;
    expiresIn: number;
  }>> {
    await delay(400);
    return createSuccessResponse({
      token: `mock_token_${Date.now()}`,
      expiresIn: 3600,
    });
  }

  // ==================== USER ====================
  
  static async getCurrentUser(userId: string): Promise<ApiResponse<User>> {
    await delay(500);
    simulateNetworkError();
    
    const user = MOCK_DATA.users.find(u => u.id === userId);
    if (!user) throw createErrorResponse('USER_NOT_FOUND', 'Usuário não encontrado');
    
    return createSuccessResponse(user);
  }

  static async updateProfile(userId: string, data: any): Promise<ApiResponse<User>> {
    await delay(600);
    simulateNetworkError();
    
    const user = MOCK_DATA.users.find(u => u.id === userId);
    if (!user) throw createErrorResponse('USER_NOT_FOUND', 'Usuário não encontrado');
    
    // Simula atualização
    const updatedUser = {
      ...user,
      ...data,
      updatedAt: new Date(),
    };
    
    return createSuccessResponse(updatedUser);
  }

  // ==================== CAREER ====================
  
  static async getCareerStats(userId: string): Promise<ApiResponse<any>> {
    await delay(400);
    const stats = MOCK_DATA.careerStats[userId] || MOCK_DATA.careerStats['default'];
    return createSuccessResponse(stats);
  }

  static async updateCareerStats(userId: string, updates: any): Promise<ApiResponse<any>> {
    await delay(500);
    const current = MOCK_DATA.careerStats[userId] || MOCK_DATA.careerStats['default'];
    const updated = {
      ...current,
      ...updates,
      updatedAt: new Date(),
    };
    return createSuccessResponse(updated);
  }

  // ==================== ROTINA DIÁRIA ====================
  
  static async getDailyRoutine(userId: string, date: string): Promise<ApiResponse<any>> {
    await delay(400);
    const routine = MOCK_DATA.dailyRoutines.find(r => r.date === date) || MOCK_DATA.dailyRoutines[0];
    return createSuccessResponse(routine);
  }

  static async completeDailyRoutine(userId: string, routineId: string): Promise<ApiResponse<{
    rewards: { fans: number; streak: number };
    completedAt: Date;
  }>> {
    await delay(800);
    simulateNetworkError();
    
    return createSuccessResponse({
      rewards: {
        fans: 50,
        streak: 1,
      },
      completedAt: new Date(),
    });
  }

  // ==================== PROJETOS ====================
  
  static async getProjects(courseId: string): Promise<ApiResponse<Project[]>> {
    await delay(500);
    const projects = MOCK_DATA.projects.filter(p => p.courseId === courseId);
    return createSuccessResponse(projects);
  }

  static async getProjectById(projectId: string): Promise<ApiResponse<Project>> {
    await delay(400);
    const project = MOCK_DATA.projects.find(p => p.id === projectId);
    if (!project) throw createErrorResponse('PROJECT_NOT_FOUND', 'Projeto não encontrado');
    return createSuccessResponse(project);
  }

  static async getProjectTracks(projectId: string): Promise<ApiResponse<TrackScene[]>> {
    await delay(400);
    const trackScenes = MOCK_DATA.trackScenes.filter(t => t.projectId === projectId);
    return createSuccessResponse(trackScenes);
  }

  // ==================== ESTÚDIO (SUBMISSIONS) - ✅ ATUALIZADO ====================
  
  static async submitDemo(trackSceneId: string, audioFile: File | null, notes: string): Promise<ApiResponse<{
    submission: Submission;
    rewards: { fans: number; message: string };
  }>> {
    await delay(1500); // Upload demora mais
    simulateNetworkError();
    
    const submission: Submission = {
      id: `sub-${Date.now()}`,
      studentId: 'user-1', // TODO: pegar do contexto
      trackSceneId, // ✅ Não trackId
      attemptNumber: 1,
      mediaUrl: audioFile ? URL.createObjectURL(audioFile) : null, // ✅ Não audioUrl
      notes: notes || null,
      status: SubmissionStatus.PENDING_REVIEW,
      pressUnlocked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    MOCK_DATA.submissions.push(submission);
    
    return createSuccessResponse({
      submission,
      rewards: {
        fans: 300,
        message: 'Demo enviada com sucesso! +300 fãs',
      },
    });
  }

  static async getDemos(userId: string): Promise<ApiResponse<Submission[]>> {
    await delay(400);
    const submissions = MOCK_DATA.submissions.filter(s => s.studentId === userId);
    return createSuccessResponse(submissions);
  }

  static async getDemoById(submissionId: string): Promise<ApiResponse<Submission>> {
    await delay(300);
    const submission = MOCK_DATA.submissions.find(s => s.id === submissionId);
    if (!submission) throw createErrorResponse('SUBMISSION_NOT_FOUND', 'Submission não encontrada');
    return createSuccessResponse(submission);
  }

  // ==================== REVIEWS (Avaliações) - ✅ ATUALIZADO ====================
  
  static async getEvaluations(submissionId: string): Promise<ApiResponse<Review[]>> {
    await delay(400);
    const reviews = MOCK_DATA.reviews.filter(r => r.submissionId === submissionId);
    return createSuccessResponse(reviews);
  }

  static async submitEvaluation(submissionId: string, review: any): Promise<ApiResponse<Review>> {
    await delay(700);
    simulateNetworkError();
    
    const newReview: Review = {
      id: `review-${Date.now()}`,
      submissionId, // ✅ Não demoId
      teacherId: review.teacherId,
      teacherName: review.teacherName,
      type: review.type,
      rating: review.rating,
      feedback: review.feedback,
      technicalNotes: review.technicalNotes,
      approved: review.approved,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    MOCK_DATA.reviews.push(newReview);
    
    return createSuccessResponse(newReview);
  }

  // ==================== COLETIVA DE IMPRENSA - ✅ ATUALIZADO ====================
  
  static async getPressQuiz(trackSceneId: string): Promise<ApiResponse<PressQuiz | undefined>> {
    await delay(400);
    const quiz = MOCK_DATA.pressQuizzes.find(q => q.trackSceneId === trackSceneId);
    return createSuccessResponse(quiz);
  }

  static async submitPressQuizAnswer(quizId: string, answers: number[]): Promise<ApiResponse<{
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    passed: boolean;
    rewards: { fans: number; message: string };
  }>> {
    await delay(600);
    simulateNetworkError();
    
    const quiz = MOCK_DATA.pressQuizzes.find(q => q.id === quizId);
    if (!quiz) throw createErrorResponse('QUIZ_NOT_FOUND', 'Quiz não encontrado');
    
    const questions = quiz.questionsJson?.questions || [];
    const correctAnswers = answers.filter(
      (answer, index) => answer === questions[index]?.correctAnswer
    ).length;
    
    const score = Math.round((correctAnswers / questions.length) * 100);
    const passed = score >= quiz.passingScore;
    
    return createSuccessResponse({
      score,
      correctAnswers,
      totalQuestions: questions.length,
      passed,
      rewards: {
        fans: passed ? 500 : -20,
        message: passed ? 'Coletiva bem-sucedida! +500 fãs' : 'Precisa estudar mais. -20 fãs',
      },
    });
  }

  // ==================== CONQUISTAS ====================
  
  static async getAchievements(userId: string): Promise<ApiResponse<Achievement[]>> {
    await delay(400);
    return createSuccessResponse(MOCK_DATA.achievements);
  }

  static async unlockAchievement(userId: string, achievementId: string): Promise<ApiResponse<{
    achievement: Achievement;
    rewards: { fans: number };
  }>> {
    await delay(500);
    
    const achievement = MOCK_DATA.achievements.find(a => a.id === achievementId);
    if (!achievement) throw createErrorResponse('ACHIEVEMENT_NOT_FOUND', 'Conquista não encontrada');
    
    return createSuccessResponse({
      achievement,
      rewards: {
        fans: achievement.fansReward,
      },
    });
  }

  // ==================== TURNÊS ====================
  
  static async getTours(userId: string): Promise<ApiResponse<Tour[]>> {
    await delay(400);
    return createSuccessResponse(MOCK_DATA.tours);
  }

  static async getTourById(tourId: string): Promise<ApiResponse<Tour | undefined>> {
    await delay(300);
    const tour = MOCK_DATA.tours.find(t => t.id === tourId);
    return createSuccessResponse(tour);
  }

  static async checkInTour(tourId: string, showId: string): Promise<ApiResponse<{
    rewards: { fans: number; tourProgress: number };
    checkedInAt: Date;
  }>> {
    await delay(600);
    simulateNetworkError();
    
    return createSuccessResponse({
      rewards: {
        fans: 100,
        tourProgress: 1,
      },
      checkedInAt: new Date(),
    });
  }

  // ==================== NOTIFICAÇÕES ====================
  
  static async getNotifications(userId: string): Promise<ApiResponse<Notification[]>> {
    await delay(400);
    const notifications = MOCK_DATA.notifications.sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
    return createSuccessResponse(notifications);
  }

  static async markNotificationAsRead(notificationId: string): Promise<ApiResponse<{ message: string }>> {
    await delay(300);
    
    const notification = MOCK_DATA.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
    
    return createSuccessResponse({ message: 'Notificação marcada como lida' });
  }

  static async markAllNotificationsAsRead(userId: string): Promise<ApiResponse<{ message: string }>> {
    await delay(400);
    
    MOCK_DATA.notifications.forEach(n => {
      n.read = true;
    });
    
    return createSuccessResponse({ message: 'Todas notificações marcadas como lidas' });
  }

  // ==================== SOCIAL / RANKING ====================
  
  static async getLeaderboard(courseId: string, period: 'week' | 'month' | 'allTime' = 'week'): Promise<ApiResponse<any[]>> {
    await delay(500);
    const leaderboard = MOCK_DATA.leaderboard.sort((a, b) => b.fans - a.fans).slice(0, 50);
    return createSuccessResponse(leaderboard);
  }

  static async getUserRanking(userId: string): Promise<ApiResponse<{
    position: number;
    totalUsers: number;
    percentile: number;
  }>> {
    await delay(400);
    
    const userIndex = MOCK_DATA.leaderboard.findIndex(u => u.userId === userId);
    
    return createSuccessResponse({
      position: userIndex + 1,
      totalUsers: MOCK_DATA.leaderboard.length,
      percentile: Math.round(((MOCK_DATA.leaderboard.length - userIndex) / MOCK_DATA.leaderboard.length) * 100),
    });
  }

  // ==================== SCHOOLS & COURSES ====================
  
  static async getSchools(): Promise<ApiResponse<any[]>> {
    await delay(400);
    return createSuccessResponse(MOCK_DATA.schools);
  }

  static async getCourses(schoolId: string): Promise<ApiResponse<any[]>> {
    await delay(400);
    const courses = MOCK_DATA.courses.filter(c => c.schoolId === schoolId);
    return createSuccessResponse(courses);
  }

  static async getSeasons(courseId: string): Promise<ApiResponse<any[]>> {
    await delay(400);
    const seasons = MOCK_DATA.seasons.filter(s => s.courseId === courseId);
    return createSuccessResponse(seasons);
  }

  static async getClasses(seasonId: string): Promise<ApiResponse<any[]>> {
    await delay(400);
    const classes = MOCK_DATA.classes.filter(c => c.seasonId === seasonId);
    return createSuccessResponse(classes);
  }

  // ==================== ANALYTICS ====================
  
  static async getAnalytics(userId: string, period: 'week' | 'month' | 'year' = 'week'): Promise<ApiResponse<{
    fansGrowth: any;
    streakHistory: any;
    demosSubmitted: any;
    submissionsSubmitted: number;
    evaluationStats: any;
    reviewStats: { total: number; approved: number };
    activityHeatmap: any;
  }>> {
    await delay(600);
    
    return createSuccessResponse({
      fansGrowth: MOCK_DATA.analytics.fansGrowth,
      streakHistory: MOCK_DATA.analytics.streakHistory,
      demosSubmitted: MOCK_DATA.analytics.demosSubmitted, // ✅ Compatibilidade
      submissionsSubmitted: MOCK_DATA.submissions.length, // ✅ Novo campo
      evaluationStats: MOCK_DATA.analytics.evaluationStats, // ✅ Compatibilidade
      reviewStats: { // ✅ Novo campo
        total: MOCK_DATA.reviews.length,
        approved: MOCK_DATA.reviews.filter(r => r.approved).length,
      },
      activityHeatmap: MOCK_DATA.analytics.activityHeatmap,
    });
  }

  // ==================== FAN ENGINE ====================
  
  static async calculateFanReward(eventType: string, data: any): Promise<ApiResponse<{
    fans: number;
    eventType: string;
    timestamp: Date;
  }>> {
    await delay(200);
    
    const fanRewards: Record<string, number> = {
      'daily_routine_completed': 50,
      'demo_submitted': 300, // ✅ Compatibilidade
      'submission_created': 300, // ✅ Novo campo
      'evaluation_approved': 500, // ✅ Compatibilidade
      'review_positive': 500, // ✅ Novo campo
      'evaluation_revision': 200, // ✅ Compatibilidade
      'review_constructive': 250, // ✅ Novo campo
      'press_quiz_passed': 500,
      'press_quiz_failed': -20,
      'achievement_unlocked': 1000,
      'tour_checkin': 100,
      'streak_milestone': 250,
    };
    
    return createSuccessResponse({
      fans: fanRewards[eventType] || 0,
      eventType,
      timestamp: new Date(),
    });
  }
}

export default ApiService;
