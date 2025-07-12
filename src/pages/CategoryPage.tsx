import React, { useEffect, useState } from 'react';
import MainArticles from '../Components/MainArticles';
import Header from '../Components/Header';
import LatestNews from '../Components/LatestByCategory';
import Footer from '../Components/Footer';
import { useParams } from 'react-router-dom';
import {
  getArticlesByCategory,
  getPublishedArticles,
} from '../utils/requests/articlesRequest';
import SubMainArticles from '../Components/SubMainArticles';
import NewsLetter from '../Components/Newsletter';
import { ArticleType } from '../utils/types/Article';
import SEO from '../utils/SEO';
import MainTopKSAd from '../Components/ads/MainTopKSAd';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [publishedArticles, setPublishedArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        if (categoryName) {
          const response = await getArticlesByCategory(categoryName);
          setArticles(response?.data?.articles || []);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(!loading);
      }
    };

    fetchArticles();
  }, [categoryName]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getPublishedArticles();
        setPublishedArticles(response.articles || []);
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
      <SEO
        mainData={{
          title: ` All Trending ${categoryName} - Kickside News`,
          type: 'article',
        }}
        canonicalUrl={`https://www.kickside.rw/category/${categoryName}`}
      />
      <MainTopKSAd />

      <Header />
      <div className="w-full mx-auto m-auto  text-white">
        <div className=" mx-auto">
          <MainArticles
            loading={loading}
            articles={articles.slice(0, 2)}
            title={`Trending in ${categoryName}`}
          />
          {articles.length > 4 && (
            <SubMainArticles
              title={''}
              loading={loading}
              articles={articles.slice(2, 5)}
            />
          )}
          <div className="px-4">
            {articles.length > 12 && (
              <LatestNews
                title={`Latest in ${categoryName}`}
                articles={articles.slice(6, 13)}
                loading={loading}
              />
            )}
            {articles.length < 0 && !loading && (
              <LatestNews
                title={`Latest articles`}
                articles={publishedArticles.slice(0, 20)}
                loading={loading}
              />
            )}
          </div>
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
