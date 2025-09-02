import React, { useEffect, useState } from 'react';
import MainArticles from '../component/MainArticles';
import LatestNews from '../component/LatestByCategory';
import Footer from '../component/Footer';
import { useParams } from 'react-router-dom';
import {
  getArticlesByCategory,
  getPublishedArticles,
} from '../utils/requests/articlesRequest';
import SubMainArticles from '../component/SubMainArticles';
import NewsLetter from '../component/Newsletter';
import { iArticleType } from '../utils/types/Article';
import SEO from '../utils/SEO';
import MainTopKSAd from '../component/ads/MainTopKSAd';
import KinHeader from '../component/KinHeader';

const KinCategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [articles, setArticles] = useState<iArticleType[]>([]);
  const [publishedArticles, setPublishedArticles] = useState<iArticleType[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        if (categoryName) {
          const response = await getArticlesByCategory(
            categoryName,
            'kinyarwanda'
          );
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

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await getPublishedArticles();
        setPublishedArticles(response.articles || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <>
      <SEO
        mainData={{
          title: `${categoryName}, Amakuru agezweho, inkuru zishyushye zijyanya na ${categoryName} = Kickside News`,
          type: 'article',
        }}
        canonicalUrl={`https://www.kickside.rw/category/${categoryName}`}
      />
      <MainTopKSAd />
      <KinHeader />
      <div className="w-full px-4 mx-auto max-w-7xl">
        <div className="mx-auto">
          {articles.length > 0 && (
            <MainArticles
              loading={loading}
              articles={articles.slice(0, 2)}
              title={`${categoryName} `}
            />
          )}

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
                title={`Ibigezweho ${categoryName}`}
                articles={articles.slice(6, 13)}
                loading={loading}
              />
            )}
            {articles.length <= 0 && !loading && (
              <LatestNews
                title={`Inkuru ziheruka`}
                articles={publishedArticles.slice(0, 20)}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
      <NewsLetter />
      {articles.length > 18 && (
        <div className="w-full md:w-[80%] m-auto text-white">
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

export default KinCategoryPage;
