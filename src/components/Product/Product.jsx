import style from './Product.module.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectMedicine, selectLoading } from '../../redux/medicine/selectors';
import { fetchMedicines } from '../../redux/medicine/operations';
import { useEffect } from 'react';

function Product() {
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const products = useSelector(selectMedicine);
    const loading = useSelector(selectLoading);

    useEffect(() => {
       dispatch(fetchMedicines(id));
    }, [dispatch])

  return (
    <section className={style.sectionProduct}>
        {Array.isArray(products) && products.length > 0 ? (
            <ul>
            {products.map((product, index) => (
                <li key={`${product.id}-${index}`}>
                    <img 
                    className={style.imgMedicine}
                    src={product.photo}
                    alt={product.name}
                    width={335} 
                    />
                    </li>
                )) }
            </ul>
                      ) : (
                        <div className={style.containerNotification}>
                           <p className={style.notification}>
                           No products available
                          </p>
                        </div> 
         )} 

    </section>
  )
};

export default Product;
