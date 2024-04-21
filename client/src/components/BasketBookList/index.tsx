import { Book, Favorite } from "@prisma/client"
import { useGetAllTypesQuery } from "../../app/services/book"
import { useSelector } from "react-redux"
import { selectUser } from "../../features/auth/authSlice"
import { TData } from "../BookListCards"
import { useState } from "react"
import { useAddToFavoriteMutation, useRemoveFromFavoriteMutation } from "../../app/services/auth"
import { isErrorWithMessage } from "../../utils/is-error-with-message"
import styles from './BasketBookList.module.scss'
import { BasketResultData, useAddToUserBasketMutation, useRemoveBookFromUserBasketMutation } from "../../app/services/basket"


type TBasketList = {
  basketList: Book[] | undefined,
  favorites: Favorite[] | undefined
}
export const BasketBookList = ({ basketList, favorites }: TBasketList) => {
  const types = useGetAllTypesQuery();
  const user = useSelector(selectUser)
  const [_, setError] = useState<string>("");
  const [addToFavorite] = useAddToFavoriteMutation();
  const [removeFromFavorite] = useRemoveFromFavoriteMutation();
  const [basket] = useAddToUserBasketMutation();
  const [removeFromBasket] = useRemoveBookFromUserBasketMutation();


  const handleAddToFavorite = async (data: TData) => {
    try {
      setError("");
      await addToFavorite(data).unwrap();
    }
    catch (err) {
      if (isErrorWithMessage(err)) {
        setError(err.data.message);
      }
      else {
        setError("Неизвестная ошибка")
      }
    }
  }

  const handleRemoveFromFavorite = async (data: TData) => {
    try {
      setError("");
      await removeFromFavorite(data).unwrap();
    }
    catch (err) {
      if (isErrorWithMessage(err)) {
        setError(err.data.message);
      }
      else {
        setError("Неизвестная ошибка")
      }
    }
  }


  const handleBasketSubmit = async (data: BasketResultData) => {
    try {
      setError("");

      await basket(data).unwrap();

    }
    catch (err) {
      if (isErrorWithMessage(err)) {
        setError(err.data.message);
      }
      else {
        setError("Неизвестная ошибка");
      }
    }
  }

  const handleRemoveFromBasket = async (data: BasketResultData) => {
    try {
      setError("");

      await removeFromBasket(data).unwrap();
    }
    catch (err) {
      if (isErrorWithMessage(err)) {
        setError(err.data.message);
      }
      else {
        setError("Неизвестная ошибка")
      }
    }
  }

  return (
    <div className={styles.book_list}>
      {basketList?.map(book => (
        <div key={book.bookId} className={styles.book_list__item}>
          <img src={book.picture!} alt="" />
          <div className={styles.book_list__about}>
            <h3>{book.bookName}</h3>
            <h3>{book.cost}</h3>
            <h3>Тип: {types.data?.filter(el => el.typeId === book.typeId).map(el => el.typeName)}</h3>
            <div className={styles.book_list__buttons}>
              {favorites?.some(el => el.bookId === book.bookId) ? <i style={{ cursor: "pointer" }} onClick={() => handleRemoveFromFavorite({ userId: user?.userId, bookId: book.bookId })} className={`bi bi-heart-fill ${styles.book_list__add_favorite}`}></i>
                : (<i style={{ cursor: "pointer" }} onClick={() => handleAddToFavorite({ userId: user?.userId, bookId: book.bookId })} className={`bi bi-heart ${styles.book_list__remove_favorite}`}></i>)}


              {basketList?.some(el => el.bookId === book.bookId) ? <button className={styles.book_list__btn} onClick={() => handleRemoveFromBasket({ bookId: book.bookId, userId: user?.userId! })}>Убрать с <i className={`bi bi-bag ${styles.btn_buy}`}></i></button> :
                (<button onClick={() => handleBasketSubmit({ bookId: book.bookId, userId: user?.userId! })}>В корзину<i className={`bi bi-bag ${styles.btn_buy}`}></i></button>)}
            </div>


          </div>
        </div>

      ))}

    </div>
  )
}
