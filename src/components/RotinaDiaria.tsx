import React, { useState } from 'react';
import { ArrowLeft, Music, Wind, Mic2, Play, CheckCircle, Clock, Star, Flame, Trophy, Radio, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useArtist } from './ArtistContext';
import AppBar from './AppBar';

interface RotinaDiariaProps {
  onBack: () => void;
}

const MISSAO = {
  id: 1,
  titulo: 'Respiração Diafragmática',
  descricao: 'Aprenda a controlar sua respiração para performances mais poderosas',
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  pratica: 'Faça 10 respirações profundas usando o diafragma. Inspire por 4 segundos, segure por 4, expire por 6.',
  quiz: [
    {
      pergunta: 'Qual a principal vantagem da respiração diafragmática para cantores?',
      opcoes: [
        'Permite notas mais agudas',
        'Aumenta a capacidade pulmonar e controle',
        'Melhora a afinação',
        'Reduz o nervosismo'
      ],
      respostaCorreta: 1
    },
    {
      pergunta: 'Onde você deve sentir o movimento durante a respiração diafragmática?',
      opcoes: [
        'No peito',
        'Nos ombros',
        'Na barriga/abdômen',
        'Na garganta'
      ],
      respostaCorreta: 2
    }
  ]
};

type Step = 'video' | 'pratica' | 'quiz' | 'concluido';

