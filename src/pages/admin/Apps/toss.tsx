import { useState } from "react";



const Toss = () => {
    const [angle, setAngle] = useState<number>(0);

    const flipCoin = () => {
        if (Math.random() > 0.5) setAngle((prev) => prev + 180);
        else setAngle((prev) => prev + 360);
    };


    return (
        <section className="main-section h-full grid place-items-center">
            <main className="main-container bg-primary-100 flex flex-col items-center w-full sm:w-4/5 md:w-3/5 lg:w-2/5">
                <h1 className="title mb-8">Toss</h1>
                <article
                    className="w-40 h-40 relative cursor-pointer tosscoin transform transition-all duration-200"
                    onClick={flipCoin}
                    style={{
                        transform: `rotateY(${angle}deg)`,
                    }}
                >
                    <div className="rounded-full w-full h-full absolute grid place-items-center bg-no-repeat bg-contain coin-head"></div>
                    <div className="rounded-full w-full h-full absolute grid place-items-center bg-no-repeat bg-contain coin-tail"></div>
                </article>

            </main>
        </section>
    );
};

export default Toss;
