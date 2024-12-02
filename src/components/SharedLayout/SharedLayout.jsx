import Header from '../Header/Header';
import Footer from '../../components/Footer/Footer';

function SharedLayout({ children }) {
  const isWhiteBackground = false;
  return (
    <div>
    <Header isWhiteBackground={isWhiteBackground}/>
    <main>{children}</main>
    <Footer/>
    </div>
  )
};

export default SharedLayout;
