import style from './MedicineStore.module.css';

import { useDispatch, useSelector } from 'react-redux';

import { fetchStores } from '../../redux/stores/operation';
import { selectStores, selectLoading } from '../../redux/stores/selectors';
import { useEffect } from 'react';


function MedicineStore() {

  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const stores = useSelector(selectStores);



  return (
    <section className={style.sectionStore}>
      <h2 className={style.titleStore}>Medicine store</h2>

    </section>
  )
};

export default MedicineStore;
