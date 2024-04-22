import {createSlice} from "@reduxjs/toolkit"
import {Favorite, User} from "@prisma/client"
import { authApi } from "../../app/services/auth"
import { RootState } from "../../app/store"


interface InitialState {
    user: User & {token: string} | User[] | null;
    isAuthenticated: boolean;
    favorite: Favorite[] | null
}

const initialState: InitialState = {
    user: null,
    isAuthenticated: false,
    favorite: null
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: () => initialState
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        }).addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true
        }).addMatcher(authApi.endpoints.current.matchFulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        }).addMatcher(authApi.endpoints.update.matchFulfilled, (state, action) => {
            state.user = action.payload;
        }).addMatcher(authApi.endpoints.deleteUser.matchFulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = false;
        }).addMatcher(authApi.endpoints.setUserAvatar.matchFulfilled, (state, action) => {
            state.user = action.payload;
        }).addMatcher(authApi.endpoints.addToFavorite.matchFulfilled, (state, action) => {
            state.favorite = action.payload;
        }).addMatcher(authApi.endpoints.getUserFavorites.matchFulfilled, (state, action) => {
            state.favorite = action.payload;
        }).addMatcher(authApi.endpoints.getAllUsers.matchFulfilled, (state, action) => {
            state.user = action.payload;
        })
    }
})

export const {logout} = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectUser = (state: RootState) => state.auth.user