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
import { Doughnut } from "react-chartjs-2";

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








interface DoughnutChartProps {
    labels: string[];
    data: number[];
    backgroundColor: string[];
    cutout?: number | string;
    legends?: boolean;
    offset?: number[];
}



const DoughnutChart = ({ labels, data, backgroundColor, cutout, legends = true, offset }: DoughnutChartProps) => {

    const doughnutData: ChartData<"doughnut", number[], string> = {
        labels,
        datasets: [
            {
                data,
                backgroundColor,
                borderWidth: 0,
                offset,
            },
        ],
    };

    const doughnutOptions: ChartOptions<"doughnut"> = {
        responsive: true,
        plugins: {
            legend: {
                display: legends,
                position: "bottom",
                labels: {
                    padding: 40,
                },
            },
        },
        cutout,
    };

    return <Doughnut data={doughnutData} options={doughnutOptions} /> 
};

export default DoughnutChart;