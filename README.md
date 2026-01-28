# 🎵 Clave de Sales - Backend API

Plataforma gamificada para gestão pedagógica de escolas de música e teatro.

## 🚀 Quick Start

```bash
# 1. Instalar dependências
npm install

# 2. Configurar .env
cp .env.example .env
# Edite DATABASE_URL

# 3. Setup banco de dados
createdb clave_dev
npm run db:reset

# 4. Iniciar
npm run dev
```

**Login de teste:**
- Email: `mari.costa@demo.com`
- Senha: `demo123`

## 📁 Estrutura

```
claveWeb/
├── prisma/
│   ├── schema.prisma    # Schema do banco
│   └── seed.ts          # Dados de teste
├── src/
│   ├── components/      # React components
│   ├── services/        # API services
│   ├── data/           # Types e mocks
│   └── docs/           # Documentação técnica
├── API.md              # Documentação da API
└── README.md           # Este arquivo
```

## 🗄️ Banco de Dados

**PostgreSQL + Prisma**

```bash
# Gerar cliente
npm run db:generate

# Migrations
npm run db:migrate

# Popular banco
npm run db:seed

# Resetar tudo
npm run db:reset

# Interface web
npm run db:studio
```

## 📖 Documentação

- **API.md** - Documentação completa da API
- **prisma/schema.prisma** - Schema do banco
- **src/docs/API_TYPES.ts** - Types TypeScript
- **src/docs/API_EXAMPLES_COMPLETE.json** - Exemplos de request/response

## 🎯 Stack

- **Frontend**: React 18 + TypeScript + Tailwind
- **Backend**: Node.js + Prisma + PostgreSQL
- **Build**: Vite

## 📊 Dados de Teste

**Persona: Mariana Costa**
- Email: mari.costa@demo.com
- Senha: demo123
- 4 músicas (3 completas, 1 em progresso)
- 1.850 fãs, nível Garage
- 3 achievements desbloqueados

## ⚙️ Scripts

```bash
npm run dev          # Dev server
npm run build        # Build produção
npm run db:generate  # Gerar Prisma client
npm run db:migrate   # Aplicar migrations
npm run db:seed      # Popular banco
npm run db:reset     # Resetar banco
npm run db:studio    # Interface web
```

## 🔑 Variáveis de Ambiente

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/clave_dev?schema=public"
```

---

**Versão**: 0.1.0 | **Docs**: API.md
