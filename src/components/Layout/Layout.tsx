import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../ui/Loader";
import Header from "../shop/Header";






const Layout = () => {
    return (
        <div className="h-screen flex flex-col bg-primary-200 text-primary-txt">

            <Header />
            <main className="h-full overflow-auto hide-scrollbar">
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    )
}


export default Layout