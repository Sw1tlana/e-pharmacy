import style from './Header.module.css';
import Logo from '../../shared/components/Logo/Logo';
import NavLinks from '../NavLinks/NavLinks';
import AppBar from '../AppBar/AppBar';
import { icons as sprite } from '../../shared/icons/index';
import { useModalContext } from '../../context/useModalContext';

function Header({ isWhiteBackground }) {
  const { closeModal } = useModalContext();

  const headerClass = isWhiteBackground ? style.whiteHeader : style.greenHeader;

  return (
<header className={`${style.header} ${headerClass}`}>
  <Logo className={style.logo} variant={isWhiteBackground ? 'white' : 'green'} />
  
  <nav className={style.nav}>
    <NavLinks context="header" />
  </nav>
  <AppBar/>
  
  <button className={style.burgerMenu} onClick={closeModal}>
    <svg width={24} height={24} className={style.iconBurger}>
      <use xlinkHref={`${sprite}#icon-burger`} />
    </svg>
  </button>
</header>
  )
};

export default Header;
