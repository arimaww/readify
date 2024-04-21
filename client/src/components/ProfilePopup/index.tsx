import styles from './ProfilePopup.module.scss'
import { logout, selectUser } from '../../features/auth/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack'
import { useChangeRoleMutation } from '../../app/services/admin';
import { UserData } from '../../app/services/auth';
import { useCallback } from 'react';


export const ProfilePopup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [changeRole, resultChangeRole] = useChangeRoleMutation();

    const onLogoutClick = () => {
        dispatch(logout());
        navigate('/login')
        localStorage.removeItem("token")
        enqueueSnackbar("Вы успешно вышли с аккаунта", { variant: "success" })
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
    return (
        <div className={styles.popup}>
            <Link to={'/mycab'}>
                Мой кабинет
            </Link>
            <Link to={'/support'}>
                Чат с поддержкой
            </Link>
            {!resultChangeRole.isSuccess ? user?.role === "USER" ? (<button onClick={onBeAuthorClick}>
                {resultChangeRole.isLoading ? "Загрузка..." : "Стать автором"}
            </button>) : "" : ""}
            <button onClick={onLogoutClick}>Выйти</button>
        </div>
    )
}
