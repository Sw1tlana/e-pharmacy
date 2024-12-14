import style from './MedicinePage.module.css';
import Medicine from '../../components/Medicine/Medicine';

function MedicinePage() {
  return (
    <div className={style.wrapper}>
     <Medicine/>   
    </div>
  )
};

export default MedicinePage;
