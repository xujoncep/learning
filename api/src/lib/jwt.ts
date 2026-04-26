// HS256 JWT implementation using Web Crypto API only.
// No Node built-ins, no npm packages — works inside Cloudflare Workers.

const HEADER_B64 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'; // {"alg":"HS256","typ":"JWT"}

export interface JwtPayload {
  sub: number;
  exp: number;
}

function b64urlEncode(input: Uint8Array | string): string {
  let bytes: Uint8Array;
  if (typeof input === 'string') {
    bytes = new TextEncoder().encode(input);
  } else {
    bytes = input;
  }
  let bin = '';
  for (let i = 0; i < bytes.length; i++) {
    bin += String.fromCharCode(bytes[i]!);
  }
  const b64 = btoa(bin);
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function b64urlDecode(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4));
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + pad;
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    out[i] = bin.charCodeAt(i);
  }
  return out;
}

async function importHmacKey(
  secret: string,
  usage: 'sign' | 'verify',
): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    [usage],
  );
}

export async function signJwt(payload: JwtPayload, secret: string): Promise<string> {
  const payloadB64 = b64urlEncode(JSON.stringify(payload));
  const signingInput = `${HEADER_B64}.${payloadB64}`;
  const key = await importHmacKey(secret, 'sign');
  const sig = new Uint8Array(
    await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signingInput)),
  );
  return `${signingInput}.${b64urlEncode(sig)}`;
}

export async function verifyJwt(token: string, secret: string): Promise<JwtPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [headerB64, payloadB64, sigB64] = parts as [string, string, string];

    // We only support our fixed header.
    if (headerB64 !== HEADER_B64) return null;

    const signingInput = `${headerB64}.${payloadB64}`;
    const sig = b64urlDecode(sigB64);
    const key = await importHmacKey(secret, 'verify');
    const ok = await crypto.subtle.verify(
      'HMAC',
      key,
      sig,
      new TextEncoder().encode(signingInput),
    );
    if (!ok) return null;

    const payloadJson = new TextDecoder().decode(b64urlDecode(payloadB64));
    const payload = JSON.parse(payloadJson) as Partial<JwtPayload>;
    if (typeof payload.sub !== 'number' || typeof payload.exp !== 'number') return null;
    if (payload.exp <= Math.floor(Date.now() / 1000)) return null;
    return { sub: payload.sub, exp: payload.exp };
  } catch {
    return null;
  }
}
