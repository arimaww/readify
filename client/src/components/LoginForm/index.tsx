import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"

type Inputs = {
    email: string
    password: string
}

type TLoginForm = {
    handleSubmit: UseFormHandleSubmit<Inputs, undefined>
    onCheckCorrectData: SubmitHandler<Inputs>
    styles: CSSModuleClasses
    setEmail: React.Dispatch<React.SetStateAction<string>>
    register: UseFormRegister<Inputs>
    loginUserResult: any
    error: string
}
export const LoginForm = ({ handleSubmit, onCheckCorrectData, styles, setEmail, register, loginUserResult, error }: TLoginForm) => {
    return (
        <form onSubmit={handleSubmit(onCheckCorrectData)}
            className={styles.form}>
            <h2>Авторизация</h2>
            <div className={styles.form__item}>
                <label htmlFor="email">Почта</label>
                <input type="email" id='email' {...register("email")} required onChange={e => setEmail(e.currentTarget.value)} />
            </div>
            <div className={styles.form__item}>
                <label htmlFor="password">Пароль</label>
                <input type="password" id='password' {...register("password")} required />
            </div>
            <button>
                {loginUserResult.isLoading ? "Загрузка..." : "Войти"}
            </button>
            {error ? (<p className={styles.form__error}>{error}</p>) : <p></p>}
        </form>
    )

}