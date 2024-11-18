import style from './Home.module.css';
import Container from '../../shared/components/Container/Container';
import exampleImage from '../../shared/images/homePage/capsule@2х.png';

function Home() {
  return (
    <section className={style.homeSection}>
      <Container>
        <div className={style.customer}>
          <div className={style.imageWrapper}>
            <h1 className={style.titleHome}>Your medication delivered</h1>
            <img className={style.imagesHome} src={exampleImage} alt="example" />
            <p className={style.subTextHome}>
            Say goodbye to all your healthcare worries with us
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Home;
