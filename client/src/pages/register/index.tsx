import { useNavigate } from 'react-router-dom'
import { UserData, useRegisterMutation } from '../../app/services/auth'
import styles from './Register.module.scss'
import {useForm, SubmitHandler} from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import {useSnackbar} from 'notistack'

type Inputs = {
    surName: string
    firstName: string
    middleName: string
    email: string
    phone: string
    password: string
    dateOfBirth: Date
}

const Register = () => {

    const {register, handleSubmit} = useForm<Inputs>();
    const [registerUser, registerUserResult] = useRegisterMutation();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [error, setError] = useState<string>("");
    const {enqueueSnackbar} = useSnackbar();


    useEffect(() => {
        if(user) {
            navigate('/')
        }
    }, [user, navigate])

    const uRegister = async(data:UserData) => {
        try{
          setError("");
            await registerUser(data).unwrap();

            navigate("/");
            enqueueSnackbar("Вы успешно зарегистрировались", {variant: "success"})
        }
        catch(err:unknown) {
            
            if(isErrorWithMessage(err)) {
                setError(err.data.message);
            }
            else {
                setError("Неизвестная ошибка");
            }
        }
    }

    const onSubmit:SubmitHandler<Inputs> = data => uRegister(data as UserData)

  return (
    <div className={styles.register}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Регистрация</h2>
        <div className={styles.form__item}>
          <label htmlFor="surName">Фамилия</label>
          <input type="text" id='surName' {...register("surName")}/>
        </div>
        <div className={styles.form__item}>
          <label htmlFor="firstName">Имя</label>
          <input type="text" id='firstName' {...register("firstName")}/>
        </div>
        <div className={styles.form__item}>
          <label htmlFor="middleName">Отчество</label>
          <input type="text" id='middleName' {...register("middleName")}/>
        </div>
        <div className={styles.form__item}>
          <label htmlFor="email">Почта</label>
          <input type="email" id='email' {...register("email")}/>
        </div>
        <div className={styles.form__item}>
          <label htmlFor="phone">Телефон</label>
          <input type="phone" id='phone' {...register("phone")}/>
        </div>
        <div className={styles.form__item}>
          <label htmlFor="password">Пароль</label>
          <input type="password" id='password' {...register("password")}/>
        </div>
        <div className={styles.form__item}>
          <label htmlFor="repeatPassword">Повтор пароля</label>
          <input type="password" id='repeatPassword'/>
        </div>
        <div className={styles.form__item}>
          <label htmlFor="dateOfBirth">Дата рождения</label>
          <input type="date" id='dateOfBirth' {...register("dateOfBirth")}/>
        </div>
        <button>
          {registerUserResult.isLoading ? "Загрузка..." : "Зарегистрироваться"}
        </button>
        {error ? (<p className={styles.form__error}>{error}</p>) : <p></p>}
        
      </form>
    </div>
  )
}

export default Register