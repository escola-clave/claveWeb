/**
 * Clave de Sales - Study Track Mocks
 * Sistema de faixas de estudo pedagógicas (templates e instâncias)
 */

// ==================== TIPOS ====================

export interface StudyTrackCategory {
  id: string;
  courseId: string;
  name: string;
  key: string;
  icon: string;
  color: string;
  description: string;
  order: number;
  isActive: boolean;
}

export interface StudyTrackTemplate {
  id: string;
  trackSceneTemplateId: string;
  categoryId: string;
  categoryKey: string;
  title: string;
  description: string;
  technicalNotes: string;
  videoUrl?: string;
  audioUrl?: string;
  pdfUrl?: string;
  order: number;
  estimatedMinutes: number;
  isRequired: boolean;
  isVisible: boolean;
}

export interface StudyTrack {
  id: string;
  trackSceneId: string;
  templateId: string;
  categoryId: string;
  categoryKey: string;
  title: string;
  description: string;
  technicalNotes: string;
  videoUrl?: string;
  audioUrl?: string;
  pdfUrl?: string;
  order: number;
  estimatedMinutes: number;
  isRequired: boolean;
  isVisible: boolean;
}

export interface StudentStudyTrack {
  id: string;
  studentId: string;
  studyTrackId: string;
  completed: boolean;
  completedAt?: Date;
  notes?: string;
  practiceTime: number; // minutos
}

// ==================== CATEGORIAS DE MÚSICA ====================

export const MUSIC_STUDY_CATEGORIES: StudyTrackCategory[] = [
  {
    id: 'cat-music-1',
    courseId: 'course-1',
    name: 'Harmonia',
    key: 'HARMONY',
    icon: '🎵',
    color: '#4F46E5',
    description: 'Estudo de acordes e progressões harmônicas',
    order: 1,
    isActive: true,
  },
  {
    id: 'cat-music-2',
    courseId: 'course-1',
    name: 'Ritmo',
    key: 'RHYTHM',
    icon: '🥁',
    color: '#8B5CF6',
    description: 'Prática de padrões rítmicos e batidas',
    order: 2,
    isActive: true,
  },
  {
    id: 'cat-music-3',
    courseId: 'course-1',
    name: 'Melodia',
    key: 'MELODY',
    icon: '🎼',
    color: '#EC4899',
    description: 'Trabalho de linha melódica e intervalos',
    order: 3,
    isActive: true,
  },
  {
    id: 'cat-music-4',
    courseId: 'course-1',
    name: 'Técnica Vocal',
    key: 'TECHNIQUE',
    icon: '🎤',
    color: '#F59E0B',
    description: 'Desenvolvimento de técnica vocal e respiração',
    order: 4,
    isActive: true,
  },
  {
    id: 'cat-music-5',
    courseId: 'course-1',
    name: 'Interpretação',
    key: 'INTERPRETATION',
    icon: '🎭',
    color: '#10B981',
    description: 'Expressão e dinâmica da performance',
    order: 5,
    isActive: true,
  },
  {
    id: 'cat-music-6',
    courseId: 'course-1',
    name: 'Solo/Improvisação',
    key: 'SOLO',
    icon: '🎸',
    color: '#EF4444',
    description: 'Improvisação e ornamentação musical',
    order: 6,
    isActive: true,
  },
];

// ==================== TEMPLATES - GAROTA DE IPANEMA ====================

