import style from './AppBar.module.css';
import UserMenu from '../../components/UseMenu/UseMenu';
import Loader from '../../shared/components/Loader/Loader';
import AuthNav from '../AuthNav/AuthNav';

function AppBar({ isBurgerMenu }) {

  return (
    <div className={isBurgerMenu ? style.burgerAppBar : style.appBar}>
      {<Loader/>? <AuthNav/> : <UserMenu/>}
    </div>
  )
};

export default AppBar;
