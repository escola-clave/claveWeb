import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useArtist } from './ArtistContext';
import { ArrowLeft, TrendingUp, Trophy, Flame, Star, Award, Music, Mic, CheckCircle, Music2, Tag, User } from 'lucide-react';
import { motion } from 'motion/react';
import MOCK_DATA, { CURRENT_STUDENT_PROFILE } from '../data/centralizedMocks';
import AppBar from './AppBar';

interface CarreiraProps {
  onBack: () => void;
  highlightAchievementId?: string; // ✅ Para deeplink de notificação
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

export default function Carreira({ onBack }: CarreiraProps) {
  const { user, studentProfile } = useAuth();
  const { career, tour, fanTransactions } = useArtist();

  // ✅ Detectar tipo de curso para labels dinâmicos
  const courseType = user?.courseId?.includes('music') || user?.courseId?.includes('course-1') ? 'MUSIC' : 'THEATER';
  const specializationLabel = courseType === 'MUSIC' ? 'Instrumento' : 'Especialização';
  const genresLabel = courseType === 'MUSIC' ? 'Estilos Musicais' : 'Gêneros Teatrais';

  // Calcular estatísticas primeiro - ✅ ATUALIZADO
  const completedTracks = MOCK_DATA.studentProgress.filter(p => p.completed && p.studentId === user?.id).length;
  const submittedDemos = MOCK_DATA.submissions.filter(s => s.studentId === user?.id).length;
  const approvedDemos = MOCK_DATA.submissions.filter(s => s.studentId === user?.id && s.status === 'APPROVED').length;
  const avgRating = MOCK_DATA.reviews
    .filter(r => {
      const submission = MOCK_DATA.submissions.find(s => s.id === r.submissionId && s.studentId === user?.id);
      return submission && r.rating;
    })
    .reduce((acc, r, _, arr) => acc + (r.rating || 0) / arr.length, 0);

  const conquistas = [
    {
      id: 1,
      titulo: 'Primeira Performance',
      descricao: 'Enviou sua primeira demo ao estúdio',
      icone: Mic,
      conquistada: submittedDemos > 0,
      data: submittedDemos > 0 ? new Date(MOCK_DATA.submissions[0].createdAt).toLocaleDateString('pt-BR') : null // ✅ Não demos, não submittedAt
    },
    {
      id: 2,
      titulo: 'Semana Completa',
      descricao: 'Completou 7 dias consecutivos de turnê',
      icone: Flame,
      conquistada: career.currentStreak >= 7,
      data: career.currentStreak >= 7 ? new Date().toLocaleDateString('pt-BR') : null
    },
    {
      id: 3,
      titulo: 'Banda de Garagem',
      descricao: 'Alcançou 500 fãs',
      icone: Music,
      conquistada: career.fans >= 500,
      data: career.fans >= 500 ? new Date(career.createdAt).toLocaleDateString('pt-BR') : null
    },
    {
      id: 4,
      titulo: 'Barzinho & Cover',
      descricao: 'Alcançou 2.000 fãs',
      icone: Star,
      conquistada: career.fans >= 2000,
      data: career.fans >= 2000 ? new Date().toLocaleDateString('pt-BR') : null
    },
    {
      id: 5,
      titulo: 'Palco Principal',
      descricao: 'Alcance 5.000 fãs',
      icone: Trophy,
      conquistada: career.fans >= 5000,
      data: null
    }
  ];

  // Simular turnê da semana
  const today = new Date().getDay();
  const turneDias = [
    { dia: 'Seg', completo: career.currentStreak >= 1 },
    { dia: 'Ter', completo: career.currentStreak >= 2 },
    { dia: 'Qua', completo: career.currentStreak >= 3 },
    { dia: 'Qui', completo: career.currentStreak >= 4 },
    { dia: 'Sex', completo: career.currentStreak >= 5 },
    { dia: 'Sab', completo: career.currentStreak >= 6 },
    { dia: 'Dom', completo: career.currentStreak >= 7 }
  ];

  const estatisticas = [
    { label: 'Faixas Concluídas', valor: completedTracks, icone: CheckCircle, cor: 'from-blue-500 to-cyan-500' },
    { label: 'Demos Enviadas', valor: submittedDemos, icone: Mic, cor: 'from-purple-500 to-pink-500' },
    { label: 'Demos Aprovadas', valor: approvedDemos, icone: Star, cor: 'from-green-500 to-emerald-500' },
    { label: 'Média de Notas', valor: avgRating > 0 ? avgRating.toFixed(1) : '-', icone: Trophy, cor: 'from-yellow-500 to-orange-500' },
    { label: 'Dias em Turnê', valor: career.currentStreak, icone: Flame, cor: 'from-orange-500 to-red-500' },
    { label: 'Total de Fãs', valor: career.fans, icone: Trophy, cor: 'from-yellow-500 to-orange-500' }
  ];

  const levelTitle = getLevelTitle(career.fans);
  const nextThreshold = getNextLevelThreshold(career.fans);
  const currentLevelMin = nextThreshold === 500 ? 0 : nextThreshold === 2000 ? 500 : nextThreshold === 5000 ? 2000 : 5000;
  const progressInLevel = career.fans - currentLevelMin;
  const levelRange = nextThreshold - currentLevelMin;
  const progressPercent = (progressInLevel / levelRange) * 100;

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <AppBar onBack={onBack} showBackButton title="Carreira" />
      
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Perfil do Artista */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 mb-6"
        >
          <div className="flex items-start gap-4 mb-6">
            {/* Ícone do Perfil */}
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg border-4 border-purple-500/50">
              <Music className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">{studentProfile?.stageName || user?.name}</h2>
              <p className="text-purple-200 mb-3">{levelTitle}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-semibold">{career.fans.toLocaleString()} fãs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <span className="text-white font-semibold">{career.currentStreak} dias</span>
                </div>
              </div>
            </div>
          </div>

          {/* Informações do Perfil do Aluno */}
          {CURRENT_STUDENT_PROFILE.bio && (
            <div className="mb-6 p-4 bg-white/5 rounded-xl">
              <p className="text-purple-100 text-sm leading-relaxed">
                {CURRENT_STUDENT_PROFILE.bio}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Especialização (Instrumento/Teatro) */}
            {CURRENT_STUDENT_PROFILE.specialization && (
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
                  <Music2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-purple-300">{specializationLabel}</p>
                  <p className="text-white font-semibold">{CURRENT_STUDENT_PROFILE.specialization}</p>
                </div>
              </div>
            )}

            {/* Gêneros (Estilos Musicais/Teatrais) */}
            {CURRENT_STUDENT_PROFILE.genres && CURRENT_STUDENT_PROFILE.genres.length > 0 && (
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <div className="bg-gradient-to-br from-pink-500 to-purple-500 p-2 rounded-lg">
                  <Tag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-purple-300">{genresLabel}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {CURRENT_STUDENT_PROFILE.genres.map((genre, idx) => (
                      <span key={idx} className="text-xs bg-purple-500/30 text-purple-100 px-2 py-1 rounded-full">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Barra de Progresso para Próximo Nível */}
          <div>
            <div className="flex justify-between text-sm text-purple-200 mb-2">
              <span>Progresso para o próximo nível</span>
              <span>{career.fans} / {nextThreshold}</span>
            </div>
            <div className="bg-white/10 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Estatísticas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {estatisticas.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10"
              >
                <div className={`bg-gradient-to-br ${stat.cor} p-2 rounded-lg w-fit mb-3`}>
                  <stat.icone className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.valor}</div>
                <div className="text-xs text-purple-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Turnê da Semana */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-400" />
            Turnê Atual
          </h3>
          <div className="flex justify-between gap-2">
            {turneDias.map((dia, index) => (
              <div key={index} className="flex-1 text-center">
                <div className={`w-full aspect-square rounded-lg mb-2 flex items-center justify-center font-bold ${
                  dia.completo
                    ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white'
                    : 'bg-white/5 text-purple-400'
                }`}>
                  {dia.completo ? '✓' : dia.dia.charAt(0)}
                </div>
                <span className="text-xs text-purple-300">{dia.dia}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-purple-300 mt-4 text-center">
            {career.currentStreak} dias consecutivos • Continue aparecendo para manter sua turnê ativa!
          </p>
        </motion.div>

        {/* Conquistas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-400" />
            Conquistas
          </h3>
          <div className="space-y-3">
            {conquistas.map((conquista, index) => (
              <motion.div
                key={conquista.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`rounded-xl p-4 border flex items-center gap-4 ${
                  conquista.conquistada
                    ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30'
                    : 'bg-white/5 border-white/10 opacity-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  conquista.conquistada
                    ? 'bg-gradient-to-br from-yellow-500 to-orange-500'
                    : 'bg-white/5'
                }`}>
                  <conquista.icone className={`w-6 h-6 ${
                    conquista.conquistada ? 'text-white' : 'text-purple-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">{conquista.titulo}</h4>
                  <p className="text-sm text-purple-300">{conquista.descricao}</p>
                  {conquista.conquistada && conquista.data && (
                    <p className="text-xs text-yellow-400 mt-1">Conquistada em {conquista.data}</p>
                  )}
                </div>
                {conquista.conquistada && (
                  <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                    Desbloqueada
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Atividades Recentes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-6 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            Atividades Recentes
          </h3>
          <div className="space-y-2">
            {MOCK_DATA.fanTransactions
              .filter(t => t.userId === user?.id)
              .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
              .slice(0, 8)
              .map((transaction, index) => {
                const getIcon = () => {
                  if (transaction.eventType.includes('ROUTINE')) return '🎯';
                  if (transaction.eventType.includes('DEMO')) return '🎤';
                  if (transaction.eventType.includes('ACHIEVEMENT')) return '🏆';
                  if (transaction.eventType.includes('QUIZ')) return '📰';
                  if (transaction.eventType.includes('TOUR')) return '🚐';
                  if (transaction.eventType.includes('LEVEL')) return '⭐';
                  return '✨';
                };

                const timeAgo = (date: Date) => {
                  const now = new Date();
                  const diffInMs = now.getTime() - date.getTime();
                  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
                  const diffInDays = Math.floor(diffInHours / 24);
                  
                  if (diffInDays > 0) return `há ${diffInDays} dia${diffInDays > 1 ? 's' : ''}`;
                  if (diffInHours > 0) return `há ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
                  return 'agora há pouco';
                };

                return (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + index * 0.05 }}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <span className="text-2xl">{getIcon()}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-purple-200 text-sm font-medium">{transaction.description}</p>
                      <p className="text-xs text-purple-400">{timeAgo(transaction.createdAt)}</p>
                    </div>
                    <span className="font-semibold text-green-400 flex-shrink-0">
                      +{transaction.fans}
                    </span>
                  </motion.div>
                );
              })}
          </div>
          {MOCK_DATA.fanTransactions.filter(t => t.userId === user?.id).length === 0 && (
            <p className="text-center text-purple-400 py-8">
              Nenhuma atividade ainda. Complete rotinas e envie demos para começar!
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}