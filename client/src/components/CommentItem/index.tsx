import { Comments, Rating, User } from '@prisma/client'
import styles from './CommentItem.module.scss'
import StarRatings from 'react-star-ratings'

type TCommentItem = {
    comment: Comments | undefined,
    users: User[] | undefined,
    ratings: Rating[] | undefined
}

export const CommentItem = ({ comment, users, ratings }: TCommentItem) => {
    const commentOwner = users?.filter(el => comment?.userId === el.userId)
    const picture = commentOwner?.map(el => el.profilePhoto);
    const commentRating = ratings?.filter(el => el.userId == comment?.userId && el.bookId == comment?.bookId).map(el => el.value).join('');
    if (!commentRating && !commentOwner)
        return <div>Загрузка...</div>
    return (
        <div className={styles.commentItem}>
            <div className={styles.commentItem__about}>
                <div className={styles.commentItem__commentOwner}>
                    <img src={picture?.join()} alt="" />
                    <span>{commentOwner?.map(el => el.firstName + " " + el.middleName)}</span>
                </div>
                <div className={styles.commentItem__commentRating}>
                    <StarRatings rating={Number(commentRating)}
                        starDimension="18px"
                        starRatedColor="#F0DC00"
                        starSpacing="1px" />
                </div>
            </div>
            <p>{comment?.text}</p>
        </div>
    )
}