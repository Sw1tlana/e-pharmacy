import { Scrollbars } from 'rc-scrollbars';
import clsx from 'clsx';
import style from './ScrollWrapper.module.css';

const ScrollWrapper = ({ children, wrapClassName }) => {
  return (
    <Scrollbars className={clsx(style.myScroll, wrapClassName && wrapClassName)} style={{ height: '100vh', width: '100%' }}>
      {children}
    </Scrollbars>
  );
};

export default ScrollWrapper;