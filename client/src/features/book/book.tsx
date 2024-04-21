import { useGetBookByIdQuery } from '../../app/services/book'
import { useParams } from 'react-router-dom';

export const Book = ({children}: {children:JSX.Element}) => {
    const {bookId} = useParams();
    const {isLoading} = useGetBookByIdQuery({bookId: parseInt(bookId as string)});
    if(isLoading) return <div>Загружается</div>
    return children
}
