# ALNrestaurant — Product Requirements Document (PRD)

**Document Version:** 2.0.0  
**Status:** Approved for Implementation  
**Last Updated:** 2026-11-14  
**Target Platform:** Mobile-First (iOS, Android via Expo SDK 58) with Desktop Web Preview  
**Target Segment:** Independent F&B restaurants and cafes (1–3 locations, 10–50 tables) in Vietnam  

---

## 1. Executive Summary & Vision

**ALNrestaurant** is a mobile-first restaurant operations and profit optimization platform designed specifically for independent food and beverage (F&B) businesses. Unlike legacy, desktop-bound POS systems or fragmented spreadsheet trackers, ALNrestaurant unifies front-of-house order execution, automated recipe-level inventory deductions, financial analytics, and a governed AI Restaurant Copilot into a fast, portable mobile application.

---

## 2. Problem Statement & Operational Evidence

### 2.1 The Core Problem
Independent restaurant owners and store managers operate in a state of operational opacity and margin blindness. Disconnected point-of-sale data, paper kitchen tickets, and manual stocktaking create severe information lag, resulting in food waste, unnoticed cost-of-goods-sold (COGS) inflation, and painful daily reconciliation overhead.

### 2.2 Operational Evidence (Vietnam F&B SME Segment)
1. **Manual Reconciliation Overhead:** Store managers spend **5 to 8 hours per week** manually transcribing handwritten kitchen chits, paper supplier invoices, and POS receipts into Excel spreadsheets to reconcile shift revenue and daily cash balances.
2. **Inventory & COGS Leakage:** Due to disconnected stock tracking, restaurants suffer a **5% to 10% monthly inventory variance** (spoilage, over-portioning, theft, or untracked shrinkage) and discover supplier price surges weeks after margins have already degraded.
3. **Peak-Hour Bottlenecks & Service Failures:** The absence of real-time ingredient tracking leads to stockout surprises during lunch (11:30 AM – 1:30 PM) and dinner rushes (6:30 PM – 8:30 PM). Waitstaff take orders for 86'd items, forcing manual voids, kitchen disruption, and frustrated diners.

---

## 3. Target Users & Persona Hierarchy

| Persona | Primary Platform | Responsibilities | Core Pain Point Solved |
| :--- | :--- | :--- | :--- |
| **Owner / General Director (`ADMIN`)** | Mobile & Web Desktop | Strategic oversight, menu pricing, capital allocation, P&L monitoring | Eliminates end-of-month financial surprises by providing real-time net profit and daily revenue tracking. |
| **Store / Shift Manager (`MANAGER`)** | Mobile App | Shift reconciliation, ingredient stock audit, purchase orders, supplier management | Eliminates 5–8 hours/week of manual spreadsheet entry and alerts immediately on low stock. |
| **Floor / Kitchen Staff (`STAFF`)** | Mobile App | Fast table ordering, order status updates, kitchen dispatch coordination | Eliminates order entry lag (<15s per order) and prevents taking orders for depleted dishes. |

*Note on End-Diners:* Direct consumer login is explicitly out of scope for MVP. Diners interact via staff-assisted orders or frictionless, ephemeral table-QR digital menus.

---

## 4. Success Metrics & Measurement Framework

### 4.1 Primary North Star Metric
* **Monthly Inventory Variance Rate:** Reduce the discrepancy between physical stock counts and system-recorded inventory from **5–10% down to < 2%** within 60 days of store onboarding.
  * *Measurement Source:* Measured directly within the database by auditing physical reconciliation records (`InventoryTransaction` with type `ADJUSTMENT`) against recipe-based deductions triggered by completed orders (`Order` where `status = COMPLETED` joined with `OrderItem` and `Recipe`).

### 4.2 Secondary & Guardrail Metrics
1. **Manager Reconciliation Time:** Reduced from **5–8 hours/week to < 1 hour/week** per store manager, measured by time-to-close shifts via automated End-of-Day summary reports.
2. **Peak-Hour Stockout Cancellations:** Reduced by **> 75%**, measured by tracking `Order` records with `status = CANCELLED` attributed to out-of-stock reasons.
3. **Order Entry Speed:** Staff can initiate, customize, and submit an order in **under 15 seconds**, measured via mobile UI interaction timestamps.
4. **System Reliability & Availability:** API uptime ≥ 99.9%; API response time (p95) < 250ms on mobile cellular connections.

