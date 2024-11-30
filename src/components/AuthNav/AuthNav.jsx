import style from './AuthNav.module.css';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import clsx from 'clsx';

const getNavLinkClass = ({ isActive }) => {
    return clsx(css.headerLink, {
      [css.active]: isActive,
    })
  };


function AuthNav() {
  return (
    <div className={css.container}>
        <div className={css.containerNav}>
          <NavLink to="/register"  className={getNavLinkClass}>Register</NavLink>
          <NavLink to="/login" className={getNavLinkClass}>Log In</NavLink>
        </div>
    </div> 
  )
};

export default AuthNav;

