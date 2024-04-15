import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import clsx from "clsx";

interface WidgetItemProps {
    heading: string;
    value: number;
    percent: number;
    color: string;
    txtColor: string;
    amount?: boolean;
}



const WidgetItem = ({ heading, value, percent, color, txtColor, amount }: WidgetItemProps) => {


    return (
        <article
            className="min-w-[230px] bg-primary-100 text-primary-txt shadow-lg rounded-md flex justify-between gap-4
                px-4 py-3 xs:px-8 sm:px-6 sm:w-11/12 sm:gap-3 lg:w-full xl:px-8"
        >
            <div >
                <p className="subtitle opacity-70 ">{heading}</p>
                <h4 className="text-lg font-semibold">{amount ? `₹${value}` : value}</h4>
                {percent >= 0 ? (
                    <span className="text-green-400 flex items-center gap-1">
                        <HiTrendingUp /> +{percent > 9999 ? '9999' : percent }%{" "}
                    </span>
                ) : (
                    <span className="text-red-400 flex items-center gap-1">
                        <HiTrendingDown /> ${percent < -9999 ? '-9999' : percent }%{" "}
                    </span>
                )}
            </div>

            <div
                className={`relative h-20 w-20 rounded-full flex-none grid place-items-center`}
                style={{
                    background: `conic-gradient(${color} ${(Math.abs(percent) / 100) * 360}deg, rgb(255, 255, 255) 0)`,
                }}
            >
                <div className="absolute w-16 h-16 bg-primary-100 rounded-full"></div>
                <span className={clsx(txtColor, 'font-bold relative')}>
                    {percent >= 0 && `${percent > 9999 ? '9999' : percent }%`}
                    {percent < 0 && `${percent < -9999 ? '-9999' : percent }%`}
                </span>
            </div>
        </article>
    )
}
export default WidgetItem