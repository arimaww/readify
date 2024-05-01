import { Link } from 'react-router-dom'
import styles from './PrevButton.module.scss' 
import { User } from '@prisma/client'

export const PrevButton = ({user}:{user:User | null}) => {
    return (
        <Link to={`/author_cabinet/${user?.userId}`} className={styles.prevButton}>Назад</Link>
    )
}