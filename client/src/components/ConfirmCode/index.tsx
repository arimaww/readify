import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form"

type Inputs = {
    email: string
    password: string
  }
type TConfirmCode = {
    code: number,
    styles: CSSModuleClasses,
    handleSubmit: UseFormHandleSubmit<Inputs, undefined>,
    onSubmit: SubmitHandler<Inputs>,
    inputCode: string,
    setInputCode: React.Dispatch<React.SetStateAction<string>>
}

export const ConfirmCode = ({ styles, handleSubmit, onSubmit, inputCode, setInputCode }: TConfirmCode) => {

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form__item}>
                <label htmlFor="code">Код отправлен на ваш email</label>
                <input type="text" id="code" value={inputCode} onChange={e => setInputCode(e.currentTarget.value)}/>
                <button>Подтвердить</button>
            </div>
        </form>
    )
}