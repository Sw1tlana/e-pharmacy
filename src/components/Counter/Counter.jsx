import style from './Counter.module.css';
import { icons as sprite } from '../../shared/icons/index';
import clsx from 'clsx';

function Counter({ quantity, onIncrement, onDecrement, isPage2, productId }) {

    const counterClass = isPage2 ? style.page2 : style.page1;

  return (
    <div className={clsx(style.counterContainer, counterClass)}>
        <button
            className={style.buttonCounter} 
            onClick={() => onIncrement(productId, quantity)}
            aria-label="Decrease"
            >
            <svg width={20} height={20} className={style.iconIncrement}>
               <use xlinkHref={`${sprite}#icon-plus`} />
            </svg>
        </button>

        <span className={style.counter}>{quantity}</span>

        <button
            className={style.buttonCounter}
            onClick={() => onDecrement(productId, quantity)}
            aria-label="Increase"
            disabled={quantity <= 1}
        >
            <svg width={20} height={20} className={style.iconDecrement}>
                <use xlinkHref={`${sprite}#icon-minus`} />
            </svg>
        </button>

    </div>
  )
};

export default Counter;

