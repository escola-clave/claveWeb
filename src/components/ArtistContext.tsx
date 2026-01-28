import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import MOCK_DATA from '../data/centralizedMocks';
import type { FanTransaction, Career, Tour, StudentTrackScene } from '../data/types';
import { ArtistLevel } from '../data/types';

export interface FanEvent {
  type: string;
  fans: number;
  description: string;
  timestamp: Date;
}

interface ArtistContextType {
  career: Career;
  tour: Tour;
  fanTransactions: FanTransaction[];
  trackProgress: StudentTrackScene[];
  addFans: (event: Omit<FanEvent, 'timestamp'>) => void;
  updateStreak: (broken?: boolean) => void;
  completeDaily: (withPenalty?: boolean) => void;
  submitDemo: () => void;
  completeTrackScene: (trackSceneId: string) => void;
  receiveReview: (type: 'POSITIVE' | 'CONSTRUCTIVE' | 'CRITICAL') => void;
  completePressQuiz: (passed: boolean) => void;
  completeProject: () => void;
}

const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

const LEVEL_THRESHOLDS = [
  { min: 0, max: 499, title: 'Artista de Chuveiro' },
  { min: 500, max: 1999, title: 'Banda de Garagem' },
  { min: 2000, max: 4999, title: 'Barzinho & Cover' },
  { min: 5000, max: Infinity, title: 'Palco Principal' }
];

