import { Book, BookType, Categories, User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { bookApi } from "../../app/services/book";
import { RootState } from "../../app/store";



type InitialState = {
    book: Book | null
    bookList: Book[] | null
    bookType?: BookType[] | null
    bookCategories?: Categories[] | null
    user?: User | null
}

const initialState:InitialState = {
    book: null,
    bookList: null
}

export const bookSlice = createSlice({
    initialState: initialState,
    name: "book",
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(bookApi.endpoints.createBook.matchFulfilled, (state, action) => {
            state.book = action.payload;
        }).addMatcher(bookApi.endpoints.deleteBook.matchFulfilled, (state, action) => {
            state.book = action.payload;
        }).addMatcher(bookApi.endpoints.updateBook.matchFulfilled, (state, action) => {
            state.book = action.payload;
        }).addMatcher(bookApi.endpoints.getAllTypes.matchFulfilled, (state, action) => {
            state.bookType = action.payload;
        }).addMatcher(bookApi.endpoints.getAllCategories.matchFulfilled, (state, action) => {
            state.bookCategories = action.payload;
        }).addMatcher(bookApi.endpoints.getBookById.matchFulfilled, (state, action) => {
            state.book = action.payload;
        }).addMatcher(bookApi.endpoints.getAllBooks.matchFulfilled, (state, action) => {
            state.bookList = action.payload;
        })
    }
})

export default bookSlice.reducer;

export const selectBooks = (state:RootState) => state.book.bookList