import styles from './LoadingPage.module.scss'
import { HashLoader } from "react-spinners";

export const LoadingPage = () => {
    return (
        <div className={styles.loadingPage}>
            <div>
                <HashLoader color="#36d7b7" />
            </div>
        </div>
    )
}