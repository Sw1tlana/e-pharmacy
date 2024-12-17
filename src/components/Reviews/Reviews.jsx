import style from './Reviews.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { selectReviews, selectLoading } from '../../redux/reviews/selectors';
import { useEffect } from 'react';
import { useRef } from 'react';
import { fetchReviews } from '../../redux/reviews/operations';
import Loader from '../../shared/components/Loader/Loader';

import maria2x from '../../shared/images/reviews/maria@2x.png';
import sergey2x from '../../shared/images/reviews/sergey@2x.png';
import natalia2x from '../../shared/images/reviews/natalia@2x.png';

function Reviews() {
    const dispatch = useDispatch();
    const reviews = useSelector(selectReviews);
    const loading = useSelector(selectLoading);

    const reviewsContainerRef = useRef(null);

    const defaultImages = [maria2x, sergey2x, natalia2x];

  useEffect(() => {
   dispatch(fetchReviews());
  }, [dispatch]);

  const handleWheel = (e) => {
    if (e.deltaX !== 0) {
        if (reviewsContainerRef.current) {
            reviewsContainerRef.current.scrollBy({
                left: e.deltaX > 0 ? 335 : -335,
                behavior: 'smooth',
            });
        }
    }
};


  return (
    <section className={style.sectionReviews}>
      <h2 className={style.titleReviews}>
        Reviews
      </h2>
      <p className={style.textReviews}>
        Search for Medicine, Filter by your location
      </p>
      {loading && <Loader/>}
      <ul 
       ref={reviewsContainerRef}
       onWheel={handleWheel}
       className={style.listReviews}
      >

  {Array.isArray(reviews) && reviews.length > 0 ? (
    reviews.map((review, index) => (
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
    ))
  ) : (
    <div className={style.containerNotification}>
      <p className={style.notification}>No reviews available</p>
    </div>
  )}
</ul>
    </section>
  )
};

export default Reviews;
