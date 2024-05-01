import { useDeleteBookMutation, useGetBookListQuery } from "../../app/services/book"
import { Link, useParams } from "react-router-dom"
import styles from './BookList.module.scss'
import { isErrorWithMessage } from "../../utils/is-error-with-message"
import { useSnackbar } from "notistack"
import SearchBook from "../SearchBook"
import { useState } from "react"
import { BookListCards } from "../BookListCards"

const BookList = () => {
  const params = useParams<{ id: string }>()
  const { data } = useGetBookListQuery({ id: parseInt(params.id as string) });
  const [deleteBook] = useDeleteBookMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [search, setSearch] = useState<string>("");
  const searchData = data?.filter(book => book.bookName.includes(search));

  const onDeleteButtonClick = async (bookId: number):Promise<void> => {
    try {
      await deleteBook({ bookId: bookId }).unwrap();

      enqueueSnackbar("Книга успешно удалена", { variant: "success" });

    }
    catch (err) {
      if (isErrorWithMessage(err)) {
        enqueueSnackbar("Ошибка удаления", { variant: "error" });
      }
    }
  }

  return (
    <div className={styles.books}>
      <div className={styles.books__header}>
        <h1>Список моих книг</h1>
        <Link to={'/addbook'}>Добавить</Link>
      </div>
      <SearchBook search={search} setSearch={setSearch} />
      <BookListCards 
        onDeleteButtonClick={onDeleteButtonClick} 
        searchData={searchData}
        forSomeAuthor={true}
        />
    </div>
  )
}

export default BookList