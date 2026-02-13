import React, { useState, useEffect } from 'react';
import { ArrowLeft, Music, CheckCircle, Lock, Star, FileText, Video, Headphones, Award, Play, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { useArtist } from './ArtistContext';
import { useStudyTrack } from './StudyTrackContext';
import MOCK_DATA from '../data/centralizedMocks';
import AppBar from './AppBar';

interface ProjetoFaixasProps {
  projectId: string;
  onBack: () => void;
  initialTrackId?: string; // ✅ Para deeplink direto para track específica
  onNavigateToStudio?: () => void; // ✅ Para navegar ao Estúdio após completar todas as faixas
}

// Ícones para cada tipo de faixa
const TRACK_TYPE_ICONS = {
  HARMONY: '🎸',
  RHYTHM: '🥁',
  MELODY: '🎵',
  TECHNIQUE: '🎤',
  INTERPRETATION: '🎭',
  SOLO: '✨',
};

const TRACK_TYPE_COLORS = {
  HARMONY: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
  RHYTHM: 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
  MELODY: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
  TECHNIQUE: 'from-green-500/20 to-green-600/20 border-green-500/30',
  INTERPRETATION: 'from-pink-500/20 to-pink-600/20 border-pink-500/30',
  SOLO: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
};

export default function ProjetoFaixas({ projectId, onBack, initialTrackId, onNavigateToStudio }: ProjetoFaixasProps) {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(initialTrackId || null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const { completeTrackScene, trackProgress } = useArtist();
  const { toggleStudyTrack, isStudyTrackCompleted, studentStudyTracks } = useStudyTrack();

  // ✅ Deeplink: Auto-scroll para track específica se initialTrackId foi passado
  useEffect(() => {
    if (initialTrackId && !selectedTrack) {
      setTimeout(() => {
        const element = document.getElementById(`track-${initialTrackId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('ring-4', 'ring-blue-500', 'ring-opacity-75');
          setTimeout(() => {
            element.classList.remove('ring-4', 'ring-blue-500', 'ring-opacity-75');
          }, 3000);
        }
      }, 300);
    }
  }, [initialTrackId]);

  const project = MOCK_DATA.projects.find(p => p.id === projectId);
  const projectTracks = MOCK_DATA.trackScenes.filter(t => t.projectId === projectId); // ✅ Não tracks

  if (!project) {
    return <div>Projeto não encontrado</div>;
  }

  // Se uma música está selecionada, mostrar suas faixas de estudo
  if (selectedTrack) {
    const track = projectTracks.find(t => t.id === selectedTrack);
    // ✅ Usar studyTracks com trackSceneId
    const trackLessons = MOCK_DATA.studyTracks?.filter(l => l.trackSceneId === selectedTrack) || [];
    
    if (!track) {
      return <div>Música não encontrada</div>;
    }

    // Usar o novo sistema de progresso
    const completedLessons = trackLessons.filter(lesson => 
      isStudyTrackCompleted(lesson.id)
    ).length;

    const totalLessons = trackLessons.length;
    const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
    const allLessonsCompleted = totalLessons > 0 && completedLessons === totalLessons;

    const handleCompleteLesson = (lessonId: string) => {
      toggleStudyTrack(lessonId, 'Faixa concluída!');
      setSelectedLesson(null); // Fechar o card
      
      // Rolar suavemente para o topo da lista
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    };

    const handleGoToStudio = () => {
      // Marca a música como completa
      completeTrackScene(track.id);
      // Navega para o Estúdio
      if (onNavigateToStudio) {
        onNavigateToStudio();
      }
    };

    return (
      <div className="min-h-screen pb-24 md:pb-8">
        <AppBar 
          onBack={() => setSelectedTrack(null)} 
          showBackButton 
          title="Faixas de Estudo" 
        />
        
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          {/* Header da Música */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 mb-6"
          >
            <h2 className="text-2xl font-bold text-white mb-1">{track.title}</h2>
            <p className="text-purple-300 mb-2">{track.artist}</p>
            <p className="text-purple-200 text-sm mb-4">{track.description}</p>
            
            <div className="bg-white/10 rounded-full h-3 overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
              />
            </div>
            <p className="text-sm text-purple-200">
              {completedLessons} de {totalLessons} faixas de estudo completas
            </p>
          </motion.div>

          {/* Botão para ir ao Estúdio - DESTAQUE NO TOPO */}
          {allLessonsCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400 rounded-xl p-5 shadow-lg shadow-green-500/20">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <p className="text-green-200 font-semibold text-base">Todas as faixas completas!</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoToStudio}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg text-base font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Ir para o Estúdio</span>
                  <span className="text-sm text-green-100">• +250 fãs</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Notas Técnicas Gerais */}
          {track.technicalNotes && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-6"
            >
              <h5 className="text-sm font-semibold text-orange-300 mb-2 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Notas Técnicas da Música
              </h5>
              <p className="text-sm text-orange-100 leading-relaxed">
                {track.technicalNotes}
              </p>
            </motion.div>
          )}

          {/* Lista de Faixas de Estudo */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white mb-3 px-1">Roteiro de Estudos</h3>
            {trackLessons.map((lesson, index) => {
              // Usar o novo sistema de progresso de StudyTrackContext
              const isCompleted = isStudyTrackCompleted(lesson.id);
              const isLocked = false; // Todas desbloqueadas para demonstração
              const isSelected = selectedLesson === lesson.id;
              
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white/5 backdrop-blur-md rounded-lg border transition-all ${
                    isLocked 
                      ? 'opacity-50 cursor-not-allowed border-white/10'
                      : isSelected
                      ? 'border-purple-500/50 bg-purple-500/10'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  {/* Lesson Header */}
                  <button
                    onClick={() => !isLocked && setSelectedLesson(isSelected ? null : lesson.id)}
                    disabled={isLocked}
                    className="w-full p-3 text-left"
                  >
                    <div className="flex items-center gap-3">
                      {/* Icon com tipo - compacto */}
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isCompleted
                          ? 'bg-green-500/20'
                          : isLocked
                          ? 'bg-gray-500/20'
                          : 'bg-gradient-to-br ' + TRACK_TYPE_COLORS[lesson.type]
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : isLocked ? (
                          <Lock className="w-5 h-5 text-gray-400" />
                        ) : (
                          <span className="text-xl">{TRACK_TYPE_ICONS[lesson.type]}</span>
                        )}
                      </div>

                      {/* Info - compacto */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-white truncate">{lesson.title}</h4>
                      </div>

                      {/* Status Badge - minimalista */}
                      <div className="flex-shrink-0">
                        {isCompleted ? (
                          <div className="w-6 h-6 rounded-full bg-green-500/30 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </div>
                        ) : isLocked ? (
                          <div className="w-6 h-6 rounded-full bg-gray-500/30 flex items-center justify-center">
                            <Lock className="w-4 h-4 text-gray-400" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Lesson Details (expandido) */}
                  {isSelected && !isLocked && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-3 pb-3 pt-0 border-t border-white/10"
                    >
                      <div className="space-y-3 mt-3">
                        {/* Notas Técnicas */}
                        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-3">
                          <h5 className="text-xs font-semibold text-white mb-1.5 flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5" />
                            O que você vai aprender
                          </h5>
                          <p className="text-xs text-white/90 leading-relaxed">
                            {lesson.description}
                          </p>
                        </div>

                        {/* Material de Apoio */}
                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                          <h5 className="text-xs font-semibold text-purple-300 mb-2 flex items-center gap-1.5">
                            <Headphones className="w-3.5 h-3.5" />
                            Material de Apoio
                          </h5>
                          <div className="space-y-1.5">
                            <button className="w-full bg-white/5 hover:bg-white/10 p-2 rounded-md text-left transition-colors flex items-center gap-2">
                              <Video className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-purple-200 text-xs font-medium truncate">Vídeo Aula - {lesson.title}</p>
                              </div>
                              <Play className="w-3.5 h-3.5 text-purple-400" />
                            </button>
                            
                            <button className="w-full bg-white/5 hover:bg-white/10 p-2 rounded-md text-left transition-colors flex items-center gap-2">
                              <Headphones className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-purple-200 text-xs font-medium truncate">Áudio - {track.title}</p>
                              </div>
                              <Play className="w-3.5 h-3.5 text-purple-400" />
                            </button>
                            
                            <button className="w-full bg-white/5 hover:bg-white/10 p-2 rounded-md text-left transition-colors flex items-center gap-2">
                              <FileText className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-purple-200 text-xs font-medium truncate">PDF - Partitura/Tablatura</p>
                              </div>
                              <Download className="w-3.5 h-3.5 text-purple-400" />
                            </button>
                          </div>
                        </div>

                        {/* Botão de Marcar como Estudada */}
                        {!isCompleted && (
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleCompleteLesson(lesson.id)}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Marcar como Estudada</span>
                            <span className="ml-1 bg-white/20 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              +120 fãs
                            </span>
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Letra da Música */}
          {track.lyrics && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
            >
              <h5 className="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Letra Completa
              </h5>
              <p className="text-sm text-blue-100 whitespace-pre-line leading-relaxed">
                {track.lyrics}
              </p>
            </motion.div>
          )}

          {/* Info sobre progresso */}
          {!allLessonsCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
            >
              <p className="text-blue-200 text-sm">
                💡 Complete todas as faixas ({completedLessons}/{totalLessons}) para desbloquear o Estúdio
              </p>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // Lista de músicas do projeto - calcular progresso real baseado nas study tracks
  const completedTracks = projectTracks.filter(track => {
    const trackLessons = MOCK_DATA.studyTracks?.filter(l => l.trackSceneId === track.id) || [];
    if (trackLessons.length === 0) return false;
    const allDone = trackLessons.every(lesson => isStudyTrackCompleted(lesson.id));
    if (allDone) return true;
    // Também considerar se foi completada no runtime via completeTrackScene
    const runtimeProgress = trackProgress.find(p => p.trackSceneId === track.id);
    return runtimeProgress?.completed === true && runtimeProgress?.completedAt != null;
  }).length;
  const totalTracks = projectTracks.length;
  const progressPercent = totalTracks > 0 ? (completedTracks / totalTracks) * 100 : 0;

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <AppBar 
        onBack={onBack} 
        showBackButton 
        title={(project.type === 'ALBUM' || project.type === 'MUSIC_ALBUM') ? 'Músicas do Álbum' : 'Cenas da Peça'} 
      />
      
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Header do Projeto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 mb-6"
        >
          <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
          <p className="text-purple-300 text-sm mb-1">{project.subtitle}</p>
          <p className="text-purple-200 mb-4">{project.description}</p>
          
          <div className="bg-white/10 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
            />
          </div>
          <p className="text-sm text-purple-200 mt-2">
            {completedTracks} de {totalTracks} {(project.type === 'ALBUM' || project.type === 'MUSIC_ALBUM') ? 'músicas' : 'cenas'} completas
          </p>
        </motion.div>

        {/* Lista de Músicas */}
        <div className="space-y-3">
          {projectTracks.map((track, index) => {
            const trackLessons = MOCK_DATA.studyTracks?.filter(l => l.trackSceneId === track.id) || [];
            
            // Calcular progresso das faixas de estudo
            const completedStudyTracks = trackLessons.filter(lesson => 
              isStudyTrackCompleted(lesson.id)
            ).length;
            const totalStudyTracks = trackLessons.length;
            const allStudyTracksCompleted = totalStudyTracks > 0 && completedStudyTracks === totalStudyTracks;
            
            // Verificar progresso real: completa somente se TODAS as study tracks foram concluídas
            // ou se foi marcada como completa via completeTrackScene (runtime)
            const runtimeProgress = trackProgress.find(p => p.trackSceneId === track.id);
            const wasCompletedAtRuntime = runtimeProgress?.completed && runtimeProgress?.completedAt != null;
            const isCompleted = allStudyTracksCompleted || (wasCompletedAtRuntime === true);
            
            // Verificar lock: desbloqueada se tem progresso no mock ou se é uma das primeiras faixas
            const studentProgressMock = MOCK_DATA.studentProgress?.find(p => p.trackSceneId === track.id);
            const isLocked = !(studentProgressMock?.unlocked !== false); // Bloqueada se não estiver explicitamente desbloqueada
            
            const handleGoToStudio = (e: React.MouseEvent) => {
              e.stopPropagation();
              // Marca a música como completa
              completeTrackScene(track.id);
              // Navega para o Estúdio
              if (onNavigateToStudio) {
                onNavigateToStudio();
              }
            };
            
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`w-full bg-white/5 backdrop-blur-lg rounded-xl border transition-all ${
                  isLocked 
                    ? 'opacity-50 cursor-not-allowed border-white/10'
                    : 'border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5'
                }`}
              >
                <button
                  onClick={() => !isLocked && setSelectedTrack(track.id)}
                  disabled={isLocked}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isCompleted
                        ? 'bg-green-500/20'
                        : isLocked
                        ? 'bg-gray-500/20'
                        : 'bg-purple-500/20'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : isLocked ? (
                        <Lock className="w-6 h-6 text-gray-400" />
                      ) : (
                        <Music className="w-6 h-6 text-purple-400" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-400 font-mono">#{track.order}</span>
                        <h4 className="font-semibold text-white truncate">{track.title}</h4>
                      </div>
                      <p className="text-sm text-purple-300 mb-1">{track.artist}</p>
                      <p className="text-xs text-gray-400 line-clamp-1">{track.description}</p>
                      {trackLessons.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-purple-400">Progresso</span>
                              <span className="text-purple-300 font-medium">
                                {completedStudyTracks}/{totalStudyTracks}
                              </span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                                style={{ width: `${(completedStudyTracks / totalStudyTracks) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Status Badge */}
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-medium">
                          ✓ Completa
                        </span>
                      ) : isLocked ? (
                        <span className="text-xs bg-gray-500/20 text-gray-400 px-3 py-1 rounded-full">
                          🔒 Bloqueada
                        </span>
                      ) : (
                        <span className="text-xs bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full">
                          Estudar →
                        </span>
                      )}
                    </div>
                  </div>
                </button>
                
                {/* Botão para ir ao Estúdio */}
                {!isCompleted && !isLocked && totalStudyTracks > 0 && (
                  <div className="px-4 pb-4">
                    {allStudyTracksCompleted ? (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleGoToStudio}
                          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg text-sm font-semibold hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/30"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Ir para o Estúdio Gravar Demo</span>
                          <span className="ml-1 bg-white/20 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            +250 fãs
                          </span>
                        </motion.button>
                        <p className="text-xs text-center text-green-300 mt-2">
                          🎉 Parabéns! Todas as faixas completas. Hora de gravar!
                        </p>
                      </>
                    ) : (
                      <>
                        <button
                          disabled
                          className="w-full bg-gray-600/30 text-gray-400 py-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
                        >
                          <Lock className="w-4 h-4" />
                          <span>Complete todas as faixas primeiro</span>
                        </button>
                        <p className="text-xs text-center text-gray-400 mt-2">
                          Progresso: {completedStudyTracks}/{totalStudyTracks} faixas completas
                        </p>
                      </>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Info sobre o fluxo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
        >
          <p className="text-blue-200 text-sm">
            💡 <strong>Como funciona:</strong> Cada música é dividida em faixas de estudo pedagógicas 
            (Harmonia, Ritmo, Melodia, Técnica, Interpretação, etc.). Complete todas as faixas e depois 
            grave a performance completa no Estúdio!
          </p>
        </motion.div>
      </div>
    </div>
  );
}