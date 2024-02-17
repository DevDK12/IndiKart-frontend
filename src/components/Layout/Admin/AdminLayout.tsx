import { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";


import Loader from "../../ui/Loader";
import AdminSidebar from "./AdminSidebar";
import { HiMenuAlt4 } from "react-icons/hi";
import MobileAdminSidebar from "./MobileAdminSidebar";




const AdminLayout = () => {

    const [showNav, setShowNav] = useState<boolean>(false);
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
                    onClick={() => setShowNav(true)}
                >
                    <HiMenuAlt4 className="text-3xl" />
                </button>
            )}

            {phoneActive ? <MobileAdminSidebar showNav={showNav} onHideNav={setShowNav} /> 
                : 
                <AdminSidebar />
            }

            <main className="w-full overflow-y-auto hide-scrollbar">
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    )
}
export default AdminLayout