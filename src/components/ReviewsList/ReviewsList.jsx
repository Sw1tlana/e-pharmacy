import style from './ReviewsList.module.css'
import Reviews from '../Reviews/Reviews';

function ReviewsList() {
  return (
    <section className={style.sectionReviews}>
      <h2 className={style.titleReviews}>
        Reviews
      </h2>
      <p className={style.textReviews}>
        Search for Medicine, Filter by your location
      </p>
      <Reviews/>
    </section>
  )
};

export default ReviewsList
