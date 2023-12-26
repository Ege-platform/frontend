//TODO: изменение svg босса в зависимотси от мира и добавить ссылку на h5p

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { rootStore } from "../stores/RootStore";
import { UserApiServiceInstance } from "../api/UserApiService";

// import rightLines from "../assets/right-lines.svg";
// import leftLines from "../assets/left-lines.svg";
// TODO: write utils function for defining world colors
import colors from "../stores/index";
import { Button, Row, Col, Grid } from "antd";
import { IActivity } from "../api/models/IActivity";

const { useBreakpoint } = Grid;
// activityCard with props: worldname and task IActivity

const ActivityCard = observer(
    (props: { index: number; task: IActivity; active: boolean }) => {
        const { index, active, task } = props;
        const { worldName } = useParams<string>();
        return (
            <div id={`button${index}`}>
                <Link to={`/world/${worldName}/${task.egeId}`}>
                    <Button
                        size="large"
                        shape="circle"
                        disabled={!active}
                        style={{
                            background:
                                "radial-gradient(circle, #FFFFFF40, transparent)",
                            border: `3px solid ${colors[worldName].color}`,
                            color: "white",
                            width: "100px",
                            height: "100px",
                            fontSize: "48px",
                            fontWeight: "bold",
                            boxShadow: `0px 0px 20px 16px ${colors[worldName].color}1F`, // add shadow
                            textAlign: "center",
                            opacity: !active ? 0.5 : 1,
                        }}
                    >
                        {task.egeId}
                    </Button>
                </Link>
            </div>
        );
    },
);

