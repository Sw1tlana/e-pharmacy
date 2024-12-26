import style from './Cart.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import EllipsisText from "react-ellipsis-text";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Counter from '../Counter/Counter';
import { fetchUpdataCart } from '../../redux/cart/operations';
import { fetchMedicinesId } from '../../redux/medicine/operations';
import { icons as sprite } from '../../shared/icons/index';
import { selectItems } from '../../redux/cart/selectors';
import { removeFromCart } from '../../redux/cart/slice';

function Cart() {
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const items = useSelector(selectItems);

    useEffect(() => {
        if (id) {
          console.log('Fetching product with ID:', id);
          dispatch(fetchMedicinesId(id));
        }
      }, [dispatch, id]);

    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver()
    });

    const [selectedOption, setSelectedOption] = useState("");

    const onSubmit = (data) => {
        console.log('Form data:', data);
      };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
      };

    const  handleRemoveFromCart = (medicine)  => {
      if (window.confirm(`Are you sure you want to remove ${medicine.name} from the cart?`)) {
        dispatch(removeFromCart(medicine));
      }
    };

    const handleIncrement = (productId, currentQuantity) => {
      const newQuantity = currentQuantity + 1;
      console.log(`Increasing quantity for productId ${productId} to ${newQuantity}`);
      dispatch(fetchUpdataCart({ productId, quantity: newQuantity }));
    };
  
    const handleDecrement = (productId, currentQuantity) => {
      if (currentQuantity > 1) {
        const newQuantity = currentQuantity - 1; 
        console.log(`Decreasing quantity for productId ${productId} to ${newQuantity}`);
        dispatch(fetchUpdataCart({ productId, quantity: newQuantity })); 
      }
    };

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <section className={style.sectionCart}>
      <div>
      <h2 className={style.titleCart}>Cart</h2>
        <div className={style.containerCart}>
            <h3 className={style.subTitleCart}>
            Enter shipping info 
            </h3>
            <p className={style.textCart}>
            Enter your delivery address where you get the product.
            You can also send any other location where you send the products.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.containerInput}>

            <div>
                <label className={style.label}>
                    Name
                </label>
                <input 
                id="name"
                className={style.formInput}
                {...register('name')}
                aria-required="true"
                />
                {errors.name && 
                <p className={style.errorMsg}>{errors.name.message}</p>}
            </div>

            <div className={style.labelGroup}>
                <label className={style.label}>
                    Email
                </label>
                <input
                id="email"
                className={style.formInput}
                {...register('email')}
                aria-required="true"
                />
                {errors.email && 
                <p className={style.errorMsg}>{errors.email.message}</p>}
            </div>

            <div>
                <label className={style.label}>
                    Phone
                </label>
                <input
                id="phone"
                className={style.formInput}
                {...register('phone')}
                aria-required="true"
                />
                {errors.phone && 
                <p className={style.errorMsg}>{errors.phone.message}</p>}
            </div>

            <div>
                <label className={style.label}>
                    Address
                </label>
                <input
                id="password"
                className={style.formInput}
                {...register('password')}
                aria-required="true"
                />
                {errors.password && 
                <p className={style.errorMsg}>{errors.password.message}</p>}
            </div>
            </div>

            <div>

            <div className={style.horizontalLine}></div>

                <h3 className={style.subTitleCart}>
                Payment method
                </h3>
                <p className={`${style.textCart} ${style.textCartPay}`}>
                You can pay us in a multiple way in our payment gateway system.
                </p>
                
                <div className={style.radioGroup}>
                    <div className={style.radioContainer}>
                    <input
                        type="radio"
                        value="cash"
                        checked={selectedOption === "cash"}
                        onChange={handleOptionChange}
                        className={style.radioInput}
                    />
                <label className={style.radioLabel}>
                    Cash On Delivery
                </label>
                </div>

                 <div className={style.radioContainer}>
                    <input
                        type="radio"
                        value="bank"
                        checked={selectedOption === "bank"}
                        onChange={handleOptionChange}
                        className={style.radioInput}
                    />
                <label className={style.radioLabel}>
                    Bank
                </label>
                </div>
            </div>

            <div className={style.horizontalLine}></div>

                <h3 className={style.subTitleCart}>
                Order details 
                </h3>
                <p className={style.textCart}>
                Shipping and additionnal costs are calculated 
                based on values you have entered.
                </p>
                </div>
                
                <div className={style.containerTotal}>
                <p className={style.total}>
                  Total:
                </p>
                  <span className={style.total}>
                    <svg width={24} height={24} className={style.iconParagrapf}>
                      <use xlinkHref={`${sprite}#icon-paragraph`} />
                  </svg>
                  {total.toFixed(2)}
                </span> 
                </div>
                <button type='submit' className={style.buttonCart}>Place order</button>
      </form>
      </div>
      </div>

    {/* Cart */}
      <div className={style.addContainer}>
      <ul className={style.listCart}>
    {items.length > 0 ? (
      items.map((item, index) => (
        <li key={`${item.id}-${index}`} className={style.itemCart}>
          <img
            className={style.imgCart}
            src={item.photo}
            alt={item.name}
            width={335}
          />
          <div className={style.infoCart}>
          <div className={style.info}>
                <EllipsisText
                className={style.textCart}
                text={item.name}
                length={12}
                />

              <div className={style.priceConteiner}>
                <svg width={18} height={18} className={style.iconParagrapf}>
                  <use xlinkHref={`${sprite}#icon-paragraph`} />
                </svg>
                   <p className={style.price}>{item.price}</p>
              </div>
            </div>

            <div className={style.btnCounter}>
            <Counter
            isPage2={false}
            quantity={item.quantity}
            onIncrement={() => handleIncrement(item.id, item.quantity)}
            onDecrement={() => handleDecrement(item.id, item.quantity)}
            productId={item.id}
            />
            <button
              className={style.removeButton}
              onClick={() => handleRemoveFromCart(item)}
            >
              Remove
            </button>
            </div>
            </div>
        </li>
      ))
    ) : (
      <div className={style.containerNotification}>
        <p className={style.notification}>No products available in cart</p>
      </div>
    )}
  </ul>
    </div>
    </section>
  )
};

export default Cart;
