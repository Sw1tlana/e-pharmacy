import style from './Medicine.module.css';
import { selectMedicine, selectLoading } from '../../redux/medicine/selectors';
import MedicineSearch from '../../components/MedicineSearch/MedicineSearch';
import { fetchMedicines } from '../../redux/medicine/operations';
import Loader from '../../shared/components/Loader/Loader';
import { icons as sprite } from '../../shared/icons/index';
import { selectFilters,
         selectLimit,
         selectTotalPages,
         selectPage
 } from '../../redux/medicine/selectors';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, Suspense, lazy } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import EllipsisText from "react-ellipsis-text";

const Product = lazy(() => import('../../components/Product/Product'));

function Medicine() {
  const dispatch = useDispatch();
  const totalPages = useSelector(selectTotalPages);
  const page = useSelector(selectPage);
  const filters = useSelector(selectFilters);
  const limit = useSelector(selectLimit);
  const medicines = useSelector(selectMedicine);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    console.log('Fetching medicines with params:', { page, limit, filters });
    console.log('Before fetch: medicines =', medicines);

    console.log('Filters:', filters);
    console.log('Page:', page);
    console.log('Limit:', limit);
  
    dispatch(fetchMedicines({ page, limit, filters }))


  }, [dispatch, page, limit, filters]);

  return (
    <>
    <MedicineSearch/>
    <section className={style.sectionMedicine}>
      {loading && <Loader/>}

      {Array.isArray(medicines) && medicines.length > 0 ? (
        <ul className={style.listMedicine}>
          {medicines.map((medicine, index) => (
            <li 
            className={style.itemMedicine} 
            key={`${medicine._id}-${index}`}
            >
          <img 
            className={style.imgMedicine}
            src={medicine.photo}
            alt={medicine.name}
            width={335} 
          />
            <div className={style.infoContainer }>
              <div className={style.infoText}>
              <EllipsisText 
              className={style.textInfo}
               text={medicine.name}
               length={12} 
               />
              <svg width={18} height={18} className={style.iconParagrapf}>
                <use xlinkHref={`${sprite}#icon-paragraph`} />
              </svg>
              <p>{medicine.price}</p>
              </div>

              <div>             
              <div className={style.infobtn}>
            <button className={style.addToCard} type='button'>Add to cart</button>
            <NavLink className={style.linkDetails} to={`/products/${medicine._id}`}>
              Details
            </NavLink>
               </div>
             </div>
            </div>

          </li>
          ))}
        </ul>
          ) : (
            <div className={style.containerNotification}>
               <p className={style.notification}>
               No products available
              </p>
            </div>   
      )}       
    </section>
    <div>
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path="products/:id" element={<Product/>} />
          </Routes>
        </Suspense>
    </div>
    </>
  )
};

export default Medicine;
