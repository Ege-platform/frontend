import { Container, Typography, Stack, Paper, Button } from "@mui/material";
import TaskSelector from "../components/TaskSelector";
import { useDispatch } from "react-redux";
import { setSelectedTask } from "../feature/generator/generatorSlice";
import {
    SelectedTask,
    addExamStructure,
} from "../feature/generator/generatorSlice";
import { theme } from "../theme";
import { useGetExamStructureMutation } from "../feature/generator/generatorApiSlice";
import { useEffect, useState } from "react";
import { store } from "../app/store";
import { set } from "video.js/dist/types/tech/middleware";

const color = [
    theme.palette.categoryCard1.main,
    theme.palette.categoryCard2.main,
    theme.palette.categoryCard3.main,
    theme.palette.categoryCard4.main,
];

function getBackgroundColor(index: number) {
    return color[index % 4];
}

type AvailableTask = {
    ege_id: number;
    name: string;
    category: string;
    color?: string;
};

type Category = {
    name: string;
    color?: string;
};

const task_types = [
    {
        egeId: 1,
        taskName: "Средства связи предложений в тексте",
        taskProgress: 70,
        category: "Задания по тексту",
    },
    {
        egeId: 2,
        taskName: "Определение лексического значения слова",
        taskProgress: 50,
        category: "Задания по тексту",
    },
    {
        egeId: 3,
        taskName: "Стилистический анализ текста",
        taskProgress: 30,
    },
    {
        egeId: 4,
        taskName: "Постановка ударения в словах",
        taskProgress: 10,
    },
    {
        egeId: 5,
        taskName: "Словообразование",
        taskProgress: 0,
    },
    {
        egeId: 6,
        taskName: "Морфологический разбор слова",
        taskProgress: 0,
    },
    {
        egeId: 7,
        taskName: "Синтаксический разбор предложения",
        taskProgress: 5,
    },
    {
        egeId: 8,
        taskName: "Синтаксический разбор сложного предложения",
        taskProgress: 0,
    },
];

const avaliable_tasks = [
    {
        ege_id: 1,
        name: "Средства связи предложений в тексте",
        category: "Задания по тексту",
    },
    {
        category: "Задания по тексту",
        ege_id: 2,
        name: "Определение лексического значения слова",
    },
    {
        category: "Задания на орфографию",
        ege_id: 9,
        name: "Правописание корней",
    },
    {
        category: "Задания на орфографию",
        ege_id: 10,
        name: "Правописание приставок",
    },
    {
        category: "Задания на пунктуацию",
        ege_id: 17,
        name: "Знаки препинания при обращении и вводных словах",
    },
    {
        category: "Задания на пунктуацию",
        ege_id: 18,
        name: "Знаки препинания при однородных членах предложения",
    },
];

export default function NewMapPage() {
    const dispatch = useDispatch();
    const [getExamStructure, { isLoading }] = useGetExamStructureMutation();

    const [avaliableTasks, setAvaliableTasks] = useState<AvailableTask[]>([]);
    // const [categories, setCategories] = useState<Category[]>([]);

    const getTasks = (structure: any) => {
        // get colors for categories and add them to categories
        const categories = new Set(structure.map((task: any) => task.category));
        const tasks = structure.map((task: any) => {
            return {
                ...task,
                color: getBackgroundColor(
                    [...categories].indexOf(task.category),
                ),
            };
        });
        return tasks;
    };

    useEffect(() => {
        const fetchExamStructure = async () => {
            try {
                // check if exam structure is already in store

                const data = await getExamStructure({}).unwrap();
                dispatch(addExamStructure(data));
                const structure =
                    store.getState().generator.examStructure.structure;
                const tasks = getTasks(structure);
                setAvaliableTasks(tasks);
                // setAvaliableTasks(data.structure);
            } catch (err) {
                console.log(err);
                console.log("error");
            }
        };
        if (store.getState().generator.examStructure.structure === undefined) {
            fetchExamStructure();
        } else {
            const structure =
                store.getState().generator.examStructure.structure;
            const tasks = getTasks(structure);
            setAvaliableTasks(tasks);
        }
    }, []);

    const handleSetTask = (task: SelectedTask) => {
        dispatch(setSelectedTask(task));
    };

    return (
        // make container use full width
        <Container
            sx={{
                mt: 10,
            }}
        >
            <Stack direction={"row"}>
                <Container>
                    <Paper
                        sx={{
                            width: 280,
                            height: 51,
                            mb: 4,
                            backgroundColor: theme.palette.primary.main,
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "bold",
                                fontSize: 16,
                            }}
                        >
                            Тренировочный вариант
                        </Typography>
                    </Paper>
                    {/* Колонка со всеми заданиями */}
                    <Stack direction={"column"} spacing={2}>
                        {avaliableTasks.map((task) => (
                            <TaskSelector
                                key={task.ege_id}
                                egeId={task.ege_id}
                                taskName={task.name}
                                taskProgress={100}
                                backgroundColor={task.color} //getBackgroundColor(task.egeId)}
                                handleSetTask={handleSetTask}
                            />
                        ))}
                    </Stack>
                    <Button
                        variant="contained"
                        sx={{
                            mt: 2,
                            width: 280,
                            height: 51,
                            mb: 4,

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "bold",
                                fontSize: 16,
                            }}
                        >
                            Сгенерировать вариант
                        </Typography>
                    </Button>
                </Container>
                <Container
                    sx={{
                        width: 200,
                        ml: 4,
                    }}
                >
                    <Stack
                        direction={"column"}
                        spacing={2}
                        sx={{
                            width: 280,
                        }}
                    >
                        <Paper
                            sx={{
                                width: 280,
                                height: 152,
                                backgroundColor: theme.palette.primary.main,
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="h5" fontWeight={700}>
                                Задания по тексту
                            </Typography>
                        </Paper>
                        <Paper
                            sx={{
                                width: 280,
                                height: 152,
                                backgroundColor: theme.palette.primary.main,
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="h5" fontWeight={700}>
                                Задания по тексту
                            </Typography>
                        </Paper>
                        <Paper
                            sx={{
                                width: 280,
                                height: 152,
                                backgroundColor: theme.palette.primary.main,
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="h5" fontWeight={700}>
                                Задания по тексту
                            </Typography>
                        </Paper>
                        <Paper
                            sx={{
                                width: 280,
                                height: 152,
                                backgroundColor: theme.palette.primary.main,
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="h5" fontWeight={700}>
                                Задания по тексту
                            </Typography>
                        </Paper>
                    </Stack>
                </Container>
            </Stack>
        </Container>
    );
}
