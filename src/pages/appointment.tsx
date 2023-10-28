import { H5PPlayerUI, H5PEditorUI } from "@lumieducation/h5p-react";

export default function TaskPage() {
    return (
        <H5PPlayerUI
            contentId="XXXX"
            loadContentCallback={async (contentId) => {
                /** retrieve content model from server and return it as Promise **/
            }}
        />
    );
}
