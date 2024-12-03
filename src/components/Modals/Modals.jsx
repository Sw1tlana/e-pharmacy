import { useModalContext } from '../../context/useModalContext';

import ModalWindow from '../../shared/components/ModalWindow/ModalWindow';

const Modals = () => {
  const { isOpen, closeModal, modalContent } = useModalContext();

  console.log("isOpen:", isOpen);  
  console.log("modalContent:", modalContent); 

  return (
    <ModalWindow isOpen={isOpen} onRequestClose={closeModal}>
      {modalContent}
    </ModalWindow>
  );
};

export default Modals;
