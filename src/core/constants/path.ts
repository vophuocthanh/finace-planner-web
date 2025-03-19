const ROUTE_ADMIN = '/admin'

export const path = {
  // Public routes
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  blog: '/blog',
  profile: '/profile',

  // Admin routes
  admin: {
    dashboard: `${ROUTE_ADMIN}/dashboard`,
    personIncome: `${ROUTE_ADMIN}/person-income`,
    expense: `${ROUTE_ADMIN}/expense`,
    users: `${ROUTE_ADMIN}/users`,
    category: `${ROUTE_ADMIN}/category`,
    saving: `${ROUTE_ADMIN}/saving`,
    manageUser: `${ROUTE_ADMIN}/manage-user`
  }
}
