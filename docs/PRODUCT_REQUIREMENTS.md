# ALNrestaurant — Product Requirements Document (PRD)

Phase: SOURCE BASE / PROJECT FOUNDATION ONLY.
Version 1.0.0 | Date 2026-09-14 | Status APPROVED FOR FOUNDATION.
Direction: Mobile-first Restaurant Management & Profit Optimization.

> Prompt nay: CHI phan tich + viet PRD + chot scope. KHONG code full, KHONG business logic, KHONG Phase 2.

## 1. Product Vision

ALNrestaurant la mobile app quan ly nha hang + toi uu loi nhuan.

Muc tieu dai han (Vision Backlog, CHUA lam phase nay):

- Quan ly mon an / danh muc / nguyen lieu / cong thuc.
- Quan ly ton kho / don hang / chi phi / nha cung cap.
- Theo doi doanh thu, phan tich loi nhuan, Dashboard.
- AI Restaurant Copilot hoi dap tren du lieu that.

Product Direction (bat bien): Mobile-first. Moi quyet dinh architecture, UI/UX, tooling uu tien mobile Android + iOS.

## 2. Current Phase — Source Base

Muc tieu duy nhat: nen mong sach, ro, chay duoc, mo rong duoc.

- project structure sach: mobile / backend / db / docs tach bach.
- architecture ro rang: hieu luong Auth -> App -> API -> DB -> AI-tool (tuong lai).
- mobile foundation: Expo + TS + Router, navigation Auth <-> Main chay.
- backend foundation: API chay, /health tra 200, du tang controller/service/route/middleware.
- database foundation: Prisma connect duoc, migration + seed chay.
- authentication foundation: endpoint + context + middleware ton tai, chua can hoan chinh.
- AI architecture foundation: thu muc + interface tool, KHONG goi LLM.
- tooling: TS check pass, ESLint pass. Documentation: README + PRD.

Nguyen tac: Simple / Stable / Readable / Maintainable / Expandable. Phu hop vibe coding.
CAM: microservices, over-engineering, framework/dependency khong can thiet.

## 3. Target Platform & Stack (chot, chua cai dat o prompt nay)

- Primary: Mobile App Android + iOS. KHONG lam Web App.
- Mobile: React Native + Expo + TypeScript + Expo Router (file-based routing).
- Backend (de xuat): Node.js + TS + Express + Prisma ORM.
- DB (de xuat): PostgreSQL mac dinh. SQLite chi cho dev local neu can.
- Auth: JWT + bcrypt. Refresh-token de Phase 2.
- Tooling: ESLint + Prettier + tsconfig strict + .env.example + README.

## 4. User Roles (3 role)

- ADMIN: quan ly toan he thong.
- MANAGER: quan ly van hanh nha hang.
- STAFF: dung chuc nang duoc cap quyen.
- Source Base: chi dinh nghia type/enum User.role + AuthContext luu role. KHONG RBAC hoan chinh. De san middleware requireRole stub cho Phase 2.

## 5. Modules Catalog (14 modules dai han)

1. Authentication. Base: 3 endpoint stub + AuthContext + middleware stub + 2 man hinh.
2. Dashboard. Base: UI skeleton + mock/0.
3. Menu Management. Base: man hinh Menu khung.
4. Category Management. Base: tab/section khung trong Menu.
5. Product Management. Base: man Add Product khung, form chua submit that.
6. Ingredient Management. Base: list khung.
7. Recipe Management. Base: chi entity + relation, chua UI tinh cost.
8. Inventory Management. Base: Total / Low Stock / List (mock).
9. Order Management. Base: Search + Filter + List + empty-state "No orders yet".
10. Expense Management. Base: chi entity, chua UI sau.
11. Supplier Management. Base: chi entity, chua UI sau.
12. Analytics. Base: UI chart mock.
13. AI Restaurant Copilot. Base: chi thu muc + interface, KHONG LLM, KHONG UI chat.
14. Settings. Base: UI list tinh + nut Logout (mock).

## 6. User Flows

6.1 Unauthenticated:
App launch -> Splash (optional) -> Login <-> Register -> (login success) -> Main Tabs.

6.2 Authenticated Tabs (Expo Router):
Home (/home) | Orders (/orders) | Menu (/menu) | Inventory (/inventory) | Analytics (/analytics) | Settings (/settings).

6.3 Navigation Map file-based (de xuat, chua implement o prompt nay):
app/_layout.tsx (root: AuthProvider + Stack).
app/(auth)/login.tsx, app/(auth)/register.tsx.
app/(tabs)/home.tsx, orders.tsx, menu.tsx, inventory.tsx, analytics.tsx, settings.tsx.

6.4 Auth Guard (foundation):
AuthContext gom user, token, isLoading, login(), register(), logout(). Phase nay mock duoc.
Chua login -> redirect (auth). Da login -> redirect (tabs).

## 7. Functional Requirements — Foundation (mock/0 duoc phep)

- Auth: Login (email + password + link Register), Register (name + email + password + link Login). Validate rong toi thieu.
- Home: Header + Today Overview (Revenue/Orders/Expenses/Profit = 0 hoac mock) + Top Products mock 3-5 + Inventory Alerts mock 2-3 + AI Insight 1 card tinh.
- Menu: tabs Categories|Products, grid/list mock, nut Add Product -> form khung chua luu that.
- Orders: Search + Filter chips All/Pending/Completed/Cancelled (local/mock) + List + empty-state "No orders yet".
- Inventory: Total Ingredients mock / Low Stock mock / Ingredient List mock.
- Analytics: Revenue/Profit/Expenses + 1 chart mock + Top Products mock. KHONG tinh toan.
- Settings: list tinh Profile/Restaurant/Notifications/Security/Logout. Logout chi clear mock session.

