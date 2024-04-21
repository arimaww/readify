import { User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { adminApi } from "../../app/services/admin";
import { RootState } from "../../app/store";


type InitialState = {
    user: User & {token:string} | null
    isAdminitstrator: boolean
}

const initialState:InitialState = {
    user: null,
    isAdminitstrator: false
}

 const slice = createSlice({
    initialState: initialState,
    name: "admin",
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(adminApi.endpoints.changeRole.matchFulfilled, (state, action) => {
            state.user = action.payload;
            if(action.payload.role == 'ADMIN' || action.payload.role == 'MODER')
                state.isAdminitstrator = true;
        })
    }
})

export default slice.reducer

export const selectIsAdministrator = (state: RootState) => state.admin.isAdminitstrator
export const selectAdmin = (state: RootState) => state.admin.user