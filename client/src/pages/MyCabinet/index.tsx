
import { useSelector } from 'react-redux'
import styles from './MyCabinet.module.scss'
import { selectUser } from '../../features/auth/authSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { UserData, useUpdateMutation } from '../../app/services/auth'
import { useSnackbar } from 'notistack'
import { Sidebar } from '../../components/Sidebar'
import { ImageListType } from 'react-images-uploading';
import { TUserInputs } from '../../types'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import EditForm from '../../components/EditForm'


const MyCabinet = () => {
  const user = useSelector(selectUser);
  let dateOfBirth = new Date(user?.dateOfBirth as Date).toISOString().substring(0, 10);
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<TUserInputs>();
  const [error, setError] = useState<string>("");
  const [update, resultUpdate] = useUpdateMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [avatar, setAvatar] = useState<ImageListType>([]);

  const updateUser = async (data: UserData & { profilePhoto: File | null }) => {
    try {
      setError("");
      const formData = new FormData();
      formData.append("firstName", data.firstName)
      formData.append("surName", data.surName)
      formData.append("middleName", data.middleName)
      formData.append("email", data.email)
      formData.append("phone", data.phone)
      formData.append("password", data.password)
      formData.append("dateOfBirth", dateOfBirth)
      formData.append("profilePhoto", avatar[0].file!)
      if (password !== repeatPassword)
        return setError("Введённые вами пароли не совпадают")
      await update(formData).unwrap();


      enqueueSnackbar("Данные успешно обновлены", { variant: "success" })
    }
    catch (err) {
      if (isErrorWithMessage(err)) {
        setError(err.data.message)
      }
      else {
        setError("Неизвестная ошибка");
      }
    }
  }
  const onSubmit: SubmitHandler<TUserInputs> = (data: TUserInputs) => updateUser(data as UserData & { profilePhoto: File })
  const onChange = (imageList: ImageListType) => setAvatar(imageList)


  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  return (
    <div className={styles.cabinet}>
      <Sidebar />
      <div className={styles.mycab}>

        <EditForm avatar={avatar}
          dateOfBirth={dateOfBirth}
          error={error}
          onChange={onChange}
          password={password}
          repeatPassword={repeatPassword}
          resultUpdate={resultUpdate}
          setPassword={setPassword}
          setRepeatPassword={setRepeatPassword}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
        />
      </div>
    </div>
  )
}

export default MyCabinet