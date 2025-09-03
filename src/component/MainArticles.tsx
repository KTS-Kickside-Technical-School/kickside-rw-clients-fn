import { Link } from 'react-router-dom';
import { iArticleType } from '../utils/types/Article';
import { formatDistanceToNow } from 'date-fns';

interface MainArticlesProps {
  loading: boolean;
  articles: iArticleType[];
  title: string;
}

const MainArticles = ({ loading, articles, title }: MainArticlesProps) => {
  const renderSkeleton = () => (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      <div className="flex-1 w-full aspect-[16/9] lg:aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden animate-pulse"></div>
      <div className="hidden lg:flex flex-col w-full lg:w-1/3 aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden animate-pulse">
        <div className="h-2/3 bg-gray-300"></div>
        <div className="p-4 flex-1">
          <div className="w-1/4 h-3 bg-gray-300 mb-2 rounded"></div>
          <div className="w-full h-5 bg-gray-300 mb-2 rounded"></div>
          <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );

  const renderArticles = () => (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {articles[0] && (
        <div className="flex-1 w-full relative group rounded-xl">
          <div className="aspect-[16/9] lg:aspect-[4/3] rounded-xl overflow-hidden relative">
            <img
              src={articles[0].coverImage}
              alt={articles[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <Link
              to={`/news/${articles[0].slug}`}
              className="absolute inset-0 flex flex-col justify-end p-6"
            >
              <div className="relative z-10">
                <Link
                  to={`/category/${articles[0].category}`}
                  className="text-white text-sm font-medium mb-2 inline-block relative pb-2"
                >
                  <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-white"></span>
                  {articles[0].category || 'Uncategorized'}
                </Link>
                <h2 className="text-white text-xl md:text-2xl font-bold mb-2 line-clamp-2">
                  {articles[0].title}
                </h2>
                <p className="text-gray-300 text-sm">
                  <Link
                    to={`/author/${articles[0].author?.username}`}
                    className="hover:underline"
                  >
                    {articles[0].author?.firstName}{' '}
                    {articles[0].author?.lastName}
                  </Link>
                  {' · '}
                  {formatDistanceToNow(new Date(articles[0].createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </Link>
          </div>
        </div>
      )}

      {articles[1] && (
        <div className="hidden lg:flex flex-col w-full lg:w-1/3 group">
          <Link
            to={`/news/${articles[1].slug}`}
            className="aspect-[4/3] rounded-xl overflow-hidden mb-3"
          >
            <img
              src={articles[1].coverImage}
              alt={articles[1].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <div>
            <Link
              to={`/category/${articles[1].category}`}
              className="text-blue-600 text-sm font-medium mb-2 inline-block"
            >
              {articles[1].category || 'Uncategorized'}
            </Link>
            <Link to={`/news/${articles[1].slug}`}>
              <h3 className="text-gray-900 text-lg font-bold mb-1 line-clamp-2 hover:text-blue-600 transition-colors">
                {articles[1].title}
              </h3>
            </Link>
            <p className="text-gray-500 text-sm">
              <Link
                to={`/author/${articles[1].author?.username}`}
                className="hover:underline"
              >
                {articles[1].author?.firstName} {articles[1].author?.lastName}
              </Link>
              {' · '}
              {formatDistanceToNow(new Date(articles[1].createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section className="w-full py-8 md:py-12">
      <div className="w-full max-w-7xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 md:mb-8">
          {title}
        </h1>
        {loading ? renderSkeleton() : renderArticles()}
      </div>
    </section>
  );
};

export default MainArticles;
