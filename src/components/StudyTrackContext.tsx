import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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

const STORAGE_KEY = 'clave-study-tracks-progress';

export function StudyTrackProvider({ children }: { children: ReactNode }) {
  const [studentStudyTracks, setStudentStudyTracks] = useState<StudentStudyTrack[]>(() => {
    // Carregar do localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Converter strings de data de volta para objetos Date
          return parsed.map((track: any) => ({
            ...track,
            completedAt: track.completedAt ? new Date(track.completedAt) : undefined,
          }));
        } catch (e) {
          console.error('Erro ao carregar progresso:', e);
        }
      }
    }
    return [];
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
