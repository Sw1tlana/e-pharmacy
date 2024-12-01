import Header from '../Header/Header';
import Footer from '../../components/Footer/Footer';

function SharedLayout({ children }) {
  return (
    <div>
    <Header/>
    <main>{children}</main>
    <Footer/>
    </div>
  )
};

export default SharedLayout;
