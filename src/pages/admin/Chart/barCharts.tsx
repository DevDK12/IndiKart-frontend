import { useBarStatsQuery } from "@/redux/api/dashboardApi";
import { RootState } from "@/redux/store";
import { ErrorResponse } from "@/Types/apiTypes";
import { lastMonths } from "@/utils/functions";
import BarChart from "@ui/Charts/BarChart";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";



const Barcharts = () => {

    const {token} = useSelector((state: RootState) => state.userSlice);

    const [last6months, last12months] = lastMonths();


    const {data, isError, isLoading, isSuccess, error} = useBarStatsQuery(token!.access_token);


    useEffect(() => {
        if(isError){
            toast.error((error as ErrorResponse)?.data.message);
        }
    }, [isError, error]);



    if(isError ){
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

            <h1 className="title md:text-3xl">Bar Charts</h1>

            <article className="px-5 py-4 flex flex-col gap-10 justify-center items-center bg-primary-100 rounded-md w-full md:w-7/12 lg:w-5/6 xl:w-4/6">
                <BarChart
                    data_1={charts.products}
                    data_2={charts.users}
                    title_1="Products"
                    title_2="Users"
                    bgColor_1={`hsl(260, 50%, 30%)`}
                    bgColor_2={`hsl(360, 90%, 90%)`}
                    textColor="white"
                    labels={last6months}
                />
                <h2 className="subtitle md:text-xl">Top Products & Top Customers</h2>
            </article>

            <article className="px-5 py-4 flex flex-col gap-10 justify-center items-center bg-primary-100 rounded-md w-full md:w-7/12 lg:w-5/6 xl:w-4/6">
                <BarChart
                    horizontal={true}
                    data_1={charts.orders}
                    data_2={[]}
                    title_1="Orders"
                    title_2=""
                    bgColor_1={`hsl(180, 40%, 50%)`}
                    bgColor_2=""
                    labels={last12months}
                    textColor="white"
                />
                <h2 className="subtitle md:text-xl">Orders throughout the year</h2>
            </article>
        </section>
    );
};

export default Barcharts;
