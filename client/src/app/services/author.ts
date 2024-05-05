import { Book, User } from "@prisma/client";
import { api } from "./api";


export type ResponseBookData = Book | null

export type UserId = Pick<User, "userId">

export const authorApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAuthorById: builder.query<User, { authorId: number | undefined }>({
            query(data) {
                return {
                    url: "/author/getAuthorById",
                    body: data,
                    method: "POST",
                }
            }
        }),
        getBookList: builder.query<Book[], { id: number | undefined }>({
            query: (data) => ({
                url: `/author/${data.id}`,
                body: data,
                method: "POST",
            }),
        }),
    })
})

export const { endpoints: { getAuthorById, getBookList } } = authorApi;

export const {
    useGetAuthorByIdQuery, useGetBookListQuery } = authorApi;