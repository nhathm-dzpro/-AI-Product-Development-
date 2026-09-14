# ALNrestaurant — backend

Backend foundation: Express + TypeScript + Prisma + PostgreSQL + Zod + JWT + bcrypt.

## Setup

```bash
cd backend
npm install
cp .env.example .env   # set DATABASE_URL, JWT_SECRET
npx prisma generate
npx prisma migrate dev # needs PostgreSQL running
```

## Run

```bash
npm run typecheck
npm run lint
npm run dev            # tsx watch src/server.ts (PORT=5000)
```

## Health

```bash
curl http://localhost:5000/api/health
# { "success": true, "message": "ALNrestaurant API is running" }
```

## Auth (minimal foundation)

- `POST /api/auth/register` — bcrypt hash, never plaintext
- `POST /api/auth/login` — verify + sign JWT
- `GET /api/auth/me` — `Authorization: Bearer <token>`

Other modules (`/api/users`, `/api/products`, ...) are skeleton routes only.
AI (`/api/ai`) returns 501 / placeholder — no LLM call.
