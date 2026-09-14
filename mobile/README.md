# ALNrestaurant — mobile

Mobile-first restaurant management foundation (Expo + TypeScript + Expo Router).

## Requirements

- Node 20+ / 22
- npm
- Expo Go (Android / iOS) for on-device run

## Setup

```bash
cd mobile
npm install
cp .env.example .env   # set EXPO_PUBLIC_API_URL
```

## Run

```bash
npm run typecheck   # tsc --noEmit (must pass)
npm run lint        # eslint (must pass)
npx expo start      # scan QR with Expo Go
```

## Navigation

- `app/index.tsx` — redirect by auth state
- `app/(auth)/login.tsx`, `app/(auth)/register.tsx`
- `app/(tabs)/` — index (Home), orders, menu, inventory, analytics, settings

Mock auth: Login/Register set a mock session and redirect to tabs. No backend needed.

## Notes

- API base URL comes from `EXPO_PUBLIC_API_URL` (`services/api.ts`). No hardcoded localhost in components.
- NativeWind v2 babel plugin is temporarily disabled in `babel.config.js` (incompatible with PostCSS hoisted by Expo SDK 57).
  Styling uses React Native StyleSheet + React Native Paper theme. Re-enable NativeWind v4+ later.
