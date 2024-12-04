import style from './ModalBurger.module.css';
import { useModalContext } from '../../../context/useModalContext';

function ModalBurger() {
    const { closeModal } = useModalContext();

  return (
    <div>
            <h2>Модальне меню</h2>
            <button onClick={closeModal}>Закрити</button>
    </div>
  )
};

export default ModalBurger;
