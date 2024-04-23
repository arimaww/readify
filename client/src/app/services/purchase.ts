import { Purchase } from "@prisma/client";
import { api } from "./api";


export const purchaseApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllPurchasesByUserId: builder.query<Purchase[], {userId: number}>({
            query: (data) => ({
                url: "/purchase/getAllPurchasesByUserId",
                body: data,
                method: "POST"
            })
        }),
        createPurchase: builder.mutation<Purchase, Omit<Purchase, "purchasedId">>({
            query: data => ({
                url: "/purchase/createPurchase",
                body: data,
                method: "POST"
            })
        })
    })
})


export const {endpoints: {getAllPurchasesByUserId, createPurchase}} = purchaseApi
export const {useCreatePurchaseMutation, useGetAllPurchasesByUserIdQuery} = purchaseApi