# ⚡ Agent & Lead Command Dashboard

A sleek, high-performance internal lead management dashboard built for Zenith Realty Partners. Designed to replace spreadsheet-based lead tracking with a clean, web-based data grid that allows admins to view, sort, filter, and perform bulk actions on thousands of real estate leads instantly.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
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

The **Agent & Lead Command** dashboard is an internal tool purpose-built for high-volume real estate agencies. It provides a centralized, scannable data view for managing property buyer leads with features like real-time filtering, multi-column sorting, bulk operations, and one-click CSV export.

### Key Design Principles

- **Speed first** — Data loads fast, filters update instantly, and the UI never blocks
- **Data visibility** — All critical lead information is visible at a glance with color-coded status tags and agent avatars
- **Bulk operations** — Select multiple leads and act on them in one click
- **Error resilience** — Graceful loading and error states ensure the tool never shows a blank white screen

---

## Tech Stack

| Technology            | Purpose                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------- |
| **React 18**          | UI framework with hooks-based architecture                                              |
| **TypeScript**        | Type safety with strict mode enabled (`strict: true`, `noUncheckedIndexedAccess: true`) |
| **Vite 6**            | Lightning-fast dev server and build tooling                                             |
| **Ant Design 5**      | Enterprise-grade UI component library (Table, Tags, Cards, Alerts)                      |
| **@ant-design/icons** | Iconography consistent with the AntD design language                                    |
| **Day.js**            | Lightweight date formatting and parsing                                                 |
| **Vanilla CSS**       | Custom styling with CSS variables, animations, and responsive breakpoints               |

---

## Features

### 📊 Data Table (Centerpiece)

- **6 columns:** Name, Email, Status, Assigned Agent, Value, Last Activity
- **60 mock lead records** with realistic data
- **Row selection** via checkboxes for bulk operations
- **Responsive horizontal scroll** for smaller viewports

### 🔃 Sorting

- **Value** — Sort by deal value (High → Low or Low → High)
- **Last Activity** — Sort by most recent activity (Newest → Oldest or vice versa)
- Sortable columns are indicated in the table headers with sort icons

### 🔍 Filtering & Search

- **Status filter** — Dropdown to show only `New`, `Contacted`, `Qualified`, or `Lost` leads
- **Agent filter** — Built into the table column header to filter by assigned agent
- **Global search** — Free-text search that filters by lead Name or Email in real time
- **Result count** — Live count of matching leads updates as you type/filter

### 📄 Pagination

- Default: **10 rows per page**
- Toggle to **20** or **50** rows per page via the page size selector
- Shows current range and total count (e.g., "1–10 of 60 leads")

### ⚡ Bulk Actions

- Select one or more rows using checkboxes
- A **Bulk Action Bar** slides in with:
  - **"Deactivate Leads"** — Logs selected lead IDs to the console
  - **"Mark as Contacted"** — Logs selected lead IDs to the console
  - **"Clear"** — Deselects all rows
- Smooth slide-down animation on appearance

### 📥 CSV Export

- Click **"Export Report"** to download the currently filtered view as a `.csv` file
- Exports only what's visible after applying search/status filters
- File: `zenith-leads-report.csv`

### ⏳ Loading State

- Simulates a **1.5-second API delay** on initial load
- Displays Ant Design's built-in **Table loading skeleton** during fetch
- Stat cards also show loading skeletons while data is being fetched

### ⚠️ Error Handling

- **"Simulate Error"** button forces an API failure for demo purposes
- Displays an Ant Design **Alert** component with:
  - Error message describing the failure
  - **"Retry"** button to refetch data
- The app never crashes — errors are caught and displayed gracefully

### 🎨 Design & UX Polish

- **Gradient header** with radial glow effects
- **4 live stat cards** — Total Leads, New Leads, Qualified, Portfolio Value
- **Color-coded status tags** — Blue (New), Green (Contacted), Gold (Qualified), Red (Lost)
- **Agent avatars** with unique colors per agent
- **Hover effects** on stat cards and table rows
- **Micro-animations** — checkbox pop, bulk bar slide-in, card hover lift
- **Custom scrollbar** styling
- **Responsive layout** — works on desktop and tablet
- **Inter font** from Google Fonts for modern typography

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or yarn/pnpm)

