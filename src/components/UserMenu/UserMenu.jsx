import style from './UserMenu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';

function UseMenu() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const onLogOut = () => {
    if (isLoggedIn) {
      dispatch(logout());
    }
  };

  return (
  <div className={style.containerUserMenu}>
    {isLoggedIn && user && (     
        <button type="button" className={style.logout} onClick={onLogOut}>
          Log out
        </button>      
    )}
  </div>
  )
};

export default UseMenu;
