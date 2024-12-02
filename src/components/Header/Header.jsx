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
      <nav className={style.nav}>
        <Logo className="logo" variant={isWhiteBackground ? 'white' : 'green'}/>
        <NavLinks context="header" />
        <AppBar/>
      </nav>
      <button className={style.burgerMenu} onClick={closeModal}>
      <svg width={18} height={18} className={style.iconFilter}>
            <use xlinkHref={`${sprite}#icon-burger`} />
        </svg>
      </button>
    </header>
  )
};

export default Header;
