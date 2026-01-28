/**
 * Clave de Sales - Database Seed Script
 * Popula o banco com dados de demonstração ricos e realistas
 * 
 * PERSONA: Mariana Costa - Estudante de Violão/MPB
 * 
 * Como executar:
 * npx prisma db seed
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...\n');

  // ========================================
  // 1. ESCOLA E CURSO
  // ========================================
  console.log('📚 Criando escola e curso...');
  
  const school = await prisma.school.create({
    data: {
      id: 'school-clave-sp',
      name: 'Clave de Sales - São Paulo',
      isActive: true,
    },
  });

  const course = await prisma.course.create({
    data: {
      id: 'course-music-mpb',
      schoolId: school.id,
      name: 'Música Popular Brasileira',
      type: 'MUSIC',
      isActive: true,
    },
  });

  // ========================================
  // 2. CATEGORIAS DE STUDY TRACKS (Tipos Customizáveis)
  // ========================================
  console.log('🎵 Criando categorias de faixas de estudo...');
  
  const categories = await Promise.all([
    prisma.studyTrackCategory.create({
      data: {
        id: 'cat-harmony',
        courseId: course.id,
        name: 'Harmonia',
        key: 'HARMONY',
        icon: '🎸',
        color: '#4F46E5',
        description: 'Estudo de acordes e progressões harmônicas',
        order: 1,
      },
    }),
    prisma.studyTrackCategory.create({
      data: {
        id: 'cat-rhythm',
        courseId: course.id,
        name: 'Ritmo',
        key: 'RHYTHM',
        icon: '🥁',
        color: '#F97316',
        description: 'Levadas e padrões rítmicos',
        order: 2,
      },
    }),
    prisma.studyTrackCategory.create({
      data: {
        id: 'cat-melody',
        courseId: course.id,
        name: 'Melodia',
        key: 'MELODY',
        icon: '🎵',
        color: '#A855F7',
        description: 'Estudo melódico e fraseado',
        order: 3,
      },
    }),
    prisma.studyTrackCategory.create({
      data: {
        id: 'cat-technique',
        courseId: course.id,
        name: 'Técnica',
        key: 'TECHNIQUE',
        icon: '🎤',
        color: '#10B981',
        description: 'Técnicas instrumentais específicas',
        order: 4,
      },
    }),
    prisma.studyTrackCategory.create({
      data: {
        id: 'cat-interpretation',
        courseId: course.id,
        name: 'Interpretação',
        key: 'INTERPRETATION',
        icon: '🎭',
        color: '#EC4899',
        description: 'Expressividade e performance',
        order: 5,
      },
    }),
  ]);

  // ========================================
  // 3. TEMPORADA (SEASON) E TURMA (CLASS)
  // ========================================
  console.log('📅 Criando temporada e turma...');
  
  const season = await prisma.season.create({
    data: {
      id: 'season-2024-1',
      courseId: course.id,
      name: '2024.1',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-06-30'),
      status: 'ACTIVE',
      isActive: true,
    },
  });

  const classRoom = await prisma.class.create({
    data: {
      id: 'class-mpb-a',
      seasonId: season.id,
      name: 'Turma A - MPB Intermediário',
      maxStudents: 20,
      isActive: true,
    },
  });

  // ========================================
  // 4. USUÁRIOS (Mariana + Professores)
  // ========================================
  console.log('👤 Criando usuários...');
  
  // Mariana Costa - Estudante
  const mariana = await prisma.user.create({
    data: {
      id: 'user-mariana',
      name: 'Mariana Costa',
      email: 'mari.costa@demo.com',
      passwordHash: '$2a$10$XjC8qpYp5RZPrVxz1Z4z3eKxYqT5VjYqT5VjYqT5VjYqT5VjYqT5V', // senha: demo123
      role: 'STUDENT',
      status: 'ACTIVE',
      mustChangePassword: false,
    },
  });

  const marianaProfile = await prisma.studentProfile.create({
    data: {
      userId: mariana.id,
      stageName: 'Mari Costa',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana&backgroundColor=b6e3f4',
      bio: 'Designer gráfica de 28 anos apaixonada por MPB. Toco violão há 3 anos de forma autodidata e agora busco estruturar meu aprendizado.',
      specialization: 'Violão',
      genres: '["MPB", "Bossa Nova", "Samba", "Folk Brasileiro"]',
    },
  });

  // Professor Carlos
  const profCarlos = await prisma.user.create({
    data: {
      id: 'teacher-carlos',
      name: 'Carlos Mendes',
      email: 'carlos.mendes@clave.com',
      passwordHash: '$2a$10$XjC8qpYp5RZPrVxz1Z4z3eKxYqT5VjYqT5VjYqT5VjYqT5VjYqT5V',
      role: 'TEACHER',
      status: 'ACTIVE',
      mustChangePassword: false,
    },
  });

  await prisma.teacherProfile.create({
    data: {
      userId: profCarlos.id,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
      bio: 'Professor de violão com 15 anos de experiência em MPB e Bossa Nova',
    },
  });

  // Matrícula da Mariana na turma
  await prisma.classStudent.create({
    data: {
      classId: classRoom.id,
      studentId: marianaProfile.userId,
      joinedAt: new Date('2024-01-15'),
      status: 'ACTIVE',
    },
  });

  // Professor na turma
  await prisma.classTeacher.create({
    data: {
      teacherId: profCarlos.id,
      classId: classRoom.id,
      joinedAt: new Date('2024-01-15'),
    },
  });

  // ========================================
  // 5. PROJECT TEMPLATE (MPB: Fundamentos e Expressão)
  // ========================================
  console.log('🎼 Criando template de projeto...');
  
  const projectTemplate = await prisma.projectTemplate.create({
    data: {
      id: 'template-proj-mpb',
      courseId: course.id,
      name: 'MPB: Fundamentos e Expressão',
      type: 'ALBUM',
      description: 'Explore os clássicos da MPB no violão',
      coverImage: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800',
      version: 1,
      isActive: true,
    },
  });

  // ========================================
  // 6. TRACK SCENE TEMPLATES (Músicas)
  // ========================================
  console.log('🎵 Criando templates de músicas...');
  
  const trackTemplates = await Promise.all([
    // Garota de Ipanema
    prisma.trackSceneTemplate.create({
      data: {
        id: 'template-track-1',
        projectTemplateId: projectTemplate.id,
        title: 'Garota de Ipanema',
        artist: 'Tom Jobim',
        description: 'O clássico que define a bossa nova',
        technicalInstruction: 'Violão: Levada de bossa clássica (baixo + acordes), acordes com 7ª',
        lyrics: 'Olha que coisa mais linda / Mais cheia de graça / É ela, a menina / Que vem e que passa...',
        order: 1,
        demoRequired: true,
        pressQuizRequired: true,
        version: 1,
      },
    }),
    // Chega de Saudade
    prisma.trackSceneTemplate.create({
      data: {
        id: 'template-track-2',
        projectTemplateId: projectTemplate.id,
        title: 'Chega de Saudade',
        artist: 'João Gilberto',
        description: 'A música que inaugurou a bossa nova',
        technicalInstruction: 'Progressão harmônica complexa com modulações',
        order: 2,
        demoRequired: true,
        pressQuizRequired: true,
        version: 1,
      },
    }),
    // Águas de Março
    prisma.trackSceneTemplate.create({
      data: {
        id: 'template-track-3',
        projectTemplateId: projectTemplate.id,
        title: 'Águas de Março',
        artist: 'Tom Jobim',
        description: 'Obra-prima da MPB que exige musicalidade narrativa',
        technicalInstruction: 'Acompanhamento narrativo e dinâmico. Varie a intensidade conforme a letra',
        order: 3,
        demoRequired: true,
        pressQuizRequired: true,
        version: 1,
      },
    }),
    // Corcovado
    prisma.trackSceneTemplate.create({
      data: {
        id: 'template-track-4',
        projectTemplateId: projectTemplate.id,
        title: 'Corcovado (Quiet Nights)',
        artist: 'Tom Jobim',
        description: 'Harmonias sofisticadas com extensões de acordes',
        technicalInstruction: 'Voicings avançados - Am7(11), D7(9), Gmaj7(13), E7(#9)',
        order: 4,
        demoRequired: true,
        pressQuizRequired: true,
        version: 1,
      },
    }),
  ]);

  // ========================================
  // 7. STUDY TRACK TEMPLATES (Faixas de Estudo Pedagógicas)
  // ========================================
  console.log('📚 Criando templates de faixas de estudo...');
  
  // Garota de Ipanema - 4 faixas
  const garotaStudyTemplates = await Promise.all([
    prisma.studyTrackTemplate.create({
      data: {
        id: 'study-template-1-1',
        trackSceneTemplateId: trackTemplates[0].id,
        categoryId: categories[0].id, // Harmonia
        categoryKey: 'HARMONY',
        title: 'Progressão II-V-I',
        description: 'Entenda a progressão harmônica fundamental da bossa nova',
        order: 1,
        estimatedMinutes: 15,
        isRequired: true,
      },
    }),
    prisma.studyTrackTemplate.create({
      data: {
        id: 'study-template-1-2',
        trackSceneTemplateId: trackTemplates[0].id,
        categoryId: categories[1].id, // Ritmo
        categoryKey: 'RHYTHM',
        title: 'Levada de Bossa',
        description: 'Aprenda a levada característica: baixo no polegar + acordes',
        order: 2,
        estimatedMinutes: 20,
        isRequired: true,
      },
    }),
    prisma.studyTrackTemplate.create({
      data: {
        id: 'study-template-1-3',
        trackSceneTemplateId: trackTemplates[0].id,
        categoryId: categories[2].id, // Melodia
        categoryKey: 'MELODY',
        title: 'Melodia e Interpretação',
        description: 'Como a melodia se encaixa na harmonia. Trabalhe a musicalidade',
        order: 3,
        estimatedMinutes: 18,
        isRequired: true,
      },
    }),
    prisma.studyTrackTemplate.create({
      data: {
        id: 'study-template-1-4',
        trackSceneTemplateId: trackTemplates[0].id,
        categoryId: categories[4].id, // Interpretação
        categoryKey: 'INTERPRETATION',
        title: 'Preparação para Demo',
        description: 'Dicas de gravação e como capturar o melhor som',
        order: 4,
        estimatedMinutes: 12,
        isRequired: true,
      },
    }),
  ]);

  // Chega de Saudade - 6 faixas
  const chegaStudyTemplates = await Promise.all([
    prisma.studyTrackTemplate.create({
      data: {
        trackSceneTemplateId: trackTemplates[1].id,
        categoryId: categories[0].id,
        categoryKey: 'HARMONY',
        title: 'Harmonia Avançada',
        description: 'Progressões com modulações. Entenda as mudanças de tonalidade',
        order: 1,
        estimatedMinutes: 22,
        isRequired: true,
      },
    }),
    prisma.studyTrackTemplate.create({
      data: {
        trackSceneTemplateId: trackTemplates[1].id,
        categoryId: categories[1].id,
        categoryKey: 'RHYTHM',
        title: 'Ritmo Sincopado',
        description: 'Domine a levada sincopada característica de João Gilberto',
        order: 2,
        estimatedMinutes: 25,
        isRequired: true,
      },
    }),
    prisma.studyTrackTemplate.create({
      data: {
        trackSceneTemplateId: trackTemplates[1].id,
        categoryId: categories[2].id,
        categoryKey: 'MELODY',
        title: 'Linha Melódica',
        description: 'Estude a melodia e suas nuances',
        order: 3,
        estimatedMinutes: 20,
        isRequired: true,
      },
    }),
    prisma.studyTrackTemplate.create({
      data: {
        trackSceneTemplateId: trackTemplates[1].id,
        categoryId: categories[3].id,
        categoryKey: 'TECHNIQUE',
        title: 'Técnica de Mão Direita',
        description: 'Refinamento técnico: dedilhado preciso e limpeza sonora',
        order: 4,
        estimatedMinutes: 18,
        isRequired: true,
      },
    }),
    prisma.studyTrackTemplate.create({
      data: {
        trackSceneTemplateId: trackTemplates[1].id,
        categoryId: categories[4].id,
        categoryKey: 'INTERPRETATION',
        title: 'Interpretação Poética',
        description: 'Como transmitir a emoção da letra através do instrumento',
        order: 5,
        estimatedMinutes: 15,
        isRequired: true,
      },
    }),
    prisma.studyTrackTemplate.create({
      data: {
        trackSceneTemplateId: trackTemplates[1].id,
        categoryId: categories[4].id,
        categoryKey: 'INTERPRETATION',
        title: 'Performance Final',
        description: 'Junte tudo: harmonia, ritmo, melodia, técnica e interpretação',
        order: 6,
        estimatedMinutes: 10,
        isRequired: true,
      },
    }),
  ]);

  // Águas de Março - 5 faixas
  const aguasStudyTemplates = await Promise.all([
    prisma.studyTrackTemplate.create({
      data: {
        trackSceneTemplateId: trackTemplates[2].id,
        categoryId: categories[0].id,
        categoryKey: 'HARMONY',
        title: 'Harmonia Narrativa',
        description: 'Os acordes contam a história junto com a letra',
        order: 1,
        estimatedMinutes: 16,
        isRequired: true,
      },
    }),
    prisma.studyTrackTemplate.create({
      data: {
        trackSceneTemplateId: trackTemplates[2].id,
        categoryId: categories[1].id,
        categoryKey: 'RHYTHM',
        title: 'Ritmo Livre',
        description: 'Trabalhe o rubato sutil. O tempo não é rígido, mas tem lógica musical',
        order: 2,
        estimatedMinutes: 20,
        isRequired: true,
      },
    }),
    prisma.studyTrackTemplate.create({
      data: {
        trackSceneTemplateId: trackTemplates[2].id,
        categoryId: categories[2].id,
        categoryKey: 'MELODY',
        title: 'Melodia Descritiva',
        description: 'Cada frase musical pinta uma imagem. Pau, pedra, fim do caminho...',
        order: 3,
        estimatedMinutes: 18,
        isRequired: true,
      },
    }),
    prisma.studyTrackTemplate.create({
      data: {
        trackSceneTemplateId: trackTemplates[2].id,
        categoryId: categories[4].id,
        categoryKey: 'INTERPRETATION',
        title: 'Dinâmica Expressiva',
        description: 'Varie a intensidade conforme a narrativa',
        order: 4,
        estimatedMinutes: 22,
        isRequired: true,
      },
    }),
    prisma.studyTrackTemplate.create({
      data: {
        trackSceneTemplateId: trackTemplates[2].id,
        categoryId: categories[4].id,
        categoryKey: 'INTERPRETATION',
        title: 'Gravação com Alma',
        description: 'Esta é uma das músicas mais bonitas da MPB. Grave com todo seu coração',
        order: 5,
        estimatedMinutes: 12,
        isRequired: true,
      },
    }),
  ]);

  // Corcovado - 6 faixas
  const corcovadoStudyTemplates = await Promise.all([
    prisma.studyTrackTemplate.create({
      data: {
        trackSceneTemplateId: trackTemplates[3].id,
        categoryId: categories[0].id,
        categoryKey: 'HARMONY',
        title: 'Harmonia com Tensões',
        description: 'Aprenda acordes com extensões (9ª, 11ª, 13ª)',
        order: 1,
        estimatedMinutes: 20,
        isRequired: true,
      },
    }),
    prisma.studyTrackTemplate.create({
      data: {
        trackSceneTemplateId: trackTemplates[3].id,
        categoryId: categories[1].id,
        categoryKey: 'RHYTHM',
        title: 'Levada Refinada',
        description: 'Bossa nova sofisticada. Sutileza e precisão rítmica',
        order: 2,
        estimatedMinutes: 22,
        isRequired: true,
      },
    }),
    prisma.studyTrackTemplate.create({
      data: {
        trackSceneTemplateId: trackTemplates[3].id,
        categoryId: categories[2].id,
        categoryKey: 'MELODY',
        title: 'Melodia Sofisticada',
        description: 'Nuances melódicas e como elas dialogam com a harmonia complexa',
        order: 3,
        estimatedMinutes: 18,
        isRequired: true,
      },
    }),
    prisma.studyTrackTemplate.create({
      data: {
        trackSceneTemplateId: trackTemplates[3].id,
        categoryId: categories[3].id,
        categoryKey: 'TECHNIQUE',
        title: 'Voicings Avançados',
        description: 'Pratique as posições específicas de Am7(11), D7(9), Gmaj7(13)',
        order: 4,
        estimatedMinutes: 25,
        isRequired: true,
      },
    }),
    prisma.studyTrackTemplate.create({
      data: {
        trackSceneTemplateId: trackTemplates[3].id,
        categoryId: categories[3].id,
        categoryKey: 'TECHNIQUE',
        title: 'Transições Cromáticas',
        description: 'Trabalhe as transições difíceis e movimentos cromáticos',
        order: 5,
        estimatedMinutes: 28,
        isRequired: true,
      },
    }),
    prisma.studyTrackTemplate.create({
      data: {
        trackSceneTemplateId: trackTemplates[3].id,
        categoryId: categories[4].id,
        categoryKey: 'INTERPRETATION',
        title: 'Performance Completa',
        description: 'Hora de gravar! Lembre-se: suavidade, fluidez, e feeling',
        order: 6,
        estimatedMinutes: 10,
        isRequired: true,
      },
    }),
  ]);

  // ========================================
  // 8. PROJETO INSTANCIADO (Para a turma)
  // ========================================
  console.log('🎯 Criando projeto instanciado...');
  
  const project = await prisma.project.create({
    data: {
      id: 'proj-mpb-1',
      templateId: projectTemplate.id,
      projectTemplateVersion: 1,
      classId: classRoom.id,
      seasonId: season.id,
      name: 'MPB: Fundamentos e Expressão',
      description: projectTemplate.description,
      coverImage: projectTemplate.coverImage,
      status: 'ACTIVE',
      isVisible: true,
      releasedAt: new Date('2024-01-20'),
    },
  });

  // ========================================
  // 9. TRACK SCENES INSTANCIADAS (Músicas da turma)
  // ========================================
  console.log('🎼 Criando track scenes instanciadas...');
  
  const trackScenes = await Promise.all([
    prisma.trackScene.create({
      data: {
        id: 'track-mpb-1',
        projectId: project.id,
        templateId: trackTemplates[0].id,
        trackSceneTemplateVersion: 1,
        title: trackTemplates[0].title,
        artist: trackTemplates[0].artist,
        description: trackTemplates[0].description,
        technicalInstruction: trackTemplates[0].technicalInstruction,
        lyrics: trackTemplates[0].lyrics,
        order: 1,
        status: 'PUBLISHED',
        isVisible: true,
        demoRequired: true,
        pressQuizRequired: true,
      },
    }),
    prisma.trackScene.create({
      data: {
        id: 'track-mpb-2',
        projectId: project.id,
        templateId: trackTemplates[1].id,
        trackSceneTemplateVersion: 1,
        title: trackTemplates[1].title,
        artist: trackTemplates[1].artist,
        description: trackTemplates[1].description,
        technicalInstruction: trackTemplates[1].technicalInstruction,
        order: 2,
        status: 'PUBLISHED',
        isVisible: true,
        demoRequired: true,
        pressQuizRequired: true,
      },
    }),
    prisma.trackScene.create({
      data: {
        id: 'track-mpb-3',
        projectId: project.id,
        templateId: trackTemplates[2].id,
        trackSceneTemplateVersion: 1,
        title: trackTemplates[2].title,
        artist: trackTemplates[2].artist,
        description: trackTemplates[2].description,
        technicalInstruction: trackTemplates[2].technicalInstruction,
        order: 3,
        status: 'PUBLISHED',
        isVisible: true,
        demoRequired: true,
        pressQuizRequired: true,
      },
    }),
    prisma.trackScene.create({
      data: {
        id: 'track-mpb-4',
        projectId: project.id,
        templateId: trackTemplates[3].id,
        trackSceneTemplateVersion: 1,
        title: trackTemplates[3].title,
        artist: trackTemplates[3].artist,
        description: trackTemplates[3].description,
        technicalInstruction: trackTemplates[3].technicalInstruction,
        order: 4,
        status: 'PUBLISHED',
        isVisible: true,
        demoRequired: true,
        pressQuizRequired: true,
      },
    }),
  ]);

  // ========================================
  // 10. STUDY TRACKS INSTANCIADAS
  // ========================================
  console.log('📖 Criando study tracks instanciadas...');
  
  // Track 1 - Garota de Ipanema (4 faixas)
  const track1Studies = await Promise.all(
    garotaStudyTemplates.map((template, index) =>
      prisma.studyTrack.create({
        data: {
          trackSceneId: trackScenes[0].id,
          templateId: template.id,
          categoryId: template.categoryId,
          categoryKey: template.categoryKey,
          title: template.title,
          description: template.description,
          technicalNotes: template.technicalNotes,
          videoUrl: template.videoUrl,
          audioUrl: template.audioUrl,
          pdfUrl: template.pdfUrl,
          order: template.order,
          estimatedMinutes: template.estimatedMinutes,
          isRequired: template.isRequired,
          isVisible: true,
        },
      })
    )
  );

  // Track 2 - Chega de Saudade (6 faixas)
  const track2Studies = await Promise.all(
    chegaStudyTemplates.map((template) =>
      prisma.studyTrack.create({
        data: {
          trackSceneId: trackScenes[1].id,
          templateId: template.id,
          categoryId: template.categoryId,
          categoryKey: template.categoryKey,
          title: template.title,
          description: template.description,
          order: template.order,
          estimatedMinutes: template.estimatedMinutes,
          isRequired: template.isRequired,
          isVisible: true,
        },
      })
    )
  );

  // Track 3 - Águas de Março (5 faixas)
  const track3Studies = await Promise.all(
    aguasStudyTemplates.map((template) =>
      prisma.studyTrack.create({
        data: {
          trackSceneId: trackScenes[2].id,
          templateId: template.id,
          categoryId: template.categoryId,
          categoryKey: template.categoryKey,
          title: template.title,
          description: template.description,
          order: template.order,
          estimatedMinutes: template.estimatedMinutes,
          isRequired: template.isRequired,
          isVisible: true,
        },
      })
    )
  );

  // Track 4 - Corcovado (6 faixas)
  const track4Studies = await Promise.all(
    corcovadoStudyTemplates.map((template) =>
      prisma.studyTrack.create({
        data: {
          trackSceneId: trackScenes[3].id,
          templateId: template.id,
          categoryId: template.categoryId,
          categoryKey: template.categoryKey,
          title: template.title,
          description: template.description,
          order: template.order,
          estimatedMinutes: template.estimatedMinutes,
          isRequired: template.isRequired,
          isVisible: true,
        },
      })
    )
  );

  // ========================================
  // 11. PROGRESSO DA MARIANA NAS STUDY TRACKS
  // ========================================
  console.log('✅ Criando progresso da Mariana nas faixas de estudo...');
  
  // Track 1 - TODAS COMPLETAS
  await Promise.all(
    track1Studies.map((study) =>
      prisma.studentStudyTrack.create({
        data: {
          studentId: marianaProfile.userId,
          studyTrackId: study.id,
          completed: true,
          completedAt: new Date('2024-02-10'),
          practiceTime: 90,
        },
      })
    )
  );

  // Track 2 - TODAS COMPLETAS
  await Promise.all(
    track2Studies.map((study) =>
      prisma.studentStudyTrack.create({
        data: {
          studentId: marianaProfile.userId,
          studyTrackId: study.id,
          completed: true,
          completedAt: new Date('2024-02-20'),
          practiceTime: 120,
        },
      })
    )
  );

  // Track 3 - TODAS COMPLETAS
  await Promise.all(
    track3Studies.map((study) =>
      prisma.studentStudyTrack.create({
        data: {
          studentId: marianaProfile.userId,
          studyTrackId: study.id,
          completed: true,
          completedAt: new Date('2024-03-05'),
          practiceTime: 100,
        },
      })
    )
  );

  // Track 4 - 3 COMPLETAS, 3 FALTANDO
  await Promise.all(
    track4Studies.slice(0, 3).map((study) =>
      prisma.studentStudyTrack.create({
        data: {
          studentId: marianaProfile.userId,
          studyTrackId: study.id,
          completed: true,
          completedAt: new Date('2024-03-15'),
          practiceTime: 80,
        },
      })
    )
  );

  // ========================================
  // 12. PROGRESSO NAS TRACK SCENES
  // ========================================
  console.log('🎵 Criando progresso nas músicas...');
  
  await Promise.all([
    // Track 1 - COMPLETA
    prisma.studentTrackScene.create({
      data: {
        studentId: marianaProfile.userId,
        trackSceneId: trackScenes[0].id,
        status: 'COMPLETED',
        completedAt: new Date('2024-02-12'),
      },
    }),
    // Track 2 - COMPLETA
    prisma.studentTrackScene.create({
      data: {
        studentId: marianaProfile.userId,
        trackSceneId: trackScenes[1].id,
        status: 'COMPLETED',
        completedAt: new Date('2024-02-22'),
      },
    }),
    // Track 3 - COMPLETA
    prisma.studentTrackScene.create({
      data: {
        studentId: marianaProfile.userId,
        trackSceneId: trackScenes[2].id,
        status: 'COMPLETED',
        completedAt: new Date('2024-03-07'),
      },
    }),
    // Track 4 - ESTUDANDO
    prisma.studentTrackScene.create({
      data: {
        studentId: marianaProfile.userId,
        trackSceneId: trackScenes[3].id,
        status: 'STUDYING',
      },
    }),
  ]);

  // ========================================
  // 13. SUBMISSIONS E REVIEWS
  // ========================================
  console.log('📤 Criando submissions e avaliações...');
  
  // Submission Track 1 - APROVADA
  const sub1 = await prisma.submission.create({
    data: {
      id: 'sub-mpb-1',
      studentId: marianaProfile.userId,
      trackSceneId: trackScenes[0].id,
      attemptNumber: 1,
      mediaUrl: 'https://example.com/audio/mariana-garota-ipanema.mp3',
      notes: 'Primeira gravação! Pratiquei bastante a levada de bossa.',
      status: 'APPROVED',
      pressUnlocked: true,
      reviewedAt: new Date('2024-02-12'),
    },
  });

  await prisma.review.create({
    data: {
      submissionId: sub1.id,
      teacherId: profCarlos.id,
      teacherName: 'Prof. Carlos Mendes',
      type: 'POSITIVE',
      rating: 9.0,
      feedback: 'Excelente trabalho, Mariana! A levada de bossa está muito boa, com swing natural e suavidade.',
      technicalNotes: 'Pontos fortes: Levada fluida, timbre limpo, transições suaves. APROVADO com louvor!',
      approved: true,
    },
  });

  // Submission Track 2 - APROVADA
  const sub2 = await prisma.submission.create({
    data: {
      id: 'sub-mpb-2',
      studentId: marianaProfile.userId,
      trackSceneId: trackScenes[1].id,
      attemptNumber: 1,
      mediaUrl: 'https://example.com/audio/mariana-chega-saudade.mp3',
      notes: 'Trabalhei bastante as transições entre os acordes.',
      status: 'APPROVED',
      pressUnlocked: true,
      reviewedAt: new Date('2024-02-22'),
    },
  });

  await prisma.review.create({
    data: {
      submissionId: sub2.id,
      teacherId: profCarlos.id,
      teacherName: 'Prof. Carlos Mendes',
      type: 'POSITIVE',
      rating: 8.5,
      feedback: 'Muito bom, Mari! As transições harmônicas estão bem executadas.',
      technicalNotes: 'Aprovado! Sugestão: Na modulação do meio, reduza um pouco o andamento.',
      approved: true,
    },
  });

  // Submission Track 3 - APROVADA COM NOTA ALTA
  const sub3 = await prisma.submission.create({
    data: {
      id: 'sub-mpb-3',
      studentId: marianaProfile.userId,
      trackSceneId: trackScenes[2].id,
      attemptNumber: 1,
      mediaUrl: 'https://example.com/audio/mariana-aguas-marco.mp3',
      notes: 'Essa música me emociona muito. Tentei colocar toda a narrativa e dinâmica que a letra pede.',
      status: 'APPROVED',
      pressUnlocked: true,
      reviewedAt: new Date('2024-03-07'),
    },
  });

  await prisma.review.create({
    data: {
      submissionId: sub3.id,
      teacherId: profCarlos.id,
      teacherName: 'Prof. Carlos Mendes',
      type: 'POSITIVE',
      rating: 9.5,
      feedback: 'WOW! Mariana, essa foi sua melhor gravação até agora! 🌟 A interpretação está emocionante!',
      technicalNotes: 'APROVADO COM DISTINÇÃO! Dinâmica narrativa impecável, variações de intensidade perfeitas.',
      approved: true,
    },
  });

  // Submission Track 4 - PENDENTE
  await prisma.submission.create({
    data: {
      id: 'sub-mpb-4',
      studentId: marianaProfile.userId,
      trackSceneId: trackScenes[3].id,
      attemptNumber: 1,
      mediaUrl: 'https://example.com/audio/mariana-corcovado.mp3',
      notes: 'Primeira tentativa com acordes complexos. Pratiquei muito mas ainda está desafiador.',
      status: 'PENDING_REVIEW',
    },
  });

  // ========================================
  // 14. CARREIRA E ACHIEVEMENTS
  // ========================================
  console.log('🏆 Criando carreira e conquistas...');
  
  await prisma.career.create({
    data: {
      studentId: marianaProfile.userId,
      seasonId: season.id,
      fans: 1850,
      level: 'GARAGE',
      levelNumber: 2,
      currentStreak: 8,
      longestStreak: 15,
      totalDemos: 4,
      approvedDemos: 3,
      totalAchievements: 5,
      toursCompleted: 0,
      lastActiveDate: new Date(),
    },
  });

  // Achievements
  const achievements = await Promise.all([
    prisma.achievement.create({
      data: {
        title: 'Primeira Nota',
        description: 'Completou sua primeira submission',
        icon: '🎸',
        category: 'DEMOS',
        tier: 'BRONZE',
        requirement: 1,
        fansReward: 100,
      },
    }),
    prisma.achievement.create({
      data: {
        title: 'Sequência de 7',
        description: 'Estudou 7 dias seguidos',
        icon: '🔥',
        category: 'STREAK',
        tier: 'SILVER',
        requirement: 7,
        fansReward: 200,
      },
    }),
    prisma.achievement.create({
      data: {
        title: 'Estrela da Bossa',
        description: 'Recebeu nota 9.5 em música de bossa nova',
        icon: '⭐',
        category: 'DEMOS',
        tier: 'GOLD',
        requirement: 1,
        fansReward: 300,
      },
    }),
  ]);

  // Student Achievements
  await Promise.all(
    achievements.map((achievement) =>
      prisma.studentAchievement.create({
        data: {
          studentId: marianaProfile.userId,
          achievementId: achievement.id,
          unlocked: true,
          unlockedAt: new Date('2024-03-07'),
        },
      })
    )
  );

  // ========================================
  // 15. NOTIFICAÇÕES
  // ========================================
  console.log('🔔 Criando notificações...');
  
  await Promise.all([
    prisma.notification.create({
      data: {
        userId: mariana.id,
        type: 'SUBMISSION_REVIEWED',
        title: 'Nova Avaliação!',
        message: 'Prof. Carlos avaliou sua demo de "Corcovado"',
        icon: '⭐',
        sourceType: 'SUBMISSION',
        sourceId: 'sub-mpb-4',
        actionUrl: '/estudio',
        readAt: null, // Não lida
      },
    }),
    prisma.notification.create({
      data: {
        userId: mariana.id,
        type: 'ACHIEVEMENT_UNLOCKED',
        title: 'Nova Conquista!',
        message: 'Você desbloqueou: Estrela da Bossa ⭐',
        icon: '🎉',
        sourceType: 'ACHIEVEMENT',
        sourceId: achievements[2].id,
        actionUrl: '/carreira',
        readAt: new Date('2024-03-08'), // Lida
      },
    }),
  ]);

  console.log('\n✅ Seed completo!');
  console.log('\n📊 Resumo:');
  console.log('- 1 escola');
  console.log('- 1 curso (MPB)');
  console.log('- 5 categorias de study tracks');
  console.log('- 1 temporada ativa');
  console.log('- 1 turma');
  console.log('- 1 aluna (Mariana Costa)');
  console.log('- 1 professor');
  console.log('- 1 projeto (4 músicas)');
  console.log('- 21 faixas de estudo pedagógicas');
  console.log('- 4 submissions (3 aprovadas, 1 pendente)');
  console.log('- 3 reviews de professores');
  console.log('- 3 achievements desbloqueados');
  console.log('- 2 notificações');
  console.log('\n🎉 Banco pronto para uso!\n');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
