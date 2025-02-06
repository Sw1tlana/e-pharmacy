import style from './AuthNav.module.css';
import { NavLink } from "react-router-dom";
import { useModalContext } from '../../context/useModalContext';
import ModalRegisterForm from '../Modals/ModalRegisterForm/ModalRegisterForm';
import ModalLoginForm from '../Modals/ModalLoginForm/ModalLoginForm';
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import clsx from 'clsx';

const getNavLinkClass = ({ isActive }) => {
  return clsx(style.headerLink, {
    [style.activeHeader]: isActive,
  })
};

function AuthNav() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const { openModal } = useModalContext();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1440); 
    };

    handleResize(); 
    window.addEventListener('resize', handleResize); 
    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);

  const appBarClass = clsx({
    [style.appBarWhite]: isHomePage || isMobile,
    [style.appBarGreen]: !isHomePage && !isMobile,
  });

  return (
    <div className={clsx(style.containerNav, appBarClass)}>
          {!isLoggedIn && (
            <>
          <NavLink 
          to="/register"  
          className={getNavLinkClass}
          onClick={(e) => {
            if (isMobile) {
              e.preventDefault(); 
              openModal(<ModalRegisterForm/>);
            }
          }}>
            Register
            </NavLink>

          <NavLink 
          to="/login" 
          className={getNavLinkClass}
          onClick={(e) => {
          if (isMobile) {
            e.preventDefault(); 
            openModal(<ModalLoginForm />);
          }
        }}>
            Log In
            </NavLink>
            </>
            )}
       </div>
  )
};

export default AuthNav;

