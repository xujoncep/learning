# SSH (Secure Shell) — Complete Guide: Basic to Advanced

---

## Table of Contents

1. [SSH কী ও কেন দরকার](#1-ssh-কী-ও-কেন-দরকার)
2. [SSH কিভাবে কাজ করে — Behind the Scenes](#2-ssh-কিভাবে-কাজ-করে--behind-the-scenes)
3. [SSH Setup Procedure](#3-ssh-setup-procedure)
4. [SSH Protocol Internals (Deep Dive)](#4-ssh-protocol-internals-deep-dive)
5. [SSH Encryption ও Algorithms](#5-ssh-encryption-ও-algorithms)
6. [SSH Certificate Authority (SSH CA)](#6-ssh-certificate-authority-ssh-ca)
7. [SSH Hardening (Advanced Security)](#7-ssh-hardening-advanced-security)
8. [SSH Agent Forwarding ও তার Risk](#8-ssh-agent-forwarding-ও-তার-risk)
9. [SSH ও DevOps / Automation](#9-ssh-ও-devops--automation)
10. [SSH Attack Vectors ও Defense](#10-ssh-attack-vectors-ও-defense)
11. [Alternative ও Related Tools](#11-alternative-ও-related-tools)
12. [Tips & Tricks](#12-tips--tricks)

---

## 1. SSH কী ও কেন দরকার

**SSH (Secure Shell)** হলো একটি **cryptographic network protocol** যেটা দুইটা computer এর মধ্যে **secure communication** establish করতে ব্যবহৃত হয়, বিশেষ করে **unsecured network** (যেমন internet) এর উপর দিয়ে।

আগে **Telnet** ব্যবহার করা হতো remote server এ connect করতে। কিন্তু Telnet এ সব data **plain text** এ যেত — মানে কেউ **sniff** করলে **password** সহ সব কিছু দেখতে পারতো। SSH এই সমস্যা solve করেছে **encryption** দিয়ে।

### SSH এর Common ব্যবহার

| Feature | Description |
|---------|-------------|
| **Remote Shell Access** | `ssh user@server` দিয়ে remote machine এ login |
| **SCP (Secure Copy)** | file transfer — `scp file.txt user@server:/path/` |
| **SFTP** | FTP এর secure version |
| **Port Forwarding / Tunneling** | local port কে remote server এর মাধ্যমে forward করা |
| **Git over SSH** | GitHub/GitLab এ SSH দিয়ে `git push/pull` |
| **SSH Agent** | key একবার unlock করলে বারবার password দিতে হয় না |

### SSH vs SSL/TLS

| বিষয় | SSH | SSL/TLS |
|-------|-----|---------|
| **Purpose** | Remote access & command execution | Web traffic encryption (HTTPS) |
| **Port** | 22 | 443 (HTTPS) |
| **Authentication** | Public key / password | Certificates (CA signed) |
| **Use case** | Server management, Git | Browsers, APIs, Email |
| **Trust model** | First-use trust (TOFU) | Certificate Authority (CA) |

---

## 2. SSH কিভাবে কাজ করে — Behind the Scenes

SSH মূলত **client-server model** এ কাজ করে:

1. **SSH Client** — আপনার machine (যেখান থেকে connect করছেন)
2. **SSH Server** — remote machine (যেখানে connect করছেন), সাধারণত **port 22** এ listen করে

### Phase 1: Connection Establish

```
আপনার PC                              Remote Server
    │                                       │
    │──── TCP 3-way Handshake (port 22) ───>│  ← প্রথমে normal TCP connection
    │                                       │
    │<─── Server: "আমি SSH-2 support করি" ──│  ← Protocol version exchange
    │──── Client: "আমিও SSH-2" ───────────>│
    │                                       │
    │<──── Key Exchange (Diffie-Hellman) ──>│  ← দুই পক্ষ মিলে session key
    │         কেউ sniff করলেও key           │     বানায়, কিন্তু key নিজে
    │         বের করতে পারবে না              │     network এ যায় না
    │                                       │
    │<─── Server Host Key পাঠায় ───────────│  ← "আমি সত্যিই এই server"
    │     (known_hosts এ check হয়)          │
    │                                       │
    │──── Authentication (key/password) ───>│  ← আপনি কে prove করেন
    │                                       │
    │<════ Encrypted Tunnel Ready ═════════>│  ← এখন থেকে সব encrypted
```

### Phase 2: PTY Allocation

Connection হওয়ার পরে server এ আপনার জন্য একটা **pseudo-terminal (PTY)** allocate হয়:

```
Remote Server:
  ┌──────────────────┐
  │  PTY Master/Slave │
  │  /dev/pts/0       │ ← virtual terminal
  │       │           │
  │    bash/zsh       │ ← shell process spawn
  │   (login shell)   │
  └──────────────────┘
```

Server একটা **PTY pair** তৈরি করে — **master** side SSH daemon handle করে, **slave** side এ আপনার **shell** (bash/zsh) run করে।

### Phase 3: Keystroke এর যাত্রা (প্রতিটা key press এ)

আপনি `l` key press করলেন:

```
Step 1: Hardware → OS
  Keyboard 'l' চাপ → OS Keyboard Driver (scan code → 'l') → SSH Client app

Step 2: SSH Client Processing
  raw byte 0x6C ('l')
    → Compress (optional, zlib)
      → SSH Packet তৈরি (SSH_MSG_CHANNEL_DATA)
        → AES-256 দিয়ে Encrypt
          → HMAC-SHA256 দিয়ে MAC তৈরি
            → Sequence number বাড়ায়

Step 3: Network Journey
  Encrypted packet → TCP segment → IP packet → Router → Internet → Server NIC

Step 4: SSH Server Processing
  Encrypted packet receive
    → Sequence number verify
      → HMAC verify (tamper check)
        → AES-256 দিয়ে Decrypt
          → raw byte 'l' বের হলো
            → PTY master এ write করে
              → bash/zsh process 'l' পায়
```

### Phase 4: Output ফেরত আসা

Server এর shell যখন output দেয়, **ঠিক উল্টো পথে** ফিরে আসে:

```
Server bash output → PTY → SSHD Encrypt → Network → SSH Client Decrypt → আপনার Screen
```

### সংক্ষেপে পুরো Journey

```
Keystroke 'l'
  → OS keyboard driver
    → SSH client process
      → SSH packet তৈরি (SSH_MSG_CHANNEL_DATA)
        → AES encrypt + HMAC sign
          → TCP/IP দিয়ে Internet এ পাঠানো
            → Server receive
              → HMAC verify + AES decrypt
                → PTY master এ write
                  → bash/zsh process 'l' পায়
                    → shell output তৈরি করে
                      → আবার encrypt করে ফেরত পাঠায়
                        → আপনার screen এ দেখায়
```

প্রতিটা keystroke এ এই পুরো cycle ঘটে — **milliseconds** এ শেষ হয়ে যায়।

---

## 3. SSH Setup Procedure

### 3.1 SSH Install

```bash
# Linux (Debian/Ubuntu)
sudo apt install openssh-client    # client side
sudo apt install openssh-server    # server side

# Mac — already installed (built-in)

# Windows — OpenSSH built-in আছে Windows 10+
# Settings → Apps → Optional Features → OpenSSH Client/Server
```

### 3.2 SSH Key Pair Generate করা

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

```
Output:
  ~/.ssh/id_ed25519        ← Private Key (কাউকে দেবেন না!)
  ~/.ssh/id_ed25519.pub    ← Public Key (server এ দেবেন)
```

#### Ed25519 vs RSA:

| বিষয় | Ed25519 | RSA |
|-------|---------|-----|
| **Key size** | 256 bit (ছোট) | 4096 bit (বড়) |
| **Speed** | অনেক fast | slow |
| **Security** | সমান বা বেশি | ভালো, তবে বড় key লাগে |
| **Recommendation** | preferred | legacy systems এ দরকার হলে |

### 3.3 Public Key Server এ Copy করা

**Method A: ssh-copy-id (সবচেয়ে সহজ)**

```bash
ssh-copy-id user@server-ip
```

**Method B: Manual Copy**

```bash
cat ~/.ssh/id_ed25519.pub
# output copy করে server এ:
ssh user@server-ip
mkdir -p ~/.ssh && chmod 700 ~/.ssh
echo "ssh-ed25519 AAAA..." >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### Permission Structure (গুরুত্বপূর্ণ!)

```
~/.ssh/                 → 700 (drwx------)
~/.ssh/authorized_keys  → 600 (-rw-------)
~/.ssh/id_ed25519       → 600 (-rw-------)
~/.ssh/id_ed25519.pub   → 644 (-rw-r--r--)
```

### 3.4 Server Side Configuration

`/etc/ssh/sshd_config` file edit:

```bash
Port 2222                       # default 22 থেকে পরিবর্তন
PermitRootLogin no              # root login বন্ধ
PasswordAuthentication no       # শুধু key দিয়ে login
PermitEmptyPasswords no
AllowUsers alice bob            # নির্দিষ্ট users
MaxAuthTries 3
```

```bash
sudo systemctl restart sshd
```

### 3.5 SSH Config File (Client Side Shortcut)

`~/.ssh/config`:

```
Host myserver
    HostName 192.168.1.100
    User admin
    Port 2222
    IdentityFile ~/.ssh/id_ed25519

Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_github
```

এখন শুধু `ssh myserver` লিখলেই connect হয়ে যাবে।

### 3.6 SSH Agent Setup

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519       # passphrase একবার দিন, ব্যস!
ssh-add -l                      # loaded keys দেখুন
```

### 3.7 GitHub SSH Setup

```bash
ssh-keygen -t ed25519 -C "github_email@example.com"
cat ~/.ssh/id_ed25519.pub       # copy → GitHub Settings → SSH Keys → paste
ssh -T git@github.com           # test
```

### 3.8 Troubleshoot

```bash
ssh -v user@server              # verbose mode (debug)
ssh -vv user@server             # more detail
ssh -vvv user@server            # সব কিছু দেখায়
```

| Problem | Solution |
|---------|----------|
| `Permission denied (publickey)` | `ssh-copy-id` আবার করুন, permission check |
| `Connection refused` | `sudo systemctl start sshd`, port check |
| `Host key verification failed` | `ssh-keygen -R server-ip` |
| `Connection timed out` | Firewall — `ufw allow 22` |

---

## 4. SSH Protocol Internals (Deep Dive)

### 4.1 SSH-1 vs SSH-2

| বিষয় | SSH-1 | SSH-2 |
|-------|-------|-------|
| **Integrity** | CRC-32 (weak!) | HMAC-SHA2 (cryptographic) |
| **Key Exchange** | শুধু RSA-based | DH, ECDH, Curve25519 negotiate করে |
| **Authentication** | limited methods | password, publickey, keyboard-interactive, GSSAPI |
| **Channels** | একটাই session | multiple channels একটা connection এ |
| **Architecture** | monolithic | modular (transport, auth, connection আলাদা layer) |
| **Status** | **deprecated** | **current standard** |

**SSH-1 Vulnerabilities:** CRC-32 Compensation Attack, Session Hijacking possible, Key Exchange weakness।

### 4.2 SSH-2 Architecture — তিনটা Layer

```
┌─────────────────────────────────────────────┐
│         SSH Connection Protocol              │  ← Layer 3 (RFC 4254)
│    (channels, forwarding, shell session)     │
├─────────────────────────────────────────────┤
│       SSH Authentication Protocol            │  ← Layer 2 (RFC 4252)
│    (publickey, password, keyboard-interactive)│
├─────────────────────────────────────────────┤
│        SSH Transport Protocol                │  ← Layer 1 (RFC 4253)
│    (key exchange, encryption, MAC, compress) │
├─────────────────────────────────────────────┤
│              TCP/IP                           │  ← Underlying transport
└─────────────────────────────────────────────┘
```

### 4.3 Layer 1: Transport Protocol (RFC 4253)

#### Version Exchange

```
Client → Server:  SSH-2.0-OpenSSH_9.6
Server → Client:  SSH-2.0-OpenSSH_9.5
```

এটাই **শেষ plain text communication**।

#### Algorithm Negotiation (SSH_MSG_KEXINIT)

দুই পক্ষ supported algorithms এর list পাঠায়:

```
Client → Server:  SSH_MSG_KEXINIT
  ├── kex_algorithms:        curve25519-sha256, diffie-hellman-group16-sha512, ...
  ├── server_host_key_algs:  ssh-ed25519, rsa-sha2-512, ...
  ├── encryption_c_to_s:     chacha20-poly1305, aes256-gcm, aes256-ctr, ...
  ├── encryption_s_to_c:     chacha20-poly1305, aes256-gcm, aes256-ctr, ...
  ├── mac_c_to_s:            hmac-sha2-256-etm, hmac-sha2-512-etm, ...
  ├── mac_s_to_c:            hmac-sha2-256-etm, hmac-sha2-512-etm, ...
  ├── compression_c_to_s:    none, zlib@openssh.com, ...
  └── compression_s_to_c:    none, zlib@openssh.com, ...
```

**Selection rule:** উভয় list এ **প্রথম match** select হয়।

#### Key Exchange (Diffie-Hellman)

```
    Client                              Server
      │  দুই পক্ষ agree: prime p, generator g  │
      │  Client picks random: a                │
      │  Computes: e = g^a mod p               │
      │───── e পাঠায় ──────────────────>       │
      │                    Server picks random: b
      │                    Computes: f = g^b mod p
      │  <────── f পাঠায় ───────────────       │
      │  K = f^a mod p                   K = e^b mod p
      │    = g^(ab) mod p                  = g^(ab) mod p
      │  দুই পক্ষেরই K একই!                    │
```

Network এ শুধু `e` আর `f` যায়। `e`, `f` থেকে `K` বের করা **Discrete Logarithm Problem** — virtually impossible।

#### Session Key Derivation

```
H = hash(V_C || V_S || I_C || I_S || K_S || e || f || K)
    (Exchange Hash — প্রথমবার এটাই Session ID)

From K and H, derive:
  ├── IV client→server:     hash(K || H || "A" || session_id)
  ├── IV server→client:     hash(K || H || "B" || session_id)
  ├── Encrypt key c→s:      hash(K || H || "C" || session_id)
  ├── Encrypt key s→c:      hash(K || H || "D" || session_id)
  ├── MAC key c→s:          hash(K || H || "E" || session_id)
  └── MAC key s→c:          hash(K || H || "F" || session_id)
```

**client-to-server** আর **server-to-client** এর জন্য **আলাদা key** ব্যবহার হয়।

### 4.4 Layer 2: Authentication Protocol (RFC 4252)

```
Client → Server:  SSH_MSG_USERAUTH_REQUEST
  ├── username: "admin"
  ├── service: "ssh-connection"
  └── method: "publickey" / "password" / "keyboard-interactive"

Server → Client:  SSH_MSG_USERAUTH_SUCCESS  বা  SSH_MSG_USERAUTH_FAILURE
```

### 4.5 Layer 3: Connection Protocol (RFC 4254) — Channel System

একটা encrypted connection এর মধ্যে **multiple independent channels** চলে:

```
একটা SSH Connection:
  Channel 0: Interactive Shell (pty-req)
  Channel 1: Port Forward (localhost:8080)
  Channel 2: SCP file transfer
  Channel 3: Another port forward
  সবগুলো একই encrypted tunnel এ!
```

#### Channel Lifecycle:

```
Client → CHANNEL_OPEN ("session", window: 2MB, max_packet: 32KB)
Server → CHANNEL_OPEN_CONFIRMATION
Client → CHANNEL_REQUEST ("pty-req", term: "xterm-256color")
Client → CHANNEL_REQUEST ("shell")
Client → CHANNEL_DATA ("ls\n")
Server → CHANNEL_DATA ("file1.txt\nfile2.txt\n")
Client → CHANNEL_CLOSE
Server → CHANNEL_CLOSE
```

#### Flow Control (Window System)

```
initial_window = 2MB
প্রতি packet এ window কমে
window 0 হলে STOP — আর data পাঠানো যাবে না
CHANNEL_WINDOW_ADJUST আসলে আবার পাঠানো শুরু
```

Fast sender slow receiver কে overwhelm করতে পারবে না।

### 4.6 SSH Binary Packet Structure

```
┌──────────┬──────────┬──────────┬──────────┬─────────┐
│ packet   │ padding  │ payload  │ random   │  MAC    │
│ length   │ length   │          │ padding  │         │
│ (4 bytes)│ (1 byte) │ (varies) │ (varies) │(varies) │
├──────────┴──────────┴──────────┴──────────┼─────────┤
│        ENCRYPTED                           │ NOT enc │
└────────────────────────────────────────────┴─────────┘
```

**Random Padding** কেন: Traffic analysis কঠিন করে — সব packet এর size similar দেখায়।

**Sequence Number:** প্রতিটা packet এর implicit sequence number আছে। Packet delete, reorder, বা replay হলে detect হয়।

### 4.7 Rekey

```
Trigger: 1GB data transfer বা 1 hour পরে (default)
Process: নতুন KEXINIT → নতুন DH → নতুন keys → পুরানো keys discard
Session interrupt হয় না, user টের পায় না
```

---

## 5. SSH Encryption ও Algorithms

### 5.1 Key Exchange (KEX) Algorithms

**Diffie-Hellman Group Exchange:**

```
diffie-hellman-group14-sha256    ← 2048-bit, minimum acceptable
diffie-hellman-group16-sha512    ← 4096-bit, ভালো
diffie-hellman-group18-sha512    ← 8192-bit, সবচেয়ে strong (slow)
```

**ECDH (Elliptic Curve Diffie-Hellman):**

```
ecdh-sha2-nistp256    ← 128-bit security
ecdh-sha2-nistp384    ← 192-bit security
ecdh-sha2-nistp521    ← 256-bit security
```

ECDH অনেক ছোট key দিয়ে সমান security দেয়:

```
Security Level    DH Key Size    ECDH Key Size
128-bit           3072-bit       256-bit        ← 12x ছোট!
256-bit           15360-bit      521-bit        ← 30x ছোট!
```

**Curve25519 (Best Choice):**

```
curve25519-sha256    ← recommended!
```

| বিষয় | NIST Curves | Curve25519 |
|-------|-------------|------------|
| **Designer** | NIST (NSA involvement সন্দেহ) | Daniel J. Bernstein |
| **Timing attacks** | vulnerable | designed to be **constant-time** |
| **Speed** | fast | **faster** |
| **Trust** | NSA backdoor সন্দেহ | openly designed, widely trusted |

### 5.2 Symmetric Ciphers

**AES (Advanced Encryption Standard):**

```
aes128-ctr / aes256-ctr    ← Counter mode
aes128-gcm / aes256-gcm    ← Galois/Counter Mode (recommended)
```

CTR vs GCM:
- **CTR:** শুধু encryption, আলাদা MAC লাগে
- **GCM:** Encryption + Authentication একসাথে (AEAD), hardware acceleration আছে (AES-NI)

**ChaCha20-Poly1305:**

```
chacha20-poly1305@openssh.com    ← recommended!
```

- AES-NI hardware নেই এমন device এ AES-GCM এর চেয়ে 3x faster
- Constant-time, timing attack proof
- Mobile/ARM device এ excellent performance

**কোনটা কখন?**

```
AES-NI hardware আছে? → aes256-gcm
AES-NI নেই?          → chacha20-poly1305
```

**Avoid করুন:**

```
❌ aes128-cbc, aes256-cbc    ← padding oracle attack
❌ 3des-cbc                  ← Sweet32 attack
❌ arcfour/rc4               ← completely broken
❌ blowfish-cbc              ← outdated
```

### 5.3 MAC Algorithms

```
hmac-sha2-256-etm    ← Encrypt-then-MAC (recommended!)
hmac-sha2-512-etm    ← Encrypt-then-MAC (recommended!)
hmac-sha2-256        ← Encrypt-and-MAC (পুরানো)
```

**E&M vs EtM:**

- **Encrypt-and-MAC (E&M):** MAC plaintext থেকে → information leak possible
- **Encrypt-then-MAC (EtM):** MAC ciphertext থেকে → cryptographically proven secure

> GCM আর ChaCha20-Poly1305 এ আলাদা MAC লাগে না — AEAD cipher, authentication built-in।

### 5.4 Host Key Algorithms

```
ssh-ed25519              ← recommended!
rsa-sha2-512             ← ভালো
rsa-sha2-256             ← ভালো
ecdsa-sha2-nistp256      ← OK
ssh-rsa                  ← ❌ DEPRECATED (SHA-1)
ssh-dss                  ← ❌ DISABLED (DSA too weak)
```

### 5.5 Recommended Configuration

```bash
# /etc/ssh/sshd_config
KexAlgorithms curve25519-sha256,diffie-hellman-group16-sha512
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com
HostKeyAlgorithms ssh-ed25519,rsa-sha2-512
```

---

## 6. SSH Certificate Authority (SSH CA)

### সমস্যা: Traditional Key Management

50 জন developer × 100 servers = **5,000 টা key entry** manage করতে হবে। কেউ leave করলে 100 server থেকে key মুছতে হবে।

### Solution: SSH CA

```
           ┌──────────┐
           │  SSH CA   │  ← একটা CA key pair
           └─────┬─────┘
                 │ signs
        ┌────────┼────────┐
        ▼        ▼        ▼
   Developer   Developer  Developer
   Certificate Certificate Certificate
   (24h expire) (24h expire) (24h expire)

   Server শুধু CA এর public key জানে
   → যেকোনো CA-signed certificate কে trust করে
```

### দুই ধরনের Certificate

**User Certificate:** "এই developer কে trust করো"

```
Type: ssh-ed25519-cert-v01
Public Key: developer এর key
Principals: ["alice", "deploy"]      ← এই usernames এ login পারবে
Valid: 2026-03-02 to 2026-03-03      ← 24 ঘণ্টা পরে expire
```

**Host Certificate:** "এই server কে trust করো"

```
Type: ssh-ed25519-cert-v01
Public Key: server এর host key
Principals: ["web01.company.com"]
→ "authenticity can't be established" message আর আসবে না!
```

### Setup

```bash
# Step 1: CA Key তৈরি
ssh-keygen -t ed25519 -f ca_user_key -C "User CA"
ssh-keygen -t ed25519 -f ca_host_key -C "Host CA"

# Step 2: User Certificate Issue
ssh-keygen -s ca_user_key \
  -I "alice@company.com" \
  -n alice,deploy \
  -V +24h \
  -z 1001 \
  alice_id_ed25519.pub

# Step 3: Server Configure
# /etc/ssh/sshd_config:
TrustedUserCAKeys /etc/ssh/ca_user_key.pub

# Step 4: Host Certificate Issue
ssh-keygen -s ca_host_key \
  -I "web-server-01" \
  -h \
  -n web01.company.com,10.0.0.5 \
  -V +52w \
  /etc/ssh/ssh_host_ed25519_key.pub

# Step 5: Client Configure
# ~/.ssh/known_hosts:
@cert-authority *.company.com ssh-ed25519 AAAA...
```

### Certificate Inspect

```bash
ssh-keygen -L -f alice_id_ed25519-cert.pub
```

### Certificate Revocation

```bash
ssh-keygen -k -f /etc/ssh/revoked_keys -s ca_user_key.pub -z 1001 alice_id_ed25519.pub
# sshd_config: RevokedKeys /etc/ssh/revoked_keys
```

Short-lived certificates (24h) ব্যবহার করলে revocation এর প্রয়োজন অনেক কমে।

### Real-World Tools

- **HashiCorp Vault** — SSH secret engine
- **Netflix BLESS** — Lambda-based SSH CA
- **Smallstep** — step-ca

### Traditional vs Certificate

| বিষয় | Traditional Keys | SSH Certificates |
|-------|-----------------|-----------------|
| **New user** | সব server এ key যোগ | CA থেকে cert issue |
| **Offboard** | সব server থেকে key মুছতে হবে | Cert expire / revoke |
| **New server** | সব user এর key যোগ | শুধু CA trust করলেই হলো |
| **Audit** | কঠিন | সহজ (cert এ ID, serial আছে) |
| **Scalability** | O(users × servers) | O(1) |

---

## 7. SSH Hardening (Advanced Security)

### 7.1 Hardened sshd_config Template

```bash
# ── Network ──
Port 2222
AddressFamily inet
ListenAddress 0.0.0.0

# ── Authentication ──
PermitRootLogin no
PasswordAuthentication no
PermitEmptyPasswords no
PubkeyAuthentication yes
AuthenticationMethods publickey
MaxAuthTries 3
MaxSessions 3
LoginGraceTime 30

# ── Access Control ──
AllowUsers alice bob deploy
AllowGroups sshusers
DenyUsers root admin

# ── Security ──
X11Forwarding no
AllowTcpForwarding no
AllowAgentForwarding no
PermitTunnel no
GatewayPorts no

# ── Logging ──
LogLevel VERBOSE
SyslogFacility AUTH

# ── Misc ──
PrintLastLog yes
ClientAliveInterval 300
ClientAliveCountMax 2
Banner /etc/ssh/banner.txt

# ── Algorithms ──
KexAlgorithms curve25519-sha256,diffie-hellman-group16-sha512
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com
HostKeyAlgorithms ssh-ed25519,rsa-sha2-512
```

### 7.2 2FA/MFA (Google Authenticator + SSH)

```bash
# Install
sudo apt install libpam-google-authenticator

# Configure per user
google-authenticator    # QR code scan করুন

# /etc/pam.d/sshd:
auth required pam_google_authenticator.so

# sshd_config:
ChallengeResponseAuthentication yes
AuthenticationMethods publickey,keyboard-interactive
```

Login: প্রথমে key verify → তারপর TOTP code চাইবে।

### 7.3 Fail2Ban

```bash
sudo apt install fail2ban
```

```ini
# /etc/fail2ban/jail.local
[DEFAULT]
bantime  = 1h
findtime = 10m
maxretry = 3

[sshd]
enabled  = true
port     = 2222
logpath  = /var/log/auth.log
```

```bash
sudo fail2ban-client status sshd      # status
sudo fail2ban-client set sshd unbanip 192.168.1.50   # unban
```

### 7.4 Port Knocking

```bash
sudo apt install knockd
```

```ini
# /etc/knockd.conf
[openSSH]
    sequence    = 7000,8000,9000
    seq_timeout = 5
    command     = /sbin/iptables -A INPUT -s %IP% -p tcp --dport 22 -j ACCEPT
    tcpflags    = syn

[closeSSH]
    sequence    = 9000,8000,7000
    seq_timeout = 5
    command     = /sbin/iptables -D INPUT -s %IP% -p tcp --dport 22 -j ACCEPT
    tcpflags    = syn
```

```bash
# Client:
knock server-ip 7000 8000 9000 && ssh user@server-ip
```

### 7.5 Chroot Jail (SFTP Users)

```bash
# sshd_config:
Match Group sftponly
    ChrootDirectory /home/%u
    ForceCommand internal-sftp
    AllowTcpForwarding no
    X11Forwarding no
    PermitTunnel no
```

```bash
sudo chown root:root /home/sftpuser          # ChrootDirectory MUST be root owned
sudo chmod 755 /home/sftpuser
sudo chown sftpuser:sftponly /home/sftpuser/uploads
```

### 7.6 Granular Access Control (Match Blocks)

```bash
# Developer: শুধু key auth
Match Group developers
    PubkeyAuthentication yes
    PasswordAuthentication no
    AllowTcpForwarding yes

# Deploy user: শুধু নির্দিষ্ট command
Match User deploy
    ForceCommand /usr/local/bin/deploy.sh
    AllowTcpForwarding no
    PermitTTY no

# IP-based
Match Address 10.0.0.0/24
    PasswordAuthentication yes
Match Address *,!10.0.0.0/24
    PasswordAuthentication no
```

### 7.7 Hardening Checklist

```
✅ Must Do:
  □ PasswordAuthentication no
  □ PermitRootLogin no
  □ Port পরিবর্তন
  □ AllowUsers/AllowGroups
  □ Weak algorithms সরানো
  □ MaxAuthTries 3
  □ Fail2Ban install
  □ Ed25519 key ব্যবহার

⭐ Should Do:
  □ 2FA/MFA enable
  □ LogLevel VERBOSE
  □ Banner warning
  □ ClientAliveInterval set

🔒 Extra:
  □ Port knocking
  □ SSH Certificate Authority
  □ Chroot jail
  □ IP-based restriction
```

---

## 8. SSH Agent Forwarding ও তার Risk

### SSH Agent কিভাবে কাজ করে

```
ssh-agent process (memory তে):
  Decrypted Private Keys loaded
  Unix Socket: /tmp/ssh-xxx/agent.1234

SSH client → socket এ "sign করো" request → Agent sign করে return করে
(key নিজে কখনো socket দিয়ে যায় না — শুধু signing service)
```

### Agent Forwarding কী

Bastion দিয়ে internal server এ গিয়ে GitHub এ `git pull` করতে চান — internal server এ আপনার key নেই:

```
With Agent Forwarding (ssh -A):
  Internal Server: "sign করো"
    → Bastion: forward করে
      → Laptop Agent: sign করে return করে
  Key কখনো laptop ছাড়েনি!
```

### Agent Forwarding এর Risk

**Bastion compromised হলে:**

```
Attacker bastion এ root access পেয়েছে
→ আপনার forwarded agent socket খুঁজে: /tmp/ssh-*/agent.*
→ SSH_AUTH_SOCK=/tmp/ssh-xxx/agent.12345 ssh git@github.com
→ আপনার identity দিয়ে access!
→ যতক্ষণ আপনি connected, ততক্ষণ attacker sign request পাঠাতে পারে
```

### Safe Alternative: ProxyJump

```bash
# Command line
ssh -J user@bastion user@internal-server

# Config:
Host internal
    HostName 10.0.0.5
    User deploy
    ProxyJump bastion
```

ProxyJump এ bastion শুধু **TCP relay** — agent socket exposed হয় না, কিছু decrypt করতে পারে না।

### Agent Forwarding Safe করতে

```bash
ssh-add -c ~/.ssh/id_ed25519    # Confirm mode: প্রতি sign request এ popup
ssh-add -t 3600 ~/.ssh/key      # Time limit: 1 ঘণ্টা পরে auto-remove
```

```
# শুধু specific host এ forward:
Host bastion
    ForwardAgent yes
Host *
    ForwardAgent no
```

### Comparison

```
Method              Security    Convenience
Key on server       ❌ Worst     ✅ Easy
Agent Forwarding    ⚠️ Risky     ✅ Easy
ProxyJump           ✅ Safe      ✅ Easy        ← BEST
Agent + Confirm     ✅ Good      ⚠️ Annoying
SSH Certificate     ✅ Best      ✅ Easy
```

---

## 9. SSH ও DevOps / Automation

### Ansible + SSH

Ansible **agent-less** — পুরোটাই SSH দিয়ে চলে:

```
Ansible Control Machine ──SSH──> Server 1, 2, 3...
  1. SSH দিয়ে connect
  2. Python script copy করে
  3. Execute করে
  4. Result collect করে
```

```ini
# ansible.cfg optimization:
[ssh_connection]
pipelining = True
ssh_args = -o ControlMaster=auto -o ControlPersist=600s
```

### CI/CD এ SSH Key Management

```
❌ Bad: Personal key CI/CD তে, কোনো restriction নেই
✅ Good: আলাদা Deploy Key, command restriction, secrets manager
```

### Deploy Keys vs User Keys

| | User Key | Deploy Key |
|--|----------|------------|
| **Identity** | আপনার | machine/service এর |
| **Access** | সব repo | একটা specific repo |
| **CI/CD** | ❌ | ✅ |

### HashiCorp Vault SSH

```
Traditional: Static keys, no audit trail
Vault: Dynamic short-lived credentials, full audit
  → Signed Certificates / One-Time Password / Dynamic Keys
```

---

## 10. SSH Attack Vectors ও Defense

### Attack 1: Brute Force

```
Attacker হাজার হাজার password try করে (Hydra, Medusa, Ncrack)
Speed: ~1000+ attempts/minute

Defense:
  Layer 1: PasswordAuthentication no (100% effective!)
  Layer 2: Fail2Ban
  Layer 3: MaxAuthTries 3
  Layer 4: Port change
  Layer 5: Port knocking
```

### Attack 2: Man-in-the-Middle (MITM)

```
Client ════> Attacker ════> Server (দুই পক্ষকেই ভাবায় সে অন্যপক্ষ)
Attacker মাঝখানে সব দেখছে!

কিভাবে: ARP spoofing, DNS poisoning, rogue WiFi

SSH Defense — TOFU (Trust On First Use):
  প্রথম connection: key save → known_hosts
  পরের connection: key match check → mismatch হলে WARNING!

TOFU strengthen:
  ├── SSH Certificate Authority
  ├── SSHFP DNS records
  └── Host key fingerprint আগে থেকে verify
```

### Attack 3: Key Theft

```
চুরির উপায়: Malware, backup, GitHub push, laptop চুরি

Defense:
  1. Passphrase ALWAYS ব্যবহার করুন
  2. chmod 600 ~/.ssh/id_ed25519
  3. Encrypted disk (BitLocker/LUKS/FileVault)
  4. YubiKey / Hardware Security Key (সেরা!)
```

**YubiKey:**

```bash
ssh-keygen -t ed25519-sk    # key hardware এর ভিতরে, বের করা impossible
```

### Attack 4: SSH Backdoor

```
Methods: authorized_keys এ key যোগ, new user, দ্বিতীয় sshd, PAM backdoor

Detection:
  authorized_keys audit
  ps aux | grep sshd (unusual instances?)
  dpkg --verify openssh-server (binary integrity)
  last -20 (recent logins check)
  ss -tlnp | grep ssh (unusual ports?)
```

### Attack 5: Username Enumeration

```
Timing attack: valid user → slow response, invalid → fast response
Defense: Update OpenSSH, Fail2Ban, PasswordAuthentication no
```

### Attack 6: CVE / Software Vulnerability

```
CVE-2024-6387 (regreSSHion): Remote Code Execution, unauthenticated!
Defense: ALWAYS update OpenSSH, defense in depth
```

### Defense in Depth Stack

```
┌──────────────────────────────┐
│  Network: Firewall + Port    │ ← বাইরের layer
│  knocking                    │
├──────────────────────────────┤
│  Auth: Key-only + 2FA        │
├──────────────────────────────┤
│  Access: AllowUsers +        │
│  Fail2Ban                    │
├──────────────────────────────┤
│  Crypto: Strong algorithms   │
├──────────────────────────────┤
│  Monitoring: Logs + Alerts   │ ← ভেতরের layer
└──────────────────────────────┘
প্রতিটা layer একটা attack আটকায়
```

---

## 11. Alternative ও Related Tools

### Mosh (Mobile Shell)

```
SSH: WiFi পরিবর্তন → DROP → session LOST
Mosh: WiFi পরিবর্তন → seamless reconnect → session জীবিত!
```

- SSH দিয়ে authenticate → তারপর **UDP** তে switch → IP পরিবর্তন হলেও চলে
- **Local echo** → keystroke instant দেখায়

```bash
sudo apt install mosh
mosh user@server
```

| বিষয় | SSH | Mosh |
|-------|-----|------|
| **Protocol** | TCP | UDP |
| **Roaming** | ❌ | ✅ |
| **Port forwarding** | ✅ | ❌ |
| **Scrollback** | ✅ | ❌ |

### tmux / screen

```
Without tmux: SSH drops → task KILLED!
With tmux: SSH drops → task চলতেই থাকে → আবার attach → সব আগের মতো!
```

```bash
tmux                    # নতুন session
tmux attach             # আগের session এ ফিরে যাওয়া
# Ctrl+B, D             # detach
```

### WireGuard VPN vs SSH Tunneling

```
SSH Tunnel: Single port/service forward → per-service configure
WireGuard: পুরো network access → একবার connect → সব accessible

কখন কোনটা?
  "শুধু DB access চাই"          → SSH tunnel
  "পুরো internal network চাই"   → VPN (WireGuard)
```

### Modern SSH Access Platforms

| Tool | Features |
|------|----------|
| **Teleport** | SSH + K8s + DB, SSO, session recording, RBAC |
| **Boundary** | Identity-based access, Vault integration |
| **Tailscale SSH** | WireGuard mesh, ACL, zero config |

---

## 12. Tips & Tricks

### Connection Alive রাখা

```
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

### Connection Multiplexing (Reuse)

```
Host *
    ControlMaster auto
    ControlPath ~/.ssh/sockets/%r@%h-%p
    ControlPersist 600
```

প্রথম connection এ handshake, পরের সব **instantly** connect।

### Jump Host

```bash
ssh -J user@bastion user@internal

# Config:
Host internal
    ProxyJump bastion
```

### Background Port Forward

```bash
ssh -fNL 8080:localhost:3000 user@server
# -f background, -N no command, -L local forward
```

### SSHFS — Remote Directory Mount

```bash
sshfs user@server:/var/www ~/remote-mount
# VS Code দিয়েও open করতে পারবেন!
fusermount -u ~/remote-mount    # unmount
```

### Remote Command (Login ছাড়া)

```bash
ssh user@server "df -h"
ssh user@server 'bash -s' < local-script.sh
ssh user@server "cat /var/log/app.log" > local-copy.log
```

### SSH Escape Sequences

`Enter` press করার পর `~` দিয়ে:

| Sequence | কাজ |
|----------|-----|
| `~.` | Connection **force kill** (hang হলে!) |
| `~^Z` | SSH session **suspend** |
| `~#` | Forwarded connections **list** |
| `~?` | **Help** |

### Tar over SSH (দ্রুত Transfer)

```bash
# Upload
tar czf - ./my-folder | ssh user@server "tar xzf - -C /destination/"

# Download
ssh user@server "tar czf - /var/www/app" | tar xzf - -C ./local-backup/
```

### Key Restriction (authorized_keys)

```
command="/usr/bin/backup" ssh-ed25519 AAAA...      # শুধু নির্দিষ্ট command
from="192.168.1.0/24" ssh-ed25519 AAAA...          # নির্দিষ্ট IP
no-port-forwarding,no-agent-forwarding ssh-ed25519  # feature বন্ধ
```

### SSH Tunneling Tricks

```bash
# Database access
ssh -L 5432:db-server:5432 user@bastion
# localhost:5432 → production DB

# SOCKS Proxy (blocked site access)
ssh -D 9090 user@server
# Browser SOCKS5 proxy: localhost:9090
```

### Quick Cheat Sheet

```bash
ssh user@host                          # basic login
ssh -p 2222 user@host                  # custom port
ssh -i ~/.ssh/mykey user@host          # specific key
ssh -L 8080:localhost:80 user@host     # local forward
ssh -R 9090:localhost:3000 user@host   # remote forward
ssh -D 1080 user@host                  # SOCKS proxy
ssh -J jump-host user@target           # jump/bastion
ssh user@host "command"                # remote command
scp file.txt user@host:/path/          # file copy
rsync -avz -e ssh ./dir user@host:/p/  # sync (better than scp)
```

---

> **Document Created:** 2026-03-02
> **Topics Covered:** SSH basics, internals, encryption, CA, hardening, agent forwarding, DevOps, attacks, alternatives, tips
