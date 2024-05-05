import { Book, Purchase } from '@prisma/client'
import styles from './BasketBuy.module.scss'
import { LoadingPage } from '../LoadingPage'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { SnackbarKey } from 'notistack'


type TBasketBuy = {
  countOfBooks: number,
  fullPrice: number,
  clickPurchase: (data: Omit<Purchase, "purchasedId">[]) => Promise<SnackbarKey | undefined>
  basketList: Book[] | undefined,
}
type Sd = Omit<Purchase, "purchasedId">[]
const BasketBuy = ({countOfBooks, fullPrice, clickPurchase, basketList}:TBasketBuy) => {
  let willBePurchased:Sd = []
  const user = useSelector(selectUser);
  if(!basketList) return <LoadingPage />
  for(let i = 0; i < basketList?.length; i++) {
    willBePurchased.push({bookId: basketList[i].bookId, userId: Number(user?.userId)})
  }

  return (
    <article className={styles.basketBuy}>
      <button className={styles.basketBuy__order_btn} onClick={() => clickPurchase(willBePurchased)}>Совершить покупку</button>
      <p className={styles.basketBuy__access_way}>Доступные способы оплаты можно выбрать при оформлении заказа</p>
      <div>
        <div className={styles.basketBuy__mybasket}>
          <h3>Ваша корзина</h3>
          <span>{countOfBooks} <span>шт.</span></span>
        </div>

        <div className={styles.basketBuy__books}>
          <h3>Книги</h3>
          <span>{fullPrice}
          <span>₽</span></span>
        </div>

        <div className={styles.basketBuy__discount}>
          <h3>Скидка</h3>
          <span>нет <span>₽</span></span>
        </div>
        <a href="#">Подробнее</a>
      </div>
    </article>
  )
}

export default BasketBuy