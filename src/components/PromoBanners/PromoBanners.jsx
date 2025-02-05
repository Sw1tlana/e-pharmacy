import style from './PromoBanners.module.css';
import Loader from '../../shared/components/Loader/Loader';
import EllipsisText from "react-ellipsis-text";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nearestStores } from '../../redux/stores/operation';
import { selectStores, selectLoading } from '../../redux/stores/selectors';
import { shadow } from '../../shared/images/shadow';
import { icons as sprite } from '../../shared/icons';
import { useNavigate } from 'react-router-dom';
import { useModalContext } from '../../context/useModalContext.jsx';
import ModalShop from '../Modals/ModalShop/ModalShop.jsx';
import toast from 'react-hot-toast';

function PromoBanners() {
    const dispatch = useDispatch();
    const stores = useSelector(selectStores);
    const loading = useSelector(selectLoading);

    const { openModal } = useModalContext();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(nearestStores());
    }, [dispatch]);

    const isStoreOpen = () => {
        const currentTime = new Date();
        const storeOpenTime = new Date();
        const storeCloseTime = new Date();
      
        storeOpenTime.setHours(9, 0); 
        storeCloseTime.setHours(20, 0); 
      
        return currentTime >= storeOpenTime && currentTime <= storeCloseTime;
      };

      const handleClickDiskount = () => {
        toast.error('There are no discounts at the moment. Stay tuned for updates!')
      };

      const handleRedirect = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate('/feature'); 
      };

      const handleStoreClick = (store) => {
        openModal(<ModalShop store={store} />); 
    };

  return (
    <section className={style.sectionBanners}>
        <div className={style.bannersWrapper}>
        <div className={style.containerBanners}>
            <div className={style.containerBannersMini}>
                <div className={style.bannersNumber}>1</div>
                <h3 className={style.bannersTitle}>Huge Sale</h3>
            </div>
            <div className={style.containerBannersMini}>
                <p className={style.bannersText}>70 &#37;</p>
                <button 
                onClick={handleClickDiskount}
                type='button'
                className={style.bannersBtn}>
                  Shop now
                  </button>
            </div>
        </div>

        <div className={style.containerBanners}>
            <div className={style.containerBannersMini}>
                <div className={style.bannersNumber}>2</div>
                <h3 className={style.bannersTitle}>Secure delivery</h3>
            </div>
            <div className={style.containerBannersMini}>
                <p className={style.bannersText}>100 &#37;</p>
                <button 
                onClick={handleRedirect}
                type='button'
                className={style.bannersBtn}>
                  Read more
                </button>
            </div>
        </div>

        <div className={style.containerBanners}>
            <div className={style.containerBannersMini}>
                <div className={style.bannersNumber}>3</div>
                <h3 className={style.bannersTitle}>Off</h3>
            </div>
            <div className={style.containerBannersMini}>
                <p className={style.bannersText}>35 &#37;</p>
                <button
                onClick={handleClickDiskount} 
                type='button'
                className={style.bannersBtn}>
                Shop now</button>
            </div>
        </div>
        </div>

        <div className={style.storeInfo}>
            <h2 className={style.titleStore}>Your Nearest Medicine Store</h2>
            <p className={style.textStore}>Search for Medicine, Filter by your location</p>
        </div>

         <div className={style.wrapperList}>
        {!loading && <Loader/>}  
        {Array.isArray(stores) && stores.length > 0 ? (
        <ul className={style.listStores}>
          {stores.map((store, index) => (
            <li key={`${store.id}-${index}`}
            className={style.itemStores}
            onClick={handleStoreClick}>  
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
        <Loader/>
        <p className={style.notification}>No stores available</p>
        </div>   
      )}
      </div>
    </section>
  )
};

export default PromoBanners;
