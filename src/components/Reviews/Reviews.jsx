import style from './Reviews.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { selectReviews, selectLoading } from '../../redux/reviews/selectors';
import { fetchReviews } from '../../redux/reviews/operations';

function Reviews() {
    const dispatch = useDispatch();
    const reviews = useSelector(selectReviews);
    const loading = useSelector(selectLoading);

  return (
    <section className={style.sectionReviews}>
      <h2 className={style.titleReviews}>
        Reviews
      </h2>
      <p className={style.textReviews}>
        Search for Medicine, Filter by your location
      </p>
      <ul>
    {Array.isArray(reviews) && reviews.length > 0 ? (
      reviews.map((review) => (
        <li key={review.id}>
          
          {review.text}
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
