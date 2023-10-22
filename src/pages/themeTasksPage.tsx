import punctuation from "../assets/punctuation-boss.svg";
import punctuationplay from "../assets/punctuation-play.svg";
import punctuation16disabled from "../assets/punctuation16disabled.svg";
import punctuation17enabled from "../assets/punctuation17enabled.svg";
import punctuation18enabled from "../assets/punctuation18enabled.svg";
import punctuation19enabled from "../assets/punctuation19enabled.svg";
import punctuation20enabled from "../assets/punctuation20enabled.svg";
import punctuation21enabled from "../assets/punctuation21enabled.svg";

type Task = {
    number: number; // номер задания
    id: string; // что-то типо russian-20-4
};

interface HomePageProps {
    tasks: Array<Task>;
}

export default function ThemeTaskPage(props: HomePageProps) {
    // const punctuation =

    return (
        <>
            <div
                className="w-full h-screen flex flex-col justify-center items-center"
                style={{
                    background: "#10062B",
                    backgroundImage: "url(/background.svg)",
                }}
            >
                <div className="absolute left-[571px] top-[376px] ">
                    <img src={punctuation} />
                </div>
                <div className="absolute left-[120px] top-[705px]">
                    <img src={punctuationplay} />
                </div>
                <div className="absolute left-[840px] top-[813px]">
                    <a href="/video/russian-20-4">
                        <img src={punctuation16disabled} />
                    </a>
                </div>

                <div className="absolute left-[1174px] top-[253px]">
                    <a href="/video/russian-20-4">
                        <img src={punctuation17enabled} />
                    </a>
                </div>

                <div className="absolute left-[196px] top-[442px]">
                    <a href="/video/russian-20-4">
                        <img src={punctuation18enabled} />
                    </a>
                </div>
                <div className="absolute left-[533px] top-[735px]">
                    <a href="/video/russian-20-4">
                        <img src={punctuation19enabled} />
                    </a>
                </div>
                <div className="absolute left-[946px] top-[585px]">
                    <a href="/video/russian-20-4">
                        <img src={punctuation20enabled} />
                    </a>
                </div>
                <div className="absolute left-[699px] top-[167px]">
                    <a href="/video/russian-20-4">
                        <img src={punctuation21enabled} />
                    </a>
                </div>
            </div>
        </>
    );
}
