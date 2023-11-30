import { Button } from "antd";

interface TaskButtonProps {
    taskNumber?: number;
    color?: string;
    disabled?: boolean;
}

export function TestTaskButton({
    taskNumber,
    color = "#7CB518",
    disabled = false,
}: TaskButtonProps) {
    return (
        <Button
            type="primary"
            style={{
                color: "#fff",
                fontSize: "32px",
                fontWeight: "bold",
                background: `radial-gradient(circle at center,${color} , #10062B)`,
                height: "77px",
                width: "77px",
                borderRadius: "140px",
                border: `3px solid ${color}`,
            }}
            disabled={disabled}
        >
            {taskNumber}
        </Button>
    );
}

export function TaskButton({
    taskNumber,
    color = "#7CB518",
    disabled: active = true,
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
    disabled?: boolean;
}

export function TaskInfo({
    taskNumber,
    color = "#7CB518",
    text,
    disabled = false,
}: TaskInfoProps) {
    // #7CB5181F
    return (
        <div
            style={{
                opacity: disabled ? 0 : 1,
                border: `2px solid ${color}`,
                backgroundColor: `${color}1F`,
                borderRadius: "10px",
                // color: "#fff",
                maxWidth: "200px",
            }}
        >
            <div
                style={{
                    // backgroundColor: `${color}`,
                    width: "150px",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "16px",
                }}
            >
                <p style={{ maxHeight: "50px", whiteSpace: "pre-wrap" }}>
                    {text}
                </p>
            </div>
        </div>
    );
}
