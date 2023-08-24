import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* this is example of generated task from backend
        {
            "id": 1,
            "egeId": 17,
            "subject": "russian",
            "text": "Высокие, статные игроки сборной (1) уставшие и радостные (2) выстроились для вручения им (3) заслуженных в честной борьбе (4) золотых медалей.",
            "answerOptions": {
                "correct": "1,2",
                "options": "1,2,3,4"
            },
            "maxPoints": 10
        }
*/

/*  this is example of task for request to backend
        {
            "count": 1,
            "egeId": 17,
            "subject": "russian"
        }
*/

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
        addSelectedTask: (
            state: GeneratorState,
            action: PayloadAction<SelectedTask>,
        ) => {
            // check if task already exists
            const task = state.selectedTasks.find(
                (task) => task.egeId === action.payload.egeId,
            );
            if (task) {
            } else {
                state.selectedTasks.push(action.payload);
            }
        },
        setSelectedTask: (
            state: GeneratorState,
            action: PayloadAction<SelectedTask>,
        ) => {
            // check if task already exists then repalce it otherwise push it
            const task = state.selectedTasks.find(
                (task) => task.egeId === action.payload.egeId,
            );
            if (task) {
                task.count = action.payload.count;
            } else {
                action.payload.count = 1;
                state.selectedTasks.push(action.payload);
            }
        },

        removeSelectedTask: (
            state: GeneratorState,
            action: PayloadAction<SelectedTask>,
        ) => {
            // if action.payload.count === 0, remove task from selectedTasks
            if (action.payload.count === 0) {
                state.selectedTasks = state.selectedTasks.filter(
                    (task) => task.egeId !== action.payload.egeId,
                );
            } else {
                // else, find task in selectedTasks and decrement count
                const task = state.selectedTasks.find(
                    (task) => task.egeId === action.payload.egeId,
                );
                if (task) {
                    task.count = action.payload.count;
                }
            }
        },
        addExamStructure: (
            state: GeneratorState,
            action: PayloadAction<ExamStructure>,
        ) => {
            state.examStructure = action.payload;
        },
    },
});

export default generatorSlice.reducer;
export const {
    addSelectedTask,
    removeSelectedTask,
    setSelectedTask,
    addExamStructure,
} = generatorSlice.actions;
// export const { setCredentials, logoutUser, setUser } = authSlice.actions;

// export const selectCurrentUser = (state: any) => state.auth.user;
// export const selectCurrentToken = (state: any) => state.auth.token;