### Installation

```bash
# Navigate to the project directory
cd zenith-lead-dashboard

# Install dependencies
npm install
```

### Development

```bash
# Start the dev server (opens at http://localhost:3000)
npm run dev
```

### Production Build

```bash
# Type-check and build for production
npm run build

# Preview the production build
npm run preview
```

---

## Project Structure

```
zenith-lead-dashboard/
├── index.html                    # HTML entry point (Inter font, meta tags)
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript config (strict mode)
├── vite.config.ts                # Vite configuration
│
└── src/
    ├── main.tsx                  # React entry + AntD ConfigProvider + theme
    ├── App.tsx                   # Main app shell (state management, composition)
    ├── App.css                   # Global styles (gradient header, animations)
    ├── vite-env.d.ts             # Vite type declarations
    │
    ├── components/
    │   ├── DashboardHeader.tsx   # Header section with title + 4 stat cards
    │   ├── FilterBar.tsx         # Search input, status dropdown, export btn
    │   ├── BulkActionBar.tsx     # Conditional bar for bulk lead actions
    │   └── LeadTable.tsx         # AntD Table with all columns and features
    │
    ├── data/
    │   └── data.ts               # Lead interface + 60 mock records
    │
    ├── hooks/
    │   └── useLeads.ts           # Custom hook for async data fetching
    │
    └── utils/
        └── exportCsv.ts          # CSV generation and download utility
```

---

## Component Architecture

### `<App />` — Main Shell

The root component that owns all application state and composes the child components:

- **State:** `searchText`, `statusFilter`, `selectedRowKeys`
- **Data:** Uses the `useLeads()` custom hook for async data
- **Filtering:** Applies search + status filter via `useMemo` for performance
- **Error display:** Renders AntD `Alert` when the hook returns an error

### `<DashboardHeader />` — Stats Overview

| Prop      | Type      | Description                                      |
| --------- | --------- | ------------------------------------------------ |
| `leads`   | `Lead[]`  | Filtered leads array (stats update with filters) |
| `loading` | `boolean` | Shows skeleton state on stat cards               |

Displays 4 stat cards:

- **Total Leads** — Count of all currently filtered leads
- **New Leads** — Count of leads with status `"New"`
- **Qualified** — Count of leads with status `"Qualified"`
- **Portfolio Value** — Sum of all lead values, formatted as USD

### `<FilterBar />` — Search & Filter Controls

| Prop              | Type                      | Description                              |
| ----------------- | ------------------------- | ---------------------------------------- |
| `searchText`      | `string`                  | Current search input value               |
| `onSearchChange`  | `(value: string) => void` | Handler for search input changes         |
| `statusFilter`    | `string`                  | Current status filter value              |
| `onStatusChange`  | `(value: string) => void` | Handler for status dropdown changes      |
| `onExport`        | `() => void`              | Triggers CSV export                      |
| `onSimulateError` | `() => void`              | Triggers error simulation                |
| `resultCount`     | `number`                  | Number of leads matching current filters |

### `<BulkActionBar />` — Bulk Operations

| Prop               | Type         | Description                          |
| ------------------ | ------------ | ------------------------------------ |
| `selectedCount`    | `number`     | Number of selected rows              |
| `selectedIds`      | `string[]`   | Array of selected lead IDs           |
| `onDeactivate`     | `() => void` | Handler for deactivation action      |
| `onMarkContacted`  | `() => void` | Handler for mark-as-contacted action |
| `onClearSelection` | `() => void` | Clears all selected rows             |

Renders `null` when no rows are selected. Animates in with a slide-down effect when rows are selected.

### `<LeadTable />` — Data Grid

| Prop                | Type                    | Description                     |
| ------------------- | ----------------------- | ------------------------------- |
| `leads`             | `Lead[]`                | Filtered leads to display       |
| `loading`           | `boolean`               | Shows loading skeleton in table |
| `selectedRowKeys`   | `Key[]`                 | Currently selected row keys     |
| `onSelectionChange` | `(keys: Key[]) => void` | Handler for selection changes   |

The centerpiece of the application. Built with AntD's `<Table />` component featuring:

