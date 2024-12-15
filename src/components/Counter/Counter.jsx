import style from './Counter.module.css';
import { icons as sprite } from '../../shared/icons/index';
import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
       setCount(prevCount => prevCount + 1);
    };

    const handleDecrement = () => {
       setCount(prevCount => prevCount - 1);
    };

  return (
    <div className={style.counterContainer}>
        <button
            className={style.buttonCounter} 
            onClick={handleIncrement}
            aria-label="Decrease"
            >
            <svg width={20} height={20} className={style.iconIncrement}>
               <use xlinkHref={`${sprite}#icon-plus`} />
            </svg>
        </button>

        <span className={style.counter}>{count}</span>

        <button
            className={style.buttonCounter} 
            onClick={handleDecrement}
            aria-label="Increase"
        >
            <svg width={20} height={20} className={style.iconDecrement}>
                <use xlinkHref={`${sprite}#icon-minus`} />
            </svg>
        </button>

    </div>
  )
};

export default Counter;

