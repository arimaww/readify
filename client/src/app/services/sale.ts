import { Sale } from "@prisma/client";
import { api } from "./api";


type SaleData = Omit<Sale, "saleId">;

export const saleApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSales: builder.query<Sale[], void>({
            query: () => ({
                url: '/sale/',
                method: "GET"
            })
        }),
        createSale: builder.mutation<Sale, SaleData>({
            query: (data: SaleData) => ({
                url: "/sale/",
                method: "POST",
                body: data
            })
        }),
        terminateSale: builder.mutation<string, Pick<Sale, "saleId">>({
            query: (data: Pick<Sale, "saleId">) => ({
                url: '/sale/',
                method: "DELETE",
                body: data
            })
        })
    })
})

export const { useGetSalesQuery, useCreateSaleMutation, useTerminateSaleMutation } = saleApi;
export const { endpoints: { getSales, createSale, terminateSale } } = saleApi;