
***

# Expense Tracker Frontend

A modern web app to track your income and expense transactions with filtering, charts, and full CRUD.  
Built with React, Redux Toolkit Query, shadcn/ui, TailwindCSS, and Zod.

***

## 🚀 Features

- Add, edit, delete transactions via modal dialog
- Filter by type, category, and date range
- Responsive pie & bar charts (Recharts)
- Real-time validation with Zod + react-hook-form
- Safe, fast API integration with Redux Toolkit Query
- UI: TailwindCSS + shadcn and Lucide icons
- **Prevents overdrafting:** Never allows you to record an expense greater than your available balance (no negative balance possible)
- Works with a compatible backend (see below)

***

## 🛠️ Getting Started

### 1. **Clone the repository**

```bash
git clone https://github.com/swami-hai-ham/assignment-frontend.git
cd assignment-frontend    
```

### 2. **Install dependencies**

```bash
npm install
```

### 3. **Start the development server**

```bash
npm run dev
```
- Visit [http://localhost:5173](http://localhost:5173)

### 4. **Build for Production**

```bash
npm run build
```

### 5. **Preview Production Build**

```bash
npm run preview
```

***

## ⚡ Usage

- Add transactions using the "Add Transaction" button.
- Use filters to sort/search by type, category, and date.
- Click the pencil icon in the table to edit, or trash icon to delete.
- Charts update as you filter or modify data.

***

## 🌐 Backend API Setup

- This frontend expects a backend running at `http://localhost:3000/api` (see `src/app/api/apiSlice.ts`).
- The backend endpoints should match:
  - `GET /api/transactions`
  - `POST /api/transactions`
  - `PUT /api/transactions/:id`
  - `DELETE /api/transactions/:id`
  - `GET /api/transactions/summary`
- (Use the provided backend folder or supply your own compatible API.)

***

## 📦 Tech Stack

- React 19 + TypeScript
- Redux Toolkit & RTK Query
- Tailwind CSS + shadcn/ui
- react-hook-form + zod (form validation)
- Recharts (charts)
- Vite (build tool)

***

## 📝 Scripts

- `npm run dev` – Start local dev server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Lint code with eslint

***

## 🏗️ Folder Structure

```
src/
  app/
    api/
      apiSlice.ts
    store.ts
  features/
    transactions/
      TransactionForm.tsx
      TransactionList.tsx
      TransactionFilters.tsx
  components/
    ui/
      (shadcn components)
  types/
    transaction.ts
```

***
