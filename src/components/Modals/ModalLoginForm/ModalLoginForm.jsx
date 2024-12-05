import style from './ModalLoginForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

function ModalLoginForm() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver()
    });

  return (
    <section className={style.sectionModal}>
        <h3 className={style.titleModalAuthorization}>
            Log in to your account
        </h3>
        <p className={style.textModalAuthorization}>
            Please login to your account before continuing.
        </p>
    <form className={style.containerInput} onSubmit={handleSubmit}>
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
        id="password"
        className={style.formInput}
        placeholder="Password"
        {...register('password')}
        aria-required="true"
        />
        {errors.password && 
        <p className={style.errorMsg}>{errors.password.message}</p>}
    </div>
    <button className={style.authorizationBtn} type="submit">Sing in</button>
    <p className={style.textForm}>Don't have an account?</p>
</form>
</section>
  )
};

export default ModalLoginForm;
