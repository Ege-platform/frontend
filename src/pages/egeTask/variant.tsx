import {
    Button,
    Row,
    Col,
    Card,
    Typography,
    Input,
    Grid,
    Collapse,
    CollapseProps,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { TaskApiServiceInstance } from "../../api/TaskApiService";
import { IEgeTaskModel } from "../../api/models/IEgeTaskModel";
import { getStrokeColor } from "../../utils/colors";
const { useBreakpoint } = Grid;

// const mockTasks: IEgeTaskModel[] = [
//     {
//         id: 1,
//         egeId: 1,
//         subject: "russian",
//         category: "punctuation",
//         description:
//             "Расставьте знаки препинания в предложении. Укажите предложения, в которых нужно поставить ОДНУ запятую. Запишите номера этих предложений.",
//         text: "Расставьте знаки препинания в предложении. Укажите предложения, в которых нужно поставить ОДНУ запятую. Запишите номера этих предложений.",
//         maxPoints: 5,
//     },
// ];

interface TaskCardProps {
    index: number;
    task: IEgeTaskModel;
}

const TaskCard = observer((props: TaskCardProps) => {
    // TODO: что делаем с цифрой
    const screens = useBreakpoint();
    const { index, task } = props;
    const strokeColor = getStrokeColor(task.category);
    const items: CollapseProps["items"] = [
        {
            key: "1",
            label: "Решение и пояснение",
            children: <Typography>{task.solution}</Typography>,
        },
    ];

    return (
        <Card>
            <Row gutter={[15, 10]}>
                <Col xs={6} sm={2}>
                    <div
                        style={{
                            border: `2px solid ${strokeColor}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "8px 24px",
                        }}
                    >
                        {index + 1}
                    </div>
                </Col>
                <Col xs={18} sm={22}>
                    <Typography.Title level={5} style={{ marginTop: 0 }}>
                        {task.question}
                    </Typography.Title>
                    <br />
                    {task.options.split("\n").map((value, index) => {
                        return <Typography key={index}>{value}</Typography>;
                    })}
                    <br />
                    <Row>
                        <Col xs={0} sm={0} md={2}>
                            <Typography>Ответ:</Typography>
                        </Col>
                        <Col xs={24} sm={24} md={22}>
                            <Input
                                placeholder="Ответ"
                                style={{
                                    // borderBottom: "2px solid #1E1E1E6B",
                                    borderRadius: 0,
                                }}
                            />
                        </Col>
                    </Row>
                    <br />
                    <Button type="default">Проверить</Button>
                </Col>
            </Row>
            <br />
            <Collapse defaultActiveKey={[]} items={items} />
        </Card>
    );
});

const EgeTaskPage = observer(() => {
    const { variantId } = useParams<{ variantId: string }>();
    const [tasks, setTasks] = useState<IEgeTaskModel[]>([]);

    useEffect(() => {
        async function getTasks() {
            const data = await TaskApiServiceInstance.getEgeVariant(
                Number(variantId),
            );
            setTasks(data.tasks);
        }
        getTasks();
    }, [variantId]);

    return (
        <>
            <Button
                type="primary"
                size="large"
                icon={<LeftOutlined />}
                style={{ padding: "0 20px", margin: "20px 0" }}
            >
                Вернуться назад{" "}
            </Button>
            <Typography.Title>
                Вариант <a>№31231</a>
            </Typography.Title>
            <br />
            <Row gutter={[16, 16]}>
                {tasks.map((task, index) => (
                    <Col span={24}>
                        <TaskCard task={task} index={index} />
                    </Col>
                ))}
            </Row>
        </>
    );
});

export default EgeTaskPage;
