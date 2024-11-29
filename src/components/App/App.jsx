
import Home from '../Home/Home.jsx';
import RegisterForm from '../RegisterForm/RegisterForm.jsx';
import LoginForm from '../LoginForm/LoginForm.jsx';
import ModalRegisterForm from '../ModalRegisterform/ModalRegisterForm.jsx';
import ModalLoginForm from '../ModalLoginForm/ModalLoginForm.jsx';
import Cart from '../Cart/Cart.jsx';
import Footer from '../Footer/Footer.jsx';
import AddMedicines from '../AddMedicines/AddMedicines.jsx';
import PromoBanners from '../PromoBanners/PromoBanners.jsx';
import MedicineSearch from '../MedicineSearch/MedicineSearch.jsx';

function App() {

  return (
    <>
     <Home/>
     <RegisterForm/>
     <LoginForm/>
     <ModalRegisterForm/>
     <ModalLoginForm />
     <Cart/>
     <AddMedicines/>
     <PromoBanners/>
     <MedicineSearch/>
     <Footer />
    </>
  )
}

export default App
