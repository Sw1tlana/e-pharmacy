import style from './Counter.module.css';
import { icons as sprite } from '../../shared/icons/index';
import clsx from 'clsx';

function Counter({productId, quantity, isPage2, onIncrement, onDecrement  }) {

    const counterClass = isPage2 ? style.page2 : style.page1;

    const handleIncrement = () => {
        onIncrement(productId, quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            onDecrement(productId, quantity - 1);
        }
    };

  return (
    <div className={clsx(style.counterContainer, counterClass)}>
        <button
            className={style.buttonCounter} 
            onClick={handleIncrement}
            aria-label="Decrease"
            >
            <svg width={20} height={20} className={style.iconIncrement}>
               <use xlinkHref={`${sprite}#icon-plus`} />
            </svg>
        </button>

        <span className={style.counter}>{quantity}</span>

        <button
            className={style.buttonCounter}
            onClick={handleDecrement}
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

