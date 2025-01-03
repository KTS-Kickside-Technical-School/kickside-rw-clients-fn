import { Route, Routes, useLocation } from "react-router-dom";

import Homepage from "./pages/Homepage";
import ArticleDetails from "./pages/ArticleDetails";
import StaffLogin from "./pages/staff/StaffLogin";
import JournalistDashboard from "./pages/staff/JournalistDashboard";
import JournalistsLayout from "./pages/staff/JournalistsLayout";
import AuthGuard from "./Components/staff/AuthGuard";
import StaffViewArticles from "./Components/staff/StaffViewArticles";
import StaffNotFound from "./pages/staff/StaffNotFound";
import StaffViewArticleDetails from "./Components/staff/StaffViewArticleDetails";
import StaffNewArticle from "./pages/staff/StaffNewArticle";
import NotFound from "./pages/Notfound";

const AppRouter = () => {
    const isAuthenticated = Boolean(sessionStorage.getItem("token"));
    const location = useLocation();

    const backUrl = location.state?.from || "/";

    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/:slug" element={<ArticleDetails />} />
            <Route path="/staff">
                <Route path="login" element={<StaffLogin />} />
                <Route path="" element={<AuthGuard isAuthenticated={isAuthenticated} />}>
                    <Route path="" element={<JournalistsLayout />}>
                        <Route path="dashboard" element={<JournalistDashboard />} />
                        <Route path="articles" element={<StaffViewArticles />} />
                        <Route path="article/new" element={<StaffNewArticle />} />
                        <Route path="article/:id" element={<StaffViewArticleDetails />} />
                        <Route path="*" element={<StaffNotFound />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound backUrl={backUrl} />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
