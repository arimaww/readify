import { api } from "./api";
import { Comments, Rating } from "@prisma/client";

export type ResponseBookRatingsData = Rating
export type ResponseCommentsData = Comments

export const bookInfoApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBookRatingsById: builder.query<ResponseBookRatingsData[], { bookId: number }>({
            query: (data) => ({
                url: "/bookInfo/getratings",
                body: data,
                method: "POST"
            })
        }),
        setRating: builder.mutation<ResponseBookRatingsData, { userId: number, bookId: number, value: number }>({
            query: (data) => ({
                url: "/bookInfo/setRating",
                body: data,
                method: "POST",
            })
        }),
        removeRating: builder.mutation<ResponseBookRatingsData, { bookId: number, userId: number }>({
            query: (data) => ({
                url: "/bookInfo/removeRating",
                body: data,
                method: "DELETE"
            })
        }),
        leaveComment: builder.mutation<ResponseCommentsData, { bookId: number, userId: number, text: string }>({
            query: data => ({
                url: "/bookInfo/leaveComment",
                body: data,
                method: "POST"
            })
        }),
        removeComment: builder.mutation<string, { commentId: number }>({
            query: data => ({
                url: "/bookInfo/removeComment",
                body: data.commentId,
                method: "DELETE"
            })
        }),
        getAllCommentsForBook: builder.query<ResponseCommentsData[], { bookId: number }>({
            query: data => ({
                url: "/bookInfo/getAllCommentsForBook",
                body: data,
                method: "POST"
            })
        })
    })
})

export const { endpoints: { getBookRatingsById, setRating, removeRating, getAllCommentsForBook, leaveComment, removeComment } } = bookInfoApi;

export const { useGetBookRatingsByIdQuery, useSetRatingMutation, useRemoveRatingMutation, useGetAllCommentsForBookQuery, useLeaveCommentMutation, useRemoveCommentMutation } = bookInfoApi