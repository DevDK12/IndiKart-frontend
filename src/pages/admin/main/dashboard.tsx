import { BiMaleFemale } from "react-icons/bi"
import toast from "react-hot-toast"


import WidgetItem from "@components/admin/WidgetItem"
import CategoryItem from "@components/admin/CategoryItem"
import BarChart from "@ui/Charts/BarChart"
import DoughnutChart from "@ui/Charts/DoughnutChart"
import DashboardTable from "@components/admin/DashboardTable"
import { useDashboardStatsQuery } from "@/redux/api/dashboardApi"
import { ErrorResponse } from "react-router-dom"






const Dashboard = () => {


    const {data, isError, isLoading, isSuccess, error} = useDashboardStatsQuery();

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

    const stats = data.data.stats;


    if(isSuccess)
        return (
            <>
                {/* Widget section */}
                <section
                    className="main-section grid grid-cols-1 justify-between items-stretch gap-2
                            sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 xl:gap-8"
                >
                    <WidgetItem
                        percent={stats.changePercent.revenue}
                        amount={true}
                        value={stats.count.revenue}
                        heading="Revenue"
                        color="blue"
                        txtColor="text-blue-400"
                    />
                    <WidgetItem
                        percent={stats.changePercent.users}
                        value={stats.count.users}
                        color="cyan"
                        txtColor="text-cyan-400"
                        heading="Users"
                    />
                    <WidgetItem
                        percent={stats.changePercent.orders}
                        value={stats.count.orders}
                        color="yellow"
                        txtColor="text-yellow-400"
                        heading="Transactions"
                    />

                    <WidgetItem
                        percent={stats.changePercent.products}
                        value={stats.count.products}
                        color="blue"
                        txtColor="text-blue-400"
                        heading="Products"
                    />
                </section>



                <section
                    className="main-section grid grid-cols-1 gap-4 
                        lg:grid-cols-5"
                >
                    <div
                        className="bg-primary-100 main-container grid place-items-center
                        md:col-span-2 lg:col-span-3 "
                    >
                        <h2 className="subtitle text-base xs:text-xl sm:text-2xl text-center">Revenue & Transaction</h2>

                        <BarChart
                            data_1={stats.chart.lastSixMonthsRevenue}
                            data_2={stats.chart.lastSixMonthsOrders}
                            title_1="Revenue"
                            title_2="Transaction"
                            bgColor_1="rgb(0, 115, 255)"
                            bgColor_2="rgba(53, 162, 235, 0.8)"
                            textColor="text-white"
                        />

                    </div>



                    <div className="main-container bg-primary-100 flex flex-col gap-8 lg:col-span-2 ">
                        <h2 className="subtitle text-base xs:text-xl sm:text-2xl text-center">Inventory</h2>

                        <div className="flex flex-col h-[300px] gap-2 overflow-y-auto px-2 pr-6">
                            {stats.categories.list.map((i) => {
                                const percent = Number((i.count / stats.categories.total * 100).toFixed(2));
                                return <CategoryItem
                                    key={i.name}
                                    value={percent}
                                    heading={i.name}
                                    color={`hsl(${percent * 4}, ${percent}%, 50%)`}
                                />
                            })}
                        </div>
                    </div>
                </section>


                <section className="main-section flex flex-col gap-4 md:flex-row">
                    <div className="main-container w-full md:max-w-80 bg-primary-100  flex flex-col gap-4 items-center relative">
                        <h2 className="subtitle text-base xs:text-xl sm:text-2xl text-center">Gender Ratio</h2>
                        <div className="h-72 w-72">
                            <DoughnutChart
                                labels={["Female", "Male"]}
                                data={[stats.userRatio.female, stats.userRatio.male]}
                                backgroundColor={[
                                    "hsl(340, 82%, 56%)",
                                    "rgba(53, 162, 235, 0.8)",
                                ]}
                                cutout={90}
                            />
                            <p className="absolute top-1/2 left-1/2 transform -transalte-x-1/2 -transalte-y-1/2 ">
                                <BiMaleFemale />
                            </p>
                        </div>
                    </div>
                    <DashboardTable data={stats.latestTransactions} />
                </section>
            </>
        )
}


export default Dashboard