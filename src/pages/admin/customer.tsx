import { ReactElement, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import TableHOC from "../../components/ui/TableHOC";

interface DataType {
    avatar: ReactElement;
    name: string;
    email: string;
    gender: string;
    role: string;
    action: ReactElement;
}

const columns: Column<DataType>[] = [
    {
        Header: "Avatar",
        accessor: "avatar",
    },
    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Gender",
        accessor: "gender",
    },
    {
        Header: "Email",
        accessor: "email",
    },
    {
        Header: "Role",
        accessor: "role",
    },
    {
        Header: "Action",
        accessor: "action",
    },
];




const img = "https://randomuser.me/api/portraits/women/54.jpg";
const img2 = "https://randomuser.me/api/portraits/women/50.jpg";




const arr: Array<DataType> = [
    {
        avatar: <img className="w-14 rounded-full" src={img} alt="Shoes" />,
        name: "Emily Palmer",
        email: "emily.palmer@example.com",
        gender: "female",
        role: "user",
        action: <button className="text-red-500" > <FaTrash /> </button>
    },

    {
        avatar: <img className="w-14 rounded-full" src={img2} alt="Shoes" />,
        name: "May Scoot",
        email: "aunt.may@example.com",
        gender: "female",
        role: "user",
        action: <button className="text-red-500" > <FaTrash /> </button>
    },


];






const Customers = () => {
    const [rows, setRows] = useState<DataType[]>(arr);

    const Table = TableHOC<DataType>(
        columns,
        rows,
        "main-container overflow-y-auto bg-primary-100",
        "Customers",
        rows.length > 5,
        5
    );


    return (
        <div className="main-section">
            {Table()}
        </div>
    );
};

export default Customers;
