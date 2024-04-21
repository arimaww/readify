import { Book, BookType, Categories, User } from "@prisma/client";
import { api } from "./api";


export type ResponseBookData = Book | null

export type UserId = Pick<User, "userId">

export const bookApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBookList: builder.query<Book[], { id: number | undefined}>({
            query: (data) => ({
                url: `/book/${data.id}`,
                body: data,
                method: "POST",
            }),
        }),
        getBookById: builder.query<ResponseBookData, { bookId: number | undefined }>({
            query: (data) => ({
                url: `/book/getBooks/${data.bookId}`,
                body: data,
                method: "POST"
            })
        }),
        createBook: builder.mutation<ResponseBookData, Book>({
            query(data: Book) {
                return {
                    url: "/book/create/book",
                    body: data,
                    method: "POST",
                }
            }
        }),
        updateBook: builder.mutation<ResponseBookData, Book>({
            query: (data) => ({
                url: "/book/update",
                body: data,
                method: "PUT"
            })
        }),
        deleteBook: builder.mutation<ResponseBookData, {bookId: number}>({
            query: (data: Book) => ({
                url: "/book/deleteBook",
                body: data,
                method: "DELETE",
            }),
        }),
        getAllTypes: builder.query<BookType[], void>({
            query: () => ({
                url: "/book/types",
                method: "GET"
            })
        }),
        getAllCategories: builder.query<Categories[], void>({
            query: () => ({
                url: "book/categories",
                method: "GET"
            })
        }),
        getAuthorById: builder.query<User, {authorId: number | undefined}>({
            query(data) {
                return {
                    url: "book/author/getAuthorById",
                    body: data,
                    method: "POST",
                }
            }
        }),
        getAllBooks: builder.query<Book[], void>({
            query: () => ({
                url: "book/b/getAllBooks",
                method: "GET",
            })
        }),
        
    })
})

export const { endpoints: { getBookList, createBook, deleteBook, updateBook, getAllTypes, getAllCategories, getBookById, getAuthorById, getAllBooks } } = bookApi;

export const { useGetBookListQuery, useCreateBookMutation, useDeleteBookMutation, useUpdateBookMutation,
    useGetAllTypesQuery,
    useGetAllCategoriesQuery,
    useGetBookByIdQuery,
    useGetAuthorByIdQuery,
    useGetAllBooksQuery } = bookApi;