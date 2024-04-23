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
            }),
            providesTags: ["Ratings"]
        }),
        getAllRatings: builder.query<ResponseBookRatingsData[], void>({
            query: () => ({
                url: "/bookInfo/getAllRatings",
                method: "GET"
            }),
            providesTags: ["Ratings"]
        }),
        setRating: builder.mutation<ResponseBookRatingsData, { userId: number, bookId: number, value: number }>({
            query: (data) => ({
                url: "/bookInfo/setRating",
                body: data,
                method: "POST"
            }),
            invalidatesTags: ["Ratings"]
        }),
        removeRating: builder.mutation<ResponseBookRatingsData, { bookId: number, userId: number }>({
            query: (data) => ({
                url: "/bookInfo/removeRating",
                body: data,
                method: "DELETE"
            }),
            invalidatesTags: ["Ratings"]
        }),
        leaveComment: builder.mutation<ResponseCommentsData, { bookId: number, userId: number, text: string }>({
            query: data => ({
                url: "/bookInfo/leaveComment",
                body: data,
                method: "POST"
            }),
            invalidatesTags: ["Comments"]
        }),
        removeComment: builder.mutation<string, { commentId: number }>({
            query: data => ({
                url: "/bookInfo/removeComment",
                body: data.commentId,
                method: "DELETE"
            }),
            invalidatesTags: ["Comments"]
        }),
        getAllCommentsForBook: builder.query<ResponseCommentsData[], { bookId: number }>({
            query: data => ({
                url: "/bookInfo/getAllCommentsForBook",
                body: data,
                method: "POST"
            }),
            providesTags: ["Comments"]
        })
        
    })
})

export const { endpoints: { getBookRatingsById, setRating, removeRating, getAllCommentsForBook, leaveComment, removeComment, getAllRatings } } = bookInfoApi;

export const { useGetBookRatingsByIdQuery,
     useSetRatingMutation,
     useRemoveRatingMutation,
     useGetAllCommentsForBookQuery,
     useLeaveCommentMutation,
     useRemoveCommentMutation,
     useGetAllRatingsQuery } = bookInfoApi