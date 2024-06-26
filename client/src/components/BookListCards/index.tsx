import styles from './BookListCards.module.scss'
import { Book } from '@prisma/client'
import { Link } from 'react-router-dom'
import { useAddToFavoriteMutation, useGetUserFavoritesQuery, useRemoveFromFavoriteMutation } from '../../app/services/favorite'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import { useState } from 'react'
import { BasketResultData, useAddToUserBasketMutation, useGetUserBasketQuery, useRemoveBookFromUserBasketMutation } from '../../app/services/basket'
import { useGetBookListQuery } from '../../app/services/author'
import { useSnackbar } from 'notistack'
import { LoadingPage } from '../LoadingPage'

type TBookListCards = {
    searchData: Book[] | undefined,
    onDeleteButtonClick?: (book: number) => void
    forSomeAuthor: boolean
}

export type TData = {
    userId: number | undefined,
    bookId: number
}


export const BookListCards = ({ searchData, onDeleteButtonClick, forSomeAuthor }: TBookListCards) => {
    const [addToFavorite] = useAddToFavoriteMutation();
    const [removeFromFavorite] = useRemoveFromFavoriteMutation();
    const user = useSelector(selectUser);
    const [_, setError] = useState<string>("");
    const [basket] = useAddToUserBasketMutation();

    const [removeFromBasket] = useRemoveBookFromUserBasketMutation();

    const baskets = useGetUserBasketQuery();

    const bask = baskets.data?.filter(book => book.userId === user?.userId)

    const { enqueueSnackbar } = useSnackbar();

    let bookList = null;

    if (user?.role === "AUTHOR")
        bookList = useGetBookListQuery({ id: user?.userId })


    const handleBasketSubmit = async (resultData: BasketResultData) => {
        try {
            setError("");
            if (user?.role === "AUTHOR") {
                if (bookList?.data?.some(el => el.bookId === resultData.bookId)) {
                    return enqueueSnackbar("Вы не можете купить собственную книгу", { variant: "info" })
                }
            }
            await basket(resultData).unwrap();
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

    const favorites = useGetUserFavoritesQuery({ userId: user?.userId });

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

    if(!searchData?.map) return <LoadingPage />


    return (
        <div className={styles.books__cards}>
            {searchData?.map(book => (
                <div key={book?.bookId} className={styles.books__card} >

                    <Link to={`/previewBook/${book.bookId}`}>
                        <img src={book.picture!} alt="picture" />
                    </Link>
                    <h3>{book?.bookName}</h3>
                    <p>Стоимость: {book?.cost} ₽</p>
                    {forSomeAuthor ? (<div className={styles.authorsBook}>
                        <button type="button" onClick={() => onDeleteButtonClick!(book.bookId)}>Удалить</button>
                        <Link to={`/edit/${book.bookId}`}>Изменить</Link>
                    </div>) : <div>
                        {favorites.data?.some(el => el.bookId === book.bookId) ? <i style={{ cursor: "pointer" }} onClick={() => handleRemoveFromFavorite({ userId: user?.userId, bookId: book.bookId })} className={`bi bi-heart-fill ${styles.remove_favorite}`}></i>
                            : (<i style={{ cursor: "pointer" }} onClick={() => handleAddToFavorite({ userId: user?.userId, bookId: book.bookId })} className={`bi bi-heart ${styles.add_to_favorite}`}></i>)}

                        {bask?.some(el => el.bookId === book.bookId) ? <button style={{ backgroundColor: 'red' }} onClick={() => handleRemoveFromBasket({ bookId: book.bookId, userId: user?.userId! })}>Убрать с <i className={`bi bi-bag ${styles.btn_buy}`}></i></button> :
                            (<button onClick={() => handleBasketSubmit({ bookId: book.bookId, userId: user?.userId! })}>В корзину<i className={`bi bi-bag ${styles.btn_buy}`}></i></button>)}
                    </div>}
                </div>
            ))}
        </div>
    )
}
