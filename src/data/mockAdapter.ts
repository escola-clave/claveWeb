/**
 * Clave de Sales - Mock Adapter
 * 
 * Adapta os mocks antigos para usar nomenclatura correta do schema Prisma
 * sem quebrar o código existente.
 */

import MOCK_DATA from './centralizedMocks';

// ==================== ADAPTADOR ====================

/**
 * Mapeia os mocks antigos para nomenclatura do Prisma:
 * - tracks → trackScenes
 * - demos → submissions  
 * - evaluations → reviews
 * - trackId → trackSceneId
 * - etc.
 */

const ADAPTED_MOCK_DATA = {
  ...MOCK_DATA,
  
  // TrackScenes (antes chamado de "tracks")
  trackScenes: MOCK_DATA.tracks.map((track: any) => ({
    ...track,
    technicalInstruction: track.technicalNotes, // Mapear campo correto
    trackSceneId: track.id, // Para facilitar busca
  })),

  // Submissions (antes chamado de "demos")
  submissions: MOCK_DATA.demos.map((demo: any) => ({
    id: demo.id,
    studentId: demo.userId,
    trackSceneId: demo.trackId || demo.songId, // Mapear campo correto
    attemptNumber: 1,
    mediaUrl: demo.audioUrl,
    notes: demo.notes,
    status: demo.status,
    pressUnlocked: demo.status === 'APPROVED',
    createdAt: demo.submittedAt,
    updatedAt: demo.submittedAt,
    reviewedAt: demo.reviewedAt,
  })),

  // Reviews (antes chamado de "evaluations")  
  reviews: MOCK_DATA.evaluations.map((eval: any) => ({
    id: eval.id,
    submissionId: eval.demoId,
    teacherId: eval.teacherId,
    rating: eval.rating,
    feedback: eval.feedback,
    technicalFeedback: eval.technicalNotes,
    approved: eval.approved,
    createdAt: eval.createdAt,
  })),

  // Manter compatibilidade retroativa
  tracks: MOCK_DATA.tracks,
  demos: MOCK_DATA.demos,
  evaluations: MOCK_DATA.evaluations,
};

// ==================== HELPERS ====================

/**
 * Busca uma TrackScene por ID
 */
export function getTrackSceneById(id: string) {
  return ADAPTED_MOCK_DATA.trackScenes.find((t: any) => t.id === id);
}

/**
 * Busca Submissions de uma TrackScene
 */
export function getSubmissionsByTrackScene(trackSceneId: string) {
  return ADAPTED_MOCK_DATA.submissions.filter(
    (s: any) => s.trackSceneId === trackSceneId
  );
}

/**
 * Busca Review de uma Submission
 */
export function getReviewBySubmission(submissionId: string) {
  return ADAPTED_MOCK_DATA.reviews.find(
    (r: any) => r.submissionId === submissionId
  );
}

/**
 * Busca Submission por ID
 */
export function getSubmissionById(id: string) {
  return ADAPTED_MOCK_DATA.submissions.find((s: any) => s.id === id);
}

/**
 * Busca todas as Submissions de um estudante
 */
export function getSubmissionsByStudent(studentId: string) {
  return ADAPTED_MOCK_DATA.submissions.filter(
    (s: any) => s.studentId === studentId
  );
}

/**
 * Busca TrackScenes de um projeto
 */
export function getTrackScenesByProject(projectId: string) {
  return ADAPTED_MOCK_DATA.trackScenes.filter(
    (t: any) => t.projectId === projectId
  );
}

/**
 * Busca Professor por ID (helper útil já que Review não tem teacherName)
 */
export function getTeacherById(teacherId: string) {
  return MOCK_DATA.users.find((u: any) => u.id === teacherId && u.role === 'TEACHER');
}

// ==================== EXPORT ====================

export default ADAPTED_MOCK_DATA;
export { ADAPTED_MOCK_DATA as MOCK };
