import { createContext, useState, useCallback } from 'react';
import ModalWindow from '../shared/components/ModalWindow/ModalWindow';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback((content) => {
    setModalContent(content);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalContent(null);
  }, []);

  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, closeModal, modalContent }}
    >
      {children}
      <ModalWindow isOpen={isOpen} onRequestClose={closeModal}>
        {modalContent}
      </ModalWindow>
    </ModalContext.Provider>
  );
};

export default ModalContext;