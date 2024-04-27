import { Book } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type InitialState = {
    searchBooks: Book[] | null,
}
const initialState:InitialState = {
     searchBooks: null
}
export const mainSearchSlice = createSlice({
    name: "mainSearchSlice",
    initialState: initialState,
    reducers: {
        setSearchBooks(state, action) {
            state.searchBooks = action.payload;
        }
    }
})

export const {setSearchBooks} = mainSearchSlice.actions
export default mainSearchSlice.reducer
export const selectSearchValue = (state: RootState) => state.mainSearchSlice.searchBooks