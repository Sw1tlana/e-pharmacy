import style from './PromoBanners.module.css';
import Loader from '../../shared/components/Loader/Loader';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nearestStores } from '../../redux/stores/operation';
import { selectStores, selectLoading } from '../../redux/stores/selectors';

function PromoBanners() {
    const dispatch = useDispatch();
    const stores = useSelector(selectStores);
    const loading = useSelector(selectLoading);

    useEffect(() => {
        dispatch(nearestStores());
    }, [dispatch]);

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
                <button type='submit'className={style.bannersBtn}>Shop now</button>
            </div>
        </div>

        <div className={style.containerBanners}>
            <div className={style.containerBannersMini}>
                <div className={style.bannersNumber}>2</div>
                <h3 className={style.bannersTitle}>Secure delivery</h3>
            </div>
            <div className={style.containerBannersMini}>
                <p className={style.bannersText}>100 &#37;</p>
                <button type='submit'className={style.bannersBtn}>Read more</button>
            </div>
        </div>

        <div className={style.containerBanners}>
            <div className={style.containerBannersMini}>
                <div className={style.bannersNumber}>3</div>
                <h3 className={style.bannersTitle}>Off</h3>
            </div>
            <div className={style.containerBannersMini}>
                <p className={style.bannersText}>35 &#37;</p>
                <button type='submit'className={style.bannersBtn}>Shop now</button>
            </div>
        </div>
        </div>

        <div className={style.storeInfo}>
            <h2 className={style.titleStore}>Your Nearest Medicine Store</h2>
            <p className={style.textStore}>Search for Medicine, Filter by your location</p>
        </div>
        {Array.isArray(stores) && stores.length > 0 ? (
            <ul>
                {stores.map((store, index) => (
                    <li key={`${store.id}-${index}`}>
                     <p>{store.name}</p>
                     <p>{store.address}</p>
                     <p>{store.city}</p>
                     <p>{store.phone}</p>
                     <p>{store.rating}</p>
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

export default PromoBanners;
