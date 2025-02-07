import AppBar from '../../AppBar/AppBar';
import NavLinks from '../../NavLinks/NavLinks';
import style from './ModalBurger.module.css';

function ModalBurger() {

  return (
    <div className={style.burgerContainer}>
     <NavLinks/>
     <AppBar isBurgerMenu={true}/>
    </div>
  )
};

export default ModalBurger;
