import DoughnutChart from "@ui/Charts/DoughnutChart";
import PieChart from "@ui/Charts/PieChart";

import data from '@assets/data.json';






const PieCharts = () => {
    return (
        <section className="main-section">

            <h1 className="title md:text-3xl mb-20">Pie & Doughnut Charts</h1>

            <div className="grid grid-cols-1 gap-10 justify-center justify-items-center items-center sm:grid-cols-2 lg:grid-cols-3">

                <article className="px-5 py-4 flex flex-col justify-center items-center bg-primary-100 rounded-md min-w-[200px] w-2/3 sm:w-full lg:w-3/4">
                    <PieChart
                        labels={["Processing", "Shipped", "Delivered"]}
                        data={[12, 9, 13]}
                        backgroundColor={[
                            `hsl(110,80%, 80%)`,
                            `hsl(110,80%, 50%)`,
                            `hsl(110,40%, 50%)`,
                        ]}
                        offset={[0, 0, 50]}
                    />
                    <h2 className="subtitle md:text-xl ">Order Fulfillment Ratio</h2>
                </article>

                <article className="px-5 py-4 flex flex-col justify-center items-center bg-primary-100 rounded-md min-w-[200px] w-2/3 sm:w-full lg:w-3/4">
                    <DoughnutChart
                        labels={data.categories.map((i) => i.heading)}
                        data={data.categories.map((i) => i.value)}
                        backgroundColor={data.categories.map(
                            (i) => `hsl(${i.value * 4}, ${i.value}%, 50%)`
                        )}
                        legends={false}
                        offset={[0, 0, 0, 80]}
                    />
                    <h2 className="subtitle md:text-xl">Product Categories Ratio</h2>
                </article>
                <article className="px-5 py-4 flex flex-col justify-center items-center bg-primary-100 rounded-md min-w-[200px] w-2/3 sm:w-full lg:w-3/4">
                    <DoughnutChart
                        labels={["In Stock", "Out Of Stock"]}
                        data={[40, 20]}
                        backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                        legends={false}
                        offset={[0, 80]}
                        cutout={"70%"}
                    />
                    <h2 className="subtitle md:text-xl"> Stock Availability</h2>
                </article>
                <article className="px-5 py-4 flex flex-col justify-center items-center bg-primary-100 rounded-md min-w-[200px] w-2/3 sm:w-full lg:w-3/4">
                    <DoughnutChart
                        labels={[
                            "Marketing Cost",
                            "Discount",
                            "Burnt",
                            "Production Cost",
                            "Net Margin",
                        ]}
                        data={[32, 18, 5, 20, 25]}
                        backgroundColor={[
                            "hsl(110,80%,40%)",
                            "hsl(19,80%,40%)",
                            "hsl(69,80%,40%)",
                            "hsl(300,80%,40%)",
                            "rgb(53, 162, 255)",
                        ]}
                        legends={false}
                        offset={[20, 30, 20, 30, 80]}
                    />
                    <h2 className="subtitle md:text-xl">Revenue Distribution</h2>
                </article>
                <article className="px-5 py-4 flex flex-col justify-center items-center bg-primary-100 rounded-md min-w-[200px] w-2/3 sm:w-full lg:w-3/4">
                    <PieChart
                        labels={[
                            "Teenager(Below 20)",
                            "Adult (20-40)",
                            "Older (above 40)",
                        ]}
                        data={[30, 250, 70]}
                        backgroundColor={[
                            `hsl(10, ${80}%, 80%)`,
                            `hsl(10, ${80}%, 50%)`,
                            `hsl(10, ${40}%, 50%)`,
                        ]}
                        offset={[0, 0, 50]}
                    />
                    <h2 className="subtitle md:text-xl">Users Age Group</h2>
                </article>
                <article className="px-5 py-4 flex flex-col justify-center items-center bg-primary-100 rounded-md min-w-[200px] w-2/3 sm:w-full lg:w-3/4">
                    <DoughnutChart
                        labels={["Admin", "Customers"]}
                        data={[40, 250]}
                        backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                        offset={[0, 50]}
                    />
                    <h2 className="subtitle md:text-xl">Label unknown</h2>
                </article>
            </div>
        </section>
    );
};

export default PieCharts;
