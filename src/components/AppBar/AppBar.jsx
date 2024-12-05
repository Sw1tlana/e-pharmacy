import style from './AppBar.module.css';
import UserMenu from '../../components/UseMenu/UseMenu';
import Loader from '../../shared/components/Loader/Loader';
import AuthNav from '../AuthNav/AuthNav';
import { useModalContext } from '../../context/useModalContext';

function AppBar({ isBurgerMenu }) {

  const { openModal } = useModalContext();

  return (
    <div className={isBurgerMenu ? style.burgerAppBar : style.appBar}>
      {<Loader/>? <AuthNav/> : <UserMenu/>}
    </div>
  )
};

export default AppBar;
