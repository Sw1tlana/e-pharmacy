import style from './HomePage.module.css';
import Home from '../../components/Home/Home';
import PromoBanners from '../../components/PromoBanners/PromoBanners';
import Features from '../../components/Features/Features';
import ReviewsList from '../../components/ReviewsList/ReviewsList';
import AddMedicines from '../../components/AddMedicines/AddMedicines';

function HomePage() {
  return (
    <div>
      <Home/>
      <PromoBanners/>
      <AddMedicines/>
      <Features/> 
      <ReviewsList/> 
    </div>
  )
}

export default HomePage;
