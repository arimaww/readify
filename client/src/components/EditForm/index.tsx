import ReactImageUploading from 'react-images-uploading'
import styles from './EditForm.module.scss'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { SubmitHandler, UseFormHandleSubmit, UseFormRegister} from 'react-hook-form'
import { ImageListType, TUserInputs } from '../../types'

interface IEditForm {
    avatar: ImageListType,
    onChange: (imageList: ImageListType) => void,
    resultUpdate: any,
    error: string,
    password: string,
    setPassword: (e:string) => void,
    dateOfBirth: string,
    repeatPassword: string,
    setRepeatPassword: (e:string) => void,
    handleSubmit: UseFormHandleSubmit<TUserInputs, undefined>,
    onSubmit: SubmitHandler<TUserInputs>,
    register: UseFormRegister<TUserInputs>
}

const EditForm = ({avatar, onChange, resultUpdate, error, password, setPassword, dateOfBirth, repeatPassword, setRepeatPassword, handleSubmit, onSubmit, register}:IEditForm) => {
    const user = useSelector(selectUser)
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Обновление данных</h2>
          <div className={styles.form__item}>
            <ReactImageUploading
              value={avatar!}
              onChange={onChange}
              maxNumber={1}
              dataURLKey="data_url"
            >{({
              imageList,
              onImageUpload,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <div className={styles.upload__image_wrapper}>
                <button type='button'
                  style={isDragging ? { color: 'green' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </button>
                &nbsp;
                {imageList.map((image, index) => (
                  <div key={index} className={styles.image}>
                    <img src={image['data_url']} alt="" className={styles.avatar} />
                    <div className="image-item__btn-wrapper">
                      <button onClick={() => onImageUpdate(index)} type='button'>Update</button>
                      <button onClick={() => onImageRemove(index)} type='button'>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}</ReactImageUploading>
          </div>
          {!avatar.length && (<div className={styles.form__item}>
            <img src={user?.profilePhoto!} alt="" className={styles.form__image} />
          </div>)}
          <div className={styles.form__item}>
            <label htmlFor="surName">Фамилия</label>
            <input type="text" id='surName' defaultValue={user?.surName} {...register("surName")} />
          </div>
          <div className={styles.form__item}>
            <label htmlFor="firstName">Имя</label>
            <input type="text" id='firstName' defaultValue={user?.firstName} {...register("firstName")} />
          </div>
          <div className={styles.form__item}>
            <label htmlFor="middleName">Отчество</label>
            <input type="text" id='middleName' defaultValue={user?.middleName} {...register("middleName")} />
          </div>
          <div className={styles.form__item}>
            <label htmlFor="email">Почта</label>
            <input type="email" id='email' defaultValue={user?.email} {...register("email")} />
          </div>
          <div className={styles.form__item}>
            <label htmlFor="phone">Телефон</label>
            <input type="phone" id='phone' defaultValue={user?.phone} {...register("phone")} />
          </div>
          <div className={styles.form__item}>
            <label htmlFor="password">Пароль</label>
            <input type="password" id='password' value={password} {...register("password")} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className={styles.form__item}>
            <label htmlFor="repeatPassword">Повтор пароля</label>
            <input type="password" id='repeatPassword' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
          </div>
          <div className={styles.form__item}>
            <label htmlFor="dateOfBirth">Дата рождения</label>
            <input type="date" id='dateOfBirth' defaultValue={dateOfBirth} {...register("dateOfBirth")} />
          </div>
          <button >
            {resultUpdate.isLoading ? "Загрузка..." : "Сохранить"}
          </button>
          {error ? (<p className={styles.form__error}>{error}</p>) : <p></p>}
        </form>
  )
}

export default EditForm