## 8. Database Domain (10 entities, khong tu y them)

User, Category, Product, Ingredient, Recipe, Order, OrderItem, InventoryTransaction, Expense, Supplier.

Quan he chot:

- User (id, name, email unique, passwordHash, role, createdAt). Tao Order / Expense.
- Category (id, name unique) 1-N Product.
- Product (id, name, price, cost?, imageUrl?, isAvailable, categoryId) N-N Ingredient qua Recipe.
- Recipe (productId + ingredientId composite, quantity, unit). Dinh muc.
- Ingredient (id, name, unit, stockQty, lowStockThreshold, supplierId?) N-1 Supplier, 1-N InventoryTransaction.
- Supplier (id, name, phone?, address?) 1-N Ingredient.
- Order (id, code, status, total, createdById -> User) 1-N OrderItem.
- OrderItem (orderId + productId, qty, unitPrice, subtotal).
- InventoryTransaction (id, ingredientId, type IN/OUT/ADJUST, qty, reason?).
- Expense (id, title, amount, category, date, createdById -> User).
- Tien te dung Decimal. Status dung enum. Prisma schema la source-of-truth.

## 9. API Foundation

- GET /health -> { status: "ok", timestamp }. Bat buoc chay. Alias /api/health neu can.
- POST /api/auth/register, POST /api/auth/login, GET /api/auth/me (middleware requireAuth check Bearer JWT). Stub 501 co message ro cung OK o Source Base.
- Cau truc backend de xuat: backend/src/index.ts, routes/, controllers/, services/, middleware/auth.middleware + requireRole.stub, lib/prisma + jwt. Kem backend/prisma/schema.prisma + seed.ts + .env.example.

## 10. AI Copilot — Architecture Only

Luong dai han: User -> AI Copilot -> AI Tool -> Restaurant DB -> Real Data -> AI -> Answer.
VD: "Mon nao loi nhuan cao nhat?" (tuong lai) goi getTopProfitableProducts(). "Sao profit thang nay giam?" (tuong lai) lay Revenue + COGS + Expenses + Profit.
Source Base: CAM goi LLM API. CAM chatbot UI. CAM forecasting/dynamic pricing.
CHI tao ai/ (hoac backend/src/ai/) voi tools/types.ts + tools stub + README giai thich luong. Stub VD: getTopProfitableProducts(ctx) return [].

## 11. Non-Functional Requirements

Don gian > thong minh. De doc > toi uu som. TS strict pass, ESLint pass.
Mobile chay npx expo start. Backend chay npm run dev. DB chay prisma migrate dev + db seed.
Secret qua .env + .env.example. Khong commit .env.

## 12. Scope Matrix — IN vs OUT

IN (phai co de pass): Mobile chay, navigation chay, Login/Register/Main screens render, Backend chay, Health API chay, DB chay, Prisma connect, migration + seed chay, API/Auth/AI architecture ton tai, README ton tai, TS + ESLint pass.

OUT (CAM, scope-creep neu lam): complete auth, complete CRUD, order business logic, inventory calculation, recipe cost, profit/revenue calculation, AI chatbot, AI forecasting, dynamic pricing, notifications/push, payment, barcode/camera, table management.

## 13. Success Criteria (17 o check)

Mobile chay; Navigation chay; Login render; Register render; Main screens render; Backend chay; Health API chay; DB chay; Prisma connect; Migration chay; Seed chay; API arch ton tai; Auth arch ton tai; AI arch ton tai; README ton tai; TS pass; ESLint pass.

## 14. Implementation Order Proposal (cho prompt tiep theo, CHUA lam bay gio)

0. Repo hygiene: .gitignore, README, docs.
1. Backend foundation + /health (curl -> ok).
2. Prisma schema 10 entities + migration + seed.
3. Auth routes/controller/service/middleware (stub OK).
4. Expo + TS + Router + (auth)+(tabs) rong (expo start OK).
5. AuthContext + guard + Login/Register UI (login mock vao Home).
6. 6 man tabs skeleton mock.
7. AI folder + tool stubs + doc luong.
8. ESLint/Prettier/typecheck scripts pass.
9. Nghiem thu theo checklist §13.
Thu tu toi thieu dependency: Backend -> DB -> Auth -> Mobile -> UI -> AI-stub -> Tooling.

## 15. Risks

Repo hien tai gan nhu trong (chi README.md) — thuan loi dung sach tu dau.
Rui ro lon nhat: lam lo business logic/AI som. Tu choi thang theo §12 OUT.

## 16. Dung lai — Cho prompt tiep theo

PRD v1.0.0 ket thuc tai day. Khong trien khai code, khong chuyen Phase 2 cho toi khi co prompt moi phe duyet §14.

Appendix: RBAC; COGS = Cost of Goods Sold; IN/OUT/ADJUST = nhap/xuat/dieu chinh kho.
Tai lieu lien quan (phase sau): README.md, docs/ARCHITECTURE.md, docs/API.md, docs/DATABASE.md, prisma/schema.prisma.

