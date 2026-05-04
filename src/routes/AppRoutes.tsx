import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/navigation';
import LoginPage from '../pages/auth/index';
import RegisterPage from '../pages/auth/RegisterPage';
import RecoverPasswordPage from '../pages/auth/RecoverPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.auth.login}>
        <Route index element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="recover" element={<RecoverPasswordPage />} />
        <Route path="reset/:token" element={<ResetPasswordPage />} />
      </Route>

      <Route path="/" element={<Navigate to={ROUTES.auth.login} />} />
      <Route path="*" element={<Navigate to={ROUTES.auth.login} />} />
    </Routes>
  );
};

export default AppRoutes;