export const GAROTA_IPANEMA_STUDY_TEMPLATES: StudyTrackTemplate[] = [
  {
    id: 'st-template-garota-1',
    trackSceneTemplateId: 'track-template-1',
    categoryId: 'cat-music-1',
    categoryKey: 'HARMONY',
    title: 'Harmonia e Progressão de Acordes',
    description: 'Domine a progressão harmônica característica da Bossa Nova',
    technicalNotes: 'Foque na transição suave entre os acordes Fmaj7, G7, Gm7, Gb7. A progressão harmônica é sofisticada mas deve soar natural.',
    videoUrl: 'https://www.youtube.com/watch?v=example1',
    estimatedMinutes: 15,
    order: 1,
    isRequired: true,
    isVisible: true,
  },
  {
    id: 'st-template-garota-2',
    trackSceneTemplateId: 'track-template-1',
    categoryId: 'cat-music-2',
    categoryKey: 'RHYTHM',
    title: 'Batida e Ritmo da Bossa Nova',
    description: 'Aprenda a batida sincopada característica da Bossa Nova',
    technicalNotes: 'O ritmo da Bossa Nova é baseado no samba, mas mais suave e sincopado. Pratique lentamente até dominar o padrão.',
    videoUrl: 'https://www.youtube.com/watch?v=example2',
    estimatedMinutes: 20,
    order: 2,
    isRequired: true,
    isVisible: true,
  },
  {
    id: 'st-template-garota-3',
    trackSceneTemplateId: 'track-template-1',
    categoryId: 'cat-music-3',
    categoryKey: 'MELODY',
    title: 'Linha Melódica Principal',
    description: 'Pratique a melodia vocal com afinação e fraseado corretos',
    technicalNotes: 'Atenção aos intervalos e ornamentações sutis. A melodia deve fluir naturalmente, evite vibrato excessivo.',
    videoUrl: 'https://www.youtube.com/watch?v=example3',
    estimatedMinutes: 25,
    order: 3,
    isRequired: true,
    isVisible: true,
  },
  {
    id: 'st-template-garota-4',
    trackSceneTemplateId: 'track-template-1',
    categoryId: 'cat-music-4',
    categoryKey: 'TECHNIQUE',
    title: 'Técnica Vocal e Respiração',
    description: 'Desenvolva controle respiratório e sustentação de notas',
    technicalNotes: 'Respiração diafragmática é essencial. Pratique sustentação nas frases longas sem perder a leveza.',
    videoUrl: 'https://www.youtube.com/watch?v=example4',
    estimatedMinutes: 18,
    order: 4,
    isRequired: true,
    isVisible: true,
  },
  {
    id: 'st-template-garota-5',
    trackSceneTemplateId: 'track-template-1',
    categoryId: 'cat-music-5',
    categoryKey: 'INTERPRETATION',
    title: 'Interpretação e Expressão',
    description: 'Transmita a emoção e o clima da Bossa Nova',
    technicalNotes: 'A interpretação deve ser sutil, romântica mas sem exageros. Conte a história da garota de forma leve e envolvente.',
    videoUrl: 'https://www.youtube.com/watch?v=example5',
    estimatedMinutes: 22,
    order: 5,
    isRequired: true,
    isVisible: true,
  },
  {
    id: 'st-template-garota-6',
    trackSceneTemplateId: 'track-template-1',
    categoryId: 'cat-music-6',
    categoryKey: 'SOLO',
    title: 'Improvisação e Ornamentação',
    description: 'Adicione sua personalidade com ornamentos sutis',
    technicalNotes: 'Ornamentações devem ser discretas e de bom gosto. Menos é mais na Bossa Nova.',
    videoUrl: 'https://www.youtube.com/watch?v=example6',
    estimatedMinutes: 20,
    order: 6,
    isRequired: false,
    isVisible: true,
  },
];

// ==================== TEMPLATES - CHEGA DE SAUDADE ====================

