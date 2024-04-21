import styles from './AuthPopup.module.scss'
import { Link } from 'react-router-dom'



const AuthPopup = () => {

    return (
        <div className={styles.authpopup}>
            <button>
                <Link to={'/login'}>Войти</Link>
            </button>
            <button>
                <Link to={'/register'}>Создать акк</Link>
            </button>
        </div>
    );
};

export default AuthPopup;