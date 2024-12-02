import style from './Header.module.css';
import Logo from '../../shared/components/Logo/Logo';
import NavLinks from '../NavLinks/NavLinks';
import AppBar from '../AppBar/AppBar';

function Header() {

  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <Logo className="logo" variant="white"/>
        <NavLinks context="header" />
        <AppBar/>
        </nav>
    </header>
  )
};

export default Header;
