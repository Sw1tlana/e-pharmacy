import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import style from './RegisterForm.module.css';
import { tablet2x } from '../../shared/images/authorizePage/index';
import { shadow } from '../../shared/images/shadow/index';

function RegisterForm() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver()
    });
    
  return (
    <section className={style.sectionRegisterForm}>
        <div className={style.containerFormHomeInfo}>
        <img className={style.imagesFormRegister} src={tablet2x} alt="tablet2x" />
        <h2 className={style.titleFormRegister}>
            Your medication,  delivered Say goodbye to all<span className={style.spanColor}>your healthcare</span> worries with us
        </h2>
        </div>
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
            <img className={style.imagesShadow} src={shadow} alt="shadow" />
        </form>
    </section>
  )
};

export default RegisterForm;
