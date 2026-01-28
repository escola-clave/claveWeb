/**
 * Clave de Sales - Centralized Mock Data
 * Dados mockados completos e ricos para demonstração ao cliente
 * 
 * ✅ ATUALIZADO: Usando tipos de src/data/types.ts
 * ✅ ALINHADO 100% COM SCHEMA PRISMA
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
} from './types';

import {
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

// ==================== TIPOS COMPATIBILIDADE (para UI) ====================
// Mantidos para compatibilidade com componentes que ainda não foram atualizados

// ✅ CareerStats já está em types.ts - usar de lá

// ✅ DailyRoutine já está em types.ts - usar de lá

// ✅ Project já está em types.ts - usar de lá

// ❌ REMOVIDO: Song → Use TrackScene
// ❌ REMOVIDO: Track (música) → Use TrackScene  
// ❌ REMOVIDO: Demo → Use Submission
// ❌ REMOVIDO: Evaluation → Use Review

// ✅ Use os tipos de src/data/types.ts

// ✅ PressQuiz já está em types.ts - usar de lá

// ✅ Achievement já está em types.ts - usar de lá

// ✅ Tour já está em types.ts - usar de lá

// ✅ Notification já está em types.ts - usar de lá

export interface FanTransaction {
  id: string;
  userId: string;
  eventType: string;
  fans: number;
  description: string;
  createdAt: Date;
}

// ✅ Career já está em types.ts - usar de lá

// ✅ StudentTrackScene já está em types.ts - usar de lá

// ❌ REMOVIDO: TrackLesson → Use StudyTrack de types.ts

// ==================== MOCK DATA EXPANDIDO ====================

export const MOCK_DATA = {
  // ===== USUÁRIOS (20 artistas + professores) =====
  users: [
    {
      id: 'user-1',
      email: 'mari.costa@demo.com',
      name: 'Mariana Costa',
      artistName: 'Mari Costa',
      role: UserRole.STUDENT,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana&backgroundColor=b6e3f4&hair=long01&hairColor=4a312c&top=longHairStraight&clothingColor=262e33',
      schoolId: 'school-1',
      courseId: 'course-1', // Curso de Música
      createdAt: new Date('2023-09-15'), // 4 meses atrás
    },
    {
      id: 'user-2',
      email: 'pedro@demo.com',
      name: 'Pedro Oliveira',
      artistName: 'Pedro Rock',
      role: UserRole.STUDENT, // ✅ Não ARTIST
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
      schoolId: 'school-1',
      courseId: 'course-1',
      createdAt: new Date('2023-11-01'),
    },
    {
      id: 'user-3',
      email: 'carla@demo.com',
      name: 'Carla Santos',
      artistName: 'Carla Jazz',
      role: UserRole.STUDENT, // ✅ Não ARTIST
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carla',
      schoolId: 'school-1',
      courseId: 'course-1',
      createdAt: new Date('2023-09-15'),
    },
    {
      id: 'user-4',
      email: 'lucas@demo.com',
      name: 'Lucas Silva',
      artistName: 'Luke Beats',
      role: UserRole.STUDENT, // ✅ Não ARTIST
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
      schoolId: 'school-1',
      courseId: 'course-1',
      createdAt: new Date('2023-12-01'),
    },
    {
      id: 'user-5',
      email: 'julia@demo.com',
      name: 'Julia Costa',
      artistName: 'Julia Pop',
      role: UserRole.STUDENT, // ✅ Não ARTIST
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julia',
      schoolId: 'school-1',
      courseId: 'course-1',
      createdAt: new Date('2024-01-02'),
    },
    {
      id: 'user-6',
      email: 'bruno@demo.com',
      name: 'Bruno Almeida',
      artistName: 'Bruno MPB',
      role: UserRole.STUDENT, // ✅ Não ARTIST
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bruno',
      schoolId: 'school-1',
      courseId: 'course-1',
      createdAt: new Date('2024-01-10'),
    },
    {
      id: 'user-7',
      email: 'amanda@demo.com',
      name: 'Amanda Rodrigues',
      artistName: 'Manda Vox',
      role: UserRole.STUDENT, // ✅ Não ARTIST
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda',
      schoolId: 'school-1',
      courseId: 'course-1',
      createdAt: new Date('2023-10-20'),
    },
    {
      id: 'user-8',
      email: 'rafael@demo.com',
      name: 'Rafael Lima',
      artistName: 'Rafa Soul',
      role: UserRole.STUDENT, // ✅ Não ARTIST
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rafael',
      schoolId: 'school-1',
      courseId: 'course-1',
      createdAt: new Date('2024-01-05'),
    },
    {
      id: 'user-9',
      email: 'ana@demo.com',
      name: 'Ana Paula',
      artistName: 'Ana Groove',
      role: UserRole.STUDENT, // ✅ Não ARTIST
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
      schoolId: 'school-1',
      courseId: 'course-2',
      createdAt: new Date('2024-01-08'),
    },
    {
      id: 'user-10',
      email: 'gabriel@demo.com',
      name: 'Gabriel Souza',
      artistName: 'Gabe Stage',
      role: UserRole.STUDENT, // ✅ Não ARTIST
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel',
      schoolId: 'school-1',
      courseId: 'course-2',
      createdAt: new Date('2023-11-15'),
    },
    {
      id: 'user-11',
      email: 'mariana@demo.com',
      name: 'Mariana Ferreira',
      artistName: 'Mari Drama',
      role: UserRole.STUDENT, // ✅ Não ARTIST
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana',
      schoolId: 'school-1',
      courseId: 'course-2',
      createdAt: new Date('2023-09-01'),
    },
    {
      id: 'user-12',
      email: 'thiago@demo.com',
      name: 'Thiago Martins',
      artistName: 'Thi Performance',
      role: UserRole.STUDENT, // ✅ Não ARTIST
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thiago',
      schoolId: 'school-1',
      courseId: 'course-2',
      createdAt: new Date('2024-01-12'),
    },
    {
      id: 'user-13',
      email: 'beatriz@demo.com',
      name: 'Beatriz Campos',
      artistName: 'Bia Blues',
      role: UserRole.STUDENT, // ✅ Não ARTIST
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Beatriz',
      schoolId: 'school-1',
      courseId: 'course-1',
      createdAt: new Date('2024-01-20'),
    },
    {
      id: 'user-14',
      email: 'felipe@demo.com',
      name: 'Felipe Nunes',
      artistName: 'Phil Harmony',
      role: UserRole.STUDENT, // ✅ Não ARTIST
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felipe',
      schoolId: 'school-1',
      courseId: 'course-1',
      createdAt: new Date('2024-01-03'),
    },
    {
      id: 'user-15',
      email: 'larissa@demo.com',
      name: 'Larissa Barros',
      artistName: 'Lari Indie',
      role: UserRole.STUDENT, // ✅ Não ARTIST
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Larissa',
      schoolId: 'school-1',
      courseId: 'course-1',
      createdAt: new Date('2023-12-15'),
    },
    {
      id: 'teacher-1',
      email: 'joao@escola.com',
      name: 'João Santos',
      artistName: 'Prof. João',
      role: 'TEACHER' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JoaoTeacher',
      schoolId: 'school-1',
      courseId: 'course-1',
      createdAt: new Date('2023-08-01'),
    },
    {
      id: 'teacher-2',
      email: 'maria@escola.com',
      name: 'Maria Helena',
      artistName: 'Profa. Maria',
      role: 'TEACHER' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MariaTeacher',
      schoolId: 'school-1',
      courseId: 'course-1',
      createdAt: new Date('2023-08-01'),
    },
    {
      id: 'teacher-3',
      email: 'carlos@escola.com',
      name: 'Carlos Mendes',
      artistName: 'Prof. Carlos',
      role: 'TEACHER' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosTeacher',
      schoolId: 'school-1',
      courseId: 'course-2',
      createdAt: new Date('2023-08-01'),
    },
  ] as User[],

  // ===== STATS DE CARREIRA (progressão variada) =====
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
    'user-2': {
      level: ArtistLevel.RISING_STAR,
      fans: 12500,
      currentStreak: 25,
      longestStreak: 45,
      totalDemos: 28,
      approvedDemos: 24,
      achievements: 15,
      toursCompleted: 4,
      lastActivityDate: new Date(),
    },
    'user-3': {
      level: ArtistLevel.HEADLINER,
      fans: 18200,
      currentStreak: 42,
      longestStreak: 60,
      totalDemos: 45,
      approvedDemos: 40,
      achievements: 22,
      toursCompleted: 7,
      lastActivityDate: new Date(),
    },
    'user-4': {
      level: ArtistLevel.INDIE,
      fans: 9200,
      currentStreak: 18,
      longestStreak: 30,
      totalDemos: 20,
      approvedDemos: 17,
      achievements: 10,
      toursCompleted: 3,
      lastActivityDate: new Date(),
    },
    'user-5': {
      level: ArtistLevel.UNDERGROUND,
      fans: 6800,
      currentStreak: 10,
      longestStreak: 15,
      totalDemos: 12,
      approvedDemos: 9,
      achievements: 6,
      toursCompleted: 1,
      lastActivityDate: new Date(),
    },
    'user-6': {
      level: ArtistLevel.GARAGE,
      fans: 3200,
      currentStreak: 5,
      longestStreak: 8,
      totalDemos: 6,
      approvedDemos: 4,
      achievements: 3,
      toursCompleted: 0,
      lastActivityDate: new Date(),
    },
    'user-7': {
      level: ArtistLevel.RISING_STAR,
      fans: 13800,
      currentStreak: 28,
      longestStreak: 35,
      totalDemos: 32,
      approvedDemos: 28,
      achievements: 16,
      toursCompleted: 5,
      lastActivityDate: new Date(),
    },
    'user-8': {
      level: ArtistLevel.INDIE,
      fans: 7500,
      currentStreak: 14,
      longestStreak: 20,
      totalDemos: 16,
      approvedDemos: 13,
      achievements: 7,
      toursCompleted: 2,
      lastActivityDate: new Date(),
    },
    'user-9': {
      level: ArtistLevel.UNDERGROUND,
      fans: 5200,
      currentStreak: 8,
      longestStreak: 12,
      totalDemos: 10,
      approvedDemos: 7,
      achievements: 5,
      toursCompleted: 1,
      lastActivityDate: new Date(),
    },
    'user-10': {
      level: ArtistLevel.HEADLINER,
      fans: 16500,
      currentStreak: 35,
      longestStreak: 50,
      totalDemos: 38,
      approvedDemos: 34,
      achievements: 19,
      toursCompleted: 6,
      lastActivityDate: new Date(),
    },
    'user-11': {
      level: ArtistLevel.MAIN_STAGE,
      fans: 25000,
      currentStreak: 65,
      longestStreak: 90,
      totalDemos: 60,
      approvedDemos: 55,
      achievements: 28,
      toursCompleted: 10,
      lastActivityDate: new Date(),
    },
    'user-12': {
      level: ArtistLevel.GARAGE,
      fans: 2800,
      currentStreak: 4,
      longestStreak: 6,
      totalDemos: 5,
      approvedDemos: 3,
      achievements: 2,
      toursCompleted: 0,
      lastActivityDate: new Date(),
    },
    'user-13': {
      level: ArtistLevel.SHOWER,
      fans: 800,
      currentStreak: 2,
      longestStreak: 3,
      totalDemos: 2,
      approvedDemos: 1,
      achievements: 1,
      toursCompleted: 0,
      lastActivityDate: new Date(),
    },
    'user-14': {
      level: ArtistLevel.UNDERGROUND,
      fans: 6200,
      currentStreak: 11,
      longestStreak: 16,
      totalDemos: 14,
      approvedDemos: 11,
      achievements: 6,
      toursCompleted: 1,
      lastActivityDate: new Date(),
    },
    'user-15': {
      level: ArtistLevel.INDIE,
      fans: 10200,
      currentStreak: 20,
      longestStreak: 25,
      totalDemos: 22,
      approvedDemos: 19,
      achievements: 11,
      toursCompleted: 3,
      lastActivityDate: new Date(),
    },
    'default': {
      level: ArtistLevel.SHOWER,
      fans: 0,
      currentStreak: 0,
      longestStreak: 0,
      totalDemos: 0,
      approvedDemos: 0,
      achievements: 0,
      toursCompleted: 0,
      lastActivityDate: new Date(),
    },
  } as Record<string, CareerStats>,

  // ===== ROTINAS DIÁRIAS (Música e Teatro) =====
  dailyRoutines: [
    {
      id: 'routine-today-music',
      date: new Date().toISOString().split('T')[0],
      type: 'MUSIC' as const,
      title: 'Passagem de Som - Bossa Nova',
      description: 'Aquecimento vocal e técnicas de respiração para interpretação da Bossa Nova',
      exercises: [
        {
          id: 'ex-1',
          title: 'Respiração Diafragmática',
          description: 'Exercício de controle respiratório essencial para sustentação de notas',
          duration: 5,
        },
        {
          id: 'ex-2',
          title: 'Escalas e Arpejos',
          description: 'Aquecimento com escalas maiores e menores',
          duration: 8,
        },
        {
          id: 'ex-3',
          title: 'Vocalizes Bossa Nova',
          description: 'Vocalizes específicos para o estilo leve e suave da Bossa Nova',
          duration: 10,
        },
      ],
      completed: false,
    },
    {
      id: 'routine-today-theater',
      date: new Date().toISOString().split('T')[0],
      type: 'THEATER' as const,
      title: 'Aquecimento Teatral - Expressão Corporal',
      description: 'Preparação física e mental para performances teatrais',
      exercises: [
        {
          id: 'tex-1',
          title: 'Alongamento Consciente',
          description: 'Alongamento completo com foco na consciência corporal',
          duration: 8,
        },
        {
          id: 'tex-2',
          title: 'Articulação e Dicção',
          description: 'Exercícios para clareza vocal e precisão na fala',
          duration: 7,
        },
        {
          id: 'tex-3',
          title: 'Improvisação Dirigida',
          description: 'Exercícios de improvisação para desenvolver criatividade',
          duration: 12,
        },
      ],
      completed: false,
    },
    {
      id: 'routine-yesterday',
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      type: 'MUSIC' as const,
      title: 'Passagem de Som - Técnica Vocal',
      description: 'Fortalecimento vocal e extensão de alcance',
      exercises: [
        {
          id: 'ey-1',
          title: 'Aquecimento Básico',
          description: 'Preparação das cordas vocais',
          duration: 5,
        },
        {
          id: 'ey-2',
          title: 'Exercícios de Extensão',
          description: 'Trabalho de alcance vocal',
          duration: 10,
        },
      ],
      completed: true,
      completedAt: new Date(Date.now() - 82800000),
    },
  ] as DailyRoutine[],

  // ===== PROJETOS (Álbuns e Peças) - ✅ PERSONA: MARIANA COSTA - MPB/VIOLÃO =====
  projects: [
    {
      id: 'proj-mpb-1',
      courseId: 'course-1',
      seasonId: 'season-2024-2',
      templateId: 'template-proj-mpb',
      projectTemplateVersion: 1,
      title: 'MPB: Fundamentos e Expressão',
      subtitle: 'Violão Brasileiro - Do Intermediário ao Avançado',
      type: ProjectType.MUSIC_ALBUM,
      description: 'Explore os clássicos da MPB no violão, dominando levadas, harmonias e a expressividade única da música brasileira. Das bossas de Tom Jobim aos sambas de Chico Buarque.',
      coverUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800',
      status: ProjectStatus.IN_PROGRESS,
      totalTrackScenes: 12,
      releasedTrackScenes: 12,
      order: 1,
      createdAt: new Date('2023-09-15'),
      updatedAt: new Date('2024-01-25'),
    },
    {
      id: 'proj-1',
      templateId: 'template-proj-1',
      projectTemplateVersion: 1,
      classId: 'class-1',
      seasonId: 'season-1',
      name: 'Vozes do Brasil',
      description: 'Uma jornada pela riqueza musical brasileira, das raízes do samba à modernidade da MPB',
      coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
      status: ProjectStatus.ACTIVE,
      isVisible: true,
      releasedAt: new Date('2024-01-15'),
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 'proj-2',
      templateId: 'template-proj-2',
      projectTemplateVersion: 1,
      classId: 'class-1',
      seasonId: 'season-1',
      name: 'Clássicos do Rock',
      description: 'Explorando as raízes do rock brasileiro e internacional',
      coverImage: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800',
      status: ProjectStatus.UPCOMING,
      isVisible: false,
      releasedAt: new Date('2024-07-01'),
      createdAt: new Date('2024-07-01'),
      updatedAt: new Date('2024-07-01'),
    },
    {
      id: 'proj-3',
      templateId: 'template-proj-3',
      projectTemplateVersion: 1,
      classId: 'class-1',
      seasonId: 'season-1',
      name: 'Jazz & Blues Session',
      description: 'Mergulho profundo nos clássicos do jazz e blues',
      coverImage: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800',
      status: ProjectStatus.COMPLETED,
      isVisible: true,
      releasedAt: new Date('2023-08-01'),
      createdAt: new Date('2023-08-01'),
      updatedAt: new Date('2023-12-31'),
    },
  ] as Project[],

  // ===== TRACK SCENES (Músicas/Cenas) - ✅ ATUALIZADO =====
  trackScenes: [
    // Vozes do Brasil
    {
      id: 'track-1',
      projectId: 'proj-1',
      templateId: 'template-track-1',
      trackSceneTemplateVersion: 1,
      title: 'Garota de Ipanema',
      artist: 'Tom Jobim e Vinícius de Moraes',
      description: 'Obra-prima da Bossa Nova que conquistou o mundo',
      technicalInstruction: 'Atenção à leveza vocal, respiração controlada e interpretação natural. Evitar vibrato excessivo.', // ✅ Não technicalNotes
      lyrics: 'Olha que coisa mais linda\nMais cheia de graça\nÉ ela a menina\nQue vem e que passa...',
      order: 1,
      status: 'PUBLISHED' as const,
      isVisible: true,
      demoRequired: true,
      pressQuizRequired: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 'track-2',
      projectId: 'proj-1',
      templateId: 'template-track-2',
      trackSceneTemplateVersion: 1,
      title: 'Chega de Saudade',
      artist: 'Tom Jobim e Vinícius de Moraes',
      description: 'Marco inicial da Bossa Nova',
      technicalInstruction: 'Trabalhar a dinâmica entre forte e piano, manter a suavidade característica.', // ✅
      order: 2,
      status: 'PUBLISHED' as const,
      isVisible: true,
      demoRequired: true,
      pressQuizRequired: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    
    // Clássicos do Rock
    {
      id: 'track-9',
      projectId: 'proj-2',
      templateId: 'template-track-9',
      trackSceneTemplateVersion: 1,
      title: 'Faroeste Caboclo',
      artist: 'Legião Urbana',
      description: 'Épico do rock brasileiro, narrativa poética',
      technicalInstruction: 'Resistência vocal essencial. Manter energia ao longo dos 9 minutos.', // ✅
      order: 1,
      status: 'PUBLISHED' as const,
      isVisible: true,
      demoRequired: true,
      pressQuizRequired: true,
      createdAt: new Date('2024-07-01'),
      updatedAt: new Date('2024-07-01'),
    },
    {
      id: 'track-10',
      projectId: 'proj-2',
      templateId: 'template-track-10',
      trackSceneTemplateVersion: 1,
      title: 'Eduardo e Mônica',
      artist: 'Legião Urbana',
      description: 'História de amor que marcou uma geração',
      technicalInstruction: 'Narrativa clara, variação de dinâmicas. Contar a história com emoção.', // ✅
      order: 2,
      status: 'PUBLISHED' as const,
      isVisible: true,
      demoRequired: true,
      pressQuizRequired: true,
      createdAt: new Date('2024-07-01'),
      updatedAt: new Date('2024-07-01'),
    },

    // Jazz & Blues (completado)
    {
      id: 'track-11',
      projectId: 'proj-3',
      templateId: 'template-track-11',
      trackSceneTemplateVersion: 1,
      title: 'Summertime',
      artist: 'George Gershwin',
      description: 'Standard do jazz, lullaby blues',
      technicalInstruction: 'Swing natural, ornamentação jazzística, feeling blues.', // ✅
      order: 1,
      status: 'PUBLISHED' as const,
      isVisible: true,
      demoRequired: true,
      pressQuizRequired: true,
      createdAt: new Date('2023-08-01'),
      updatedAt: new Date('2023-08-01'),
    },
    {
      id: 'track-12',
      projectId: 'proj-3',
      templateId: 'template-track-12',
      trackSceneTemplateVersion: 1,
      title: 'Feeling Good',
      artist: 'Nina Simone',
      description: 'Celebração da liberdade com força e alma',
      technicalInstruction: 'Potência controlada, alma e personalidade. Aproprie-se da música.', // ✅
      order: 2,
      status: 'PUBLISHED' as const,
      isVisible: true,
      demoRequired: true,
      pressQuizRequired: true,
      createdAt: new Date('2023-08-01'),
      updatedAt: new Date('2023-08-01'),
    },
  ] as TrackScene[],
  
  // ✅ COMPATIBILIDADE: tracks aponta para trackScenes
  tracks: [] as any[], // Será preenchido abaixo

  // ===== SUBMISSIONS (Demos) - ✅ ATUALIZADO =====
  submissions: [
    // User-1 (Sofia)
    {
      id: 'sub-1',
      studentId: 'user-1',
      trackSceneId: 'track-1', // ✅ Não trackId, não songId
      attemptNumber: 1,
      mediaUrl: null, // ✅ Não audioUrl
      notes: 'Primeira versão focando na interpretação suave',
      status: SubmissionStatus.APPROVED,
      pressUnlocked: true,
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-22'),
      reviewedAt: new Date('2024-01-22'),
    },
    {
      id: 'sub-2',
      studentId: 'user-1',
      trackSceneId: 'track-2', // ✅
      attemptNumber: 1,
      mediaUrl: null, // ✅
      notes: 'Trabalhei bastante a respiração nesta versão',
      status: SubmissionStatus.PENDING_REVIEW,
      pressUnlocked: false,
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-25'),
    },
    
    // User-2 (Pedro)
    {
      id: 'sub-4',
      studentId: 'user-2',
      trackSceneId: 'track-1', // ✅
      attemptNumber: 1,
      mediaUrl: null, // ✅
      notes: 'Bossa Nova sempre foi minha paixão',
      status: SubmissionStatus.APPROVED,
      pressUnlocked: true,
      createdAt: new Date('2024-01-21'),
      updatedAt: new Date('2024-01-23'),
      reviewedAt: new Date('2024-01-23'),
    },

    // User-3 (Carla) - artista avançada
    {
      id: 'sub-6',
      studentId: 'user-3',
      trackSceneId: 'track-11', // ✅
      attemptNumber: 1,
      mediaUrl: null, // ✅
      notes: 'Jazz é minha especialidade, espero que gostem!',
      status: SubmissionStatus.APPROVED,
      pressUnlocked: true,
      createdAt: new Date('2023-11-15'),
      updatedAt: new Date('2023-11-16'),
      reviewedAt: new Date('2023-11-16'),
    },
    {
      id: 'sub-7',
      studentId: 'user-3',
      trackSceneId: 'track-12', // ✅
      attemptNumber: 1,
      mediaUrl: null, // ✅
      notes: 'Essa música pede alma, dei tudo que tinha',
      status: SubmissionStatus.APPROVED,
      pressUnlocked: true,
      createdAt: new Date('2023-11-20'),
      updatedAt: new Date('2023-11-21'),
      reviewedAt: new Date('2023-11-21'),
    },

    // User-13 (Beatriz) - iniciante
    {
      id: 'sub-8',
      studentId: 'user-13',
      trackSceneId: 'track-1', // ✅
      attemptNumber: 1,
      mediaUrl: null, // ✅
      notes: 'Minha primeira demo! Estou nervosa mas animada',
      status: SubmissionStatus.PENDING_REVIEW,
      pressUnlocked: false,
      createdAt: new Date('2024-01-26'),
      updatedAt: new Date('2024-01-26'),
    },
  ] as Submission[],
  
  // ✅ COMPATIBILIDADE: demos aponta para submissions
  demos: [] as any[], // Será preenchido abaixo

  // ===== REVIEWS (Avaliações) - ✅ ATUALIZADO =====
  reviews: [
    {
      id: 'review-1',
      submissionId: 'sub-1', // ✅ Não demoId
      teacherId: 'teacher-1',
      teacherName: 'Prof. João Santos',
      type: ReviewType.POSITIVE,
      rating: 4.5,
      feedback: 'Excelente interpretação! A suavidade está perfeita e a respiração bem controlada. Você capturou a essência da Bossa Nova.',
      technicalNotes: 'Pequeno ajuste na entrada do segundo verso. No mais, está aprovado! Continue assim.', // ✅ Correto aqui
      approved: true,
      createdAt: new Date('2024-01-22'),
      updatedAt: new Date('2024-01-22'),
    },
    {
      id: 'review-2',
      submissionId: 'sub-3', // ✅
      teacherId: 'teacher-2',
      teacherName: 'Profa. Maria Helena',
      type: ReviewType.CONSTRUCTIVE,
      rating: 3.5,
      feedback: 'Boa tentativa, mas precisa trabalhar mais a dicção. Algumas palavras ficaram meio perdidas no ritmo.',
      technicalNotes: 'Pratique os trava-línguas específicos para essa música. Reduza um pouco o andamento no início até pegar confiança.', // ✅
      approved: false,
      createdAt: new Date('2024-01-19'),
      updatedAt: new Date('2024-01-19'),
    },
    {
      id: 'review-3',
      submissionId: 'sub-4', // ✅
      teacherId: 'teacher-1',
      teacherName: 'Prof. João Santos',
      type: ReviewType.POSITIVE,
      rating: 5.0,
      feedback: 'Perfeito! Sua paixão pela Bossa Nova transparece na interpretação. Afinação impecável e feeling autêntico.',
      technicalNotes: 'Nada a acrescentar. Demo aprovada com louvor! Você está pronto para a apresentação.', // ✅
      approved: true,
      createdAt: new Date('2024-01-23'),
      updatedAt: new Date('2024-01-23'),
    },
    {
      id: 'review-4',
      submissionId: 'sub-5', // ✅
      teacherId: 'teacher-2',
      teacherName: 'Profa. Maria Helena',
      type: ReviewType.POSITIVE,
      rating: 4.8,
      feedback: 'Que energia! O swing está perfeito e você conseguiu manter a clareza mesmo no ritmo acelerado.',
      technicalNotes: 'Excelente controle de dinâmica. Aprovado!', // ✅
      approved: true,
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-25'),
    },
    {
      id: 'review-5',
      submissionId: 'sub-6', // ✅
      teacherId: 'teacher-1',
      teacherName: 'Prof. João Santos',
      type: ReviewType.POSITIVE,
      rating: 4.9,
      feedback: 'Carla, você realmente domina o jazz! A ornamentação está sofisticada e o feeling é autêntico.',
      technicalNotes: 'Aprovado! Você é uma referência para os colegas.', // ✅
      approved: true,
      createdAt: new Date('2023-11-16'),
      updatedAt: new Date('2023-11-16'),
    },
    {
      id: 'review-6',
      submissionId: 'sub-7', // ✅
      teacherId: 'teacher-2',
      teacherName: 'Profa. Maria Helena',
      type: ReviewType.POSITIVE,
      rating: 5.0,
      feedback: 'Simplesmente magnífico! Você não apenas cantou, você VIVEU essa música. Emocionante!',
      technicalNotes: 'Performance impecável. Parabéns!', // ✅
      approved: true,
      createdAt: new Date('2023-11-21'),
      updatedAt: new Date('2023-11-21'),
    },
  ] as Review[],
  
  // ✅ COMPATIBILIDADE: evaluations aponta para reviews
  evaluations: [] as any[], // Será preenchido abaixo

  // ===== PRESS QUIZZES - ✅ ATUALIZADO =====
  pressQuizzes: [
    {
      id: 'quiz-1',
      trackSceneId: 'track-1', // ✅ Não trackId
      seasonId: 'season-1',
      version: 1,
      questionsJson: {
        questions: [
        {
          question: 'Qual é o contexto histórico da composição "Garota de Ipanema"?',
          options: [
            'Foi composta durante a ditadura militar',
            'Nasceu do movimento da Bossa Nova no Rio de Janeiro',
            'Foi escrita para um filme hollywoodiano',
            'É uma adaptação de uma música americana',
          ],
          correctAnswer: 1,
        },
        {
          question: 'Quem são os compositores dessa obra-prima?',
          options: [
            'Chico Buarque e Caetano Veloso',
            'Tom Jobim e Vinícius de Moraes',
            'João Gilberto e Stan Getz',
            'Ary Barroso e Noel Rosa',
          ],
          correctAnswer: 1,
        },
        {
          question: 'Qual característica musical é fundamental na Bossa Nova?',
          options: [
            'Ritmo acelerado e percussivo',
            'Harmonia complexa e batida sincopada',
            'Uso intenso de instrumentos de sopro',
            'Vocal potente e dramático',
          ],
          correctAnswer: 1,
        },
      ],
      },
      passingScore: 70,
      maxAttempts: 3,
      status: 'PUBLISHED' as const,
      isActive: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 'quiz-2',
      trackSceneId: 'track-2', // ✅
      seasonId: 'season-1',
      version: 1,
      questionsJson: {
        questions: [
        {
          question: 'Por que "Chega de Saudade" é considerada marco da Bossa Nova?',
          options: [
            'Foi a primeira música com violão elétrico',
            'Inaugurou o estilo com João Gilberto em 1958',
            'Foi o primeiro hit internacional do Brasil',
            'Criou o estilo samba-canção',
          ],
          correctAnswer: 1,
        },
        {
          question: 'O que caracteriza a batida da Bossa Nova no violão?',
          options: [
            'Batida agressiva e forte',
            'Dedilhado clássico espanhol',
            'Síncope suave com polegar e dedos',
            'Uso exclusivo de palheta',
          ],
          correctAnswer: 2,
        },
      ],
      },
      passingScore: 70,
      maxAttempts: 3,
      status: 'PUBLISHED' as const,
      isActive: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
  ] as PressQuiz[],

  // ===== CONQUISTAS (sistema completo Bronze→Platinum) =====
  achievements: [
    // STREAK - Sequências
    {
      id: 'ach-streak-1',
      title: 'Primeiros Passos',
      description: 'Complete 3 dias seguidos de rotina',
      icon: '🔥',
      category: AchievementCategory.STREAK,
      tier: AchievementTier.BRONZE,
      requirement: 3,
      fansReward: 150,
      unlocked: true,
      unlockedAt: new Date('2024-01-17'),
    },
    {
      id: 'ach-streak-2',
      title: 'Semana Completa',
      description: 'Mantenha uma sequência de 7 dias seguidos',
      icon: '🔥',
      category: AchievementCategory.STREAK,
      tier: AchievementTier.SILVER,
      requirement: 7,
      fansReward: 500,
      unlocked: true,
      unlockedAt: new Date('2024-01-22'),
    },
    {
      id: 'ach-streak-3',
      title: 'Dedicação Constante',
      description: 'Mantenha uma sequência de 15 dias seguidos',
      icon: '🔥',
      category: AchievementCategory.STREAK,
      tier: AchievementTier.GOLD,
      requirement: 15,
      fansReward: 1000,
      unlocked: false,
    },
    {
      id: 'ach-streak-4',
      title: 'Mês Perfeito',
      description: 'Mantenha uma sequência de 30 dias seguidos',
      icon: '⭐',
      category: AchievementCategory.STREAK,
      tier: AchievementTier.PLATINUM,
      requirement: 30,
      fansReward: 2500,
      unlocked: false,
    },
    {
      id: 'ach-streak-5',
      title: 'Disciplina Inabalável',
      description: 'Mantenha uma sequência de 60 dias seguidos',
      icon: '💎',
      category: AchievementCategory.STREAK,
      tier: AchievementTier.PLATINUM,
      requirement: 60,
      fansReward: 5000,
      unlocked: false,
    },

    // DEMOS - Gravações
    {
      id: 'ach-demo-1',
      title: 'Primeira Demo',
      description: 'Envie sua primeira demo no estúdio',
      icon: '🎤',
      category: AchievementCategory.DEMOS,
      tier: AchievementTier.BRONZE,
      requirement: 1,
      fansReward: 100,
      unlocked: true,
      unlockedAt: new Date('2024-01-20'),
    },
    {
      id: 'ach-demo-2',
      title: 'Gravando Profissional',
      description: 'Tenha 5 demos aprovadas',
      icon: '🎵',
      category: AchievementCategory.DEMOS,
      tier: AchievementTier.SILVER,
      requirement: 5,
      fansReward: 750,
      unlocked: true,
      unlockedAt: new Date('2024-01-23'),
    },
    {
      id: 'ach-demo-3',
      title: 'Artista Estabelecido',
      description: 'Tenha 10 demos aprovadas',
      icon: '🎸',
      category: AchievementCategory.DEMOS,
      tier: AchievementTier.GOLD,
      requirement: 10,
      fansReward: 1500,
      unlocked: true,
      unlockedAt: new Date('2024-01-25'),
    },
    {
      id: 'ach-demo-4',
      title: 'Veterano do Estúdio',
      description: 'Tenha 25 demos aprovadas',
      icon: '🏅',
      category: AchievementCategory.DEMOS,
      tier: AchievementTier.PLATINUM,
      requirement: 25,
      fansReward: 3000,
      unlocked: false,
    },
    {
      id: 'ach-demo-5',
      title: 'Lenda do Estúdio',
      description: 'Tenha 50 demos aprovadas',
      icon: '👑',
      category: AchievementCategory.DEMOS,
      tier: AchievementTier.PLATINUM,
      requirement: 50,
      fansReward: 7500,
      unlocked: false,
    },

    // SOCIAL - Ranking e Comunidade
    {
      id: 'ach-social-1',
      title: 'Primeiros Fãs',
      description: 'Alcance 1.000 fãs',
      icon: '👥',
      category: AchievementCategory.SOCIAL,
      tier: AchievementTier.BRONZE,
      requirement: 1000,
      fansReward: 200,
      unlocked: true,
      unlockedAt: new Date('2024-01-21'),
    },
    {
      id: 'ach-social-2',
      title: 'Crescendo na Cena',
      description: 'Alcance 5.000 fãs',
      icon: '🌟',
      category: AchievementCategory.SOCIAL,
      tier: AchievementTier.SILVER,
      requirement: 5000,
      fansReward: 500,
      unlocked: true,
      unlockedAt: new Date('2024-01-24'),
    },
    {
      id: 'ach-social-3',
      title: 'Top 10 do Ranking',
      description: 'Alcance o top 10 do ranking geral',
      icon: '🏆',
      category: AchievementCategory.SOCIAL,
      tier: AchievementTier.GOLD,
      requirement: 10,
      fansReward: 2000,
      unlocked: false,
    },
    {
      id: 'ach-social-4',
      title: 'Top 5 Elite',
      description: 'Alcance o top 5 do ranking geral',
      icon: '💫',
      category: AchievementCategory.SOCIAL,
      tier: AchievementTier.PLATINUM,
      requirement: 5,
      fansReward: 5000,
      unlocked: false,
    },
    {
      id: 'ach-social-5',
      title: 'Número 1',
      description: 'Alcance o 1º lugar no ranking',
      icon: '👑',
      category: AchievementCategory.SOCIAL,
      tier: AchievementTier.PLATINUM,
      requirement: 1,
      fansReward: 10000,
      unlocked: false,
    },

    // SPECIAL - Conquistas especiais
    {
      id: 'ach-special-1',
      title: 'Primeira Turnê',
      description: 'Complete sua primeira turnê',
      icon: '🚐',
      category: AchievementCategory.SPECIAL,
      tier: AchievementTier.GOLD,
      requirement: 1,
      fansReward: 1000,
      unlocked: true,
      unlockedAt: new Date('2024-01-22'),
    },
    {
      id: 'ach-special-2',
      title: 'Artista Viajante',
      description: 'Complete 3 turnês',
      icon: '✈️',
      category: AchievementCategory.SPECIAL,
      tier: AchievementTier.PLATINUM,
      requirement: 3,
      fansReward: 3000,
      unlocked: false,
    },
    {
      id: 'ach-special-3',
      title: 'Mestre da Imprensa',
      description: 'Passe em 10 coletivas de imprensa',
      icon: '📰',
      category: AchievementCategory.SPECIAL,
      tier: AchievementTier.GOLD,
      requirement: 10,
      fansReward: 1500,
      unlocked: false,
    },
    {
      id: 'ach-special-4',
      title: 'Nota Perfeita',
      description: 'Receba avaliação 5.0 em uma demo',
      icon: '⭐',
      category: AchievementCategory.SPECIAL,
      tier: AchievementTier.GOLD,
      requirement: 1,
      fansReward: 1000,
      unlocked: false,
    },
    {
      id: 'ach-special-5',
      title: 'Álbum Completo',
      description: 'Complete todas as faixas de um álbum',
      icon: '💿',
      category: AchievementCategory.SPECIAL,
      tier: AchievementTier.PLATINUM,
      requirement: 1,
      fansReward: 5000,
      unlocked: false,
    },
  ] as Achievement[],

  // ===== TURNÊS - ✅ ATUALIZADO =====
  tours: [
    {
      id: 'tour-1',
      studentId: 'user-1',
      seasonId: 'season-1',
      name: 'Turnê Bossa Nova',
      description: 'Celebre sua consistência com shows em cidades icônicas da Bossa Nova',
      requiredStreak: 7,
      status: TourStatus.ACTIVE,
      completed: false,
      startedAt: new Date('2024-01-01'),
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-27'),
    },
    {
      id: 'tour-2',
      studentId: 'user-1',
      seasonId: 'season-1',
      name: 'Circuito MPB',
      description: 'Turnê pelas capitais brasileiras celebrando a MPB',
      requiredStreak: 15,
      status: TourStatus.ACTIVE,
      completed: false,
      startedAt: new Date('2024-03-01'),
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date('2024-03-01'),
    },
    {
      id: 'tour-3',
      studentId: 'user-1',
      seasonId: 'season-1',
      name: 'Festival Indie',
      description: 'Participe dos principais festivais independentes do país',
      requiredStreak: 21,
      status: TourStatus.ACTIVE,
      completed: false,
      startedAt: new Date('2024-04-01'),
      createdAt: new Date('2024-04-01'),
      updatedAt: new Date('2024-04-01'),
    },
    {
      id: 'tour-4',
      studentId: 'user-1',
      seasonId: 'season-1',
      name: 'Turnê Internacional',
      description: 'Leve a música brasileira para o mundo',
      requiredStreak: 30,
      status: TourStatus.ACTIVE,
      completed: false,
      startedAt: new Date('2024-05-01'),
      createdAt: new Date('2024-05-01'),
      updatedAt: new Date('2024-05-01'),
    },
  ] as Tour[],

  // ===== NOTIFICAÇÕES (histórico rico) =====
  notifications: [
    {
      id: 'notif-1',
      type: 'REVIEW_RECEIVED', // ✅ Não EVALUATION
      title: 'Demo Aprovada! 🎉',
      message: 'Sua demo de "Garota de Ipanema" foi aprovada pelo Prof. João',
      icon: '✅',
      color: 'from-green-500 to-emerald-500',
      read: false,
      actionUrl: 'estudio',
      createdAt: new Date(Date.now() - 3600000), // 1 hora atrás
    },
    {
      id: 'notif-2',
      type: 'ACHIEVEMENT' as const,
      title: 'Conquista Desbloqueada!',
      message: 'Você desbloqueou "Semana Completa" +500 fãs',
      icon: '🏆',
      color: 'from-yellow-500 to-orange-500',
      read: false,
      actionUrl: 'carreira',
      createdAt: new Date(Date.now() - 7200000), // 2 horas atrás
    },
    {
      id: 'notif-3',
      type: 'PRESS_QUIZ' as const,
      title: 'Coletiva de Imprensa Disponível',
      message: 'A imprensa quer entrevistá-lo sobre "Garota de Ipanema"',
      icon: '📰',
      color: 'from-blue-500 to-cyan-500',
      read: true,
      actionUrl: 'estudio',
      createdAt: new Date(Date.now() - 86400000), // 1 dia atrás
    },
    {
      id: 'notif-4',
      type: 'TOUR' as const,
      title: 'Nova Turnê Disponível! 🚐',
      message: 'Você desbloqueou a "Turnê Bossa Nova" - 3 shows esperando!',
      icon: '🎪',
      color: 'from-purple-500 to-pink-500',
      read: true,
      actionUrl: 'carreira',
      createdAt: new Date(Date.now() - 172800000), // 2 dias atrás
    },
    {
      id: 'notif-5',
      type: 'SYSTEM' as const,
      title: 'Novo Projeto Liberado',
      message: 'O álbum "Vozes do Brasil" está disponível para gravação',
      icon: '🎵',
      color: 'from-indigo-500 to-blue-500',
      read: true,
      actionUrl: 'projetos',
      createdAt: new Date(Date.now() - 259200000), // 3 dias atrás
    },
    {
      id: 'notif-6',
      type: 'ACHIEVEMENT' as const,
      title: 'Primeiros Fãs!',
      message: 'Você alcançou 1.000 fãs! Continue crescendo!',
      icon: '👥',
      color: 'from-green-500 to-teal-500',
      read: true,
      actionUrl: 'carreira',
      createdAt: new Date(Date.now() - 345600000), // 4 dias atrás
    },
    {
      id: 'notif-8',
      type: 'ACHIEVEMENT' as const,
      title: '10 Demos Aprovadas! 🎸',
      message: 'Parabéns! Você é um Artista Estabelecido. +1500 fãs',
      icon: '🎸',
      color: 'from-yellow-500 to-amber-500',
      read: true,
      actionUrl: 'carreira',
      createdAt: new Date(Date.now() - 518400000), // 6 dias atrás
    },
    {
      id: 'notif-9',
      type: 'SYSTEM' as const,
      title: 'Bem-vindo ao Clave de Sales!',
      message: 'Sua jornada artística começa agora. Complete sua primeira rotina!',
      icon: '🎭',
      color: 'from-pink-500 to-rose-500',
      read: true,
      actionUrl: 'rotina',
      createdAt: new Date(Date.now() - 1209600000), // 14 dias atrás
    },
  ] as Notification[],

  // ===== TRANSAÇÕES DE FÃS (histórico detalhado) =====
  fanTransactions: [
    {
      id: 'ft-1',
      userId: 'user-1',
      eventType: 'ROUTINE_COMPLETED',
      fans: 50,
      description: 'Rotina Diária Completa - Passagem de Som',
      createdAt: new Date(Date.now() - 86400000),
    },
    {
      id: 'ft-2',
      userId: 'user-1',
      eventType: 'DEMO_SUBMITTED',
      fans: 300,
      description: 'Demo Enviada - Garota de Ipanema',
      createdAt: new Date('2024-01-20'),
    },
    {
      id: 'ft-3',
      userId: 'user-1',
      eventType: 'DEMO_APPROVED',
      fans: 500,
      description: 'Demo Aprovada - Garota de Ipanema',
      createdAt: new Date('2024-01-22'),
    },
    {
      id: 'ft-4',
      userId: 'user-1',
      eventType: 'ACHIEVEMENT_UNLOCKED',
      fans: 100,
      description: 'Conquista: Primeira Demo',
      createdAt: new Date('2024-01-20'),
    },
    {
      id: 'ft-5',
      userId: 'user-1',
      eventType: 'ACHIEVEMENT_UNLOCKED',
      fans: 500,
      description: 'Conquista: Semana Completa',
      createdAt: new Date('2024-01-22'),
    },
    {
      id: 'ft-6',
      userId: 'user-1',
      eventType: 'QUIZ_PASSED',
      fans: 200,
      description: 'Coletiva de Imprensa - Garota de Ipanema',
      createdAt: new Date('2024-01-21'),
    },
    {
      id: 'ft-7',
      userId: 'user-1',
      eventType: 'TOUR_COMPLETED',
      fans: 1000,
      description: 'Turnê Bossa Nova Completa',
      createdAt: new Date('2024-01-23'),
    },
    {
      id: 'ft-8',
      userId: 'user-1',
      eventType: 'ROUTINE_COMPLETED',
      fans: 50,
      description: 'Rotina Diária Completa',
      createdAt: new Date('2024-01-24'),
    },
    {
      id: 'ft-9',
      userId: 'user-1',
      eventType: 'DEMO_APPROVED',
      fans: 500,
      description: 'Demo Aprovada - Chega de Saudade',
      createdAt: new Date('2024-01-24'),
    },
    {
      id: 'ft-10',
      userId: 'user-1',
      eventType: 'ACHIEVEMENT_UNLOCKED',
      fans: 1500,
      description: 'Conquista: 10 Demos Aprovadas',
      createdAt: new Date('2024-01-25'),
    },
    {
      id: 'ft-11',
      userId: 'user-1',
      eventType: 'ROUTINE_COMPLETED',
      fans: 50,
      description: 'Rotina Diária Completa',
      createdAt: new Date('2024-01-25'),
    },
    {
      id: 'ft-12',
      userId: 'user-1',
      eventType: 'LEVEL_UP',
      fans: 2000,
      description: 'Subiu de Nível: UNDERGROUND → INDIE',
      createdAt: new Date('2024-01-25'),
    },
  ] as FanTransaction[],

  // ===== CARREIRAS (todos os usuários) =====
  careers: [
    {
      id: 'career-1',
      userId: 'user-1',
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
    {
      id: 'career-2',
      userId: 'user-2',
      level: ArtistLevel.RISING_STAR,
      fans: 12500,
      currentStreak: 25,
      longestStreak: 45,
      totalDemos: 28,
      approvedDemos: 24,
      achievements: 15,
      toursCompleted: 4,
      lastActivityDate: new Date(),
    },
    {
      id: 'career-3',
      userId: 'user-3',
      level: ArtistLevel.HEADLINER,
      fans: 18200,
      currentStreak: 42,
      longestStreak: 60,
      totalDemos: 45,
      approvedDemos: 40,
      achievements: 22,
      toursCompleted: 7,
      lastActivityDate: new Date(),
    },
  ] as Career[],

  // ===== PROGRESSO DOS ESTUDANTES =====
  studentProgress: [
    {
      id: 'progress-1',
      userId: 'user-1',
      trackSceneId: 'track-1',
      demoSubmitted: true,
      demoApproved: true,
      pressQuizCompleted: false,
      progress: 75,
      lastActivity: new Date('2024-01-22'),
    },
    {
      id: 'progress-2',
      userId: 'user-1',
      trackSceneId: 'track-2',
      demoSubmitted: true,
      demoApproved: false,
      pressQuizCompleted: false,
      progress: 50,
      lastActivity: new Date('2024-01-25'),
    },
  ] as StudentTrackScene[],

  // ===== RANKING/LEADERBOARD (expandido) =====
  rankings: [
    { 
      userId: 'user-11', 
      artistName: 'Mari Drama', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana', 
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana',
      fans: 25000, 
      level: 'MAIN_STAGE', 
      levelTitle: 'Palco Principal',
      streak: 65,
      rank: 1,
    },
    { 
      userId: 'user-3', 
      artistName: 'Carla Jazz', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carla', 
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carla',
      fans: 18200, 
      level: 'HEADLINER', 
      levelTitle: 'Turnê Nacional',
      streak: 42,
      rank: 2,
    },
    { 
      userId: 'user-10', 
      artistName: 'Gabe Stage', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel', 
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel',
      fans: 16500, 
      level: 'HEADLINER', 
      levelTitle: 'Turnê Nacional',
      streak: 35,
      rank: 3,
    },
    { 
      userId: 'user-7', 
      artistName: 'Manda Vox', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda', 
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda',
      fans: 13800, 
      level: 'RISING_STAR', 
      levelTitle: 'Festival Indie',
      streak: 28,
      rank: 4,
    },
    { 
      userId: 'user-2', 
      artistName: 'Pedro Rock', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro', 
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
      fans: 12500, 
      level: 'RISING_STAR', 
      levelTitle: 'Festival Indie',
      streak: 25,
      rank: 5,
    },
    { 
      userId: 'user-15', 
      artistName: 'Lari Indie', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Larissa', 
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Larissa',
      fans: 10200, 
      level: 'INDIE', 
      levelTitle: 'Barzinho & Cover',
      streak: 20,
      rank: 6,
    },
    { 
      userId: 'user-4', 
      artistName: 'Luke Beats', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas', 
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
      fans: 9200, 
      level: 'INDIE', 
      levelTitle: 'Barzinho & Cover',
      streak: 18,
      rank: 7,
    },
    { 
      userId: 'user-1', 
      artistName: 'Sofia M.', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia', 
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
      fans: 8750, 
      level: 'INDIE', 
      levelTitle: 'Barzinho & Cover',
      streak: 12,
      rank: 8,
    },
    { 
      userId: 'user-8', 
      artistName: 'Rafa Soul', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rafael', 
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rafael',
      fans: 7500, 
      level: 'INDIE', 
      levelTitle: 'Barzinho & Cover',
      streak: 14,
      rank: 9,
    },
    { 
      userId: 'user-5', 
      artistName: 'Julia Pop', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julia', 
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julia',
      fans: 6800, 
      level: 'UNDERGROUND', 
      levelTitle: 'Cena Underground',
      streak: 10,
      rank: 10,
    },
    { 
      userId: 'user-14', 
      artistName: 'Phil Harmony', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felipe', 
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felipe',
      fans: 6200, 
      level: 'UNDERGROUND', 
      levelTitle: 'Cena Underground',
      streak: 11,
      rank: 11,
    },
    { 
      userId: 'user-9', 
      artistName: 'Ana Groove', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana', 
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
      fans: 5200, 
      level: 'UNDERGROUND', 
      levelTitle: 'Cena Underground',
      streak: 8,
      rank: 12,
    },
    { 
      userId: 'user-6', 
      artistName: 'Bruno MPB', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bruno', 
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bruno',
      fans: 3200, 
      level: 'GARAGE', 
      levelTitle: 'Banda de Garagem',
      streak: 5,
      rank: 13,
    },
    { 
      userId: 'user-12', 
      artistName: 'Thi Performance', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thiago', 
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thiago',
      fans: 2800, 
      level: 'GARAGE', 
      levelTitle: 'Banda de Garagem',
      streak: 4,
      rank: 14,
    },
    { 
      userId: 'user-13', 
      artistName: 'Bia Blues', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Beatriz', 
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Beatriz',
      fans: 800, 
      level: 'SHOWER', 
      levelTitle: 'Artista de Chuveiro',
      streak: 2,
      rank: 15,
    },
  ],

  // ===== ESCOLAS =====
  schools: [
    {
      id: 'school-1',
      name: 'Conservatório Clave de Sales',
      isActive: true,
      createdAt: new Date('2023-08-01'),
    },
  ],

  // ===== CURSOS =====
  courses: [
    {
      id: 'course-1',
      schoolId: 'school-1',
      name: 'Música Popular Brasileira',
      type: 'MUSIC' as const,
      isActive: true,
      createdAt: new Date('2023-08-01'),
    },
    {
      id: 'course-2',
      schoolId: 'school-1',
      name: 'Teatro Musical',
      type: 'THEATER' as const,
      isActive: true,
      createdAt: new Date('2023-08-01'),
    },
  ],

  // ===== TEMPORADAS =====
  seasons: [
    {
      id: 'season-1',
      courseId: 'course-1',
      name: 'Temporada 2024.1',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-06-30'),
      status: 'ACTIVE' as const,
      isActive: true,
      createdAt: new Date('2024-01-01'),
    },
    {
      id: 'season-2',
      courseId: 'course-2',
      name: 'Temporada 2024.1',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-06-30'),
      status: 'ACTIVE' as const,
      isActive: true,
      createdAt: new Date('2024-01-01'),
    },
  ],

  // ===== TURMAS =====
  classes: [
    {
      id: 'class-1',
      seasonId: 'season-1',
      name: 'Turma A - Manhã',
      maxStudents: 20,
      isActive: true,
      createdAt: new Date('2024-01-01'),
    },
    {
      id: 'class-2',
      seasonId: 'season-1',
      name: 'Turma B - Tarde',
      maxStudents: 20,
      isActive: true,
      createdAt: new Date('2024-01-01'),
    },
    {
      id: 'class-3',
      seasonId: 'season-2',
      name: 'Turma Teatro A',
      maxStudents: 15,
      isActive: true,
      createdAt: new Date('2024-01-01'),
    },
  ],

  // ===== ANALYTICS (6 meses de dados) =====
  analytics: {
    fansGrowth: [
      { date: '2024-01-15', fans: 0 },
      { date: '2024-01-16', fans: 50 },
      { date: '2024-01-17', fans: 150 },
      { date: '2024-01-18', fans: 200 },
      { date: '2024-01-19', fans: 250 },
      { date: '2024-01-20', fans: 650 },
      { date: '2024-01-21', fans: 1050 },
      { date: '2024-01-22', fans: 2100 },
      { date: '2024-01-23', fans: 3650 },
      { date: '2024-01-24', fans: 4250 },
      { date: '2024-01-25', fans: 6800 },
      { date: '2024-01-26', fans: 8750 },
    ],
    streakHistory: [
      { date: '2024-01-15', streak: 1 },
      { date: '2024-01-16', streak: 2 },
      { date: '2024-01-17', streak: 3 },
      { date: '2024-01-18', streak: 4 },
      { date: '2024-01-19', streak: 5 },
      { date: '2024-01-20', streak: 6 },
      { date: '2024-01-21', streak: 7 },
      { date: '2024-01-22', streak: 8 },
      { date: '2024-01-23', streak: 9 },
      { date: '2024-01-24', streak: 10 },
      { date: '2024-01-25', streak: 11 },
      { date: '2024-01-26', streak: 12 },
    ],
    demosSubmitted: 15,
    evaluationStats: {
      approved: 12,
      needsRevision: 2,
      pending: 1,
    },
    activityHeatmap: {
      monday: 12,
      tuesday: 15,
      wednesday: 18,
      thursday: 14,
      friday: 16,
      saturday: 8,
      sunday: 5,
    },
  },

  // ✅ SUBMISSIONS e REVIEWS já estão atualizados acima

  // ===== TEACHERS =====
  teachers: [
    {
      id: 'teacher-1',
      userId: 'teacher-1',
      name: 'Prof. João Santos',
      email: 'joao@escola.com',
      role: 'TEACHER' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JoaoTeacher',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JoaoTeacher',
      schoolId: 'school-1',
      courseId: 'course-1',
      createdAt: new Date('2023-08-01'),
    },
    {
      id: 'teacher-2',
      userId: 'teacher-2',
      name: 'Profa. Maria Helena',
      email: 'maria@escola.com',
      role: 'TEACHER' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MariaTeacher',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MariaTeacher',
      schoolId: 'school-1',
      courseId: 'course-1',
      createdAt: new Date('2023-08-01'),
    },
    {
      id: 'teacher-3',
      userId: 'teacher-3',
      name: 'Prof. Carlos Mendes',
      email: 'carlos@escola.com',
      role: 'TEACHER' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosTeacher',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosTeacher',
      schoolId: 'school-1',
      courseId: 'course-2',
      createdAt: new Date('2023-08-01'),
    },
  ],

  // ===== FAN RULES =====
  fanRules: [
    { eventType: 'ROUTINE_COMPLETED', fans: 50, description: 'Rotina Diária Completa' },
    { eventType: 'DEMO_SUBMITTED', fans: 300, description: 'Demo Enviada' },
    { eventType: 'DEMO_APPROVED', fans: 500, description: 'Demo Aprovada' },
    { eventType: 'QUIZ_PASSED', fans: 200, description: 'Coletiva de Imprensa Aprovada' },
    { eventType: 'STREAK_7', fans: 500, description: 'Sequência de 7 dias' },
    { eventType: 'STREAK_15', fans: 1000, description: 'Sequência de 15 dias' },
    { eventType: 'STREAK_30', fans: 2500, description: 'Sequência de 30 dias' },
    { eventType: 'STREAK_60', fans: 5000, description: 'Sequência de 60 dias' },
    { eventType: 'TOUR_COMPLETED', fans: 1000, description: 'Turnê Completa' },
    { eventType: 'LEVEL_UP', fans: 2000, description: 'Subiu de Nível' },
  ],

  // ===== LEADERBOARD (compatibilidade) =====
  leaderboard: [
    { userId: 'user-11', artistName: 'Mari Drama', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana', fans: 25000, level: 'MAIN_STAGE', streak: 65 },
    { userId: 'user-3', artistName: 'Carla Jazz', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carla', fans: 18200, level: 'HEADLINER', streak: 42 },
    { userId: 'user-10', artistName: 'Gabe Stage', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel', fans: 16500, level: 'HEADLINER', streak: 35 },
    { userId: 'user-7', artistName: 'Manda Vox', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda', fans: 13800, level: 'RISING_STAR', streak: 28 },
    { userId: 'user-2', artistName: 'Pedro Rock', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro', fans: 12500, level: 'RISING_STAR', streak: 25 },
  ],

  // ===== STUDENT TRACK SCENES (compatibilidade) =====
  studentTrackScenes: [
    {
      id: 'progress-1',
      userId: 'user-1',
      trackSceneId: 'track-1',
      demoSubmitted: true,
      demoApproved: true,
      pressQuizCompleted: false,
      progress: 75,
      lastActivity: new Date('2024-01-22'),
    },
    {
      id: 'progress-2',
      userId: 'user-1',
      trackSceneId: 'track-2',
      demoSubmitted: true,
      demoApproved: false,
      pressQuizCompleted: false,
      progress: 50,
      lastActivity: new Date('2024-01-25'),
    },
  ],

  // ===== STUDY TRACKS (Faixas de Estudo) - ✅ ATUALIZADO =====
  studyTracks: [
    // Garota de Ipanema - Faixas de Estudo
    {
      id: 'lesson-1-1',
      trackSceneId: 'track-1', // ✅ Não trackId
      title: 'Harmonia e Progressão de Acordes',
      type: 'HARMONY' as const,
      description: 'Domine a progressão harmônica característica da Bossa Nova',
      technicalNotes: 'Foque na transição suave entre os acordes Fmaj7, G7, Gm7, Gb7. A harmonia da Bossa Nova usa muitos acordes com 7ª e 9ª. Pratique a levada no violão: grave-abafado-agudo-abafado-agudo.',
      order: 1,
      estimatedMinutes: 15,
    },
    {
      id: 'study-track-1-2',
      trackSceneId: 'track-1',
      templateId: 'template-study-1-2',
      categoryId: 'cat-rhythm',
      categoryKey: 'RHYTHM',
      title: 'Batida e Ritmo',
      description: 'Aprenda a batida sincopada característica da Bossa Nova',
      technicalNotes: 'O ritmo da Bossa Nova é baseado no samba, mas mais suave e sincopado. Pratique primeiro com palmas: 1-e-2-e-3-e-4-e, acentuando os tempos fracos. No violão, alterne polegar (graves) e dedos (agudos).',
      order: 2,
      estimatedMinutes: 20,
      isRequired: true,
      isVisible: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 'study-track-1-3',
      trackSceneId: 'track-1',
      templateId: 'template-study-1-3',
      categoryId: 'cat-melody',
      categoryKey: 'MELODY',
      title: 'Linha Melódica Principal',
      description: 'Pratique a melodia vocal com afinação e fraseado corretos',
      technicalNotes: 'A melodia tem saltos intervalares importantes. Atenção especial à frase "Olha que coisa mais linda" - mantenha legato. Use respiração diafragmática para sustentar as frases longas.',
      order: 3,
      estimatedMinutes: 25,
      isRequired: true,
      isVisible: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 'study-track-1-4',
      trackSceneId: 'track-1',
      templateId: 'template-study-1-4',
      categoryId: 'cat-technique',
      categoryKey: 'TECHNIQUE',
      title: 'Técnica Vocal e Respiração',
      description: 'Desenvolva controle respiratório e leveza vocal para o estilo Bossa Nova',
      technicalNotes: 'A Bossa Nova exige voz leve, quase falada. Evite vibrato excessivo. Pratique sustentação de notas sem forçar, usando apoio diafragmático. Trabalhe a colocação da voz no palato (voz de cabeça misturada).',
      order: 4,
      estimatedMinutes: 20,
      isRequired: true,
      isVisible: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 'study-track-1-5',
      trackSceneId: 'track-1',
      templateId: 'template-study-1-5',
      categoryId: 'cat-interpretation',
      categoryKey: 'INTERPRETATION',
      title: 'Interpretação e Expressão',
      description: 'Combine técnica e emoção para uma performance autêntica',
      technicalNotes: 'A interpretação deve ser natural e intimista, como se contasse uma história para alguém próximo. Atenção à dicção - cada palavra deve ser clara mas relaxada. O balanço (swing) deve estar no corpo todo, não só na voz.',
      order: 5,
      estimatedMinutes: 30,
      isRequired: true,
      isVisible: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 'study-track-1-6',
      trackSceneId: 'track-1',
      templateId: 'template-study-1-6',
      categoryId: 'cat-solo',
      categoryKey: 'SOLO',
      title: 'Solo e Improvisação',
      description: 'Desenvolva habilidades de improvisação sobre a progressão harmônica',
      technicalNotes: 'Use a escala de Fá maior e suas variações modais. Explore cromatismos entre as notas da escala. Mantenha o feeling da Bossa Nova - menos é mais. Pratique pequenas variações melódicas da melodia original.',
      order: 6,
      estimatedMinutes: 25,
      isRequired: true,
      isVisible: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },

    // Chega de Saudade - Faixas de Estudo
    {
      id: 'study-track-2-1',
      trackSceneId: 'track-2',
      templateId: 'template-study-2-1',
      categoryId: 'cat-harmony',
      categoryKey: 'HARMONY',
      title: 'Harmonia e Modulações',
      description: 'Progressão harmônica complexa com modulações características',
      technicalNotes: 'Esta música tem modulações para tons vizinhos. Atenção às preparações harmônicas (II-V-I). Pratique as transições entre seções (A-B-A).',
      order: 1,
      estimatedMinutes: 20,
      isRequired: true,
      isVisible: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 'study-track-2-2',
      trackSceneId: 'track-2',
      templateId: 'template-study-2-2',
      categoryId: 'cat-rhythm',
      categoryKey: 'RHYTHM',
      title: 'Batida com Dinâmica',
      description: 'Padrão rítmico da Bossa Nova com variações dinâmicas',
      technicalNotes: 'Trabalhe dinâmica: seções mais suaves (versos) vs. seções mais intensas (refrão). Mantenha o balanço constante mas varie a intensidade do toque.',
      order: 2,
      estimatedMinutes: 18,
      isRequired: true,
      isVisible: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 'study-track-2-3',
      trackSceneId: 'track-2',
      templateId: 'template-study-2-3',
      categoryId: 'cat-melody',
      categoryKey: 'MELODY',
      title: 'Melodia e Saltos Vocais',
      description: 'Melodia com ampla extensão vocal e saltos intervalares',
      technicalNotes: 'Prepare-se para saltos de oitava. A frase "Chega de saudade" tem um salto descendente importante - pratique a transição entre registros vocais.',
      order: 3,
      estimatedMinutes: 25,
      isRequired: true,
      isVisible: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 'study-track-2-4',
      trackSceneId: 'track-2',
      templateId: 'template-study-2-4',
      categoryId: 'cat-technique',
      categoryKey: 'TECHNIQUE',
      title: 'Controle de Dinâmica Vocal',
      description: 'Controle de dinâmica entre piano e forte',
      technicalNotes: 'Trabalhe a passagem entre voz de peito e voz de cabeça nos saltos. Pratique crescendos e decrescendos graduais. Mantenha a qualidade vocal em todas as dinâmicas.',
      order: 4,
      estimatedMinutes: 22,
      isRequired: true,
      isVisible: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 'study-track-2-5',
      trackSceneId: 'track-2',
      templateId: 'template-study-2-5',
      categoryId: 'cat-interpretation',
      categoryKey: 'INTERPRETATION',
      title: 'Interpretação com Emoção',
      description: 'Transmita a saudade e nostalgia da canção',
      technicalNotes: 'Esta é uma música sobre saudade e desejo de reencontro. Deixe a emoção guiar a intensidade. Não force - a emoção deve vir de dentro.',
      order: 5,
      estimatedMinutes: 28,
      isRequired: true,
      isVisible: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
  ] as StudyTrack[],
};

// ==================== COMPATIBILIDADE (para não quebrar código existente) ====================
// Mapeia estruturas antigas para novas

// tracks → trackScenes
MOCK_DATA.tracks = MOCK_DATA.trackScenes.map(ts => ({
  ...ts,
  // Campos de compatibilidade
  songId: ts.id, // Para código que ainda usa songId
  technicalNotes: ts.technicalInstruction, // Para código que ainda usa technicalNotes
}));

// demos → submissions
MOCK_DATA.demos = MOCK_DATA.submissions.map(sub => ({
  ...sub,
  // Campos de compatibilidade
  id: sub.id,
  trackId: sub.trackSceneId, // Para código que ainda usa trackId
  songId: sub.trackSceneId, // Para código que ainda usa songId
  userId: sub.studentId, // Para código que ainda usa userId
  audioUrl: sub.mediaUrl, // Para código que ainda usa audioUrl
  submittedAt: sub.createdAt,
  reviewedAt: sub.reviewedAt,
}));

// evaluations → reviews
MOCK_DATA.evaluations = MOCK_DATA.reviews.map(rev => ({
  ...rev,
  // Campos de compatibilidade
  id: rev.id,
  demoId: rev.submissionId, // Para código que ainda usa demoId
  feedback: rev.feedback || rev.comment || '',
  technicalNotes: rev.technicalNotes || '',
  createdAt: rev.createdAt,
}));

// trackLessons → studyTracks
MOCK_DATA.trackLessons = MOCK_DATA.studyTracks.map(st => ({
  ...st,
  // Campos de compatibilidade
  id: st.id,
  trackId: st.trackSceneId, // Para código que ainda usa trackId
  type: st.categoryKey as any, // Para código que ainda usa type
  audioUrl: st.audioUrl,
}));

// ✅ COMPATIBILIDADE: Adicionar shows e rewards aos tours (para código que ainda usa)
MOCK_DATA.tours.forEach(tour => {
  (tour as any).shows = [
    { id: 'show-1', city: 'Rio de Janeiro', venue: 'Teatro Municipal', date: new Date('2024-02-01'), checkedIn: false },
    { id: 'show-2', city: 'São Paulo', venue: 'Sala São Paulo', date: new Date('2024-02-08'), checkedIn: false },
  ];
  (tour as any).rewards = { fans: 1000, badge: 'Artista Viajante' };
});

export default MOCK_DATA;

// ==================== EXPORTS INDIVIDUAIS (compatibilidade) ====================

export const CURRENT_USER = MOCK_DATA.users[0];

// ✅ Perfil genérico que funciona para Música e Teatro
export const CURRENT_STUDENT_PROFILE: StudentProfile = {
  userId: CURRENT_USER.id,
  stageName: CURRENT_USER.artistName || CURRENT_USER.name,
  avatarUrl: CURRENT_USER.avatar,
  bio: 'Designer gráfica de 28 anos apaixonada por MPB. Toco violão há 3 anos de forma autodidata e agora busco estruturar meu aprendizado. Meu sonho é me apresentar em bares culturais e criar arranjos próprios de clássicos brasileiros. Admiro muito Djavan, Elis Regina e Tom Jobim.',
  specialization: 'Violão', // Música: "Voz", "Violão", "Piano" | Teatro: "Interpretação", "Direção", "Coreografia"
  genres: ['MPB', 'Bossa Nova', 'Samba', 'Folk Brasileiro'], // Música: estilos musicais | Teatro: gêneros teatrais
  createdAt: CURRENT_USER.createdAt,
  updatedAt: new Date(),
};

// ✅ Exemplo de perfil para Teatro (para referência)
export const EXAMPLE_THEATER_PROFILE: StudentProfile = {
  userId: 'theater-user-1',
  stageName: 'João Silva',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
  bio: 'Apaixonado por teatro clássico e contemporâneo. Focado em interpretação dramática e exploração de personagens complexos.',
  specialization: 'Interpretação', // Teatro: "Interpretação", "Direção", "Dramaturgia", "Cenografia"
  genres: ['Drama', 'Comédia', 'Teatro Musical', 'Experimental'], // Gêneros teatrais
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date(),
};

export const CURRENT_SEASON = MOCK_DATA.seasons[0];
export const CURRENT_CLASS = MOCK_DATA.classes[0];
export const MOCK_NOTIFICATIONS = MOCK_DATA.notifications;

// ==================== RE-EXPORT TIPOS (para compatibilidade) ====================
// Re-exportar tipos de types.ts para facilitar imports
export type {
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
} from './types';

export {
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
