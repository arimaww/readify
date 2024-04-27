import { useSelector } from "react-redux";
import { useGetUserBasketQuery } from "../../app/services/basket"
import { BasketBookList } from "../../components/BasketBookList"
import { selectUser } from "../../features/auth/authSlice";
import { useGetAllBooksQuery } from "../../app/services/book";
import { useGetUserFavoritesQuery } from "../../app/services/auth";
import BasketBuy from "../../components/BasketBuy";
import styles from './Basket.module.scss'
import { useState } from "react";
import { useCreatePurchaseMutation } from "../../app/services/purchase";
import { Purchase } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export const Basket = () => {
  const [purchaseBook] = useCreatePurchaseMutation();
  const [error, setError] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  
  const basket = useGetUserBasketQuery();
  const user = useSelector(selectUser)
  const book = useGetAllBooksQuery()
  const basketList = book.data?.filter(book => basket.data?.some(el => book.bookId == el.bookId && el.userId == user?.userId));
  const favorites = useGetUserFavoritesQuery({ userId: user?.userId });
  const entryPrice = basketList?.reduce((val, acc) => val += acc.cost, 0);
  
  const handlePurchaseBook = async (data: Omit<Purchase, "purchasedId">[]) => {
    try {
      data.map(async el => await purchaseBook(el).unwrap())
      enqueueSnackbar("Покупка успешно совершена", { variant: "success" })

      navigate('/mypurchases');
    }
    catch (err) {
      if (isErrorWithMessage(err)) {
        setError(err.data.message);
      }
      else {
        setError("Произошла ошибка, повторите попытку позже")
      }
      enqueueSnackbar(error, { variant: "error" })
    }
  }

  return (
    <div className={styles.basket}>
      <h2>Моя корзина</h2>
      <div className={styles.basket__basketBookList}>
        <BasketBookList basketList={basketList} favorites={favorites.data} />
      </div>
      {basketList?.length! > 0 ? <div>
        <BasketBuy countOfBooks={basketList?.length!} fullPrice={entryPrice!} clickPurchase={handlePurchaseBook} basketList={basketList} />
      </div> : <></>}
    </div>
  )
}