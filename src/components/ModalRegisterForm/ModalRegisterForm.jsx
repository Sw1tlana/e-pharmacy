import style from './ModalRegisterForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export default function ModalRegisterForm() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver()
    });

  return (
    <section className={style.sectionModal}>
        <h3 className={style.titleModalAuthorization}>Sign Up</h3>
        <p className={style.textModalAuthorization}>Before proceeding, please register on our site.</p>
    <form onSubmit={handleSubmit}>
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
    <button className={style.authorizationBtn} type="submit">Sing Up</button>
    <p className={style.textForm}>Already have an account?</p>
</form>
</section>
  )
}
