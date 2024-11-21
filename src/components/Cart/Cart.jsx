import style from './Cart.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

function Cart() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver()
    });

    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        reset();
      };

  return (
    <section className={style.sectionCart}>
        <h2 className={style.titleCart}>Cart</h2>
        <div className={style.containerCart}>
            <h3 className={style.subTitleCart}>
            Enter shipping info 
            </h3>
            <p className={style.textCart}>
            Enter your delivery address where you get the product.
            You can also send any other location where you send the products.
            </p>

            <form>
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
            </div>

            <div>
                <h3 className={style.subTitleCart}>
                Order details 
                </h3>
                <p className={`${style.textCart} ${style.textCartPay}`}>
                Shipping and additionnal costs are calculated 
                based on values you have entered.
                </p>
                <div></div>
                <button type='submit' className={style.buttonCart}>Place order</button>
            </div>
      </form>
      </div>

    </section>
  )
};

export default Cart;
