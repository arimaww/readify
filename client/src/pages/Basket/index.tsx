import { useSelector } from "react-redux";
import { useGetUserBasketQuery, useRemoveBookFromUserBasketMutation } from "../../app/services/basket"
import { BasketBookList } from "../../components/BasketBookList"
import { selectUser } from "../../features/auth/authSlice";
import { useGetAllBooksQuery } from "../../app/services/book";
import { useGetUserFavoritesQuery, useUpdateMutation } from "../../app/services/auth";
import BasketBuy from "../../components/BasketBuy";
import styles from './Basket.module.scss'
import { useState } from "react";
import { useCreatePurchaseMutation } from "../../app/services/purchase";
import { Purchase } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useCreateSaleMutation } from "../../app/services/sale";

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
  const entryPrice = basketList?.reduce((val, acc) => val += acc.cost, 0)!;
  const [updateUserData] = useUpdateMutation();
  const [removeFromBasket] = useRemoveBookFromUserBasketMutation();
  const [createSale] = useCreateSaleMutation();
  
  const handlePurchaseBook = async (data: Omit<Purchase, "purchasedId">[]) => {
    try {
      if(Number(user?.wallet) < entryPrice)
        return enqueueSnackbar("Недостаточно средств на балансе", {variant: "error"});

      const formData = new FormData();
      formData.append("firstName", user?.firstName!)
      formData.append("surName", user?.surName!)
      formData.append("middleName", user?.middleName!)
      formData.append("email", user?.email!)
      formData.append("phone", user?.phone!)
      formData.append("password", user?.password!)
      let dateOfBirth = new Date(user?.dateOfBirth as Date).toISOString().substring(0, 10);
      formData.append("dateOfBirth", dateOfBirth);
      const wallet = Number(user?.wallet) - entryPrice
      formData.append("wallet", wallet.toString())
      
      data.map(async el => await purchaseBook(el).unwrap())
      data.map(async el => await removeFromBasket(el).unwrap())
      data.map(async el => await createSale({authorId: Number(book.data?.filter(b => b.bookId === el.bookId).map(e => e.authorId).join('')), bookId: el.bookId}).unwrap())
      await updateUserData(formData)

      enqueueSnackbar("Покупка успешно совершена", { variant: "success" })

      navigate('/success-purchase');
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
        <BasketBuy countOfBooks={basketList?.length!} fullPrice={entryPrice} clickPurchase={handlePurchaseBook} basketList={basketList} />
      </div> : <></>}
    </div>
  )
}