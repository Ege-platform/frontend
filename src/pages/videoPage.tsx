import { useParams, useNavigate } from "react-router-dom";
import H5pVideo from "../components/H5pVideo";

export default function VideoPage() {
    let { videoId } = useParams();
    let navigate = useNavigate();
    if (videoId) {
        return (
            <div
                className="w-full h-screen flex flex-col justify-center items-center"
                style={{
                    background: "#10062B",
                    backgroundImage: "url(/background.svg)",
                }}
            >
                <H5pVideo taskId={videoId} />
            </div>
        );
    }else{
        navigate("")
    }
}
