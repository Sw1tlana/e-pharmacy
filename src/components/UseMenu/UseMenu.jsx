import style from './UseMenu.module.css';

function UseMenu() {
  return (
    <div>
        <button type="button" className={style.logout}>
            Log out
        </button>
    </div>
  )
};

export default UseMenu;
