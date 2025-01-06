import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import ArticleDetails from "./pages/ArticleDetails";
import StaffLogin from "./pages/staff/StaffLogin";
import JournalistDashboard from "./pages/staff/JournalistDashboard";
import JournalistsLayout from "./pages/staff/JournalistsLayout";
import AuthGuard from "./Components/staff/AuthGuard";
import StaffViewArticles from "./Components/staff/StaffViewArticles";
import StaffNotFound from "./pages/staff/StaffNotFound";
import StaffViewArticleDetails from "./Components/staff/StaffViewArticleDetails";
import NotFound from "./pages/Notfound";
import StaffNewArticle from "./pages/staff/StaffNewArticle";
import ForgotPassword from "./pages/staff/ForgotPassword";
import ResetPassword from "./pages/staff/ResetPassword";
import { toast } from "react-toastify";
import { userLogout } from "./utils/requests/authRequest";

const AppRouter = () => {
    const isAuthenticated = Boolean(sessionStorage.getItem("token"));
    const location = useLocation();

    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    const backUrl = location.state?.from || "/";

    const logout = async () => {
        try {
            await userLogout(token);

            sessionStorage.removeItem("token");

            toast.success("Logged out successfully!");
            setTimeout(() => {
                navigate("/staff/login");
            }, 3000)

        } catch (error: any) {
            toast.error(error?.message || "Logout failed. Please try again.");
        }
    };

    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="news/:slug" element={<ArticleDetails />} />
                <Route path="/staff">
                    <Route path="login" element={<StaffLogin />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="reset-password" element={<ResetPassword />} />
                    <Route path="" element={<AuthGuard isAuthenticated={isAuthenticated} />}>
                        <Route path="" element={<JournalistsLayout onLogout={logout} />}>
                            <Route path="dashboard" element={<JournalistDashboard />} />
                            <Route path="articles" element={<StaffViewArticles />} />
                            <Route path="article/new" element={<StaffNewArticle />} />
                            <Route path="article/:id" element={<StaffViewArticleDetails />} />
                            <Route path="*" element={<StaffNotFound />} />
                        </Route>
                    </Route>
                </Route>
                <Route path="*" element={<NotFound backUrl={backUrl} />} />
            </Routes>
        </>
    );
};

export default AppRouter;
