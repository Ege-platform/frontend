import { Box } from "@mui/material";
import { useRef } from "react";

// @ts-ignore
import VideoJS from "../components/VideoJS";

export default function AuthVideo() {
    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: "https://assets.codepen.io/6093409/river.mp4",
                type: "video/mp4",
            },
        ],
    };
    const handlePlayerReady = (player: any) => {
        const playerRef = useRef(null);
        playerRef.current = player;

        // // You can handle player events here, for example:
        // player.on("waiting", () => {
        //     videojs.log("player is waiting");
        // });

        // player.on("dispose", () => {
        //     videojs.log("player will dispose");
        // });
    };
    return (
        <Box sx={{ width: 632, height: 532, m: 5 }}>
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            {/* <video
                autoPlay
                loop
                muted
                poster="https://assets.codepen.io/6093409/river.jpg"
                height={532}
                width={632}
            >
                <source
                    src="https://assets.codepen.io/6093409/river.mp4"
                    type="video/mp4"
                />
            </video> */}

            {/* <img
                src={LandingData}
                alt="landing_page"
                width="632"
                height="503"
                style={{ margin: 16 }}
            ></img> */}
        </Box>
    );
}
