import { useState } from 'react'
import BookList from '../../components/BookList'
import { SaleDiagram } from '../../components/SaleDiagram'
import styles from './AuthorCabinet.module.scss'

const AuthorCabinet = () => {
  const [isBookListOpen, setIsBookListOpen] = useState<boolean>(true);
  return (
    <div className={styles.authorCabinet}>
      <div className={styles.authorCabinet__changeButtons}>
        <button onClick={() => setIsBookListOpen(true)}>Список книг</button>
        <button onClick={() => setIsBookListOpen(false)}>Диаграмма продаж</button>
      </div>
      {isBookListOpen ? <BookList /> : <SaleDiagram />} 

      <div>
      </div>
    </div>
  )
}

export default AuthorCabinet