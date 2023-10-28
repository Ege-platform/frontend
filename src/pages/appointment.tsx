import { H5PPlayerUI } from "@lumieducation/h5p-react";
import { useEffect, useState } from "react";
import {
    ContentServiceInstance,
    IContentListEntry,
} from "../api/ContentApiService";

export default function TaskPage() {
    // [
    //     {
    //         contentId: "951606419",
    //         title: "Interactive Video",
    //         mainLibrary: "H5P.InteractiveVideo",
    //     },
    // ];

    const [content, setContent] = useState<IContentListEntry[]>([]);
    useEffect(() => {
        ContentServiceInstance.getPlay("951606419").then((res) => {
            console.log(res);
        });
    }, []);

    return (
        <H5PPlayerUI
            contentId="951606419"
            loadContentCallback={async (contentId) => {
                return ContentServiceInstance.getPlay(contentId);
            }}
        />
    );
}