export const CHEGA_SAUDADE_STUDY_TEMPLATES: StudyTrackTemplate[] = [
  {
    id: 'st-template-chega-1',
    trackSceneTemplateId: 'track-template-2',
    categoryId: 'cat-music-1',
    categoryKey: 'HARMONY',
    title: 'Harmonia de Chega de Saudade',
    description: 'Explore a harmonia rica desta música',
    technicalNotes: 'Progressões cromáticas características. Preste atenção nas modulações.',
    estimatedMinutes: 15,
    order: 1,
    isRequired: true,
    isVisible: true,
  },
  {
    id: 'st-template-chega-2',
    trackSceneTemplateId: 'track-template-2',
    categoryId: 'cat-music-2',
    categoryKey: 'RHYTHM',
    title: 'Ritmo e Pulsação',
    description: 'Domine o ritmo característico',
    technicalNotes: 'Mantenha a leveza mesmo nas partes mais intensas.',
    estimatedMinutes: 18,
    order: 2,
    isRequired: true,
    isVisible: true,
  },
  {
    id: 'st-template-chega-3',
    trackSceneTemplateId: 'track-template-2',
    categoryId: 'cat-music-3',
    categoryKey: 'MELODY',
    title: 'Melodia e Fraseado',
    description: 'Trabalhe a melodia com precisão',
    technicalNotes: 'Intervalos amplos. Pratique os saltos com cuidado.',
    estimatedMinutes: 22,
    order: 3,
    isRequired: true,
    isVisible: true,
  },
  {
    id: 'st-template-chega-4',
    trackSceneTemplateId: 'track-template-2',
    categoryId: 'cat-music-4',
    categoryKey: 'TECHNIQUE',
    title: 'Técnica Vocal',
    description: 'Controle de dinâmica e projeção',
    technicalNotes: 'Trabalhe os contrastes entre forte e piano.',
    estimatedMinutes: 20,
    order: 4,
    isRequired: true,
    isVisible: true,
  },
  {
    id: 'st-template-chega-5',
    trackSceneTemplateId: 'track-template-2',
    categoryId: 'cat-music-5',
    categoryKey: 'INTERPRETATION',
    title: 'Interpretação Emocional',
    description: 'Transmita a saudade com autenticidade',
    technicalNotes: 'Conecte-se com a emoção da saudade brasileira.',
    estimatedMinutes: 25,
    order: 5,
    isRequired: true,
    isVisible: true,
  },
];

// ==================== INSTÂNCIAS - GAROTA DE IPANEMA (Proj 1, Track 1) ====================

export const GAROTA_IPANEMA_STUDY_TRACKS: StudyTrack[] = GAROTA_IPANEMA_STUDY_TEMPLATES.map((template, index) => ({
  id: `st-instance-garota-${index + 1}`,
  trackSceneId: 'track-1', // Garota de Ipanema no projeto Vozes do Brasil
  templateId: template.id,
  categoryId: template.categoryId,
  categoryKey: template.categoryKey,
  title: template.title,
  description: template.description,
  technicalNotes: template.technicalNotes,
  videoUrl: template.videoUrl,
  audioUrl: template.audioUrl,
  pdfUrl: template.pdfUrl,
  order: template.order,
  estimatedMinutes: template.estimatedMinutes,
  isRequired: template.isRequired,
  isVisible: template.isVisible,
}));

// ==================== INSTÂNCIAS - CHEGA DE SAUDADE (Proj 1, Track 2) ====================

export const CHEGA_SAUDADE_STUDY_TRACKS: StudyTrack[] = CHEGA_SAUDADE_STUDY_TEMPLATES.map((template, index) => ({
  id: `st-instance-chega-${index + 1}`,
  trackSceneId: 'track-2', // Chega de Saudade no projeto Vozes do Brasil
  templateId: template.id,
  categoryId: template.categoryId,
  categoryKey: template.categoryKey,
  title: template.title,
  description: template.description,
  technicalNotes: template.technicalNotes,
  videoUrl: template.videoUrl,
  audioUrl: template.audioUrl,
  pdfUrl: template.pdfUrl,
  order: template.order,
  estimatedMinutes: template.estimatedMinutes,
  isRequired: template.isRequired,
  isVisible: template.isVisible,
}));

// ==================== PROGRESSO DO ALUNO (user-1 - Sofia) ====================

