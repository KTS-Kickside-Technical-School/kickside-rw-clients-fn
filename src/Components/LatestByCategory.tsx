import React, { useEffect, useState } from 'react';
import NewsLetter from './Newsletter';
import { Link, useParams } from 'react-router-dom';
import { getArticlesByCategory } from '../utils/requests/articlesRequest';

interface NewsItem {
  slug: string;
  title: string;
  category: string;
  createdAt: string;
  coverImage: string;
}

const LatestNews: React.FC = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        if (categoryName) {
          const response = await getArticlesByCategory(categoryName);

          if (response.status === 200) {
            const articles = response.data.articles.slice(0, 7).map((item: any) => ({
              title: item.title,
              category: item.category,
              createdAt: item.createdAt,
              coverImage: item.coverImage || 'https://via.placeholder.com/400x200',
            }));

            setNewsItems(articles);
          } else {
            console.error('Error response from server:', response.data);
            setError('Failed to fetch news articles.');
          }
        }
      } catch (err) {
        console.error('Error fetching news articles:', err);
        setError('An error occurred while fetching news articles.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [categoryName]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading latest news...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Title */}
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Latest in {categoryName}</h1>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Articles */}
        <div className="lg:col-span-3">
          {newsItems.map((item, index) => (
              <Link to={`/news/${item.slug}`}>
            <div key={index} className="flex mb-2 border-b-2 border-[#ACACAC] pb-2">
              <img
                src={item.coverImage}
                alt="Article"
                className="w-[200px] h-[100px] object-cover mr-4"
              />
              <div className="flex-1">
                <span className="text-[#3E60F4] text-sm font-bold uppercase mb-2 block">
                  {item.category}
                </span>
                <h2 className="text-lg font-semibold text-black">
                  {item.title}
                </h2>
                <p className="text-[#ACACAC] text-sm">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
                </Link>
          ))}
        </div>

        {/* Sidebar with Advertisements */}
        <div className="lg:col-span-1 space-y-10">
          <div className="bg-[#D8D8D8] h-[400px] w-60 p-3 border-solid border-2 border-secondary justify-center text-center text-[#B1B1B1] mt-2">
            <span className="mt-6">Advertisement</span>
          </div>
          <div className="bg-[#D8D8D8] h-[400px] w-60 p-3 border-solid border-2 border-secondary justify-center text-center text-[#B1B1B1] mt-2">
            <span className="mt-6">Advertisement</span>
          </div>
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default LatestNews;
