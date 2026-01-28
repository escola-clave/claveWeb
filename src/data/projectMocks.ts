/**
 * Clave de Sales - Project Mocks Compatibility Layer
 * 
 * Este arquivo mantém compatibilidade com imports antigos.
 * Todos os dados estão em centralizedMocks.ts
 */

import MOCK_DATA from './centralizedMocks';

// Re-export everything from centralizedMocks for backwards compatibility
export * from './centralizedMocks';

// Projects & Tracks - ✅ ATUALIZADO
export const CURRENT_PROJECT = MOCK_DATA.projects?.[0];
export const CURRENT_TRACK_SCENES = MOCK_DATA.trackScenes || []; // ✅ Não tracks

// Submissions & Reviews
export const MOCK_SUBMISSIONS = MOCK_DATA.submissions || [];
export const MOCK_REVIEWS = MOCK_DATA.reviews || [];

// Student Progress
export const STUDENT_TRACK_PROGRESS = MOCK_DATA.studentProgress || [];

// Helper functions
export function getTrackSceneById(id: string) {
  return CURRENT_TRACK_SCENES.find((track: any) => track.id === id);
}

export function getTrackMaterialsBySceneId(sceneId: string) {
  const track = getTrackSceneById(sceneId);
  if (!track) return [];
  
  return [
    {
      id: `material-${sceneId}-1`,
      type: 'video',
      title: track.title,
      description: track.description,
      url: '#',
    }
  ];
}

// Types - ✅ ATUALIZADO
export type { StudentTrackScene } from './types'; // ✅ Não TrackLesson (use StudyTrack)
export type { StudyTrack } from './types';