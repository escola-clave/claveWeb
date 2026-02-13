import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Map, LogIn, Mic2, Music2, Guitar, Radio,
  Newspaper, Users, Star, Bell, ChevronDown, ChevronRight,
  Monitor, Layers, Workflow, BookOpen, Sparkles
} from 'lucide-react';

interface MapaDeTelaProps {
  onBack: () => void;
}

interface ScreenInfo {
  id: string;
  number: string;
  title: string;
  icon: React.ReactNode;
  resumo: string;
  comoFunciona: string[];
  navegacao: string[];
  subViews?: string[];
  ascii: string;
}

const screens: ScreenInfo[] = [
  {
    id: 'login',
    number: '1',
    title: 'Login',
    icon: <LogIn className="w-5 h-5" />,
    resumo: 'Tela de entrada. O aluno digita email e senha para acessar o app.',
    comoFunciona: [
      'Campos de email e senha para autenticação',
      'Ao clicar "Entrar no Palco", autentica o usuário',
      'Se login der certo, vai para o Palco (home)',
      'Primeiro acesso solicita troca de senha',
    ],
    navegacao: ['Login com sucesso → Palco'],
    ascii: `┌──────────────────────────────────────┐
│                                      │
│      [ Logo CLAVE DE SALES ]         │
│      "Plataforma de Carreira         │
│       Artística"                     │
│                                      │
│   Email:  [____________________]     │
│   Senha:  [____________________]     │
│                                      │
│       [ 🎤 Entrar no Palco ]         │
│                                      │
└──────────────────────────────────────┘`,
  },
  {
    id: 'palco',
    number: '2',
    title: 'Palco (Home / Dashboard)',
    icon: <Music2 className="w-5 h-5" />,
    resumo: 'Dashboard principal. Mostra a situação geral do aluno: nível, fãs, streak, notificações e feedbacks recentes.',
    comoFunciona: [
      'Exibe saudação com nome, nível artístico e contagem de fãs',
      'Mostra dias de turnê (streak) e barra de progresso para o próximo nível',
      'Quando o aluno atinge o mínimo de fãs, aparece um banner para ir à Coletiva de Imprensa',
      'Lista as últimas notificações não lidas (máx 3)',
      'Lista os últimos feedbacks de professores com nota em estrelas (máx 3)',
      'No desktop, mostra atalhos rápidos para todas as seções',
      'No mobile, navegação é feita pela BottomNav (barra inferior)',
    ],
    navegacao: [
      'Notificações → Tela de Notificações',
      'Feedbacks → Estúdio',
      'Atalhos → Rotina, Projetos, Estúdio, Carreira, Social',
      'Banner → Coletiva de Imprensa',
    ],
    ascii: `┌──────────────────────────────────────────────────┐
│ [AppBar]                                         │
│  🎵 Clave de Sales  |  Palco   🔥N  ⭐N  🔔N    │
├──────────────────────────────────────────────────┤
│  👤 Olá, [nome]!                                 │
│  🎤 [nível artístico]                            │
│  ⭐ N fãs  |  🔥 Turnê: N dias                  │
│  ████████░░░░ Próximo nível: N fãs               │
│                                                  │
│ ┌──────────────────────────────────────────┐     │
│ │ 📰 Coletiva Disponível!                  │     │
│ │            [ Ir para Coletiva → ]        │     │
│ └──────────────────────────────────────────┘     │
│  (banner condicional — aparece quando elegível)  │
│                                                  │
│ ── 🔔 Notificações (N não lidas) ────────────── │
│  • [tipo] [mensagem da notificação]              │
│                    [ Ver todas → ]               │
│                                                  │
│ ── 📬 Últimos Feedbacks ─────────────────────── │
│  • [professor]: "[comentário]"     ⭐⭐⭐⭐       │
│                    [ Ver no Estúdio → ]          │
│                                                  │
│ ── 🚀 Atalhos Rápidos (desktop only) ────────── │
│  [ 🎤 Rotina ]  [ 📀 Projetos ]                 │
│  [ 🎧 Estúdio ] [ 🌟 Carreira ]                 │
│  [ 👥 Social ]                                   │
│                                                  │
├──────────────────────────────────────────────────┤
│ [BottomNav - mobile]                             │
└──────────────────────────────────────────────────┘`,
  },
  {
    id: 'rotina',
    number: '3',
    title: 'Rotina Diária',
    icon: <Mic2 className="w-5 h-5" />,
    resumo: 'Exercício diário em 4 etapas: assistir vídeo, praticar, responder quiz e confirmar presença. Mantém o streak de turnê.',
    comoFunciona: [
      'Progresso visual em 4 etapas: Vídeo → Prática → Quiz → Concluído',
      'ETAPA 1 - Vídeo: aluno assiste ao vídeo da aula e marca como assistido',
      'ETAPA 2 - Prática: card com instruções do exercício, aluno marca como concluído',
      'ETAPA 3 - Quiz: perguntas de múltipla escolha sobre o conteúdo, feedback imediato (certo/errado)',
      'CONCLUSÃO: Presença confirmada, aluno ganha fãs e +1 dia de turnê (streak)',
      'Cada etapa só desbloqueia depois de completar a anterior',
    ],
    navegacao: ['← Voltar → Palco', 'Conclusão → volta ao Palco'],
    ascii: `┌──────────────────────────────────────────────────┐
│ [AppBar]  ← Voltar  |  Rotina Diária             │
├──────────────────────────────────────────────────┤
│                                                  │
│  Progresso: ● Vídeo → ○ Prática → ○ Quiz → ○ ✔  │
│                                                  │
│ ═══════ ETAPA 1: VÍDEO ════════════════════════  │
│  🎤 [título da aula] - Dia N                     │
│  "[descrição do exercício]"                      │
│  ┌────────────────────────────┐                  │
│  │      [ ▶ Vídeo ]          │                  │
│  └────────────────────────────┘                  │
│  [ ✔ Marcar como Assistido ]                     │
│                                                  │
│ ═══════ ETAPA 2: PRÁTICA ══════════════════════  │
│  📋 "[instruções do exercício prático]"          │
│  [ ✔ Concluir Prática ]                         │
│                                                  │
│ ═══════ ETAPA 3: QUIZ ════════════════════════   │
│  [pergunta sobre o conteúdo]?                    │
│  ( ) [opção A]                                   │
│  ( ) [opção B]                                   │
│  ( ) [opção C]                                   │
│  [ Enviar Resposta ]                             │
│                                                  │
│ ═══════ CONCLUSÃO ═════════════════════════════  │
│  🎉 Presença confirmada!                         │
│  +N fãs  🔥 Turnê +1 dia                        │
└──────────────────────────────────────────────────┘`,
  },
  {
    id: 'projetos',
    number: '4',
    title: 'Projetos',
    icon: <Radio className="w-5 h-5" />,
    resumo: 'Lista de projetos da temporada (Álbuns ou Peças). Cada um tem status (Ativo/Concluído/Futuro) e barra de progresso.',
    comoFunciona: [
      'Mostra todos os projetos da temporada em cards',
      'Cada card tem: título, tipo (Álbum/Peça), período, status e progresso',
      'Status possíveis: ATIVO (verde), CONCLUÍDO (cinza), FUTURO (azul)',
      'Projetos ativos mostram barra de progresso e contagem de faixas concluídas',
      'Clicar em um projeto abre o detalhe com as faixas/cenas',
    ],
    navegacao: ['← Voltar → Palco', 'Clicar projeto → ProjetoFaixas (detalhe)'],
    ascii: `┌──────────────────────────────────────────────────┐
│ [AppBar]  ← Voltar  |  Projetos                  │
├──────────────────────────────────────────────────┤
│  📀 Projetos da Temporada                        │
│                                                  │
│  ┌────────────────────────────────────────┐      │
│  │ 🟢 ATIVO                               │      │
│  │ 🎵 [título do projeto]                 │      │
│  │ Tipo: [Álbum/Peça]  |  [período]       │      │
│  │ "[descrição]"                           │      │
│  │ ████████░░░░ N%  (N/N faixas)          │      │
│  │                         [ Abrir → ]    │      │
│  └────────────────────────────────────────┘      │
│                                                  │
│  ┌────────────────────────────────────────┐      │
│  │ ⬚ CONCLUÍDO                            │      │
│  │ 🎭 [título do projeto]                 │      │
│  │ ████████████ 100%                      │      │
│  └────────────────────────────────────────┘      │
│                                                  │
│  ┌────────────────────────────────────────┐      │
│  │ 🔵 FUTURO                              │      │
│  │ 🎵 [título do projeto]                 │      │
│  └────────────────────────────────────────┘      │
│                                                  │
│  ℹ️ Complete todas as faixas para ir ao Estúdio. │
└──────────────────────────────────────────────────┘`,
  },
  {
    id: 'projetofaixas',
    number: '5',
    title: 'ProjetoFaixas (Detalhe do Projeto)',
    icon: <Layers className="w-5 h-5" />,
    resumo: 'Detalhe de um projeto. Lista as faixas/cenas com progresso individual. Cada faixa expande para mostrar lições de estudo.',
    comoFunciona: [
      'Mostra header do projeto com barra de progresso geral',
      'Lista de faixas com status: ✅ concluída, ▶ em estudo, 🔒 bloqueada',
      'Clicar em uma faixa expande e mostra as lições de estudo',
      'Cada lição tem: tipo (Harmonia/Ritmo/Melodia), descrição e materiais (vídeo, PDF, áudio)',
      'O aluno marca cada lição individualmente como "estudada"',
      'Há seções de Notas Técnicas e Letra da Música',
      'Quando TODAS as lições de uma faixa estão concluídas, aparece botão "Ir para o Estúdio"',
    ],
    subViews: [
      'Lista de Faixas — cards com status e progresso de cada faixa',
      'Detalhe da Faixa — lições expandíveis com materiais e botão de conclusão',
    ],
    navegacao: ['← Voltar → Lista de Projetos', 'Todas lições concluídas → Estúdio'],
    ascii: `┌──────────────────────────────────────────────────┐
│ [AppBar]  ← Voltar  |  [título do projeto]        │
├──────────────────────────────────────────────────┤
│  🎵 [título do projeto]                          │
│  Progresso Geral: ████████░░░░ N%                │
│                                                  │
│  ✅ Faixa 1 - [título] — 100%                    │
│  ✅ Faixa 2 - [título] — 100%                    │
│  ▶ Faixa 3 - [título] — N%      [ Estudar → ]   │
│  🔒 Faixa 4 - [título] (bloqueada)               │
│                                                  │
│  ── Detalhe da Faixa (expandido) ──              │
│  ┌────────────────────────────────────────┐      │
│  │ 🎵 Harmonia - "[descrição]"            │      │
│  │ Materiais: 📹 Vídeo  📄 PDF  🎵 Áudio │      │
│  │ [ ✔ Marcar como Estudado ]            │      │
│  └────────────────────────────────────────┘      │
│  ┌────────────────────────────────────────┐      │
│  │ 🥁 Ritmo - "[descrição]"              │      │
│  └────────────────────────────────────────┘      │
│  ┌────────────────────────────────────────┐      │
│  │ 🎤 Melodia - ✅ Concluído              │      │
│  └────────────────────────────────────────┘      │
│                                                  │
│  📝 Notas Técnicas + Letra                       │
│  [ 🎧 Ir para o Estúdio ] (quando completo)     │
└──────────────────────────────────────────────────┘`,
  },
  {
    id: 'estudio',
    number: '6',
    title: 'Estúdio',
    icon: <Guitar className="w-5 h-5" />,
    resumo: 'Gravação e avaliação de performances. O aluno grava demos, envia para o professor e recebe feedback com nota.',
    comoFunciona: [
      'HOME: Lista de todas as submissões do aluno com status (Aguardando, Aprovado, Precisa Revisão)',
      'HOME: Botão para iniciar nova gravação',
      'GRAVAR: Aluno seleciona a faixa, grava performance, pode regravar, adiciona observações e envia',
      'FEEDBACK: Mostra avaliação do professor com nota em estrelas (1-5), tipo (Positivo/Construtivo/Crítico)',
      'FEEDBACK: Texto detalhado do professor + notas técnicas + fãs ganhos',
      'Quando feedback é positivo, aparece botão para ir à Coletiva de Imprensa',
    ],
    subViews: [
      'Home — lista de submissões e botão de gravar',
      'Gravar — interface de gravação com seletor de faixa e timer',
      'Feedback — avaliação do professor com rating, texto e fãs ganhos',
    ],
    navegacao: [
      '← Voltar → Palco',
      'Feedback positivo → Coletiva de Imprensa',
    ],
    ascii: `┌──────────────────────────────────────────────────┐
│ [AppBar]  ← Voltar  |  Estúdio                    │
├──────────────────────────────────────────────────┤
│  🎧 Estúdio                                     │
│  [ 🎥 Gravar Nova Performance ]                  │
│                                                  │
│  ── Histórico de Submissões ──                   │
│  ┌────────────────────────────────────────┐      │
│  │ 🟡 AGUARDANDO AVALIAÇÃO               │      │
│  │ Faixa: [título]  |  [data]             │      │
│  └────────────────────────────────────────┘      │
│  ┌────────────────────────────────────────┐      │
│  │ 🟢 APROVADO  ⭐⭐⭐⭐  +N fãs           │      │
│  │ Faixa: [título]    [ Ver Feedback → ]  │      │
│  └────────────────────────────────────────┘      │
│  ┌────────────────────────────────────────┐      │
│  │ 🔴 PRECISA REVISÃO  Tentativa: N       │      │
│  │ Faixa: [título]    [ Ver Feedback → ]  │      │
│  └────────────────────────────────────────┘      │
│                                                  │
│  ── Tela de Gravação ──                          │
│  Faixa: [ ▼ Selecionar ]                        │
│  [ 🎤 ]  ⏱ 00:00:00                             │
│  [ ⏹ Parar ]  [ 🔄 Regravar ]                   │
│  Observações: [________________]                 │
│  [ ⬆ Enviar Submissão ]                         │
│                                                  │
│  ── Tela de Feedback ──                          │
│  👩‍🏫 [professor]  ⭐⭐⭐⭐ (N/5)                   │
│  [tipo: POSITIVO/CONSTRUTIVO/CRÍTICO]            │
│  "[texto do feedback]"                           │
│  +N fãs                                          │
│  [ 📰 Ir para Coletiva de Imprensa ]            │
└──────────────────────────────────────────────────┘`,
  },
  {
    id: 'imprensa',
    number: '7',
    title: 'Coletiva de Imprensa',
    icon: <Newspaper className="w-5 h-5" />,
    resumo: 'Quiz de conhecimento musical. O aluno responde perguntas e ganha ou perde fãs baseado na nota. Tem tentativas limitadas.',
    comoFunciona: [
      'INTRO: Mostra info do quiz — número de perguntas, nota mínima, tentativas disponíveis',
      'PERGUNTAS: Múltipla escolha, uma de cada vez, com barra de progresso',
      'Após confirmar resposta, feedback imediato mostra se acertou ou errou',
      'RESULTADO: Gera uma "manchete de jornal" baseada no desempenho',
      'Se aprovado (≥ nota mínima): ganha fãs',
      'Se reprovado (< nota mínima): perde fãs e gasta uma tentativa',
    ],
    subViews: [
      'Introdução — info do quiz e botão iniciar',
      'Perguntas — quiz de múltipla escolha com progresso',
      'Resultado — manchete e fãs ganhos/perdidos',
    ],
    navegacao: ['← Voltar → Palco (apenas na intro)', 'Após resultado → Palco'],
    ascii: `┌──────────────────────────────────────────────────┐
│ [AppBar]  ← Voltar  |  Coletiva de Imprensa       │
├──────────────────────────────────────────────────┤
│  📰 Coletiva de Imprensa                        │
│  "Enfrente a crítica e ganhe fãs!"              │
│  📊 Perguntas: N | Nota mín: N% | Tentativas: N │
│  [ 🎤 Iniciar Coletiva ]                        │
│                                                  │
│  ── Perguntas ──                                 │
│  Pergunta N de N                                 │
│  ████████████░░░░░░░░ N%                        │
│  "[pergunta]"                                    │
│  ( ) [opção A]                                   │
│  ( ) [opção B]                                   │
│  ( ) [opção C]                                   │
│  [ Confirmar Resposta ]                          │
│  ✅ Correto! / ❌ Incorreto                      │
│                                                  │
│  ── Resultado ──                                 │
│  🗞 "[manchete gerada pelo desempenho]"          │
│  📊 Nota: N%  ✅ APROVADO  +N fãs               │
│  [ Voltar ao Palco ]                             │
│                                                  │
│  ── ou se reprovado ──                           │
│  🗞 "[manchete negativa]"                        │
│  ❌ REPROVADO N%  -N fãs  Tentativas: N          │
└──────────────────────────────────────────────────┘`,
  },
  {
    id: 'social',
    number: '8',
    title: 'Social',
    icon: <Users className="w-5 h-5" />,
    resumo: 'Ranking da turma, progresso da temporada e conquistas. O aluno vê sua posição relativa aos colegas.',
    comoFunciona: [
      'RANKING: Lista da turma ordenada por fãs, com nome, nível artístico e badges de posição (🥇🥈🥉)',
      'O aluno logado é destacado na lista para identificação rápida',
      'PROGRESSO DA TEMPORADA: 3 barras — faixas de álbum, dias de rotina, demos enviados',
      'CONQUISTAS RECENTES: Grid de badges com ícone, nome e tier (Bronze/Prata/Ouro/Platina)',
    ],
    navegacao: ['← Voltar → Palco'],
    ascii: `┌──────────────────────────────────────────────────┐
│ [AppBar]  ← Voltar  |  Social                     │
├──────────────────────────────────────────────────┤
│  ── 🏆 Ranking da Turma ──                       │
│  🥇 1. [aluno]          N fãs                    │
│     🎤 [nível]                                   │
│  🥈 2. [aluno]          N fãs  ← (você)          │
│     🎤 [nível]                                   │
│  🥉 3. [aluno]          N fãs                    │
│  4. [aluno]              N fãs                   │
│  5. [aluno]              N fãs                   │
│                                                  │
│  ── 📊 Progresso da Temporada ──                 │
│  📀 Álbum:  ████████░░░░ N/N faixas              │
│  🎤 Rotina: ██████░░░░░░ N/N dias                │
│  🎧 Demos:  ████░░░░░░░░ N/N enviados            │
│                                                  │
│  ── 🏅 Conquistas Recentes ──                    │
│  ┌────────┐  ┌────────┐  ┌────────┐              │
│  │[título]│  │[título]│  │[título]│              │
│  │ [tier] │  │ [tier] │  │ [tier] │              │
│  └────────┘  └────────┘  └────────┘              │
└──────────────────────────────────────────────────┘`,
  },
  {
    id: 'carreira',
    number: '9',
    title: 'Carreira (Perfil do Artista)',
    icon: <Star className="w-5 h-5" />,
    resumo: 'Perfil completo do artista com estatísticas, calendário da turnê, conquistas e histórico de atividades.',
    comoFunciona: [
      'PERFIL: Avatar, nome artístico, nível, fãs, streak e barra de progresso para próximo nível',
      'Bio, especialização musical e gêneros preferidos',
      'ESTATÍSTICAS: 6 cards — faixas concluídas, demos enviados, demos aprovados, média de avaliação, dias de turnê, total de fãs',
      'CALENDÁRIO DA TURNÊ: Semana com check-ins diários (✅ feito, ❌ perdido, ? pendente)',
      'CONQUISTAS: Lista completa com status desbloqueado/bloqueado',
      'ATIVIDADES RECENTES: Feed das últimas transações de fãs (ganhos e perdidos)',
    ],
    navegacao: ['← Voltar → Palco'],
    ascii: `┌──────────────────────────────────────────────────┐
│ [AppBar]  ← Voltar  |  Carreira                   │
├──────────────────────────────────────────────────┤
│  👤 [nome do aluno]                               │
│  🎤 [nível artístico]                             │
│  ⭐ N fãs  |  🔥 Turnê: N dias                   │
│  ████████░░░░ → Próximo: [próximo nível]          │
│  Bio: "[bio do aluno]"                            │
│                                                  │
│  ── 📊 Estatísticas ──                           │
│  ┌────────┐  ┌────────┐  ┌────────┐              │
│  │🎵 N    │  │🎧 N    │  │✅ N    │              │
│  │Faixas  │  │Demos   │  │Aprovad.│              │
│  └────────┘  └────────┘  └────────┘              │
│  ┌────────┐  ┌────────┐  ┌────────┐              │
│  │⭐ N.N  │  │🔥 N    │  │⭐ N    │              │
│  │Média   │  │Turnê   │  │Fãs     │              │
│  └────────┘  └────────┘  └────────┘              │
│                                                  │
│  ── 🔥 Calendário da Turnê ──                    │
│  Seg[✅] Ter[✅] Qua[✅] Qui[?] Sex[-] Sab[-]    │
│                                                  │
│  ── 🏅 Conquistas ──                             │
│  🏅 [conquista]        ✅ Desbloqueado            │
│  🏅 [conquista]        🔒 Bloqueado              │
│                                                  │
│  ── 📜 Atividades Recentes ──                    │
│  • +N fãs - [motivo] ([data])                    │
│  • -N fãs - [motivo] ([data])                    │
└──────────────────────────────────────────────────┘`,
  },
  {
    id: 'notificacoes',
    number: '10',
    title: 'Notificações',
    icon: <Bell className="w-5 h-5" />,
    resumo: 'Centro de notificações. Separado em não lidas e lidas. Clicar em uma notificação leva para a tela relevante.',
    comoFunciona: [
      'Header mostra contagem de não lidas',
      'Seção "Não Lidas" aparece destacada, "Lidas" ficam esmaecidas',
      'Cada notificação tem: ícone do tipo, título, mensagem e há quanto tempo',
      'Tipos: Lembrete de Turnê, Coletiva Desbloqueada, Nova Avaliação, Conquista, Level Up',
      'Clicar numa notificação redireciona para a tela relevante (deep link)',
      'Estado vazio quando não há notificações',
    ],
    navegacao: ['← Voltar → Palco', 'Clicar notificação → tela relevante'],
    ascii: `┌──────────────────────────────────────────────────┐
│ [AppBar]  ← Voltar  |  Notificações               │
├──────────────────────────────────────────────────┤
│  🔔 Notificações (N não lidas)                   │
│                                                  │
│  ── Não Lidas ──                                 │
│  ┌────────────────────────────────────────┐      │
│  │ [ícone] [título]                       │      │
│  │ "[mensagem]"                           │      │
│  │                          há N min      │      │
│  └────────────────────────────────────────┘      │
│  ┌────────────────────────────────────────┐      │
│  │ [ícone] [título]                       │      │
│  │ "[mensagem]"                           │      │
│  │                          há N horas    │      │
│  └────────────────────────────────────────┘      │
│                                                  │
│  ── Lidas ──                                     │
│  ┌────────────────────────────────────────┐      │
│  │ [ícone] [título] (lida)               │      │
│  │                          há N dias     │      │
│  └────────────────────────────────────────┘      │
└──────────────────────────────────────────────────┘`,
  },
];

