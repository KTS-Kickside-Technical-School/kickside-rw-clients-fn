import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { iArticleType } from '../utils/types/Article';
import { Link } from 'react-router-dom';

interface LatestNewsProps {
  title: string;
  articles: iArticleType[];
  loading: boolean;
}

const LatestNews: React.FC<LatestNewsProps> = ({
  title,
  articles,
  loading,
}) => {
  return (
    <div className="w-full pt-4 mt-8">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
        {title}
      </h1>

      <div className="space-y-4">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
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
          : articles.slice(5).map((item: iArticleType, index) => (
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
                      <span className="font-medium text-blue-600">
                        {item.author.firstName} {item.author.lastName}
                      </span>
                      {' · '}
                      {formatDistanceToNow(new Date(item.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default LatestNews;
