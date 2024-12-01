import style from './Footer.module.css';
import { NavLink } from "react-router-dom";
import { icons as sprite } from '../../shared/icons';
import clsx from 'clsx';

import NavLinks from '../NavLinks/NavLinks';
import Logo from '../../shared/components/Logo/Logo';

const getTextLinkClass = ({ isActive }) => {
  return clsx(style.textBottom, {
    [style.activeStyle]: isActive,
  })
};

const getSocialLinkClass = ({ isActive }) => {
  return clsx(style.iconSocial, {
    [style.activeIcon]: isActive,
  })
};


function Footer() {
  return (
    <footer className={style.footer}>
     <div className={style.containerFooter}>

      <div className={style.containerLogo}>

       <div className={style.containerLogoImg}>
          <Logo className="logo" variant="white"/>
      </div>

      <div className={style.socialInfo}>
      <p className={style.footerText}>
        Get the medicine to help you feel better, 
        get back to your active life, and enjoy every moment.
      </p>

      <div className={style.socialNetworks}>
        <NavLink className={getSocialLinkClass} to="https://www.facebook.com/goITclub/">
            <svg width={28} height={24} className={style.icon}>
                <use xlinkHref={`${sprite}#icon-facebook`}/>
            </svg>
      </NavLink>

      <NavLink className={getSocialLinkClass} to="https://www.instagram.com/goitclub/">
            <svg width={28} height={24}>
                <use xlinkHref={`${sprite}#icon-instagram`} className={style.icon} />
            </svg>
      </NavLink>

      <NavLink className={getSocialLinkClass} to="https://www.youtube.com/c/GoIT ">
            <svg width={28} height={24}>
                <use xlinkHref={`${sprite}#icon-youtube`} className={style.icon} />
            </svg>
      </NavLink>
      </div> 
           
      </div>
      </div>
      
      <NavLinks context="footer" />

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
