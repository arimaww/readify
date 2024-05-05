import { createSlice } from "@reduxjs/toolkit"
import { Favorite } from "@prisma/client"
import { RootState } from "../../app/store"
import { favoriteApi } from "../../app/services/favorite"


interface InitialState {
    favorite: Favorite[] | null,
    message: string | null
}

const initialState: InitialState = {
    favorite: null,
    message: null
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: () => initialState
    },
    extraReducers: (builder) => {
        builder.addMatcher(favoriteApi.endpoints.addToFavorite.matchFulfilled, (state, action) => {
            state.favorite = action.payload;
        }).addMatcher(favoriteApi.endpoints.getUserFavorites.matchFulfilled, (state, action) => {
            state.favorite = action.payload;
        }).addMatcher(favoriteApi.endpoints.removeFromFavorite.matchFulfilled, (state, action) => {
            state.message = action.payload;
        })
    }
})

export const { logout } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectUser = (state: RootState) => state.auth.user