export default function RotinaDiaria({ onBack }: RotinaDiariaProps) {
  const { completeDaily } = useArtist();
  const [currentStep, setCurrentStep] = useState<Step>('video');
  const [videoWatched, setVideoWatched] = useState(false);
  const [praticaCompleta, setPraticaCompleta] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleVideoComplete = () => {
    setVideoWatched(true);
    setCurrentStep('pratica');
  };

  const handlePraticaComplete = () => {
    setPraticaCompleta(true);
    setCurrentStep('quiz');
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const correctAnswers = MISSAO.quiz.filter(
      (q, index) => q.respostaCorreta === quizAnswers[index]
    ).length;

    if (correctAnswers === MISSAO.quiz.length) {
      setTimeout(() => {
        setCurrentStep('concluido');
        completeDaily();
      }, 1500);
    }
  };

  const handleQuizRetry = () => {
    setQuizAnswers([]);
    setQuizSubmitted(false);
  };

  const getQuizScore = () => {
    return MISSAO.quiz.filter(
      (q, index) => q.respostaCorreta === quizAnswers[index]
    ).length;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'video':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">{MISSAO.titulo}</h2>
              <p className="text-purple-200 mb-6">{MISSAO.descricao}</p>
              
              <div className="aspect-video bg-black/30 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-purple-400 mx-auto mb-2" />
                  <p className="text-purple-300">Vídeo da Missão</p>
                  <p className="text-sm text-purple-400 mt-1">Duração: 3:45</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleVideoComplete}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Marcar como Visto
                </button>
              </div>
            </div>

            {videoWatched && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setCurrentStep('pratica')}
                className="w-full bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-semibold transition-all border border-white/20"
              >
                Próximo: Prática →
              </motion.button>
            )}
          </motion.div>
        );

      case 'pratica':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Radio className="w-7 h-7 text-orange-400" />
                Hora da Prática
              </h2>
              
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6 mb-6">
                <p className="text-white text-lg leading-relaxed">{MISSAO.pratica}</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 mb-4">
                <p className="text-purple-200 text-sm">
                  💡 Dica: Coloque uma mão na barriga para sentir o movimento do diafragma. 
                  Seu peito deve permanecer relativamente imvel.
                </p>
              </div>

              {!praticaCompleta ? (
                <button
                  onClick={handlePraticaComplete}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Completei a Prática
                </button>
              ) : (
                <button
                  onClick={() => setCurrentStep('quiz')}
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-semibold transition-all border border-white/20"
                >
                  Próximo: Quiz →
                </button>
              )}
            </div>
          </motion.div>
        );

      case 'quiz':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageCircle className="w-7 h-7 text-blue-400" />
                Mini Quiz
              </h2>
              
              <div className="space-y-6">
                {MISSAO.quiz.map((pergunta, qIndex) => (
                  <div key={qIndex} className="bg-white/5 rounded-xl p-4">
                    <p className="text-white font-semibold mb-3">
                      {qIndex + 1}. {pergunta.pergunta}
                    </p>
                    <div className="space-y-2">
                      {pergunta.opcoes.map((opcao, oIndex) => {
                        const isSelected = quizAnswers[qIndex] === oIndex;
                        const isCorrect = pergunta.respostaCorreta === oIndex;
                        const showResult = quizSubmitted;

                        return (
                          <button
                            key={oIndex}
                            onClick={() => {
                              if (!quizSubmitted) {
                                const newAnswers = [...quizAnswers];
                                newAnswers[qIndex] = oIndex;
                                setQuizAnswers(newAnswers);
                              }
                            }}
                            disabled={quizSubmitted}
                            className={`w-full text-left p-3 rounded-lg transition-all ${
                              showResult
                                ? isCorrect
                                  ? 'bg-green-500/20 border-green-500/50 border'
                                  : isSelected
                                  ? 'bg-red-500/20 border-red-500/50 border'
                                  : 'bg-white/5 border border-white/10'
                                : isSelected
                                ? 'bg-purple-500/20 border-purple-500/50 border'
                                : 'bg-white/5 border border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <span className="text-white">{opcao}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {!quizSubmitted && quizAnswers.length === MISSAO.quiz.length && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handleQuizSubmit}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all"
                >
                  Enviar Respostas
                </motion.button>
              )}

              {quizSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 space-y-4"
                >
                  <div className={`p-4 rounded-xl ${
                    getQuizScore() === MISSAO.quiz.length
                      ? 'bg-green-500/20 border border-green-500/50'
                      : 'bg-red-500/20 border border-red-500/50'
                  }`}>
                    <p className="text-white font-semibold">
                      {getQuizScore() === MISSAO.quiz.length
                        ? '🎉 Perfeito! Você acertou todas!'
                        : `❌ Você acertou ${getQuizScore()} de ${MISSAO.quiz.length} questões.`}
                    </p>
                    {getQuizScore() !== MISSAO.quiz.length && (
                      <p className="text-white/80 text-sm mt-2">
                        Revise o material e tente novamente para conquistar os +50 fãs!
                      </p>
                    )}
                  </div>

                  {getQuizScore() !== MISSAO.quiz.length && (
                    <div className="flex gap-3">
                      <button
                        onClick={onBack}
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-semibold transition-all border border-white/20"
                      >
                        Voltar ao Palco
                      </button>
                      <button
                        onClick={handleQuizRetry}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-lg font-semibold transition-all"
                      >
                        Tentar Novamente
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        );

      case 'concluido':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="bg-gradient-to-br from-green-500 to-emerald-500 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              Presença Confirmada! 🎉
            </h2>
            <p className="text-purple-200 mb-2">
              +50 fãs conquistados
            </p>
            <p className="text-purple-300 text-sm mb-8">
              Sua Turnê está ativa! Continue aparecendo.
            </p>

            <button
              onClick={onBack}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Voltar ao Palco
            </button>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <AppBar onBack={onBack} showBackButton title="Rotina Diária" />
      
      <div className="max-w-3xl mx-auto p-4 md:p-8">
        {/* Progress Steps */}
        {currentStep !== 'concluido' && (
          <div className="mb-8 bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              {['video', 'pratica', 'quiz'].map((step, index) => {
                const isActive = currentStep === step;
                const isCompleted = 
                  (step === 'video' && videoWatched) ||
                  (step === 'pratica' && praticaCompleta) ||
                  (step === 'quiz' && quizSubmitted && getQuizScore() === MISSAO.quiz.length);
                
                return (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? 'bg-green-500'
                            : isActive
                            ? 'bg-purple-500'
                            : 'bg-white/10'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-white font-semibold">{index + 1}</span>
                        )}
                      </div>
                      <span className="text-xs text-purple-300 mt-2 capitalize">{step}</span>
                    </div>
                    {index < 2 && (
                      <div className={`flex-1 h-1 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-white/10'}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  );
}