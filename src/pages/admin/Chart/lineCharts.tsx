import toast from "react-hot-toast";

import { useLineStatsQuery } from "@/redux/api/dashboardApi";
import { ErrorResponse } from "@/Types/apiTypes";
import LineChart from "@ui/Charts/LineChart";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
];

const LineCharts = () => {

    
    const {data, isError, isLoading, isSuccess, error} = useLineStatsQuery();

    if(isError ){
        toast.error((error as ErrorResponse)?.data.message);
        return <>
            Error loading Dashboard ...
        </>
    }


    if(isLoading || !data){
        return (
            <>
                Loading Dashboard ...
            </>
        )
    }

    const charts = data.data.charts;


    if(isSuccess)
    return (
        <section className="main-section flex flex-col gap-20 justify-center sm:justify-stretch sm:items-center">

            <h1 className="title md:text-3xl">Line Charts</h1>

            <article className="px-5 py-4 flex flex-col gap-10 justify-center items-center bg-primary-100 rounded-md w-full md:w-7/12 lg:w-5/6 xl:w-4/6">
                <LineChart
                    data={charts.users}
                    label="Users"
                    borderColor="rgb(53, 162, 255)"
                    labels={months}
                    backgroundColor="rgba(53, 162, 255, 0.5)"
                />
                <h2 className="subtitle md:text-xl">Active Users</h2>
            </article>

            <article className="px-5 py-4 flex flex-col gap-10 justify-center items-center bg-primary-100 rounded-md w-full md:w-7/12 lg:w-5/6 xl:w-4/6">
                <LineChart
                    data={charts.products}
                    backgroundColor={"hsla(269,80%,40%,0.4)"}
                    borderColor={"hsl(269,80%,40%)"}
                    labels={months}
                    label="Products"
                />
                <h2 className="subtitle md:text-xl">Total Products (SKU)</h2>
            </article>

            <article className="px-5 py-4 flex flex-col gap-10 justify-center items-center bg-primary-100 rounded-md w-full md:w-7/12 lg:w-5/6 xl:w-4/6">
                <LineChart
                    data={charts.revenue}
                    backgroundColor={"hsla(129,80%,40%,0.4)"}
                    borderColor={"hsl(129,80%,40%)"}
                    label="Revenue"
                    labels={months}
                />
                <h2 className="subtitle md:text-xl">Total Revenue </h2>
            </article>

            <article className="px-5 py-4 flex flex-col gap-10 justify-center items-center bg-primary-100 rounded-md w-full md:w-7/12 lg:w-5/6 xl:w-4/6">
                <LineChart
                    data={charts.discount}
                    backgroundColor={"hsla(29,80%,40%,0.4)"}
                    borderColor={"hsl(29,80%,40%)"}
                    label="Discount"
                    labels={months}
                />
                <h2 className="subtitle md:text-xl">Discount Allotted </h2>
            </article>
        </section>
    );
};

export default LineCharts;
