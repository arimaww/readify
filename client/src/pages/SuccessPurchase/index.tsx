import styles from './SuccessPurchase.module.scss'
import success from '../../assets/success.png';
import { Link } from 'react-router-dom';

export const SuccessPurchase = () => {
    return (
        <div className={styles.purchase}>
            <img src={success} alt="" />
            <div className={styles.purchase__content}>
                <h2>Покупка успешно подтверждена</h2>
                <div className={styles.purchase__buttons}>
                    <Link to={'/mypurchases'} className={styles.purchase__button}>Мои покупки</Link>
                    <Link to={'/'} className={styles.purchase__button}><span>Главная</span></Link>
                </div>
            </div>
        </div>
    )
}