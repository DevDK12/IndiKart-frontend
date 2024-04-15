import { Column } from "react-table";
import TableHOC from "@ui/TableHOC";
import { TLatestTransactions } from "@/Types/dashboard-types";




const columns: Column<TLatestTransactions>[] = [
    {
        Header: "Id",
        accessor: "_id",
    },
    {
        Header: "Quantity",
        // accessor: "quantity",
        accessor: "items",
    },
    {
        Header: "Discount",
        accessor: "discount",
    },
    {
        Header: "Amount",
        accessor: "total",
    },
    {
        Header: "Status",
        accessor: "status",
    },
];



const DashboardTable = ({ data = [] }: { data: TLatestTransactions[] }) => {
    return TableHOC<TLatestTransactions>(columns, data, "main-container w-full overflow-x-auto hide-scrollbar bg-primary-100 flex flex-col gap-4 ", "Top Transaction")();
};

export default DashboardTable;
