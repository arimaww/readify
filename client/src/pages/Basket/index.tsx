import { useSelector } from "react-redux";
import { useGetUserBasketQuery } from "../../app/services/basket"
import { BasketBookList } from "../../components/BasketBookList"
import { selectUser } from "../../features/auth/authSlice";
import { useGetBookListQuery } from "../../app/services/book";
import { useGetUserFavoritesQuery } from "../../app/services/auth";
import BasketBuy from "../../components/BasketBuy";
import styles from './Basket.module.scss'

export const Basket = () => {
  const basket = useGetUserBasketQuery();
  const user = useSelector(selectUser)
  const book = useGetBookListQuery({ id: user?.userId })
  const basketList = book.data?.filter(book => basket.data?.some(el => book.bookId == el.bookId));
  const favorites = useGetUserFavoritesQuery({ userId: user?.userId });
  const entryPrice = basketList?.reduce((val, acc) => val += acc.cost, 0);

  return (
    <div className={styles.basket}>
      <h2>Моя корзина</h2>
      <div className={styles.basket__basketBookList}>
        <BasketBookList basketList={basketList} favorites={favorites.data} />
      </div>
      <div>
        <BasketBuy countOfBooks={basketList?.length!} fullPrice={entryPrice!} />
      </div>
    </div>
  )
}