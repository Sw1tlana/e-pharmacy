import style from './HomePage.module.css';
import Home from '../../components/Home/Home';
import PromoBanners from '../../components/PromoBanners/PromoBanners';
import Reviews from '../../components/Reviews/Reviews';

function HomePage() {
  return (
    <div>
      <Home/>
      <PromoBanners/> 
      <Reviews/> 
    </div>
  )
}

export default HomePage;
