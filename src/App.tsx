import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { ArtistProvider } from './components/ArtistContext';
import { StudyTrackProvider } from './components/StudyTrackContext';
import Login from './components/Login';
import MapaDeTelas from './components/MapaDeTelas';
import Palco from './components/Palco';
import RotinaDiaria from './components/RotinaDiaria';
import Projetos from './components/Projetos';
import Estudio from './components/Estudio';
import Carreira from './components/Carreira';
import ColetivaImprensa from './components/ColetivaImprensa';
import Social from './components/Social';
import Notificacoes from './components/Notificacoes';
import BottomNav from './components/BottomNav';
import MOCK_DATA from './data/centralizedMocks';

type ViewType = 'palco' | 'rotina' | 'projetos' | 'estudio' | 'carreira' | 'imprensa' | 'social' | 'notificacoes';

interface NavigationState {
  view: ViewType;
  params?: any;
}

function AppContent() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<NavigationState>({ view: 'palco' });
  const [showDocs, setShowDocs] = useState(false);
  // Helper para navegação com parâmetros
  const navigate = (view: ViewType, params?: any) => {
    setCurrentView({ view, params });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to top whenever view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView.view]);

  // Documentação acessível sem login
  if (showDocs) {
    return <MapaDeTelas onBack={() => setShowDocs(false)} />;
  }

  if (!user) {
    return <Login onShowDocs={() => setShowDocs(true)} />;
  }

  const renderView = () => {
    const { view, params } = currentView;
    
    switch (view) {
      case 'palco':
        return <Palco onNavigate={navigate} />;
      case 'rotina':
        return <RotinaDiaria onBack={() => navigate('palco')} />;
      case 'projetos':
        return <Projetos 
          onBack={() => navigate('palco')} 
          onNavigate={navigate}
          initialProjectId={params?.projectId}
          initialTrackId={params?.trackId}
        />;
      case 'estudio':
        return <Estudio 
          onBack={() => navigate('palco')} 
          onNavigateToPress={() => navigate('imprensa')}
          initialSubmissionId={params?.submissionId}
          highlightReviewId={params?.reviewId}
        />;
      case 'carreira':
        return <Carreira 
          onBack={() => navigate('palco')}
          highlightAchievementId={params?.achievementId}
        />;
      case 'imprensa':
        return <ColetivaImprensa 
          onBack={() => navigate('palco')}
          initialQuizId={params?.quizId}
        />;
      case 'social':
        return <Social onBack={() => navigate('palco')} />;
      case 'notificacoes':
        return <Notificacoes 
          onBack={() => navigate('palco')} 
          onNavigate={navigate} 
          notifications={MOCK_DATA.notifications || []} 
        />;
      default:
        return <Palco onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
      {renderView()}
      <BottomNav currentView={currentView.view} onNavigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ArtistProvider>
        <StudyTrackProvider>
          <AppContent />
        </StudyTrackProvider>
      </ArtistProvider>
    </AuthProvider>
  );
}