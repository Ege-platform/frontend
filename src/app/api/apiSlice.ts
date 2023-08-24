import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:9999",
    // add type to getState from redux store
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;

        if (token !== undefined) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery: baseQuery,

    endpoints: (builder) => ({
        test: builder.query({
            query: () => "/api/v1/test",
        }),
    }),
});
