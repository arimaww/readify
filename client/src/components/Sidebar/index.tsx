import { Link, useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.scss'
import Modal from 'react-modal'
import { useEffect, useState } from 'react';
import { UserData, useDeleteUserMutation } from '../../app/services/auth';
import { isErrorWithMessage } from '../../utils/is-error-with-message';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { selectAdmin } from '../../features/admin/adminSlice';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

type TSiderar = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Sidebar = ({setIsMenuOpen}:TSiderar) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteUser, resultDeleteUser] = useDeleteUserMutation();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const user = useSelector(selectUser)

  const admin = useSelector(selectAdmin);

  useEffect(() => {
    if(!user) navigate('/login')
  }, [user, navigate])


  const deletes = async (data:UserData) => {
    try{
      await deleteUser(data).unwrap();

      navigate('/')

      enqueueSnackbar("Вы успешно удалили свой аккаунт", {variant: "success"})
      localStorage.removeItem("token")
    }
    catch(err) {
      if(isErrorWithMessage(err)) {
        setError(error);
      }
      else {
        setError("Неизвестная ошибка")
      }
    }
  }
  return (
    <div className={styles.sidebar}>
        <div className={styles.sidebar__items}>
          <Link to={'/mycab'}>Личные данные</Link>
          <Link to={'/'}>Интересы</Link>
          <Link to={'/favorite'}>Избранное</Link>
          <Link to={'/mypurchases'}>Мои покупки</Link>
          {admin?.role === "AUTHOR" || user?.role === "AUTHOR" ? <Link to={`/author_cabinet/${user?.userId}`}>Кабинет автора</Link> : ""}
          <Link to={'/'}>Частые вопросы</Link>
          <Link to={'/'}>Чат с поддержкой</Link>
          <button onClick={() => {setIsOpen(true); setIsMenuOpen(false)}}>
            {resultDeleteUser.isLoading ? "Ожидание..." : "Удалить профиль"}
          </button>
          <Modal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
            <h3>Вы уверены, что хотите удалить свой аккаунт?</h3>
            <div className={styles.modal__btns}>
              <button type='button' onClick={() => {deletes(user as UserData); setIsOpen(false)}}>Удалить</button>
              <button onClick={() => setIsOpen(false)}>Отменить</button>
            </div>
          </Modal>
          
        </div>
    </div>
  )
}
