import style from './LoginForm.module.css';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signInSchema } from '../../shemas/signInShema';
import { formValuesSignIn } from '../../helpers/constants';
import { loginUser } from '../../redux/auth/operations';

import { yupResolver } from '@hookform/resolvers/yup';
import { tablet2x } from '../../shared/images/authorizePage/index';
import { shadow } from '../../shared/images/shadow/index';
import { Link } from 'react-router-dom';
import { useId, } from 'react';

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailId = useId();
  const passwordId = useId();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: formValuesSignIn,
    resolver: yupResolver(signInSchema),
    mode: 'onTouched'
});

const onSubmit = (formData) => {
  dispatch(loginUser({ email: formData.email, password: formData.password }));
  reset();
  navigate('/');
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
                type="email"
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
                type="password"
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

