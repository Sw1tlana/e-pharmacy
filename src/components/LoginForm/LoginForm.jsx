import style from './LoginForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import exampleImage from '../../shared/images/authorizePage/tablet@2x.png';
import shadowImage from '../../shared/images/authorizePage/shadow-form.png';

function LoginForm() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver()
});

  return (
    <section className={style.sectionLoginForm}>
        <div className={style.containerFormHomeInfo}>
        <img className={style.imagesFormLogin} src={exampleImage} alt="example" />
        <h2 className={style.titleFormLogin}>
            Your medication,  delivered Say goodbye to all<span className={style.spanColor}>your healthcare</span> worries with us
        </h2>
        </div>
        <form className={style.formLogin} onSubmit={handleSubmit}>
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
            <img className={style.imagesShadow} src={shadowImage} alt="shadow" />
        </form>
    </section>
  )
};

export default LoginForm;

