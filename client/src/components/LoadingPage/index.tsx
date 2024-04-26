import styles from './LoadingPage.module.scss'
import { Circles } from 'react-loader-spinner'

export const LoadingPage = () => {
    return (
        <div className={styles.loadingPage}>
            <div>
                <Circles height={140} width={140} />
            </div>
        </div>
    )
}