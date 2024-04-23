import { Purchase } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { purchaseApi } from "../../app/services/purchase";

type InitialState = {
    purchase: Purchase | Purchase[] | null
}

const initialState:InitialState = {
    purchase: null
}

export const purchaseSlice = createSlice({
    name: "purchase",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(purchaseApi.endpoints.createPurchase.matchFulfilled, (state, action) => {
            state.purchase = action.payload;
        }).addMatcher(purchaseApi.endpoints.getAllPurchasesByUserId.matchFulfilled, (state, action) => {
            state.purchase = action.payload;
        })
    }
})

export default purchaseSlice.reducer