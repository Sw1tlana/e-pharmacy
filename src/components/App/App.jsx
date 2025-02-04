import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Loader from '../../shared/components/Loader/Loader';
import SharedLayout from '../SharedLayout/SharedLayout';
import { useDispatch } from 'react-redux';
import { refreshUser } from '../../redux/auth/operations';

import RestrictedRoute from '../../components/RestrictedRoute/RestrictedRoute';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const ShopPage = lazy(() => import('../../pages/ShopPage/ShopPage'));
const ProductPage = lazy(() => import('../../pages/ProductPage/ProductPage'));
const MedicineStorePage = lazy(() => import('../../pages/MedicineStorePage/MedicineStorePage'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const CartPage = lazy(() => import('../../pages/CartPage/CartPage'));
const FeaturePage = lazy(() => import('../../pages/FeaturePage/FeaturePage'));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  },[dispatch]);

  return (
    <>
<SharedLayout>
  <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/store" element={<MedicineStorePage/>}/>
        <Route path="/products" element={<ShopPage/>}/>
        <Route path="/products/:id" element={<CartPage/>} /> 
        <Route path="/cart" element={
          <PrivateRoute>
            <ProductPage/>
          </PrivateRoute>
        }/>
        <Route path="/feature" element={<FeaturePage/>}/>
        <Route path="/register" element={
          <RestrictedRoute>
            <RegisterPage/>
          </RestrictedRoute>
          }/>
        <Route path="/login" element={
          <RestrictedRoute>
            <LoginPage/>
          </RestrictedRoute>
        }/>
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
  </Suspense>
</SharedLayout>
    </>
  )
}

export default App;
