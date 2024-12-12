import style from './Medicine.module.css';
import { selectMedicine, selectLoading } from '../../redux/medicine/selectors';
import MedicineSearch from '../../components/MedicineSearch/MedicineSearch';
import { fetchMedicines } from '../../redux/medicine/operations';
import Loader from '../../shared/components/Loader/Loader';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function Medicine() {
  const dispatch = useDispatch();
  const medicines = useSelector(selectMedicine);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    console.log('Fetching medicines...');
   dispatch(fetchMedicines());
  }, [dispatch]);

  return (
    <div>
      <MedicineSearch/>
      {loading && <Loader/>}

      {Array.isArray(medicines) && medicines.length > 0 ? (
        <ul>
          {medicines.map((medicine, index) => (
            <li key={`${medicine.id}-${index}`}>
                {medicine.photo}
                {medicine.name}
                {medicine.suppliers}
                {medicine.stock}
                {medicine.price}
                {medicine.category}
            </li>
          ))}
        </ul>
          ) : (
            <div className={style.containerNotification}>
            <p className={style.notification}>No products available</p>
            </div>   
      )}
        
    </div>
  )
};

export default Medicine;
