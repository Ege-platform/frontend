import { Card, Progress } from "antd";
import Star from "../assets/star.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { rootStore } from "../stores/RootStore";
import { UserApiServiceInstance } from "../api/UserApiService";

import colors from "../stores/index";
import { IActivitiesProgress } from "../api/models/IActivitiesProgress";


interface ProgressCardData {
    title: string;
    progress: number;
    color: string;
    url: string;
}
const cardsData = {
    norm: {
        title: "Мир норм",
        color: colors.norm.color,
        url: "/world/norm",
    },
    text: {
        title: "Мир текста",
        color: colors.text.color,
        url: "/world/text",
    },
    orthography: {
        title: "Мир орфографии",
        color: colors.orthography.color,
        url: "/world/orthography",
    },
    punctuation: {
        title: "Мир пунктуации",

        color: colors.punctuation.color,
        url: "/world/punctuation",
    },
};

const processActivitiesProgress = (
    data: IActivitiesProgress[],
): ProgressCardData[] => {
    const res = data.map((activityProgress: IActivitiesProgress) => {
        // assemble ProgressCardData from activityProgress by accessing cardData by key
        const card: ProgressCardData = cardsData[activityProgress.category];
        return {
            progress: activityProgress.category,
            title: card.title,
            color: card.color,
            url: card.url,
        };
    });

    return res;
};

const generateRandomProperties = () => {
    const x = Math.floor(Math.random() * window.innerWidth); // replace 1000 with the actual width of your map
    const y = Math.floor(Math.random() * 1000); // replace 1000 with the actual height of your map
    const opacity = Math.random(); // generates a random number between 0 (fully transparent) and 1 (fully opaque)
    const size = Math.floor(Math.random() * (8 - 2 + 1)) + 2; // generates a random number between 2 and 8
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
    border,
    url,
}: ProgressCardProps) => {
    return (
        <Link to={url}>
            <div
                style={{
                    borderRight:
                        border == "right"
                            ? "10px solid #fff"
                            : "2px solid #fff",
                    borderLeft:
                        border == "left" ? "10px solid #fff" : "2px solid #fff",
                    width: "250px",
                    background: `${color}`,
                    border: "2px solid #fff",
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
                    height: "1000px",
                    background: "#1E1E1E",
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
                                margin: "20px", // adjust as needed
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
