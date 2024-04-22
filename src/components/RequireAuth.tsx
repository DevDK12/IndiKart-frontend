import { RootState } from "@/redux/store";
import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {

    const {user, token} = useSelector((state: RootState) => state.userSlice);
    const location = useLocation();

    return (
        user && token ? <Outlet /> : <Navigate to="/login" state={{from: location}}  replace  />
    )
}

export default RequireAuth