import { api } from "./api";
import { ResponseLoginData, UserData } from "./auth";



export const adminApi = api.injectEndpoints({
    
    endpoints: (builder) => ({
        changeRole: builder.mutation<ResponseLoginData, UserData>({
            query: (roleId) => ({
                url: "/user/changeRole",
                method: "POST",
                body: roleId,
                providesTags: ['hello']
            }),
        })
    })
})



export const {useChangeRoleMutation} = adminApi
export const {endpoints: {changeRole}} = adminApi