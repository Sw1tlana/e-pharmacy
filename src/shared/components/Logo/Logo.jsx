import style from './Logo.module.css';
// import { NavLink } from 'react-router-dom';

function Logo({className}) {

  return (
    <>
      <NavLink to="" className={`${style.logo} ${className}`}>
        <img 
        src="/public/logo-white.png" 
        alt="E-pharmacy Logo" 
        className={style.logoImage} 
        />
        AquaTrack
      </NavLink>
    </>
  )
};

export default Logo;
