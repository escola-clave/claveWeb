/**
 * Clave de Sales - Data Export
 * Consolidação de todos os mocks
 */

import MOCK_DATA from './centralizedMocks';
import STUDY_TRACK_MOCKS from './studyTrackMocks';

// Integrar StudyTracks no MOCK_DATA
const INTEGRATED_MOCK_DATA = {
  ...MOCK_DATA,
  studyTrackCategories: STUDY_TRACK_MOCKS.categories,
  studyTrackTemplates: STUDY_TRACK_MOCKS.templates,
  studyTracks: STUDY_TRACK_MOCKS.instances,
  studentStudyTracks: STUDY_TRACK_MOCKS.studentProgress,
};

export default INTEGRATED_MOCK_DATA;

// Re-export tudo
export * from './centralizedMocks';
export * from './studyTrackMocks';
export { STUDY_TRACK_MOCKS };
