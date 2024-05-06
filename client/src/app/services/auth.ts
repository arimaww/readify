import { User } from "@prisma/client";
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
        getAllUsers: builder.query<User[], void>({
            query: () => ({
                url: "/user/allUsers",
                method: "GET"
            })
        }),
        isLoginDataCorrect: builder.mutation<ResponseLoginData, UserData>({
            query: (userData) => ({
                url: "/user/login",
                body: userData,
                method: "POST"
            }),
        }),
    })
})


export const {
    useRegisterMutation,
    useLoginMutation,
    useCurrentQuery,
    useUpdateMutation,
    useDeleteUserMutation,
    useSetUserAvatarMutation,
    useGetAllUsersQuery, useIsLoginDataCorrectMutation } = authApi;

export const {
    endpoints: { login, register, current, update, deleteUser, setUserAvatar, isLoginDataCorrect }
} = authApi;