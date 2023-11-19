import { Card, Typography } from "antd";

interface TaskButtonProps {
    taskNumber?: number;
    color?: string;
    active?: boolean;
}

export function TaskButton({
    taskNumber,
    color = "#7CB518",
    active = true,
}: TaskButtonProps) {
    return (
        <div className={active ? "task-button" : "task-button-disabled"}>
            <div
                className="task-button-inner"
                style={{ border: `3px solid ${color}` }}
            >
                {taskNumber ? (
                    taskNumber
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="31"
                        viewBox="0 0 25 31"
                        fill="none"
                    >
                        <path
                            d="M23.0501 13.4311C25.4636 14.7153 25.4724 16.3308 23.0501 17.7826L4.33328 29.8352C1.98155 31.0336 0.384316 30.326 0.21665 27.7331L0.13723 2.50728C0.0842826 0.118846 2.14481 -0.555969 4.10826 0.589171L23.0501 13.4311Z"
                            fill="white"
                        />
                    </svg>
                )}
            </div>
        </div>
    );
}

interface TaskInfoProps {
    taskNumber: number;
    color?: string;
    text: string;
}

export function TaskInfo({
    taskNumber,
    color = "#7CB518",
    text,
}: TaskInfoProps) {
    return (
        <Card
            style={{
                border: `3px solid ${color}`,
                // backgroundColor: `${color}`,
                // opacity: "12%",
                color: "#fff",
            }}
        >
            <Typography>{text}</Typography>
        </Card>
    );
}
