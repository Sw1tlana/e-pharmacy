import { useModalContext } from '../../context/useModalContext';

import ModalWindow from '../../shared/components/ModalWindow/ModalWindow';

const Modals = () => {
  const { isOpen, closeModal, modalContent, modalProps } = useModalContext();

  console.log("isOpen:", isOpen);  
  console.log("modalContent:", modalContent); 

  return (
    <ModalWindow 
    isOpen={isOpen} 
    onRequestClose={closeModal}
    color={modalProps.color || 'white'}>
      {modalContent}
    </ModalWindow>
  );
};

export default Modals;
