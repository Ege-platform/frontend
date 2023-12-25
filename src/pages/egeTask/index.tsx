import {
    Row,
    Col,
    Progress,
    Typography,
    Button,
    InputNumber,
    Divider,
    Skeleton,
    Card,
    Grid,
} from "antd";
import { getStrokeColor } from "../../utils/colors";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { TaskApiServiceInstance } from "../../api/TaskApiService";
import { IEgeTask } from "../../api/models/IEgeTask";
import { rootStore } from "../../stores/RootStore";

const { useBreakpoint } = Grid;

const EgeTaskRow = observer((props: IEgeTask) => {
    const matches = useMediaQuery("(min-width: 768px)");
    // TODO: create enums with colors for futher usage
    const {
        progress,
        availableCount,
        category,
        egeId,
        title: description,
    } = props;
    let strokeColor = getStrokeColor(category);

    const [taskCount, setTaskCount] = useState<number>(0);

    const onChange = (value: number | null) => {
        console.log("changed", value);
        if (value) {
            setTaskCount(value);
            rootStore.addEgeTask({
                egeId: egeId,
                count: value,
                subject: "russian",
            });
        }
    };

    const onPlusClick = () => {
        if (taskCount >= availableCount) {
            return;
        }
        rootStore.addEgeTask({
            egeId: egeId,
            count: taskCount + 1,
            subject: "russian",
        });
        setTaskCount(taskCount + 1);

        console.log("plus");
    };

    const onMinusClick = () => {
        if (taskCount <= 0) {
            return;
        }
        rootStore.addEgeTask({
            egeId: egeId,
            count: taskCount - 1,
            subject: "russian",
        });
        setTaskCount(taskCount - 1);

        console.log("minus");
    };

    return (
        <Row
            justify={"space-between"}
            align={"middle"}
            style={{ paddingTop: "10px" }}
        >
            <Col
                xs={0}
                md={4}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Progress
                    size={40}
                    type="circle"
                    percent={progress}
                    strokeColor={{ from: strokeColor, to: strokeColor }}
                />
            </Col>
            <Col xs={4} md={2}>
                <div
                    style={{
                        display: "flex",
                        backgroundColor: strokeColor,
                        width: "43px",
                        height: "53px",
                        borderRadius: "5px",
                    }}
                >
                    <Typography
                        style={{
                            margin: "auto",
                            color: "#fff",
                            fontSize: "16px",
                            fontWeight: "bold",
                        }}
                    >
                        {egeId}
                    </Typography>
                </div>
            </Col>
            <Col xs={14} md={12} xl={14}>
                <Typography.Text>{description}</Typography.Text>
            </Col>
            <Col xs={4} md={6} xl={3}>
                <Row justify={"center"} align={"middle"}>
                    <Col xs={0} sm={6}>
                        {/* TODO: create separate element for taskCount controls */}
                        <Button
                            style={{
                                backgroundColor: strokeColor,
                                color: "#fff",
                                fontSize: "16px",
                                height: "100%",
                            }}
                            onClick={onMinusClick}
                        >
                            -
                        </Button>
                    </Col>

                    <Col
                        xs={24}
                        sm={12}
                        style={{
                            textAlign: "center",
                            fontSize: "16px",
                            fontWeight: "bold",
                            // align InputNumber in center of Col
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <InputNumber
                            size="large"
                            min={0}
                            max={availableCount}
                            value={taskCount}
                            style={{
                                color: "#000",
                                width: 40,
                            }}
                            onChange={onChange}
                        />
                    </Col>

                    <Col xs={0} sm={6}>
                        {" "}
                        <Button
                            style={{
                                backgroundColor: strokeColor,
                                color: "#fff",
                                fontSize: "16px",
                                height: "100%",
                            }}
                            onClick={onPlusClick}
                        >
                            +
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
});

interface IEgeCategoryCardProps {
    category: string;
    color: string;
}

const EgeCategoryCard = (props: IEgeCategoryCardProps) => {
    const { category, color } = props;
    return (
        <Card
            style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                backgroundColor: color,
            }}
        >
            <Typography.Text
                style={{
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: "bold",
                }}
            >
                {category}
            </Typography.Text>
        </Card>
    );
};

const categoryColors = {
    punctuation: "#FAB02D",
    norm: "#7CB518",
    orthography: "#F96108",
    text: "#605DE3",
};

const EgePage = observer(() => {
    const screens = useBreakpoint();
    console.log(screens);

    const navigate = useNavigate();
    const [tasks, setTasks] = useState<IEgeTask[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await TaskApiServiceInstance.getExamStructure();
            setTasks(data);
        }
        fetchData();
    }, []);

    // useEffect(() => {
    //     // hide category cards on mobile
    //     console.log(screens);
    // }, [screens]);

    const submitCreateEgeVariant = () => {
        async function create() {
            const data = rootStore.egeCreateRequest;
            const response = await TaskApiServiceInstance.createEgeExample(
                data,
            );
            console.log(response.variantId);
            rootStore.clearEgeTask();
            navigate(`/task/${response.variantId}`);
        }
        create();
    };

    return (
        <>
            <Row justify={"center"} gutter={[30, 0]}>
                <Col xs={22} sm={22} lg={18}>
                    {tasks.length > 0 ? (
                        tasks.map((value, index) => {
                            return (
                                <EgeTaskRow
                                    key={index}
                                    availableCount={value.availableCount}
                                    egeId={value.egeId}
                                    progress={value.progress}
                                    category={value.category}
                                    title={value.title}
                                />
                            );
                        })
                    ) : (
                        <>
                            <Skeleton></Skeleton>
                        </>
                    )}
                </Col>
                <Col xs={0} sm={0} md={4}>
                    {/* map over category colors and display card */}
                    {Object.keys(categoryColors).map((key, index) => {
                        return (
                            <Row
                                key={index}
                                justify={"center"}
                                style={{ marginBottom: "10px" }}
                            >
                                <EgeCategoryCard
                                    category={key}
                                    color={categoryColors[key]}
                                />
                            </Row>
                        );
                    })}
                </Col>
            </Row>
            <Divider />
            <Row justify={"center"} style={{ marginBottom: "50px" }}>
                <Button
                    type="primary"
                    size="large"
                    onClick={submitCreateEgeVariant}
                >
                    Сгенерировать вариант
                </Button>
            </Row>
        </>
    );
});
export default EgePage;
