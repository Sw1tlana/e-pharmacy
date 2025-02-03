import 'overlayscrollbars/styles/overlayscrollbars.css';
import './ScrollWrapper.module.css';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import clsx from 'clsx';

const ScrollWrapper = ({ children, wrapClassName }) => {
  return (
    <OverlayScrollbarsComponent
      element="div"
      className={clsx('myScroll', wrapClassName && wrapClassName)}
      options={{
        scrollbars: { autoHide: 'never', theme: 'no-theme' },
      }}
      defer
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};

export default ScrollWrapper;