# Authentication & Authorization — Complete Guide for .NET Developers

## Table of Contents

1. [Core Concepts](#core-concepts)
2. [Basic Authentication](#1-basic-authentication)
3. [Cookie-Based Authentication](#2-cookie-based--session-authentication)
4. [JWT Authentication](#3-jwt-json-web-token-authentication)
5. [OAuth 2.0 / OpenID Connect](#4-oauth-20--openid-connect-oidc)
6. [ASP.NET Core Identity](#5-aspnet-core-identity)
7. [Duende IdentityServer / OpenIddict](#6-duende-identityserver--openiddict)
8. [Policy-Based & Claims-Based Authorization](#7-policy-based--claims-based-authorization)
9. [Two-Factor Authentication (2FA / MFA)](#8-two-factor-authentication-2fa--mfa)
10. [API Key Authentication](#9-api-key-authentication)
11. [Certificate-Based Authentication / mTLS](#10-certificate-based-authentication--mtls)
12. [Related Terminology](#related-terminology)
13. [Decision Guide — কোনটা কখন ব্যবহার করবেন](#decision-guide)

---

## Core Concepts

### Authentication vs Authorization

```mermaid
flowchart LR
    A["Request আসলো"] --> B{"Authentication<br>তুমি কে?"}
    B -->|"❌"| C["401 Unauthorized"]
    B -->|"✅"| D{"Authorization<br>Permission আছে?"}
    D -->|"❌"| E["403 Forbidden"]
    D -->|"✅"| F["200 OK ✅"]
```

| Authentication (AuthN) | Authorization (AuthZ) |
|---|---|
| তুমি **কে**? (Identity) | তোমার **কি করার permission** আছে? (Access) |
| Login process | Permission check |
| **401** Unauthorized | **403** Forbidden |
| আগে হয় | পরে হয় |

### Principal, Identity, Claim — সম্পর্ক

```mermaid
flowchart TD
    A["ClaimsPrincipal<br>(ব্যক্তি — আপনি)"] --> B["ClaimsIdentity 1<br>(পরিচয়পত্র — NID)"]
    A --> C["ClaimsIdentity 2<br>(পরিচয়পত্র — Passport)"]
    B --> D["Claim: Name = Rahim"]
    B --> E["Claim: Role = Admin"]
    B --> F["Claim: Department = HR"]
    C --> G["Claim: Nationality = BD"]
```

| Term | কি | Real Life |
|------|-----|-----------|
| **Principal** | বর্তমান ব্যবহারকারী | আপনি (একজন মানুষ) |
| **Identity** | একটি পরিচয়পত্র | আপনার NID / Passport |
| **Claim** | পরিচয়পত্রে থাকা তথ্য | নাম, জন্মতারিখ, ঠিকানা |

### .NET Middleware Order (গুরুত্বপূর্ণ)

```csharp
app.UseAuthentication();  // ১ম — "তুমি কে?"
app.UseAuthorization();   // ২য় — "তোমার permission আছে?"
// এই order ভুল হলে কাজ করবে না!
```

---

## 1. Basic Authentication

### What

HTTP protocol এর সবচেয়ে সহজ authentication method। Client প্রতিটি request এর সাথে **username ও password** পাঠায় — Base64 encoded format এ।

### How it Works

```mermaid
sequenceDiagram
    participant Client
    participant Server

    Client->>Server: GET /api/data (No credentials)
    Server-->>Client: 401 Unauthorized (WWW-Authenticate: Basic)

    Note over Client: Base64("admin:password123")<br>= "YWRtaW46cGFzc3dvcmQxMjM="

    Client->>Server: GET /api/data<br>Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM=
    Server-->>Client: 200 OK + Data
```

### Key Points

- প্রতিটি request এ credentials পাঠাতে হয় — **stateless**
- Base64 হলো **encoding, encryption না** — সহজেই decode করা যায়
- **HTTPS ছাড়া কখনো ব্যবহার করবেন না**
- কোনো session/token/logout mechanism নেই

### .NET এ কিভাবে করে

`AuthenticationHandler<AuthenticationSchemeOptions>` inherit করে custom handler বানাতে হয়। Handler `Authorization` header থেকে Base64 decode করে credentials বের করে validate করে।

### কখন ব্যবহার করবেন

- Internal tools, admin panels
- Server-to-server communication
- Quick prototyping
- **Production এ recommend করা হয় না**

---

## 2. Cookie-Based / Session Authentication

### What

User একবার login করলে server একটি **encrypted cookie** browser এ পাঠায়। পরবর্তী প্রতিটি request এ browser **automatically** সেই cookie পাঠায়।

### Basic Auth vs Cookie Auth

| Basic Auth | Cookie Auth |
|-----------|-------------|
| প্রতিবার username/password | একবার login, তারপর cookie |
| Stateless | Stateful হতে পারে |
| Logout নেই | Cookie delete = logout |
| API এর জন্য | Web application এর জন্য |

### How it Works

```mermaid
sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: POST /login (username + password)
    Note over Server: Credentials validate করে
    Server-->>Browser: 200 OK + Set-Cookie header (HttpOnly Secure)

    Browser->>Server: GET /api/products (Cookie header auto-sent)
    Note over Server: Cookie decrypt করে user info বের করে
    Server-->>Browser: 200 OK + Data

    Browser->>Server: POST /logout
    Server-->>Browser: Set-Cookie with expired date (cookie cleared)
```

### Cookie এর Important Properties

| Property | কাজ |
|----------|-----|
| `HttpOnly` | JavaScript থেকে cookie access বন্ধ (XSS protection) |
| `Secure` | শুধু HTTPS connection এ cookie পাঠাবে |
| `SameSite` | Cross-site request এ cookie পাঠানো নিয়ন্ত্রণ (CSRF protection) |
| `Expires` | Cookie এর মেয়াদ শেষ হওয়ার সময় |

### SameSite Modes

```mermaid
flowchart TD
    A["অন্য site থেকে request"] --> B{SameSite Mode?}
    B -->|Strict| C["Cookie যাবে না ❌<br>সবচেয়ে safe"]
    B -->|Lax| D{Request type?}
    D -->|Link click / GET| E["Cookie যাবে ✅"]
    D -->|POST / iframe| F["Cookie যাবে না ❌"]
    B -->|None| G["Cookie সবসময় যাবে ✅<br>Secure flag mandatory"]
```

### Session vs Cookie Authentication

```mermaid
flowchart TD
    A[Cookie-Based Auth] --> B{Data কোথায়?}
    B -->|Cookie তে| C["Cookie Auth<br>Encrypted data cookie তেই<br>.NET default এটা"]
    B -->|Server এ| D["Session Auth<br>Server memory/Redis এ data<br>Cookie তে শুধু SessionId"]
```

### Sliding vs Absolute Expiration

| Sliding | Absolute |
|---------|----------|
| Active থাকলে সময় বাড়ে | Fixed সময়ে expire হবে |
| 30 min inactive হলে expire | 8 ঘণ্টা পর expire — যতই active থাকুন |
| `options.SlidingExpiration = true` | `ExpiresUtc = DateTimeOffset.UtcNow.AddHours(8)` |
| Best practice: দুটো একসাথে ব্যবহার করুন ||

### কখন ব্যবহার করবেন

- Traditional **MVC web applications** (Razor Pages, Blazor Server)
- Same-domain frontend ও backend
- Browser-based applications
- **Mobile/SPA এর জন্য recommend করা হয় না** — JWT ভালো

---

## 3. JWT (JSON Web Token) Authentication

### What

JWT হলো একটি **self-contained token** যেটা JSON format এ user information বহন করে। Server এর কোনো session store করার দরকার নেই — token নিজেই সব information রাখে। সম্পূর্ণ **stateless**।

### JWT Structure — তিনটি অংশ

```
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBZG1pbiJ9.SflKxwRJSM
|_______ Header _______||_____________ Payload _______________||___ Signature ___|
```

```mermaid
flowchart LR
    A["Header<br>(Algorithm + Type)"] --- B["Payload<br>(User Data / Claims)"] --- C["Signature<br>(Verification)"]

    style A fill:#FF6B6B,color:#fff
    style B fill:#4ECDC4,color:#fff
    style C fill:#45B7D1,color:#fff
```

| অংশ | কি থাকে | উদাহরণ |
|------|--------|--------|
| **Header** | Algorithm ও token type | `{"alg": "HS256", "typ": "JWT"}` |
| **Payload** | User data (claims) | `{"sub": "123", "role": "Admin", "exp": 1710594000}` |
| **Signature** | Tamper protection | `HMACSHA256(header + "." + payload, secret_key)` |

> **গুরুত্বপূর্ণ:** Payload **encrypted না** — যে কেউ Base64 decode করে পড়তে পারবে। Signature শুধু **tampering** ঠেকায়, data লুকায় না। তাই **sensitive data (password, card number) JWT তে রাখবেন না।**

### How it Works

```mermaid
sequenceDiagram
    participant Client
    participant Server

    Client->>Server: POST /login (username + password)
    Note over Server: Validate → JWT Token তৈরি করো
    Server-->>Client: {token: "eyJhbG...", expiration: "..."}

    Note over Client: Token store করো (localStorage/cookie)

    Client->>Server: GET /api/products<br>Authorization: Bearer eyJhbG...
    Note over Server: Signature valid? Expired না? Issuer ঠিক?
    Server-->>Client: 200 OK + Data

    Note over Client: Token expire হলে
    Client->>Server: GET /api/products (expired token)
    Server-->>Client: 401 — Token Expired
```

### Cookie Auth vs JWT Auth

| Cookie Auth | JWT Auth |
|-------------|----------|
| Browser automatically cookie পাঠায় | Client manually token পাঠায় |
| Server-side state দরকার হতে পারে | সম্পূর্ণ **stateless** |
| শুধু browser এ ভালো | Browser, Mobile, API সবখানে |
| Same domain | **Cross-domain** কাজ করে |
| CSRF risk আছে | CSRF risk নেই |

### Registered Claims

| Claim | Full Form | মানে |
|-------|-----------|-------|
| `sub` | Subject | কার token (user ID) |
| `iss` | Issuer | কে token তৈরি করেছে |
| `aud` | Audience | কার জন্য token |
| `exp` | Expiration | কখন expire হবে |
| `iat` | Issued At | কখন তৈরি হয়েছে |
| `nbf` | Not Before | কখন থেকে valid |
| `jti` | JWT ID | Token এর unique ID |

### Refresh Token Pattern

```mermaid
sequenceDiagram
    participant Client
    participant Server

    Client->>Server: POST /login
    Server-->>Client: Access Token (15 min) + Refresh Token (7 days)

    Note over Client: Access Token দিয়ে API call

    Note over Client: 15 min পরে expire হলো

    Client->>Server: POST /refresh {refreshToken: "xyz..."}
    Server-->>Client: New Access Token + New Refresh Token

    Note over Server: পুরাতন Refresh Token revoke
```

| | Access Token | Refresh Token |
|---|---|---|
| Lifetime | Short (15-60 min) | Long (7-30 days) |
| Format | JWT — claims সহ | Random string — কোনো data নেই |
| Purpose | API access | নতুন Access Token নেওয়া |
| Storage | Client (memory/cookie) | Database (server-side) |

### Token কোথায় Store করবেন

| Storage | XSS Safe? | CSRF Safe? | Refresh এ থাকে? | Verdict |
|---------|-----------|------------|-----------------|---------|
| `localStorage` | ❌ | ✅ | ✅ | ⚠️ Popular কিন্তু risky |
| `sessionStorage` | ❌ | ✅ | ✅ (same tab) | ⚠️ একটু ভালো |
| `HttpOnly Cookie` | ✅ | ❌ (SameSite fix) | ✅ | ✅ **Best option** |
| `Memory (variable)` | ✅ | ✅ | ❌ | ✅ Most secure, UX issue |

### Symmetric vs Asymmetric Signing

```mermaid
flowchart TD
    A["JWT Signing"] --> B["Symmetric — HMAC<br>একটাই key<br>Sign ও verify দুটোতে"]
    A --> C["Asymmetric — RSA/ECDSA<br>দুটো key<br>Private sign, Public verify"]

    B --> B1["✅ Fast<br>❌ Key share করতে হয়<br>🎯 Monolith / Single server"]
    C --> C1["✅ Key share safe<br>❌ Slower<br>🎯 Microservices"]
```

### JWT Revocation Approaches

| Approach | কিভাবে | Performance |
|----------|--------|-------------|
| **Token Blacklist (Redis)** | Revoked token ID Redis এ রাখো | ⚡ Fast lookup |
| **Short-lived + Refresh Revoke** | Access 15 min, Refresh DB তে revoke | ⚡ No extra lookup |
| **Token Version (per-user)** | User table এ version, mismatch = invalid | DB call per request |

### Sensitive Data Handling in JWT

```mermaid
flowchart TD
    A["Sensitive data handle<br>করতে চাই"] --> B{"Token এ রাখতে হবে?"}
    B -->|"না (RECOMMENDED)"| C["Token এ শুধু user ID<br>Sensitive data API call এ আনুন"]
    B -->|"হ্যাঁ"| D{"কতটুকু protect?"}
    D -->|"পুরো token"| E["JWE — Encrypted JWT"]
    D -->|"Specific fields"| F["Field-level encryption"]

    G["কোনো token এ data<br>রাখতে চাই না"] --> H["Opaque Token<br>Random string, data DB তে"]
```

### কখন ব্যবহার করবেন

- **SPA** (React, Angular, Vue)
- **Mobile Apps**
- **REST APIs**
- **Microservices**
- **Cross-domain** communication

---

## 4. OAuth 2.0 / OpenID Connect (OIDC)

### What

**OAuth 2.0** হলো একটি authorization framework যেটা third-party application কে user এর resource এ **limited access** দেয় — user এর password share না করেই।

**OpenID Connect (OIDC)** হলো OAuth 2.0 এর উপরে একটি **identity layer** — authentication ও দেয়।

```mermaid
flowchart TD
    A["OpenID Connect (OIDC)"] --> B["OAuth 2.0"]
    B --> C["HTTP"]
    A -.- D["Authentication — তুমি কে?<br>ID Token দেয়"]
    B -.- E["Authorization — কি access পাবে?<br>Access Token দেয়"]
```

```
OAuth 2.0 = "এই app কে আমার Google Photos দেখার permission দাও"
OIDC      = "এই app কে বলো আমি কে" + OAuth 2.0 এর সব কিছু
```

### Key Roles

```mermaid
flowchart LR
    A["Resource Owner<br>(User — আপনি)"] -->|"Permission দেয়"| B["Client<br>(Your App)"]
    B -->|"Token চায়"| C["Authorization Server<br>(Google)"]
    C -->|"Token verify"| D["Resource Server<br>(Google API)"]
```

| Term | কে | উদাহরণ |
|------|-----|--------|
| **Resource Owner** | User | আপনি |
| **Client** | যে app access চাইছে | আপনার Website |
| **Authorization Server** | Token issue করে | Google OAuth Server |
| **Resource Server** | Protected data রাখে | Google Photos API |
| **Scope** | কতটুকু access | `profile`, `email`, `photos.read` |

### OAuth 2.0 Grant Types

```mermaid
flowchart TD
    A["OAuth 2.0 Flows"] --> B["Authorization Code<br>✅ RECOMMENDED<br>Server-side apps"]
    A --> C["Authorization Code + PKCE<br>✅ RECOMMENDED<br>SPA / Mobile"]
    A --> D["Client Credentials<br>✅ Machine-to-Machine"]
    A --> E["Resource Owner Password<br>⚠️ Legacy only"]
    A --> F["Implicit<br>❌ DEPRECATED"]

    style B fill:#27ae60,color:#fff
    style C fill:#27ae60,color:#fff
    style D fill:#2980b9,color:#fff
    style E fill:#f39c12,color:#fff
    style F fill:#e74c3c,color:#fff
```

### Authorization Code Flow (সবচেয়ে Common)

```mermaid
sequenceDiagram
    participant User
    participant App as Your App
    participant Google as Google (Auth Server)
    participant API as Google API

    User->>App: "Login with Google" ক্লিক
    App->>Google: /authorize?client_id=abc&scope=profile email&redirect_uri=.../callback

    Google->>User: Login Page → Email + Password
    User->>Google: "Allow" ক্লিক (Consent)

    Google-->>App: Redirect → /callback?code=AUTH_CODE
    App->>Google: POST /token {code, client_id, client_secret}
    Google-->>App: {access_token, id_token, refresh_token}

    App->>API: GET /userinfo + Bearer access_token
    API-->>App: {name, email, picture}
```

### PKCE — কেন SPA/Mobile এ দরকার

```mermaid
flowchart TD
    A["সমস্যা"] --> B["SPA/Mobile এ client_secret<br>safe রাখা যায় না<br>Browser source code দেখা যায়"]
    B --> C["PKCE Solution"]
    C --> D["code_verifier = random string<br>(শুধু client জানে)"]
    C --> E["code_challenge = SHA256(verifier)<br>(server এ পাঠায়)"]
    C --> F["Token নিতে verifier লাগে<br>Hacker জানে না → safe"]
```

### ID Token vs Access Token

| | ID Token | Access Token |
|---|---|---|
| Purpose | User কে identify করা | API access করা |
| Format | সবসময় JWT | JWT বা Opaque |
| কোথায় পাঠায় | কোথাও না — শুধু Client পড়ে | Resource Server এ |
| Contains | name, email, picture | scopes, permissions |

### Client Credentials Flow (Machine-to-Machine)

```mermaid
sequenceDiagram
    participant ServiceA as Order Service
    participant Auth as Auth Server
    participant ServiceB as Payment Service

    ServiceA->>Auth: POST /token {client_id, client_secret, grant_type: client_credentials}
    Auth-->>ServiceA: {access_token}
    ServiceA->>ServiceB: POST /api/payment + Bearer token
    ServiceB-->>ServiceA: 200 OK
```

কোনো user involved না — শুধু service-to-service।

### কখন ব্যবহার করবেন

- **"Login with Google/GitHub/Facebook"**
- Third-party API access
- **SPA + Mobile** (PKCE flow)
- **Microservices** (Client Credentials)
- User password handle করতে না চাইলে

---

## 5. ASP.NET Core Identity

### What

Microsoft এর **built-in membership system** — user registration, login, password management, role management, 2FA সব কিছু out-of-the-box দেয়।

```mermaid
flowchart TD
    A["ASP.NET Core Identity"] --> B["UserManager<br>User CRUD"]
    A --> C["SignInManager<br>Login/Logout"]
    A --> D["RoleManager<br>Role CRUD"]

    B --> E["Entity Framework Core<br>IdentityDbContext"]
    C --> E
    D --> E
    E --> F["SQL Server / PostgreSQL / SQLite"]
```

### কি কি পাওয়া যায় Built-in

- User Registration + Login
- Password Hashing (PBKDF2) + Validation rules
- Role Management (Admin, User, Manager)
- Email Confirmation
- Two-Factor Authentication (2FA)
- Account Lockout (5 বার ভুল = lock)
- External Login (Google, GitHub)
- Password Reset Token
- Security Stamp (password change = সব session invalid)

### Database Tables

```mermaid
erDiagram
    AspNetUsers ||--o{ AspNetUserRoles : has
    AspNetRoles ||--o{ AspNetUserRoles : has
    AspNetUsers ||--o{ AspNetUserClaims : has
    AspNetUsers ||--o{ AspNetUserLogins : has
    AspNetUsers ||--o{ AspNetUserTokens : has

    AspNetUsers {
        string Id PK
        string UserName
        string Email
        string PasswordHash
        bool EmailConfirmed
        bool TwoFactorEnabled
        int AccessFailedCount
        bool LockoutEnabled
    }

    AspNetRoles {
        string Id PK
        string Name
    }

    AspNetUserRoles {
        string UserId FK
        string RoleId FK
    }
```

### Password কিভাবে Store হয়

```mermaid
flowchart LR
    A["Password: MySecret@123"] -->|"PBKDF2 Hash + Salt"| B["AQAAAAIAAYag...<br>(irreversible)"]
    B -->|"❌ Reverse অসম্ভব"| A
```

Identity **কখনো plain text password store করে না**। Hash থেকে original password বের করা সম্ভব না।

### Security Stamp

Password change, 2FA enable — এসব security-sensitive action এ Security Stamp change হয়। Stamp change মানে **সব পুরাতন cookie/token invalid** — সব device থেকে logout।

### কখন ব্যবহার করবেন

- **যেকোনো production .NET application** যেখানে user management দরকার
- Full-featured auth চাইলে
- **Recommended for most .NET applications**

---

## 6. Duende IdentityServer / OpenIddict

### What

আপনি **নিজের OAuth 2.0 / OIDC server** তৈরি করতে পারবেন — "Login with YourCompany"। একাধিক application এ **Single Sign-On (SSO)** implement করতে পারবেন।

### কেন দরকার

```mermaid
flowchart TD
    A["❌ Without IdentityServer"] --> B["প্রতিটি app এ আলাদা<br>login system<br>আলাদা user database"]

    C["✅ With IdentityServer"] --> D["একটি Central Auth Server<br>সব app একই server থেকে login<br>Single Sign-On (SSO)"]
```

### Architecture

```mermaid
flowchart TD
    subgraph Clients
        C1["React SPA"]
        C2["Mobile App"]
        C3["MVC App"]
        C4["Background Service"]
    end

    subgraph AuthServer["IdentityServer"]
        IS["Central Auth Server"]
    end

    subgraph APIs["Protected APIs"]
        API1["Product API"]
        API2["Order API"]
    end

    C1 -->|"Login"| IS
    C2 -->|"Login"| IS
    C3 -->|"Login"| IS
    C4 -->|"Client Credentials"| IS

    IS -->|"Tokens"| C1
    IS -->|"Tokens"| C2

    C1 -->|"Access Token"| API1
    C2 -->|"Access Token"| API2

    style IS fill:#e74c3c,color:#fff
```

### Core Concepts

| Concept | কি | উদাহরণ |
|---------|-----|--------|
| **Clients** | কোন app login করতে পারবে | react-spa, mobile-app |
| **Identity Resources** | User এর কি info দেবে | openid, profile, email |
| **API Scopes** | কোন API permission | products.read, orders.write |
| **API Resources** | কোন API protect হবে | Product API, Order API |

### SSO (Single Sign-On) Flow

```mermaid
sequenceDiagram
    participant User
    participant HRApp
    participant FinanceApp
    participant IS as IdentityServer

    User->>HRApp: Open HR App
    HRApp->>IS: Redirect to /authorize
    IS->>User: Login Page
    User->>IS: Email + Password
    IS-->>HRApp: Tokens ✅

    Note over User: HR App এ logged in

    User->>FinanceApp: Open Finance App (১০ min পরে)
    FinanceApp->>IS: Redirect to /authorize
    Note over IS: Session আছে! আবার login লাগবে না!
    IS-->>FinanceApp: Tokens ✅ (login ছাড়াই!)

    Note over User: Finance App এও logged in!<br>আবার password দিতে হয়নি!
```

### Discovery Document

IdentityServer একটি well-known endpoint expose করে:

```
GET /.well-known/openid-configuration

→ authorization_endpoint, token_endpoint, jwks_uri,
  scopes_supported, grant_types_supported সব পাওয়া যায়
```

Client apps এই endpoint থেকে **automatically** সব settings বুঝে নেয়।

### Duende vs OpenIddict

| | Duende IdentityServer | OpenIddict |
|---|---|---|
| License | 💰 Commercial | 🆓 Free |
| Features | Feature-rich | Lightweight |
| Best for | Enterprise | Small-medium apps |

### কখন ব্যবহার করবেন

- **SSO** — একাধিক app, একবার login
- **Microservices** — centralized auth
- নিজের OAuth server বানাতে চাইলে
- **Single app হলে overkill** — Identity alone যথেষ্ট

---

## 7. Policy-Based & Claims-Based Authorization

### What

Role-based authorization শুধু role check করে। কিন্তু complex business rules দরকার হলে — **Policy-Based Authorization** ব্যবহার করতে হয়।

```
Role-Based:    "তুমি কি Manager?" → হ্যাঁ/না
Claims-Based:  "তোমার Department কি?" → HR
Policy-Based:  "তুমি কি HR এর Manager, ২+ বছর experience,
                office hours এ?" → হ্যাঁ/না
```

### Authorization Approaches

```mermaid
flowchart TD
    A["Authorization"] --> B["Role-Based<br>Simple — Admin/User"]
    A --> C["Claims-Based<br>Medium — Claim value check"]
    A --> D["Policy-Based<br>Advanced — Custom logic"]
    A --> E["Resource-Based<br>নিজের data নিজে edit"]

    style B fill:#3498db,color:#fff
    style C fill:#2ecc71,color:#fff
    style D fill:#e74c3c,color:#fff
    style E fill:#9b59b6,color:#fff
```

### Policy Architecture

```mermaid
flowchart LR
    A["Policy"] --> B["Requirement<br>(কি শর্ত)"]
    B --> C["Handler<br>(কিভাবে check)"]
    C --> D{"Succeed?"}
    D -->|Yes| E["✅ Access"]
    D -->|No| F["❌ Denied"]
```

### Policy Types

| Type | উদাহরণ | কিভাবে |
|------|--------|--------|
| **Simple Claim** | Department = HR | `policy.RequireClaim("Department", "HR")` |
| **Multiple Conditions** | Manager + HR + 2yr exp | Multiple `Require` calls (AND logic) |
| **Custom Requirement** | Office hours check | Custom `IAuthorizationRequirement` + Handler |
| **Resource-Based** | নিজের document edit | `IAuthorizationService.AuthorizeAsync(User, resource, requirement)` |
| **Dynamic Policy** | DB থেকে permission load | Custom `IAuthorizationPolicyProvider` |

### Permission-Based Pattern (Real-World)

```mermaid
erDiagram
    Users ||--o{ UserRoles : has
    Roles ||--o{ UserRoles : has
    Roles ||--o{ RolePermissions : has
    Permissions ||--o{ RolePermissions : has
```

```
Role-Permission Matrix:
                    Admin    Manager    User
products.view        ✅        ✅       ✅
products.create      ✅        ✅       ❌
products.delete      ✅        ❌       ❌
orders.approve       ✅        ✅       ❌
users.assign-role    ✅        ❌       ❌
```

### RBAC vs ABAC

| RBAC (Role-Based) | ABAC (Attribute-Based) |
|---|---|
| Role দিয়ে permission | Attributes/conditions দিয়ে permission |
| Simple ও commonly used | Complex কিন্তু flexible |
| `[Authorize(Roles = "Admin")]` | `[Authorize(Policy = "HRManagerDuringOfficeHours")]` |

---

## 8. Two-Factor Authentication (2FA / MFA)

### What

Login করতে **দুটি ভিন্ন ধরনের proof** দিতে হবে। শুধু password জানলেই হবে না।

```mermaid
flowchart TD
    A["Authentication Factors"] --> B["🔑 Something You KNOW<br>Password, PIN"]
    A --> C["📱 Something You HAVE<br>Phone, Hardware Key"]
    A --> D["🧬 Something You ARE<br>Fingerprint, Face ID"]
```

**2FA = যেকোনো ২টি ভিন্ন category এর factor**

| ✅ Valid 2FA | ❌ Not 2FA |
|---|---|
| Password + OTP Code | Password + Security Question |
| Password + Fingerprint | (দুটোই "Know" category) |
| Password + Hardware Key | |

### 2FA Methods

```mermaid
flowchart TD
    A["2FA Methods"] --> B["📧 Email OTP<br>সহজ কিন্তু slow"]
    A --> C["📱 SMS OTP<br>⚠️ SIM swap risk"]
    A --> D["📲 Authenticator App (TOTP)<br>✅ RECOMMENDED"]
    A --> E["🔐 Hardware Key (FIDO2)<br>সবচেয়ে secure"]
    A --> F["📩 Push Notification"]
```

### TOTP — কিভাবে কাজ করে (Google/Microsoft Authenticator)

```mermaid
sequenceDiagram
    participant User
    participant Server
    participant App as Authenticator App

    Note over User,Server: Setup (একবার)
    Server->>User: QR Code (secret key encoded)
    User->>App: QR Code scan → secret key store

    Note over User,Server: Login (প্রতিবার)
    User->>Server: Email + Password
    Server-->>User: "Enter 2FA code"

    Note over App: HMAC-SHA1(secret_key, current_time/30)<br>= 847293 (30 sec valid)
    User->>Server: Code: 847293
    Note over Server: Same calculation → 847293 ✅ Match!
    Server-->>User: Login Successful ✅
```

```
TOTP = Secret Key + Current Time → 6-digit Code
প্রতি 30 সেকেন্ডে নতুন code
Server ও App দুজনেই same key + same time = same code
Internet connection লাগে না!
```

### Login Flow with 2FA

```mermaid
flowchart TD
    A["Email + Password"] --> B{"Credentials valid?"}
    B -->|"❌"| C["401 Unauthorized"]
    B -->|"✅"| D{"2FA enabled?"}
    D -->|"No"| E["JWT Token → Login complete ✅"]
    D -->|"Yes"| F["'Enter 2FA code'"]
    F --> G{"Code valid?"}
    G -->|"✅"| H["JWT Token → Login complete ✅"]
    G -->|"❌"| I["401 → Failed count++"]

    F --> J["Phone হারিয়েছি!"]
    J --> K["Recovery Code দিয়ে login"]
```

### Recovery Codes

Phone হারালে Authenticator app এর data ও হারিয়ে যায়। Recovery codes হলো **emergency login** এর জন্য one-time use codes।

```
ABCD-1234-EFGH   (প্রতিটি code একবারই ব্যবহারযোগ্য)
IJKL-5678-MNOP   (safe জায়গায় save করতে হবে)
QRST-9012-UVWX   (setup এ একবারই দেখানো হয়)
```

### কখন ব্যবহার করবেন

| সবসময় | Recommended | Optional |
|--------|-------------|----------|
| Banking/Financial 🏦 | Email services 📧 | Social media 📱 |
| Healthcare 🏥 | E-commerce 🛒 | Blog sites 📝 |
| Admin panels ⚙️ | | |

---

## 9. API Key Authentication

### What

API Key হলো একটি **unique string** যেটা client প্রতিটি request এ পাঠায়। কোনো login flow নেই, কোনো token exchange নেই — শুধু key দাও আর API access পাও।

```
JWT/OAuth = Airport Security (Passport → Boarding Pass → Gate)
API Key   = Building Access Card (Card swipe করো → ঢোকো)
```

### কোনটা কখন

```mermaid
flowchart TD
    B{"কে API ব্যবহার করবে?"}
    B -->|"End User (Human)"| C["JWT / OAuth"]
    B -->|"Developer / Service (Machine)"| D["API Key"]
```

### API Key কোথায় পাঠাবেন

| Method | Security | Recommendation |
|--------|----------|----------------|
| **Header** `X-API-Key: sk_live_abc` | ✅ Logs এ দেখা যায় না | ✅ **RECOMMENDED** |
| **Query Param** `?api_key=abc` | ❌ URL logs এ expose | ⚠️ Avoid |
| **Request Body** | ❌ GET এ কাজ করে না | ❌ Don't use |

### Key Naming Convention (Industry Standard)

```
Stripe:  sk_live_4eC39HqLyjWD...  (secret key, live environment)
         sk_test_4eC39HqLyjWD...  (secret key, test environment)
         pk_live_4eC39HqLyjWD...  (publishable key, live)

OpenAI:  sk-proj-abc123def456...
```

### Key Security

- **Hash করে store করুন** (SHA256) — plain text এ না
- Raw key **শুধু একবার** দেখানো হয় — পরে retrieve করা যায় না
- **Scope/permission restrict** করুন — minimum necessary access
- **Rate limiting** implement করুন — per key basis
- Environment separate করুন — test key দিয়ে live data access না

### API Key vs JWT vs OAuth

| | API Key | JWT | OAuth |
|---|---|---|---|
| Complexity | ⭐ Simple | ⭐⭐ Medium | ⭐⭐⭐ Complex |
| User identity | ❌ নেই | ✅ আছে | ✅ আছে |
| Expiration | সাধারণত নেই | Short-lived | Token expire হয় |
| Revocation | Key delete করলেই | কঠিন | Revoke endpoint |
| Best for | Third-party devs | SPA, Mobile | User delegation |
| Examples | Stripe, OpenAI | Internal apps | Login with Google |

### কখন ব্যবহার করবেন

- Third-party developer API (Stripe, Twilio style)
- Machine-to-machine / Background services
- Public data API (rate limit ও tracking এর জন্য)
- **End users (Browser/Mobile) এর জন্য নয়** — JWT/OAuth ব্যবহার করুন

---

## 10. Certificate-Based Authentication / mTLS

### What

Certificate-Based Authentication এ username/password এর বদলে **digital certificate** দিয়ে identity prove করা হয়। mTLS (Mutual TLS) এ **client ও server দুজনেই** একে অপরকে verify করে।

### TLS vs mTLS

```mermaid
flowchart TD
    A["Regular TLS (HTTPS)"] --> B["শুধু Server prove করে<br>Client: 'তুমি কি google.com?'<br>Server: 'হ্যাঁ, এই certificate' ✅"]

    C["mTLS (Mutual TLS)"] --> D["দুজনেই prove করে<br>Server: certificate দেখায় ✅<br>Server: 'তোমার certificate দেখাও'<br>Client: certificate দেখায় ✅"]

    style A fill:#3498db,color:#fff
    style C fill:#e74c3c,color:#fff
```

### Certificate Structure

```
┌─────────────────────────────────┐
│  Subject: CN=order-service       │ ← কার certificate
│  Issuer: CN=MyCompany-CA         │ ← কে sign করেছে
│  Valid From: 2026-01-01          │
│  Valid To: 2027-01-01            │
│  Public Key: RSA 2048-bit        │
│  CA Signature: <digital sig>     │ ← CA এর guarantee
└─────────────────────────────────┘
```

### mTLS Handshake

```mermaid
sequenceDiagram
    participant Client as Client (order-service)
    participant Server as Server (payment-api)

    Client->>Server: ClientHello
    Server->>Client: ServerHello + Server Certificate 🔐
    Server->>Client: CertificateRequest — "তোমার cert দেখাও"

    Note over Client: Server cert verify ✅
    Client->>Server: Client Certificate 🔐
    Note over Server: Client cert verify ✅

    Note over Client,Server: 🔒 Encrypted channel established<br>দুজনেই verified ✅✅
```

### Microservices Architecture

```mermaid
flowchart TD
    User -->|"HTTPS + JWT"| GW["API Gateway"]
    GW -->|"mTLS"| S1["Order Service 🔐"]
    S1 -->|"mTLS"| S2["Payment Service 🔐"]
    S1 -->|"mTLS"| S3["Inventory Service 🔐"]

    CA["Internal CA 🏛️"] -.->|"Issues certs"| S1
    CA -.->|"Issues certs"| S2
    CA -.->|"Issues certs"| S3
```

```
External → Gateway: HTTPS + JWT (user auth)
Internal services: mTLS (service-to-service auth)
```

### Certificate Rotation

Certificate expire হওয়ার আগে নতুন certificate deploy করতে হয়। **Graceful rotation** — পুরাতন ও নতুন দুটোই কিছু সময় valid রাখতে হয়।

### কখন ব্যবহার করবেন

- **Microservices** internal communication
- Banking / Financial — regulatory compliance
- Healthcare — HIPAA compliance
- **Zero-trust architecture** — "never trust, always verify"

---

## Related Terminology

### Security Attacks

| Attack | কি | Protection |
|--------|-----|-----------|
| **XSS** | Malicious script inject করে cookie/data চুরি | HttpOnly cookie, CSP header, input sanitization |
| **CSRF** | অন্য site থেকে logged-in session ব্যবহার করে request | SameSite cookie, Anti-Forgery Token |
| **Token Replay** | চুরি করা valid token reuse | Short lifetime, HTTPS, jti tracking |
| **Brute Force** | বারবার password guess করা | Account lockout, rate limiting, 2FA |
| **Man-in-the-Middle** | Network এ data intercept | HTTPS/TLS, mTLS |

### Cryptography Terms

| Term | কি | Direction |
|------|-----|-----------|
| **Hashing** | One-way transformation (password store) | Input → Hash (reverse অসম্ভব) |
| **Encryption** | Two-way transformation (data protect) | Input ↔ Encrypted (key দিয়ে reverse) |
| **Salt** | Hash এ যোগ করা random data | Same password → different hash |
| **Signing** | Data integrity ও authenticity verify | Private key sign, Public key verify |

### Protocol Terms

| Term | Full Form | মানে |
|------|-----------|-------|
| **HTTPS** | HTTP Secure | Encrypted HTTP (TLS ব্যবহার করে) |
| **TLS** | Transport Layer Security | Transport encryption (SSL এর successor) |
| **SSL** | Secure Sockets Layer | ❌ পুরাতন, deprecated |
| **PKI** | Public Key Infrastructure | Certificate management system |
| **CORS** | Cross-Origin Resource Sharing | Cross-domain request permission |

### Architecture Terms

| Term | মানে |
|------|-------|
| **SSO** | Single Sign-On — একবার login সব app এ access |
| **Zero Trust** | কাউকে বিশ্বাস করো না, সবাইকে verify করো |
| **Principle of Least Privilege** | Minimum necessary permission দাও |
| **Stateless** | Server কোনো state মনে রাখে না (JWT) |
| **Stateful** | Server state মনে রাখে (Session) |

### OAuth/OIDC Terms

| Term | মানে |
|------|-------|
| **Grant Type** | Token পাওয়ার উপায় (Auth Code, Client Credentials) |
| **Scope** | কতটুকু access (profile, email) |
| **Consent** | User এর permission ("Allow this app to...") |
| **PKCE** | SPA/Mobile এ code protection (pronounced "pixy") |
| **JWKS** | Public keys endpoint — token verify করতে |
| **Opaque Token** | Random string, no data inside — server lookup করে |
| **Bearer Token** | Token holder = authorized |
| **Token Introspection** | "এই token valid?" — auth server কে জিজ্ঞেস |

### HTTP Status Codes (Auth Related)

| Code | মানে | কখন |
|------|-------|------|
| **401** Unauthorized | "তুমি কে? Login করো" | Authentication failed |
| **403** Forbidden | "তোমাকে চিনি, permission নেই" | Authorization failed |
| **423** Locked | "Account locked" | Too many failed attempts |
| **429** Too Many Requests | "Rate limit exceeded" | API Key overuse |

---

## Decision Guide

### কোন Auth Method কখন

```mermaid
flowchart TD
    A["কোন Auth Method<br>ব্যবহার করব?"] --> B{"কে access করবে?"}

    B -->|"Human User<br>(Browser)"| C{"App type?"}
    C -->|"Traditional MVC"| D["Cookie Auth<br>+ ASP.NET Identity"]
    C -->|"SPA / Mobile"| E["JWT + OAuth 2.0"]
    C -->|"Multiple apps SSO"| F["IdentityServer / OIDC"]

    B -->|"Developer /<br>Third-party"| G["API Key"]

    B -->|"Service /<br>Machine"| H{"Environment?"}
    H -->|"Same network"| I["mTLS / Certificate"]
    H -->|"Cross-network"| J["Client Credentials<br>(OAuth 2.0)"]

    B -->|"High Security"| K["Any method + 2FA/MFA"]
```

### Complete Comparison Table

| # | Method | Complexity | Best For | Stateless? |
|---|--------|-----------|---------|-----------|
| 1 | Basic Auth | ⭐ | Internal tools, prototyping | ✅ |
| 2 | Cookie Auth | ⭐⭐ | MVC web apps | ❌ |
| 3 | JWT | ⭐⭐ | SPA, Mobile, REST APIs | ✅ |
| 4 | OAuth 2.0 / OIDC | ⭐⭐⭐ | Third-party login, delegation | ✅ |
| 5 | ASP.NET Identity | ⭐⭐ | Full user management | - |
| 6 | IdentityServer | ⭐⭐⭐⭐ | SSO, centralized auth, enterprise | ✅ |
| 7 | Policy-Based Auth | ⭐⭐ | Fine-grained access control | - |
| 8 | 2FA / MFA | ⭐⭐ | Extra security layer | - |
| 9 | API Key | ⭐ | Developer APIs, machine access | ✅ |
| 10 | mTLS | ⭐⭐⭐ | Microservices, zero-trust | ✅ |
