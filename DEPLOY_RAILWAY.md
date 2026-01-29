# 🚀 Deploy no Railway - Guia Simplificado

Este guia mostra como fazer o deploy do frontend Clave de Sales no Railway.

## 📋 Pré-requisitos

1. Conta no Railway ([railway.app](https://railway.app))
2. Repositório Git (GitHub, GitLab ou Bitbucket)
3. Código commitado e enviado para o repositório

## 🎯 Passo a Passo

### 1. Preparar o Projeto

Os arquivos de configuração já foram criados:
- ✅ `railway.json` - Configuração do Railway
- ✅ `nixpacks.toml` - Configuração de build
- ✅ `vite.config.ts` - Configurado para produção

### 2. Fazer Commit das Mudanças

```bash
git add .
git commit -m "chore: adicionar configuração para deploy no Railway"
git push origin main
```

Ou use o script automatizado:

**Windows (PowerShell):**
```powershell
.\railway-quick-start.ps1
```

**Linux/Mac:**
```bash
bash railway-quick-start.sh
```

### 3. Criar Projeto no Railway

1. Acesse [railway.app](https://railway.app) e faça login
2. Clique em **"New Project"**
3. Selecione **"Deploy from GitHub repo"**
4. Escolha o repositório `claveWeb`
5. O Railway detectará automaticamente a configuração e iniciará o build

### 4. Configurar Variáveis de Ambiente (Opcional)

No painel do Railway, vá em **Variables** e adicione se necessário:

```env
NODE_ENV=production
PORT=3000
```

**Nota:** O Railway já configura automaticamente a variável `PORT`.

### 5. Gerar Domínio Público

1. No serviço da aplicação, vá em **Settings**
2. Em **Networking**, clique em **"Generate Domain"**
3. Seu app estará disponível em algo como: `https://claveweb-production.up.railway.app`

### 6. Verificar Deploy

1. Acesse o domínio gerado pelo Railway
2. O app deve carregar normalmente com os dados mockados
3. Teste o login com as credenciais de teste:
   - Email: `mari.costa@demo.com`
   - Senha: `demo123`

## 🔧 Comandos Úteis

### Railway CLI (Opcional)

Instale o CLI para mais funcionalidades:

```bash
# Instalar
npm install -g @railway/cli

# Login
railway login

# Conectar ao projeto
railway link

# Ver logs em tempo real
railway logs

# Abrir app no browser
railway open

# Redeploy manual
railway up
```

## 🐛 Troubleshooting

### Erro de Build

Se o build falhar:
1. Verifique os logs no Railway Dashboard
2. Confirme que todas as dependências estão no `package.json`
3. Teste o build localmente: `npm run build`

### Erro 502 Bad Gateway

1. Verifique os logs no Railway
2. Confirme que o comando start está correto: `npm run start`
3. Verifique se a porta está configurada para `0.0.0.0`

### App não carrega / Página em branco

1. Abra o console do browser (F12)
2. Verifique se há erros de JavaScript
3. Confirme que o build foi bem-sucedido
4. Verifique se os assets estão sendo servidos corretamente

### Redeploy não está funcionando

1. Force um novo deploy:
   - Vá em **Deployments** no Railway
   - Clique em **"Redeploy"**
2. Ou faça um commit vazio:
   ```bash
   git commit --allow-empty -m "trigger redeploy"
   git push
   ```

## 📊 Monitoramento

O Railway oferece:
- **Logs em tempo real**: Veja o que está acontecendo na aba Logs
- **Métricas**: CPU, memória, rede na aba Metrics
- **Deployments**: Histórico de deploys

## 💰 Custos

Railway oferece:
- **Trial Plan**: $5 de créditos grátis (requer cartão)
- **Hobby Plan**: $5/mês com $5 de créditos inclusos
- **Pro Plan**: $20/mês com $20 de créditos inclusos

**Estimativa para este app:**
- ~$0.01-0.02/hora (~$7-15/mês em uso constante)
- O plano Hobby é suficiente para começar

## ⚡ Otimizações

### Performance

O app já está otimizado com:
- Build do Vite otimizado para produção
- Minificação automática
- Tree shaking
- Code splitting

### Cache

Para melhorar o cache:
1. Os assets estáticos são automaticamente cacheados
2. Configure headers de cache se necessário (via proxy/CDN)

## 🔒 Segurança

**Boas práticas:**
- ✅ Nunca commite arquivos `.env` no Git
- ✅ Use variáveis de ambiente para configurações sensíveis
- ✅ O `.gitignore` já está configurado corretamente

## 🚀 CI/CD Automático

O Railway já faz deploy automático quando você:
1. Faz push para a branch configurada (geralmente `main`)
2. Merge um Pull Request
3. Faz commit direto no GitHub

**Para desabilitar auto-deploy:**
1. Vá em **Settings** → **Service**
2. Desmarque **"Auto Deploy"**

## 📚 Recursos

- [Railway Docs](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

## 🎉 Deploy Alternativo: Vercel/Netlify

Se preferir outras plataformas, este app também funciona em:

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy
```

---

**Status**: ✅ Pronto para deploy!

**Resumo:**
- Frontend React + Vite
- Dados mockados (sem backend)
- Deploy estático
- Configuração automática no Railway

Se tiver problemas, verifique os logs no Railway ou abra uma issue no repositório.
