import styles from './BasketBuy.module.scss'


type TBasketBuy = {
  countOfBooks: number,
  fullPrice: number
}

const BasketBuy = ({countOfBooks, fullPrice}:TBasketBuy) => {
  return (
    <article className={styles.basketBuy}>
      <button className={styles.basketBuy__order_btn}>Перейти к оформлению</button>
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