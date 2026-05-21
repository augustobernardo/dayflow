# Plano: Integrar Formulário de Cadastro com API .NET JWT

**Data:** 2026-05-21
**Status:** Pendente

---

## Contexto

### Projeto Frontend: DayFlow (Angular v21)
Localizado em: `C:\Users\gutoo\OneDrive\Documentos\GutoDev\Personal\Personal_Projects\dayflow`

- Frontend Angular standalone, sem serviços de autenticação
- Pasta `services/` vazia, `environments/` vazio
- Formulário de cadastro (`pages/auth/register/register.ts`) com UI pronta mas sem validação, sem chamada real à API (placeholder com `setTimeout` + `console.log`)
- `app.config.ts` já tem `provideHttpClient(withFetch())`

### Projeto Backend: DayFlow.API (.NET 10)
Localizado em: `C:\Users\gutoo\OneDrive\Documentos\GutoDev\Personal\Personal_Projects\DayFlowBackend\src\DayFlow.API`

- Infraestrutura de autenticação quase completa (Models, AuthService, JWT, CORS, EF Core + PostgreSQL)
- **Falta criar o AuthController** (pasta `Controllers/` está vazia)
- **Falta registrar `IAuthService`/`AuthService` no DI** (`ServiceExtension.cs`)
- JWT: HmacSha256, expira em 8h, Issuer="DayFlowAPI", Audience="DayFlowWeb"
- CORS: permite `http://localhost:4200`
- Senha: `[MinLength(6)]` no RegisterRequest
- API URLs: `https://localhost:7103` (HTTPS) / `http://localhost:5179` (HTTP)

---

## Contratos da API

### POST /api/auth/register

**Request Body (JSON):**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

| Campo | Tipo | Validação |
|-------|------|-----------|
| `name` | `string` | Required, MaxLength(100) |
| `email` | `string` | Required, [EmailAddress] |
| `password` | `string` | Required, MinLength(6) |

