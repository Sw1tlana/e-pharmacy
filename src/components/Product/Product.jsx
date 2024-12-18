import style from './Product.module.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import EllipsisText from "react-ellipsis-text";

import Counter from '../../components/Counter/Counter';
import { icons as sprite } from '../../shared/icons/index';
import { selectReviews } from '../../redux/reviews/selectors';
import { selectProduct, selectLoading } from '../../redux/medicine/selectors';
import { fetchMedicinesId } from '../../redux/medicine/operations';
import Loader from '../../shared/components/Loader/Loader';

import maria2x from '../../shared/images/reviews/maria@2x.png';
import sergey2x from '../../shared/images/reviews/sergey@2x.png';
import natalia2x from '../../shared/images/reviews/natalia@2x.png';


function Product() {
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const product = useSelector(selectProduct);
    const reviews = useSelector(selectReviews);
    const loading = useSelector(selectLoading);
    const [activeTab, setActiveTab] = useState('description');

    const defaultImages = [maria2x, sergey2x, natalia2x];

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
      <button 
          className={`${style.tabsBtn} ${activeTab === 'description' ? style.active : ''}`} 
          onClick={() => setActiveTab('description')}
      >
        Description
      </button>

      <button 
          className={`${style.tabsBtn} ${activeTab === 'reviews' ? style.active : ''}`} 
          onClick={() => setActiveTab('reviews')}
      >
        Reviews
      </button>
    <div>
</div>
{activeTab === 'reviews' && (
        <div className={style.reviewsContainer}>
          {reviews.length > 0 ? (
            <ul className={style.listReviews}>
              {reviews.map((review, index) => (
                <li key={`${review.id}-${index}`} className={style.itemReview}>
                  <div className={style.containerInfo}>
                    <img
                      src={defaultImages[index % defaultImages.length]}
                      alt={`Review image ${index}`}
                      className={style.reviewImage}
                    />
                    <h3 className={style.name}>{review.name}</h3>
                    <p className={style.testimonial}>{review.testimonial}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className={style.containerNotification}>
              <p className={style.notification}>No reviews available</p>
            </div>
          )}
        </div>
      )}

    </div>
</section>
</>
  )
};

export default Product;
