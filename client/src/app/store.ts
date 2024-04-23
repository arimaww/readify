import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import { api } from './services/api'
import auth from '../features/auth/authSlice'
import admin from '../features/admin/adminSlice'
import book from '../features/book/bookSlice'
import purchase from '../features/purchase/purchaseSlice'
import { listenerMiddleware, listenerRegisterMiddleware } from '../middleware/auth'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth,
        admin,
        book,
        purchase
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(api.middleware)
    .prepend(listenerMiddleware.middleware)
    .concat(api.middleware)
    .prepend(listenerRegisterMiddleware.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>