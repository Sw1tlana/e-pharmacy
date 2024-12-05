import style from './Header.module.css';
import Logo from '../../shared/components/Logo/Logo';
import NavLinks from '../NavLinks/NavLinks';
import AppBar from '../AppBar/AppBar';
import { icons as sprite } from '../../shared/icons/index';
import { useModalContext } from '../../context/useModalContext';
import ModalBurger from '../Modals/ModalBurger/ModalBurger';

function Header({ isWhiteBackground, isLogoOnly, isBlackText, hideMenu  }) {
  const { openModal } = useModalContext();
  console.log('openModal:', openModal); 

  const headerClass = isWhiteBackground ? style.white: style.greenHeader;

  const handleClick = () => {
    openModal(<ModalBurger/>);
  };

  return (
    <div className={style.pageContainer}>
      <header className={`${style.header} ${headerClass}`}>
        <Logo           
          className={style.logo} 
          variant={isWhiteBackground ? 'white' : 'green'} 
          isBlackText={isBlackText}/>
        
        {!isLogoOnly && !hideMenu && (
          <>
            <nav className={style.nav}>
              <NavLinks context="header" />
            </nav>
            <AppBar />
            <button className={style.burgerMenu} onClick={handleClick}>
              <svg width={32} height={32} className={style.iconBurger}>
                <use xlinkHref={`${sprite}#icon-burger`} />
              </svg>
            </button>
          </>
        )}

      </header>
</div>
  )
};

export default Header;
