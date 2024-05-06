import { api } from "./api";


type TData = {
    code: number,
    toWhom: string
}

export const mailApi = api.injectEndpoints({
    endpoints: (builder) => ({
        sendMailToUser: builder.mutation<string, TData>({
            query: (data) => ({
                url: '/mail/',
                method: "POST",
                body: data
            })
        })
    })
})


export const {
    useSendMailToUserMutation } = mailApi;

export const {
    endpoints: { sendMailToUser }
} = mailApi;