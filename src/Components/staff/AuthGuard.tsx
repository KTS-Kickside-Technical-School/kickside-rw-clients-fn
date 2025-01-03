import { Navigate, Outlet } from "react-router-dom";

interface IsAuthenticated {
    isAuthenticated: boolean;
}
const AuthGuard = ({ isAuthenticated }: IsAuthenticated) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/staff/login" />;
};

export default AuthGuard;