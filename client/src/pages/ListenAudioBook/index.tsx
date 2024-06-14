import { useParams } from 'react-router-dom';
import styles from './ListenAudioBook.module.scss'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useGetAllBooksQuery } from '../../app/services/book';
import { LoadingPage } from '../../components/LoadingPage';


export const ListenAudioBook = () => {
    const { id } = useParams();
    const books = useGetAllBooksQuery().data;
    const queryBook = books?.filter(book => book.bookId === parseInt(id!));
    if (!queryBook)
        return <LoadingPage />
    return (
        <div className={styles.listen}>
            <div>
                <h1>{queryBook[0].bookName}</h1>
                <img className={styles.image} src={queryBook![0].picture!} alt="" />
            </div>
            <AudioPlayer
                style={styles}
                autoPlay
                src={queryBook[0].file}
            />
        </div>
    )
}