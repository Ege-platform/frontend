//TODO: изменение svg босса в зависимотси от мира и добавить ссылку на h5p

import { TaskButton, TaskInfo } from "../components/taskButton";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { rootStore } from "../stores/RootStore";
import { UserApiServiceInstance } from "../api/UserApiService";

import rightLines from "../assets/right-lines.svg";
import leftLines from "../assets/left-lines.svg";
import colors from "../stores/index";
import { IActivity } from "../api/models/IActivity";

interface ITaskData {
    egeId: number;
    info: string;
    current: boolean;
}

const data = {
    world: "мир пунктуации",
    tasks: [
        {
            egeId: 4,
            info: "Знаки препинания при обращении и вводных слова",
            current: true,
        },
        {
            egeId: 5,
            info: "Знаки препинания при обращении и вводных слова",
            current: false,
        },
        {
            egeId: 6,
            info: "Знаки препинания при обращении и вводных слова",
            current: false,
        },
        {
            egeId: 7,
            info: "Знаки препинания при обращении и вводных слова",
            current: false,
        },
        {
            egeId: 8,
            info: "Знаки препинания при обращении и вводных слова",
            current: false,
        },
    ],
};

type WorldProps = {
    tasks: {
        number: number;
        info: string;
        current: boolean;
    }[];
};

interface ParamTypes {
    worldName: string;
}

const World = observer(() => {
    const [tasks, setTasks] = useState<ITaskData[]>(data.tasks);
    let { worldName } = useParams<ParamTypes>();
    useEffect(() => {
        const fetchTasks = async () => {
            const data = await UserApiServiceInstance.getWorldData(
                "russian",
                worldName,
            );
            rootStore.setWorldData(data);
            const tasksData = data?.map((obj: IActivity) => {
                return {
                    egeId: obj.egeId,
                    info: obj.info,
                    current: true,
                };
            });
            setTasks(tasksData);
        };
        fetchTasks();
    }, []);

    return (
        <>
            <div
                style={{
                    backgroundColor: "#10062B",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    justifyItems: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        maxWidth: "200px",
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "space-evenly",
                        paddingTop: "20px",
                        backgroundImage: `url(${rightLines})`,
                    }}
                >
                    <TaskButton color={colors[worldName].color} />

                    <TaskInfo taskNumber={1} text={""} disabled />
                </div>

                {tasks.map((task, index) => {
                    // const lines = index % 2 === 0 ? leftLines : rightLines;

                    return (
                        <div
                            key={task.egeId}
                            style={{
                                // backgroundImage: { lines },
                                maxWidth: "200px",
                                backgroundImage: `url(${
                                    index % 2 === 0 ? leftLines : rightLines
                                })`,
                                display: "flex",
                                // alignItems: "center",
                                justifyContent: "space-evenly",
                            }}
                        >
                            {index % 2 === 0 ? (
                                <>
                                    <TaskInfo
                                        taskNumber={task.egeId}
                                        color={colors[worldName].color}
                                        text={task.info}
                                        disabled={!task.current}
                                    />

                                    <Link
                                        to={`/world/${worldName}/${task.egeId}`}
                                    >
                                        <TaskButton
                                            color={colors[worldName].color}
                                            taskNumber={task.egeId}
                                        />
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to={`/world/${worldName}/${task.egeId}`}
                                    >
                                        <TaskButton
                                            taskNumber={task.egeId}
                                            color={colors[worldName].color}
                                        />
                                    </Link>
                                    <TaskInfo
                                        color={colors[worldName].color}
                                        taskNumber={task.egeId}
                                        text={task.info}
                                        disabled={!task.current}
                                    />
                                </>
                            )}
                        </div>
                    );
                })}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        paddingTop: "20px",
                    }}
                >
                    <img
                        src={colors[worldName].bossImage}
                        alt="boss"
                        style={{ margin: "auto" }}
                    />
                </div>
            </div>
        </>
    );
});

export default World;
