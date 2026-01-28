import React, { useState, useEffect } from 'react';
import { useArtist } from './ArtistContext';
import { ArrowLeft, Newspaper, MessageCircle, CheckCircle, XCircle, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AppBar from './AppBar';

interface ColetivaImprensaProps {
  onBack: () => void;
  initialQuizId?: string; // ✅ Para deeplink de notificação
}

const PRESS_QUIZ = {
  id: 'pq-1',
  trackSceneId: 'ts-2',
  trackTitle: 'Garota de Ipanema',
  version: 1,
  maxAttempts: 3,
  passingScore: 70,
  questions: [
    {
      pergunta: 'Qual é o contexto histórico da composição "Garota de Ipanema"?',
      opcoes: [
        'Foi composta durante a ditadura militar',
        'Nasceu do movimento da Bossa Nova no Rio de Janeiro',
        'Foi escrita para um filme hollywoodiano',
        'É uma adaptação de uma música americana'
      ],
      respostaCorreta: 1
    },
    {
      pergunta: 'Quem são os compositores dessa obra-prima?',
      opcoes: [
        'Chico Buarque e Caetano Veloso',
        'Tom Jobim e Vinícius de Moraes',
        'João Gilberto e Stan Getz',
        'Ary Barroso e Noel Rosa'
      ],
      respostaCorreta: 1
    },
    {
      pergunta: 'Qual característica musical é fundamental na Bossa Nova?',
      opcoes: [
        'Ritmo acelerado e percussivo',
        'Harmonia complexa e batida sincopada',
        'Uso intenso de instrumentos de sopro',
        'Vocal potente e dramático'
      ],
      respostaCorreta: 1
    },
    {
      pergunta: 'O que torna "Garota de Ipanema" uma das músicas brasileiras mais conhecidas mundialmente?',
      opcoes: [
        'Foi tema de novela global',
        'Ganhou Grammy de melhor música do ano',
        'Combinação única de melodia, poesia e suingue brasileiro',
        'Foi regravada por artistas de K-pop'
      ],
      respostaCorreta: 2
    },
    {
      pergunta: 'Qual deve ser a abordagem vocal ideal para interpretar esta música?',
      opcoes: [
        'Intensidade dramática com vibrato constante',
        'Leveza, suavidade e naturalidade',
        'Técnica operística com voz impostada',
        'Improviso jazzístico complexo'
      ],
      respostaCorreta: 1
    }
  ]
};

type QuizState = 'intro' | 'questions' | 'result';

export default function ColetivaImprensa({ onBack }: ColetivaImprensaProps) {
  const { completePressQuiz } = useArtist();
  const [state, setState] = useState<QuizState>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Salvar resultado quando chegar no estado 'result'
  useEffect(() => {
    if (state === 'result') {
      const { passed } = calculateResult();
      completePressQuiz(passed);
    }
  }, [state]);

  const handleStart = () => {
    setState('questions');
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showFeedback) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowFeedback(true);
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < PRESS_QUIZ.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        // Calcular resultado
        setState('result');
      }
    }, 2000);
  };

  const calculateResult = () => {
    const correctAnswers = answers.filter(
      (answer, index) => answer === PRESS_QUIZ.questions[index].respostaCorreta
    ).length;
    const score = Math.round((correctAnswers / PRESS_QUIZ.questions.length) * 100);
    const passed = score >= PRESS_QUIZ.passingScore;

    return { correctAnswers, score, passed };
  };

  const generateHeadline = (passed: boolean, score: number) => {
    if (score >= 90) {
      return {
        headline: '⭐ FENÔMENO! Artista domina história da MPB',
        subtitle: 'Performance impecável conquista crítica especializada. Carreira em ascensão meteórica!'
      };
    } else if (score >= 70) {
      return {
        headline: '✨ BOM CONHECIMENTO! Artista mostra preparo',
        subtitle: 'Demonstrou conhecimento sólido sobre a Bossa Nova. Público aprova!'
      };
    } else if (score >= 50) {
      return {
        headline: '📰 DESEMPENHO REGULAR na coletiva',
        subtitle: 'Artista precisa aprofundar estudos. Críticos esperam mais na próxima.'
      };
    } else {
      return {
        headline: '⚠️ VEXAME! Artista fracassa perante a imprensa',
        subtitle: 'Falta de preparo decepciona jornalistas. Reputação abalada.'
      };
    }
  };

  const renderIntro = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/30 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="bg-gradient-to-br from-blue-500 to-cyan-500 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center"
        >
          <Newspaper className="w-12 h-12 text-white" />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-white mb-4">
          Coletiva de Imprensa
        </h2>
        <p className="text-cyan-200 mb-6 text-lg">
          {PRESS_QUIZ.trackTitle}
        </p>
        
        <div className="bg-white/5 rounded-xl p-6 mb-6 space-y-3 text-left">
          <p className="text-white">
            📰 A imprensa especializada está aqui para entrevistá-lo sobre sua performance.
          </p>
          <p className="text-cyan-200">
            Demonstre seu conhecimento sobre a obra e impressione os críticos!
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-2xl font-bold text-white mb-1">{PRESS_QUIZ.questions.length}</p>
            <p className="text-xs text-cyan-300">Perguntas</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-2xl font-bold text-white mb-1">{PRESS_QUIZ.passingScore}%</p>
            <p className="text-xs text-cyan-300">Mínimo</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-2xl font-bold text-white mb-1">{PRESS_QUIZ.maxAttempts}</p>
            <p className="text-xs text-cyan-300">Tentativas</p>
          </div>
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-500/30"
        >
          Iniciar Coletiva
        </button>
      </div>
    </motion.div>
  );

  const renderQuestions = () => {
    const question = PRESS_QUIZ.questions[currentQuestion];
    const isCorrect = selectedAnswer === question.respostaCorreta;

    return (
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        {/* Progresso */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
          <div className="flex justify-between text-sm text-cyan-200 mb-2">
            <span>Pergunta {currentQuestion + 1} de {PRESS_QUIZ.questions.length}</span>
            <span>{Math.round(((currentQuestion) / PRESS_QUIZ.questions.length) * 100)}%</span>
          </div>
          <div className="bg-white/10 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: `${(currentQuestion / PRESS_QUIZ.questions.length) * 100}%` }}
              animate={{ width: `${((currentQuestion + 1) / PRESS_QUIZ.questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full"
            />
          </div>
        </div>

        {/* Pergunta */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <div className="flex items-start gap-3 mb-6">
            <MessageCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
            <p className="text-lg text-white font-semibold">{question.pergunta}</p>
          </div>

          <div className="space-y-3">
            {question.opcoes.map((opcao, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === question.respostaCorreta;
              const showResult = showFeedback;

              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: showFeedback ? 1 : 1.02 }}
                  whileTap={{ scale: showFeedback ? 1 : 0.98 }}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-lg transition-all border ${
                    showResult
                      ? isCorrectOption
                        ? 'bg-green-500/20 border-green-500/50'
                        : isSelected
                        ? 'bg-red-500/20 border-red-500/50'
                        : 'bg-white/5 border-white/10'
                      : isSelected
                      ? 'bg-cyan-500/20 border-cyan-500/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white flex-1">{opcao}</span>
                    {showResult && isCorrectOption && (
                      <CheckCircle className="w-5 h-5 text-green-400 ml-2" />
                    )}
                    {showResult && isSelected && !isCorrectOption && (
                      <XCircle className="w-5 h-5 text-red-400 ml-2" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {!showFeedback && selectedAnswer !== null && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleConfirmAnswer}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all"
            >
              Confirmar Resposta
            </motion.button>
          )}

          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mt-6 p-4 rounded-lg ${
                isCorrect
                  ? 'bg-green-500/20 border border-green-500/50'
                  : 'bg-red-500/20 border border-red-500/50'
              }`}
            >
              <p className="text-white font-semibold">
                {isCorrect ? '✓ Correto!' : '✗ Incorreto'}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  const renderResult = () => {
    const { correctAnswers, score, passed } = calculateResult();
    const { headline, subtitle } = generateHeadline(passed, score);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        {/* Manchete */}
        <div className={`backdrop-blur-lg rounded-2xl p-8 border ${
          passed 
            ? 'bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30'
            : 'bg-gradient-to-r from-red-600/20 to-orange-600/20 border-red-500/30'
        }`}>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.2 }}
            className={`bg-gradient-to-br p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center ${
              passed ? 'from-green-500 to-emerald-500' : 'from-red-500 to-orange-500'
            }`}
          >
            {passed ? (
              <Star className="w-12 h-12 text-white" />
            ) : (
              <XCircle className="w-12 h-12 text-white" />
            )}
          </motion.div>

          <h2 className="text-3xl font-bold text-white mb-3 text-center">
            {headline}
          </h2>
          <p className={`text-center mb-6 ${passed ? 'text-green-200' : 'text-red-200'}`}>
            {subtitle}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-white mb-1">{score}%</p>
              <p className="text-xs text-purple-300">Pontuação</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-white mb-1">{correctAnswers}/{PRESS_QUIZ.questions.length}</p>
              <p className="text-xs text-purple-300">Acertos</p>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${
            passed ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            <p className={`text-center font-semibold ${
              passed ? 'text-green-100' : 'text-red-100'
            }`}>
              {passed 
                ? `+500 fãs conquistados! 🎉`
                : `-20 fãs perdidos 😔`
              }
            </p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          Voltar ao Palco
        </button>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <AppBar onBack={state === 'intro' ? onBack : undefined} showBackButton={state === 'intro'} title={state === 'result' ? 'Resultado' : 'Coletiva de Imprensa'} />
      
      <div className="max-w-3xl mx-auto p-4 md:p-8">
        <AnimatePresence mode="wait">
          {state === 'intro' && renderIntro()}
          {state === 'questions' && renderQuestions()}
          {state === 'result' && renderResult()}
        </AnimatePresence>
      </div>
    </div>
  );
}