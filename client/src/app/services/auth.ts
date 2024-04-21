import { Favorite, User } from "@prisma/client";
import { api } from "./api";


export type UserData = Omit<User, "id">;
export type ResponseLoginData = User & { token: string }


export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ResponseLoginData, UserData>({
            query: (userData) => ({
                url: "/user/login",
                body: userData,
                method: "POST"
            }),
        }),
        register: builder.mutation<ResponseLoginData, UserData>({
            query: (userData) => ({
                url: "/user/register",
                body: userData,
                method: "POST",
            })
        }),
        current: builder.query<ResponseLoginData, void>({
            query: () => ({
                url: "user/current",
                method: "GET"
            }),
        }),
        update: builder.mutation<ResponseLoginData, any>({
            query(userData) {
                return {
                    url: '/user/update',
                    method: 'POST',
                    body: userData,
                };
            }
        }),
        deleteUser: builder.mutation<ResponseLoginData, UserData>({
            query: (userId) => ({
                url: "/user/delete",
                body: userId,
                method: "DELETE",
            }),
        }),
        setUserAvatar: builder.mutation<ResponseLoginData, UserData>({
            query: (UserData) => ({
                url: "/user/uploadImage",
                body: UserData,
                method: "POST",
            }),
        }),
        addToFavorite: builder.mutation<Favorite[], { userId: number | undefined, bookId: number }>({
            query: data => ({
                url: "/book/favorite/addToFavorite",
                body: data,
                method: "POST"
            }),
            invalidatesTags: ['Favorite']

        }),
        getUserFavorites: builder.query<Favorite[], { userId: number | undefined }>({
            query: (data) => ({
                url: "/book/favorite/fs/getFavorites",
                body: data,
                method: "POST"
            }),
            providesTags: ['Favorite']
            
        }),
        removeFromFavorite: builder.mutation<string, {userId: number | undefined, bookId: number}>({
            query: (data) => ({
                url: "/book/favorite/removeFromFavorite",
                body: data,
                method: "DELETE"
            }),
            invalidatesTags: ['Favorite']
        })
    })
})


export const { useRemoveFromFavoriteMutation, useRegisterMutation, useLoginMutation, useCurrentQuery, useUpdateMutation, useDeleteUserMutation, useSetUserAvatarMutation, useAddToFavoriteMutation, useGetUserFavoritesQuery } = authApi;

export const {
    endpoints: { login, register, current, update, deleteUser, setUserAvatar, addToFavorite, getUserFavorites, removeFromFavorite }
} = authApi;