import style from './ModalRegisterForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'; 
import toast from 'react-hot-toast';

import { signUpSchema } from '../../../shemas/singUpShema';
import { formValuesSignUp } from '../../../helpers/constants';
import { registerUser } from '../../../redux/auth/operations';
import { useModalContext } from '../../../context/useModalContext.jsx';

function ModalRegisterForm() {
const dispatch = useDispatch();
const { closeModal } = useModalContext();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: formValuesSignUp,
        resolver: yupResolver(signUpSchema),
        mode: 'onTouched'
    });

    const onSubmit = (data) => {
        dispatch(registerUser(data));
        reset();
        closeModal();
    };

    useEffect(() => {
        const errorMessages = {
          password: ('signUpPage.passwordSpanError'),
          email: ('signUpPage.emailSpanError'),
          name: ('signUpPage.nameSpanError'),
          phone: ('Invalid phone number'),
        };
      
        for (const field in errorMessages) {
          if (errors[field]) {
            toast.error(errorMessages[field]);
            break;
          }
        }
      }, [errors]);

  return (
    <section className={style.sectionModal}>
        <h3 className={style.titleModalAuthorization}>Sign Up</h3>
        <p className={style.textModalAuthorization}>Before proceeding, please register on our site.</p>
    <form className={style.containerInput} onSubmit={handleSubmit(onSubmit)}>
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
    <Link className={style.textForm} to="/login">Already have an account?</Link>
</form>
</section>
  )
};

export default ModalRegisterForm;
