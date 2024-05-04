import styles from './ProfilePopup.module.scss'
import { logout, selectUser } from '../../features/auth/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack'
import { useChangeRoleMutation } from '../../app/services/admin';
import { UserData } from '../../app/services/auth';
import { useCallback } from 'react';


export const ProfilePopup = ({ setIsOpen }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [changeRole, resultChangeRole] = useChangeRoleMutation();

    const onLogoutClick = () => {
        dispatch(logout());
        navigate('/login')
        localStorage.removeItem("token")
        enqueueSnackbar("Вы успешно вышли с аккаунта", { variant: "success" })
        setIsOpen(false)
    }

    const user = useSelector(selectUser)

    const onBeAuthorClick = useCallback(async () => {
        try {
            await changeRole({ ...user as UserData, role: "AUTHOR" }).unwrap();
        }
        catch (err) {
            console.log(err);
        }
    }, [user?.role])
    const handleClick = () => (
        setIsOpen(false)
    )
    return (
        <div className={styles.popup}>
            <Link to={'/mycab'} onClick={handleClick} className={styles.popup__links}>
                Мой кабинет
            </Link>
            <Link to={'/support'} onClick={handleClick} className={styles.popup__links}>
                Чат с поддержкой
            </Link>
            <div className={styles.popup__wallet}>Баланс: {Number(user?.wallet)} ₽</div>
            {!resultChangeRole.isSuccess ? user?.role === "USER" ? (<button className={styles.popup__links} onClick={onBeAuthorClick}>
                {resultChangeRole.isLoading ? "Загрузка..." : "Стать автором"}
            </button>) : "" : ""}
            <button className={styles.popup__button} onClick={onLogoutClick}>Выйти</button>
        </div>
    )
}
