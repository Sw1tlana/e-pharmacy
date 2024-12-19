import style from './AppBar.module.css';
import AuthNav from '../AuthNav/AuthNav';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import UserMenu from '../../components/UserMenu/UserMenu';

function AppBar({ isBurgerMenu }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={isBurgerMenu ? style.burgerAppBar : style.appBar}>
      {isLoggedIn ? <UserMenu/> : <AuthNav/>}
    </div>
  )
};

export default AppBar;
