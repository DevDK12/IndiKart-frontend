import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import toast from "react-hot-toast";

import TableHOC from "@ui/TableHOC";
import { useAllOrdersQuery } from "@api/orderApi";
import { ErrorResponse } from "@/Types/apiTypes";




interface DataType {
    user: string;
    amount: number;
    discount: number;
    quantity: number;
    status: ReactElement;
    action: ReactElement;
}





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

    const {data, isError, isLoading, isSuccess, error} = useAllOrdersQuery();


    const [rows, setRows] = useState<DataType[]>([]);


    //_ order discount is not fetched properly
    //_ Same with order quantity 

    useEffect(()=>{
        if(isSuccess && data?.data?.orders){
            setRows(data.data.orders.map(order => ({
                user: order.user.email,
                amount: Number(order.total),
                discount: Number(order.discount),
                quantity: Number(order.orderItems.length),
                status: <span className={`text-${order.status === "processing" ? "red" : order.status === "shipped" ? "green" : "purple"}-500 font-semibold`}>{order.status}</span>,
                action: <Link className="bg-cyan-400 text-white px-4 py-2 rounded-lg font-semibold" to={`/admin/transaction/${order._id}`}>Manage</Link >,
            })));
        }
    },[data, isSuccess]);



    const Table = TableHOC<DataType>(
        columns,
        rows,
        "main-container overflow-auto hide-scrollbar bg-primary-100",
        "Transactions",
        rows.length > 8,
        8
    )();


    if(isError){
        toast.error((error as ErrorResponse).data.message);
    }

    return (
        <div className="main-section">
            {isLoading && <p>Loading Transactions...</p>}
            {isSuccess && 
                Table
            }
        </div>
    );
};

export default Transaction;
