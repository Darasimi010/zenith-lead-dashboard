# ⚡ Zenith Lead Dashboard

> A high-performance internal lead management and analytics dashboard for Zenith Realty Partners — built with React, TypeScript, Ant Design, and Recharts.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5-0170FE?logo=antdesign&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2-FF6384?logo=chartdotjs&logoColor=white)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
  - [Analytics Dashboard](#-analytics-dashboard)
  - [Data Table](#-data-table)
  - [Filtering & Search](#-filtering--search)
  - [Bulk Actions & Export](#-bulk-actions--export)
  - [Loading & Error States](#-loading--error-states)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Component Architecture](#component-architecture)
- [Data Model](#data-model)
- [Usage Guide](#usage-guide)
- [Acceptance Criteria](#acceptance-criteria)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [License](#license)

---

## Overview

The **Zenith Lead Dashboard** is an internal tool purpose-built for high-volume real estate agencies. It provides a centralized, scannable view for managing property buyer leads — combining **executive-level analytics** with a **granular data grid** in a single interface.

### Key Design Principles

| Principle              | How It's Applied                                                         |
| ---------------------- | ------------------------------------------------------------------------ |
| **Speed first**        | Data loads fast, filters update instantly, UI never blocks               |
| **30-second snapshot** | Three analytics charts let executives assess pipeline health at a glance |
| **Data visibility**    | Color-coded status tags, agent avatars, and currency formatting          |
| **Bulk operations**    | Select multiple leads and act on them in one click                       |
| **Error resilience**   | Graceful loading and error states — no blank white screens               |

---

## Tech Stack

| Technology            | Purpose                                                               |
| --------------------- | --------------------------------------------------------------------- |
| **React 18**          | UI framework with hooks-based architecture                            |
| **TypeScript 5.6**    | Strict type safety (`strict: true`, `noUncheckedIndexedAccess: true`) |
| **Vite 6**            | Lightning-fast dev server and build tooling                           |
| **Ant Design 5**      | Enterprise-grade UI — Table, Cards, Grid, Alerts, Skeletons           |
| **Recharts 2**        | Lightweight charting library — Pie, Bar, and Area charts              |
| **@ant-design/icons** | Iconography consistent with the AntD design language                  |
| **Day.js**            | Lightweight date formatting and parsing                               |
| **Vanilla CSS**       | Custom styling with animations and responsive breakpoints             |

---

## Features

### 📊 Analytics Dashboard

Three Recharts-powered widgets sit above the data table, giving executives a **30-second snapshot** of business health. All chart data is derived from the same lead dataset — no separate fake data.

#### 🎯 Widget A: Pipeline Health

- **Chart type:** Donut (Pie with inner radius)
- **Data:** Lead count by status (`New`, `Contacted`, `Qualified`, `Lost`)
- **Colors:** Consistent with table status tags — Blue, Green, Gold, Red
- **Tooltip:** Hover any slice to see the exact count (e.g., "Qualified: 12 leads")

#### 🏆 Widget B: Agent Performance

- **Chart type:** Vertical Bar Chart
- **Data:** Total lead value (`$`) summed per assigned agent
- **Sorting:** Highest value agent on the left, lowest on the right
- **Y-Axis:** Currency format (`$2.5M`, `$800K`)
- **Bar colors:** Match existing agent avatar colors

#### 📈 Widget C: Lead Velocity

- **Chart type:** Area Chart with gradient fill
- **Data:** Number of lead interactions grouped by day
- **Curve:** Smooth `monotone` interpolation
- **Visual:** Activity dots with hover-activated tooltip

> **Responsive:** All charts use Recharts `ResponsiveContainer` and resize gracefully on any screen size. During the loading state, charts display Ant Design skeleton placeholders.

---

### 📋 Data Table

The centerpiece of the application for admin-level data work:

- **6 columns:** Name, Email, Status, Assigned Agent, Value, Last Activity
- **60 mock lead records** with realistic real estate data
- **Row selection** via checkboxes for bulk operations
- **Responsive horizontal scroll** for smaller viewports

#### Sorting

- **Value** — Sort by deal value (High → Low or Low → High)
- **Last Activity** — Sort by most recent activity date
- Sortable columns show interactive sort icons in the table header

#### Pagination

- Default: **10 rows per page**
- Configurable: **20** or **50** rows per page
- Displays range + total (e.g., "1–10 of 60 leads")

---

### 🔍 Filtering & Search

| Control                 | Behavior                                                      |
| ----------------------- | ------------------------------------------------------------- |
| **Global search**       | Free-text filter by lead Name or Email — updates in real time |
| **Status dropdown**     | Show only `New`, `Contacted`, `Qualified`, or `Lost` leads    |
| **Agent column filter** | Built into the table header — filter by assigned agent        |
| **Result count**        | Live count of matching leads updates as you type/filter       |

> **Chart sync:** Analytics charts update in real time as you apply filters, so the dashboard always reflects the visible data.

---

### ⚡ Bulk Actions & Export

**Bulk Actions:**

1. Select one or more rows using checkboxes
2. The **Bulk Action Bar** slides in with a smooth animation
3. Actions: **Deactivate Leads** · **Mark as Contacted** · **Clear Selection**

**CSV Export:**

- Click **"Export Report"** to download the current filtered view as `zenith-leads-report.csv`
- Exports only the leads matching your active filters

---

### ⏳ Loading & Error States

| State       | Behavior                                                                                                         |
| ----------- | ---------------------------------------------------------------------------------------------------------------- |
| **Loading** | 1.5s simulated API delay. Table shows AntD skeleton, stat cards and chart cards show skeleton placeholders       |
| **Error**   | "Simulate Error" button triggers a mock 500 error. AntD Alert appears with a Retry button. The app never crashes |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or yarn / pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/zenith-lead-dashboard.git
cd zenith-lead-dashboard

# Install dependencies
npm install
```

### Development

```bash
# Start the dev server (opens at http://localhost:5173)
npm run dev
```

### Production Build

```bash
# Type-check + build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## Project Structure

```
zenith-lead-dashboard/
├── index.html                          # HTML entry point (Inter font, meta tags)
├── package.json                        # Dependencies and scripts
├── tsconfig.json                       # TypeScript config (strict mode)
├── vite.config.ts                      # Vite configuration
│
└── src/
    ├── main.tsx                        # React entry + AntD ConfigProvider theme
    ├── App.tsx                         # Main app shell (state, composition)
    ├── App.css                         # Global styles (animations, responsive)
    ├── vite-env.d.ts                   # Vite type declarations
    │
    ├── components/
    │   ├── DashboardHeader.tsx         # Gradient header + 4 stat cards
    │   ├── FilterBar.tsx              # Search input, status dropdown, export btn
    │   ├── BulkActionBar.tsx          # Conditional bar for bulk lead actions
    │   ├── LeadTable.tsx              # AntD Table with all columns and features
    │   │
    │   └── Dashboard/                 # ← Analytics Dashboard (NEW)
    │       ├── DashboardMetrics.tsx   # Container — Row/Col grid layout
    │       ├── StatusChart.tsx        # 🎯 Donut chart — leads by status
    │       ├── AgentLeaderboard.tsx   # 🏆 Bar chart — value by agent
    │       └── ActivityTimeline.tsx   # 📈 Area chart — daily activity
    │
    ├── data/
    │   └── data.ts                    # Lead interface + 60 mock records
    │
    ├── hooks/
    │   └── useLeads.ts                # Custom hook for async data fetching
    │
    └── utils/
        ├── exportCsv.ts               # CSV generation and download utility
        └── chartTransformers.ts       # Data aggregation for Recharts
```

---

## Component Architecture

### `<App />` — Main Shell

The root component. Owns all application state and composes every child:

- **State:** `searchText`, `statusFilter`, `selectedRowKeys`
- **Data:** `useLeads()` custom hook with loading / error simulation
- **Filtering:** `useMemo`-based search + status filter for zero-cost re-renders
- **Layout:** Header → **DashboardMetrics** → FilterBar → BulkActionBar → LeadTable

### `<DashboardMetrics />` — Analytics Container

| Prop      | Type      | Description                                 |
| --------- | --------- | ------------------------------------------- |
| `leads`   | `Lead[]`  | Filtered leads (charts update with filters) |
| `loading` | `boolean` | Shows skeleton state on all chart cards     |

Renders a responsive 3-column grid of chart widgets using Ant Design `Row` / `Col`. Stacks vertically on mobile (`xs=24`, `lg=8`).

### `<StatusChart />` — Pipeline Health Donut

Recharts `PieChart` with `innerRadius` for the donut effect. Four slices colored to match Ant Design tag presets. Custom tooltip shows lead count per status.

### `<AgentLeaderboard />` — Agent Performance Bar Chart

Recharts `BarChart` with agent-specific bar colors. Y-axis formatted as currency (`$2.5M`). X-axis shows first names. Data sorted descending by total value.

### `<ActivityTimeline />` — Lead Velocity Area Chart

Recharts `AreaChart` with monotone curve and gradient fill. Groups `lastActivity` dates by day and counts interactions. Smooth dots with active-dot hover effect.

### `<DashboardHeader />` — Stats Overview

| Prop      | Type      | Description                                |
| --------- | --------- | ------------------------------------------ |
| `leads`   | `Lead[]`  | Filtered leads (stats update with filters) |
| `loading` | `boolean` | Shows skeleton state on stat cards         |

Displays 4 stat cards: **Total Leads**, **New Leads**, **Qualified**, **Portfolio Value**.

### `<FilterBar />` — Search & Filter Controls

| Prop              | Type                      | Description               |
| ----------------- | ------------------------- | ------------------------- |
| `searchText`      | `string`                  | Current search input      |
| `onSearchChange`  | `(value: string) => void` | Search change handler     |
| `statusFilter`    | `string`                  | Active status filter      |
| `onStatusChange`  | `(value: string) => void` | Status dropdown handler   |
| `onExport`        | `() => void`              | Triggers CSV export       |
| `onSimulateError` | `() => void`              | Triggers error simulation |
| `resultCount`     | `number`                  | Matching lead count       |

### `<BulkActionBar />` — Bulk Operations

Renders `null` when no rows are selected. Slides in with animation when rows are checked.

### `<LeadTable />` — Data Grid

AntD `<Table />` with fixed "Name" column, inline column filters, sortable columns, and configurable pagination.

---

## Data Model

```typescript
interface Lead {
  id: string;
  name: string;
  email: string;
  status: "New" | "Contacted" | "Qualified" | "Lost";
  value: number; // e.g., 500000
  lastActivity: string; // ISO 8601 date string
  assignedAgent: string;
}
```

### Status Color Mapping

| Status    | Color | Hex       | AntD Tag              |
| --------- | ----- | --------- | --------------------- |
| New       | Blue  | `#1677FF` | `<Tag color="blue">`  |
| Contacted | Green | `#52C41A` | `<Tag color="green">` |
| Qualified | Gold  | `#FAAD14` | `<Tag color="gold">`  |
| Lost      | Red   | `#FF4D4F` | `<Tag color="red">`   |

### Assigned Agents

| Agent           | Avatar Color       |
| --------------- | ------------------ |
| Sarah Jenkins   | `#4A90D9` (Blue)   |
| Mike Ross       | `#389E6E` (Green)  |
| Jessica Pearson | `#9B59B6` (Purple) |
| Harvey Specter  | `#D4A843` (Gold)   |

### Chart Data Shapes

The `chartTransformers.ts` utility provides three reducer functions:

```typescript
// Pipeline Health (donut)
getStatusData(leads)     → [{ name: "New", value: 15, fill: "#1677FF" }, ...]

// Agent Performance (bar)
getAgentValueData(leads) → [{ name: "Harvey Specter", totalValue: 9255000, fill: "#D4A843" }, ...]

// Lead Velocity (area)
getActivityData(leads)   → [{ date: "2024-02-09", count: 4 }, ...]
```

---

## Usage Guide

### Viewing the Analytics Dashboard

The three chart widgets load automatically above the data table. Hover any chart element (slice, bar, or data point) to see detailed tooltips. Charts update in real time as you apply filters.

### Searching for Leads

Type a name or email into the search bar. The table and charts filter in real time — no need to press Enter.

### Filtering by Status

Use the "All Statuses" dropdown to show only leads with a specific status. Stat cards, charts, and the result count all update immediately.

### Sorting the Table

Click the **Value** or **Last Activity** column headers to toggle between ascending, descending, and default sort orders.

### Selecting Leads for Bulk Actions

1. Check the boxes next to the rows you want to act on
2. The **Bulk Action Bar** appears above the table
3. Click **"Deactivate Leads"** or **"Mark as Contacted"**
4. Click **"Clear"** to deselect all rows

### Exporting to CSV

1. Apply any desired filters / search terms
2. Click the **"Export Report"** button
3. A `zenith-leads-report.csv` file downloads automatically

### Testing Error Handling

1. Click the **"Simulate Error"** button (red text in the filter bar)
2. An error alert appears with a description of the failure
3. Click **"Retry"** to reload the data

---

## Acceptance Criteria

| #   | Criteria                                               | Status                                        |
| --- | ------------------------------------------------------ | --------------------------------------------- |
| 1   | Project runs without TypeScript errors                 | ✅ `tsc -b` passes with strict mode           |
| 2   | Ant Design Table is the centerpiece of the UI          | ✅ Full-featured AntD `<Table />`             |
| 3   | Filtering by Status updates table + charts immediately | ✅ Instant filtering via `useMemo`            |
| 4   | Selecting rows and clicking Export downloads CSV       | ✅ Respects current filter state              |
| 5   | Code is separated into components                      | ✅ 8 components across 2 directories          |
| 6   | Loading state shown during data fetch                  | ✅ Skeletons on table, stat cards, and charts |
| 7   | Error state handled gracefully                         | ✅ AntD Alert with Retry button               |
| 8   | Sorting by Value and Last Activity                     | ✅ Both columns sortable                      |
| 9   | Pagination with 10/20/50 rows per page                 | ✅ Configurable page sizes                    |
| 10  | Bulk actions (Deactivate, Mark Contacted)              | ✅ Animated bar with console logging          |
| 11  | Analytics Dashboard with 3 Recharts widgets            | ✅ Donut, Bar, and Area charts                |
| 12  | Recharts `ResponsiveContainer` used for responsiveness | ✅ Charts resize on any viewport              |
| 13  | Colors consistent between charts and table tags        | ✅ Same hex values throughout                 |
| 14  | Tooltips appear on hover for all charts                | ✅ Custom styled tooltips                     |

---

## Configuration

### AntD Theme

Configured in `src/main.tsx` via `<ConfigProvider>`:

| Token          | Value     | Purpose                               |
| -------------- | --------- | ------------------------------------- |
| `colorPrimary` | `#1B3A5C` | Deep navy — primary brand color       |
| `colorSuccess` | `#389E6E` | Green — contacted / qualified accents |
| `colorWarning` | `#D4A843` | Gold — qualified status               |
| `colorError`   | `#CF4A4A` | Red — lost status, error states       |
| `colorInfo`    | `#4A90D9` | Blue — new status, info accents       |
| `borderRadius` | `8px`     | Consistent rounded corners            |
| `fontFamily`   | `Inter`   | Modern sans-serif typography          |

---

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start Vite development server        |
| `npm run build`   | TypeScript check + production build  |
| `npm run preview` | Preview the production build locally |

---

## License

This project is built with love.
