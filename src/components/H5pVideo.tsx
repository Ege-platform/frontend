import { useEffect } from "react";
import { H5P } from "h5p-standalone";
import { api_host } from "../api";

const VideoPlayer = (props: { taskId: string }) => {
    useEffect(() => {
        async function myAwesomePlayer() {
            const el = document.getElementById("h5p-container");

            const options = {
                h5pJsonPath: `${api_host}/static/h5p/${props.taskId}`,
                frameJs: "/frame.bundle.js",
                frameCss: "/h5p-styles/h5p.css",
            };
            if (el && !el.hasChildNodes()) {
                console.log(el);
            } else if (el) {
                while (el.firstChild) {
                    el.removeChild(el.firstChild);
                }
            }
            const h5p = await new H5P(el, options);
            console.log(h5p);
            h5p.externalDispatcher.on("xAPI", (event) => {
                //do something useful with the event
                console.log("xAPI event: ", event);
            });
        }
        myAwesomePlayer();
        // const h5p = new H5P(el, options);
        // h5p.then(function () {
        //     console.log(h5p.externalDispatcher);

        //     h5p.externalDispatcher.on("xAPI", (event) => {
        //         console.log("xAPI event: ", event);
        //     });
        // });
    }, []);

    return <div id="h5p-container" className="min-w-[800px]" />;
};
export default VideoPlayer;