export function ArtistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  
  // ✅ Inicializar com dados dos mocks
  const userCareerStats = user ? MOCK_DATA.careerStats[user.id] || MOCK_DATA.careerStats['user-mariana'] : null;
  
  const initialCareer: Career = {
    id: user?.id || 'user-mariana',
    studentId: user?.id || 'user-mariana',
    seasonId: 'season-2024-1',
    level: userCareerStats?.level || ArtistLevel.SHOWER,
    levelNumber: 2, // Banda de Garagem
    fans: userCareerStats?.fans || 0,
    currentStreak: userCareerStats?.currentStreak || 0,
    longestStreak: userCareerStats?.longestStreak || 0,
    totalDemos: userCareerStats?.totalDemos || 0,
    approvedDemos: userCareerStats?.approvedDemos || 0,
    totalAchievements: userCareerStats?.achievements || 0,
    toursCompleted: userCareerStats?.toursCompleted || 0,
    lastActiveDate: userCareerStats?.lastActivityDate || new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const initialTour: Tour = MOCK_DATA.tours?.[0] || {
    id: 'tour-1',
    studentId: user?.id || 'user-mariana',
    seasonId: 'season-2024-1',
    title: 'Turnê Semanal',
    description: 'Mantenha sua sequência ativa',
    status: 'ACTIVE' as const,
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const [career, setCareer] = useState<Career>(initialCareer);
  const [tour, setTour] = useState<Tour>(initialTour);
  const [fanTransactions, setFanTransactions] = useState<FanTransaction[]>(MOCK_DATA.fanTransactions || []);
  const [trackProgress, setTrackProgress] = useState<StudentTrackScene[]>(MOCK_DATA.studentProgress || []);

  // ✅ SIMPLIFICADO: Apenas atualiza UI com quantidade recebida do backend
  const addFans = (event: Omit<FanEvent, 'timestamp'>) => {
    // Backend já calculou a quantidade, apenas atualizamos a UI
    const fansToAdd = event.fans;

    // Criar transação para UI
    const newTransaction: FanTransaction = {
      id: `ft-${Date.now()}`,
      studentId: career.studentId,
      seasonId: career.seasonId,
      eventId: `evt-${Date.now()}`,
      amount: fansToAdd,
      reason: event.description,
      createdAt: new Date()
    };

    setFanTransactions(prev => [newTransaction, ...prev].slice(0, 50));
    
    setCareer(prev => ({
      ...prev,
      fans: Math.max(0, prev.fans + fansToAdd),
      lastActiveDate: new Date()
    }));
  };

  const updateStreak = (broken = false) => {
    setCareer(prev => ({
      ...prev,
      currentStreak: broken ? 0 : prev.currentStreak + 1,
      lastActiveDate: new Date()
    }));

    setTour(prev => ({
      ...prev,
      status: broken ? 'BROKEN' : 'ACTIVE',
      updatedAt: new Date()
    }));

    // Bônus de 7 dias consecutivos
    if (!broken && (career.currentStreak + 1) % 7 === 0) {
      addFans({
        type: 'TOUR_STREAK_BONUS_7',
        fans: 800,
        description: '🔥 Bônus: 7 dias consecutivos de Turnê!'
      });
    }

    if (broken) {
      addFans({
        type: 'TOUR_BROKEN',
        fans: -50,
        description: 'Turnê quebrada por falta'
      });
    }
  };

  const completeDaily = (withPenalty = false) => {
    const fans = withPenalty ? 30 : 50;
    const eventType = withPenalty ? 'DAILY_MISSION_COMPLETED_WITH_PENALTY' : 'DAILY_MISSION_COMPLETED';
    const description = withPenalty 
      ? 'Rotina Diária concluída (com penalidade no quiz)'
      : 'Rotina Diária concluída';

    updateStreak();
    addFans({
      type: eventType,
      fans: fans,
      description
    });
  };

  const submitDemo = () => {
    addFans({
      type: 'SUBMISSION_CREATED',
      fans: 100,
      description: 'Demo enviada ao Estúdio'
    });

    setCareer(prev => ({
      ...prev,
      totalDemos: prev.totalDemos + 1
    }));
  };

  const completeTrackScene = (trackSceneId: string) => {
    setTrackProgress(prev => {
      const updatedProgress = prev.map(scene => {
        if (scene.trackSceneId === trackSceneId) {
          return {
            ...scene,
            status: 'COMPLETED' as const,
            completedAt: new Date(),
            updatedAt: new Date()
          };
        }
        return scene;
      });

      // Desbloquear próxima faixa
      const currentIndex = updatedProgress.findIndex(s => s.trackSceneId === trackSceneId);
      if (currentIndex !== -1 && currentIndex < updatedProgress.length - 1) {
        const nextScene = updatedProgress[currentIndex + 1];
        if (nextScene.status === 'LOCKED') {
          updatedProgress[currentIndex + 1] = {
            ...nextScene,
            status: 'STUDYING' as const,
            updatedAt: new Date()
          };
        }
      }

      return updatedProgress;
    });

    addFans({
      type: 'TRACK_SCENE_COMPLETED',
      fans: 200,
      description: 'Faixa/Cena concluída'
    });
  };

  const receiveReview = (type: 'POSITIVE' | 'CONSTRUCTIVE' | 'CRITICAL') => {
    const eventType = `SUBMISSION_REVIEWED_${type}`;
    const fansMap = {
      POSITIVE: 300,
      CONSTRUCTIVE: 100,
      CRITICAL: 50
    };
    const descriptions = {
      POSITIVE: 'Avaliação Positiva recebida! 🌟',
      CONSTRUCTIVE: 'Avaliação Construtiva recebida',
      CRITICAL: 'Avaliação Crítica recebida'
    };

    addFans({
      type: eventType,
      fans: fansMap[type],
      description: descriptions[type]
    });
  };

  const completePressQuiz = (passed: boolean) => {
    const eventType = passed ? 'PRESS_QUIZ_PASSED' : 'PRESS_QUIZ_FAILED';
    const description = passed 
      ? 'Coletiva de Imprensa: Sucesso! 📰'
      : 'Coletiva de Imprensa: Reprovado';

    addFans({
      type: eventType,
      fans: passed ? 500 : -100,
      description
    });
  };

  const completeProject = () => {
    addFans({
      type: 'PROJECT_COMPLETED',
      fans: 1000,
      description: 'Projeto da Temporada Concluído! 🎉'
    });
  };

  return (
    <ArtistContext.Provider value={{ 
      career, 
      tour, 
      fanTransactions,
      trackProgress,
      addFans, 
      updateStreak, 
      completeDaily, 
      submitDemo,
      completeTrackScene,
      receiveReview,
      completePressQuiz,
      completeProject
    }}>
      {children}
    </ArtistContext.Provider>
  );
}

export function useArtist() {
  const context = useContext(ArtistContext);
  if (!context) {
    throw new Error('useArtist must be used within ArtistProvider');
  }
  return context;
}