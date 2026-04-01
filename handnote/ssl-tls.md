# SSL/TLS — সম্পূর্ণ গাইড

## সূচিপত্র

- [SSL/TLS কী?](#ssltls-কী)
- [কোন সমস্যা সমাধান করে?](#কোন-সমস্যা-সমাধান-করে)
- [HTTP vs HTTPS](#http-vs-https)
- [Public Key এবং Private Key](#public-key-এবং-private-key)
- [SSL/TLS Handshake কিভাবে কাজ করে](#ssltls-handshake-কিভাবে-কাজ-করে)
- [Certificate Authority (CA) এবং Chain of Trust](#certificate-authority-ca-এবং-chain-of-trust)
- [SSL Certificate এর ভেতরে কী থাকে](#ssl-certificate-এর-ভেতরে-কী-থাকে)
- [SSL Certificate এর প্রকারভেদ](#ssl-certificate-এর-প্রকারভেদ)
- [SSL vs TLS — পার্থক্য](#ssl-vs-tls--পার্থক্য)
- [TLS 1.2 vs TLS 1.3](#tls-12-vs-tls-13)
- [Forward Secrecy](#forward-secrecy)
- [Certificate Revocation](#certificate-revocation)
- [সংক্ষেপে](#সংক্ষেপে)

---

## SSL/TLS কী?

**SSL (Secure Sockets Layer)** এবং **TLS (Transport Layer Security)** হলো **cryptographic protocol** যেটা internet এ দুইটা system এর মধ্যে **secure, encrypted communication** নিশ্চিত করে।

সহজ ভাষায় — যখন আপনি browser এ কোনো website visit করেন, আপনার browser আর ঐ website এর server এর মধ্যে যে data যায়-আসে সেটা যেন কেউ পড়তে বা পরিবর্তন করতে না পারে, সেই কাজটাই করে **SSL/TLS**।

> **গুরুত্বপূর্ণ:** SSL পুরনো এবং **deprecated**। আমরা এখন আসলে **TLS** ব্যবহার করি। কিন্তু অভ্যাসবশত মানুষ এখনো "SSL" বলে। তাই "SSL Certificate" আসলে **TLS Certificate**।

---

## কোন সমস্যা সমাধান করে?

SSL/TLS আসার আগে internet এ **তিনটি বড় সমস্যা** ছিল:

### 1. Eavesdropping (গোপনে তথ্য চুরি)

আগে **HTTP** তে সব data **plain text** এ যেত। যেকোনো **attacker** মাঝখানে বসে আপনার **password, credit card number** পড়ে ফেলতে পারত। এটাকে বলে **sniffing attack**।

**SSL/TLS এর সমাধান:** সব data **encrypt** করে পাঠায়। মাঝখানে কেউ ধরলেও শুধু অর্থহীন text দেখবে।

### 2. Man-in-the-Middle Attack (MITM)

আপনি ভাবছেন `bank.com` এ আছেন, কিন্তু আসলে একজন **attacker** মাঝখানে বসে আপনার সব **request** দেখছে এবং **modify** করছে।

**SSL/TLS এর সমাধান:** **Certificate** দিয়ে **server এর identity verify** করে। Browser চেক করে certificate টা trusted **Certificate Authority (CA)** থেকে issued কিনা।

### 3. Data Tampering (তথ্য পরিবর্তন)

Data যাওয়ার পথে কেউ **modify** করে দিতে পারত। যেমন: আপনি ১০০০ টাকা transfer করছেন, attacker সেটা ১০,০০০ বানিয়ে দিল।

**SSL/TLS এর সমাধান:** **Data integrity check** করে। কোনো data পথে modify হলে সাথে সাথে ধরা পড়ে।

```mermaid
graph LR
    A[SSL/TLS সমস্যা সমাধান]
    A --> B["🔒 Encryption<br/>Data চুরি থেকে রক্ষা"]
    A --> C["🪪 Authentication<br/>Server identity verify"]
    A --> D["✅ Integrity<br/>Data পরিবর্তন ধরা"]
```

---

## HTTP vs HTTPS

**HTTPS = HTTP + SSL/TLS**

| বিষয় | HTTP | HTTPS |
|-------|------|-------|
| **URL** | `http://example.com` | `https://example.com` |
| **Port** | 80 | 443 |
| **Data** | Plain text | Encrypted |
| **Security** | কেউ পড়তে পারে | কেউ পড়তে পারে না |
| **Certificate** | লাগে না | SSL/TLS Certificate লাগে |

```mermaid
sequenceDiagram
    participant U as User
    participant A as Attacker
    participant S as Server

    Note over U,S: ❌ HTTP (Insecure)
    U->>A: password=12345 (plain text)
    A->>S: password=12345 (attacker দেখে ফেললো!)

    Note over U,S: ✅ HTTPS (Secure)
    U->>A: x8#kL9$mQ... (encrypted)
    A--xS: decrypt করতে পারে না ❌
    U->>S: password=12345 (শুধু server পড়তে পারে)
```

---

## Public Key এবং Private Key

SSL/TLS এর মূল ভিত্তি হলো **Asymmetric Encryption**। এখানে **দুইটা key** একসাথে কাজ করে:

| Key | কে রাখে | কাজ |
|-----|---------|-----|
| **Public Key** | সবাই পায় (certificate এর সাথে) | Data **encrypt** করতে এবং signature **verify** করতে |
| **Private Key** | শুধু server এর কাছে গোপনে থাকে | Data **decrypt** করতে এবং data **sign** করতে |

### মূল নিয়ম

- **Public Key** দিয়ে **encrypt** করলে → শুধুমাত্র **Private Key** দিয়েই **decrypt** করা যায়
- **Private Key** দিয়ে **sign** করলে → **Public Key** দিয়ে **verify** করা যায়

### বাস্তব উদাহরণ

ধরুন একটা **mailbox** এর কথা:

- **Public Key** = মেইলবক্সের ফাঁক (যেকেউ চিঠি ফেলতে পারে)
- **Private Key** = মেইলবক্সের চাবি (শুধু মালিক খুলতে পারে)

```mermaid
graph LR
    subgraph Encryption
        A[Original Data] -->|Public Key দিয়ে Encrypt| B[Encrypted Data]
        B -->|Private Key দিয়ে Decrypt| C[Original Data]
    end
```

```mermaid
graph LR
    subgraph Digital Signature
        D[Data] -->|Private Key দিয়ে Sign| E[Signed Data]
        E -->|Public Key দিয়ে Verify| F["✅ Verified"]
    end
```

### Digital Signature কিভাবে কাজ করে?

**Digital Signature** দুইটা জিনিস prove করে:
1. **Authentication** — data সত্যিই ঐ server থেকে এসেছে
2. **Integrity** — data পথে কেউ change করেনি

```mermaid
flowchart TD
    subgraph Server Side
        A[Original Data] --> B[Hash Function]
        B --> C[Hash Value]
        C --> D[Private Key দিয়ে Sign]
        D --> E["Digital Signature ✍️"]
    end

    subgraph Browser Side
        E --> F[Public Key দিয়ে Verify]
        F --> G[Recovered Hash]
        A2[Original Data] --> B2[Hash Function]
        B2 --> H[Calculated Hash]
        G --> I{Match?}
        H --> I
        I -->|Yes| J["✅ Valid"]
        I -->|No| K["❌ Tampered"]
    end
```

---

## SSL/TLS Handshake কিভাবে কাজ করে

Browser আর server এর মধ্যে **encrypted connection** তৈরি হওয়ার process কে বলে **TLS Handshake**। এটা **দুই phase** এ হয়:

### Phase 1: Asymmetric Encryption (শুধু শুরুতে)

এই phase এ নিরাপদে **key exchange** হয়।

```mermaid
sequenceDiagram
    participant B as Browser
    participant S as Server

    B->>S: 1. Client Hello (supported cipher suites, TLS version)
    S->>B: 2. Server Hello (chosen cipher suite)
    S->>B: 3. Certificate + Public Key পাঠায়
    Note over B: 4. Certificate verify করে (CA দিয়ে)
    B->>S: 5. Public Key দিয়ে Pre-Master Secret encrypt করে পাঠায়
    Note over S: 6. Private Key দিয়ে decrypt করে
    Note over B,S: 7. দুই পক্ষই Pre-Master Secret থেকে Session Key তৈরি করে
```

### Phase 2: Symmetric Encryption (বাকি পুরো session)

এখন থেকে সব data **Session Key** দিয়ে encrypt/decrypt হয়।

```mermaid
sequenceDiagram
    participant B as Browser
    participant S as Server

    Note over B,S: Session Key তৈরি হয়ে গেছে ✅
    B->>S: Encrypted Request (Session Key দিয়ে)
    S->>B: Encrypted Response (Session Key দিয়ে)
    B->>S: Encrypted Request (Session Key দিয়ে)
    S->>B: Encrypted Response (Session Key দিয়ে)
    Note over B,S: পুরো session জুড়ে fast symmetric encryption চলে
```

### কেন দুইটা phase?

| | Asymmetric Encryption | Symmetric Encryption |
|---|----------------------|---------------------|
| **Speed** | অনেক **slow** | অনেক **fast** |
| **ব্যবহার** | শুধু শুরুতে key exchange এ | পুরো communication এ |
| **কারণ** | নিরাপদে secret share করার জন্য perfect | Bulk data transfer এর জন্য perfect |

**Asymmetric** শুধু একবার ব্যবহার হয় নিরাপদে key exchange করতে, তারপর **Symmetric** দিয়ে fast communication চলে।

---

## Certificate Authority (CA) এবং Chain of Trust

### CA কী?

এখন সবচেয়ে গুরুত্বপূর্ণ প্রশ্ন — **browser কিভাবে বিশ্বাস করবে যে server এর Public Key আসল?**

এখানেই আসে **Certificate Authority (CA)**। CA হলো একটা **trusted third party** যে guarantee দেয় যে "হ্যাঁ, এই certificate আসল"। যেমন: **Let's Encrypt**, **DigiCert**, **GlobalSign**।

### CA কিভাবে কাজ করে?

```mermaid
sequenceDiagram
    participant W as Website Owner
    participant CA as Certificate Authority
    participant B as Browser

    Note over W,CA: Step 1: Certificate Request
    W->>CA: "আমি bank.com এর মালিক, certificate দাও"
    Note over CA: Domain ownership verify করে<br/>Organization check করে (OV/EV হলে)

    Note over W,CA: Step 2: Certificate Issue
    CA->>CA: Website info + Public Key নিয়ে<br/>নিজের Private Key দিয়ে sign করে
    CA->>W: Signed SSL Certificate ✅

    Note over W,B: Step 3: Browser Verification
    W->>B: SSL Certificate পাঠায়
    Note over B: CA এর Public Key দিয়ে<br/>signature verify করে<br/>(CA এর key browser এ<br/>আগে থেকেই installed)
    B->>B: Match হলে ✅ Trusted
```

### Chain of Trust

**CA** একটা **chain** এর মাধ্যমে কাজ করে। এটা trust এর ভিত্তি:

```mermaid
graph TD
    A["🔒 Root CA<br/>(Self-signed)<br/>Browser/OS এ pre-installed"]
    B["🔒 Intermediate CA<br/>Root CA দ্বারা signed"]
    C["🔒 Server Certificate<br/>(bank.com)<br/>Intermediate CA দ্বারা signed"]

    A -->|signs| B
    B -->|signs| C

    style A fill:#1a5276,color:#fff
    style B fill:#2874a6,color:#fff
    style C fill:#3498db,color:#fff
```

#### কেন Intermediate CA ব্যবহার হয়?

- **Root CA** এর **Private Key** অত্যন্ত মূল্যবান — এটা offline **vault** এ রাখা হয়
- **Intermediate CA** দিয়ে দৈনন্দিন certificate issue হয়
- Intermediate CA **compromise** হলে শুধু সেটা **revoke** করলেই হয়
- **Root CA** সবসময় নিরাপদ থাকে

#### Browser কিভাবে verify করে?

```mermaid
flowchart TD
    A[bank.com এর Certificate পেলো] --> B{কে sign করেছে?}
    B --> C[Intermediate CA]
    C --> D{Intermediate CA কে sign করেছে?}
    D --> E[Root CA]
    E --> F{Root CA কি trust store এ আছে?}
    F -->|হ্যাঁ| G["✅ পুরো Chain Verified!"]
    F -->|না| H["❌ Warning: Not Trusted"]
```

---

## SSL Certificate এর ভেতরে কী থাকে

| Field | বিবরণ |
|-------|--------|
| **Domain Name** | কোন website এর জন্য (যেমন `google.com`) |
| **Issuer (CA)** | কে issue করেছে (যেমন Let's Encrypt, DigiCert) |
| **Public Key** | Server এর public key |
| **Validity Period** | কবে থেকে কবে পর্যন্ত valid |
| **Digital Signature** | CA এর signature যেটা দিয়ে verify করা হয় |
| **Serial Number** | Unique identifier |
| **Subject** | Certificate holder এর তথ্য |

---

## SSL Certificate এর প্রকারভেদ

### Validation Level অনুযায়ী

| Type | Validation Level | ব্যবহার | সময় |
|------|-----------------|---------|------|
| **DV (Domain Validation)** | শুধু domain ownership check | Blog, ছোট website | মিনিটে হয়ে যায় |
| **OV (Organization Validation)** | Organization verify করে | Business website | কয়েক দিন |
| **EV (Extended Validation)** | পুরো company legally verify করে | Bank, E-commerce | কয়েক সপ্তাহ |

### Coverage অনুযায়ী

| Type | Coverage | উদাহরণ |
|------|----------|--------|
| **Single Domain** | একটা domain | `example.com` |
| **Wildcard** | সব subdomain | `*.example.com` |
| **SAN (Multi-Domain)** | একাধিক domain | `example.com`, `example.org` |

```mermaid
graph TD
    A[SSL Certificate Types]
    A --> B[Validation Level]
    A --> C[Coverage]

    B --> D["DV<br/>Domain Validation<br/>Blog, ছোট site"]
    B --> E["OV<br/>Organization Validation<br/>Business site"]
    B --> F["EV<br/>Extended Validation<br/>Bank, E-commerce"]

    C --> G["Single Domain<br/>example.com"]
    C --> H["Wildcard<br/>*.example.com"]
    C --> I["SAN / Multi-Domain<br/>একাধিক domain"]
```

---

## SSL vs TLS — পার্থক্য

**TLS** হলো **SSL** এর **upgraded version**। SSL পুরনো এবং deprecated।

### ইতিহাস

```mermaid
timeline
    title SSL/TLS Evolution
    1995 : SSL 2.0 — প্রথম public release, vulnerable
    1996 : SSL 3.0 — উন্নত, কিন্তু পরে POODLE attack এ ভাঙলো
    1999 : TLS 1.0 — SSL থেকে TLS এ নাম পরিবর্তন
    2006 : TLS 1.1 — কিছু attack থেকে protection
    2008 : TLS 1.2 — SHA-256 support, অনেক secure ✅
    2018 : TLS 1.3 — সবচেয়ে fast এবং secure ✅✅
```

### মূল পার্থক্য

| বিষয় | SSL | TLS |
|-------|-----|-----|
| **Full Form** | Secure Sockets Layer | Transport Layer Security |
| **Developer** | Netscape | IETF |
| **Status** | ❌ Deprecated | ✅ Active |
| **Latest** | SSL 3.0 (1996) | TLS 1.3 (2018) |
| **Speed** | Slow handshake | Fast (especially 1.3) |
| **Security** | Multiple known attacks | TLS 1.3 — no known attack |

> আজকাল কেউ "SSL" বললে আসলে **TLS** ই বোঝায়। আসল SSL আর কেউ ব্যবহার করে না।

---

## TLS 1.2 vs TLS 1.3

### Handshake তুলনা

TLS 1.3 অনেক **দ্রুত** কারণ এটা মাত্র **১ round trip** এ handshake শেষ করে:

```mermaid
sequenceDiagram
    participant C as Client
    participant S as Server

    Note over C,S: TLS 1.2 — ২ Round Trip
    C->>S: Client Hello
    S->>C: Server Hello + Certificate + Key Exchange
    C->>S: Key Exchange + Finished
    S->>C: Finished
    Note over C,S: এখন Encrypted Data শুরু

    Note over C,S: ─────────────────────────────

    Note over C,S: TLS 1.3 — ১ Round Trip
    C->>S: Client Hello + Key Share
    S->>C: Server Hello + Certificate + Finished
    C->>S: Finished
    Note over C,S: এখন Encrypted Data শুরু (আরো দ্রুত!)
```

### TLS 1.3 তে কী বাদ দেওয়া হয়েছে?

```mermaid
graph LR
    subgraph "❌ বাদ দেওয়া হয়েছে"
        A[RSA Key Exchange]
        B[RC4 Cipher]
        C[DES / 3DES]
        D[MD5 Hash]
        E[SHA-1 Hash]
    end

    subgraph "✅ শুধু রাখা হয়েছে"
        F[ECDHE Key Exchange]
        G[AES-GCM Encryption]
        H[ChaCha20 Encryption]
        I[SHA-256 / SHA-384]
    end
```

---

## Forward Secrecy

**Forward Secrecy** হলো **TLS 1.3** এর একটা **mandatory** feature। এটা নিশ্চিত করে যে server এর **Private Key** চুরি হলেও আগের কোনো session decrypt করা সম্ভব না।

### Forward Secrecy ছাড়া

```mermaid
flowchart LR
    A["আজ: Attacker encrypted<br/>traffic record করে রাখলো"] --> B["ভবিষ্যতে: Server এর<br/>Private Key চুরি হলো"]
    B --> C["😱 আগের সব recorded<br/>traffic decrypt হয়ে গেলো!"]
    style C fill:#c0392b,color:#fff
```

### Forward Secrecy সহ

```mermaid
flowchart LR
    A["প্রতি session এ আলাদা<br/>Ephemeral Key তৈরি হয়"] --> B["Session শেষে<br/>key destroy হয়"]
    B --> C["Private Key চুরি হলেও<br/>আগের session safe ✅"]
    style C fill:#27ae60,color:#fff
```

প্রতিটা session এ আলাদা **temporary key (Ephemeral Key)** তৈরি হয়। Session শেষ হলে key ধ্বংস হয়ে যায়। তাই আগের কোনো session এর data কখনো decrypt করা যায় না।

---

## Certificate Revocation

কোনো certificate **compromise** হলে বা ভুলভাবে issue হলে সেটা বাতিল করতে হয়। তিনটা mechanism আছে:

| Mechanism | কাজ |
|-----------|-----|
| **CRL (Certificate Revocation List)** | CA একটা list publish করে কোন কোন certificate বাতিল |
| **OCSP (Online Certificate Status Protocol)** | Browser real-time এ CA কে জিজ্ঞেস করে "এই certificate কি valid?" |
| **Certificate Transparency Log** | সব issued certificate public log এ রাখা হয়, ভুয়া certificate issue হলে ধরা পড়ে |

```mermaid
flowchart TD
    A[Certificate Compromise হলো] --> B{Revocation Method}
    B --> C["CRL<br/>CA বাতিলের list publish করে"]
    B --> D["OCSP<br/>Browser real-time এ check করে"]
    B --> E["CT Log<br/>Public log এ monitor করা হয়"]
    C --> F[Certificate বাতিল ✅]
    D --> F
    E --> F
```

---

## সংক্ষেপে

| বিষয় | বিবরণ |
|-------|--------|
| **SSL/TLS কী** | Internet এ secure, encrypted communication এর protocol |
| **সমস্যা সমাধান** | Eavesdropping, MITM Attack, Data Tampering |
| **Public Key** | সবাই পায়, data encrypt ও signature verify করে |
| **Private Key** | শুধু server রাখে, data decrypt ও data sign করে |
| **CA (Issuer)** | Certificate এর authenticity guarantee দেয় |
| **Chain of Trust** | Root CA → Intermediate CA → Server Certificate |
| **SSL vs TLS** | SSL deprecated, TLS হলো current secure version |
| **TLS 1.3** | সবচেয়ে fast (1 round trip), mandatory Forward Secrecy |
| **Forward Secrecy** | Private Key চুরি হলেও আগের session safe |

```mermaid
mindmap
    root((SSL/TLS))
        Encryption
            Symmetric
            Asymmetric
        Authentication
            Certificate
            CA
            Chain of Trust
        Integrity
            Hash
            Digital Signature
        Versions
            SSL ❌ Deprecated
            TLS 1.2 ✅
            TLS 1.3 ✅✅ Best
```

---

> **এই document টি শুধুমাত্র learning purpose এ তৈরি। practical implementation এর জন্য official documentation follow করুন।**
