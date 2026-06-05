import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import LoginPage from '../pages/auth/index';
import RegisterPage from '../pages/auth/RegisterPage';
import RecoverPasswordPage from '../pages/auth/RecoverPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import HomePage from '../pages/home/index';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.auth.login}>
        <Route index element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="recover" element={<RecoverPasswordPage />} />
      </Route>

      <Route path="reset" element={<ResetPasswordPage />} />
      <Route path="resetPw" element={<ResetPasswordPage />} />
      <Route path="auth/reset/:token" element={<ResetPasswordPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.home} element={<HomePage />} />
      </Route>

      <Route path="/" element={<Navigate to={ROUTES.auth.login} />} />
      <Route path="*" element={<Navigate to={ROUTES.auth.login} />} />
    </Routes>
  );
};

export default AppRoutes;
