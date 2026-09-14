# ALNrestaurant — backend

Backend foundation: Express + TypeScript + Prisma + PostgreSQL + Zod + JWT + bcrypt.

## Setup

```bash
cd backend
npm install
cp .env.example .env   # set DATABASE_URL, JWT_SECRET
npx prisma generate
npx prisma migrate dev --name init_database # needs PostgreSQL running
npx prisma db seed
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
AI (`GET /api/ai`, `POST /api/ai/query`) is a placeholder only — no LLM call or database access.

## Database migration and seed

From the repository root, start PostgreSQL with Docker Desktop running:

```bash
docker compose up -d
cd backend
copy .env.example .env # PowerShell: Copy-Item .env.example .env
npx prisma migrate dev
npx prisma db seed
npx prisma generate
```

The initial migration is committed in `prisma/migrations`. The development seed is idempotent and creates one ADMIN user (`admin@aln.local`, password `Admin@123`), three categories, five products, and eight ingredients. Change the development password before using any non-local environment.
