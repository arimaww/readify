import { Basket } from "@prisma/client";
import { api } from "./api";


export type BasketResultData = Pick<Basket, "bookId"> & Pick<Basket, "userId">;

export const basketApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserBasket: builder.query<Basket[], void>({
            query: () => ({
                url: "/basket/",
                method: "GET",
                invalidatesTags: ["Basket"]
            }),
            providesTags: ['Basket']
        }),
        addToUserBasket: builder.mutation<void, BasketResultData>({
            query: (data) => ({
                url: "/basket/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Basket']
        }),
        removeBookFromUserBasket: builder.mutation<void, BasketResultData> ({
            query: (data) => ({
                url: "/basket/",
                method: "DELETE",
                body: data,
            }),
            invalidatesTags: ['Basket']
        })
    })
})

export const {useGetUserBasketQuery, useAddToUserBasketMutation, useRemoveBookFromUserBasketMutation } = basketApi

export const {endpoints: {getUserBasket, addToUserBasket, removeBookFromUserBasket}} = basketApi