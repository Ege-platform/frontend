export default function HomePage() {
    const numButtons = 6;
    const radiusStep = 80;
    const angleStep = (2 * Math.PI) / numButtons;

    return (
        <>
            <div
                className="w-full h-screen flex flex-col justify-center items-center"
                style={{
                    background: "#10062B",
                    backgroundImage: "url(/background.svg)",
                }}
            >
                <div className="flex justify-center ">
                    {Array.from({ length: numButtons }, (_, i) => {
                        const radius = i * radiusStep;
                        const angle = i * angleStep;
                        const x = radius * Math.cos(angle);
                        const y = radius * Math.sin(angle);

                        return (
                            <div
                                key={i}
                                className="flex justify-center items-center rounded-full w-16 h-16 text-white border-4 border-indigo-600"
                                style={{
                                    fill: "radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.00) 100%)",
                                    boxShadow: "0 0 10px 5px #3B82F6",
                                    position: "absolute",
                                    top: `calc(50% - ${y}px)`,
                                    left: `calc(50% + ${x}px)`,
                                }}
                            >
                                <a
                                    className="text-3xl"
                                    href={`/video/${i + 1}`}
                                >
                                    {i + 1}
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
