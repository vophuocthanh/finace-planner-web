import { IconDashboard, IconExpense, IconPerson, IconSavings } from '@/assets/icons'
import IconPersonIncome from '@/assets/icons/icon-person-income'
import { path } from '@/core/constants/path'
import { TSidebarLinks } from '@/models/types/general.type'

export const sidebarLinks: TSidebarLinks[] = [
  {
    title: 'Dashboard',
    icon: <IconDashboard />,
    path: path.admin.dashboard
  },
  {
    title: 'Person Income',
    icon: <IconPersonIncome />,
    path: path.admin.personIncome
  },
  {
    title: 'Person Expense',
    icon: <IconExpense />,
    path: path.admin.expense
  },
  {
    title: 'Person Saving',
    icon: <IconSavings />,
    path: path.admin.saving
  },
  {
    title: 'Manage User',
    icon: <IconPerson />,
    path: path.admin.manageUser
  }
]
