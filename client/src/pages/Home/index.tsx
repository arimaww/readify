import { useState } from "react";
import { useGetAllBooksQuery } from "../../app/services/book"
import { BookListCards } from "../../components/BookListCards"
import SortPanel, { TOptions, TSortData } from "../../components/SortPanel";
import styles from './Home.module.scss'
import { useSelector } from "react-redux";
import { selectSearchValue } from "../../features/mainSearch/mainSearchSlice";
import { selectBooks } from "../../features/book/bookSlice";


const Home = () => {
  const bookList = useGetAllBooksQuery();
  const [selectedOption, setSelectedOption] = useState<TOptions>();
  const searchedData = useSelector(selectSearchValue);
  const [sortData, setSortData] = useState<TSortData>({
    format: "All",
    highEstimation: selectedOption?.value || null,
    language: {},
    withSubscription: null,
    discount: null
  });

  let sortedBookList: any = [];
  if (typeof bookList.data !== "undefined") {
    for (let i = 0; i < bookList?.data?.length; i++) {
      if (sortData.format === "All")
        sortedBookList = bookList.data;

      else if (bookList?.data[i].typeId === (sortData.format === "Text" ? 1 : 2)) {
        sortedBookList.push(bookList?.data[i])
      }
    }
  }
  const selectBook:any = useSelector(selectBooks)
  if (searchedData)
    bookList.data = searchedData
  else if(searchedData === null)
    bookList.data = selectBook

  return (
    <div className={styles.home}>
      <div>
        <SortPanel selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setSortData={setSortData}
          sortData={sortData} />
      </div>
      <div>
        <BookListCards forSomeAuthor={false} searchData={sortedBookList.length > 0 ? sortedBookList : (searchedData ? searchedData : bookList.data)} />
      </div>
    </div>
  )
}

export default Home