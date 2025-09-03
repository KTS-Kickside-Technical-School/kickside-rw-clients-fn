import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ArticleDetails from './pages/ArticleDetails';
import NotFound from './pages/Notfound';
import ContactUs from './pages/ContactUs';
import AuthorProfile from './pages/AuthorsProfile';
import CategoryPage from './pages/CategoryPage';
import Unsubscribe from './pages/Unsubscribe';
import News from './pages/News';
import SearchResults from './pages/SearchResults';
import MatchCenter from './pages/MatchCenter';
import SeasonFixtures from './pages/SeasonFixtures';
import KinHomepage from './pages/KinHomepage';
import KinNotfound from './pages/KinNotfound';
import MatchDetails from './pages/MatchDetails';
import MatchCenterLayout from './component/matches/MatchCenterLayout';
import KinNews from './pages/KinNews';
import KinArticleDetails from './pages/KinArticleDetails';
import KinCategoryPage from './pages/KinCategoryPage';
import KinAuthorsProfile from './pages/KinAuthorsProfile';
import KinSearchResults from './pages/KinSearchResults';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/en">
        <Route index element={<Homepage />} />
        <Route path="category/:categoryName" element={<CategoryPage />} />
        <Route path="contactus" element={<ContactUs />} />
        <Route path="author/:username" element={<AuthorProfile />} />
        <Route path="unsubscribe/:email/:token" element={<Unsubscribe />} />
        <Route path="news">
          <Route index element={<News />} />
          <Route path="search" element={<SearchResults />} />
          <Route path=":slug" element={<ArticleDetails />} />
        </Route>
        <Route element={<MatchCenterLayout />} path="match-center">
          <Route index element={<MatchCenter />} />
          <Route path="fixtures/:seasonSlug" element={<SeasonFixtures />} />
          <Route path="match-details/:slug" element={<MatchDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/">
        <Route index element={<KinHomepage />} />
        <Route path="category/:categoryName" element={<KinCategoryPage />} />
        {/* <Route path="contactus" element={<ContactUs />} /> */}
        <Route path="author/:username" element={<KinAuthorsProfile />} />
        {/* <Route path="unsubscribe/:email/:token" element={<Unsubscribe />} /> */}
        <Route path="news">
          <Route index element={<KinNews />} />
          <Route path="search" element={<KinSearchResults />} />
          <Route path=":slug" element={<KinArticleDetails />} />
        </Route>

        <Route path="*" element={<KinNotfound />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
