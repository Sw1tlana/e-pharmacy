import style from './MedicineStore.module.css';
import Loader from '../../shared/components/Loader/Loader';
import { shadow } from '../../shared/images/shadow';
import { icons as sprite } from '../../shared/icons';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStores } from '../../redux/stores/operation';

import { selectStores, selectError, selectLoading } from '../../redux/stores/selectors';


function MedicineStore() {

  const dispatch = useDispatch();
  const stores = useSelector(selectStores);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  console.log(stores);

  useEffect(() => {
    console.log("Dispatching fetchStores...");
    dispatch(fetchStores());
  }, [dispatch]);

  const isStoreOpen = () => {
    const currentTime = new Date();
    const storeOpenTime = new Date();
    const storeCloseTime = new Date();
  
    storeOpenTime.setHours(9, 0); 
    storeCloseTime.setHours(20, 0); 
  
    return currentTime >= storeOpenTime && currentTime <= storeCloseTime;
  };

  return (
    <section className={style.sectionStore}>
      <h2 className={style.titleStore}>Medicine store</h2>

      {!loading && <Loader/>}  
      {error && <p className={style.error}>Error: {error}</p>} 

      {Array.isArray(stores) && stores.length > 0 ? (
        <ul className={style.listStores}>
          {stores.map((store, index) => (
            <li key={`${store.id}-${index}`}
            className={style.itemStores}>  
              <h3 className={style.nameStores}>{store.name}</h3>
              <p className={style.textStores}>{store.address}</p>
              <p className={style.textStores}>{store.city}</p>
              <p className={style.textStores}>{store.phone}</p>

              <p className={`${style.textStores} ${style.rating}`}>
              <svg width={18} height={18} className={style.iconRating}>
                  <use xlinkHref={`${sprite}#icon-star`} />
             </svg>
                 {store.rating}
              </p>

              <p>{isStoreOpen() ? "Open" : "Closed"}</p>
              <img 
              className={style.imagesShadow} 
              src={shadow} 
              alt="shadow" 
              width={200}/>
            </li>
          ))}
        </ul>
      ) : (
        <p className={style.notification}>No stores available</p>
      )}
    </section>
  )
};

export default MedicineStore;
