import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";



import { useState } from "react";
import SidebarList from "./SidebarList";
import { Link } from "react-router-dom";
import { admin_items, apps, charts } from "../../../utils/Admin_Menu";





const url = "https://cdn.pixabay.com/photo/2014/04/02/10/16/fire-303309_640.png";



interface AdminSidebarProps {
    showSidebar: boolean;
    onHideSidebar: (show: boolean) => void;
    isMobileNav: boolean;
}


const AdminSidebar = ({ showSidebar, onHideSidebar, isMobileNav }: AdminSidebarProps) => {

    const [isExpanded, setIsExpanded] = useState<boolean>(isMobileNav ? true : false);


    return (
        <aside
            className={`bg-primary-300 text-primary-txt  h-screen overflow-x-hidden overflow-y-auto hide-scrollbar animate-sidebar flex flex-col gap-12 py-2 pb-10 text-sm 
                ${isExpanded ? 'min-w-[200px] px-4' : 'min-w-[75px] px-3'} 
                ${isMobileNav ? showSidebar ? 'left-0' : '-left-full' : ''}  
                ${isMobileNav ? 'fixed z-20' : 'relative'}`
            }
        >

            {isMobileNav ? <button
                className="absolute w-6 h-6 top-3 right-2"
                onClick={() => onHideSidebar(false)}
            >
                <FaChevronCircleLeft className="w-6 h-6" />
            </button>
                :
                <button
                    className="absolute w-6 h-6 top-3 right-2"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ?
                        <FaChevronCircleLeft className="animate-sidebar w-6 h-6" />
                        :
                        <FaChevronCircleRight className="animate-sidebar w-6 h-6" />
                    }
                </button>
            }
            <div className="flex items-center h-16 gap-4 px-2 py-2 mt-5">
                <Link className="w-10 h-10 rounded-md cursor-pointer flex-none" to={'/admin/dashboard'}>
                    <img className="rounded-md" src={url} />
                </Link>

                <div className={`${!isExpanded && 'hidden'}`}>
                    <h4 className={`subtitle`}>MERN</h4>
                    <h4 className={`subtitle`}>Ecommerce</h4>
                </div>

            </div>

            <SidebarList
                items={admin_items}
                isExpanded={isExpanded}
                title='Admin'
            />

            <SidebarList
                items={charts}
                isExpanded={isExpanded}
                title='Chart'
            />

            <SidebarList
                items={apps}
                isExpanded={isExpanded}
                title='Apps'
            />

        </aside>
    )
}



export default AdminSidebar