import BarChart from "@ui/Charts/BarChart";

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

const Barcharts = () => {
    return (
        <section className="main-section flex flex-col gap-20 justify-center sm:justify-stretch sm:items-center">

            <h1 className="title md:text-3xl">Bar Charts</h1>

            <article className="px-5 py-4 flex flex-col gap-10 justify-center items-center bg-primary-100 rounded-md w-full md:w-7/12 lg:w-5/6 xl:w-4/6">
                <BarChart
                    data_2={[300, 144, 433, 655, 237, 755, 190]}
                    data_1={[200, 444, 343, 556, 778, 455, 990]}
                    title_1="Products"
                    title_2="Users"
                    bgColor_1={`hsl(260, 50%, 30%)`}
                    bgColor_2={`hsl(360, 90%, 90%)`}
                    textColor="white"
                />
                <h2 className="subtitle md:text-xl">Top Products & Top Customers</h2>
            </article>

            <article className="px-5 py-4 flex flex-col gap-10 justify-center items-center bg-primary-100 rounded-md w-full md:w-7/12 lg:w-5/6 xl:w-4/6">
                <BarChart
                    horizontal={true}
                    data_1={[
                        200, 444, 343, 556, 778, 455, 990, 444, 122, 334, 890, 909,
                    ]}
                    data_2={[]}
                    title_1="Orders"
                    title_2=""
                    bgColor_1={`hsl(180, 40%, 50%)`}
                    bgColor_2=""
                    labels={months}
                    textColor="white"
                />
                <h2 className="subtitle md:text-xl">Orders throughout the year</h2>
            </article>
        </section>
    );
};

export default Barcharts;
