import { useEffect } from "react";
import { H5P } from "h5p-standalone";

const VideoPlayer = () => {
    useEffect(() => {
        const el = document.getElementById("h5p-container");

        const options = {
            h5pJsonPath:
                "http://Egors-MacBook-Pro.local:9999/static/h5p/russian-22-1",
            frameJs: "/frame.bundle.js",
            frameCss: "h5p-styles/h5p.css",
            frame: false, //required to display copyright,  embed, & export buttons

            export: false,
            icon: false,
        };

        const h5p = new H5P(el, options);

        h5p.then(function () {
            H5P.externalDispatcher.on("xAPI", (event) => {
                //do something useful with the event
                console.log("xAPI event: ", event);
            });
        });
    }, []);

    return <div id="h5p-container" />;
};
export default VideoPlayer;
