import { Suspense } from "react";
import { Outlet } from "react-router-dom";


import Loader from "../../ui/Loader";
import AdminSidebar from "./AdminSidebar";




const AdminLayout = () => {



    return (
        <div className='flex h-screen bg-primary-200 text-primary-txt'>
            <AdminSidebar />

            <main className="w-full overflow-y-auto hide-scrollbar">
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    )
}
export default AdminLayout