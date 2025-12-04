# 🔐 Sistema de Autenticação JWT

Este projeto implementa autenticação completa com **JSON Web Tokens (JWT)** para proteger as rotas administrativas.

## 📋 Funcionalidades

### ✅ **Autenticação Implementada**

- **Login com JWT**: Gera tokens seguros com expiração de 7 dias
- **Validação de Token**: Middleware para verificar tokens em todas as requisições protegidas
- **Proteção de Rotas API**: POST e DELETE de jogadores requerem autenticação
- **Auto-logout**: Redireciona para login quando token expira
- **Sessão Persistente**: Token armazenado em localStorage

---

## 🔑 Credenciais Padrão

- **Senha**: `admin123`

### 🔧 Como Alterar a Senha

1. Crie um arquivo `.env.local` na raiz do projeto
2. Adicione a variável:
   ```env
   ADMIN_PASSWORD=sua-senha-aqui
   JWT_SECRET=seu-secret-jwt-super-secreto
   ```

---

## 🛡️ Estrutura de Segurança

### **Arquivos Criados:**

```
lib/
  └── auth.ts          # Helper functions JWT (generateToken, verifyToken, requireAuth)

app/api/
  ├── admin/
  │   ├── login/
  │   │   └── route.ts     # POST /api/admin/login - Autentica admin
  │   └── validate/
  │       └── route.ts     # GET /api/admin/validate - Valida token
  └── players/
      └── route.ts         # POST/DELETE protegidos com JWT

app/admin/
  ├── login/
  │   └── page.tsx         # Página de login
  └── page.tsx             # Painel admin (requer autenticação)
```

---

## 🔐 Fluxo de Autenticação

### **1. Login**
```
POST /api/admin/login
Body: { "password": "admin123" }

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login realizado com sucesso!",
  "user": {
    "id": "admin",
    "role": "admin"
  }
}
```

### **2. Validação de Token**
```
GET /api/admin/validate
Headers: { "Authorization": "Bearer <token>" }

Response:
{
  "authenticated": true,
  "user": {
    "userId": "admin",
    "role": "admin",
    "iat": 1701734400,
    "exp": 1702339200
  }
}
```

### **3. Requisições Protegidas**
```
POST /api/players
Headers: { 
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
Body: {
  "gameName": "PlayerName",
  "tagLine": "BR1"
}
```

---

## 🎯 Rotas Públicas vs Protegidas

### **Rotas Públicas (sem autenticação)**
- `GET /` - Visualizar ranking
- `GET /api/players` - Listar jogadores

### **Rotas Protegidas (requer JWT)**
- `GET /admin` - Painel administrativo
- `POST /api/players` - Adicionar jogador
- `DELETE /api/players` - Remover jogador

---

## 🔒 Detalhes Técnicos

### **JWT Payload**
```typescript
interface JWTPayload {
  userId: string;    // ID do usuário (ex: "admin")
  role: 'admin';     // Função do usuário
  iat: number;       // Timestamp de criação
  exp: number;       // Timestamp de expiração
}
```

### **Middleware de Autenticação**
```typescript
// Uso nas rotas API
import { requireAuth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const authResult = requireAuth(req);
  
  if (!authResult.authenticated) {
    return NextResponse.json(
      { error: 'Não autorizado' },
      { status: 401 }
    );
  }
  
  // Continua com a lógica...
}
```

### **Expiração de Token**
- Token expira em **7 dias**
- Após expiração, usuário é redirecionado para login
- Token é validado em toda requisição protegida

---

## 🚀 Como Testar

### **1. Iniciar o servidor**
```bash
npm run dev
```

### **2. Acessar o login**
```
http://localhost:3000/admin/login
```

### **3. Fazer login**
- Senha: `admin123`
- O token será salvo automaticamente

### **4. Testar API com cURL**
```bash
# Login
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password":"admin123"}'

# Adicionar jogador (com token)
curl -X POST http://localhost:3000/api/players \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"gameName":"TestPlayer","tagLine":"BR1"}'
```

---

## 🔐 Segurança em Produção

### **Checklist de Deploy:**

- [ ] Alterar `JWT_SECRET` no `.env`
- [ ] Alterar `ADMIN_PASSWORD` no `.env`
- [ ] Usar senhas fortes (mínimo 12 caracteres)
- [ ] Considerar adicionar rate limiting
- [ ] Habilitar HTTPS
- [ ] Implementar refresh tokens (opcional)
- [ ] Adicionar logs de tentativas de login

### **Melhorias Futuras (Opcional):**

- Hash de senhas com bcrypt
- Múltiplos usuários admin no banco
- Refresh tokens
- 2FA (autenticação de dois fatores)
- Rate limiting para evitar força bruta
- Histórico de logins

---

## 📚 Referências

- [JWT.io](https://jwt.io/) - Documentação oficial JWT
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Biblioteca Node.js
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

---

**Desenvolvido com ⚔️ para o Ranking LoL**
