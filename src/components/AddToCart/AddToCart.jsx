import style from './AddToCart.module.css';
import { addToCart } from '../../redux/cart/slice';
import { useDispatch } from 'react-redux';

function AddToCart({ medicine }) {
    
    const dispatch = useDispatch();

      const handleAddToCart = (medicine) => {
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

