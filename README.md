# 🎵 Clave de Sales - Backend API

Plataforma gamificada para gestão pedagógica de escolas de música e teatro.

## 🚀 Quick Start

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar dev server
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

## 🗄️ Dados

**Dados Mockados**

Este projeto usa dados mockados para desenvolvimento. Não há necessidade de banco de dados.

- Dados localizados em: `src/data/centralizedMocks.ts`
- API mockada em: `src/services/api.service.ts`

## 📖 Documentação

- **API.md** - Documentação completa da API
- **prisma/schema.prisma** - Schema do banco
- **src/docs/API_TYPES.ts** - Types TypeScript
- **src/docs/API_EXAMPLES_COMPLETE.json** - Exemplos de request/response

## 🎯 Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Build Tool**: Vite
- **UI Components**: Radix UI + shadcn/ui
- **Data**: Dados mockados localmente

## 📊 Dados de Teste

**Persona: Mariana Costa**
- Email: mari.costa@demo.com
- Senha: demo123
- 4 músicas (3 completas, 1 em progresso)
- 1.850 fãs, nível Garage
- 3 achievements desbloqueados

## ⚙️ Scripts

```bash
npm run dev      # Dev server (http://localhost:3000)
npm run build    # Build para produção
npm run preview  # Preview do build de produção
npm run start    # Start production server
```

## 🔑 Variáveis de Ambiente

Não são necessárias variáveis de ambiente para desenvolvimento local. O app usa dados mockados.

## 🚀 Deploy

### Railway (Recomendado)

Configuração pronta para deploy no Railway:

```bash
# Windows (PowerShell)
.\railway-quick-start.ps1

# Linux/Mac
bash railway-quick-start.sh
```

Ou siga o guia completo em **DEPLOY_RAILWAY.md**

**Passos rápidos:**
1. Faça commit e push do código
2. Acesse [railway.app](https://railway.app)
3. Crie um novo projeto do seu repositório GitHub
4. Deploy automático! 🎉

**Nota:** Este é um frontend estático, não precisa de banco de dados.

---

**Versão**: 0.1.0 | **Docs**: API.md | **Deploy**: DEPLOY_RAILWAY.md
