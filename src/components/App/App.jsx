import { lazy } from 'react';
import { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Loader from '../../shared/components/Loader/Loader';
import SharedLayout from '../SharedLayout/SharedLayout';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MedicinePage = lazy(() => import('../../pages/MedicinePage/MedicinePage'));
const ProductPage = lazy(() => import('../../pages/ProductPage/ProductPage'));
const MedicineStorePage = lazy(() => import('../../pages/MedicineStorePage/MedicineStorePage'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));

function App() {
  
  return (
    <>
<SharedLayout>
  <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/store" element={<MedicineStorePage/>}/>
        <Route path="/products" element={<MedicinePage/>}/>
        <Route path="/products/:id" element={<ProductPage />} /> 
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
  </Suspense>
</SharedLayout>
    </>
  )
}

export default App
