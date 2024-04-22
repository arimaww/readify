import { Comments, Rating } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { bookInfoApi } from "../../app/services/bookInfo";


type InitialState = {
    rating: Rating[] | Rating | null,
    comment: Comments[] | Comments | null,
}

const initialState:InitialState = {
    rating: null,
    comment: null
}

export const bookInfoSlice = createSlice({
    initialState: initialState,
    name: "bookInfoSlice",
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(bookInfoApi.endpoints.getBookRatingsById.matchFulfilled, (state, action) => {
            state.rating = action.payload;
        }).addMatcher(bookInfoApi.endpoints.setRating.matchFulfilled, (state, action) => {
            state.rating = action.payload;
        }).addMatcher(bookInfoApi.endpoints.getAllCommentsForBook.matchFulfilled, (state, action) => {
            state.comment = action.payload;
        }).addMatcher(bookInfoApi.endpoints.leaveComment.matchFulfilled, (state, action) => {
            state.comment = action.payload;
        })
    }
})