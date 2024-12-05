import Header from '../Header/Header';
import Footer from '../../components/Footer/Footer';
import { useLocation } from "react-router-dom";

function SharedLayout({ children }) {
  const location = useLocation();

  const hideHeaderFooter = location.pathname === "/register" || 
  location.pathname === "/login";

  return (  
    <div>
      <Header 
      isWhiteBackground={true} 
      isLogoOnly={hideHeaderFooter} 
      isBlackText={true}
      hideMenu={hideHeaderFooter}
      />
      {hideHeaderFooter && <Header hideMenu={hideHeaderFooter}/> }
      <main>{children}</main>
      {!hideHeaderFooter && <Footer />}
    </div>
  )
};

export default SharedLayout;
