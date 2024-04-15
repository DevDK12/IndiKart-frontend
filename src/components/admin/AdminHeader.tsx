import {
    CiBrightnessDown,
    // CiCloudMoon,
} from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";
import Avatar from "@ui/Avatar";
import { useDispatch} from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";
import { logoutUser } from "@/redux/reducer/user-slice";
import toast from "react-hot-toast";





const AdminHeader = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [isOpen, setIsOpen] = useState<boolean>(false);

    const logoutHandler = async () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                dispatch(logoutUser());
                navigate('/');
                toast.success('Logged out');
            })
            .catch((err) => {
                // An error happened.
                toast.error(err?.message || 'Loggeg out failed');
            }
        );
    };



    return (
        <header className="bg-primary-100 max-h-[2rem] text-primary-txt flex items-center justify-between gap-5  px-4 py-7">
            <input
                className="rounded-lg bg-primary-200 ml-14 px-2 py-1 w-1/2"
            />
            <div className="flex items-center gap-7">
                <CiBrightnessDown className="w-6 h-6" />
                <IoMdNotifications className="w-6 h-6" />
                <Avatar
                    className="w-8 h-8"
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp'
                    onAvatar={() => setIsOpen(prev => !prev)}
                />
                <dialog open={isOpen} >
                    <div className="bg-primary-100 z-50 text-primary-txt flex flex-col px-6 py-4 gap-2 fixed top-20 right-14 rounded-2xl rounded-tr-none min-w-[250px]">
                        <Link onClick={() => setIsOpen(false)} to="/">
                            User
                        </Link>
                        <button onClick={logoutHandler}>
                            <FaSignOutAlt />
                        </button>
                    </div>
                </dialog>
            </div>

        </header>
    )
}
export default AdminHeader