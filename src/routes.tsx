import { useState, useEffect, createContext, useContext } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ArticleDetails from './pages/ArticleDetails';
import StaffLogin from './pages/staff/StaffLogin';
import AuthGuard from './Components/staff/AuthGuard';
import StaffViewArticles from './pages/staff/StaffViewArticles';
import StaffNotFound from './pages/staff/StaffNotFound';
import StaffViewArticleDetails from './pages/staff/StaffViewArticleDetails';
import NotFound from './pages/Notfound';
import StaffNewArticle from './pages/staff/StaffNewArticle';
import ForgotPassword from './pages/staff/ForgotPassword';
import ResetPassword from './pages/staff/ResetPassword';
import { toast } from 'react-toastify';
import { userLogout, userViewProfile } from './utils/requests/authRequest';
import Settings from './pages/staff/Settings';
import StaffLayout from './pages/staff/StaffLayout';
import StaffViewArticlesEditRequests from './pages/staff/StaffViewArticlesEditRequests';
import StaffViewOwnArticles from './pages/staff/StaffViewOwnArticles';
import AdminViewUsers from './pages/staff/AdminViewUsers';
import StaffViewSingleUser from './pages/staff/StaffViewSingleUser';
import AdminNewUser from './pages/staff/AdminNewUser';
import ContactUs from './pages/ContactUs';
import Dashboard from './pages/staff/Dashboard';
import AdminViewInquiries from './pages/staff/AdminViewInquiries';
import AdminVIewSingleInquiry from './pages/staff/AdminVIewSingleInquiry';
import AuthorProfile from './pages/AuthorsProfile';
import CategoryPage from './pages/CategoryPage';

const AuthContext = createContext<any>(null);

const AppRouter = () => {
  const isAuthenticated = Boolean(sessionStorage.getItem('token'));
  const location = useLocation();
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  const backUrl = location.state?.from || '/';

  const [profile, setProfile] = useState<any>(null);

  const logout = async () => {
    try {
      await userLogout(token);
      sessionStorage.removeItem('token');
      toast.success('Logged out successfully!');
      setTimeout(() => {
        navigate('/staff/login');
      }, 3000);
    } catch (error: any) {
      toast.error(error?.message || 'Logout failed. Please try again.');
    }
  };

  // Fetch User Profile only when necessary
  const fetchUserProfile = async () => {
    try {
      const response = await userViewProfile();
      if (response.status === 401) {
        toast.error('Session expired. Please log in again.');
        sessionStorage.removeItem('token');
        navigate('/staff/login');
      } else if (response.status === 200) {
        setProfile(response.data.user);
      }
    } catch (error: any) {
      toast.error(error?.message || 'Unable to fetch profile.');
    }
  };

  useEffect(() => {
    if (isAuthenticated && !profile) {
      fetchUserProfile();
    }
  }, [isAuthenticated, profile]);

  return (
    <AuthContext.Provider value={{ profile, setProfile }}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/contactus" element={<ContactUs />} />

        <Route path="news/:slug" element={<ArticleDetails />} />
        <Route path="author/:username" element={<AuthorProfile />} />
        <Route path="/staff">
          <Route
            path="login"
            element={<StaffLogin onLogin={fetchUserProfile} />}
          />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route
            element={
              <AuthGuard
                isAuthenticated={isAuthenticated}
                fetchUserProfile={fetchUserProfile}
              />
            }
          >
            <Route
              element={<StaffLayout onLogout={logout} profile={profile} />}
            >
              <Route
                path="dashboard"
                element={<Dashboard profile={profile} />}
              />
              <Route
                path="articles"
                element={<StaffViewArticles profile={profile} />}
              />
              <Route path="article/new" element={<StaffNewArticle />} />
              <Route
                path="article/:id"
                element={<StaffViewArticleDetails profile={profile} />}
              />
              <Route
                path="articles/edit-requests"
                element={<StaffViewArticlesEditRequests profile={profile} />}
              />
              <Route
                path="articles/admin-view-own-articles"
                element={<StaffViewOwnArticles profile={profile} />}
              />
              <Route
                path="users"
                element={<AdminViewUsers profile={profile} />}
              />
              <Route path="user/:id" element={<StaffViewSingleUser />} />
              <Route path="user/new" element={<AdminNewUser />} />
              <Route path="settings" element={<Settings />} />
              <Route
                path="inquiries"
                element={<AdminViewInquiries profile={profile} />}
              />
              <Route path="inquiry/:id" element={<AdminVIewSingleInquiry />} />
              <Route path="*" element={<StaffNotFound />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound backUrl={backUrl} />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default AppRouter;

export const useAuth = () => useContext(AuthContext);
