import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ArticleDetails from "./pages/ArticleDetails";
import StaffLogin from "./pages/staff/StaffLogin";
import JournalistDashboard from "./pages/staff/JournalistDashboard";
import AuthGuard from "./Components/staff/AuthGuard";
import StaffViewArticles from "./Components/staff/StaffViewArticles";
import StaffNotFound from "./pages/staff/StaffNotFound";
import StaffViewArticleDetails from "./Components/staff/StaffViewArticleDetails";
import NotFound from "./pages/Notfound";
import StaffNewArticle from "./pages/staff/StaffNewArticle";
import ForgotPassword from "./pages/staff/ForgotPassword";
import ResetPassword from "./pages/staff/ResetPassword";
import { toast } from "react-toastify";
import { userLogout, userViewProfile } from "./utils/requests/authRequest";
import Settings from "./pages/staff/Settings";
import { useEffect, useState } from "react";
import StaffLayout from "./pages/staff/StaffLayout";

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
            }, 3000);
        } catch (error: any) {
            toast.error(error?.message || "Logout failed. Please try again.");
        }
    };

    const [profile, setProfile] = useState<any>();

    const fetchUserProfile = async () => {
        try {
            const response = await userViewProfile();
            if (response.status !== 200) {
                toast.error(response.message);
                return;
            }
            setProfile(response?.data?.user);
        } catch (error: any) {
            toast.error(error?.message || "Profile not found. Please try again.");
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="news/:slug" element={<ArticleDetails />} />
                <Route path="/staff">
                    <Route path="login" element={<StaffLogin />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="reset-password" element={<ResetPassword />} />
                    <Route element={<AuthGuard isAuthenticated={isAuthenticated} />}>
                        <Route element={<StaffLayout onLogout={logout} profile={profile} />}>
                            <Route path="dashboard" element={<JournalistDashboard />} />
                            <Route path="articles" element={<StaffViewArticles profile={profile} />} />
                            <Route path="article/new" element={<StaffNewArticle />} />
                            <Route path="article/:id" element={<StaffViewArticleDetails />} />
                            <Route
                                path="settings"
                                element={
                                    <Settings />
                                }
                            />
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