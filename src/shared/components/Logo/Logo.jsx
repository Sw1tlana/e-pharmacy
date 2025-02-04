import style from './Logo.module.css';
import { NavLink } from 'react-router-dom';

function Logo({className, variant = 'green', isBlackText = false  }) {

  const logoSrc = variant === 'white' ? '/logo-white.png' : '/logo-green.png';
  const logoTextClass = isBlackText ? style.logoBlackText : style.logoGreenText; 

  return (
    <>
      <NavLink to="/" className={`${style.logo} ${style[className]} ${logoTextClass}`}>
      <img 
      src={logoSrc} 
      alt={`E-Pharmacy Logo (${variant})`} 
      className={style.logoImage} 
      />
        E-Pharmacy
      </NavLink>
    </>
  )
};

export default Logo;
