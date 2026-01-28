import React from 'react';
import { Trophy, Crown, Album, Radio, Mic, TrendingUp, Sparkles, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from './AuthContext';
import { useArtist } from './ArtistContext';
import { MOCK_RANKING, MOCK_ACHIEVEMENTS } from '../data/mockData';
import AppBar from './AppBar';

interface SocialProps {
  onBack?: () => void;
}

export default function Social({ onBack }: SocialProps) {
  const { user, studentProfile } = useAuth();
  const { career } = useArtist();

  // Encontrar posição do usuário no ranking
  const userRank = MOCK_RANKING.find(r => r.userId === user?.id) || {
    userId: user?.id || '',
    artistName: studentProfile?.stageName || user?.name || '',
    avatarUrl: studentProfile?.avatarUrl || '',
    fans: career.fans,
    rank: 2,
    levelTitle: 'Barzinho & Cover'
  };

  // Calcular progresso da temporada (dados mockados)
  const totalTracks = 12; // Mock: 12 faixas no álbum
  const completedTracks = 7; // Mock: 7 concluídas
  const trackProgress = totalTracks > 0 ? (completedTracks / totalTracks) * 100 : 0;

  const totalDays = 30; // Mock: 30 dias na temporada
  const completedDays = career.currentStreak;
  const routineProgress = (completedDays / totalDays) * 100;

  const totalDemos = 12; // Mock: espera-se 12 demos
  const submittedDemos = 5; // Mock: 5 enviadas
  const demosProgress = (submittedDemos / totalDemos) * 100;

  // Conquistas recentes (últimas 6)
  const recentAchievements = [...MOCK_ACHIEVEMENTS]
    .filter(a => a.unlocked && a.unlockedAt) // Apenas achievements desbloqueadas com data
    .sort((a, b) => (b.unlockedAt?.getTime() || 0) - (a.unlockedAt?.getTime() || 0))
    .slice(0, 6);

  const rarityColors = {
    BRONZE: 'from-orange-700 to-orange-800',
    SILVER: 'from-gray-400 to-gray-500',
    GOLD: 'from-yellow-500 to-yellow-600',
    PLATINUM: 'from-cyan-400 to-blue-500'
  };

  const rarityBorders = {
    BRONZE: 'border-orange-500/50',
    SILVER: 'border-gray-400/50',
    GOLD: 'border-yellow-500/50',
    PLATINUM: 'border-cyan-400/50'
  };

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <AppBar onBack={onBack} showBackButton={!!onBack} title="Social" />
      
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna 1: Ranking de Fãs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-xl">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Ranking de Fãs</h2>
                  <p className="text-sm text-purple-300">Top 5 da turma</p>
                </div>
              </div>

              <div className="space-y-3">
                {MOCK_RANKING.map((entry, index) => {
                  const isCurrentUser = entry.userId === user?.id;
                  
                  return (
                    <motion.div
                      key={entry.userId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className={`flex items-center gap-3 p-3 rounded-xl ${
                        isCurrentUser 
                          ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-2 border-purple-400/50' 
                          : 'bg-white/5 border border-white/10'
                      }`}
                    >
                      {/* Rank Badge */}
                      <div className="relative">
                        {entry.rank === 1 && (
                          <Crown className="absolute -top-2 -left-2 w-5 h-5 text-yellow-400" />
                        )}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                            entry.rank === 1
                              ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                              : entry.rank === 2
                              ? 'bg-gradient-to-br from-gray-300 to-gray-400'
                              : entry.rank === 3
                              ? 'bg-gradient-to-br from-orange-400 to-orange-600'
                              : 'bg-white/10'
                          }`}
                        >
                          {entry.rank}
                        </div>
                      </div>

                      {/* Avatar */}
                      {entry.avatarUrl ? (
                        <img
                          src={entry.avatarUrl}
                          alt={entry.artistName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/30"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                          {entry.artistName.charAt(0)}
                        </div>
                      )}

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white truncate">
                          {entry.artistName}
                          {isCurrentUser && <span className="text-purple-300 ml-1">(Você)</span>}
                        </p>
                        <p className="text-xs text-purple-300">{entry.levelTitle}</p>
                      </div>

                      {/* Fans */}
                      <div className="text-right">
                        <p className="font-bold text-white">{entry.fans.toLocaleString()}</p>
                        <p className="text-xs text-purple-300">fãs</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Coluna 2: Progresso da Temporada + Conquistas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Progresso da Temporada */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-3 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Progresso da Temporada</h2>
                  <p className="text-sm text-purple-300">Semestre 2025.1</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Álbum/Peça */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <Album className="w-5 h-5 text-purple-400" />
                      <span className="font-semibold text-white">Álbum: Bossa & Soul</span>
                    </div>
                    <span className="text-sm text-purple-300">
                      {completedTracks}/{totalTracks} faixas
                    </span>
                  </div>
                  <div className="bg-white/10 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${trackProgress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
                    />
                  </div>
                  <p className="text-xs text-purple-300 mt-1">{Math.round(trackProgress)}% completo</p>
                </div>

                {/* Rotina Diária */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <Radio className="w-5 h-5 text-orange-400" />
                      <span className="font-semibold text-white">Rotina Diária</span>
                    </div>
                    <span className="text-sm text-purple-300">
                      {completedDays}/{totalDays} dias
                    </span>
                  </div>
                  <div className="bg-white/10 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${routineProgress}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full"
                    />
                  </div>
                  <p className="text-xs text-purple-300 mt-1">{Math.round(routineProgress)}% completo</p>
                </div>

                {/* Demos Enviadas */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <Mic className="w-5 h-5 text-pink-400" />
                      <span className="font-semibold text-white">Demos Enviadas</span>
                    </div>
                    <span className="text-sm text-purple-300">
                      {submittedDemos}/{totalDemos} demos
                    </span>
                  </div>
                  <div className="bg-white/10 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${demosProgress}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                      className="bg-gradient-to-r from-pink-500 to-rose-500 h-full rounded-full"
                    />
                  </div>
                  <p className="text-xs text-purple-300 mt-1">{Math.round(demosProgress)}% completo</p>
                </div>
              </div>
            </div>

            {/* Conquistas Recentes */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-3 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Conquistas Recentes</h2>
                  <p className="text-sm text-purple-300">{MOCK_ACHIEVEMENTS.length} desbloqueadas</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {recentAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className={`bg-gradient-to-br ${rarityColors[achievement.tier]} p-4 rounded-xl border-2 ${rarityBorders[achievement.tier]} relative overflow-hidden group hover:scale-105 transition-transform`}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative">
                      <div className="text-4xl mb-2">{achievement.iconUrl || achievement.icon}</div>
                      <h3 className="font-bold text-white text-sm mb-1">{achievement.title}</h3>
                      <p className="text-xs text-white/80 line-clamp-2">{achievement.description}</p>
                      
                      {/* Tier badge */}
                      <div className="mt-2 inline-block">
                        <span className="text-xs font-bold text-white/90 uppercase tracking-wider">
                          {achievement.tier === 'BRONZE' && '🥉 Bronze'}
                          {achievement.tier === 'SILVER' && '🥈 Prata'}
                          {achievement.tier === 'GOLD' && '🥇 Ouro'}
                          {achievement.tier === 'PLATINUM' && '💎 Platina'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}