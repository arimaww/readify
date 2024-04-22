import { useParams } from 'react-router-dom'
import { useGetAllCommentsForBookQuery, useGetAllRatingsQuery } from '../../app/services/bookInfo'
import { CommentItem } from '../CommentItem'
import styles from './CommentsList.module.scss'
import { useGetAllUsersQuery } from '../../app/services/auth'

export const CommentsList = () => {
    const { bookId } = useParams();
    const comments = useGetAllCommentsForBookQuery({ bookId: parseInt(bookId!) })
    const ratings = useGetAllRatingsQuery();

    const users = useGetAllUsersQuery();

    return (
        <div className={styles.commentList}>
            {comments.data?.map(comm => {
                return (
                    <CommentItem key={comm.commentId} comment={comm} users={users.data} ratings={ratings.data} />
                )
            })}
        </div>
    )
}