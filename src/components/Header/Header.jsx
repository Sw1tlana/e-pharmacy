import style from './Header.module.css';
import Logo from '../../shared/components/Logo/Logo';

function Header() {

  return (
    <div>
       <div className={style.containerLogoImg}>
      <img 
        src="/logo-green.png" 
        alt="E-pharmacy Logo" 
        className={style.logoImage} 
        />
        <Logo/>
      </div>
    </div>
  )
};

export default Header;
