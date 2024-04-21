import BookList from '../../components/BookList'
import styles from './AuthorCabinet.module.scss'

const AuthorCabinet = () => {
  return (
    <div className={styles.authorCabinet}>
        <BookList />
    </div>
  )
}

export default AuthorCabinet