import { useEffect } from "react";
import { H5P } from "h5p-standalone";

const VideoPlayer = () => {
    useEffect(() => {
        const el = document.getElementById("h5p-container");

        const options = {
            h5pJsonPath:
                "http://larek.itatmisis.ru:9999/static/h5p/russian-17-1/",
            frameJs:
                "/frame.bundle.js",
            frameCss: "h5p-styles/h5p.css",
        };

        const h5p = new H5P(el, options);

        h5p.then((res) => console.log(res)).catch((e) =>
            console.log("Err: ", e),
        );
    }, []);

    return <div id="h5p-container"></div>;
};
export default VideoPlayer;
