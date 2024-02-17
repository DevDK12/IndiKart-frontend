import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../../../../components/ui/TableHOC";




interface DataType {
    user: string;
    amount: number;
    discount: number;
    quantity: number;
    status: ReactElement;
    action: ReactElement;
}




const arr: Array<DataType> = [
    {
        user: "Charas",
        amount: 4500,
        discount: 400,
        status: <span className="text-red-500 font-semibold">Processing</span>,
        quantity: 3,
        action: <Link className="bg-cyan-400 px-4 py-2 rounded-lg font-semibold" to="/admin/transaction/sajknaskd">Manage</Link >,
    },

    {
        user: "Xavirors",
        amount: 6999,
        discount: 400,
        status: <span className="text-green-500 font-semibold">Shipped</span>,
        quantity: 6,
        action: <Link className="bg-cyan-400 px-4 py-2 rounded-lg font-semibold" to="/admin/transaction/sajknaskd">Manage</Link >,
    },

    {
        user: "Xavirors",
        amount: 6999,
        discount: 400,
        status: <span className="text-purple-500 font-semibold">Delivered</span>,
        quantity: 6,
        action: <Link className="bg-cyan-400 px-4 py-2 rounded-lg font-semibold" to="/admin/transaction/sajknaskd">Manage</Link >,
    },

];




const columns: Column<DataType>[] = [
    {
        Header: "User",
        accessor: "user",
    },
    {
        Header: "Amount",
        accessor: "amount",
    },
    {
        Header: "Discount",
        accessor: "discount",
    },
    {
        Header: "Quantity",
        accessor: "quantity",
    },
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Action",
        accessor: "action",
    },
];




const Transaction = () => {
    const [rows, setRows] = useState<DataType[]>(arr);

    const Table = TableHOC<DataType>(
        columns,
        rows,
        "main-container overflow-auto hide-scrollbar bg-primary-100",
        "Transactions",
        rows.length > 8,
        8
    );


    return (
        <div className="main-section">
            {Table()}
        </div>
    );
};

export default Transaction;
