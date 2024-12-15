import Product from '../../components/Product/Product';
import style from './ProductPage.module.css';

function ProductPage() {

  return (
    <div className={style.pageProduct}>
      <Product/>
    </div>
  )
};

export default ProductPage;
