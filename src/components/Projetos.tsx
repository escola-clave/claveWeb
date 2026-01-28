import React, { useState, useEffect } from 'react';
import { ArrowLeft, Music, Calendar, Album, Lock, CheckCircle, Theater, Guitar, ChevronRight, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useArtist } from './ArtistContext';
import MOCK_DATA from '../data/centralizedMocks';
import AppBar from './AppBar';
import ProjetoFaixas from './ProjetoFaixas';

interface ProjetosProps {
  onBack: () => void;
  onNavigate: (view: 'imprensa' | 'estudio', params?: any) => void;
  initialProjectId?: string; // ✅ Para deeplink de notificação
  initialTrackId?: string; // ✅ Para deeplink direto para track
}

export default function Projetos({ onBack, onNavigate, initialProjectId, initialTrackId }: ProjetosProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(initialProjectId || null);
  const { trackProgress } = useArtist();

  // ✅ Deeplink: Se initialProjectId foi passado, abrir projeto automaticamente
  useEffect(() => {
    if (initialProjectId && !selectedProjectId) {
      setSelectedProjectId(initialProjectId);
    }
  }, [initialProjectId]);

  // Se um projeto foi selecionado, mostrar a tela de faixas
  if (selectedProjectId) {
    return (
      <ProjetoFaixas 
        projectId={selectedProjectId}
        initialTrackId={initialTrackId} // ✅ Passar trackId para ProjetoFaixas
        onBack={() => setSelectedProjectId(null)}
        onNavigateToStudio={() => onNavigate('estudio')} // ✅ Navega direto para o Estúdio
      />
    );
  }

  // Organizar projetos: Ativos primeiro, depois Upcoming, depois Completed
  const sortedProjects = [...MOCK_DATA.projects].sort((a, b) => {
    const order = { 'ACTIVE': 1, 'UPCOMING': 2, 'COMPLETED': 3 };
    return order[a.status] - order[b.status];
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'from-green-500 to-emerald-500';
      case 'COMPLETED': return 'from-blue-500 to-cyan-500';
      case 'UPCOMING': return 'from-gray-500 to-slate-500';
      default: return 'from-purple-500 to-pink-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'Em Andamento';
      case 'COMPLETED': return 'Concluído';
      case 'UPCOMING': return 'Em Breve';
      default: return status;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric' }).format(date);
  };

  const getProjectProgress = (projectId: string) => {
    const projectTracks = MOCK_DATA.trackScenes.filter(t => t.projectId === projectId); // ✅ Não tracks
    const completedTracks = trackProgress.filter(p => 
      projectTracks.some(t => t.id === p.trackSceneId) && p.status === 'COMPLETED'
    ).length;
    const total = projectTracks.length;
    return { completed: completedTracks, total, percent: total > 0 ? (completedTracks / total) * 100 : 0 };
  };

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <AppBar onBack={onBack} showBackButton title="Projetos da Temporada" />
      
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Projetos da Temporada
          </h1>
          <p className="text-purple-300">
            Desenvolva suas habilidades através de projetos musicais e teatrais
          </p>
        </motion.div>

        {/* Lista de Projetos */}
        <div className="space-y-4">
          {sortedProjects.map((project, index) => {
            const progress = getProjectProgress(project.id);
            const tracksCount = MOCK_DATA.trackScenes.filter(t => t.projectId === project.id).length; // ✅ Não tracks
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => project.status !== 'UPCOMING' && setSelectedProjectId(project.id)}
                className={`relative overflow-hidden rounded-2xl transition-all ${
                  project.status === 'UPCOMING'
                    ? 'cursor-not-allowed opacity-60'
                    : 'cursor-pointer hover:ring-2 hover:ring-purple-500 hover:shadow-lg hover:shadow-purple-500/30'
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={project.coverUrl || project.coverImage} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative p-6 md:flex md:items-center md:gap-6">
                  {/* Left Side - Icon & Basic Info */}
                  <div className="flex items-start gap-4 md:flex-1">
                    {/* Project Icon */}
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-xl flex-shrink-0">
                      {project.type === 'ALBUM' ? (
                        <Guitar className="w-8 h-8 text-white" />
                      ) : (
                        <Theater className="w-8 h-8 text-white" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      {/* Status Badge */}
                      <div className="mb-2">
                        <span className={`inline-block text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getStatusColor(project.status)} text-white font-semibold`}>
                          {getStatusLabel(project.status)}
                        </span>
                      </div>

                      {/* Title & Type */}
                      <h2 className="text-2xl font-bold text-white mb-1">
                        {project.title}
                      </h2>
                      {project.subtitle && (
                        <p className="text-purple-200 text-sm mb-1">{project.subtitle}</p>
                      )}
                      <p className="text-purple-300 text-sm mb-2">
                        {project.type === 'ALBUM' ? '🎵 Álbum Musical' : '🎭 Peça Teatral'} · {tracksCount} {project.type === 'ALBUM' ? 'faixas' : 'cenas'}
                      </p>
                      
                      {/* Description */}
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Dates */}
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Progress & Action */}
                  <div className="mt-4 md:mt-0 md:w-64 flex-shrink-0">
                    {project.status === 'ACTIVE' && (
                      <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-white font-medium">Progresso</span>
                          <span className="text-sm text-purple-300">
                            {progress.completed}/{progress.total}
                          </span>
                        </div>
                        <div className="bg-white/10 rounded-full h-2 overflow-hidden mb-3">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress.percent}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {progress.percent.toFixed(0)}% completo
                          </span>
                          <ChevronRight className="w-4 h-4 text-purple-400" />
                        </div>
                      </div>
                    )}

                    {project.status === 'COMPLETED' && (
                      <div className="bg-blue-500/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/50">
                        <div className="flex items-center gap-2 text-blue-200 mb-2">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-semibold">Concluído!</span>
                        </div>
                        <p className="text-xs text-blue-300">
                          Projeto finalizado com sucesso
                        </p>
                        <div className="flex items-center justify-end mt-2">
                          <ChevronRight className="w-4 h-4 text-blue-400" />
                        </div>
                      </div>
                    )}

                    {project.status === 'UPCOMING' && (
                      <div className="bg-gray-500/20 backdrop-blur-sm rounded-xl p-4 border border-gray-500/50">
                        <div className="flex items-center gap-2 text-gray-300 mb-2">
                          <Lock className="w-5 h-5" />
                          <span className="font-semibold">Bloqueado</span>
                        </div>
                        <p className="text-xs text-gray-400">
                          Disponível em {formatDate(project.startDate)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Highlight for Active Projects */}
                {project.status === 'ACTIVE' && (
                  <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-green-500 to-emerald-500" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
        >
          <div className="flex gap-3">
            <Star className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-200 text-sm font-medium mb-1">
                Como funciona?
              </p>
              <p className="text-blue-300 text-xs leading-relaxed">
                Estude cada faixa/cena do projeto para ganhar fãs. Após completar todas, 
                grave sua performance no <strong>Estúdio</strong> e envie para avaliação do professor!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
