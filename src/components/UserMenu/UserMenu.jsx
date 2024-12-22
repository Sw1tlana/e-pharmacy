import style from './UserMenu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { logout } from '../../redux/auth/operations';
import { selectItems } from '../../redux/cart/selectors';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import { icons as sprite } from '../../shared/icons';

function UseMenu() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const itemsInCart = useSelector(selectItems);
  const totalItems = itemsInCart.length;

  console.log("Is Logged In: ", isLoggedIn);
  console.log("User: ", user);
  console.log("Items in Cart: ", itemsInCart);
  console.log("Total Items: ", totalItems);

  const onLogOut = () => {
    dispatch(logout());
  };

  return (
    <div className={style.containerUserMenu}>
      {isLoggedIn && user && (
        <Link to="cart" className={style.btnCart} >
          <svg width={14} height={14} className={style.cartIcon}>
            <use xlinkHref={`${sprite}#icon-shopping-cart`} />
          </svg>
            <span className={style.cartCount}>
               {totalItems > 0 ? totalItems : "0"}
            </span> 
        </Link>
        )}
        {isLoggedIn && user && (
        <button type="button" className={style.logout} onClick={onLogOut}>
            Log out
        </button>
        )}
    </div>
  )
};

export default UseMenu;
