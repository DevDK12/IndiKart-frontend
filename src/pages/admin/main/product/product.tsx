import { ReactElement, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../../../../components/ui/TableHOC";
import { useUserProductsQuery } from "../../../../redux/api/productApi";
import { useSelector } from "react-redux";
import { IUserReducerInitialState } from "../../../../Types/user-types";
import toast from "react-hot-toast";
import { ErrorResponse } from "../../../../Types/apiTypes";



interface DataType {
    photo: ReactElement;
    name: string;
    price: number;
    stock: number;
    action: ReactElement;
}

const columns: Column<DataType>[] = [
    {
        Header: "Photo",
        accessor: "photo",
    },
    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Price",
        accessor: "price",
    },
    {
        Header: "Stock",
        accessor: "stock",
    },
    {
        Header: "Action",
        accessor: "action",
    },
];





const server = import.meta.env.VITE_SERVER;


const Products = () => {

    const { user } = useSelector((state: { userSlice: IUserReducerInitialState }) => state.userSlice);

    const [rows, setRows] = useState<DataType[]>([]);


    const { data: productsData, isError, isLoading: productsLoading, isSuccess, error } = useUserProductsQuery(user?._id as string);


    useEffect(() => {
        if (productsData && isSuccess) {
            const { data: { products } } = productsData;
            setRows(products.map(product => ({
                photo: <img className="w-20 rounded-md" src={`${server}/${product.photo}`} alt="Shoes" />,
                name: product.name,
                price: product.price,
                stock: product.stock,
                action: <Link className="bg-cyan-400 px-4 py-2 rounded-lg font-semibold" to={`/admin/product/${product._id}`}>Manage</Link>,
            })))
        }
    }, [productsData, isSuccess])




    if (isError) {
        const err = error as ErrorResponse;
        toast.error(err?.data?.message || 'No response from server');
    }



    const Table = TableHOC<DataType>(
        columns,
        rows,
        "main-container overflow-auto hide-scrollbar bg-primary-100",
        "Products",
        rows.length > 5,
        5
    );


    return (
        <div className="main-section">
            {productsLoading && <p>Loading Products...</p>}
            {Table()}
            <Link
                to="/admin/product/new"
                className="create-product-btn bg-red-600 fixed top-14 right-6 w-10 h-10 flex justify-center items-center rounded-full hover:opacity-85"
            >
                <FaPlus />
            </Link>
        </div>
    );
};

export default Products;
