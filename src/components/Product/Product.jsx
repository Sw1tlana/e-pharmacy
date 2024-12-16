import style from './Product.module.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import EllipsisText from "react-ellipsis-text";

import Counter from '../../components/Counter/Counter';
import { icons as sprite } from '../../shared/icons/index';
import { selectProduct, selectLoading } from '../../redux/medicine/selectors';
import { fetchMedicinesId } from '../../redux/medicine/operations';

function Product() {
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const product = useSelector(selectProduct);
    const loading = useSelector(selectLoading);

    useEffect(() => {
      if (id) {
        console.log('Fetching product with ID:', id);
        dispatch(fetchMedicinesId(id));
      }
    }, [dispatch, id]);

    console.log("Product from Redux:", product);  


    if (loading) {
      return <div>Loading...</div>; 
  }

  return (
    <>
    <section className={style.sectionProduct}>
    {product ? (
        <div className={style.itemMedicine}>
          <img 
            className={style.imgMedicine}
            src={product.photo}
            alt={product.name}
            width={335} 
          />
          <div className={style.infoContainer }>
          <div className={style.infoText}>
              <EllipsisText 
              className={style.textInfo}
               text={product.name}
               length={12} 
               />
            <div className={style.containerParagraph}>
                <svg width={22} height={22} className={style.iconParagrapf}>
                   <use xlinkHref={`${sprite}#icon-paragraph`} />
                </svg>
                  <p className={style.price}>{product.price}</p>
            </div>
         </div>
         <div className={style.containerButton}>
            <Counter/>
            <button className={style.addToCard} type='button'>Add to cart</button>
         </div>
         </div>
         </div>
    ) : (
        <div className={style.containerNotification}>
          <p className={style.notification}>No product available</p>
        </div>
    )}

    {/* descr/rev */}
    <div className={style.tabsContainer}>
      <button className={style.tabsBtn}>
        Description
      </button>

      <button className={style.tabsBtn}>
        Reviews
      </button>

    </div>
</section>
</>
  )
};

export default Product;
