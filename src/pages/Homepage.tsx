import React, { useEffect, useState, useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import SEO from '../utils/SEO';
import Footer from '../components/Footer';
import { getPublishedArticles } from '../utils/requests/articlesRequest';
import NewsLetter from '../components/Newsletter';
import MainTopKSAd from '../components/ads/MainTopKSAd';
import { iArticleType } from '../utils/types/Article';
import HomePageArticleItem from '../components/clients/homepage/HomePageArticleItem';
import HomepageTopHeadlines from '../components/clients/homepage/HomePageTopHeadlines';
import MainArticles from '../components/MainArticles';
import SubMainArticles from '../components/SubMainArticles';
import LatestNews from '../components/LatestByCategory';

const Homepage: React.FC = () => {
  const [articles, setArticles] = useState<iArticleType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

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

  const featuredArticle = articles[0];
  const firstThreeArticles = articles.slice(1, 4);
  const topHeadlinesArticles = articles.slice(4, 8);

  const filterArticlesByCategory = useCallback(
    (category: string) =>
      articles.filter((article) => article.category === category),
    [articles]
  );

  const excludeByIds = useCallback(
    (items: iArticleType[], ids: string[]) =>
      items.filter((item) => !ids.includes(item._id)),
    []
  );

  const renderCategorySections = () => {
    const categories = ['Business', 'Technology'];
    return categories.map((category) => {
      const filtered = filterArticlesByCategory(category);
      const main = filtered.slice(0, 2);
      const sub = excludeByIds(
        filtered,
        main.map((a) => a._id)
      ).slice(0, 3);

      return (
        <div className="max-w-7xl mx-auto" key={category}>
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

        <div className="w-full px-4 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredArticle && (
            <div className="lg:col-span-2">
              <button
                onClick={() => navigate(`/news/${featuredArticle.slug}`)}
                className="relative w-full aspect-[16/9] sm:aspect-[3/2] md:aspect-[16/9] flex flex-col justify-end rounded-xl overflow-hidden transition-transform hover:scale-[0.98]"
                aria-label={`Read ${featuredArticle.title}`}
              >
                <img
                  src={featuredArticle.coverImage}
                  srcSet={`${featuredArticle.coverImage} 640w, ${featuredArticle.coverImage} 1200w`}
                  sizes="(max-width: 1023px) 100vw, 66vw"
                  loading="eager"
                  alt={featuredArticle.title}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  width={1200}
                  height={800}
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
                <div className="relative z-20 flex flex-col justify-end h-full p-4 sm:p-6 md:p-8">
                  <Link
                    to={`/category/${featuredArticle.category}`}
                    className="self-start border-t-2 border-white text-white font-bold text-sm sm:text-base mb-2 px-1 hover:underline"
                  >
                    {featuredArticle.category}
                  </Link>
                  <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mt-2 line-clamp-3 text-left">
                    {featuredArticle.title}
                  </h2>
                  <div className="text-gray-200 mt-2 text-sm sm:text-base">
                    <Link
                      to={`/author/${featuredArticle.author?.username}`}
                      className="hover:underline"
                    >
                      {featuredArticle.author?.firstName}{' '}
                      {featuredArticle.author?.lastName}
                    </Link>
                    <span>
                      {' '}
                      –{' '}
                      {formatDistanceToNow(
                        new Date(featuredArticle.createdAt),
                        {
                          addSuffix: true,
                        }
                      )}
                    </span>
                  </div>
                </div>
              </button>
            </div>
          )}

          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {firstThreeArticles.map((article) => (
              <HomePageArticleItem key={article._id} article={article} />
            ))}
          </div>

          <div className="lg:col-span-3">
            <div className="border-t border-gray-700 pt-6">
              <h2 className="font-bold text-white text-xl md:text-2xl mb-4 sm:mb-6">
                Top Headlines
              </h2>
              {topHeadlinesArticles.length > 0 ? (
                <HomepageTopHeadlines articles={topHeadlinesArticles} />
              ) : (
                !loading && (
                  <p className="text-gray-400 text-center py-8">
                    No headlines available
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 mx-auto">
        <LatestNews title="Latest News" loading={loading} articles={articles} />
      </div>

      <div className="w-full mx-auto">{renderCategorySections()}</div>

      <div className="mt-5">
        <NewsLetter />
      </div>

      <Footer />
    </>
  );
};

export default Homepage;
