import { useParams } from "react-router-dom"
import { useGetBookByIdQuery } from "../../app/services/book";
import styles from './PreviewBook.module.scss';
import { AuthorLoad } from "../../components/AuthorLoad";
import ReactStars from "react-star-ratings";
import { useGetBookRatingsByIdQuery } from "../../app/services/bookInfo";
const PreviewBook = () => {
  const { bookId } = useParams();
  const book = useGetBookByIdQuery({ bookId: Number(bookId) })

  const ratings = useGetBookRatingsByIdQuery({ bookId: parseInt(bookId!) });

  let avgRating = 0;
  if (typeof ratings.data !== "undefined")
    avgRating = ratings.data?.reduce((prevVal, curVal) => prevVal += Number(curVal.value), 0) / ratings.data?.length;


  return (
    <div className={styles.preview}>
      <div className={styles.preview__info}>
        <div className={styles.preview__rating}>
          <ReactStars
            rating={avgRating}
            starDimension="23px"
            starRatedColor="#F0DC00"
            starSpacing="1px"
          />
          <div>
            <span>{ratings.data?.length} </span>
            <span>отзыва</span>
          </div>
        </div>

        <img src={book.data?.picture ?? ""} alt="" />

      </div>
      <div className={styles.preview__main}>
        <h1>{book.data?.bookName}</h1>
        <h3><span>Автор</span>
          <AuthorLoad authorId={1} />
        </h3>
        <h3>О книге<p><span>{book.data?.about}</span></p></h3>
        <h3>Описание<p><span>{book.data?.description}</span></p></h3>
      </div>
      <div className={styles.preview__buy}>
        <button>Оформить по подписке</button>
        <h2>{book.data?.cost} ₽</h2>
        <button>Купить и скачать</button>

        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 20 20">
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
          </svg>
          <div>
            Добавить в корзину
          </div></button>
      </div>
    </div>
  )
}

export default PreviewBook