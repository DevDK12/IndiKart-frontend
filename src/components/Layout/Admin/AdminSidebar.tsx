

import { RiCoupon3Fill, RiDashboardFill, RiShoppingBag3Fill } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { AiFillFileText } from "react-icons/ai";
import { FaChartBar, FaChartLine, FaChartPie, FaChevronCircleLeft, FaChevronCircleRight, FaGamepad, FaStopwatch } from "react-icons/fa";
import { useState } from "react";
import SidebarList from "./SidebarList";
import { IconType } from "react-icons";





export type SidebarItemType = {
    id: string;
    label: string;
    icon: IconType;
    path: string;
}




const admin_items: SidebarItemType[] = [
    {
        id: '1',
        label: 'Dashboard',
        icon: RiDashboardFill,
        path: '/admin/dashboard',
    },
    {
        id: '2',
        label: 'Product',
        icon: RiShoppingBag3Fill,
        path: '/admin/product',
    },
    {
        id: '3',
        label: 'Customer',
        icon: IoIosPeople,
        path: '/admin/customer',
    },
    {
        id: '4',
        label: 'Transaction',
        icon: AiFillFileText,
        path: '/admin/transaction',
    }
]


const charts: SidebarItemType[] = [
    {
        id: '1',
        label: 'Bar',
        icon: FaChartBar,
        path: '/admin/chart/bar',
    },
    {
        id: '2',
        label: 'Pie',
        icon: FaChartPie,
        path: '/admin/chart/pie',
    },
    {
        id: '3',
        label: 'Line',
        icon: FaChartLine,
        path: '/admin/chart/line',
    }
]


const apps: SidebarItemType[] = [
    {
        id: '1',
        label: 'Stopwatch',
        icon: FaStopwatch,
        path: '/admin/app/stopwatch',
    },
    {
        id: '2',
        label: 'Coupon',
        icon: RiCoupon3Fill,
        path: '/admin/app/coupon',
    },
    {
        id: '3',
        label: 'Toss',
        icon: FaGamepad,
        path: '/admin/app/toss',
    }
]










const AdminSidebar = () => {

    const [isExpanded, setIsExpanded] = useState<boolean>(false);




    const width = isExpanded ? 'min-w-[200px] w-9/12 xs:w-2/3 sm:w-1/2 md:w-2/5 lg:w-1/5 px-4' : 'min-w-[75px] px-3';

    return (
        <aside className={`relative bg-primary-300 text-primary-txt  h-screen overflow-x-hidden overflow-y-auto hide-scrollbar flex flex-col gap-12 py-2 
        ${width} text-sm`}
        >

            <button
                className="absolute w-6 h-6 top-10 -right-4"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ?
                    <FaChevronCircleLeft className="w-6 h-6" />
                    :
                    <FaChevronCircleRight className="w-6 h-6" />

                }
            </button>
            <div className="flex items-center h-16 gap-4 px-2 py-2 mt-5">
                <div className="w-10 h-10 rounded-md cursor-pointer bg-secondary-200 flex-none"></div>
                {isExpanded &&
                    <div>
                        <h4 className="subtitle">MERN</h4>
                        <h4 className="subtitle">Ecommerce </h4>
                    </div>
                }
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