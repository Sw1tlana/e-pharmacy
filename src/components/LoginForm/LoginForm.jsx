import style from './LoginForm.module.css';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { signInSchema } from '../../shemas/signInShema';
import { formValuesSignIn } from '../../helpers/constants';
import { loginUser, refreshUser } from '../../redux/auth/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

import { yupResolver } from '@hookform/resolvers/yup';
import { tablet2x } from '../../shared/images/authorizePage/index';
import { shadow } from '../../shared/images/shadow/index';
import { Link } from 'react-router-dom';
import { useId, } from 'react';

function LoginForm() {

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoggedIn);

  const emailId = useId();
  const passwordId = useId();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: formValuesSignIn,
    resolver: yupResolver(signInSchema),
    mode: 'onTouched'
});

const onSubmit = async (data) => {
  console.log("Form data being submitted:", data);
  try {
    await dispatch(loginUser(data)).unwrap();
    toast.success("Login successful");
    reset();
  } catch (error) {
    console.error("Login failed:", error);
  }
};

  return (
    <section className={style.sectionLoginForm}>
        <div className={style.containerFormHomeInfo}>
        <img className={style.imagesFormLogin} src={tablet2x} alt="tablet2x" />
        <h2 className={style.titleFormLogin}>
            Your medication,  delivered Say goodbye to all<span className={style.spanColor}>your healthcare</span> worries with us
        </h2>
        </div>
        <form className={style.formLogin} onSubmit={handleSubmit(onSubmit)}>
            <div className={style.containerInput}>
            <div>
                <input
                id={emailId}
                name="email"
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
                id={passwordId}
                name="password"
                className={style.formInput}
                placeholder="Password"
                {...register('password')}
                aria-required="true"
                />
                {errors.password && 
                <p className={style.errorMsg}>{errors.password.message}</p>}
            </div>
            </div>
            <button className={style.loginBtn} type="submit">Log In</button>
            <Link className={style.textForm} to="/register">Don't have an account?</Link>
            <img className={style.imagesShadow} src={shadow} alt="shadow" />
        </form>
    </section>
  )
};

export default LoginForm;

