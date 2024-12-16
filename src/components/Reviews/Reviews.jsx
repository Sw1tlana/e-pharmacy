import style from './Reviews.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { selectReviews, selectLoading } from '../../redux/reviews/selectors';
import { fetchReviews } from '../../redux/reviews/operations';
import { useEffect } from 'react';

function Reviews() {
    const dispatch = useDispatch();
    const reviews = useSelector(selectReviews);
    const loading = useSelector(selectLoading);

  useEffect(() => {
   dispatch(fetchReviews());
  }, [dispatch]);

  return (
    <section className={style.sectionReviews}>
      <h2 className={style.titleReviews}>
        Reviews
      </h2>
      <p className={style.textReviews}>
        Search for Medicine, Filter by your location
      </p>
      <ul className={style.listReviews}>
    {Array.isArray(reviews) && reviews.length > 0 ? (
      reviews.map((review, index) => (
        <li 
        key={`${review.id}-${index}`}
        className={style.itemReview}
        >
          <img 
            className={style.imgMedicine}
            src={review.image}
            alt={`${review.name}'s photo`}
            width={335} 
          />          
          <h3 className={style.name}>{review.name}</h3>
          <p className={style.testimonial}>{review.testimonial}</p>
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
