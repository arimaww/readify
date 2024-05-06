import { Chart as ChartJS, registerables } from 'chart.js';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/favorite/favoriteSlice';
import { useGetAllBooksQuery } from '../../app/services/book';
import { useGetSalesQuery } from '../../app/services/sale';
import { BarGraph } from '../BarGraph';

ChartJS.register(...registerables);

export const SaleDiagram = () => {
    const user = useSelector(selectUser);
    const authorBookList = useGetAllBooksQuery();
    const allSales = useGetSalesQuery();
    const bookNames = authorBookList.data?.filter(book => user?.userId === book.authorId).map(e => e.bookName);
    const authorBooks = allSales.data?.filter(sale => sale.authorId === user?.userId)!;
    const booksSoldCount: { [key: string]: number } = {};
    authorBooks?.forEach(book => {
        if (!booksSoldCount.hasOwnProperty(book.bookId)) {
            booksSoldCount[book.bookId] = 0;
        }
    });
    allSales.data?.forEach(sale => {
        if (booksSoldCount.hasOwnProperty(sale.bookId)) {
            booksSoldCount[sale.bookId]++;
        }
    });

    return <BarGraph labels={bookNames} data={Object.values(booksSoldCount)} />;
};