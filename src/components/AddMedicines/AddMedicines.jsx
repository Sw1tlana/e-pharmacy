import style from './AddMedicines.module.css';
import { medicine2x} from '../../shared/images/medicinePage/index';
import { useNavigate } from 'react-router-dom';

function AddMedicines() {
  const navigate = useNavigate();

  const handleBuyMedicineClick = () => {
    navigate('/store'); 
  };

  return (
    <section className={style.sectionAddMedicines}>

        <div className={style.containerAddMedicines}>
        <div>
        <h2 className={style.titleAddMedicines}>
        Add the medicines you need online now
        </h2>
        <p className={style.textAddMedicines}>
        Enjoy the convenience of having your prescriptions 
        filled from home by connecting with your community 
        pharmacy through our online platform.
        </p>
        <button
         onClick={handleBuyMedicineClick}  
          type='button' 
          className={style.btnAddMedicines}>
            Buy medicine
        </button>
        </div>
        <img className={style.imgAddMedicines} src={medicine2x} alt='medicine2x'/>
        </div>
    </section>
  )
};

export default AddMedicines;

