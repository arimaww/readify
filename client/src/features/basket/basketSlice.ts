import { Basket } from "@prisma/client"
import { createSlice } from "@reduxjs/toolkit"
import { basketApi } from "../../app/services/basket"


type InitialState = {
    basket: Basket | Basket[] | null
}

const initialState:InitialState = {
    basket: null
}

export const basketSlice = createSlice({
    initialState: initialState,
    name: "basket",
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(basketApi.endpoints.getUserBasket.matchFulfilled, (state, action) => {
            state.basket = action.payload;
        })
    }
})

export default basketSlice.reducer;