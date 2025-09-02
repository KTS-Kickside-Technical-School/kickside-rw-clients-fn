import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { iArticleType } from '../utils/types/Article';
import { Link } from 'react-router-dom';
import { getLatestCustomizedArticles } from '../utils/requests/articlesRequest';
import { formatDistanceToNowKinyarwanda } from '../utils/helpers/articleHelpers';

const KinHomeLatestNews: React.FC = () => {
  const [articles, setArticles] = useState<iArticleType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);

      try {
        const res = await getLatestCustomizedArticles();
        if (res?.data) {
          const data = res.data.filter(
            (article: iArticleType) => article.language === 'kinyarwanda'
          );
          setArticles(data);
        }
      } catch (error) {
        console.error('habayemo ikibazo mukuzna inkuru:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="w-full mt-4">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
        Inkuru ziheruka{' '}
      </h1>

      <div className="space-y-4">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
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
          : articles?.map((item, index) => (
              <Link
                to={`/news/${item.slug}`}
                key={item._id || index}
                className="block w-full group hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex w-full border-b border-gray-200 pb-4">
                  <div className="w-24 h-16 mr-3 flex-shrink-0">
                    <img
                      src={item.coverImage}
                      alt={item.title}
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
                      {formatDistanceToNowKinyarwanda(new Date(item.createdAt))}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default KinHomeLatestNews;
