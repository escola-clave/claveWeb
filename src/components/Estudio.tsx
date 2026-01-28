import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import { useArtist } from './ArtistContext';
import { ArrowLeft, Mic, Play, Upload, Star, MessageCircle, CheckCircle, AlertCircle, StopCircle, XCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AppBar from './AppBar';
import { ApiService } from '../services/api.service';
import type { Submission, Review } from '../data/types';
import MOCK_DATA from '../data/centralizedMocks';
import { SubmissionStatus } from '../data/types';

interface EstudioProps {
  onBack: () => void;
  onNavigateToPress: () => void;
  initialSubmissionId?: string; // ✅ Para deeplink de notificação
  highlightReviewId?: string; // ✅ Para destacar review específica
}

type View = 'home' | 'gravar' | 'feedback';

export default function Estudio({ onBack, onNavigateToPress, initialSubmissionId, highlightReviewId }: EstudioProps) {
  const { submitDemo, addFans } = useArtist();
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ Deeplink: Auto-navegar para feedback se initialSubmissionId foi passado
  useEffect(() => {
    if (initialSubmissionId && currentView === 'home') {
      setSelectedSubmission(initialSubmissionId);
      setCurrentView('feedback');
    }
  }, [initialSubmissionId]);

  // ✅ Deeplink: Highlight submission quando chegar na lista
  useEffect(() => {
    if (initialSubmissionId && currentView === 'feedback') {
      setTimeout(() => {
        const element = document.getElementById(`submission-${initialSubmissionId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('ring-4', 'ring-yellow-500', 'ring-opacity-75');
          setTimeout(() => {
            element.classList.remove('ring-4', 'ring-yellow-500', 'ring-opacity-75');
          }, 3000);
        }
      }, 300);
    }
  }, [initialSubmissionId, currentView]);

  // Buscar submissions reais dos mocks
  const userSubmissions = MOCK_DATA.submissions
    .filter(s => s.studentId === user?.id)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .map(submission => {
      const trackScene = MOCK_DATA.trackScenes.find(t => t.id === submission.trackSceneId);
      const project = trackScene ? MOCK_DATA.projects.find(p => p.id === trackScene.projectId) : null;
      const review = MOCK_DATA.reviews.find(r => r.submissionId === submission.id);
      
      return {
        id: submission.id,
        projeto: project?.title || 'Projeto',
        faixa: trackScene?.title || 'Música',
        artist: trackScene?.artist,
        dataEnvio: submission.createdAt.toLocaleDateString('pt-BR'),
        status: submission.status === SubmissionStatus.APPROVED ? 'avaliada' : 
                submission.status === SubmissionStatus.REJECTED ? 'reprovada' : 
                submission.status === SubmissionStatus.PENDING_REVIEW ? 'pendente' : 'avaliada',
        tipo: review?.approved ? 'positive' : review?.approved === false ? 'constructive' : null,
        feedback: review?.feedback || null,
        technicalNotes: review?.technicalNotes,
        professor: review?.teacherName || null,
        rating: review?.rating,
        fans: review?.approved ? 300 : 0,
        pressUnlocked: submission.pressUnlocked,
        attemptNumber: submission.attemptNumber,
        notes: submission.notes,
      };
    });

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    const interval = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    
    intervalRef.current = interval;
  };

  const handleStopRecording = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRecording(false);
    setHasRecording(true);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitDemo = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      // Simular arquivo de áudio (em produção seria o arquivo real gravado)
      const mockAudioFile = null; // TODO: implementar gravação real
      
      // Submeter para API
      const response = await ApiService.submitDemo(
        'track-mpb-1', // TODO: pegar trackSceneId do contexto
        mockAudioFile,
        'Gravação realizada no estúdio virtual'
      );
      
      if (response.success) {
        // Mostrar feedback de sucesso
        setSubmitSuccess(true);
        
        // Atualizar fãs no contexto
        addFans({
          type: 'SUBMISSION_CREATED',
          fans: response.data.rewards.fans,
          description: response.data.rewards.message,
        });
        
        // Chamar método antigo do context também
        submitDemo();
        
        // Aguardar animação de sucesso antes de voltar
        setTimeout(() => {
          setCurrentView('home');
          setHasRecording(false);
          setRecordingTime(0);
          setSubmitSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Erro ao enviar demo:', error);
      alert('Erro ao enviar demo. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderHome = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Botão Gravar Nova Performance */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setCurrentView('gravar')}
        className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white p-6 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-500/30"
      >
        <Mic className="w-8 h-8" />
        <div className="text-left">
          <div className="font-bold text-lg">Gravar Nova Performance</div>
          <div className="text-sm text-red-100">Envie sua demo para avaliação</div>
        </div>
      </motion.button>

      {/* Lista de Submissions */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Histórico de Gravações</h3>
        <div className="space-y-3">
          {userSubmissions.map((sub, index) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              onClick={() => {
                if (sub.status === 'avaliada' || sub.status === 'reprovada') {
                  setSelectedSubmission(sub.id);
                  setCurrentView('feedback');
                }
              }}
              className={`bg-white/5 backdrop-blur-lg rounded-xl p-4 border transition-all ${
                sub.status === 'avaliada' || sub.status === 'reprovada'
                  ? 'border-white/10 hover:border-white/30 cursor-pointer'
                  : 'border-yellow-500/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  sub.status === 'pendente'
                    ? 'bg-yellow-500/20'
                    : sub.tipo === 'positive'
                    ? 'bg-green-500/20'
                    : 'bg-orange-500/20'
                }`}>
                  {sub.status === 'pendente' ? (
                    <AlertCircle className="w-6 h-6 text-yellow-400" />
                  ) : sub.tipo === 'positive' ? (
                    <Star className="w-6 h-6 text-green-400" />
                  ) : (
                    <MessageCircle className="w-6 h-6 text-orange-400" />
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">{sub.faixa}</h4>
                  <p className="text-sm text-purple-300">{sub.artist}</p>
                  <p className="text-xs text-purple-400 mb-2">{sub.projeto}</p>
                  <div className="flex items-center gap-3 text-xs text-purple-400">
                    <span>{sub.dataEnvio}</span>
                    {sub.status === 'avaliada' && (
                      <>
                        <span>•</span>
                        <span>+{sub.fans} fãs</span>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  {sub.status === 'pendente' ? (
                    <span className="text-xs bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Aguardando
                    </span>
                  ) : sub.status === 'reprovada' ? (
                    <span className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full flex items-center gap-1">
                      <XCircle className="w-3 h-3" />
                      Reprovada
                    </span>
                  ) : sub.tipo === 'positive' ? (
                    <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Aprovada
                    </span>
                  ) : (
                    <span className="text-xs bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      Construtivo
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
        <p className="text-blue-200 text-sm">
          💡 Após enviar sua demo, o produtor irá avaliar e deixar comentários. 
          Feedbacks positivos liberam a Coletiva de Imprensa!
        </p>
      </div>
    </motion.div>
  );

  const renderGravar = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Mic className="w-7 h-7 text-red-500" />
          Gravar Performance
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-purple-200 mb-2">
            Selecione a Faixa
          </label>
          <select className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>Mas Que Nada - Jorge Ben Jor</option>
            <option>Águas de Março - Tom Jobim</option>
          </select>
        </div>

        {/* Área de Gravação */}
        <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border-2 border-dashed border-red-500/30 rounded-xl p-12 text-center mb-6">
          {!isRecording && !hasRecording && (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleStartRecording}
                className="bg-gradient-to-br from-red-600 to-pink-600 p-8 rounded-full mx-auto mb-4 hover:from-red-700 hover:to-pink-700 transition-all shadow-lg shadow-red-500/30"
              >
                <Mic className="w-12 h-12 text-white" />
              </motion.button>
              <p className="text-white font-semibold">Clique para começar a gravar</p>
              <p className="text-purple-300 text-sm mt-2">Certifique-se de estar em um ambiente silencioso</p>
            </motion.div>
          )}

          {isRecording && (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="space-y-4"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="bg-red-600 p-8 rounded-full mx-auto mb-4"
              >
                <Mic className="w-12 h-12 text-white" />
              </motion.div>
              <p className="text-white font-semibold text-2xl mb-2">Gravando...</p>
              <p className="text-red-400 text-lg mb-4">{formatTime(recordingTime)}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStopRecording}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-all font-semibold flex items-center gap-2 mx-auto"
              >
                <StopCircle className="w-5 h-5" />
                Parar Gravação
              </motion.button>
            </motion.div>
          )}

          {hasRecording && !isRecording && (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <div className="bg-green-500/20 p-8 rounded-full mx-auto mb-4 border border-green-500/50">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
              </div>
              <p className="text-white font-semibold mb-2">Gravação concluída!</p>
              <p className="text-purple-300 text-sm">Duração: {formatTime(recordingTime)}</p>
              
              <div className="flex gap-3 justify-center mt-6">
                <button
                  onClick={() => {
                    setHasRecording(false);
                    setRecordingTime(0);
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-all"
                >
                  Gravar Novamente
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-all flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Ouvir
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {hasRecording && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleSubmitDemo}
              disabled={isSubmitting || submitSuccess}
              className={`w-full py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                submitSuccess 
                  ? 'bg-green-600 text-white cursor-default'
                  : isSubmitting
                  ? 'bg-gray-600 text-white cursor-wait'
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
              }`}
            >
              {submitSuccess ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Demo Enviada com Sucesso!
                </>
              ) : isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Enviar Demo (+300 fãs)
                </>
              )}
            </motion.button>
            
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center"
              >
                <p className="text-green-300 text-sm">
                  🎉 Você ganhou +300 fãs! Seu professor receberá sua demo em breve.
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>

      <button
        onClick={() => setCurrentView('home')}
        className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg transition-all"
      >
        Cancelar
      </button>
    </motion.div>
  );

  const renderFeedback = () => {
    const submission = userSubmissions.find(s => s.id === selectedSubmission);
    if (!submission || (submission.status !== 'avaliada' && submission.status !== 'reprovada')) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className={`backdrop-blur-lg rounded-2xl p-6 border ${
          submission.tipo === 'positive'
            ? 'bg-green-500/10 border-green-500/30'
            : 'bg-orange-500/10 border-orange-500/30'
        }`}>
          <div className="flex items-start gap-4 mb-4">
            <div className={`p-4 rounded-xl ${
              submission.tipo === 'positive'
                ? 'bg-green-500/20'
                : 'bg-orange-500/20'
            }`}>
              {submission.tipo === 'positive' ? (
                <Star className="w-8 h-8 text-green-400" />
              ) : (
                <MessageCircle className="w-8 h-8 text-orange-400" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {submission.tipo === 'positive' ? 'Avaliação Positiva! 🎉' : 'Feedback Construtivo'}
              </h2>
              <p className="text-purple-200">{submission.faixa}</p>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center font-bold text-white">
                {submission.professor?.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-white">{submission.professor}</p>
                <p className="text-xs text-purple-300">Produtor Musical</p>
              </div>
            </div>
            <p className="text-purple-100 leading-relaxed">{submission.feedback}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">+{submission.fans} fãs conquistados</span>
            </div>
            <span className="text-sm text-purple-300">{submission.dataEnvio}</span>
          </div>
        </div>

        {submission.tipo === 'positive' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <MessageCircle className="w-6 h-6 text-blue-400" />
              <h3 className="font-semibold text-white">Coletiva de Imprensa Liberada!</h3>
            </div>
            <p className="text-blue-200 text-sm mb-4">
              Sua performance foi aprovada! Agora você pode enfrentar a imprensa e ganhar ainda mais fãs.
            </p>
            <button
              onClick={onNavigateToPress}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all"
            >
              Ir para Coletiva de Imprensa
            </button>
          </motion.div>
        )}

        <button
          onClick={() => setCurrentView('home')}
          className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg transition-all"
        >
          Voltar ao Estúdio
        </button>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <AppBar onBack={onBack} showBackButton title="Estúdio" />
      
      <div className="max-w-3xl mx-auto p-4 md:p-8">
        <AnimatePresence mode="wait">
          {currentView === 'home' && renderHome()}
          {currentView === 'gravar' && renderGravar()}
          {currentView === 'feedback' && renderFeedback()}
        </AnimatePresence>
      </div>
    </div>
  );
}