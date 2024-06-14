import { Book } from '@prisma/client'
import styles from './PurchasedBookList.module.scss'
import { Link } from 'react-router-dom'

type TPurchasedBookList = {
    books: Book[]
}
export const PurchasedBookList = ({ books }: TPurchasedBookList) => {
    return (
        <div className={styles.purchasedBookList}>
            {books?.map(book =>
                <div key={book.bookId} className={styles.purchasedBookList__item}>
                    <div className={styles.purchasedBookList__about}>
                        <Link to={`/previewBook/${book.bookId}`}>
                            <img src={book?.picture!} alt="" />
                        </Link>

                        <h3>{book.bookName}</h3>
                    </div>
                    <div className={styles.purchasedBookList__button}>
                        {book.typeId === 1 ? <Link to={book.file}>Читать</Link> : <Link to={`/listenbook/${book.bookId}`}>Слушать</Link>}
                    </div>
                </div>
            )}
        </div>
    )
}