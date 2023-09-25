import H5pVideo from "../components/H5pVideo";

export default function VideoPage() {
    return (
        <>
            <h1>Video page</h1>
            <div
                className="w-full h-screen flex flex-col justify-center items-center"
                style={{
                    background: "#10062B",
                    backgroundImage: "url(/background.svg)",
                }}
            >
                <H5pVideo />
            </div>
        </>
    );
}
