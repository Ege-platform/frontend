import { Progress } from "antd";
import Star from "../assets/star.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { rootStore } from "../stores/RootStore";
import { UserApiServiceInstance } from "../api/UserApiService";

import { IActivitiesProgress } from "../api/models/IActivitiesProgress";
import { getWorldInfo } from "../utils/colors";

interface ProgressCardData {
    progress: string;
    title: string;
    color: string;
    url: string;
}
const cardsData = {
    norm: {
        title: "Мир норм",
        color: getWorldInfo("norm")!.color,
        url: "/world/norm",
        progress: "0",
    },
    text: {
        title: "Мир текста",
        color: getWorldInfo("text")!.color,
        url: "/world/text",
        progress: "0",
    },
    orthography: {
        title: "Мир орфографии",
        color: getWorldInfo("orthography")!.color,
        url: "/world/orthography",
        progress: "0",
    },
    punctuation: {
        title: "Мир пунктуации",
        color: getWorldInfo("punctuation")!.color,
        url: "/world/punctuation",
        progress: "0",
    },
};

function getCardsData(category: string) {
    if (category === "norm") {
        return cardsData.norm;
    }
    if (category === "text") {
        return cardsData.text;
    }
    if (category === "orthography") {
        return cardsData.orthography;
    }
    if (category === "punctuation") {
        return cardsData.punctuation;
    }

    return cardsData.norm;
}

const processActivitiesProgress = (
    data: IActivitiesProgress[],
): ProgressCardData[] => {
    return data.map((activityProgress: IActivitiesProgress) => {
        //assemble ProgressCardData from activityProgress by accessing cardData by key
        const card = getCardsData(activityProgress.category);
        card.progress = activityProgress.progress.toString();
        if (card.color === undefined) {
            card.color = "#fff";
        }

        return {
            ...card,
        };
    });
};

const generateRandomProperties = () => {
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * 1500);
    const opacity = Math.random();
    const size = Math.floor(Math.random() * (8 - 2 + 1)) + 2;
    return { x, y, opacity, size };
};

type ProgressCardProps = {
    title: string;
    progress: string;
    color: string;
    border: string;
    url: string;
};

const ProgressCard = ({
    title,
    progress,
    color,

    url,
}: ProgressCardProps) => {
    return (
        <Link to={url}>
            <div
                style={{
                    width: "250px",
                    background: `${color}`,
                    border: "4px solid #fff",
                    borderRadius: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h2
                    style={{
                        color: "#fff",
                        fontSize: "20px",
                        fontWeight: "bold",
                        padding: "10px",
                        border: "2px solid #fff",
                        borderRadius: "10px",
                    }}
                >
                    {title}
                </h2>
                <Progress
                    style={{ marginBottom: "10px", color: "#fff" }}
                    type="circle"
                    percent={parseInt(progress)}
                    format={(percent) => `${percent}%`}
                />
            </div>
        </Link>
    );
};

const Map = observer(() => {
    const [stars, setStars] = useState(
        Array.from({ length: 200 }).map((_, i) => {
            const { x, y, opacity, size } = generateRandomProperties();
            return (
                <img
                    key={i}
                    src={Star}
                    style={{
                        position: "absolute",
                        left: x,
                        top: y,
                        opacity: opacity,
                        width: `${size}px`,
                        height: `${size}px`,
                    }}
                />
            );
        }),
    );
    const [activitiesProgress, setActivitiesProgress] = useState<
        ProgressCardData[]
    >([]);

    useEffect(() => {
        setStars(
            Array.from({ length: 200 }).map((_, i) => {
                const { x, y, opacity, size } = generateRandomProperties();
                return (
                    <img
                        key={i}
                        src={Star}
                        style={{
                            position: "absolute",
                            left: x,
                            top: y,
                            opacity: opacity,
                            width: `${size}px`,
                            height: `${size}px`,
                        }}
                    />
                );
            }),
        );
        if (rootStore.mapData === null) {
            // setActivitiesProgress([]);
        } else {
            // setActivitiesProgress(processActivitiesProgress(rootStore.mapData));
        }
        const fetchActivitiesProgress = async () => {
            const data = await UserApiServiceInstance.getSubjectProgress();
            if (data != undefined) {
                rootStore.setMapData(data);

                setActivitiesProgress(processActivitiesProgress(data));
            }
        };
        fetchActivitiesProgress();
    }, []);

    return (
        <>
            <div
                style={{
                    position: "relative",
                    overflow: "hidden",
                    height: "1500px",
                    background: "#10062B",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                {stars}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {activitiesProgress.map((card, i) => (
                        <div
                            key={i}
                            style={{
                                alignSelf:
                                    i % 2 === 0 ? "flex-end" : "flex-start",
                                margin: "20px",
                            }}
                        >
                            <ProgressCard
                                key={i}
                                border={i % 2 === 0 ? "left" : "right"}
                                {...card}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
});

export default Map;
