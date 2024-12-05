import style from './AppBar.module.css';
import { useState } from 'react';
import UserMenu from '../../components/UseMenu/UseMenu';
import Loader from '../../shared/components/Loader/Loader';
import AuthNav from '../AuthNav/AuthNav';

function AppBar({ isBurgerMenu }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

   const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={isBurgerMenu ? style.burgerAppBar : style.appBar}>
      {<Loader/>? <AuthNav onCloseMenu={toggleMenu} /> : <UserMenu/>}
    </div>
  )
};

export default AppBar;