---

## 5. Alternatives Considered & Baseline Comparison

| Approach | How It Operates | Why It Fails for Independent F&B |
| :--- | :--- | :--- |
| **Manual Paper & Excel (Status Quo)** | Paper chits for waiters; nightly Excel tally by manager | High error rate; 5–10% leakage; zero real-time visibility during rushes; 8 hrs/week lost time. |
| **Traditional Desktop POS (e.g., KiotViet, iPOS basic tier)** | Bulky desktop terminal at cashier counter | Waitstaff must wait in line at cashier terminal to punch orders; inventory modules are disconnected from recipe BOM (Bill of Materials) or cost prohibitive to configure. |
| **Enterprise Restaurant ERP (e.g., SAP, Oracle Simphony)** | Complex, multi-chain enterprise suite | Extremely high cost (\$3,000+ setup); steep learning curve; requires dedicated IT staff; completely unsuitable for 1–3 location restaurants. |
| **ALNrestaurant (This Solution)** | **Mobile-first, lightweight, real-time recipe-inventory sync with governed AI Copilot** | **Runs on existing smartphones/tablets; zero hardware lock-in; automatic recipe deduction per dish; real-time margin alerts.** |

---

## 6. Goals & Explicit Non-Goals

### 6.1 Goals (In-Scope v1)
* **Mobile-First Core Operations:** 100% operational functionality on Android and iOS devices via Expo SDK 58, with desktop web preview support.
* **Role-Based Access Control:** Secure JWT authentication enforcing `ADMIN`, `MANAGER`, and `STAFF` permission boundaries.
* **Menu & Bill of Materials (Recipe):** Full link between Menu Products and Ingredient quantities with unit conversions.
* **Automatic Inventory Sync:** Real-time stock decrement upon order completion and audit trail via `InventoryTransaction`.
* **Financial Dashboard & Analytics:** Real-time calculation of Gross Revenue, COGS, Operating Expenses, and Net Profit.
* **AI Restaurant Copilot Foundation:** Controlled, tool-bounded architecture querying live database metrics (`inventory`, `product`, `profit`, `sales`) without hallucinations or leaking raw DB credentials.

### 6.2 Explicit Non-Goals (Out of Scope for v1)
* **Direct Consumer App:** No native diner accounts, consumer loyalty profiles, or public app store diner portals.
* **Complex Multi-Brand Franchise Hierarchy:** No multi-tenant holding company organizational hierarchies in v1.
* **Tax/Government Accounting Filing:** No direct automated e-invoicing transmission to tax authorities (MISA/VNPT integration deferred to v2).
* **Autonomous AI Action Execution:** AI Copilot is strictly advisory/read-only; it will **never** automatically fire purchase orders or modify dish prices without human confirmation.

---

## 7. System Architecture & Technical Specifications

### 7.1 Architecture Diagram

```text
┌────────────────────────────────────────────────────────┐
│               Client Tier (Mobile & Web)               │
│  Expo SDK 58 • React Native 0.88 • React 19 • TS 6.0   │
│  Expo Router • React Native SVG Charts • Paper Theme   │
└───────────────────────────┬────────────────────────────┘
                            │ HTTPS / REST (JWT Bearer)
┌───────────────────────────▼────────────────────────────┐
│                    API Backend Tier                    │
│      Node.js 22 • Express 4.21 • TypeScript 5.6        │
│       Zod Validation Middleware • Global Error Handler │
└─────────────┬───────────────────────────┬──────────────┘
              │                           │
┌─────────────▼──────────────┐   ┌────────▼──────────────┐
│       Database Tier        │   │  AI Copilot Subsystem │
│     Prisma ORM 5.22        │   │ Controlled Tool Layer │
│ PostgreSQL (Supabase/Local)│   │ Sales/Stock/Profit/Mgt│
└────────────────────────────┘   └───────────────────────┘
```

### 7.2 Database Domain Model (Prisma Schema Source of Truth)
The schema defines exactly **10 normalized entities** with strict referential integrity and indexes:

