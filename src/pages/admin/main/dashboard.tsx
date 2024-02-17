import AdminHeader from "../../../components/admin/AdminHeader"
import WidgetItem from "../../../components/admin/WidgetItem"

import data from '../../../assets/data.json'
import CategoryItem from "../../../components/admin/CategoryItem"
import BarChart from "../../../components/ui/Charts/BarChart"
import { BiMaleFemale } from "react-icons/bi"
import DoughnutChart from "../../../components/ui/Charts/DoughnutChart"
import DashboardTable from "../../../components/admin/DashboardTable"






const Dashboard = () => {
    return (
        <>

            {/* Widget section */}
            <section
                className="main-section grid grid-cols-1 justify-between items-stretch gap-2
                        sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 xl:gap-8"
            >
                <WidgetItem
                    percent={40}
                    amount={true}
                    value={340000}
                    heading="Revenue"
                    color="blue"
                    txtColor="text-blue-400"
                />
                <WidgetItem
                    percent={-14}
                    value={400}
                    color="cyan"
                    txtColor="text-cyan-400"
                    heading="Users"
                />
                <WidgetItem
                    percent={80}
                    value={23000}
                    color="yellow"
                    txtColor="text-yellow-400"
                    heading="Transactions"
                />

                <WidgetItem
                    percent={30}
                    value={1000}
                    color="blue"
                    txtColor="text-blue-400"
                    heading="Products"
                />
            </section>



            <section
                className="main-section grid grid-cols-1 gap-4 
                    md:grid-cols-3 lg:grid-cols-4"
            >
                <div
                    className="bg-primary-100 main-container grid place-items-center
                    md:col-span-2 lg:col-span-3 "
                >
                    <h2 className="subtitle text-base xs:text-xl sm:text-2xl text-center">Revenue & Transaction</h2>

                    <BarChart
                        data_2={[300, 144, 433, 655, 237, 755, 190]}
                        data_1={[200, 444, 343, 556, 778, 455, 990]}
                        title_1="Revenue"
                        title_2="Transaction"
                        bgColor_1="rgb(0, 115, 255)"
                        bgColor_2="rgba(53, 162, 235, 0.8)"
                        textColor="text-white"
                    />

                </div>



                <div className="main-container bg-primary-100  flex flex-col gap-8">
                    <h2 className="subtitle text-base xs:text-xl sm:text-2xl text-center">Inventory</h2>

                    <div className="flex flex-col gap-2 overflow-y-auto hide-scrollbar">
                        {data.categories.map((i) => (
                            <CategoryItem
                                key={i.heading}
                                value={i.value}
                                heading={i.heading}
                                color={`hsl(${i.value * 4}, ${i.value}%, 50%)`}
                            />
                        ))}
                    </div>
                </div>
            </section>


            <section className="main-section flex flex-col gap-4 md:flex-row">
                <div className="main-container w-full md:max-w-80 bg-primary-100  flex flex-col gap-4 items-center relative">
                    <h2 className="subtitle text-base xs:text-xl sm:text-2xl text-center">Gender Ratio</h2>
                    <div className="h-72 w-72">
                        <DoughnutChart
                            labels={["Female", "Male"]}
                            data={[12, 19]}
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
                <DashboardTable data={data.transaction} />
            </section>
        </>
    )
}


export default Dashboard