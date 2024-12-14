import style from './Product.module.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectMedicine, selectLoading } from '../../redux/medicine/selectors';
import { fetchMedicinesId } from '../../redux/medicine/operations';
import { useEffect } from 'react';

function Product() {
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const products = useSelector(selectMedicine);
    const loading = useSelector(selectLoading);

    useEffect(() => {
       dispatch(fetchMedicinesId(id));
    }, [dispatch, id]);

    const product = products.find(product => product.id === id); 

    if (loading) {
      return <div>Loading...</div>; 
  }

  return (
    <section className={style.sectionProduct}>
    {product ? (
        <div>
            <img 
                className={style.imgMedicine} 
                src={product.photo} 
                alt={product.name} 
                width={335} 
            />
            <p>{product.name}</p>
            <p>{product.description}</p>
        </div>
    ) : (
        <div className={style.containerNotification}>
            <p className={style.notification}>No product available</p>
        </div>
    )}
</section>
  )
};

export default Product;