1. **`User`:** User accounts with bcrypt hashed passwords and `Role` (`ADMIN`, `MANAGER`, `STAFF`).
2. **`Category`:** Unique product classification (e.g., Starters, Main, Hotpot, Beverages).
3. **`Product`:** Saleable items with `sellingPrice` (Decimal 12,2), status (`AVAILABLE`, `UNAVAILABLE`), category foreign key.
4. **`Ingredient`:** Raw materials tracked by unit, `currentPrice`, `stockQuantity` (Decimal 12,3), and `minimumStock` threshold.
5. **`Recipe`:** Bill of Materials (BOM) linking `Product` to `Ingredient` with required quantity and measurement unit.
6. **`Order`:** Dine-in and takeout tickets with unique `orderNumber`, `tableNumber`, `status` (`PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`), `paymentMethod` (`CASH`, `CARD`, `TRANSFER`, `OTHER`), and audit relationship to creating `User`.
7. **`OrderItem`:** Line items with snapshot unit price, quantity, and subtotal.
8. **`InventoryTransaction`:** Immutable ledger of stock movements (`IMPORT`, `EXPORT`, `ADJUSTMENT`) with timestamp, quantity, and user reference.
9. **`Expense`:** Operating expenses (rent, utilities, operational overhead) with title, amount, category, and date.
10. **`Supplier`:** Vendor master data (name, phone, email, address) linked to supply items.

---

## 8. Functional Requirements & User Stories

### 8.1 Authentication & Authorization
* **US-1.1:** As a user, I want to securely log in with my email and password so that I can access features permitted for my role.
  * *Acceptance Criteria:* Passwords verified using bcrypt; JWT token generated with 7-day expiration; role attached in payload; unauthenticated requests receive `401 Unauthorized`.
* **US-1.2:** As an Admin, I want to assign and change staff roles (`ADMIN`, `MANAGER`, `STAFF`) so that sensitive revenue and cost figures remain confidential.
  * *Acceptance Criteria:* Staff roles cannot view the `Analytics` tab or financial figures on `Dashboard`; API returns `403 Forbidden` for unauthorized route access.

### 8.2 Order Management & POS Execution
* **US-2.1:** As a floor staff member, I want to create a new table order in under 15 seconds so that I can serve guests rapidly during rush hours.
  * *Acceptance Criteria:* Intuitive menu item selection; quantity increment/decrement; special kitchen notes per item; instant calculation of subtotal and total.
* **US-2.2:** As kitchen/floor staff, I want to view and transition orders through real-time statuses (`PENDING` ➔ `CONFIRMED` ➔ `COMPLETED` or `CANCELLED`).
  * *Acceptance Criteria:* Orders filterable by status tabs; visual badges indicate state; canceling an order requires a mandatory cancellation reason.
* **US-2.3:** As a manager, when an order transitions to `COMPLETED`, I want ingredient inventory automatically decremented according to the product's recipe.
  * *Acceptance Criteria:* System executes an automated atomic transaction creating `InventoryTransaction` records with type `EXPORT` for each recipe ingredient.

### 8.3 Recipe-Level Inventory & Supplier Management
* **US-3.1:** As a manager, I want to define recipe ingredients and quantities for each product so that COGS can be calculated automatically.
  * *Acceptance Criteria:* Multi-ingredient support per dish; unit specification (g, kg, ml, unit); total calculated raw cost dynamically updated when ingredient purchase prices change.
* **US-3.2:** As a manager, I want to receive instant visual warnings when ingredients drop below `minimumStock`.
  * *Acceptance Criteria:* Inventory cards display yellow badge for `low_stock` and red badge for `out_of_stock`; low stock items surfaced directly on the Manager Dashboard.
* **US-3.3:** As a manager, I want to record stock intake from suppliers with purchase invoices.
  * *Acceptance Criteria:* Selecting supplier, entering ingredient quantity and purchase unit price; automatically updates ingredient `stockQuantity` and recalculates weighted average cost.

### 8.4 Financial Dashboard & Analytics
* **US-4.1:** As an owner, I want to see real-time Gross Revenue, COGS, Total Expenses, and Net Profit on my phone.
  * *Acceptance Criteria:* Dashboard aggregates today's sales and expenses; dynamic calculation: $\text{Net Profit} = \text{Revenue} - (\text{COGS} + \text{Expenses})$.
