import React from 'react';
import { Link } from 'react-router-dom';
import { iArticleType } from '../utils/types/Article';
import { formatDistanceToNowKinyarwanda } from '../utils/helpers/articleHelpers';

interface SubMainArticlesProps {
  title?: string;
  articles: iArticleType[];
  loading: boolean;
}

const KinSubMainArticles: React.FC<SubMainArticlesProps> = ({
  title,
  articles,
  loading,
}) => {
  return (
    <div className="w-full">
      {title && (
        <h1 className="text-2xl font-bold mb-4 text-dark w-full border-b pb-2">
          {title}
        </h1>
      )}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                className="w-full p-4 bg-gray-100 rounded-lg shadow-sm animate-pulse"
                key={index}
              >
                <div className="w-full aspect-video bg-gray-300 rounded mb-3"></div>
                <div className="h-4 bg-gray-400 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-400 rounded w-1/2"></div>
              </div>
            ))
          : articles.map((article: iArticleType, index) => (
              <div
                className="w-full p-4 hover:bg-gray-50 rounded-lg transition-colors"
                key={index}
              >
                <Link
                  to={`/category/${article.category}`}
                  className="inline-block text-blue-600 text-xs font-semibold mb-2 hover:underline relative"
                >
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-600"></span>
                  {article.category || 'Uncategorized'}
                </Link>

                <Link to={`/news/${article.slug}`} className="block w-full">
                  <h3 className="text-base font-bold text-gray-900 mb-2 hover:underline line-clamp-2">
                    {article.title || 'Untitled'}
                  </h3>
                </Link>

                <div className="text-xs text-gray-500 mt-2">
                  <Link
                    to={`/author/${article.author?.username}`}
                    className="hover:underline text-blue-600"
                  >
                    {article.author?.firstName} {article.author?.lastName}
                  </Link>
                  {' · '}
                  {formatDistanceToNowKinyarwanda(new Date(article?.createdAt))}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default KinSubMainArticles;
