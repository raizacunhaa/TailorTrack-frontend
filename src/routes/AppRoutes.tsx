import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import LoginPage from '../pages/auth/index';
import RegisterPage from '../pages/auth/RegisterPage';
import RecoverPasswordPage from '../pages/auth/RecoverPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import HomePage from '../pages/home/index';
import ProductsPage from '../pages/management/products';
import CreateProductPage from '../pages/management/products/CreateProductPage';
import EditProductPage from '../pages/management/products/EditProductPage';
import CategoriesPage from '../pages/management/categories';
import CreateCategoryPage from '../pages/management/categories/CreateBrandPage';
import EditCategoryPage from '../pages/management/categories/EditBrandPage';

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
        <Route path={ROUTES.products.list} element={<ProductsPage />} />
        <Route path={ROUTES.products.create} element={<CreateProductPage />} />
        <Route path="/management/products/:id/edit" element={<EditProductPage />} />
        <Route path={ROUTES.categories.list} element={<CategoriesPage />} />
        <Route path={ROUTES.categories.create} element={<CreateCategoryPage />} />
        <Route path="/management/categories/:id/edit" element={<EditCategoryPage />} />
      </Route>

      <Route path="/" element={<Navigate to={ROUTES.auth.login} />} />
      <Route path="*" element={<Navigate to={ROUTES.auth.login} />} />
    </Routes>
  );
};

export default AppRoutes;
