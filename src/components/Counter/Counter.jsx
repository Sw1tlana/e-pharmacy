import style from './Counter.module.css';
import { icons as sprite } from '../../shared/icons/index';

function Counter({ quantity, onIncrement, onDecrement }) {

  return (
    <div className={style.counterContainer}>
        <button
            className={style.buttonCounter} 
            onClick={onIncrement}
            aria-label="Decrease"
            >
            <svg width={20} height={20} className={style.iconIncrement}>
               <use xlinkHref={`${sprite}#icon-plus`} />
            </svg>
        </button>

        <span className={style.counter}>{quantity}</span>

        <button
            className={style.buttonCounter} 
            onClick={onDecrement}
            aria-label="Increase"
            disabled={quantity <= 0}
        >
            <svg width={20} height={20} className={style.iconDecrement}>
                <use xlinkHref={`${sprite}#icon-minus`} />
            </svg>
        </button>

    </div>
  )
};

export default Counter;

