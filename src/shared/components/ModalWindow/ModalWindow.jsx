import { useEffect } from 'react';
import Modal from 'react-modal';
import { icons as sprite } from '../../icons/index';
import style from './ModalWindow.module.css';

Modal.setAppElement('#root');

const ModalWindow = ({
  isOpen,
  onRequestClose,
  children,
  shouldCloseOnOverlayClick = true,
  color = 'white',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const closeButtonClass = color === 'white' ? style.closeWhite : style.closeBlack;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      style={{
        overlay: {
          backgroundColor: 'rgba(47, 47, 47, 0.6)',
          zIndex: '15',
          overflow: 'auto',
          display: 'grid',
          placeItems: 'center',
        },
      }}
      className={{
        base: style.modalContent,
        afterOpen: style.modalContentOpen,
        beforeClose: style.beforeClose,
      }}
    >
      <button onClick={onRequestClose} className={`${style.closeButton} ${closeButtonClass}`}>
        <svg className={`${style.iconClose}`}>
          <use xlinkHref={`${sprite}#icon-x`} />
        </svg>
      </button>
      {children}
    </Modal>
  );
};

export default ModalWindow;