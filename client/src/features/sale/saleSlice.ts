import { Sale } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { saleApi } from '../../app/services/sale';

type InitialState = {
    sale: Sale | null
    sales: Sale[] | null
    message: string | null
}

const initialState: InitialState = {
    sale: null,
    sales: null,
    message: null
}

const saleSlice = createSlice({
    name: 'saleSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(saleApi.endpoints.getSales.matchFulfilled, (state, action) => {
            state.sales = action.payload;
        }).addMatcher(saleApi.endpoints.createSale.matchFulfilled, (state, action) => {
            state.sale = action.payload;
        }).addMatcher(saleApi.endpoints.terminateSale.matchFulfilled, (state, action) => {
            state.message = action.payload;
        })
    }
})

export default saleSlice.reducer;