import { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";


import Loader from "@ui/Loader";
import { HiMenuAlt4 } from "react-icons/hi";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "@components/admin/AdminHeader";







const AdminLayout = () => {

    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [phoneActive, setPhoneActive] = useState<boolean>(window.innerWidth < 767);

    useEffect(() => {
        const resizeHandler = () => setPhoneActive(window.innerWidth < 767);
        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
    }, []);




    return (
        <div className='flex h-screen bg-primary-200 text-primary-txt'>

            {phoneActive && (
                <button
                    className="fixed top-2 left-2 w-10 h-10 grid place-items-center"
                    onClick={() => setShowSidebar(true)}
                >
                    <HiMenuAlt4 className="text-3xl" />
                </button>
            )}

            <AdminSidebar
                showSidebar={showSidebar}
                onHideSidebar={setShowSidebar}
                isMobileNav={phoneActive}
            />

            <main className="w-full overflow-y-auto hide-scrollbar">
                <AdminHeader />

                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    )
}



export default AdminLayout