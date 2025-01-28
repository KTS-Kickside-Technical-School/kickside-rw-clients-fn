import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import SEO from '../utils/SEO';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import 'react-loading-skeleton/dist/skeleton.css';
import { formatDateTime } from '../utils/helpers/articleHelpers';
import AdvertisementSection from '../Components/AdvertisementSection';
import MostPopular from '../Components/MostPopularArticle';
import { toast } from 'react-toastify';
import { getAuthorsProfile } from '../utils/requests/articlesRequest';
import Avatar from '/avatar.svg';
import { PiArticleNyTimes } from 'react-icons/pi';
import { BiUser } from 'react-icons/bi';
import { MdCheck, MdEmail } from 'react-icons/md';

const AuthorProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [otherJournalists, setOtherJournalists] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  const fetchAuthorProfile = async () => {
    try {
      const response = await getAuthorsProfile(username);
      if (response.status === 200) {
        setAuthor(response.data.author);
        setArticles(response.data.articles);
        setOtherJournalists(response.data.relatedJournalists);
      } else {
        throw new Error("Author's profile is not available at the moment");
      }
    } catch (err: any) {
      console.error('Error fetching author profile:', err.message);
      setError("Author's profile is not available.");
      toast.error(
        "Error: Unable to load author's profile. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthorProfile();
  }, [username]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <>
      <SEO
        title={
          `${author?.firstName} ${author?.lastName} - Kickside Rwanda` ||
          'Journalist - Kickside Rwanda'
        }
        description={
          author?.bio ||
          `Discover more about ${author?.firstName} ${author?.lastName} on Kickside.`
        }
        author={
          `${author?.firstName} ${author?.lastName}` || 'Ndahimana Bonheur'
        }
        ogTitle={
          `${author?.firstName} ${author?.lastName} - Kickside Rwanda` ||
          'Author Profile - Kickside Rwanda'
        }
        ogDescription={
          author?.bio ||
          `Discover more about ${author?.firstName} ${author?.lastName} on Kickside.`
        }
        ogImage={author?.profile || Avatar}
        ogUrl={window.location.href}
        ogType="profile"
        twitterCard="summary_large_image"
        twitterCreator="@kickside_rw"
      />
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          {error ? (
            <div className="text-center text-red-600">{error}</div>
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
                    src={author?.profile || '/avatar.svg'}
                    alt={`${author?.firstName} ${author?.lastName}`}
                    className="w-36 h-36 rounded-full object-cover mb-6 md:mb-0 md:mr-6 border-4 border-gray-200"
                  />
                )}

                <div className="text-center md:text-left">
                  {loading ? (
                    <Skeleton height={30} width={200} className="mb-2" />
                  ) : (
                    <h1 className="text-3xl font-bold text-primary mb-2 flex items-center">
                      <BiUser />
                      {author?.firstName} {author?.lastName}
                    </h1>
                  )}

                  {loading ? (
                    <Skeleton height={20} width={150} className="mb-2" />
                  ) : (
                    <Link
                      to={`mailto:${author?.email}`}
                      className="text-gray-600 mb-2 flex items-center"
                    >
                      <MdEmail className="mr-2" />
                      {author?.email}
                    </Link>
                  )}

                  {loading ? (
                    <Skeleton height={20} width={300} className="mb-4" />
                  ) : (
                    <p className="text-gray-700 italic mb-4">
                      {author?.bio || 'No bio yet!'}
                    </p>
                  )}

                  {loading ? (
                    <Skeleton height={20} width={100} />
                  ) : (
                    <span className="inline-flex items-center text-sm bg-green-200 text-green-800 py-1 px-3 rounded-full mb-4">
                      <MdCheck />
                      {author?.rank || 'Passionate Journalist'}
                    </span>
                  )}

                  {loading ? (
                    <Skeleton height={20} width={300} />
                  ) : (
                    <div className="text-gray-700 italic flex items-center">
                      <PiArticleNyTimes className="mr-2" />
                      {articles.length || 0} articles published
                    </div>
                  )}
                </div>
              </div>

              <section className="mt-8 flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  {currentArticles && currentArticles.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-semibold mb-4 text-primary">
                        Articles by {author?.username || 'this author'}
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
                            onClick={() => handlePageChange(i + 1)}
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
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

                <aside className="w-full md:w-1/3 space-y-6">
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
