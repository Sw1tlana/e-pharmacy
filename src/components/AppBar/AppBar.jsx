import style from './AppBar.module.css';
import UserMenu from '../../components/UseMenu/UseMenu';
import Loader from '../../shared/components/Loader/Loader';

function AppBar() {
  return (
    <div>
      {<Loader/>? <UserMenu onCloseMenu={closeMenu} /> : <AuthNav onCloseMenu={closeMenu} />}
    </div>
  )
};

export default AppBar;
