import Product from '../../components/Product/Product';
import style from './ProductPage.module.css';

function ProductPage() {

  return (
    <div className={style.sectionProduct}>
      <Product/>
    </div>
  )
};

export default ProductPage;
