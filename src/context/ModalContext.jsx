import { createContext, useState, useCallback } from 'react';
import ModalWindow from '../shared/components/ModalWindow/ModalWindow';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState({ color: 'white' });

  const openModal = useCallback((content, props) => {
    setModalContent(content);
    setModalProps({ ...modalProps, ...props }); 
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalContent(null);
    setModalProps({ color: 'white' });
  }, []);

  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, closeModal, modalProps, modalContent }}
    >
      {children}
      <ModalWindow 
      isOpen={isOpen} 
      onRequestClose={closeModal}
      color={modalProps.color}>
        {modalContent}
      </ModalWindow>
    </ModalContext.Provider>
  );
};

export default ModalContext;