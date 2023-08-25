import { Container, Typography, Stack, Paper, Button } from "@mui/material";
import TaskSelector from "../components/TaskSelector";
import { useDispatch } from "react-redux";
import { setSelectedTask } from "../feature/generator/generatorSlice";
import {
    SelectedTask,
    addExamStructure,
    setGeneratedTasks,
} from "../feature/generator/generatorSlice";
import { theme } from "../theme";
import {
    useGetExamStructureMutation,
    useGetGeneratedExamMutation,
} from "../feature/generator/generatorApiSlice";
import { useEffect, useState } from "react";
import { store } from "../app/store";

import { useNavigate } from "react-router-dom";

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
    egeId: number;
    name: string;
    category: string;
    color?: string;
};

export default function TaskGenerator() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [getExamStructure /*{ isLoading }*/] = useGetExamStructureMutation();
    const [getGeneratedExam /*{ isLoading }*/] = useGetGeneratedExamMutation();

    const [avaliableTasks, setAvaliableTasks] = useState<AvailableTask[]>([]);
    const [categories, setCategories] = useState<Set<string>>(new Set());

    const getTasks = (structure: any) => {
        // get colors for categories and add them to categories
        const new_categories = new Set(
            structure.map((task: AvailableTask) => task.category),
        );
        // @ts-ignore
        setCategories(new_categories);

        const tasks = structure.map((task: any) => {
            return {
                ...task,
                color: getBackgroundColor(
                    [...new_categories].indexOf(task.category),
                ),
            };
        });
        return tasks;
    };

    useEffect(() => {
        const fetchExamStructure = async () => {
            try {
                const data = await getExamStructure({}).unwrap();
                dispatch(addExamStructure(data));
                const structure =
                    store.getState().generator.examStructure.structure;
                const tasks = getTasks(structure);
                setAvaliableTasks(tasks);
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

    const handleGenerateExam = () => {
        const selectedTasks = store.getState().generator.selectedTasks;
        const fetchExam = async (examStructure: any) => {
            try {
                const data = await getGeneratedExam({
                    tasksData: examStructure,
                }).unwrap();
                console.log(data);
                dispatch(setGeneratedTasks(data));
                navigate("/exam/tasks");
                // dispatch(addExamStructure(data));
            } catch (err) {
                console.log(err);
                console.log("error");
            }
        };
        fetchExam(selectedTasks);
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
                                key={task.egeId}
                                egeId={task.egeId}
                                taskName={task.name}
                                taskProgress={100}
                                backgroundColor={task.color} //getBackgroundColor(task.egeId)}
                                handleSetTask={handleSetTask}
                            />
                        ))}
                    </Stack>
                    <Button
                        variant="contained"
                        onClick={handleGenerateExam}
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
                        {Array.from(categories).map((category) => (
                            <Paper
                                key={category}
                                sx={{
                                    width: 280,
                                    height: 152,
                                    backgroundColor: getBackgroundColor(
                                        [...categories].indexOf(category),
                                    ),
                                    color: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography variant="h5" fontWeight={700}>
                                    {category}
                                </Typography>
                            </Paper>
                        ))}
                    </Stack>
                </Container>
            </Stack>
        </Container>
    );
}
