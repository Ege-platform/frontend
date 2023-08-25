import ExamTask from "../components/ExamTask";
import { Button, Typography, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectGeneratedTasks } from "../feature/generator/generatorSlice";

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

export default function ExamPage() {
    const navigate = useNavigate();
    // load tasks from redux store

    const examTasks = useSelector(selectGeneratedTasks);

    return (
        <Container>
            <Button
                variant="contained"
                onClick={() => {
                    navigate("/exam");
                }}
                sx={{
                    mt: 2,
                    width: 280,
                    height: 51,
                    mb: 4,
                    pt: 4,
                    pb: 4,
                    pr: 5,
                    pl: 5,
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
                    {"<  "} вернуться назад
                </Typography>
            </Button>
            {examTasks.tasks.map((task: ExamTask, index: number) => (
                <ExamTask key={task.id} index={index + 1} props={task} />
            ))}
        </Container>
    );
}