const flows = [
  {
    name: 'Fluxo de Estudo',
    icon: <BookOpen className="w-5 h-5" />,
    steps: [
      'Projetos → Selecionar Projeto → Ver Faixas/Cenas',
      'Selecionar Faixa → Estudar Lições (Harmonia, Ritmo, Melodia...)',
      'Marcar cada lição como estudada',
      'Quando todas concluídas → Ir para Estúdio gravar',
    ],
  },
  {
    name: 'Fluxo de Avaliação',
    icon: <Mic2 className="w-5 h-5" />,
    steps: [
      'Estúdio → Gravar Demo → Enviar Submissão',
      'Aguardar Avaliação do Professor',
      'Ver Feedback (rating + notas técnicas)',
      'Se positivo → Coletiva de Imprensa (Quiz)',
      'Aprovado → Ganhar Fãs / Reprovado → Perder Fãs',
    ],
  },
  {
    name: 'Fluxo Diário',
    icon: <Workflow className="w-5 h-5" />,
    steps: [
      'Palco → Rotina Diária',
      'Assistir Vídeo → Praticar → Quiz',
      'Presença confirmada → +Fãs → +Streak de Turnê',
    ],
  },
  {
    name: 'Fluxo de Gamificação',
    icon: <Sparkles className="w-5 h-5" />,
    steps: [
      'Ações (Rotina, Demos, Quiz) → Ganhar/Perder Fãs',
      'Subir de Nível (Chuveiro → Garagem → Underground → Indie → Estrela → Headliner → Palco Principal)',
      'Manter Streak → Avançar na Turnê',
      'Desbloquear Conquistas (Bronze/Prata/Ouro/Platina)',
      'Subir no Ranking da Turma',
    ],
  },
];

