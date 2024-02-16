import { FormEvent, useEffect, useState } from "react";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const Coupon = () => {
    const [size, setSize] = useState<number>(8);
    const [prefix, setPrefix] = useState<string>("");
    const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
    const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
    const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const [coupon, setCoupon] = useState<string>("");

    const copyText = async (coupon: string) => {
        await window.navigator.clipboard.writeText(coupon);
        setIsCopied(true);
    };

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!includeNumbers && !includeCharacters && !includeSymbols)
            return alert("Please Select One At Least");

        let result: string = prefix || "";
        const loopLength: number = size - result.length;

        for (let i = 0; i < loopLength; i++) {
            let entireString: string = "";
            if (includeCharacters) entireString += allLetters;
            if (includeNumbers) entireString += allNumbers;
            if (includeSymbols) entireString += allSymbols;

            const randomNum: number = ~~(Math.random() * entireString.length);
            result += entireString[randomNum];
        }

        setCoupon(result);
    };

    useEffect(() => {
        setIsCopied(false);
    }, [coupon]);

    return (
        <section className="main-section h-full grid place-items-center">
            <main className="main-container bg-primary-100 w-full sm:w-4/5 md:w-3/5 lg:w-2/5">
                <h1 className="title mb-8">Coupon</h1>
                <form className="coupon-form grid grid-cols-3 grid-rows-[repeat(3, 200px)] gap-x-4 gap-y-4 auto-rows-min" onSubmit={submitHandler}>

                    <input
                        className="row-start-1 col-span-2 px-3 py-1 rounded-md border-2 outline-none border-white bg-primary-100"
                        type="text"
                        placeholder="Text to include"
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value)}
                        maxLength={size}
                    />

                    <input
                        className="row-start-1 col-span-1 px-3 py-1 rounded-md border-2 outline-none border-white bg-primary-100"
                        type="number"
                        placeholder="Coupon Length"
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                        min={8}
                        max={25}
                    />

                    <fieldset className="px-4 py-2 col-span-full gap-2 flex flex-col sm:gap-0 sm:flex-row sm:justify-around border-2">
                        <legend>Include</legend>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                checked={includeNumbers}
                                onChange={() => setIncludeNumbers((prev) => !prev)}
                            />
                            <span>Numbers</span>
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                checked={includeCharacters}
                                onChange={() => setIncludeCharacters((prev) => !prev)}
                            />
                            <span>Characters</span>
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                checked={includeSymbols}
                                onChange={() => setIncludeSymbols((prev) => !prev)}
                            />
                            <span>Symbols</span>
                        </div>
                    </fieldset>
                    <button className="px-3 py-1 row-start-3 col-span-full w-1/3 place-self-center rounded-md bg-cyan-400 font-semibold" type="submit">Generate</button>
                </form>

                {coupon && (
                    <div className="mt-5 grid place-items-center">
                        <code className="bg-gray-200 text-gray-600 px-3 py-2 rounded-md" >
                            {coupon}{" "}
                            <span className="bg-gray-600 text-gray-100 px-3 py-1 rounded-md cursor-pointer" onClick={() => copyText(coupon)}>
                                {isCopied ? "Copied" : "Copy"}
                            </span>{" "}
                        </code>
                    </div>
                )}
            </main>
        </section>
    );
};

export default Coupon;
