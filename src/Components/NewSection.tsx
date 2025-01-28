import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import AdvertisementSection from './AdvertisementSection';
import { useParams } from 'react-router-dom';
import { getArticlesByCategory } from '../utils/requests/articlesRequest';

interface NewsItem {
  title: string;
  category: string;
  timeAgo: string;
  imageUrl?: string;
}

interface NewsSectionProps {
  title: string;
  category: string;
}

const NewsSection: React.FC<NewsSectionProps> = ({ title, category }) => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null)
      try {
        if (categoryName) {
          const response = await getArticlesByCategory(categoryName);
          if (response.status === 200) {
            const articles = response?.data?.articles.slice(0, 3).map((article: any) => ({
              title: article.title,
              category: article.category,
              timeAgo: calculateTimeAgo(article.createdAt),
              imageUrl: article.imageUrl || 'https://via.placeholder.com/150',
            }));
            setNewsData(articles);
          }
          else {

          }
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [categoryName]);
  console.log(categoryName);

  const calculateTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading news...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }
  if (!newsData.length) {
    return (
      <p className="text-center text-gray-500">
        No articles available in {categoryName}.
      </p>
    );
  }

  return (
    <div className="mt-0">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {newsData.map((news, index) => (
            <NewsCard key={index} {...news} />
          ))}
        </div>

        <div className="col-span-1 text-gray-400">
          <AdvertisementSection />
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
