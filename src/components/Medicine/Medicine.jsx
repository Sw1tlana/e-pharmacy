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
import AddToCart from '../AddToCart/AddToCart';
import Pagination from '../Pagination/Pagination';
import { selectSearchQuery, selectSelectedCategory } from '../../redux/medicine/selectors';

const Product = lazy(() => import('../../components/Product/Product'));

function Medicine() {
  const dispatch = useDispatch();
  const totalPages = useSelector(selectTotalPages);
  const page = useSelector(selectPage);
  const filters = useSelector(selectFilters);
  const limit = useSelector(selectLimit);
  const medicines = useSelector(selectMedicine);
  const loading = useSelector(selectLoading);
  const searchQuery = useSelector(selectSearchQuery);
  const selectedCategory = useSelector(selectSelectedCategory); 

  const filteredProducts = medicines.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery?.toLowerCase() || "");
  
    const matchesCategory = selectedCategory?.value
      ? (product.category ? product.category.trim().toLowerCase() : "") === selectedCategory.value.trim().toLowerCase()
      : true;
  
    return matchesSearch && matchesCategory;
  });
  
  const fetchMedicinesData = (newPage = page) => {
    dispatch(fetchMedicines({ page: newPage, limit, filters }))
      .unwrap()
      .catch((error) => {
        console.error("Помилка під час завантаження ліків:", error);
      });
  };
  
  useEffect(() => {
    console.log('Fetching medicines with params:', { page, limit, filters });
    fetchMedicinesData();
  }, [page, limit, filters]);


  if (loading) {
    return (
      <div>
        <Loader />
        <p>Loading medicines...</p>
      </div>
    );
  }


  return (
    <>
    <MedicineSearch/>
    <section className={style.sectionMedicine}>
      {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
        <ul className={style.listMedicine}>
          {filteredProducts.map((medicine, index) => (
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

              <AddToCart medicine={medicine}/>

            <NavLink 
            className={style.linkDetails} 
            to={`/products/${medicine._id}`}
            >
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
               Nothing was found for you request
              </p>
            </div>   
      )} 
    <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={fetchMedicinesData}
  />      
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
