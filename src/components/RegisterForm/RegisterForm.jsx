import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import style from './RegisterForm.module.css';

function RegisterForm() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver()
    });
    
  return (
    <section className={style.sectionRegisterForm}>
        <form className={style.formRegister} onSubmit={handleSubmit}>
            <div className={style.containerInput}>
            <div>
                <input 
                id="name"
                className={style.formInput}
                placeholder="User Name"
                {...register('name')}
                aria-required="true"
                />
                {errors.name && 
                <p className={style.errorMsg}>{errors.name.message}</p>}
            </div>
            <div>
                <input
                id="email"
                className={style.formInput}
                placeholder="Email adrress"
                {...register('email')}
                aria-required="true"
                />
                {errors.email && 
                <p className={style.errorMsg}>{errors.email.message}</p>}
            </div>
            <div>
                <input
                id="phone"
                className={style.formInput}
                placeholder="Phone number"
                {...register('phone')}
                aria-required="true"
                />
                {errors.phone && 
                <p className={style.errorMsg}>{errors.phone.message}</p>}
            </div>
            <div>
                <input
                id="password"
                className={style.formInput}
                placeholder="Password"
                {...register('password')}
                aria-required="true"
                />
                {errors.password && 
                <p className={style.errorMsg}>{errors.password.message}</p>}
            </div>
            </div>
            <button className={style.registerBtn} type="submit">Register</button>
            <p className={style.textForm}>Already have an account?</p>
        </form>
    </section>
  )
};

export default RegisterForm;
