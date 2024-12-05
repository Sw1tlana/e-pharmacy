import style from './AuthNav.module.css';
import { NavLink } from "react-router-dom";
// import { useModalContext } from '../../context/useModalContext';
import clsx from 'clsx';
// import ModalLoginForm from '../Modals/ModalLoginForm/ModalLoginForm';
import LoginForm from '../LoginForm/LoginForm';

const getNavLinkClass = ({ isActive }) => {
    return clsx(style.headerLink, {
      [style.activeHeader]: isActive,
    })
  };

function AuthNav({onCloseMenu}) {

  // const { openModal } = useModalContext();

  return (
        <div className={style.containerNav}>
          <NavLink to="/register"  className={getNavLinkClass}>Register</NavLink>
          <NavLink to="/login" onClick={onCloseMenu} className={getNavLinkClass}>Log In</NavLink>
        </div>

  )
};

export default AuthNav;

