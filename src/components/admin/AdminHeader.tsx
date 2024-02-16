import {
    CiBrightnessDown,
    CiCloudMoon,
} from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";
import Avatar from "../ui/Avatar";





const AdminHeader = () => {

    const AvatarClickHandler = () => {
        console.log('Avatar clicked')
    }

    return (
        <header className="bg-primary-100 text-primary-txt flex items-center justify-between gap-5  px-4 py-3">
            <input
                className="rounded-lg bg-primary-200 px-2 py-1 w-1/2"
            />
            <div className="flex items-center gap-7">
                <CiBrightnessDown className="w-6 h-6" />
                <IoMdNotifications className="w-6 h-6" />
                <Avatar
                    className="w-8 h-8"
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp'
                    onAvatar={AvatarClickHandler}
                />
            </div>

        </header>
    )
}
export default AdminHeader