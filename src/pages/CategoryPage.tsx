import React, { useEffect, useState } from 'react';
import MainArticles from '../Components/MainArticles';
import Header from '../Components/Header';
import LatestNews from '../Components/LatestByCategory';
import Footer from '../Components/Footer';
import { useParams } from 'react-router-dom';
import { getArticlesByCategory } from '../utils/requests/articlesRequest';
import SubMainArticles from '../Components/SubMainArticles';
import NewsLetter from '../Components/Newsletter';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        if (categoryName) {
          const response = await getArticlesByCategory(categoryName);
          console.log(response);
          setArticles(response?.data?.articles || []);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [categoryName]);
  return (
    <>
      <Header />
      <div className="w-full md:w-[80%] m-auto  text-white">
        <div className="container mx-auto px-4">
          <MainArticles
            loading={loading}
            articles={articles.slice(0, 2)}
            title={`Trending in ${categoryName}`}
          />
          <SubMainArticles
            title={''}
            loading={loading}
            articles={articles.slice(2, 5)}
          />
          <LatestNews
            title={`Latest in ${categoryName}`}
            articles={articles.slice(6, 13)}
            loading={loading}
          />
        </div>
      </div>
      <NewsLetter />
      {articles.length > 18 && (
        <div className="w-full md:w-[80%] m-auto  text-white">
          <div className="container mx-auto px-4">
            <MainArticles
              loading={loading}
              articles={articles.slice(13, 15)}
              title={`You may also like`}
            />
            <SubMainArticles
              title={''}
              loading={loading}
              articles={articles.slice(15, 18)}
            />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default CategoryPage;
