/**
 * Clave de Sales - Tipos Corrigidos
 * Alinhados 100% com schema.prisma - SEM campos que não existem no banco
 */

// ==================== TIPOS CORRIGIDOS ====================

export interface User {
  id: string;
  email: string;
  name: string;
  artistName: string;
  role: 'ADMIN' | 'TEACHER' | 'ARTIST';
  avatar: string;
  schoolId: string;
  courseId: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  courseId: string;
  name: string;
  type: 'ALBUM' | 'PLAY';
  description: string;
  coverImage: string;
  startDate: Date;
  endDate: Date;
  status: 'ACTIVE' | 'COMPLETED' | 'UPCOMING';
}

// ⚠️ TrackScene é a música/cena (não "Track" ou "Song")
export interface TrackScene {
  id: string;
  projectId: string;
  title: string;
  artist?: string;
  description?: string;
  videoUrl?: string;
  technicalInstruction?: string;  // ✅ Campo correto (não technicalNotes)
  lyrics?: string;                 // ✅ Existe no schema
  order: number;
  status: 'LOCKED' | 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED';
  isVisible: boolean;
  demoRequired: boolean;
  pressQuizRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ⚠️ Submission é o "demo" (não existe modelo "Demo" no schema)
export interface Submission {
  id: string;
  studentId: string;
  trackSceneId: string;      // ✅ Campo correto (não trackId ou songId)
  attemptNumber: number;
  mediaUrl: string | null;
  notes: string | null;
  status: 'PENDING_REVIEW' | 'APPROVED' | 'NEEDS_REVISION' | 'REJECTED';
  pressUnlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  reviewedAt?: Date;
}

// ⚠️ Review é a avaliação (não "Evaluation")
export interface Review {
  id: string;
  submissionId: string;      // ✅ Campo correto (não demoId)
  teacherId: string;
  rating: number;
  feedback: string | null;
  technicalFeedback: string | null; // ✅ Campo correto
  approved: boolean;
  createdAt: Date;
}

// StudentTrackScene é o progresso do aluno
export interface StudentTrackScene {
  id: string;
  studentId: string;
  trackSceneId: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'DEMO_SUBMITTED' | 'COMPLETED';
  lastSubmissionId?: string;
  bestRating?: number;
  submissionsCount: number;
  pressQuizPassed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// PressQuiz é o quiz de coletiva
export interface PressQuiz {
  id: string;
  trackSceneId: string;      // ✅ Campo correto
  title: string;
  questions: any; // JSON
  passingScore: number;
  maxAttempts: number;
  createdAt: Date;
}

// ==================== CAMPOS QUE NÃO EXISTEM (REMOVIDOS) ====================

// ❌ REMOVIDO: Track.songId (não existe no schema)
// ❌ REMOVIDO: Track.type (HARMONY/RHYTHM - não existe em TrackScene)
// ❌ REMOVIDO: Track.technicalNotes (é technicalInstruction)
// ❌ REMOVIDO: Demo (modelo não existe, é Submission)
// ❌ REMOVIDO: Evaluation (modelo não existe, é Review)
// ❌ REMOVIDO: Song (modelo não existe)
// ❌ REMOVIDO: API_TYPES.region (não existe)
// ❌ REMOVIDO: API_TYPES.genre (não existe)
// ❌ REMOVIDO: API_TYPES.duration (não existe)
// ❌ REMOVIDO: API_TYPES.sheetMusicUrl (não existe)

// ==================== NOTA IMPORTANTE ====================

/**
 * TrackLesson / StudyTrack:
 * 
 * O conceito antigo era "TrackLesson" que misturava faixas de estudo
 * com tipos fixos (HARMONY, RHYTHM, etc).
 * 
 * AGORA temos StudyTrack com categorias customizáveis:
 * - StudyTrackCategory (define tipos personalizados)
 * - StudyTrackTemplate (template reutilizável)
 * - StudyTrack (instância da faixa de estudo)
 * - StudentStudyTrack (progresso)
 * 
 * Ver /data/studyTrackMocks.ts para os tipos corretos.
 */

export default {
  User,
  Project,
  TrackScene,
  Submission,
  Review,
  StudentTrackScene,
  PressQuiz,
};
