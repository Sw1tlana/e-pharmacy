import clsx from 'clsx';
import style from './Container.module.css';

const Container = ({ className, children }) => {
    return (
      <div className={clsx(style.container, className && className)}>{children}</div>
    );
  };
  
  export default Container;