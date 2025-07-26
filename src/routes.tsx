import { createContext, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ArticleDetails from './pages/ArticleDetails';
import NotFound from './pages/Notfound';
import ContactUs from './pages/ContactUs';
import AuthorProfile from './pages/AuthorsProfile';
import CategoryPage from './pages/CategoryPage';
import Unsubscribe from './pages/Unsubscribe';

const AuthContext = createContext<any>(null);

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />
      <Route path="/contactus" element={<ContactUs />} />

      <Route path="news/:slug" element={<ArticleDetails />} />
      <Route path="author/:username" element={<AuthorProfile />} />
      <Route path="unsubscribe/:email/:token" element={<Unsubscribe />} />

      <Route path="*" element={<NotFound  />} />
    </Routes>
  );
};

export default AppRouter;

export const useAuth = () => useContext(AuthContext);
