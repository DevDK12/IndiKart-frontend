import toast from "react-hot-toast";

import { useLineStatsQuery } from "@/redux/api/dashboardApi";
import { ErrorResponse } from "@/Types/apiTypes";
import LineChart from "@ui/Charts/LineChart";
import { lastMonths } from "@/utils/functions";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";



const LineCharts = () => {

    const {token} = useSelector((state: RootState) => state.userSlice);


    const last12months = lastMonths()[1];

    
    const {data, isError, isLoading, isSuccess, error} = useLineStatsQuery(token!.access_token);


    useEffect(() => {
        if(isError){
            toast.error((error as ErrorResponse)?.data.message);
        }
    }, [isError, error])
    if(isLoading ){
        return (
            <>
                Loading Dashboard ...
            </>
        )
    }

    if(isError ){
        return <>
            Error loading Dashboard ...
        </>
    }



    const users = data?.data.charts.users || [];
    const products = data?.data.charts.products || [];
    const revenue = data?.data.charts.revenue || [];
    const discount = data?.data.charts.discount || [];

    if(isSuccess)
    return (
        <section className="main-section flex flex-col gap-20 justify-center sm:justify-stretch sm:items-center">

            <h1 className="title md:text-3xl">Line Charts</h1>

            <article className="px-5 py-4 flex flex-col gap-10 justify-center items-center bg-primary-100 rounded-md w-full md:w-7/12 lg:w-5/6 xl:w-4/6">
                <LineChart
                    data={users}
                    label="Users"
                    borderColor="rgb(53, 162, 255)"
                    labels={last12months}
                    backgroundColor="rgba(53, 162, 255, 0.5)"
                />
                <h2 className="subtitle md:text-xl">Active Users</h2>
            </article>

            <article className="px-5 py-4 flex flex-col gap-10 justify-center items-center bg-primary-100 rounded-md w-full md:w-7/12 lg:w-5/6 xl:w-4/6">
                <LineChart
                    data={products}
                    backgroundColor={"hsla(269,80%,40%,0.4)"}
                    borderColor={"hsl(269,80%,40%)"}
                    labels={last12months}
                    label="Products"
                />
                <h2 className="subtitle md:text-xl">Total Products (SKU)</h2>
            </article>

            <article className="px-5 py-4 flex flex-col gap-10 justify-center items-center bg-primary-100 rounded-md w-full md:w-7/12 lg:w-5/6 xl:w-4/6">
                <LineChart
                    data={revenue}
                    backgroundColor={"hsla(129,80%,40%,0.4)"}
                    borderColor={"hsl(129,80%,40%)"}
                    label="Revenue"
                    labels={last12months}
                />
                <h2 className="subtitle md:text-xl">Total Revenue </h2>
            </article>

            <article className="px-5 py-4 flex flex-col gap-10 justify-center items-center bg-primary-100 rounded-md w-full md:w-7/12 lg:w-5/6 xl:w-4/6">
                <LineChart
                    data={discount}
                    backgroundColor={"hsla(29,80%,40%,0.4)"}
                    borderColor={"hsl(29,80%,40%)"}
                    label="Discount"
                    labels={last12months}
                />
                <h2 className="subtitle md:text-xl">Discount Allotted </h2>
            </article>
        </section>
    );
};

export default LineCharts;
