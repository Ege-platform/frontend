import { apiSlice } from "../../app/api/apiSlice";

type ExamTask = {
    count: number;
    egeId: number;
    subject: string;
};

type ExamTaskSubbmition = {
    answer: string;
    subject: string;
    taskId: number;
};

type ExamStructure = {
    tasksData: Array<ExamTask>;
};

export const generatorApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getExamStructure: builder.mutation({
            query: () => ({
                url: "/api/v1/exam/structure/russian",
                method: "GET",
            }),
        }),
        getGeneratedExam: builder.mutation({
            query: (examStructure: ExamStructure) => ({
                url: "/api/v1/tasks/generate",
                method: "POST",
                body: examStructure,
            }),
        }),
        submitExamTasks: builder.mutation({
            query: (examTasks: ExamTaskSubbmition) => ({
                url: "/api/v1/tasks/submit",
                method: "POST",
                body: examTasks,
            }),
        }),
    }),
});

export const {
    useGetExamStructureMutation,
    useGetGeneratedExamMutation,
    useSubmitExamTasksMutation,
} = generatorApiSlice;
