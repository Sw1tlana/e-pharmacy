import Header from '../Header/Header';
import Footer from '../../components/Footer/Footer';
import { useLocation } from "react-router-dom";
import ScrollWrapper from '../../shared/components/scrollWrapper/scrollWrapper';

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
      <ScrollWrapper>
        <main style={{ minHeight: '100vh' }}>{children}</main>
      </ScrollWrapper>
      {!hideHeaderFooter && <Footer />}
    </div>
  )
};

export default SharedLayout;
