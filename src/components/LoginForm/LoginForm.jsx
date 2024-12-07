import style from './LoginForm.module.css';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

import { singInShema } from '../../shemas/singInShema';
import { formValuesSignIn } from '../../helpers/constants';
import { loginUser } from '../../redux/auth/operations';

import { yupResolver } from '@hookform/resolvers/yup';
import { tablet2x } from '../../shared/images/authorizePage/index';
import { shadow } from '../../shared/images/shadow/index';

function LoginForm() {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: formValuesSignIn,
    resolver: yupResolver(singInShema),
    mode: 'onTouched'
});

const onSubmit = async (data) => {
  try {
    await dispatch(loginUser(data)).unwrap();
    reset();  
    toast.success("Logged in successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Login failed. Please try again.");
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
            </div>
            <button className={style.loginBtn} type="submit">Log In</button>
            <p className={style.textForm}>Don't have an account?</p>
            <img className={style.imagesShadow} src={shadow} alt="shadow" />
        </form>
    </section>
  )
};

export default LoginForm;

