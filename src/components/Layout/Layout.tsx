import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../ui/Loader";
import Header from "../shop/Header";






const Layout = () => {
    return (
        <div className="h-screen bg-primary-200 text-primary-txt">

            <main className="h-full">
                <Header />
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    )
}
export default Layout