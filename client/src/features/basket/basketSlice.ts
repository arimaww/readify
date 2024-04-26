import { Basket } from "@prisma/client"
import { createSlice } from "@reduxjs/toolkit"
import { basketApi } from "../../app/services/basket"


type InitialState = {
    basket: Basket | Basket[] | null,
    message: string | null | void
}

const initialState:InitialState = {
    basket: null,
    message: null
}

export const basketSlice = createSlice({
    initialState: initialState,
    name: "basket",
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(basketApi.endpoints.getUserBasket.matchFulfilled, (state, action) => {
            state.basket = action.payload;
        }).addMatcher(basketApi.endpoints.removeBookFromUserBasket.matchFulfilled, (state, action) => {
            state.message = action.payload;
        })
    }
})

export default basketSlice.reducer;