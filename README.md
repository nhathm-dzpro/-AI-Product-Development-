# ALNrestaurant

## Product Overview

ALNrestaurant is a mobile-first restaurant-management source base with web preview capability. It provides the project structure, navigation, REST API foundation, PostgreSQL schema, development seed, and AI Restaurant Copilot.

- 📄 **PRD Document:** [docs/PRODUCT_REQUIREMENTS.md](docs/PRODUCT_REQUIREMENTS.md)

## Features

- **Expo SDK 58 & React Native 0.88**: Upgraded for full compatibility with modern Expo Go mobile apps.
- **Expo Router Navigation**: Clean file-based routing with mock authentication, six protected tabs, and dedicated AI Copilot screen.
- **Rich Mobile UI & Charts**: Complete dashboard, interactive custom SVG charts (BarChart, LineChart), order cards, colored inventory alert badges, and restaurant mock data.
- **AI Restaurant Copilot Screen**: Interactive chat UI with automated business insights, suggested questions, and sales analysis (`mobile/app/ai-copilot.tsx`).
- **Web Preview**: Run directly in desktop browsers with `npm run web` powered by `react-native-web`.
- **Express API**: Health check, response/error middleware, authentication foundation (JWT + bcrypt), and module route placeholders.
- **Prisma & PostgreSQL**: 10 normalized entities schema (Users, Menu, Recipes, Orders, OrderItems, Inventory, Transactions, Expenses, Suppliers) with Supabase Cloud connection or local Docker fallback.
- **AI Backend Architecture**: Controlled tool boundaries (`inventory`, `product`, `profit`, `sales`) ready for future LLM integration.

## Architecture

```text
Mobile / Web (Expo SDK 58)
  ↓
REST API (Express + TypeScript)
  ↓
Prisma ORM
  ↓
PostgreSQL (Supabase Cloud / Docker local)
```

Mobile clients communicate exclusively with the backend API; they never connect to PostgreSQL directly. AI orchestration operates through controlled backend tools.

## Tech Stack

| Area     | Technology                                                   |
| -------- | ------------------------------------------------------------ |
| Mobile   | Expo SDK 58, React Native 0.88, React 19.3, TypeScript, Expo Router, React Native SVG |
| Web      | React Native Web, React DOM 19.3                             |
| Backend  | Node.js, Express, TypeScript, Zod, JWT, bcrypt               |
| Database | PostgreSQL, Prisma ORM (Supabase Cloud / Local Docker)       |
| AI       | Interactive mobile chat UI & controlled backend tool stubs   |

## Requirements

- Node.js 20+ / 22+
- npm
- Expo Go (SDK 58 compatible) for physical Android / iOS testing
- (Optional) Docker Desktop for local PostgreSQL if not using Supabase

## Installation

```powershell
git clone <repository-url>
cd ALNrestaurant

# 1. Setup Backend
cd backend
npm install
Copy-Item .env.example .env

# 2. Setup Mobile
cd ..\mobile
npm install --legacy-peer-deps
Copy-Item .env.example .env
```

> [!NOTE]
> Set `EXPO_PUBLIC_API_URL` in `mobile/.env` to your development machine's local Wi-Fi IP (e.g. `http://192.168.1.14:5000/api`) so physical phones can reach the backend.

## Run Backend

```powershell
cd backend
npm run dev
```

Verify at `GET http://localhost:5000/api/health`:
```json
{ "success": true, "message": "ALNrestaurant API is running" }
```

## Run Mobile / Web

### Physical Device (Expo Go)
```powershell
cd mobile
npx expo start -c
```
Scan the generated QR code using the **Expo Go** app on Android or Camera app on iOS.

### Web Browser (Desktop)
```powershell
cd mobile
npm run web
```
Opens the application directly in your default browser at `http://localhost:8081`.

## Project Structure

```text
mobile/             Expo mobile & web application (SDK 58, Expo Router)
mobile/app/         File-based routes: (auth), (tabs), ai-copilot.tsx
mobile/components/  UI components, charts (BarChart, LineChart), cards
mobile/data/        F&B mock business data (products, orders, revenue)
mobile-backup/      Pre-merge archive backup of the initial source base
backend/            Express API, Prisma schema/seed/migrations, AI architecture
backend/prisma/     PostgreSQL schema, migration history, development seed
docs/               Product Requirements Document ([PRD](docs/PRODUCT_REQUIREMENTS.md)) and documentation
```

## Quality & Verification

Both projects are strictly typed and linted:
```powershell
cd mobile && npm run typecheck && npx eslint .
cd ../backend && npm run typecheck
```
