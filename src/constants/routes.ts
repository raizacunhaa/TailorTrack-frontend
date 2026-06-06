export const ROUTES = {
  auth: {
    login: '/auth',
    register: '/auth/register',
    recover: '/auth/recover',
    reset: (token: string) => `/reset?token=${encodeURIComponent(token)}`,
  },
  home: '/home',
  management: '/management',
  products: {
    list: '/management/products',
    create: '/management/products/create',
    edit: (id: string | number) => `/management/products/${id}/edit`,
  },
  categories: {
    list: '/management/categories',
    create: '/management/categories/create',
    edit: (id: string | number) => `/management/categories/${id}/edit`,
  },
  brands: {
    list: '/management/categories',
    create: '/management/categories/create',
    edit: (id: string | number) => `/management/categories/${id}/edit`,
  },
} as const;

export const API_ROUTES = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    recover: '/auth/recover-password',
    reset: '/auth/reset-password',
    me: '/auth/me',
  },
} as const;
