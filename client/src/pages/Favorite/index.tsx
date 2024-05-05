import { useSelector } from "react-redux"
import { useGetUserFavoritesQuery } from "../../app/services/favorite"
import { selectUser } from "../../features/auth/authSlice"
import { BookListCards } from "../../components/BookListCards";
import { useGetAllBooksQuery } from "../../app/services/book";
import { LoadingPage } from "../../components/LoadingPage";
import styles from './Favorite.module.scss'

const Favorite = () => {
  const user = useSelector(selectUser);
  const favorites = useGetUserFavoritesQuery({userId: user?.userId})
  const { data } = useGetAllBooksQuery();
  const fd = data?.filter(el => favorites.data?.some(fav => fav.bookId === el.bookId));

  if(!data || favorites.isLoading)
    return <LoadingPage />

  return (
    <div className={styles.favorite}>
      <h1>Избранное</h1>
      <BookListCards forSomeAuthor={false} searchData={fd}/>
    </div>
  )
}

export default Favorite