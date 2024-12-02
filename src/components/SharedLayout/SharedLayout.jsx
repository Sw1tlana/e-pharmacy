import Header from '../Header/Header';
import Footer from '../../components/Footer/Footer';
// import { useLocation } from 'react-router-dom';

function SharedLayout({ children }) {
  const isWhiteBackground = true;

  // const location = useLocation();

  // // Визначаємо фон залежно від сторінки
  // const isWhiteBackground = ['/', '/'].includes(location.pathname);
  return (
    <div>
    <Header isWhiteBackground={isWhiteBackground}/>
    <main>{children}</main>
    <Footer/>
    </div>
  )
};

export default SharedLayout;
