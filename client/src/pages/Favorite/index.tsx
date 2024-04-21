import { useSelector } from "react-redux"
import { useGetUserFavoritesQuery } from "../../app/services/auth"
import { selectUser } from "../../features/auth/authSlice"
import { BookListCards } from "../../components/BookListCards";
import { useGetBookListQuery } from "../../app/services/book";

const Favorite = () => {
  const user = useSelector(selectUser);
  const favorites = useGetUserFavoritesQuery({userId: user?.userId})
  const { data } = useGetBookListQuery({ id: user?.userId });
  const fd = data?.filter(el => favorites.data?.some(fav => fav.bookId === el.bookId));
  return (
    <div style={{marginTop: "100px"}}>
      <BookListCards forSomeAuthor={false} searchData={fd}/>
    </div>
  )
}

export default Favorite