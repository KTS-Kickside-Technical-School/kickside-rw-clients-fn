import { Link, useLocation } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import AdvertisementSection from '../component/AdvertisementSection';
import Footer from '../component/Footer';
import Header from '../component/Header';
import MostPopular from '../component/MostPopularArticle';
import SEO from '../utils/SEO';
import { iArticleType } from '../utils/types/Article';
import { getUserSearch } from '../utils/requests/articlesRequest';
import { useEffect, useState, useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import MainTopKSAd from '../component/ads/MainTopKSAd';

const SearchResults = () => {
  const [articles, setArticles] = useState<iArticleType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const location = useLocation();
  const query = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('query')?.trim().toLowerCase() || '';
  }, [location.search]);

  const fetchArticles = async (page: number) => {
    setLoading(true);
    try {
      const res = await getUserSearch(query, page, 30, 'english');
      setArticles(res?.articles || []);
      setTotalPages(res?.totalPages || 1);
      setCurrentPage(res?.page || 1);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(1);
  }, [query]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    fetchArticles(page);
  };

  return (
    <>
      <SEO
        mainData={{
          title: ` ${query} - Searhc Results | Kickside Rw News`,
          description:
            'Kickside is Rwanda’s leading digital newspaper covering tech, sports, entertainment, and business.',
          author: 'Kickside Rwanda',
          image: 'https://www.kickside.rw/logo.svg',
          publishedAt: '2023-12-01T10:00:00Z',
          type: 'website',
        }}
      />
      <MainTopKSAd />
      <div className=" pb-5">
        <Header />
      </div>
      <div className="max-w-7xl px-4 mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="w-full lg:w-4/5 xl:w-8/10">
            <div className="w-full mt-4">
              <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
                Search results for "{query || 'All articles'}"
              </h1>

              <div className="space-y-4">
                {loading ? (
                  Array.from({ length: 10 }).map((_, index) => (
                    <div
                      key={index}
                      className="w-full flex border-b border-gray-400 pb-4 animate-pulse"
                    >
                      <div className="w-24 h-16 bg-gray-200 rounded mr-3 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <div className="w-20 h-3 bg-gray-300 rounded mb-2"></div>
                        <div className="w-full h-4 bg-gray-300 rounded mb-1"></div>
                        <div className="w-32 h-3 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  ))
                ) : articles.length > 0 ? (
                  articles.map((item: iArticleType, index) => (
                    <Link
                      to={`/news/${item.slug}`}
                      key={index}
                      className="block w-full group hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex w-full border-b border-gray-400 pb-4">
                        <div className="w-24 h-16 mr-3 flex-shrink-0">
                          <img
                            src={item.coverImage}
                            alt="Article"
                            className="w-full h-full object-cover rounded-lg"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-medium text-blue-600 mb-1 block">
                            {item.category || 'Uncategorized'}
                          </span>
                          <h2 className="text-sm font-semibold text-gray-900 line-clamp-2">
                            {item.title}
                          </h2>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDistanceToNow(new Date(item.createdAt), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-100">
                      <ExclamationTriangleIcon className="h-16 w-16 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      No results found
                    </h2>
                    <p className="text-gray-600 mb-6 max-w-md">
                      We couldn't find any articles matching your search. Try
                      adjusting your keywords or check out our latest stories
                      below.
                    </p>
                    <div className="flex gap-3">
                      <a
                        href="/en/news"
                        className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
                      >
                        Browse All News
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePageChange(idx + 1)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === idx + 1
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/5 xl:w-2/10 mb-4">
            <MostPopular />
            <AdvertisementSection />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
