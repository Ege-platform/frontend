import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ username, password }) => ({
                url: "/auth/login",
                method: "POST",
                body: {
                    username: username,
                    password: password,
                },
            }),
        }),
        loginVk: builder.mutation({
            query: () => ({
                url: "/auth/vk",
                method: "POST",
            }),
        }),
        // define the shape of the returned value(s)

        loginVkToken: builder.mutation({
            query: ({ code }) => ({
                url: "/auth/vk/token",
                method: "POST",
                query: {
                    code: code,
                },
            }),
        }),
        register: builder.mutation({
            query: ({ username, password, email }) => ({
                url: "/auth/signup",
                method: "POST",
                body: {
                    username: username,
                    password: password,
                    email: email,
                },
            }),
        }),
        getCurrentUser: builder.mutation({
            query: () => ({
                url: "/api/v1/users/me",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLoginVkMutation,
    useRegisterMutation,
    useGetCurrentUserMutation,
    useLoginVkTokenMutation,
} = authApiSlice;
