import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../ui/Loader";


const Layout = () => {
    return (
        <div>
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </div>
    )
}
export default Layout