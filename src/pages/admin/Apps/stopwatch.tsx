import { useState, useEffect } from "react";

const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const hoursInString = hours.toString().padStart(2, "0");
    const minutesInString = minutes.toString().padStart(2, "0");
    const secondsInString = seconds.toString().padStart(2, "0");

    return `${hoursInString}:${minutesInString}:${secondsInString}`;
};

const Stopwatch = () => {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const resetHandler = () => {
        setTime(0);
        setIsRunning(false);
    };

    useEffect(() => {
        let intervalID: NodeJS.Timeout;
        if (isRunning)
            intervalID = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);

        return () => {
            clearInterval(intervalID);
        };
    }, [isRunning]);




    return (
        <section className="main-section h-full grid place-items-center">
            <main className="main-container bg-primary-100 w-full sm:w-4/5 md:w-3/5 lg:w-2/5">
                <h1 className="title mb-8">Stopwatch</h1>
                <div className="flex flex-col items-center gap-8">
                    <h2 className="text-5xl ">{formatTime(time)}</h2>
                    <div className="w-1/2 flex justify-around">
                        <button
                            className={`px-4 py-1 rounded-md ${isRunning ? "bg-yellow-500" : "bg-blue-500"}`}
                            onClick={() => setIsRunning((prev) => !prev)}
                        >
                            {isRunning ? "Stop" : "Start"}
                        </button>
                        <button className="px-4 py-1 rounded-md  bg-red-500" onClick={resetHandler}>Reset</button>
                    </div>
                </div>
            </main>
        </section>
    );
};

export default Stopwatch;
