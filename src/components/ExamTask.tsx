import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useSubmitExamTasksMutation } from "../feature/generator/generatorApiSlice";
import {
    Container,
    Typography,
    Button,
    Paper,
    Stack,
    Input,
} from "@mui/material";

interface ExamTask {
    id: number;

    egeId: number;
    subject: string;
    category: string;
    text: string;
    correctAnswer: string;
    answerOptions: string;
    maxPoints: number;
}

interface ExamTaskProps {
    index: number;
    props: ExamTask;
}

export default function ExamTask(props: ExamTaskProps) {
    const [submitExamTasks] = useSubmitExamTasksMutation();
    // get theme from theme provider
    const theme = useTheme();
    const { id, subject, text, correctAnswer } = props.props;

    const [valid, setValid] = useState(false);
    const [checked, setChecked] = useState(false);
    const [answer, setAnswer] = useState("");

    const handleAnswerChange = (e: any) => {
        // TODO: проверка на различные форматы ввода
        setChecked(false);
        setValid(false);
        setAnswer(e.target.value);
    };

    const handleCheckAnswer = () => {
        // TODO: если не правильный формат добавить компонент
        async function submitAnswer(ans: string) {
            submitExamTasks({
                taskId: id,
                subject: subject,
                answer: ans,
            });
        }

        const correctAnswerNumber = correctAnswer
            .split(",")
            .map((x) => +x)
            .join("");
        console.log(correctAnswerNumber);

        if (answer === correctAnswerNumber) {
            setValid(true);
        } else {
            setValid(false);
        }
        setChecked(true);
        // add "," between numbers in answer
        const newAnswer = answer.split("").join(",");
        submitAnswer(newAnswer);
    };

    return (
        <Container>
            <Stack direction="row" spacing={2}>
                <Paper
                    sx={{
                        width: 60,
                        height: 34,
                        pb: 2,
                        pt: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: 1,
                        borderColor: theme.palette.primary.main,
                        borderRadius: 0,
                        boxShadow: 0,
                    }}
                >
                    <Typography fontWeight={"bold"} variant="h5">
                        {props.index}
                    </Typography>
                </Paper>
                <Container>
                    <Typography variant="h5" component="h5">
                        {text}
                    </Typography>
                    <Stack direction="row" spacing={3} sx={{ mt: 2, mb: 2 }}>
                        <Typography variant="h6" component="h6">
                            Ответ:
                        </Typography>
                        <Input
                            sx={{
                                color: checked
                                    ? valid
                                        ? "green"
                                        : "red"
                                    : "black",
                            }}
                            type="text"
                            value={answer}
                            onChange={handleAnswerChange}
                        />
                    </Stack>
                    <Stack direction="row" spacing={3} sx={{ mt: 2, mb: 2 }}>
                        <Button
                            variant="outlined"
                            sx={{
                                pr: 8,
                                pl: 8,
                                pt: 2,
                                pb: 2,
                                textTransform: "none",

                                // color: valid ? "green" : "red",
                            }}
                            onClick={handleCheckAnswer}
                        >
                            <Typography>Проверить</Typography>
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                                pr: 8,
                                pl: 8,
                                pt: 2,
                                pb: 2,
                                textTransform: "none",
                            }}
                        >
                            <Typography>Правила</Typography>
                        </Button>
                    </Stack>
                </Container>
            </Stack>
        </Container>
    );
}
