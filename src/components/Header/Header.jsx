import style from './Header.module.css';
import Logo from '../../shared/components/Logo/Logo';
import NavLinks from '../NavLinks/NavLinks';

function Header({ background = "white" }) {

  return (
    <header
     className={background === "green" ? style.headerGreen : style.headerWhite}
     >
        <Logo className="logoGreen" variant="green"/>
        <NavLinks context="header" />
      </header>
  )
};

export default Header;
