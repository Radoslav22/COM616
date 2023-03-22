
import { Outlet } from "react-router";
import useAuth from "../services/firebase/useAuth";
import Login from "../Views/Login";

const ProtectedRoutes = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet /> : <Login />;
}


export default ProtectedRoutes;