function ScreenCard({ screen }: { screen: ScreenInfo }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-colors"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 flex items-center gap-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl text-white">
          {screen.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
              #{screen.number}
            </span>
            <h3 className="text-lg font-bold text-white truncate">{screen.title}</h3>
          </div>
          <p className="text-sm text-purple-200/70 mt-1 line-clamp-2">{screen.resumo}</p>
        </div>
        <div className="flex-shrink-0 text-purple-400">
          {expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4 border-t border-white/5 pt-4">
              {/* Wireframe */}
              <div>
                <h4 className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Monitor className="w-3.5 h-3.5" /> Exemplo da Tela
                </h4>
                <pre className="text-[10px] sm:text-xs text-purple-200/80 bg-black/40 rounded-xl p-4 overflow-x-auto font-mono leading-relaxed border border-white/5">
                  {screen.ascii}
                </pre>
              </div>

              {/* Como Funciona */}
              <div>
                <h4 className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2">
                  Como Funciona
                </h4>
                <ul className="space-y-1.5">
                  {screen.comoFunciona.map((item, i) => (
                    <li key={i} className="text-sm text-purple-100/80 flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5 flex-shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sub-views */}
              {screen.subViews && screen.subViews.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2">
                    Sub-Telas
                  </h4>
                  <div className="grid gap-2">
                    {screen.subViews.map((sv, i) => (
                      <div key={i} className="bg-white/5 rounded-lg px-3 py-2 border border-white/5 text-sm text-purple-100/80">
                        {sv}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navegação */}
              <div>
                <h4 className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2">
                  Navegação
                </h4>
                <div className="flex flex-wrap gap-2">
                  {screen.navegacao.map((nav, i) => (
                    <span key={i} className="text-xs bg-purple-500/10 text-purple-300 px-3 py-1.5 rounded-full border border-purple-500/20">
                      {nav}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

type TabType = 'screens' | 'flows';

export default function MapaDeTelas({ onBack }: MapaDeTelaProps) {
  const [activeTab, setActiveTab] = useState<TabType>('screens');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredScreens = screens.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.resumo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'screens', label: 'Telas', icon: <Map className="w-4 h-4" /> },
    { id: 'flows', label: 'Fluxos', icon: <Workflow className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-purple-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <Map className="w-5 h-5 text-purple-400" />
                Mapa de Telas
              </h1>
              <p className="text-xs text-purple-300/70">Clave de Sales — Referência para Design</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-500/20 text-purple-200 border border-purple-500/30'
                    : 'text-purple-300/60 hover:text-purple-200 hover:bg-white/5'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* === TAB: TELAS === */}
        {activeTab === 'screens' && (
          <div className="space-y-4">
            {/* Search */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar telas..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
            />

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
              <p className="text-sm text-purple-200/80">
                <strong className="text-purple-200">10 telas</strong> no app. Clique em cada card para ver o exemplo da tela e como ela funciona.
              </p>
            </div>

            <div className="space-y-3">
              {filteredScreens.map((screen) => (
                <ScreenCard key={screen.id} screen={screen} />
              ))}
            </div>

            {filteredScreens.length === 0 && (
              <div className="text-center py-12">
                <p className="text-purple-300/60">Nenhuma tela encontrada para "{searchTerm}"</p>
              </div>
            )}
          </div>
        )}

        {/* === TAB: FLUXOS === */}
        {activeTab === 'flows' && (
          <div className="space-y-4">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
              <p className="text-sm text-purple-200/80">
                <strong className="text-purple-200">4 fluxos principais</strong> que o aluno percorre no app.
              </p>
            </div>

            {flows.map((flow) => (
              <div
                key={flow.name}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2.5 rounded-xl text-white">
                    {flow.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{flow.name}</h3>
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-2 top-1 bottom-1 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                  {flow.steps.map((step, i) => (
                    <div key={i} className="relative flex items-start gap-3 pb-3 last:pb-0">
                      <div className="absolute -left-4 top-1.5 w-3 h-3 rounded-full bg-purple-500 border-2 border-purple-900" />
                      <p className="text-sm text-purple-100/80 pl-2">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto px-4 py-8 text-center">
        <p className="text-xs text-purple-400/40">
          Clave de Sales — Mapa de Telas
        </p>
      </div>
    </div>
  );
}
