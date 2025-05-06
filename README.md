<h1 align="center">Finance Planner 💰💸</h1>

<div align="center">
  <p>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    </a>
    <a href="https://react.dev/" target="_blank">
      <img src="https://img.shields.io/badge/-React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    </a>
    <a href="https://tailwindcss.com/" target="_blank">
      <img src="https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    </a>
  </p>
  <p>
    <a href="https://ui.shadcn.com/" target="_blank">
      <img src="https://img.shields.io/badge/-Shadcn_UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="Shadcn UI" />
    </a>
    <a href="https://vitejs.dev/" target="_blank">
      <img src="https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    </a>
    <a href="https://zustand-demo.pmnd.rs/" target="_blank">
      <img src="https://img.shields.io/badge/-Zustand-593D88?style=for-the-badge&logo=react&logoColor=white" alt="Zustand" />
    </a>
  </p>
  <p>
    <a href="https://reactrouter.com/" target="_blank">
      <img src="https://img.shields.io/badge/-React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" />
    </a>
    <a href="https://tanstack.com/query/latest" target="_blank">
      <img src="https://img.shields.io/badge/-React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="React Query" />
    </a>
    <a href="https://react-hook-form.com/" target="_blank">
      <img src="https://img.shields.io/badge/-React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white" alt="React Hook Form" />
    </a>
  </p>
  <p>
    <a href="https://zod.dev/" target="_blank">
      <img src="https://img.shields.io/badge/-Zod-3068B7?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
    </a>
    <a href="https://www.i18next.com/" target="_blank">
      <img src="https://img.shields.io/badge/-i18next-26A69A?style=for-the-badge&logo=i18next&logoColor=white" alt="i18next" />
    </a>
    <a href="https://recharts.org/" target="_blank">
      <img src="https://img.shields.io/badge/-Recharts-22B5BF?style=for-the-badge&logo=chart.js&logoColor=white" alt="Recharts" />
    </a>
  </p>
</div>

## 📋 Project Overview

Finance Planner is a comprehensive personal finance management web application that helps users track their income, expenses, and savings. The application provides intuitive dashboards and visualizations to give users insights into their financial health and help them make informed financial decisions.

## ✨ Key Features

- **User Authentication** - Secure login and registration system
- **Dashboard** - Interactive dashboard with financial overview and key metrics
- **Income Management** - Track and categorize all sources of income
- **Expense Tracking** - Record and categorize expenses with detailed history
- **Savings Goals** - Set and track progress towards financial goals
- **User Management** - Admin panel for managing user accounts
- **Data Visualization** - Charts and graphs for financial analysis using Recharts
- **Responsive Design** - Fully responsive UI that works on mobile and desktop
- **Multi-language Support** - Internationalization with i18next
- **Dark/Light Mode** - Toggle between dark and light themes
- **Form Validation** - Robust form handling with React Hook Form and Zod

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **TypeScript** - Type checking
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - UI component library based on Radix UI
- **React Router DOM** - Routing
- **React Query** - Data fetching and caching
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **i18next** - Internationalization
- **Recharts** - Charting library
- **Framer Motion** - Animation
- **React Toastify** - Toast notifications

### Development Tools

- **Vite** - Build tool and dev server
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **TypeScript ESLint** - TypeScript linting

## 📁 Project Structure

```
finance-planner-web/
├── src/                    # Source code
│   ├── app/                # App configuration
│   ├── assets/             # Static assets
│   ├── components/         # Reusable UI components
│   ├── configs/            # Configuration files
│   ├── core/               # Core utilities and helpers
│   ├── hooks/              # Custom React hooks
│   ├── locales/            # Internationalization resources
│   ├── models/             # TypeScript interfaces and types
│   ├── pages/              # Application pages
│   │   ├── 404/            # Not found page
│   │   ├── dashboard/      # Dashboard page
│   │   ├── home/           # Home page
│   │   ├── login/          # Login page
│   │   ├── manager-user/   # User management page
│   │   ├── person-expense/ # Expense tracking page
│   │   ├── person-income/  # Income tracking page
│   │   ├── person-saving/  # Savings page
│   │   └── register/       # Registration page
│   ├── App.tsx             # Main application component
│   ├── index.css           # Global styles
│   └── main.tsx            # Application entry point
├── public/                 # Public assets
├── .husky/                 # Git hooks
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- Yarn package manager

### Installation

1. Clone the repository:

```shell
git clone https://github.com/your-username/finance-planner-web.git
cd finance-planner-web
```

2. Install dependencies:

```shell
yarn install
```

3. Set up environment variables:
   Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
```

4. Start the development server:

```shell
yarn dev
```

5. Open [http://localhost:4000](http://localhost:4000) in your browser.

## 🔧 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn check:type` - Check TypeScript types
- `yarn check:all` - Run all checks (prettier, lint, type)

## 🌐 Deployment

The application is configured for deployment on Vercel with the included `vercel.json` configuration file.

---

Made with ♥ by [ThanhDev](https://www.facebook.com/thanh.vophuoc.50)
