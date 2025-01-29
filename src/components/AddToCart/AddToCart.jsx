import style from './AddToCart.module.css';
import { addToCart } from '../../redux/cart/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import toast from 'react-hot-toast';

function AddToCart({ medicine }) {
    
    const dispatch = useDispatch();
    const isUserLoggedIn = useSelector(selectIsLoggedIn);

      const handleAddToCart = (medicine) => {
        if (!isUserLoggedIn) {
          toast.error('Please register or log in to add a product to your basket!');
          return;  
      }
        dispatch(addToCart(medicine));
      };

  return (
    <div>
      <button 
      className={style.addToCard} 
      type='button'
      onClick={() => handleAddToCart(medicine)}
      >
        Add to cart
    </button>
    </div>
  )
};

export default AddToCart;

