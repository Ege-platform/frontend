import { apiSlice } from "../../app/api/apiSlice";

export const generatorApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getExamStructure: builder.mutation({
            query: () => ({
                url: "/api/v1/exam/structure/russian",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetExamStructureMutation } = generatorApiSlice;
