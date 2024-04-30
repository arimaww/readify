import { useState } from "react";
import { useGetAllBooksQuery } from "../../app/services/book";
import { BookListCards } from "../../components/BookListCards";
import SortPanel, { TOptions, TSortData } from "../../components/SortPanel";
import styles from './Home.module.scss';
import { useSelector } from "react-redux";
import { selectSearchValue } from "../../features/mainSearch/mainSearchSlice";
import { selectBooks } from "../../features/book/bookSlice";
import { useGetAllRatingsQuery } from "../../app/services/bookInfo";
import { Book } from "@prisma/client";

type TResultArray = {
  bookId: number;
  ratingValue: number;
};

const Home = () => {
  const bookList = useGetAllBooksQuery();
  const [selectedOption, setSelectedOption] = useState<TOptions>();
  let searchedData = useSelector(selectSearchValue);

  const ratings = useGetAllRatingsQuery();

  let res: Array<TResultArray> = [];
  if (bookList.data && ratings.data) {
    for (let i = 0; i < bookList.data?.length; i++) {
      res.push({
        bookId: bookList.data[i].bookId,
        ratingValue: ratings.data?.reduce((prevVal, curVal) => curVal.bookId === bookList.data![i].bookId ? prevVal += Number(curVal.value) : prevVal += 0, 0) / ratings.data?.length || 0
      });
    }
  }

  const [sortData, setSortData] = useState<TSortData>({
    format: "All",
    highEstimation: selectedOption?.value || null,
    language: null,
    withSubscription: null,
    discount: null,
  });

  let sortedBookList: Book[] = [];
  if (typeof bookList.data !== "undefined") {
    sortedBookList = [...bookList.data];

    if (sortData.format !== "All") {
      sortedBookList = sortedBookList.filter(book => book.typeId === (sortData.format === "Text" ? 1 : 2));
    }

    if (sortData.highEstimation) {
      sortedBookList.sort((a, b) => {
        const avgRatingA = res.find(item => item.bookId === a.bookId)?.ratingValue || 0;
        const avgRatingB = res.find(item => item.bookId === b.bookId)?.ratingValue || 0;
        return avgRatingB - avgRatingA;
      });
    } else {
      sortedBookList.sort((a, b) => {
        const avgRatingA = res.find(item => item.bookId === a.bookId)?.ratingValue || 0;
        const avgRatingB = res.find(item => item.bookId === b.bookId)?.ratingValue || 0;
        return avgRatingA - avgRatingB;
      });
    }

    if (sortData.language && sortData.language.length > 0) {
      const booksByLanguage: { [key: string]: Book[] } = {};
      for (const language of sortData.language) {
        booksByLanguage[language] = sortedBookList.filter(book => book.language === language);
      }
      sortedBookList = [];
      for (const language of sortData.language) {
        sortedBookList.push(...booksByLanguage[language]);
      }
    }
  }

  const selectBook: any = useSelector(selectBooks);
  if (searchedData)
    bookList.data = searchedData;
  else if (searchedData === null) {
    bookList.data = selectBook;
    searchedData = null;
  }

  return (
    <div className={styles.home}>
        <SortPanel
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setSortData={setSortData}
          sortData={sortData}
        />
        <BookListCards forSomeAuthor={false} searchData={sortedBookList ? sortedBookList : (searchedData !== null ? searchedData : bookList.data)} />
    </div>
  );
};

export default Home;
