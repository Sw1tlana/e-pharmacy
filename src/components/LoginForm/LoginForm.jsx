import style from './LoginForm.module.css';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import { signInSchema } from '../../shemas/signInShema';
import { formValuesSignIn } from '../../helpers/constants';
import { loginUser } from '../../redux/auth/operations';

import { yupResolver } from '@hookform/resolvers/yup';
import { tablet2x } from '../../shared/images/authorizePage/index';
import { shadow } from '../../shared/images/shadow/index';
import { Link } from 'react-router-dom';

function LoginForm() {

  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: formValuesSignIn,
    resolver: yupResolver(signInSchema),
    mode: 'onTouched'
});

console.log('Form errors:', errors);

const onSubmit = async (data) => {
    dispatch(loginUser(data)).unwrap();
    console.log('Submitted data:', data);
    toast.success("Logged in successfully!");
    reset();
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
            <Link className={style.textForm} to="/register">Don't have an account?</Link>
            <img className={style.imagesShadow} src={shadow} alt="shadow" />
        </form>
    </section>
  )
};

export default LoginForm;

