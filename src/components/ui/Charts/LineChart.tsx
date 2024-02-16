import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
    ArcElement,
    PointElement,
    LineElement,
    Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
);





const months = ["January", "February", "March", "April", "May", "June", "July"];




interface LineChartProps {
    data: number[];
    label: string;
    backgroundColor: string;
    borderColor: string;
    labels?: string[];
}




const LineChart = ({ data, label, backgroundColor, borderColor, labels = months }: LineChartProps) => {
    const options: ChartOptions<"line"> = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },

        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    const lineChartData: ChartData<"line", number[], string> = {
        labels,
        datasets: [
            {
                fill: true,
                label,
                data,
                backgroundColor,
                borderColor,
            },
        ],
    };

    return <Line options={options} data={lineChartData} />;
};


export default LineChart