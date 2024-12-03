import style from './NavLinks.module.css';
import { NavLink } from "react-router-dom";
import clsx from 'clsx';

const getNavLinkClass = ({isActive, context}) => {
return clsx(style.footerLink, {
    [style.headerLink]: context === 'header',
    [style.footerLink]: context === 'footer',
    [style.activeFooter]: context === 'footer' && isActive,  
    [style.activeHeader]: context === 'header' && isActive, 
});
};

function NavLinks({ context = 'header' }) {
  return (
    <div  className={clsx({
        [style.containerFooterLink]: context === 'footer',
        [style.containerHeaderLink]: context === 'header',  
      })}>
      <NavLink className={(props) => getNavLinkClass({...props, context})} to="/">Home</NavLink>
      <NavLink className={(props) => getNavLinkClass({...props, context})} to="/store">Medicine store</NavLink>
      <NavLink className={(props) => getNavLinkClass({...props, context})} to="/products">Medicine</NavLink>
    </div>
  )
};

export default NavLinks;