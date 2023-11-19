import { H5PPlayerUI } from "@lumieducation/h5p-react";
import { useEffect, useState } from "react";
import { ContentServiceInstance } from "../api/ContentApiService";

export default function TaskPage() {
    const h5pContentId = 1633510156;
    // 1305333008
    // 951606419
    useEffect(() => {
        ContentServiceInstance.getPlay(`${h5pContentId}`).then((res) => {
            console.log(res);
        });
    }, []);

    return (
        <H5PPlayerUI
            contentId={`${h5pContentId}`}
            loadContentCallback={async (contentId) => {
                return ContentServiceInstance.getPlay(contentId);
            }}
        />
    );
}
