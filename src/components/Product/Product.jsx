import style from './Product.module.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import EllipsisText from "react-ellipsis-text";

import { selectItems } from '../../redux/cart/selectors';
// import { incrementItem, decrementItem } from '../../redux/cart/slice';
import Counter from '../../components/Counter/Counter';
import { icons as sprite } from '../../shared/icons/index';
import { selectReviews } from '../../redux/reviews/selectors';
import { selectProduct, selectLoading } from '../../redux/medicine/selectors';
import { fetchMedicinesId } from '../../redux/medicine/operations';
import Loader from '../../shared/components/Loader/Loader';
import AddToCart from '../AddToCart/AddToCart';
import { reviews2x } from '../../shared/images/reviews'; 

import maria2x from '../../shared/images/reviews/maria@2x.png';
import sergey2x from '../../shared/images/reviews/sergey@2x.png';
import natalia2x from '../../shared/images/reviews/natalia@2x.png';

function Product() {
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const product = useSelector(selectProduct);
    const reviews = useSelector(selectReviews);
    const loading = useSelector(selectLoading);
    const itemsInCart = useSelector(selectItems);

    const itemInCart = product ? itemsInCart.find(item => item.id === product.id) : null;
    const quantity = itemInCart ? itemInCart.quantity : 0;
    
    const [activeTab, setActiveTab] = useState('description');

    const defaultImages = [maria2x, sergey2x, natalia2x];

    const handleIncrement = (id) => {
      console.log("Incrementing item with id:", id);
      dispatch(incrementItem(id));
    };
  
    const handleDecrement = (id) => {
      console.log("Decrementing item with id:", productId);
      if (quantity > 0) {
        dispatch(decrementItem(id));
      }
    };

    useEffect(() => {
          dispatch(fetchMedicinesId(id));
  }, [dispatch, id]);

      if (loading) {
        return <Loader />; 
    }

  console.log("Product from Redux:", product); 

    if (loading) {
      return <div><Loader/></div>; 
  }

  return (
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
            <Counter 
            isPage2={false}
            quantity={quantity} 
            onIncrement={handleIncrement} 
            onDecrement={handleDecrement} 
            productId={product.id}
            />
            <AddToCart medicine={product}/>
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
      <div className={style.containerBtn}>
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
      </div>

      {/* description */}
      {activeTab === 'description' && (
  <>
    {product ? (
      <div className={style.productDetails}>
       <p className={style.detailsText}>
        <span className={style.detailsSubtext}>Warning: </span>
        {product.warning}
      </p>
       <p className={style.detailsText}>
        <span className={style.detailsSubtext}>Recommendation: </span>
        {product.recommendation}
        </p>
       <p className={style.detailsText}>
        <span className={style.detailsSubtext}>Balance Approach: </span>
        {product.balance_approach}
        </p>
      </div>
    ) : (
      <div className={style.containerNotification}>
        <p className={style.notification}>Product information is not available.</p>
      </div>
    )}
  </>
      )}

      {/* reviews */}
    {activeTab === 'reviews' && (
      <>
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
                    <div className={style.containerSvgStar}>
                      <svg width={16} height={16}>
                        <use xlinkHref={`${sprite}#icon-star`} className={style.iconStar}/>
                      </svg>
                      <span>4</span>
                      </div>
                      <div className={style.containerSvg}>
                      <img src={reviews2x} alt="reviews2x" />
                      <span>4</span>
                    </div>
                    </div>
                    <p className={style.testimonial}>{review.testimonial}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className={style.containerNotification}>
              <p className={style.notification}>No reviews available</p>
            </div>
          )}
        </>
      )}
</div>
</section>
  )
};

export default Product;
