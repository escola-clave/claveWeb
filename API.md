# 🎵 Clave de Sales - API Documentation

Base URL: `/api`  
Auth: Bearer Token (JWT)

## 📋 Índice

- [Autenticação](#autenticação)
- [Projetos](#projetos)
- [Faixas de Estudo](#faixas-de-estudo)
- [Submissions](#submissions)
- [Carreira](#carreira)
- [Notificações](#notificações)

---

## 🔐 Autenticação

### POST `/auth/login`
Login de usuário

**Request:**
```json
{
  "email": "mari.costa@demo.com",
  "password": "demo123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-1",
    "email": "mari.costa@demo.com",
    "role": "STUDENT",
    "stageName": "Mari Costa"
  }
}
```

---

## 📚 Projetos

### GET `/projects`
Lista projetos da turma

**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "projects": [
    {
      "id": "proj-mpb-1",
      "name": "MPB: Fundamentos e Expressão",
      "type": "ALBUM",
      "status": "ACTIVE",
      "coverImage": "https://...",
      "tracks": [
        {
          "id": "track-mpb-1",
          "title": "Garota de Ipanema",
          "artist": "Tom Jobim",
          "order": 1,
          "status": "PUBLISHED",
          "progress": {
            "studyTracksCompleted": 4,
            "studyTracksTotal": 4,
            "percentage": 100
          }
        }
      ]
    }
  ]
}
```

### GET `/projects/:projectId`
Detalhes do projeto

**Response:**
```json
{
  "id": "proj-mpb-1",
  "name": "MPB: Fundamentos e Expressão",
  "description": "Explore os clássicos da MPB no violão",
  "type": "ALBUM",
  "status": "ACTIVE",
  "tracks": [...],
  "stats": {
    "totalTracks": 4,
    "completedTracks": 3,
    "progress": 75
  }
}
```

---

## 📖 Faixas de Estudo

### GET `/tracks/:trackId/study-tracks`
Lista faixas de estudo de uma música

**Response:**
```json
{
  "trackScene": {
    "id": "track-mpb-1",
    "title": "Garota de Ipanema",
    "artist": "Tom Jobim"
  },
  "studyTracks": [
    {
      "id": "study-1",
      "title": "Progressão II-V-I",
      "categoryKey": "HARMONY",
      "order": 1,
      "estimatedMinutes": 15,
      "completed": true,
      "completedAt": "2024-02-10T10:00:00Z"
    }
  ]
}
```

### POST `/study-tracks/:studyTrackId/complete`
Marca faixa de estudo como completa

**Request:**
```json
{
  "notes": "Pratiquei bastante a progressão",
  "practiceTime": 25
}
```

**Response:**
```json
{
  "studyTrack": {
    "id": "study-1",
    "completed": true,
    "completedAt": "2024-02-10T10:00:00Z"
  },
  "rewards": {
    "fans": 50
  }
}
```

---

## 🎤 Submissions

### GET `/submissions`
Lista submissions do aluno

**Response:**
```json
{
  "submissions": [
    {
      "id": "sub-mpb-1",
      "trackSceneId": "track-mpb-1",
      "trackTitle": "Garota de Ipanema",
      "attemptNumber": 1,
      "mediaUrl": "https://...",
      "status": "APPROVED",
      "createdAt": "2024-02-12T08:00:00Z",
      "reviews": [
        {
          "teacherName": "Prof. Carlos Mendes",
          "rating": 9.0,
          "feedback": "Excelente trabalho!",
          "type": "POSITIVE"
        }
      ]
    }
  ]
}
```

### POST `/submissions`
Envia demo

**Request:**
```json
{
  "trackSceneId": "track-mpb-1",
  "mediaUrl": "https://...",
  "notes": "Primeira gravação!"
}
```

**Response:**
```json
{
  "submission": {
    "id": "sub-mpb-4",
    "status": "PENDING_REVIEW",
    "createdAt": "2024-03-15T14:30:00Z"
  }
}
```

### POST `/submissions/:submissionId/reviews`
Professor avalia demo

**Request:**
```json
{
  "type": "POSITIVE",
  "rating": 9.0,
  "feedback": "Muito bom!",
  "technicalNotes": "Levada fluida, timbre limpo",
  "approved": true
}
```

**Response:**
```json
{
  "review": {
    "id": "review-1",
    "approved": true,
    "createdAt": "2024-03-16T10:00:00Z"
  },
  "rewards": {
    "fans": 250
  }
}
```

---

## 🎯 Carreira

### GET `/career`
Stats da carreira do aluno

**Response:**
```json
{
  "career": {
    "fans": 1850,
    "level": "GARAGE",
    "levelNumber": 2,
    "currentStreak": 8,
    "longestStreak": 15,
    "totalDemos": 4,
    "approvedDemos": 3,
    "nextLevel": {
      "name": "UNDERGROUND",
      "requiredFans": 2500,
      "remaining": 650
    }
  }
}
```

### GET `/career/achievements`
Lista achievements

**Response:**
```json
{
  "achievements": [
    {
      "id": "ach-1",
      "title": "Primeira Nota",
      "description": "Completou sua primeira submission",
      "icon": "🎸",
      "category": "DEMOS",
      "tier": "BRONZE",
      "unlocked": true,
      "unlockedAt": "2024-02-12T10:00:00Z"
    }
  ]
}
```

---

## 🔔 Notificações

### GET `/notifications`
Lista notificações

**Response:**
```json
{
  "notifications": [
    {
      "id": "notif-1",
      "type": "REVIEW_RECEIVED",
      "title": "Nova Avaliação!",
      "message": "Prof. Carlos avaliou sua demo",
      "icon": "⭐",
      "sourceType": "SUBMISSION",
      "sourceId": "sub-mpb-4",
      "readAt": null,
      "createdAt": "2024-03-16T10:00:00Z"
    }
  ]
}
```

### PUT `/notifications/:notificationId/read`
Marca notificação como lida

**Response:**
```json
{
  "notification": {
    "id": "notif-1",
    "readAt": "2024-03-16T10:30:00Z"
  }
}
```

---

## 📊 Enums

### UserRole
```typescript
ADMIN | TEACHER | STUDENT
```

### ProjectStatus
```typescript
DRAFT | ACTIVE | COMPLETED | UPCOMING
```

### StudentTrackSceneStatus
```typescript
LOCKED | AVAILABLE | STUDYING | COMPLETED
```

### SubmissionStatus
```typescript
PENDING | PENDING_REVIEW | REVIEWED | APPROVED | NEEDS_REVISION | REJECTED
```

### ArtistLevel
```typescript
SHOWER | GARAGE | UNDERGROUND | INDIE | RISING_STAR | HEADLINER | MAIN_STAGE
```

### ReviewType
```typescript
POSITIVE | CONSTRUCTIVE | CRITICAL
```

---

## 🔒 Segurança

- **JWT**: Token expira em 7 dias
- **Password**: Hash com bcrypt (10 rounds)
- **CORS**: Configurar origins
- **Rate Limiting**: Implementar throttle

## 📦 Schema Prisma

Ver: `prisma/schema.prisma` para schema completo do banco.

## 🧪 Dados de Teste

Ver: `prisma/seed.ts` para dados completos de teste.

**Persona Mariana Costa:**
- Email: mari.costa@demo.com
- Senha: demo123
- 4 músicas, 21 faixas de estudo
- 1.850 fãs, nível Garage

---

**Exemplos completos**: `src/docs/API_EXAMPLES_COMPLETE.json`  
**Types TypeScript**: `src/docs/API_TYPES.ts`
