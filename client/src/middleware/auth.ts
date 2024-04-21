import {createListenerMiddleware} from '@reduxjs/toolkit'
import { authApi } from '../app/services/auth'

export const listenerMiddleware = createListenerMiddleware();
export const listenerRegisterMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners()

        if(action.payload.token) {
            localStorage.setItem("token", action.payload.token);
        }
    }
})


listenerRegisterMiddleware.startListening({
    matcher: authApi.endpoints.register.matchFulfilled,
    effect: async (action, listenerMiddleware) => {
        listenerMiddleware.cancelActiveListeners()

        if(action.payload.token) {
            localStorage.setItem("token", action.payload.token)
        }
    }
})