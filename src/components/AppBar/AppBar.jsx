import style from './AppBar.module.css';
import UserMenu from '../../components/UseMenu/UseMenu';
import Loader from '../../shared/components/Loader/Loader';
import AuthNav from '../AuthNav/AuthNav';

function AppBar() {
  return (
    <div className={style.appBar}>
      {<Loader/>? <AuthNav/> : <UserMenu/>}
    </div>
  )
};

export default AppBar;
