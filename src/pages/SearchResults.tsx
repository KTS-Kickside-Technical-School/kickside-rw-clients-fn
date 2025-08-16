import { Link, useLocation } from 'react-router-dom';
import AdstrerraPortraitBanner from '../component/ads/adstrerra/AdstrerraPortraitBanner';
import AdvertisementSection from '../component/AdvertisementSection';
import Footer from '../component/Footer';
import Header from '../component/Header';
import MostPopular from '../component/MostPopularArticle';
import SEO from '../utils/SEO';
import { iArticleType } from '../utils/types/Article';
import { getPublishedArticles } from '../utils/requests/articlesRequest';
import { useEffect, useState, useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';

const SearchResults = () => {
  const [articles, setArticles] = useState<iArticleType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pageSize = 35;
  const minResults = 15;

  const location = useLocation();
  const query = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('query')?.trim().toLowerCase() || '';
  }, [location.search]);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await getPublishedArticles();
        setArticles(res?.articles || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    if (!query) return articles;

    const words = query.split(/\s+/).filter(Boolean);

    let results = articles.filter((article) => {
      const content = `${article.title} ${article.content || ''} ${
        article.category || ''
      } ${article.author || ''}`.toLowerCase();
      return content.includes(query);
    });

    if (results.length === 0) {
      results = articles.filter((article) => {
        const content = `${article.title} ${article.content || ''} ${
          article.category || ''
        } ${article.author || ''}`.toLowerCase();
        return words.some((word) => content.includes(word));
      });
    }

    // ✅ Always return at least 15 results
    if (results.length < minResults) {
      const fillers = articles
        .filter((a) => !results.includes(a))
        .slice(0, minResults - results.length);
      results = [...results, ...fillers];
    }

    return results.length > 0 ? results : articles;
  }, [articles, query]);

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredArticles.length / pageSize);
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredArticles.slice(start, end);
  }, [filteredArticles, currentPage]);

  return (
    <>
      <SEO
        mainData={{
          title: `Search results for ${query} | Kickside Rw News - Rwanda's Top Tech, Sports & Showbiz News`,
          description:
            'Kickside is Rwanda’s leading digital newspaper covering tech, sports, entertainment, and business. Get all trending news from Rwanda and East Africa in one place.',
          author: 'Kickside Rwanda',
          image: 'https://www.kickside.rw/logo.svg',
          publishedAt: '2023-12-01T10:00:00Z',
          type: 'website',
        }}
      />

      <div className="bg-primary pb-5">
        <Header />
      </div>
      <div>
        <div className="max-w-7xl px-4 mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-6 w-full">
            <div className="w-full lg:w-4/5 xl:w-8/10">
              <div className="w-full mt-4">
                <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
                  Search results for "{query || 'All articles'}"
                </h1>

                <div className="space-y-4">
                  {loading
                    ? Array.from({ length: 20 }).map((_, index) => (
                        <div
                          key={index}
                          className="w-full flex border-b border-gray-200 pb-4 animate-pulse"
                        >
                          <div className="w-24 h-16 bg-gray-200 rounded mr-3 flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <div className="w-20 h-3 bg-gray-300 rounded mb-2"></div>
                            <div className="w-full h-4 bg-gray-300 rounded mb-1"></div>
                            <div className="w-32 h-3 bg-gray-300 rounded"></div>
                          </div>
                        </div>
                      ))
                    : paginatedArticles.map((item: iArticleType, index) => (
                        <Link
                          to={`/news/${item.slug}`}
                          key={index}
                          className="block w-full group hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="flex w-full border-b border-gray-200 pb-4">
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
                      ))}
                </div>

                {/* ✅ Pagination UI */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({ length: totalPages }, (_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPage(idx + 1)}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === idx + 1
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full lg:w-1/5 xl:w-2/10 mb-4">
              <MostPopular />
              <AdstrerraPortraitBanner />
              
              <AdvertisementSection />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