export const STUDENT_STUDY_TRACK_PROGRESS: StudentStudyTrack[] = [
  // Garota de Ipanema - Sofia completou 3 de 6 faixas
  {
    id: 'progress-1-1',
    studentId: 'user-1',
    studyTrackId: 'st-instance-garota-1',
    completed: true,
    completedAt: new Date('2024-01-18T14:30:00Z'),
    notes: 'Consegui dominar as transições harmônicas!',
    practiceTime: 45,
  },
  {
    id: 'progress-1-2',
    studentId: 'user-1',
    studyTrackId: 'st-instance-garota-2',
    completed: true,
    completedAt: new Date('2024-01-19T16:20:00Z'),
    notes: 'A batida está ficando natural agora',
    practiceTime: 60,
  },
  {
    id: 'progress-1-3',
    studentId: 'user-1',
    studyTrackId: 'st-instance-garota-3',
    completed: true,
    completedAt: new Date('2024-01-20T10:00:00Z'),
    practiceTime: 55,
  },
  {
    id: 'progress-1-4',
    studentId: 'user-1',
    studyTrackId: 'st-instance-garota-4',
    completed: false,
    practiceTime: 30,
  },
  {
    id: 'progress-1-5',
    studentId: 'user-1',
    studyTrackId: 'st-instance-garota-5',
    completed: false,
    practiceTime: 0,
  },
  {
    id: 'progress-1-6',
    studentId: 'user-1',
    studyTrackId: 'st-instance-garota-6',
    completed: false,
    practiceTime: 0,
  },
];

// ==================== CONSOLIDAÇÃO ====================

export const STUDY_TRACK_MOCKS = {
  categories: MUSIC_STUDY_CATEGORIES,
  templates: [
    ...GAROTA_IPANEMA_STUDY_TEMPLATES,
    ...CHEGA_SAUDADE_STUDY_TEMPLATES,
  ],
  instances: [
    ...GAROTA_IPANEMA_STUDY_TRACKS,
    ...CHEGA_SAUDADE_STUDY_TRACKS,
  ],
  studentProgress: STUDENT_STUDY_TRACK_PROGRESS,
};

export default STUDY_TRACK_MOCKS;

// ==================== HELPERS ====================

export function getStudyTracksByTrackScene(trackSceneId: string): StudyTrack[] {
  return STUDY_TRACK_MOCKS.instances.filter(st => st.trackSceneId === trackSceneId);
}

export function getStudentProgressForTrack(studentId: string, trackSceneId: string): StudentStudyTrack[] {
  const studyTracks = getStudyTracksByTrackScene(trackSceneId);
  const studyTrackIds = studyTracks.map(st => st.id);
  
  return STUDY_TRACK_MOCKS.studentProgress.filter(
    p => p.studentId === studentId && studyTrackIds.includes(p.studyTrackId)
  );
}

export function getStudyTrackProgress(trackSceneId: string, studentId: string) {
  const studyTracks = getStudyTracksByTrackScene(trackSceneId);
  const progress = getStudentProgressForTrack(studentId, trackSceneId);
  
  const completed = progress.filter(p => p.completed).length;
  const total = studyTracks.filter(st => st.isRequired).length;
  const totalPracticeTime = progress.reduce((sum, p) => sum + p.practiceTime, 0);
  
  return {
    completed,
    total,
    percentage: total > 0 ? (completed / total) * 100 : 0,
    totalPracticeTime,
    studyTracks: studyTracks.map(st => {
      const prog = progress.find(p => p.studyTrackId === st.id);
      const category = MUSIC_STUDY_CATEGORIES.find(c => c.id === st.categoryId);
      
      return {
        ...st,
        category: category ? {
          name: category.name,
          key: category.key,
          icon: category.icon,
          color: category.color,
        } : null,
        progress: prog || {
          completed: false,
          practiceTime: 0,
        },
      };
    }),
  };
}
