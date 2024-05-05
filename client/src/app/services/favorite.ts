import { Favorite } from "@prisma/client";
import { api } from "./api";


export const favoriteApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addToFavorite: builder.mutation<Favorite[], { userId: number | undefined, bookId: number }>({
            query: data => ({
                url: "/favorite/addToFavorite",
                body: data,
                method: "POST"
            }),
            invalidatesTags: ['Favorite']

        }),
        getUserFavorites: builder.query<Favorite[], { userId: number | undefined }>({
            query: (data) => ({
                url: "/favorite/fs/getFavorites",
                body: data,
                method: "POST"
            }),
            providesTags: ['Favorite']

        }),
        removeFromFavorite: builder.mutation<string, { userId: number | undefined, bookId: number }>({
            query: (data) => ({
                url: "/favorite/removeFromFavorite",
                body: data,
                method: "DELETE"
            }),
            invalidatesTags: ['Favorite']
        }),
    })
})

export const { useRemoveFromFavoriteMutation,
    useAddToFavoriteMutation,
    useGetUserFavoritesQuery } = favoriteApi;

export const {
    endpoints: { addToFavorite, getUserFavorites, removeFromFavorite }
} = favoriteApi;