import React, { useEffect, useState, useCallback } from 'react';

import Header from '../component/Header';
import SEO from '../utils/SEO';
import Footer from '../component/Footer';
import { getPublishedArticles } from '../utils/requests/articlesRequest';
import NewsLetter from '../component/Newsletter';
import MainTopKSAd from '../component/ads/MainTopKSAd';
import { iArticleType } from '../utils/types/Article';
import MainArticles from '../component/MainArticles';
import SubMainArticles from '../component/SubMainArticles';
import LatestNews from '../component/LatestByCategory';
import Hero from '../component/clients/homepage/Hero';
import MostPopular from '../component/MostPopularArticle';
import AdvertisementSection from '../component/AdvertisementSection';

const Homepage: React.FC = () => {
  const [articles, setArticles] = useState<iArticleType[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await getPublishedArticles();
        setArticles(res?.articles || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const filterArticlesByCategory = useCallback(
    (category: string) =>
      articles.filter((article) => article.category === category),
    [articles]
  );

  const excludeByIds = useCallback(
    (items: iArticleType[], ids: string[]) =>
      items.filter((item: iArticleType) => !ids.includes(item?._id || '')),
    []
  );

  const renderCategorySections = () => {
    const categories = ['Entertainment', 'Sports', 'Business', 'Technology'];
    return categories.map((category) => {
      const filtered = filterArticlesByCategory(category);
      const main = filtered.slice(0, 2);
      const sub = excludeByIds(
        filtered,
        main.map((a: iArticleType) => a._id as string)
      ).slice(0, 3);

      return (
        <div className="" key={category}>
          <MainArticles title={category} articles={main} loading={loading} />
          <SubMainArticles title="" articles={sub} loading={loading} />
        </div>
      );
    });
  };

  return (
    <>
      <SEO
        mainData={{
          title: 'Kickside Rw – Rwanda’s Top Tech, Sports & Showbiz News',
          description:
            'Kickside is Rwanda’s leading digital newspaper covering tech, sports, entertainment, and business. Get all trending news from Rwanda and East Africa in one place.',
          author: 'Kickside Rwanda',
          image: 'https://www.kickside.rw/logo.svg',
          publishedAt: '2023-12-01T10:00:00Z',
          type: 'website',
        }}
        canonicalUrl="https://www.kickside.rw/"
      />

      <MainTopKSAd />

      <div className="bg-primary pb-5">
        <Header />
      </div>
      <div className="bg-primary pb-5">
        <Hero />
      </div>

      <div className="max-w-7xl px-4 mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="w-full lg:w-1/5 xl:w-2/10">
            <LatestNews
              title="Latest News"
              loading={loading}
              articles={articles}
            />
          </div>

          <div className="w-full lg:w-3/5 xl:w-6/10">
            {renderCategorySections()}
          </div>

          <div className="w-full lg:w-1/5 xl:w-2/10">
            <MostPopular />
            <AdvertisementSection />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <NewsLetter />
      </div>

      <Footer />
    </>
  );
};

export default Homepage;
