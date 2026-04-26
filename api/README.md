# Porhi API

Cloudflare Worker (Hono + D1) backing the Porhi learning site. Provides Google OAuth login, JWT-issued sessions, and per-user bookmarks / reading-progress / audit-log endpoints.

## Prereqs

- Node 20+
- `npm install -g wrangler` (or use `npx wrangler ...`)
- `wrangler login` once, against the Cloudflare account that owns `learning-hub-3gw.pages.dev`

## Local dev

```sh
cd api
npm install
# Initialize the local D1 with our schema (one-time)
npx wrangler d1 execute porhi-db --local --file=migrations/0001_initial.sql
npm run dev   # serves on http://localhost:8787
```

For local dev, secrets default to whatever `wrangler dev` prompts for. You can also create a `.dev.vars` file at `api/.dev.vars` (gitignored by wrangler) with:

```
JWT_SECRET=local-dev-secret-change-me
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

## Deploy (first time)

Run these from `api/`, in this order:

1. `npx wrangler d1 create porhi-db` → copy the printed `database_id` and paste it into `wrangler.toml` (replace `PLACEHOLDER_RUN_WRANGLER_D1_CREATE`).
2. `npx wrangler d1 migrations apply porhi-db --remote`
3. `npx wrangler secret put JWT_SECRET` (paste a fresh 32-byte hex string — `openssl rand -hex 32`)
4. `npx wrangler secret put GOOGLE_CLIENT_ID`
5. `npx wrangler secret put GOOGLE_CLIENT_SECRET`
6. `npx wrangler deploy`
7. Copy the deployed URL (e.g. `https://porhi-api.<acct>.workers.dev`), update `GOOGLE_REDIRECT_URI` in `wrangler.toml`, redeploy, and add the same URL (`/auth/google/callback`) to **Authorized redirect URIs** in the Google Cloud Console OAuth client.

Subsequent deploys are just `npx wrangler deploy`.

## Endpoints

| Method | Path                       | Auth | Body                          | Response                                          |
|--------|----------------------------|------|-------------------------------|---------------------------------------------------|
| GET    | `/auth/google`             | no   | –                             | 302 redirect to Google                            |
| GET    | `/auth/google/callback`    | no   | –                             | 302 redirect to `FRONTEND_URL/auth/callback?token=...` |
| POST   | `/auth/logout`             | no   | –                             | `{ ok: true }`                                    |
| GET    | `/me`                      | yes  | –                             | `{ user: UserRow }`                               |
| GET    | `/me/bookmarks`            | yes  | –                             | `{ slugs: string[] }`                             |
| POST   | `/me/bookmarks`            | yes  | `{ slug }`                    | `{ ok: true }`                                    |
| DELETE | `/me/bookmarks/:slug`      | yes  | –                             | `{ ok: true }`                                    |
| GET    | `/me/progress`             | yes  | –                             | `{ items: ReadingProgressRow[] }`                 |
| POST   | `/me/progress/:slug`       | yes  | `{ percent, last_section? }`  | `{ ok: true }`                                    |
| POST   | `/audit`                   | yes  | `{ action, target? }`         | `{ ok: true }`                                    |

Auth is `Authorization: Bearer <jwt>`. JWTs are HS256, signed with `JWT_SECRET`, valid for 7 days.

## V1 limitations

- OAuth `state` is generated per-request but not persisted server-side (no KV-backed CSRF check).
- Google `id_token` signature is not verified — we trust the TLS channel to `oauth2.googleapis.com`. Production would fetch JWKS and verify.
- No rate limiting. Add a Cloudflare WAF rule or migrate to Durable Objects + token-bucket if abuse appears.
