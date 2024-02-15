import { Outlet } from "react-router-dom";


const Layout = () => {
    return (
        <div>
            {/* <header /> */}
            <Outlet />
        </div>
    )
}
export default Layout