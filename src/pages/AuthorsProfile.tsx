import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import SEO from '../utils/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'react-loading-skeleton/dist/skeleton.css';
import { formatDateTime } from '../utils/helpers/articleHelpers';
import AdvertisementSection from '../components/AdvertisementSection';
import MostPopular from '../components/MostPopularArticle';
import { toast } from 'react-toastify';
import { getAuthorsProfile } from '../utils/requests/articlesRequest';
import Avatar from '/avatar.svg';
import { PiArticleNyTimes } from 'react-icons/pi';
import { BiUser } from 'react-icons/bi';
import { MdCheck, MdEmail } from 'react-icons/md';
import MainTopKSAd from '../components/ads/MainTopKSAd';
import { FiHome } from 'react-icons/fi';

const AuthorProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [otherJournalists, setOtherJournalists] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  useEffect(() => {
    const fetchAuthorProfile = async () => {
      try {
        setLoading(true);
        const response = await getAuthorsProfile(username);
        if (response.status === 200) {
          setAuthor(response.data.author);
          setArticles(response.data.articles);
          setOtherJournalists(response.data.relatedJournalists);
        } else {
          throw new Error("Author's profile not available");
        }
      } catch (err: any) {
        setError("Author's profile is not available.");
        toast.error("Error loading author's profile. Try again later.");
        console.error('Error fetching author profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthorProfile();
  }, [username]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const currentArticles = articles.slice(
    indexOfLastArticle - articlesPerPage,
    indexOfLastArticle
  );

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <>
      <SEO
        mainData={{
          title: author
            ? `${author.firstName} ${author.lastName} - Kickside Rwanda`
            : 'Journalist - Kickside Rwanda',
          description:
            author?.bio || 'Discover more about this journalist on Kickside.',
          image: author?.profile,
        }}
      />
      <MainTopKSAd />
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">
          {error ? (
            <div className="flex flex-col items-center justify-center min-h-[700px] bg-gray-100">
              <h1 className="text-6xl font-bold text-indigo-500 mb-4">404</h1>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Oops! Missing profile
              </h2>
              <p className="text-gray-500 mb-6 text-center max-w-md">
                The author you are looking is not found. Don't worry it's not
                your fault, our bad.
              </p>
              <Link
                to={'/'}
                className="flex items-center px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition"
              >
                <FiHome className="mr-2" />
                Go to Homepage
              </Link>
            </div>
          ) : (
            <>
              <div className="bg-white shadow-xl rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start">
                {loading ? (
                  <Skeleton
                    circle
                    height={150}
                    width={150}
                    className="mb-6 md:mb-0 md:mr-6"
                  />
                ) : (
                  <img
                    src={author?.profile || Avatar}
                    alt={`${author?.firstName} ${author?.lastName}`}
                    className="w-36 h-36 rounded-full object-cover mb-6 md:mb-0 md:mr-6 border-4 border-gray-200"
                  />
                )}
                <div className="text-center md:text-left">
                  {loading ? (
                    <Skeleton height={30} width={200} className="mb-2" />
                  ) : (
                    <h1 className="text-3xl font-bold text-primary mb-2 flex items-center gap-2">
                      <BiUser /> {author?.firstName} {author?.lastName}
                    </h1>
                  )}
                  {loading ? (
                    <Skeleton height={20} width={150} className="mb-2" />
                  ) : (
                    <Link
                      to={`mailto:${author?.email}`}
                      className="text-gray-600 mb-2 flex items-center"
                    >
                      <MdEmail className="mr-2" /> {author?.email}
                    </Link>
                  )}
                  <p className="text-gray-700 italic mb-4">
                    {loading ? (
                      <Skeleton height={20} width={300} />
                    ) : (
                      author?.bio || 'No bio yet!'
                    )}
                  </p>
                  {loading ? (
                    <Skeleton height={20} width={100} />
                  ) : (
                    <span className="inline-flex items-center text-sm bg-green-200 text-green-800 py-1 px-3 rounded-full mb-4">
                      <MdCheck /> {author?.rank || 'Passionate Journalist'}
                    </span>
                  )}
                  <div className="text-gray-700 italic flex items-center">
                    <PiArticleNyTimes className="mr-2" />
                    {articles.length} articles published
                  </div>
                </div>
              </div>
              <section className="mt-8 flex flex-col lg:flex-row gap-6 w-full">
                <div className="w-full lg:w-3/4">
                  {currentArticles.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-semibold mb-4 text-primary">
                        My Articles
                      </h2>
                      <div className="space-y-4">
                        {loading
                          ? Array(3)
                              .fill(0)
                              .map((_, i) => <Skeleton key={i} height={250} />)
                          : currentArticles.map((article) => (
                              <div
                                key={article._id}
                                className="bg-white shadow hover:shadow-lg transition-shadow flex flex-col md:flex-row overflow-hidden"
                              >
                                <div className="w-full md:w-1/3">
                                  <Link to={`/news/${article.slug}`}>
                                    <img
                                      src={
                                        article.coverImage ||
                                        '/default-article.png'
                                      }
                                      alt={article.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </Link>
                                </div>
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                  <p className="text-sm text-primary">
                                    {article.category}
                                  </p>
                                  <Link
                                    to={`/news/${article.slug}`}
                                    className="text-lg font-medium mb-2 text-gray-800 hover:underline line-clamp-3"
                                  >
                                    {article.title}
                                  </Link>
                                  <p className="text-gray-500 text-sm">
                                    {formatDateTime(article.createdAt)}
                                  </p>
                                </div>
                              </div>
                            ))}
                      </div>
                      <div className="flex justify-center mt-6">
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`mx-1 px-3 py-1 border rounded ${
                              currentPage === i + 1
                                ? 'bg-primary text-white'
                                : 'bg-white text-primary'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <section className="mt-12">
                    <h2 className="text-2xl font-semibold mb-6 text-primary">
                      Meet Other Journalists
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                      {loading
                        ? Array(4)
                            .fill(0)
                            .map((_, i) => (
                              <Skeleton
                                key={i}
                                height={120}
                                width={120}
                                circle
                              />
                            ))
                        : otherJournalists.map((journalist) => (
                            <Link
                              to={`/author/${journalist.username}`}
                              key={journalist._id}
                              className="text-center flex flex-col items-center group transition-transform transform hover:scale-105"
                            >
                              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-3">
                                <img
                                  src={journalist.profile || Avatar}
                                  alt={journalist.username}
                                  className="w-full h-full rounded-full object-cover border-2 border-gray-200 group-hover:border-primary"
                                />
                              </div>
                              <p className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-primary">
                                {journalist.firstName} {journalist?.lastName}
                              </p>
                            </Link>
                          ))}
                    </div>
                  </section>
                </div>
                <aside className="w-full lg:w-1/4 space-y-6">
                  {' '}
                  <AdvertisementSection />
                  <MostPopular />
                </aside>
              </section>
            </>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AuthorProfile;
