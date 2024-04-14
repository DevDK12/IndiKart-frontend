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
    return (
        <section className="main-section flex flex-col gap-20 justify-center sm:justify-stretch sm:items-center">

            <h1 className="title md:text-3xl">Line Charts</h1>

            <article className="px-5 py-4 flex flex-col gap-10 justify-center items-center bg-primary-100 rounded-md w-full md:w-7/12 lg:w-5/6 xl:w-4/6">
                <LineChart
                    data={[
                        200, 444, 444, 556, 778, 455, 990, 1444, 256, 447, 1000, 1200,
                    ]}
                    label="Users"
                    borderColor="rgb(53, 162, 255)"
                    labels={months}
                    backgroundColor="rgba(53, 162, 255, 0.5)"
                />
                <h2 className="subtitle md:text-xl">Active Users</h2>
            </article>

            <article className="px-5 py-4 flex flex-col gap-10 justify-center items-center bg-primary-100 rounded-md w-full md:w-7/12 lg:w-5/6 xl:w-4/6">
                <LineChart
                    data={[40, 60, 244, 100, 143, 120, 41, 47, 50, 56, 32]}
                    backgroundColor={"hsla(269,80%,40%,0.4)"}
                    borderColor={"hsl(269,80%,40%)"}
                    labels={months}
                    label="Products"
                />
                <h2 className="subtitle md:text-xl">Total Products (SKU)</h2>
            </article>

            <article className="px-5 py-4 flex flex-col gap-10 justify-center items-center bg-primary-100 rounded-md w-full md:w-7/12 lg:w-5/6 xl:w-4/6">
                <LineChart
                    data={[
                        24000, 14400, 24100, 34300, 90000, 20000, 25600, 44700, 99000,
                        144400, 100000, 120000,
                    ]}
                    backgroundColor={"hsla(129,80%,40%,0.4)"}
                    borderColor={"hsl(129,80%,40%)"}
                    label="Revenue"
                    labels={months}
                />
                <h2 className="subtitle md:text-xl">Total Revenue </h2>
            </article>

            <article className="px-5 py-4 flex flex-col gap-10 justify-center items-center bg-primary-100 rounded-md w-full md:w-7/12 lg:w-5/6 xl:w-4/6">
                <LineChart
                    data={[
                        9000, 12000, 12000, 9000, 1000, 5000, 4000, 1200, 1100, 1500,
                        2000, 5000,
                    ]}
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
