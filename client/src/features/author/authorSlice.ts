import { Book, User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { authorApi } from "../../app/services/author";
import { RootState } from "../../app/store";

type InitialState = {
    bookList: Book[] | null
    author?: User | null
}

const initialState:InitialState = {
    bookList: null
}

export const authorSlice = createSlice({
    initialState: initialState,
    name: "book",
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(authorApi.endpoints.getBookList.matchFulfilled, (state, action) => {
            state.bookList = action.payload;
        }).addMatcher(authorApi.endpoints.getAuthorById.matchFulfilled, (state, action) => {
            state.author = action.payload;
        })
    }
})

export default authorSlice.reducer;

export const selectBooks = (state:RootState) => state.book.bookList