* **US-4.2:** As an owner, I want visual 7-day and 30-day trend charts for sales and expenses.
  * *Acceptance Criteria:* Native SVG `BarChart` renders daily sales distribution; `LineChart` displays revenue vs. expense curves with date filter selectors.

### 8.5 AI Restaurant Copilot
* **US-5.1:** As a manager or owner, I want to query the AI Copilot via natural language about my restaurant's performance.
  * *Acceptance Criteria:* Interactive chat interface (`mobile/app/ai-copilot.tsx`); predefined quick-prompt chips; AI calls backend tools (`inventory.tool`, `product.tool`, `profit.tool`, `sales.tool`) to fetch verified data before answering.
* **US-5.2:** As a developer/admin, I must guarantee the AI Copilot never hallucinates financial figures or executes raw arbitrary SQL.
  * *Acceptance Criteria:* LLM orchestration constrained to deterministic tool schemas with strict parameter validation; zero direct database connection credentials exposed to the model.

---

## 9. Scope, Dependencies & Phased Roadmap

```text
Phase 1: Foundation (COMPLETED)
├── Prisma 10-Entity Schema & Migrations
├── Express Backend Skeleton & Auth Foundations
├── Expo SDK 58 Mobile Router & Theme
└── UI Screen Skeletons & Mock Data

Phase 2: Core Operational CRUD & Real-Time Sync (CURRENT PHASE)
├── Full Backend CRUD APIs (Products, Orders, Inventory, Expenses)
├── Live Database Hookup on Mobile (React Query + Axios)
├── Real-Time Recipe-Based Inventory Deductions
└── Role-Based Route Guards (Admin vs. Manager vs. Staff)

Phase 3: Financial Engine & Governed AI Copilot
├── Weighted Average COGS Calculation Engine
├── Daily Shift Closing & Reconciliation Reporting
├── Gemini 2.0 Flash / Pro Integration via Controlled Backend Tools
└── Push Notifications for Critical Low-Stock Alerts

Phase 4: Customer Extension & Scale
├── QR Table Ordering Web Client (Customer-Facing)
├── Multi-terminal Kitchen Display System (KDS)
└── Payment Gateway & E-Invoice Integration (VietQR, VNPay, MoMo)
```

---

## 10. Open Questions, Technical Risks & Mitigation

| Category | Risk / Open Question | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Operational** | Staff forgets to enter ingredient waste or kitchen spills. | Medium | Provide a 1-tap "Waste Log" button in `inventory.tsx` logging `ADJUSTMENT` with zero penalty to encourage honest logging. |
| **Connectivity** | Unstable Wi-Fi/4G connection during peak dining hours. | High | Implement offline order caching via TanStack Query and SQLite local queue, automatically syncing with backend on reconnect. |
| **Inventory Integrity** | Concurrent order completion causing race conditions in stock decrement. | High | Use Prisma interactive database transactions (`prisma.$transaction`) with row-level locks on `Ingredient.stockQuantity`. |
| **AI Reliability** | AI provider latency or hallucination on margin recommendations. | Low | All numerical answers sourced strictly from deterministic backend calculation tools; LLM only formats the natural language response. |

---

## 11. PRD Quality & Completeness Checklist

- [x] **Problem statement:** Explicitly detailed with 3 validated operational evidence points from Vietnam F&B SMEs (§2).
- [x] **Target user and segment:** Categorized across `ADMIN`, `MANAGER`, and `STAFF` with frequency of pain and customer boundaries specified (§3).
- [x] **Goals and explicit non-goals:** Clearly bounded into in-scope v1 vs out-of-scope enterprise/consumer items (§6).
- [x] **User stories with acceptance criteria:** Complete user stories covering Auth, Orders, Recipes, Inventory, Analytics, and AI Copilot (§8).
- [x] **Success metric + threshold + measurement source:** North Star inventory variance (<2%) and secondary metrics tied to specific database models (§4).
- [x] **Alternatives considered / baseline:** Status-quo comparison across manual Excel, desktop POS, and enterprise ERP (§5).
- [x] **Scope, dependencies, and timeline:** 4-phase structured delivery roadmap from foundation to customer scale (§9).
- [x] **Open questions and risks:** Technical and operational risk matrix with concrete mitigation strategies (§10).
