import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import MOCK_DATA from '../data/centralizedMocks';

export interface StudentStudyTrack {
  id: string;
  studentId: string;
  studyTrackId: string;
  completed: boolean;
  completedAt?: Date;
  notes?: string;
  practiceTime: number; // minutos
}

interface StudyTrackContextType {
  studentStudyTracks: StudentStudyTrack[];
  toggleStudyTrack: (studyTrackId: string, notes?: string) => void;
  isStudyTrackCompleted: (studyTrackId: string) => boolean;
  getStudyTrackProgress: (studyTrackId: string) => StudentStudyTrack | undefined;
}

const StudyTrackContext = createContext<StudyTrackContextType | undefined>(undefined);

const STORAGE_KEY = 'clave-study-tracks-progress-v2';

/**
 * Gera o progresso inicial das study tracks baseado nos dados mock.
 * Se o studentProgress diz que uma trackScene está completa (completed: true),
 * então TODAS as study tracks dessa trackScene são marcadas como concluídas.
 */
function buildInitialStudyTrackProgress(): StudentStudyTrack[] {
  const completedTrackSceneIds = (MOCK_DATA.studentProgress || [])
    .filter(p => p.completed === true)
    .map(p => p.trackSceneId);

  const allStudyTracks = MOCK_DATA.studyTracks || [];

  return allStudyTracks
    .filter(st => completedTrackSceneIds.includes(st.trackSceneId))
    .map(st => ({
      id: `progress-${st.id}`,
      studentId: 'user-mariana',
      studyTrackId: st.id,
      completed: true,
      completedAt: MOCK_DATA.studentProgress?.find(p => p.trackSceneId === st.trackSceneId)?.completedAt || new Date(),
      notes: 'Concluído conforme progresso do aluno',
      practiceTime: st.estimatedMinutes || 15,
    }));
}

export function StudyTrackProvider({ children }: { children: ReactNode }) {
  const [studentStudyTracks, setStudentStudyTracks] = useState<StudentStudyTrack[]>(() => {
    // Carregar do localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Converter strings de data de volta para objetos Date
          const fromStorage: StudentStudyTrack[] = parsed.map((track: any) => ({
            ...track,
            completedAt: track.completedAt ? new Date(track.completedAt) : undefined,
          }));
          // Mesclar: garantir que os dados iniciais do mock estejam presentes
          // (caso o localStorage tenha sido salvo antes da inicialização correta)
          const initialProgress = buildInitialStudyTrackProgress();
          const existingIds = new Set(fromStorage.map(t => t.studyTrackId));
          const missing = initialProgress.filter(t => !existingIds.has(t.studyTrackId));
          return [...fromStorage, ...missing];
        } catch (e) {
          console.error('Erro ao carregar progresso:', e);
        }
      }
    }
    // Se não tem nada no localStorage, gerar progresso inicial a partir dos mocks
    return buildInitialStudyTrackProgress();
  });

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(studentStudyTracks));
    }
  }, [studentStudyTracks]);

  const toggleStudyTrack = (studyTrackId: string, notes?: string) => {
    setStudentStudyTracks(prev => {
      const existing = prev.find(t => t.studyTrackId === studyTrackId);
      
      if (existing) {
        // Se já existe, toggle completed
        return prev.map(t => 
          t.studyTrackId === studyTrackId
            ? {
                ...t,
                completed: !t.completed,
                completedAt: !t.completed ? new Date() : undefined,
                notes: notes || t.notes,
                practiceTime: t.practiceTime + (!t.completed ? 15 : 0), // +15 min ao completar
              }
            : t
        );
      } else {
        // Se não existe, criar novo
        return [
          ...prev,
          {
            id: `progress-${studyTrackId}`,
            studentId: 'user-1', // TODO: pegar do AuthContext
            studyTrackId,
            completed: true,
            completedAt: new Date(),
            notes,
            practiceTime: 15,
          }
        ];
      }
    });
  };

  const isStudyTrackCompleted = (studyTrackId: string): boolean => {
    const track = studentStudyTracks.find(t => t.studyTrackId === studyTrackId);
    return track?.completed || false;
  };

  const getStudyTrackProgress = (studyTrackId: string): StudentStudyTrack | undefined => {
    return studentStudyTracks.find(t => t.studyTrackId === studyTrackId);
  };

  return (
    <StudyTrackContext.Provider value={{
      studentStudyTracks,
      toggleStudyTrack,
      isStudyTrackCompleted,
      getStudyTrackProgress,
    }}>
      {children}
    </StudyTrackContext.Provider>
  );
}

export function useStudyTrack() {
  const context = useContext(StudyTrackContext);
  if (context === undefined) {
    throw new Error('useStudyTrack must be used within a StudyTrackProvider');
  }
  return context;
}
