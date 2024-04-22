import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { useMyOrdersQuery } from "../../redux/api/orderApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";


import TableHOC from "@components/ui/TableHOC"
import { RootState } from "@/redux/store";



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

    const {user, token} = useSelector((state: RootState) => state.userSlice);

    const [rows, setRows] = useState<DataType[]>([]);

    const {data, isError, isLoading, isSuccess, error} = useMyOrdersQuery({
        userId: user?._id as string,
        token: token!.access_token,
    });



    useEffect(()=>{
        if(isSuccess){
            setRows(data.data.orders.map(order => ({
                _id: order._id,
                amount: Number(order.total),
                discount: Number(order.discount),
                quantity: Number(order.orderItems.length),
                status: <span className={`text-${order.status === "processing" ? "red" : order.status === "shipped" ? "green" : "purple"}-500 font-semibold`}>{order.status}</span>,
                action: <Link className="bg-cyan-400 text-white px-2 py-1 rounded" to={`/order/${order._id}`}>View</Link >,
            })));
        }
    },[data, isSuccess]);



    if(isError){
        toast.error((error as Error).message);
    }



    const Table = TableHOC<DataType>(
        column,
        rows,
        "bg-primary-100 rounded-md px-4 py-4 w-full h-[80vh]",
        "Orders",
        rows.length > 6,
        6
    )();

    return (
        <div className="
        h-full px-10 py-5 flex flex-col gap-10
        ">
            {isLoading && <h1>Loading Orders...</h1>}
            {isSuccess && Table}
        </div>
    )
}
export default Orders