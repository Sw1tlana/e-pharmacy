import style from './Footer.module.css';
import Logo from '../../shared/components/Logo/Logo';
import { NavLink } from "react-router-dom";
import { icons as sprite } from '../../shared/icons';
import clsx from 'clsx';

const getNavLinkClass = ({ isActive }) => {
    return clsx(style.footerLink, {
      [style.active]: isActive,
    })
};

const getTextLinkClass = ({ isActive }) => {
  return clsx(style.textBottom, {
    [style.activeStyle]: isActive,
  })
};


function Footer() {
  return (
    <footer className={style.footer}>
     <div className={style.containerFooter}>

      <div className={style.containerLogo}>
      <Logo/>

      <div className={style.socialInfo}>
      <p className={style.footerText}>
        Get the medicine to help you feel better, 
        get back to your active life, and enjoy every moment.
      </p>

      <div className={style.socialNetworks}>
      <svg width={28} height={24}>
          <use xlinkHref={`${sprite}#icon-facebook`} />
      </svg>

      <svg width={28} height={24}>
          <use xlinkHref={`${sprite}#icon-instagram`} />
      </svg>

      <svg width={28} height={24}>
           <use xlinkHref={`${sprite}#icon-youtube`} />
      </svg>
      </div>
      </div>

      </div> 
      
      <div className={style.containerFooterLink}>
        <NavLink className={getNavLinkClass} to="/">Home</NavLink>
        <NavLink  className={getNavLinkClass} to="/store">Medicine store</NavLink>
        <NavLink  className={getNavLinkClass} to="/medicine">Medicine</NavLink>
      </div>

      </div>

      <div className={style.horisontalLine}></div>

      <div className={style.containerBottom}>
        <p className={style.textBottom}>&#169; E-Pharmacy 2023. All Rights Reserved</p>
        <NavLink className={getTextLinkClass} to="/privacy-policy">Privacy Policy</NavLink>
        <NavLink className={getTextLinkClass} to="/terms-and-conditions">Terms &#38; Conditions</NavLink>
      </div>

    </footer>
  )
};

export default Footer;