**Response 200:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "name": "João Silva",
  "email": "joao@email.com",
  "expiresAt": "2026-05-21T23:45:00Z"
}
```

**Response 400 (validação falhou):**
```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "Email": ["The Email field is not a valid e-mail address."]
  }
}
```

**Response 409 (email duplicado):**
O `AuthService` lança `InvalidOperationException("Email already in use.")`. Será necessário um try/catch no controller para retornar 409.

---

## O que fazer

### No Backend (.NET API)

#### 1. Registrar IAuthService no DI
**Arquivo:** `DayFlow.API/Extensions/ServiceExtension.cs`

**O que:** Adicionar `services.AddScoped<IAuthService, AuthService>()` dentro do método `AddServiceExtensions`.

**Por que:** Atualmente o `AuthService` existe mas nunca é registrado no container de injeção de dependência. Sem isso, o controller não consegue recebê-lo.

---

#### 2. Criar AuthController
**Arquivo novo:** `DayFlow.API/Controllers/AuthController.cs`

**O que:** Controller com endpoints:
- `POST /api/auth/register` → recebe `RegisterRequest`, chama `_authService.RegisterAsync()`, retorna `AuthResponseDto`
- `POST /api/auth/login` → recebe `LoginRequest`, chama `_authService.LoginAsync()`, retorna `AuthResponseDto`

Com tratamento de exceções:
- `InvalidOperationException` → **409 Conflict**
- `UnauthorizedAccessException` → **401 Unauthorized**

**Por que:** A API tem toda a infraestrutura pronta (JWT, DB, BCrypt) mas não tem endpoints HTTP. Sem controller, não há como o frontend se comunicar com o backend.

---

### No Frontend (Angular)

#### 3. Criar arquivos de ambiente
**Arquivos novos:**
- `src/environments/environment.ts` (produção)
- `src/environments/environment.development.ts` (desenvolvimento)

**O que:** Define a URL base da API:
```ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7103/api',
};
```

**Por que:** Centraliza a configuração de ambiente. Trocar de localhost para produção é só mudar este arquivo.

---

#### 4. Criar AuthService
**Arquivo novo:** `src/app/services/auth.service.ts`

**O que:** Serviço `providedIn: 'root'` com:
- `register(name, email, password)` → `POST /api/auth/register` → retorna `Observable<AuthResponse>`
- `login(email, password)` → `POST /api/auth/login` → retorna `Observable<AuthResponse>`
- Sinais reativos: `currentUser`, `isAuthenticated`, `token`
- Armazena token JWT no `localStorage`
- Método `logout()` para limpar o token

**Por que:** Centraliza toda lógica de autenticação. Componentes não precisam saber de HTTP, headers, ou storage.

---

#### 5. Criar modelos TypeScript
**Arquivo novo:** `src/app/services/auth.models.ts`

**O que:** Interfaces TypeScript espelhando os DTOs da API:
```ts
interface RegisterRequest { name: string; email: string; password: string; }
interface LoginRequest { email: string; password: string; }
interface AuthResponse { token: string; name: string; email: string; expiresAt: string; }
```

**Por que:** Type safety em toda a camada de comunicação com a API.

---

#### 6. Criar Interceptor JWT
**Arquivo novo:** `src/app/core/interceptors/auth.interceptor.ts`

**O que:** Interceptor funcional que:
- Lê o token do `AuthService`
- Adiciona header `Authorization: Bearer <token>` em toda requisição
- Em caso de erro 401, limpa o token

**Por que:** Evita repetir o header em cada chamada de API. Toda requisição automaticamente carrega o token.

---

#### 7. Atualizar app.config.ts
**Arquivo:** `src/app/app.config.ts`

**O que:** Adicionar `withInterceptors([authInterceptor])` ao `provideHttpClient`.

**Por que:** Registrar o interceptor para que o Angular o execute.

---

#### 8. Atualizar RegisterPage
**Arquivo:** `src/app/pages/auth/register/register.ts`

**O que mudar:**

| O que | Antes | Depois |
|-------|-------|--------|
| Validação | Nenhuma | Email (regex), senha ≥6 chars, confirmação igual, termos aceitos, nome obrigatório |
| Erros | Não existia | Campo `error` do `app-input` mostra mensagem de validação |
| Submit | `setTimeout` + `console.log` | `authService.register()` → POST real para API |
| Sucesso | - | Armazena token e redireciona para `/` |
| Erro da API | - | Exibe mensagem de erro (ex: "Email já cadastrado") |
| Loader | Já existia (`submitting` signal) | Continua igual, mas agora real |

**Detalhes da validação:**
- **Nome:** obrigatório, máx 100 caracteres (espelha `[MaxLength(100)]` do backend)
- **Email:** obrigatório, formato válido (regex simples)
- **Senha:** obrigatório, mínimo 6 caracteres (espelha `[MinLength(6)]` do backend)
- **Confirmar senha:** deve ser igual à senha
- **Termos:** deve aceitar

**Por que:** O formulário atual é um placeholder (TODO). Isso o torna funcional e conectado à API real.

---

## Fluxo Completo Após as Mudanças

```
[Register Page]
  │  Usuário preenche: Nome, Email, Senha, Confirmar Senha, Aceita Termos
  │  Validação local checa todos os campos
  │
  ▼
[AuthService.register(name, email, password)]
  │  POST https://localhost:7103/api/auth/register
  │  Body: { "name": "...", "email": "...", "password": "..." }
  │
  ▼
[AuthController.Register()] (.NET)
  │  Valida DataAnnotations → 400 se inválido
  │  Chama AuthService.RegisterAsync()
  │    ├─ Verifica email duplicado → 409 se já existe
  │    ├─ Hash da senha com BCrypt
  │    ├─ Salva usuário no PostgreSQL
  │    └─ Gera JWT (nameid, unique_name, email, exp: +8h)
  │  Retorna 200 + AuthResponseDto
  │
  ▼
[AuthService] (Angular)
  │  Armazena token no localStorage
  │  Atualiza signals (currentUser, isAuthenticated)
  │
  ▼
[Interceptor JWT]
  │  Próximas requisições terão automaticamente:
  │  Authorization: Bearer eyJhbG...
  │
  ▼
[Router] Redireciona para /
```

---

## O que NÃO será feito neste plano

- Login (será feito depois, seguindo o mesmo padrão)
- Esqueci minha senha
- Login social (Google/GitHub)
- Tela de dashboard (ainda não existe)
- Refresh token (API atual não tem)

---

## Ordem de Execução

1. **Backend:** Criar `AuthController.cs`
2. **Backend:** Registrar `IAuthService`/`AuthService` no DI
3. **Frontend:** Criar `environments/`
4. **Frontend:** Criar `services/auth.models.ts`
5. **Frontend:** Criar `services/auth.service.ts`
6. **Frontend:** Criar `core/interceptors/auth.interceptor.ts`
7. **Frontend:** Atualizar `app.config.ts`
8. **Frontend:** Atualizar `pages/auth/register/register.ts` (validação + API)
