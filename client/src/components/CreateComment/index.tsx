import StarRatings from 'react-star-ratings'
import styles from './CreateComment.module.scss'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useLeaveCommentMutation, useSetRatingMutation } from '../../app/services/bookInfo'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import { selectUser } from '../../features/auth/authSlice'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'


export const CreateComment = () => {
    const [rating, setRating] = useState<number>()
    const [leaveAComemnt] = useLeaveCommentMutation();
    const [setRatingForComment] = useSetRatingMutation();
    const [commentText, setCommentText] = useState<string>("")

    const user = useSelector(selectUser)
    const {bookId} = useParams();

    const {enqueueSnackbar} = useSnackbar();
    const handleSubmitComment = async (event:FormEvent) => {
        event.preventDefault();
        try{
            if(!rating)
                return enqueueSnackbar("Вы не поставили оценку", {variant: "warning"})
            if(!commentText || commentText == "")
                return enqueueSnackbar("Вы не написали комментарий", {variant: "warning"})
            await leaveAComemnt({userId: Number(user?.userId), bookId: Number(bookId), text: commentText}).unwrap();
            await setRatingForComment({userId: Number(user?.userId), bookId: Number(bookId), value: Number(rating)})
            enqueueSnackbar("Комментарий успешно добавлен", {variant: "success"})
        }
        catch(err) {
            if(isErrorWithMessage(err)) {
                enqueueSnackbar(err.data.message, {variant: "error"})
            }
            else {
                enqueueSnackbar("Ошибка добавления, повторите попытку позже", {variant: "error"})
            }
        }
    }

    return (
        <form className={styles.createComment} onSubmit={handleSubmitComment}>
            <h3>Оставить комментарий</h3>
            <textarea name="" id="" cols={30} rows={10} defaultValue={commentText} onChange={(event:ChangeEvent<HTMLTextAreaElement>) => setCommentText(event.currentTarget.value)}></textarea>
            <StarRatings
                changeRating={val => setRating(val)}
                rating={rating}
                starDimension="29px"
                starRatedColor="#F0DC00"
                starSpacing="1px" />
            <button>Написать комментарий</button>
        </form>
    )
}