- Fixed "Name" column on horizontal scroll
- Inline column filters for Status and Assigned Agent
- Sortable Value and Last Activity columns
- Configurable pagination (10/20/50 per page)

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

| Status    | Color | AntD Tag              |
| --------- | ----- | --------------------- |
| New       | Blue  | `<Tag color="blue">`  |
| Contacted | Green | `<Tag color="green">` |
| Qualified | Gold  | `<Tag color="gold">`  |
| Lost      | Red   | `<Tag color="red">`   |

### Assigned Agents

| Agent           | Avatar Color       |
| --------------- | ------------------ |
| Sarah Jenkins   | `#4A90D9` (Blue)   |
| Mike Ross       | `#389E6E` (Green)  |
| Jessica Pearson | `#9B59B6` (Purple) |
| Harvey Specter  | `#D4A843` (Gold)   |

---

## Usage Guide

### Searching for Leads

Type a name or email into the search bar. The table filters in real time — no need to press Enter.

### Filtering by Status

Use the "All Statuses" dropdown to show only leads with a specific status. The stat cards and result count update immediately.

### Sorting the Table

Click the **Value** or **Last Activity** column headers to toggle between ascending, descending, and default sort orders.

### Selecting Leads for Bulk Actions

1. Check the boxes next to the rows you want to act on
2. The **Bulk Action Bar** appears above the table
3. Click **"Deactivate Leads"** or **"Mark as Contacted"**
4. The selected lead IDs are logged to the browser console
5. Click **"Clear"** to deselect all rows

### Exporting to CSV

1. Apply any desired filters/search terms
2. Click the **"Export Report"** button
3. A `zenith-leads-report.csv` file downloads automatically
4. The CSV contains only the leads matching your current filters

### Testing Error Handling

1. Click the **"Simulate Error"** button (red text in the filter bar)
2. An error alert appears with a description of the failure
3. Click **"Retry"** to reload the data

---

## Acceptance Criteria

| #   | Criteria                                               | Status                                                          |
| --- | ------------------------------------------------------ | --------------------------------------------------------------- |
| 1   | Project runs without TypeScript errors                 | ✅ `tsc --noEmit` passes with strict mode                       |
| 2   | Ant Design Table is the centerpiece of the UI          | ✅ Full-featured AntD `<Table />` component                     |
| 3   | Filtering by "Status" updates the table immediately    | ✅ Instant filtering via `useMemo`                              |
| 4   | Selecting 5 rows and clicking "Export" downloads a CSV | ✅ CSV export respects current filter state                     |
| 5   | Code is separated into components                      | ✅ `DashboardHeader`, `FilterBar`, `BulkActionBar`, `LeadTable` |
| 6   | Loading state shown during data fetch                  | ✅ 1.5s simulated delay with AntD skeleton                      |
| 7   | Error state handled gracefully                         | ✅ AntD Alert with Retry button                                 |
| 8   | Sorting by Value and Last Activity                     | ✅ Both columns sortable                                        |
| 9   | Pagination with 10/20/50 rows per page                 | ✅ Configurable page sizes                                      |
| 10  | Bulk actions (Deactivate, Mark Contacted)              | ✅ Console logs selected IDs                                    |

---

## Configuration

### AntD Theme

The theme is configured in `src/main.tsx` via AntD's `<ConfigProvider>`:

| Token          | Value     | Purpose                             |
| -------------- | --------- | ----------------------------------- |
| `colorPrimary` | `#1B3A5C` | Deep navy — primary brand color     |
| `colorSuccess` | `#389E6E` | Green — contacted/qualified accents |
| `colorWarning` | `#D4A843` | Gold — qualified status             |
| `colorError`   | `#CF4A4A` | Red — lost status, error states     |
| `colorInfo`    | `#4A90D9` | Blue — new status, info accents     |
| `borderRadius` | `8px`     | Consistent rounded corners          |
| `fontFamily`   | `Inter`   | Modern sans-serif typography        |

### Vite Dev Server

Configured in `vite.config.ts`:

- **Port:** `3000` (default)
- **Auto-open:** `true`

---

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start Vite development server        |
| `npm run build`   | TypeScript check + production build  |
| `npm run preview` | Preview the production build locally |

---

## License

This project is an internal tool built for Zenith Realty Partners. All rights reserved.
