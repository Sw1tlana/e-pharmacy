
// import Home from '../Home/Home.jsx';
// import RegisterForm from '../RegisterForm/RegisterForm.jsx';
// import LoginForm from '../LoginForm/LoginForm.jsx';
// import ModalRegisterForm from '../ModalRegisterform/ModalRegisterForm.jsx';
// import ModalLoginForm from '../ModalLoginForm/ModalLoginForm.jsx';
// import Cart from '../Cart/Cart.jsx';
import Footer from '../Footer/Footer.jsx';
// import AddMedicines from '../AddMedicines/AddMedicines.jsx';
// import PromoBanners from '../PromoBanners/PromoBanners.jsx';
// import MedicineSearch from '../MedicineSearch/MedicineSearch.jsx';

import { lazy, useEffect } from 'react';
import { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from '../Header/Header';


import Loader from '../../shared/components/Loader/Loader';
import SharedLayout from '../SharedLayout/SharedLayout';
import MedicineSearch from '../MedicineSearch/MedicineSearch';

function App() {
  const isWhiteBackground = false;
  return (
    <>
    <Header isWhiteBackground={isWhiteBackground}/>
    <MedicineSearch/>
    <Footer />


     {/* <Home/>
     <RegisterForm/>
     <LoginForm/>
     <ModalRegisterForm/>
     <ModalLoginForm />
     <Cart/>
     <AddMedicines/>
     <PromoBanners/>
     <MedicineSearch/>
     <Footer /> */}
    </>
  )
}

export default App
