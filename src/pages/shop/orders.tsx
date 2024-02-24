import { ReactElement, useEffect, useState } from "react";
import TableHOC from "../../components/ui/TableHOC"
import { Column } from "react-table";
import { Link } from "react-router-dom";



type DataType = {
    _id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: ReactElement;
    action: ReactElement;
};

const column: Column<DataType>[] = [
    {
        Header: "ID",
        accessor: "_id",
    },
    {
        Header: "Quantity",
        accessor: "quantity",
    },
    {
        Header: "Discount",
        accessor: "discount",
    },
    {
        Header: "Amount",
        accessor: "amount",
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




const Orders = () => {


    const [rows, setRows] = useState<DataType[]>([]);


    useEffect(() => {
        setRows([
            {
                _id: "12",
                amount: 5,
                discount: 50,
                quantity: 10,
                status: (
                    <span
                        className="text-red-400"
                    >
                        Processing
                    </span>
                ),
                action: <Link className="bg-cyan-400 text-white px-2 py-1 rounded" to={`/admin/transaction/12`}>Manage</Link>,
            },
            {
                _id: "12",
                amount: 5,
                discount: 50,
                quantity: 10,
                status: (
                    <span
                        className="text-red-400"
                    >
                        Processing
                    </span>
                ),
                action: <Link className="bg-cyan-400 text-white px-2 py-1 rounded" to={`/admin/transaction/12`}>Manage</Link>,
            },
        ],
        );
    }, []);


    const Table = TableHOC<DataType>(
        column,
        rows,
        "bg-primary-100 rounded-md px-4 py-4 w-full h-[80vh]",
        "Orders",
        rows.length > 6,
        6
    );

    return (
        <div className="
        h-full px-10 py-5 flex flex-col gap-10
        ">
            {Table()}
        </div>
    )
}
export default Orders