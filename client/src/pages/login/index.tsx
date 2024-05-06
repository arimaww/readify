import { useNavigate } from 'react-router-dom'
import styles from './Login.module.scss'
import { useEffect, useState } from 'react';
import { selectUser } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux'
import { UserData, useIsLoginDataCorrectMutation, useLoginMutation } from '../../app/services/auth';
import { useForm, SubmitHandler } from 'react-hook-form'
import { isErrorWithMessage } from '../../utils/is-error-with-message';
import { useSnackbar } from 'notistack'
import { ConfirmCode } from '../../components/ConfirmCode';
import { isCodeCorrect } from './loginFunctions';
import { LoginForm } from '../../components/LoginForm';
import { useSendMailToUserMutation } from '../../app/services/mail';

type Inputs = {
  email: string
  password: string
}

const Login = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser)
  const [loginUser, loginUserResult] = useLoginMutation();
  const [isLoginDataCorrect] = useIsLoginDataCorrectMutation();
  const [email, setEmail] = useState<string>('');
  const [sendMail] = useSendMailToUserMutation();
  const [inputCode, setInputValue] = useState<string>('');
  const [code] = useState<number>(Math.floor(Math.random() * 100 * Math.random() * 100));
  const [error, setError] = useState<string>("");
  const [isConfirmOpened, setIsConfirmOpened] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<Inputs>();
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const login = async (data: UserData) => {
    try {
      setError("");
      await loginUser(data).unwrap();

      navigate('/');
      enqueueSnackbar("Вы успешно авторизовались", { variant: "success" })
    }
    catch (err: unknown) {
      if (isErrorWithMessage(err)) {
        setError(err.data.message);
      }
      else {
        setError("Неизвестная ошибка")
      }
    }
  }

  const isLoginUserDataCorrect = async (data: UserData) => {
    try {
      setError("");
      await isLoginDataCorrect(data as UserData).unwrap();

      setIsConfirmOpened(true);

    } catch (err: unknown) {
      if (isErrorWithMessage(err)) {
        setError(err.data.message);
      }
      else {
        setError("Неизвестная ошибка")
      }
    }
  }

  const sendMailToUser = async (code: number, toWhom: string) => {
    await sendMail({ code: code, toWhom: toWhom })
  }

  const onCheckCorrectData: SubmitHandler<Inputs> = data => {
    isLoginUserDataCorrect(data as UserData);
    if (error === '') {
      sendMailToUser(code, email)
        .catch(err => {
          console.log(err); if (err) return setError(err);
          else return setIsConfirmOpened(true)
        });
    }
  }

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    const res = isCodeCorrect(code, inputCode);
    if (res) {
      login(data as UserData)
    }
    else enqueueSnackbar("Неправильный код", { variant: "error" })
  }
  
  return (
    <div className={styles.login}>
      {isConfirmOpened ? <ConfirmCode inputCode={inputCode}
        setInputCode={setInputValue}
        code={code}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        styles={styles} /> :

        <LoginForm error={error} handleSubmit={handleSubmit} loginUserResult={loginUserResult} onCheckCorrectData={onCheckCorrectData}
          register={register} setEmail={setEmail} styles={styles} />}
    </div>
  )
}

export default Login