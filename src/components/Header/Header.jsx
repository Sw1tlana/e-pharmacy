import style from './Header.module.css';
import Logo from '../../shared/components/Logo/Logo';
import NavLinks from '../NavLinks/NavLinks';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useModalContext } from '../../context/useModalContext';
import ModalBurger from '../Modals/ModalBurger/ModalBurger';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import { selectItems } from '../../redux/cart/selectors';
import { icons as sprite } from '../../shared/icons';
import AppBar from '../AppBar/AppBar';
import { useLocation } from 'react-router-dom'

function Header({ isWhiteBackground, isLogoOnly, hideMenu }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const { openModal } = useModalContext();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const itemsInCart = useSelector(selectItems);
  const totalItems = itemsInCart ? itemsInCart.length : 0;

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  const headerClass = isWhiteBackground ? style.white : style.green;
  const burgerMenuClass = isHomePage ? style.burgerMenuWhite : style.burgerMenuGreen;

  const handleClick = () => {
    openModal(<ModalBurger />);
  };

  return (
    <div className={style.pageContainer}>
      <header className={`${style.header} ${headerClass}`}>
        <Logo
          className={style.logo}
          variant={isHomePage ? 'white' : 'green'}
          isBlackText={isHomePage ? true : false}
        />
        {!isLogoOnly && !hideMenu && (
          <>
            <nav className={style.nav}>
              <NavLinks context="header" />
            </nav>
            {isLoggedIn && (
              <div className={style.userCartContainer}>
                <Link to="/cart" className={style.btnCart}>
                  <svg width={20} height={20} className={style.cartIcon}>
                    <use xlinkHref={`${sprite}#icon-shopping-cart`} />
                  </svg>
                  <span className={style.cartCount}>
                    {totalItems > 0 ? totalItems : "0"}
                  </span>
                </Link>
                <div className={style.avatar}>
                  {user && getInitial(user.name)}
                </div>
              </div>
            )}
            <AppBar/>
            <button className={`${style.burgerMenu} ${burgerMenuClass}`} onClick={handleClick}>
              <svg width={32} height={32} className={style.iconBurger}>
                <use xlinkHref={`${sprite}#icon-burger`} />
              </svg>
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default Header;
