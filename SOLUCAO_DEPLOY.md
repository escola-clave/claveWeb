# 🔧 Solução de Problemas de Deploy

## Problema Identificado

O deploy estava falhando porque:

1. ❌ A variável `PORT` não estava sendo lida corretamente
2. ❌ O comando estava tentando abrir o browser (`xdg-open`)
3. ❌ Health check com timeout muito baixo

## ✅ Correções Aplicadas

### 1. **vite.config.ts** - Configuração de Porta
```typescript
preview: {
  port: Number(process.env.PORT) || 3000,
  host: '0.0.0.0',
  strictPort: false,  // Permite usar porta alternativa se necessário
}
```

### 2. **package.json** - Script Start Simplificado
```json
"start": "vite preview --host 0.0.0.0"
```

### 3. **railway.json** - Health Check Ajustado
- ✅ Timeout aumentado: 100s → 300s
- ✅ Usa `npm ci` em vez de `npm install` (mais rápido)
- ✅ Menos tentativas de restart (3 em vez de 10)

## 🚀 Como Fazer o Redeploy

### Opção 1: Commit e Push (Recomendado)

```bash
# 1. Adicionar as mudanças
git add package.json vite.config.ts railway.json

# 2. Fazer commit
git commit -m "fix: corrigir configuração de porta para Railway"

# 3. Push
git push origin main
```

O Railway detectará automaticamente e fará o redeploy.

### Opção 2: Forçar Redeploy no Railway Dashboard

1. Vá para o seu projeto no Railway
2. Clique na aba **Deployments**
3. Clique nos três pontinhos do último deploy
4. Selecione **Redeploy**

## 📊 Verificar Se Está Funcionando

### No Railway Dashboard:

1. **Logs**: Procure por estas linhas:
   ```
   ✓ built in XXXXms
   ➜ Local: http://localhost:XXXX/
   ➜ Network: http://0.0.0.0:XXXX/
   ```

2. **Deployments**: Status deve ficar **Success** (verde)

3. **Settings → Domains**: Abra a URL do domínio gerado

## 🐛 Se Ainda Não Funcionar

### Verificação 1: Logs do Build

No Railway, vá em **Deployments** e verifique os logs:

```bash
# Deve aparecer:
npm ci
npm run build
✓ built in XXXXms
```

### Verificação 2: Logs do Runtime

```bash
# Deve aparecer:
npm run start
➜ Network: http://0.0.0.0:[PORTA]/
```

**NÃO deve aparecer:**
- ❌ `Error: spawn xdg-open ENOENT`
- ❌ Erros de porta

### Verificação 3: Variáveis de Ambiente

No Railway Dashboard, vá em **Variables** e confira:

```env
NODE_ENV=production  (opcional)
```

**Importante:** O Railway define `PORT` automaticamente, não precisa adicionar!

## 🔍 Troubleshooting Adicional

### Problema: "Container inicial npm warn config production"

**Solução:** Isso é apenas um warning, não afeta o funcionamento. Mas podemos ignorar usando:

```json
// package.json
"start": "npm run preview --omit=dev"
```

### Problema: "A versão CJS da API Node do Vite está obsoleta"

**Solução:** Isso é apenas um warning. O Vite ainda funciona normalmente.

### Problema: Build demora muito

**Solução:** Já configurado para usar `npm ci` que é mais rápido que `npm install`.

### Problema: Health check ainda falha

**Soluções:**

1. **Remover health check temporariamente:**
   ```json
   // railway.json
   "deploy": {
     "startCommand": "npm run start"
     // Remover healthcheckPath e healthcheckTimeout
   }
   ```

2. **Verificar se o build existe:**
   ```bash
   # Localmente, teste:
   npm run build
   npm run start
   # Abra http://localhost:3000
   ```

3. **Usar Railway CLI para debugar:**
   ```bash
   railway logs
   ```

## ✅ Checklist Final

Antes de fazer o deploy, confirme:

- [ ] ✅ `vite.config.ts` atualizado com `Number(process.env.PORT)`
- [ ] ✅ `package.json` com script `"start": "vite preview --host 0.0.0.0"`
- [ ] ✅ `railway.json` com timeout de 300s
- [ ] ✅ Código commitado e com push
- [ ] ✅ Build local funciona: `npm run build && npm run start`

## 🎯 Resultado Esperado

Após o deploy bem-sucedido, você deve ver:

```
✅ Deployment successful
🌐 Domain: https://seu-app-production.up.railway.app
```

E ao acessar o domínio, o app React deve carregar normalmente!

## 📚 Recursos

- [Railway Troubleshooting](https://docs.railway.app/troubleshoot/fixing-common-errors)
- [Vite Preview Mode](https://vitejs.dev/guide/cli.html#vite-preview)
- [Railway Health Checks](https://docs.railway.app/deploy/healthchecks)
