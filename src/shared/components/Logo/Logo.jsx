import style from './Logo.module.css';
import { NavLink } from 'react-router-dom';

function Logo({className}) {

  return (
    <>
      <NavLink to="" className={`${style.logo} ${className}`}>
        E-Pharmacy
      </NavLink>
    </>
  )
};

export default Logo;
