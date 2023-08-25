import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SelectedTask = {
    count: number;
    egeId: number;
    subject: string;
};

type GeneratedTask = {
    id: number;
    egeId: number;
    subject: string;
    text: string;
    answerOptions: {
        correct: string;
        options: string;
    };
    maxPoints: number;
};

type ExamTask = {
    name: string;
    egeId: number;
    category: string;
    //     {
    //     "name": "Правописание корней",
    //     "ege_id": 9,
    //     "category": "Задания на орфографию"
    // }
};

type ExamStructure = {
    structure: ExamTask[];
};

type GeneratorState = {
    selectedTasks: SelectedTask[];
    generatedTasks: GeneratedTask[];
    examStructure: ExamStructure;
};

const generatorSlice = createSlice({
    name: "generator",
    initialState: <GeneratorState>{
        selectedTasks: [],
        generatedTasks: [],
        examStructure: <ExamStructure>{},
    },
    reducers: {
        setSelectedTask: (
            state: GeneratorState,
            action: PayloadAction<SelectedTask>,
        ) => {
            if (action.payload.count === 0) {
                state.selectedTasks = state.selectedTasks.filter(
                    (task) => task.egeId !== action.payload.egeId,
                );
            } else {
                const task = state.selectedTasks.find(
                    (task) => task.egeId === action.payload.egeId,
                );

                if (task) {
                    task.count = action.payload.count;
                } else {
                    action.payload.count = 1;
                    state.selectedTasks.push(action.payload);
                }
            }
        },

        addExamStructure: (
            state: GeneratorState,
            action: PayloadAction<ExamStructure>,
        ) => {
            state.examStructure = action.payload;
        },
        setGeneratedTasks: (
            state: GeneratorState,
            action: PayloadAction<GeneratedTask[]>,
        ) => {
            state.generatedTasks = action.payload;
        },
    },
});

export default generatorSlice.reducer;
export const { setSelectedTask, addExamStructure, setGeneratedTasks } =
    generatorSlice.actions;

// export const { setCredentials, logoutUser, setUser } = authSlice.actions;

export const selectGeneratedTasks = (state: any) =>
    state.generator.generatedTasks;

// export const selectCurrentUser = (state: any) => state.auth.user;
