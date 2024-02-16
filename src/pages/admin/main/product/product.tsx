import { ReactElement, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../../../../components/ui/TableHOC";



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





const img = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";


const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg";



const arr: Array<DataType> = [
    {
        photo: <img className="w-20 rounded-md" src={img} alt="Shoes" />,
        name: "Puma Shoes Air Jordan Cook Nigga 2023",
        price: 690,
        stock: 3,
        action: <Link className="bg-cyan-400 px-4 py-2 rounded-lg font-semibold" to="/admin/product/sajknaskd">Manage</Link>,
    },

    {
        photo: <img className="w-20 rounded-md" src={img2} alt="Shoes" />,
        name: "Macbook",
        price: 232223,
        stock: 213,
        action: <Link className="bg-cyan-400 px-4 py-2 rounded-lg font-semibold" to="/admin/product/sdaskdnkasjdn">Manage</Link>,
    },

];





const Products = () => {
    const [rows, setRows] = useState<DataType[]>(arr);


    const Table = TableHOC<DataType>(
        columns,
        rows,
        "main-container overflow-y-auto bg-primary-100",
        "Products",
        rows.length > 5,
        5
    );


    return (
        <div className="main-section">
            {Table()}
            <Link
                to="/admin/product/new"
                className="create-product-btn bg-red-600 fixed top-2 right-4 w-10 h-10 flex justify-center items-center rounded-full hover:opacity-85"
            >
                <FaPlus />
            </Link>
        </div>
    );
};

export default Products;
