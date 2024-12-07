import style from './AppBar.module.css';
import UserMenu from '../../components/UseMenu/UseMenu';
import Loader from '../../shared/components/Loader/Loader';
import AuthNav from '../AuthNav/AuthNav';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

function AppBar({ isBurgerMenu }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={isBurgerMenu ? style.burgerAppBar : style.appBar}>
      {isLoggedIn ? <AuthNav/> : <UserMenu/>}
    </div>
  )
};

export default AppBar;
