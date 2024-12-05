import style from './AuthNav.module.css';
import { NavLink } from "react-router-dom";
import clsx from 'clsx';

const getNavLinkClass = ({ isActive }) => {
    return clsx(style.headerLink, {
      [style.activeHeader]: isActive,
    })
  };

function AuthNav() {

  return (
        <div className={style.containerNav}>
          <NavLink to="/register"  className={getNavLinkClass}>Register</NavLink>
          <NavLink to="/login" className={getNavLinkClass}>Log In</NavLink>
        </div>

  )
};

export default AuthNav;

