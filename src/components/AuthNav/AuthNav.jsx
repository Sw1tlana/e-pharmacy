import style from './AuthNav.module.css';
import { NavLink } from "react-router-dom";
import { useModalContext } from '../../context/useModalContext';
import ModalRegisterForm from '../Modals/ModalRegisterForm/ModalRegisterForm';
import ModalLoginForm from '../Modals/ModalLoginForm/ModalLoginForm';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

const getNavLinkClass = ({ isActive }) => {
  return clsx(style.headerLink, {
    [style.activeHeader]: isActive,
  })
}

function AuthNav() {
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

  return (
        <div className={style.containerNav}>
          <NavLink 
          to="/register"  
          className={getNavLinkClass}
          onClick={(e) => {
            if (isMobile) {
              e.preventDefault(); 
              openModal(<ModalRegisterForm />);
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
        </div>

  )
};

export default AuthNav;

