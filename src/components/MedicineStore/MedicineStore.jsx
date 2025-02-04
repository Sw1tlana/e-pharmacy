import style from './MedicineStore.module.css';
import Loader from '../../shared/components/Loader/Loader';
import { shadow } from '../../shared/images/shadow';
import { icons as sprite } from '../../shared/icons';

import EllipsisText from "react-ellipsis-text";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStores } from '../../redux/stores/operation';
import ModalShop from '../../components/Modals/ModalShop/ModalShop';

import { selectStores, 
         selectError, 
         selectLoading } from '../../redux/stores/selectors';
import { useModalContext } from '../../context/useModalContext';

function MedicineStore() {
  const dispatch = useDispatch();
  const stores = useSelector(selectStores);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
   const { openModal } = useModalContext();

  useEffect(() => {
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

  const handleClickStore = () => {
     openModal(<ModalShop/>);
  };

  if(!loading) {
    return <Loader/>
  }

  return (
    <section className={style.sectionStore}>
      <h2 className={style.titleStore}>Medicine store</h2>

      {error && <p className={style.error}>Error: {error}</p>} 
      {Array.isArray(stores) && stores.length > 0 ? (
        <ul className={style.listStores}>
          {stores.map((store, index) => (
            <li key={`${store.id}-${index}`}
            className={style.itemStores}>  
               <EllipsisText 
               className={style.nameStores} 
               text={store.name} 
               length={16} 
               />

              <div className={style.containerLocation}>
                <div className={style.row}>
                  <svg width={14} height={16} className={style.iconMap}>
                      <use xlinkHref={`${sprite}#icon-map-pin`} />
                  </svg>
                  <p className={style.textStores}>{store.address}</p>
                </div>
               <p className={`${style.textStores} ${style.textCity}`}>{store.city}</p>
              </div>

              <div className={style.containerPhone}>
              <svg width={14} height={16} className={style.iconPhone}>
                  <use xlinkHref={`${sprite}#icon-phone`} />
              </svg>
              <p className={style.textStores}>{store.phone}</p>
              </div>

              <button 
              className={style.btnVisit}
              onClick={handleClickStore} 
              type='button'>
              Visit Store
              </button>

              <div className={`${style.textStores} ${style.ratingContainer}`}>
              <svg width={16} height={16} className={style.iconRating}>
                  <use xlinkHref={`${sprite}#icon-star`} />
             </svg>
                 {store.rating}
                 <p
                  className={`
                    ${style.btnStore} ${isStoreOpen() ?
                       style.openStore : 
                       style.closedStore}`}
                >
                    {isStoreOpen() ? "Open" : "Closed"}
                </p>
              </div>

              <img 
              className={style.imagesShadow} 
              src={shadow} 
              alt="shadow" 
              width={200}/>
            </li>
          ))}
        </ul>
      ) : (
        <div className={style.containerNotification}>
        <p className={style.notification}>No stores available</p>
        </div>
      )}
    </section>
  )
};

export default MedicineStore;
