# ALNrestaurant — Mobile App

Mobile-first restaurant management app with Web preview support, powered by **Expo SDK 58**, **React Native 0.88**, **React 19.3**, and **Expo Router**.

## Requirements

- Node.js 20+ / 22+
- npm
- Expo Go (SDK 58) on Android / iOS device

## Setup

```bash
cd mobile
npm install --legacy-peer-deps
cp .env.example .env   # Configure EXPO_PUBLIC_API_URL
```

> **LAN connection:** On physical phones, set `EXPO_PUBLIC_API_URL=http://<YOUR_PC_IP>:5000/api` in `mobile/.env`.

## Run

```bash
# Typecheck & lint
npm run typecheck   # tsc --noEmit (0 errors)
npx eslint .        # ESLint (0 errors, 0 warnings)

# Run for mobile (Expo Go)
npx expo start -c

# Run directly on Web (desktop browser)
npm run web
```

## Navigation Structure

- `app/index.tsx` — Root redirect based on auth status
- `app/(auth)/login.tsx`, `app/(auth)/register.tsx` — Authentication forms
- `app/(tabs)/`:
  - `index.tsx` — Dashboard & Home overview (stats, 7-day BarChart, recent orders, quick actions)
  - `orders.tsx` — Order management with search & status filters
  - `menu.tsx` — Product catalog & category management
  - `inventory.tsx` — Ingredient stock tracking & low-stock alerts
  - `analytics.tsx` — Revenue/profit/expense financial reports with LineChart & BarChart
  - `settings.tsx` — Restaurant profile, preferences, and sign out
- `app/ai-copilot.tsx` — AI Restaurant Copilot interactive chat & business insights

## Key Components

- `components/ui/` — Base UI primitives: `Button` (supports both `label` and `children`), `Input` (supports `error` and `errorText`), `Card`
- `components/charts/` — Native SVG charts: `BarChart`, `LineChart`
- `components/` — Feature cards: `OrderCard`, `ProductCard`, `InventoryCard`, `AIInsightCard`, `Badge`, `SearchBar`, `Header`, `StatCard`
- `data/mockData.ts` — Realistic F&B sample dataset for demo and testing
- `constants/Colors.ts` — Standardized brand color palette
