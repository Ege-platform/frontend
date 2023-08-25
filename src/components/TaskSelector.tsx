import {
    Grid,
    Typography,
    Box,
    Button,
    OutlinedInput,
    Container,
    CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { SelectedTask } from "../feature/generator/generatorSlice";

interface TaskSelectorProps {
    egeId: number;
    taskName: string;
    taskProgress: number;
    backgroundColor?: string;
    handleSetTask: (task: SelectedTask) => void;
}

export default function TaskSelector(props: TaskSelectorProps) {
    const [taskCount, setTaskCount] = useState(0);

    let { egeId: taskNumber, taskName, taskProgress, backgroundColor } = props;
    if (!backgroundColor) {
        backgroundColor = "#605DE3";
    }

    function handleAddTask() {
        // create SelectedTask object
        console.log(taskNumber, taskCount);
        const task: SelectedTask = {
            egeId: taskNumber,
            count: taskCount + 1,
            subject: "russian",
        };
        setTaskCount(taskCount + 1);
        props.handleSetTask(task);
    }

    function handleRemoveTask() {
        // create SelectedTask object
        console.log(taskNumber, taskCount);
        const task: SelectedTask = {
            egeId: taskNumber,
            count: taskCount - 1,
            subject: "russian",
        };
        setTaskCount(taskCount - 1);
        props.handleSetTask(task);
    }

    function handleChangeTaskCount(e: any) {
        let task: SelectedTask = {
            egeId: taskNumber,
            count: 0,
            subject: "russian",
        };
        if (e.target.value === "") {
            setTaskCount(0);
            props.handleSetTask(task);
        } else {
            try {
                const value = parseInt(e.target.value);
                task.count = value;
                props.handleSetTask(task);
                setTaskCount(value);
            } catch (e) {
                setTaskCount(0);
                props.handleSetTask(task);
            }
        }
    }

    return (
        <Container
            sx={{
                width: 1000,
                ml: 0,
            }}
        >
            <Grid container alignItems="center">
                <CircularProgress
                    sx={{
                        width: "50px",
                        height: "50px",
                        color: backgroundColor,
                        mr: "10px",
                    }}
                    variant="determinate"
                    value={taskProgress}
                />
                <Box
                    sx={{
                        background: backgroundColor,
                        justifyContent: "center",
                        padding: "20px",
                        ml: "20px",
                        mr: "20px",
                        p: 3,
                        alignItems: "center",
                        borderRadius: 4,
                        color: "white",
                        fontWeight: "bold",
                        gap: "10px",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "16px",
                            fontWeight: "bold",
                        }}
                    >
                        {taskNumber}
                    </Typography>
                </Box>
                <Typography
                    sx={{
                        flexGrow: 1,
                        fontWeight: "bold",
                        fontSize: "16px",
                    }}
                >
                    {taskName}
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        width: "50px",
                        height: "50px",
                        // borderRadius: "0",
                        background: backgroundColor,
                        mr: "10px",
                    }}
                    onClick={handleRemoveTask}
                >
                    -
                </Button>
                <OutlinedInput
                    type="number"
                    sx={{
                        width: "70px",
                        height: "50px",
                        alignItems: "center",
                        alignContent: "center",
                    }}
                    value={taskCount}
                    onChange={handleChangeTaskCount}
                />
                <Button
                    variant="contained"
                    sx={{
                        width: "50px",
                        height: "50px",
                        background: backgroundColor,
                        ml: "10px",
                    }}
                    onClick={handleAddTask}
                >
                    +
                </Button>
            </Grid>
        </Container>
    );
}
