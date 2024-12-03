import style from './Header.module.css';
import Logo from '../../shared/components/Logo/Logo';
import NavLinks from '../NavLinks/NavLinks';
import AppBar from '../AppBar/AppBar';
import { icons as sprite } from '../../shared/icons/index';
import { useModalContext } from '../../context/useModalContext';

function Header({ isWhiteBackground }) {
  const { openModal } = useModalContext();

  const headerClass = isWhiteBackground ? style.whiteHeader : style.greenHeader;

  const handleClick = () => {
    console.log("Burger clicked");
    openModal(<div>Тут може бути вміст модалки</div>);
  };

  return (
<header className={`${style.header} ${headerClass}`}>
  <Logo className={style.logo} variant={isWhiteBackground ? 'white' : 'green'} />
  
  <nav className={style.nav}>
    <NavLinks context="header" />
  </nav>
  <AppBar/>
  
  <button className={style.burgerMenu} onClick={handleClick}>
    <svg width={32} height={32} className={style.iconBurger}>
      <use xlinkHref={`${sprite}#icon-burger`} />
    </svg>
  </button>
</header>
  )
};

export default Header;
