import { useEffect, useState } from 'react';
import { getTOpWeeklyArticlesByCategories } from '../utils/requests/articlesRequest';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

interface CategoryArticles {
  [category: string]: {
    weeklyTop: any[];
    otherArticles: any[];
  };
}

const HomeProductsCategories = () => {
  const [data, setData] = useState<CategoryArticles>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await getTOpWeeklyArticlesByCategories();

        if (res.status === 200) {
          setData(res.data || {});
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const renderSkeleton = () => (
    <div className="space-y-12 pt-4">
      {[...Array(4)].map((_, catIndex) => (
        <div key={catIndex} className="mb-8">
          <div className="h-8 w-1/4 bg-gray-200 rounded mb-6 animate-pulse"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="border rounded-lg overflow-hidden shadow-md"
              >
                <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 w-1/4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-3 animate-pulse"></div>
                  <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-lg p-4 shadow-sm">
                <div className="h-5 w-full bg-gray-200 rounded mb-3 animate-pulse"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return renderSkeleton();
  }

  return (
    <div className="space-y-12 mt-4">
      {Object.entries(data).map(([category, { weeklyTop, otherArticles }]) => (
        <div key={category} className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
            {category}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {weeklyTop.map((article) => (
              <div
                key={article._id}
                className="border rounded-lg overflow-hidden shadow-md"
              >
                <Link
                  to={`/news/${article.slug}`}
                  className="aspect-[4/3] rounded-xl overflow-hidden mb-3"
                >
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <Link
                    to={`/category/${article.category}`}
                    className="text-sm text-blue-600 font-medium"
                  >
                    {article.category}
                  </Link>
                  <h3>
                    <Link
                      to={`/news/${article.slug}`}
                      className="text-lg font-bold my-2"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <Link
                    to={`/author/${article.author?.username}`}
                    className="text-gray-600 text-sm"
                  >
                    By {article.author.firstName} {article.author.lastName}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherArticles.map((article) => (
              <div
                key={article._id}
                className="border rounded-lg p-4 shadow-sm"
              >
                <h4 className="font-semibold text-md mb-2">
                  <Link
                    to={`/news/${article.slug}`}
                    className="text-lg font-bold my-2"
                  >
                    {article.title}
                  </Link>
                </h4>
                <p className="text-gray-500 text-sm">
                  {formatDistanceToNow(
                    new Date(article.createdAt).toLocaleDateString()
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeProductsCategories;
