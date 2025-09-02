import { useEffect, useState } from 'react';
import { iArticleType } from '../../../utils/types/Article';
import { getTopFeaturedArticles } from '../../../utils/requests/articlesRequest';
import { Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

interface KinHeroProps {}
const KinHero = ({}: KinHeroProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [topFeaturedArticles, setTopFeaturedArticles] = useState<
    iArticleType[]
  >([]);

  useEffect(() => {
    const fetchTopFeaturedArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getTopFeaturedArticles('kinyarwanda');
        console.log(res);
        if (res?.status === 200) {
          const topFeaturedArticles = res.data.articles;

          setTopFeaturedArticles(topFeaturedArticles);
        } else {
          setError('Ntabwo inkuru zabonetse,');
        }
      } catch (error) {
        console.error('Habayemo ikibazo mukuzana inkuru:', error);
        setError('Habayemo ikibazo mukuzana unkuru.');
      } finally {
        setLoading(false);
      }
    };
    fetchTopFeaturedArticles();
  }, []);

  if (loading) {
    return (
      <div className="w-full px-4 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="flex-1 bg-gray-800 rounded-xl overflow-hidden animate-pulse"
            >
              <div className="aspect-[16/9] bg-gray-700"></div>
              <div className="p-4">
                <div className="h-6 w-24 bg-gray-700 rounded mb-3"></div>
                <div className="h-8 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-gray-800 rounded-lg overflow-hidden animate-pulse"
            >
              <div className="aspect-[4/3] bg-gray-700"></div>
              <div className="p-3">
                <div className="h-4 w-20 bg-gray-700 rounded mb-2"></div>
                <div className="h-6 bg-gray-700 rounded mb-3"></div>
                <div className="h-3 bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 mx-auto max-w-7xl py-12 text-center">
        <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-800">
          <h3 className="text-xl font-bold text-white mb-3">
            Oops! Habyeho ikibazo
          </h3>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Ongera Ugerageze
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {topFeaturedArticles.slice(0, 2).map((article, index) => (
          <div
            key={article._id}
            onClick={() => navigate(`/news/${article.slug}`)}
            className={`flex-1 relative group cursor-pointer rounded-xl overflow-hidden transition-all hover:shadow-lg ${
              index === 0
                ? 'bg-blue-900/10 border border-blue-800/50'
                : 'bg-gray-800'
            }`}
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                {article.category && (
                  <span
                    className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 ${
                      index === 0
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-white'
                    }`}
                  >
                    {article.category}
                  </span>
                )}
                <h2 className="text-white text-xl md:text-2xl font-bold mb-2 line-clamp-2">
                  {article.title}
                </h2>
                <div className="flex items-center text-gray-300 text-sm">
                  {article.author && (
                    <span className="font-medium">
                      {article.author.firstName} {article.author.lastName}
                    </span>
                  )}
                  {article.createdAt && <span className="mx-2">•</span>}
                  {article.createdAt && (
                    <span>
                      {formatDistanceToNow(new Date(article.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  )}
                </div>
              </div>
              {index === 0 && (
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                  IBIGEZWEHO
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        Inkuru Zigezweho
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {topFeaturedArticles.slice(2, 6).map((article) => (
          <div
            key={article._id}
            onClick={() => navigate(`/news/${article.slug}`)}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3 bg-blue-900/10 border border-blue-800/30">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 w-full">
                {article.category && (
                  <span className="text-xs font-bold text-white bg-blue-600 px-2 py-1 rounded">
                    {article.category}
                  </span>
                )}
              </div>
            </div>
            <h3 className="text-white font-bold mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
              {article.title}
            </h3>
            <div className="flex items-center text-graytext text-xs">
              {article.author && (
                <span>
                  {article.author.firstName} {article.author.lastName}
                </span>
              )}
              {article.createdAt && (
                <>
                  <span className="mx-2">•</span>
                  <span>
                    {formatDistanceToNow(new Date(article.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mb-12">
        <Link
          to="/news"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Izindi nkuru
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default KinHero;
