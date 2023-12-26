import { H5PPlayerUI } from "@lumieducation/h5p-react";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { ContentServiceInstance } from "../api/ContentApiService";
import { useParams } from "react-router-dom";
import { IActivity } from "../api/models/IActivity";

import { UserApiServiceInstance } from "../api/UserApiService";

interface ParamTypes {
    [key: string]: string;
    worldName: string;
    egeId: string;
}

const TaskPage = observer(() => {
    // "/world/:worldName/:egeId"
    let { egeId } = useParams<ParamTypes>();
    const [loading, setLoading] = useState<boolean>(true);
    const [activity, setActivity] = useState<IActivity>();
    if (!egeId) {
        egeId = "1";
    }
    useEffect(() => {
        // const act = rootStore.worldData?.find((value, index) => {
        //     value.egeId == Number(egeId);
        // });

        // setActivity(act);
        const fetchActivityData = async () => {
            const data = await UserApiServiceInstance.getActivityData(
                "russian",
                Number(egeId),
            );
            // TODO: h5p folder
            // FIXME: redirect public folder to content_url
            data!.id = 662843439;
            setActivity(data);
            setLoading(false);
        };
        fetchActivityData();
    }, []);
    useEffect(() => {
        if (!loading) {
            ContentServiceInstance.getPlay(`${activity!.id}`).then((res) => {
                console.log(res);
            });
        }
    }, [loading]);

    // const h5pContentId = 712691482;
    // 1305333008
    // 951606419
    if (loading) {
        return <h1>loading</h1>;
    } else {
        return (
            <H5PPlayerUI
                contentId={`${activity!.id}`}
                loadContentCallback={async (contentId) => {
                    return ContentServiceInstance.getPlay(contentId);
                }}
            />
        );
    }
});
export default TaskPage;
