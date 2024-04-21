import { useNavigate } from 'react-router-dom'
import styles from './Login.module.scss'
import { useEffect, useState } from 'react';
import { selectUser } from '../../features/auth/authSlice';
import {useSelector} from 'react-redux'
import { UserData, useLoginMutation } from '../../app/services/auth';
import {useForm, SubmitHandler} from 'react-hook-form'
import { isErrorWithMessage } from '../../utils/is-error-with-message';
import {useSnackbar} from 'notistack'

type Inputs = {
  email: string
  password: string
}

const Login = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser)
  const [loginUser, loginUserResult] = useLoginMutation();
  const [error, setError] = useState<string>("");
  const {register, handleSubmit} = useForm<Inputs>();
  const {enqueueSnackbar} = useSnackbar();


  useEffect(() => {
    if(user) {
      navigate('/')
    }
  }, [user, navigate])

  const login = async (data: UserData) => {
    try{
      setError("");
      await loginUser(data).unwrap();

      navigate("/");

      enqueueSnackbar("Вы успешно авторизировались", {variant: "success"})
    }
    catch(err:unknown) {
      if(isErrorWithMessage(err)) {
        setError(err.data.message);
      }
      else {
        setError("Неизвестная ошибка")
      }
    }
  }
  const onSubmit:SubmitHandler<Inputs> = data => login(data as UserData);

  
  return (
    <div className={styles.login}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Авторизация</h2>
        <div className={styles.form__item}>
          <label htmlFor="email">Почта</label>
          <input type="email" id='email' {...register("email")} />
        </div>
        <div className={styles.form__item}>
          <label htmlFor="password">Пароль</label>
          <input type="password" id='password' {...register("password")} />
        </div>
        <button>
          {loginUserResult.isLoading ? "Загрузка..." : "Войти"}
        </button>
        {error ? (<p className={styles.form__error}>{error}</p>) : <p></p>}
      </form>
    </div>

  )
}

export default Login