import { api } from "./api";
import { Rating } from "@prisma/client";

export type ResponseBookRatingsData = Rating[] | Rating

export const bookInfoApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBookRatingsById: builder.query<ResponseBookRatingsData, {bookId: number}>({
            query: (data) => ({
                url: "/bookInfo/getratings",
                body: data,
                method: "POST"
            })
        }),
        setRating: builder.mutation<ResponseBookRatingsData, {userId: number, bookId: number, value: number}>({
            query: (data) => ({
                url: "/bookInfo/setRating",
                body: data,
                method: "POST",
            })
        }),
        removeRating: builder.mutation<ResponseBookRatingsData, {bookId: number, userId: number}>({
            query: (data) => ({
                url: "/bookInfo/removeRating",
                body: data,
                method: "DELETE"
            })
        })
    })
})

export const {endpoints: {getBookRatingsById, setRating, removeRating}} = bookInfoApi;

export const {useGetBookRatingsByIdQuery, useSetRatingMutation, useRemoveRatingMutation} = bookInfoApi