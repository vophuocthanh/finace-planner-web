import LayoutMain from '@/app/layout/LayoutMain'
import { path } from '@/core/constants/path'
import { getAccessTokenFromLS } from '@/core/shared/storage'
import PageNotFound from '@/pages/404/PageNotFound'
import Dashboard from '@/pages/dashboard/Dashboard'
import HomePage from '@/pages/home/HomePage'
import Login from '@/pages/login/Login'
import ManagerUser from '@/pages/manager-user/ManagerUser'
import PersonExpense from '@/pages/person-expense/PersonExpense'
import PersonIncome from '@/pages/person-income/PersonIncome'
import PersonSaving from '@/pages/person-saving/PersonSaving'
import Register from '@/pages/register/Register'
import VerifyEmail from '@/pages/verify-email/VerifyEmail'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'
import { Navigate, useLocation, useRoutes } from 'react-router-dom'

// Interface cho route
interface RouteConfig {
  path: string
  element: ReactNode
  requiresAuth?: boolean // Thêm thuộc tính để đánh dấu route cần auth
}

// Hàm kiểm tra token
const isAuthenticated = () => {
  // Giả sử token được lưu trong localStorage
  const token = getAccessTokenFromLS()
  return !!token // Trả về true nếu có token, false nếu không có
}

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to={path.login} replace />
}

export default function useRoutesElements() {
  const location = useLocation()

  const routes: RouteConfig[] = [
    { path: path.home, element: <HomePage /> },
    { path: path.login, element: <Login /> },
    { path: path.register, element: <Register /> },
    { path: path.verifyEmail, element: <VerifyEmail /> },
    {
      path: path.admin.dashboard,
      element: (
        <ProtectedRoute>
          <LayoutMain>
            <Dashboard />
          </LayoutMain>
        </ProtectedRoute>
      ),
      requiresAuth: true
    },
    {
      path: path.admin.personIncome,
      element: (
        <ProtectedRoute>
          <LayoutMain>
            <PersonIncome />
          </LayoutMain>
        </ProtectedRoute>
      ),
      requiresAuth: true
    },
    {
      path: path.admin.expense,
      element: (
        <ProtectedRoute>
          <LayoutMain>
            <PersonExpense />
          </LayoutMain>
        </ProtectedRoute>
      ),
      requiresAuth: true
    },
    {
      path: path.admin.saving,
      element: (
        <ProtectedRoute>
          <LayoutMain>
            <PersonSaving />
          </LayoutMain>
        </ProtectedRoute>
      ),
      requiresAuth: true
    },
    {
      path: path.admin.manageUser,
      element: (
        <ProtectedRoute>
          <LayoutMain>
            <ManagerUser />
          </LayoutMain>
        </ProtectedRoute>
      ),
      requiresAuth: true
    },
    { path: path.pageNotFound, element: <PageNotFound /> }
  ]

  const routeElements = useRoutes(routes, location)
  const isAuthPath = [path.login, path.register].includes(location.pathname)

  return (
    <>
      {isAuthPath ? (
        <AnimatePresence mode='wait'>
          <motion.div
            key={location.key}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', width: '100%' }}
          >
            {routeElements}
          </motion.div>
        </AnimatePresence>
      ) : (
        <div key={location.key}>{routeElements}</div>
      )}
    </>
  )
}
