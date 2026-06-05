export const ROUTES = {
  auth: {
    login: '/auth',
    register: '/auth/register',
    recover: '/auth/recover',
    reset: (token: string) => `/reset?token=${encodeURIComponent(token)}`,
  },
  home: '/home',
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
