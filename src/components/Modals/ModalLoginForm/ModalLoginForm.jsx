import style from './ModalLoginForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { signInSchema } from '../../../shemas/signInShema.js';
import { formValuesSignIn } from '../../../helpers/constants.js';
import { loginUser } from '../../../redux/auth/operations.js';

function ModalLoginForm() {
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: formValuesSignIn,
        resolver: yupResolver(signInSchema),
        mode: 'onTouched'
    });

    const onSubmit = async (data) => {
        console.log("Submitted data:", data); 
          await dispatch(loginUser(data)).unwrap();
          reset();
      };

  return (
    <section className={style.sectionModal}>
        <h3 className={style.titleModalAuthorization}>
            Log in to your account
        </h3>
        <p className={style.textModalAuthorization}>
            Please login to your account before continuing.
        </p>
    <form className={style.containerInput} onSubmit={handleSubmit(onSubmit)}>
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
    <Link className={style.textForm} to="/register">Don't have an account?</Link>
</form>
</section>
  )
};

export default ModalLoginForm;