const World = observer(() => {
    const headerSize = 70;
    const screens = useBreakpoint();
    const [loading, setLoading] = useState<boolean>(true);
    const [tasks, setTasks] = useState<IActivity[]>([]);

    const [ellipseRadiusX, setEllipseRadiusX] = useState<number>(0);
    const [ellipseRadiusY, setEllipseRadiusY] = useState<number>(0);
    const [arcs, setArcs] = useState<JSX.Element | null[]>([]);
    const [lines, setLines] = useState<JSX.Element[]>([]);

    const { worldName } = useParams<string>();

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            const data = await UserApiServiceInstance.getWorldData(
                "russian",
                worldName,
            );
            rootStore.setWorldData(data);
            const tasksData = data?.map((obj: IActivity) => {
                return {
                    egeId: obj.egeId,
                    info: obj.info,
                    current: false,
                };
            });
            setTasks(tasksData);

            setLoading(false);
        };
        fetchTasks();
    }, []);

    useEffect(() => {
        if (screens.md) {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            // Parameters for the ellipse
            setEllipseRadiusX(window.innerWidth / 3); // Change this to adjust the width of the ellipse
            setEllipseRadiusY(window.innerHeight / 3); // Change this to adjust the height of the ellipse

            for (let i = 0; i < tasks.length; i++) {
                // Calculate the position in the ellipse
                const angle =
                    ((2 * Math.PI) / tasks.length) * i + (3 * Math.PI) / 4;
                const x = centerX + ellipseRadiusX * Math.cos(angle);
                const y = centerY + ellipseRadiusY * Math.sin(angle);

                // Position the button
                const buttonDiv = document.getElementById(`button${i}`);
                if (!buttonDiv) return;
                buttonDiv.style.position = "absolute";
                buttonDiv.style.left = `${x}px`;
                buttonDiv.style.top = `${y}px`;
            }

            // draw lines connecting buttons on large screen
            const lines = tasks.map((task, i) => {
                if (i < tasks.length - 1) {
                    const buttonRadius = 50;

                    // Get the positions of the current button and the next button
                    const buttonDiv1 = document.getElementById(`button${i}`);
                    const buttonDiv2 = document.getElementById(
                        `button${i + 1}`,
                    );
                    if (!buttonDiv1 || !buttonDiv2) return <></>;
                    const x1 = parseInt(buttonDiv1.style.left) + buttonRadius;
                    const y1 =
                        parseInt(buttonDiv1.style.top) +
                        buttonRadius -
                        headerSize;
                    const x2 = parseInt(buttonDiv2.style.left) + buttonRadius;
                    const y2 =
                        parseInt(buttonDiv2.style.top) +
                        buttonRadius -
                        headerSize;

                    // Create a path element
                    return (
                        <path
                            d={`M ${x1} ${y1} A ${ellipseRadiusX} ${ellipseRadiusY} 0 0 1 ${x2} ${y2}`}
                            stroke="#FFFFFF40"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray="4"
                        />
                    );
                }
            });
            setLines(lines);
        } else {
            setLines([]);
            if (!screens.md) {
                if (tasks.length == 0) return;
                const arcList = tasks.map((task, i) => {
                    if (i < tasks.length - 1) {
                        const buttonRadius = 50;

                        // Get the positions of the current button and the next button
                        const buttonDiv1 = document.getElementById(
                            `button${i}`,
                        );
                        const buttonDiv2 = document.getElementById(
                            `button${i + 1}`,
                        );
                        if (!buttonDiv1 || !buttonDiv2) return null;
                        const x1 =
                            buttonDiv1.getBoundingClientRect().left +
                            buttonRadius;
                        const y1 = buttonDiv1.getBoundingClientRect().top;
                        const x2 =
                            buttonDiv2.getBoundingClientRect().left +
                            buttonRadius;
                        const y2 = buttonDiv2.getBoundingClientRect().top;

                        if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
                            console.error("Invalid coordinates:", {
                                x1,
                                y1,
                                x2,
                                y2,
                            });
                            return null;
                        }

                        return (
                            <path
                                key={i}
                                d={`M ${x1} ${y1} A ${ellipseRadiusX} ${ellipseRadiusY} 0 0 1 ${x2} ${y2}`}
                                stroke="#FFFFFF40"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="4"
                            />
                        );
                    }
                    return null;
                });
                setArcs(arcList);
                console.log(arcList);
            }
        }
        // if (screen.xs || screen.sm) draw arcs that will connect buttons
    }, [screens, tasks, ellipseRadiusX, ellipseRadiusY]);
    return (
        <>
            {!screens.md && (
                <>
                    <div
                        style={{
                            width: "100vw",
                            height: "150vh%",
                            backgroundColor: "#1C0E2B",
                        }}
                    >
                        {tasks != undefined && (
                            <svg
                                style={{
                                    position: "absolute",
                                    top: headerSize,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                {arcs}
                            </svg>
                        )}
                        {tasks.map((task, index) => {
                            return (
                                <Row
                                    // justify={"space-between"}
                                    justify={"center"}
                                    key={task.egeId}
                                    style={{
                                        paddingTop: "30px",
                                    }}
                                >
                                    {index % 2 == 0 && <Col span={14}></Col>}
                                    <Col>
                                        <ActivityCard
                                            index={index}
                                            task={task}
                                            active={index == 0}
                                        />
                                    </Col>
                                    {index % 2 != 0 && <Col span={14}></Col>}
                                </Row>
                            );
                        })}
                        <Row justify={"center"}>
                            <img src={colors[worldName].bossImage} alt="boss" />
                        </Row>
                    </div>
                </>
            )}
            {screens.md && (
                <>
                    {tasks != undefined && (
                        <svg
                            style={{
                                position: "absolute",
                                top: headerSize,
                                left: 0,
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            {lines}
                        </svg>
                    )}
                    <div
                        style={{
                            width: "100vw",
                            height: "100vh",
                            backgroundColor: "#1C0E2B",
                        }}
                    >
                        {tasks.map((task, index) => {
                            return (
                                <ActivityCard
                                    index={index}
                                    key={task.egeId}
                                    task={task}
                                    active={index == 0}
                                />
                            );
                        })}
                    </div>
                    <img
                        src={colors[worldName].bossImage}
                        alt="boss"
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            margin: "auto",
                        }}
                    />
                </>
            )}
        </>
    );
});

export default World;
