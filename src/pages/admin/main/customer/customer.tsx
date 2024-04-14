import { ReactElement, useCallback, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import toast from "react-hot-toast";
import { ErrorResponse, useNavigate } from "react-router-dom";

import TableHOC from "@ui/TableHOC";
import { useAllUsersQuery, useDeleteUserMutation } from "@api/userApi";


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








const Customers = () => {


    const navigate = useNavigate();

    const [deleteUser] = useDeleteUserMutation();

    const { data, isLoading, error, isError, isSuccess } = useAllUsersQuery();


    const [rows, setRows] = useState<DataType[]>([]);

    const deleteUserHandler = useCallback(async (userId: string) => {

        try {
            const res = await deleteUser(userId);

            if ('error' in res) {
                throw new Error((res.error as ErrorResponse).data.message);
            }

            //_ delete from firebase also

            navigate("/admin/customer");
            toast.success(res.data.message);
        }
        catch (err) {
            toast.error((err as Error).message);
        }
    }, [deleteUser, navigate])



    useEffect(() => {
        if (isSuccess && data?.data.users) {
            const users = data.data.users;

            setRows(
                users.map(user => ({
                    avatar: <img className="w-14 rounded-full" src={user.image} alt="Shoes" />,
                    name: user.name,
                    email: user.email,
                    gender: user.gender,
                    role: user.role,
                    action: <button onClick={() => deleteUserHandler(user._id)} className="text-red-500" > <FaTrash /> </button>
                }))
            );
        }
    }, [isSuccess, data, deleteUserHandler])


    if (isError) {
        toast.error((error as ErrorResponse)?.data.message || 'Error fetching Users');
    }


    const Table = TableHOC<DataType>(
        columns,
        rows,
        "main-container overflow-auto hide-scrollbar bg-primary-100",
        "Customers",
        rows.length > 5,
        5
    )();


    return (
        <div className="main-section">
            {isError && <p>Error fetching users</p>}
            {isLoading && <p>Loading All users...</p>}
            {isSuccess && Table}
        </div>
    );
};

export default Customers;
