import { useAuth } from './AuthContext';
import { useArtist } from './ArtistContext';
import { Music2, Radio, Album, Mic, TrendingUp, LogOut, Flame, Trophy, Star, AlertCircle, Clock, Users, Bell, Award, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import MOCK_DATA from '../data/centralizedMocks';
import { getTrackSceneById, getSubmissionById, getReviewBySubmission, getTeacherById } from '../data/mockAdapter';
import AppBar from './AppBar';

type ViewType = 'palco' | 'rotina' | 'projetos' | 'estudio' | 'carreira' | 'social' | 'notificacoes';

interface PalcoProps {
  onNavigate: (view: ViewType, params?: any) => void;
}

const LEVEL_TITLES = [
  'Artista de Chuveiro',
  'Banda de Garagem',
  'Barzinho & Cover',
  'Palco Principal'
];

function getLevelTitle(fans: number): string {
  if (fans < 500) return LEVEL_TITLES[0];
  if (fans < 2000) return LEVEL_TITLES[1];
  if (fans < 5000) return LEVEL_TITLES[2];
  return LEVEL_TITLES[3];
}

function getNextLevelThreshold(fans: number): number {
  if (fans < 500) return 500;
  if (fans < 2000) return 2000;
  if (fans < 5000) return 5000;
  return 10000;
}

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInDays > 0) return `há ${diffInDays} dia${diffInDays > 1 ? 's' : ''}`;
  if (diffInHours > 0) return `há ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
  return 'agora há pouco';
}

export default function Palco({ onNavigate }: PalcoProps) {
  const { user, studentProfile, logout } = useAuth();
  const { career, tour } = useArtist();

  // Buscar últimos feedbacks (reviews) - ✅ ATUALIZADO
  const recentEvaluations = MOCK_DATA.reviews // ✅ Não evaluations
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 3)
    .map(review => {
      const submission = MOCK_DATA.submissions.find(s => s.id === review.submissionId); // ✅ Não demos, não demoId
      const trackScene = submission ? MOCK_DATA.trackScenes.find(t => t.id === submission.trackSceneId) : null; // ✅ Não tracks, não trackId
      
      return {
        id: review.id,
        professor: review.teacherName,
        professorId: review.teacherId,
        avatarUrl: MOCK_DATA.users.find(t => t.id === review.teacherId && t.role === 'TEACHER')?.avatar || 
                   `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.teacherId}`,
        rating: review.rating,
        feedback: review.feedback,
        trackTitle: trackScene?.title || 'Performance', // ✅
        approved: review.approved,
        timestamp: formatTimestamp(review.createdAt),
      };
    });

  const notifications = MOCK_DATA.notifications.filter(n => !n.read).slice(0, 3).map(notif => ({
    id: notif.id,
    icon: notif.icon,
    message: notif.message,
    color: notif.color,
    urgent: notif.type === 'EVALUATION' && !notif.read,
    actionUrl: notif.actionUrl
  }));

  const shortcuts = [
    { icon: Radio, label: 'Rotina Diária', subtitle: 'Passagem de Som', view: 'rotina' as const, color: 'from-orange-500 to-red-500' },
    { icon: Album, label: 'Projetos', subtitle: 'Temporada Atual', view: 'projetos' as const, color: 'from-purple-500 to-indigo-500' },
    { icon: Mic, label: 'Estúdio', subtitle: 'Gravações', view: 'estudio' as const, color: 'from-pink-500 to-rose-500' },
    { icon: TrendingUp, label: 'Carreira', subtitle: 'Seu Perfil', view: 'carreira' as const, color: 'from-cyan-500 to-blue-500' },
    { icon: Users, label: 'Social', subtitle: 'Mídias Sociais', view: 'social' as const, color: 'from-blue-500 to-indigo-500' }
  ];

  // ✅ Verificação de segurança
  if (!career) {
    return <div className="min-h-screen flex items-center justify-center text-white">Carregando...</div>;
  }

  const levelTitle = getLevelTitle(career.fans);
  const nextThreshold = getNextLevelThreshold(career.fans);
  const currentLevelMin = nextThreshold === 500 ? 0 : nextThreshold === 2000 ? 500 : nextThreshold === 5000 ? 2000 : 5000;
  const progressInLevel = career.fans - currentLevelMin;
  const levelRange = nextThreshold - currentLevelMin;
  const progressPercent = (progressInLevel / levelRange) * 100;

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <AppBar onNotificationsClick={() => onNavigate('notificacoes')} />
      
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Bem-vindo Message */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Bem-vindo, {user?.name}! 👋
          </h1>
          <p className="text-purple-300">Seu palco está pronto. Hora de brilhar! ✨</p>
        </motion.div>

        {/* Banner de Coletiva de Imprensa Pendente */}
        {career.fans >= 500 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <button
              onClick={() => onNavigate('imprensa')}
              className="w-full bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-lg border-2 border-red-500/50 rounded-2xl p-4 hover:from-red-600/30 hover:to-orange-600/30 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-red-500 to-orange-500 p-3 rounded-xl animate-pulse">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                    ⚠️ Coletiva de Imprensa Pendente
                  </h3>
                  <p className="text-orange-200">
                    📰 Complete sua entrevista para desbloquear os próximos projetos da temporada!
                  </p>
                </div>
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </div>
            </button>
          </motion.div>
        )}

        {/* Ranking de Fãs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-xl">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{career.fans.toLocaleString()} Fãs</h2>
                <p className="text-purple-200">{levelTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-white font-bold">{career.currentStreak} dias</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-white/10 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
            />
          </div>
          <p className="text-xs text-purple-300 mt-2">
            {nextThreshold - career.fans} fãs até o próximo nível
          </p>
        </motion.div>

        {/* Notificações */}
        {notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-3 mb-6"
          >
            {notifications.map((notif, index) => (
              <motion.button
                key={notif.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => notif.actionUrl && onNavigate(notif.actionUrl as any)}
                className={`${
                  notif.urgent 
                    ? 'bg-red-500/20 border-red-500/50 hover:bg-red-500/30' 
                    : 'bg-blue-500/20 border-blue-500/50 hover:bg-blue-500/30'
                } backdrop-blur-lg rounded-xl p-4 border flex items-start gap-3 w-full transition-all cursor-pointer`}
              >
                {notif.urgent && <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />}
                {!notif.urgent && <Bell className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />}
                <p className="text-white flex-1 text-left">{notif.message}</p>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Feedbacks Recentes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-400" />
            Últimos Feedbacks
          </h3>
          <div className="space-y-3">
            {recentEvaluations.map((evaluation) => (
              <button
                key={evaluation.id}
                onClick={() => onNavigate('estudio')}
                className="w-full bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 transition-all cursor-pointer text-left group"
              >
                <div className="flex gap-3">
                  {/* Foto do Professor */}
                  <img 
                    src={evaluation.avatarUrl} 
                    alt={evaluation.professor}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/30 flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-white">{evaluation.professor}</p>
                        <p className="text-xs text-purple-300 flex items-center gap-1">
                          <Music2 className="w-3 h-3" />
                          {evaluation.trackTitle}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                          evaluation.approved
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-orange-500/20 text-orange-400'
                        }`}
                      >
                        {evaluation.approved ? 'Aprovada' : 'Revisar'}
                      </span>
                    </div>
                    
                    {/* Preview do Feedback */}
                    <p className="text-purple-100 text-sm line-clamp-2">
                      {evaluation.feedback}
                    </p>
                    
                    {/* Call to Action */}
                    <div className="mt-2 flex items-center gap-2 text-xs text-purple-400 group-hover:text-purple-300 transition-colors">
                      <Clock className="w-3 h-3" />
                      <span>{evaluation.timestamp}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Atalhos Rápidos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden md:block"
        >
          <h3 className="text-xl font-bold text-white mb-4">Atalhos Rápidos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {shortcuts.map((shortcut, index) => (
              <motion.button
                key={shortcut.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(shortcut.view)}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all group"
              >
                <div className={`bg-gradient-to-br ${shortcut.color} p-3 rounded-xl w-fit mb-3 group-hover:scale-110 transition-transform`}>
                  <shortcut.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-white mb-1">{shortcut.label}</h4>
                <p className="text-sm text-purple-300">{shortcut.subtitle}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}