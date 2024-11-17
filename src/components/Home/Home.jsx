import style from './Home.module.css';
import Container from '../../shared/components/Container/Container';
import exampleImage from '../../shared/images/homePage/capsule@2х.png';

function Home() {
  return (
    <section className={style.homeSection}>
      <Container>
        <div className={style.customer}>
          <h1 className={style.titleHome}>Your medication delivered</h1>
          <img src={exampleImage} alt="example" />
        </div>
      </Container>
    </section>
  )
}

export default Home;
