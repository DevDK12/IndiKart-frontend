import { RiCoupon3Fill, RiDashboardFill, RiShoppingBag3Fill } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { AiFillFileText } from "react-icons/ai";
import { FaChartBar, FaChartLine, FaChartPie, FaGamepad, FaStopwatch } from "react-icons/fa";
import { SidebarItemType } from "../Types/MenuItemTypes";




export const admin_items: SidebarItemType[] = [
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


export const charts: SidebarItemType[] = [
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


export const apps: SidebarItemType[] = [
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
