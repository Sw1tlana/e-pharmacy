
import Home from '../Home/Home.jsx';
import RegisterForm from '../RegisterForm/RegisterForm.jsx';
import LoginForm from '../LoginForm/LoginForm.jsx';
import ModalRegisterForm from '../ModalRegisterform/ModalRegisterForm.jsx';
import ModalLoginForm from '../ModalLoginForm/ModalLoginForm.jsx';
import Cart from '../Cart/Cart.jsx';
import Footer from '../Footer/Footer.jsx';

function App() {

  return (
    <>
     <Home/>
     <RegisterForm/>
     <LoginForm/>
     <ModalRegisterForm/>
     <ModalLoginForm />
     <Cart/>
     <Footer />
    </>
  )
}

export default App
