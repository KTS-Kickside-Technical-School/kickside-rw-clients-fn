import React, { Suspense, useMemo, useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SEO from '../utils/SEO';
import Footer from '../components/Footer';
import { getPublishedArticles } from '../utils/requests/articlesRequest';
import NewsLetter from '../components/Newsletter';
import MainTopKSAd from '../components/ads/MainTopKSAd';
import { FaSpinner } from 'react-icons/fa';
import { iArticleType } from '../utils/types/Article';
import HomePageSkeletonLoader from '../components/clients/homepage/HomePageSkeletonLoader';
import useCachedFetch from '../hooks/useCached';
import HomePageArticleItem from '../components/clients/homepage/HomePageArticleItem';
import HomepageTopHeadlines from '../components/clients/homepage/HomePageTopHeadlines';

const AdvertisementSection = React.lazy(
  () => import('../components/AdvertisementSection')
);
const LatestNews = React.lazy(() => import('../components/LatestByCategory'));
const MainArticles = React.lazy(() => import('../components/MainArticles'));
const SubMainArticles = React.lazy(
  () => import('../components/SubMainArticles')
);



const Homepage = () => {
  const { data: articles = [], loading } = useCachedFetch({
    key: 'ks_articles',
    fetcher: async () => {
      const res = await getPublishedArticles();
      return res.articles || [];
    },
    ttl: 5 * 60 * 1000, // 5 minutes
  });
  const navigate = useNavigate();

  const featuredArticle = useMemo(() => articles?.[0], [articles]);
  const firstThreeArticles = useMemo(() => articles?.slice(1, 4), [articles]);
  const topHeadlinesArticles = useMemo(() => articles?.slice(4, 8), [articles]);

  const filterArticlesByCategory = useCallback(
    (category: string) =>
      articles?.filter(
        (article: iArticleType) => article.category === category
      ),
    [articles]
  );

  const uniqueArticles = useCallback(
    (articles: iArticleType[], excludeIds: string[]) =>
      articles?.filter((article) => !excludeIds.includes(article._id)),
    []
  );

  const categorySections = useMemo(
    () =>
      ['Business', 'Technology'].map((category) => {
        const filteredArticles = filterArticlesByCategory(category);
        const mainArticles = filteredArticles?.slice(0, 2);
        const subMainArticles = uniqueArticles(
          filteredArticles,
          mainArticles?.map((a: iArticleType) => a._id)
        )?.slice(0, 3);

        return (
          <React.Fragment key={category}>
            <Suspense fallback={<div className="h-96" />}>
              <MainArticles
                title={category}
                articles={mainArticles}
                loading={loading}
              />
              <SubMainArticles
                title=""
                articles={subMainArticles}
                loading={loading}
              />
            </Suspense>
          </React.Fragment>
        );
      }),
    [articles, loading]
  );

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
        <div className="w-full px-4 mx-auto flex flex-col lg:flex-row gap-6">
          {loading ? (
            <HomePageSkeletonLoader />
          ) : (
            <>
              {featuredArticle && (
                <button
                  onClick={() => navigate(`/news/${featuredArticle?.slug}`)}
                  className="relative flex-1 h-[300px] sm:h-[400px] md:h-[500px] flex flex-col justify-end rounded-md overflow-hidden"
                >
                  <img
                    src={featuredArticle?.coverImage || ''}
                    srcSet={`${featuredArticle?.coverImage} 300w, ${featuredArticle?.coverImage} 1200w`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="eager"
                    alt={featuredArticle?.title || 'Featured'}
                    width={1200}
                    height={800}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                  <div className="relative z-20 flex flex-col justify-end h-full p-4">
                    <Link
                      to={`category/${featuredArticle?.category}`}
                      className="border-t-2 border-white text-white font-bold text-sm"
                    >
                      {featuredArticle?.category}
                    </Link>
                    <Link
                      to={`/news/${featuredArticle?.slug}`}
                      className="text-white text-lg font-bold mt-2 line-clamp-3"
                    >
                      {featuredArticle?.title}
                    </Link>
                    <div className="text-[#D8D8D8] mt-2 text-sm">
                      <Link to="author" className="text-[#D8D8D8]">
                        {featuredArticle?.author?.firstName}{' '}
                        {featuredArticle?.author?.lastName}
                      </Link>
                      <span>
                        {' '}
                        –{' '}
                        {featuredArticle?.createdAt &&
                          formatDistanceToNow(
                            new Date(featuredArticle?.createdAt),
                            {
                              addSuffix: true,
                            }
                          )}
                      </span>
                    </div>
                  </div>
                </button>
              )}

              <div className="flex-1 space-y-4">
                {firstThreeArticles.map((article: iArticleType) => (
                  <HomePageArticleItem key={article._id} article={article} />
                ))}
              </div>

              <div className="flex-1 px-2">
                <h1 className="font-bold text-white text-lg md:text-xl mb-4">
                  Top Headlines
                </h1>
                {topHeadlinesArticles.length > 0 ? (
                  <HomepageTopHeadlines articles={topHeadlinesArticles} />
                ) : (
                  !loading && (
                    <p className="text-white">No headlines available</p>
                  )
                )}
              </div>
            </>
          )}
        </div>

        <div className="w-full px-4 mx-auto">
          <Suspense fallback={<FaSpinner className="animate-spin" />}>
            <AdvertisementSection />
          </Suspense>
        </div>
      </div>

      <div className="w-full px-4 mx-auto">
        <Suspense fallback={<div className="h-96" />}>
          <LatestNews
            title="Latest news"
            loading={loading}
            articles={articles}
          />
        </Suspense>
      </div>

      <div className="w-full mx-auto">{categorySections}</div>

      <div className="mt-5">
        <NewsLetter />
      </div>
      <Footer />
    </>
  );
};

export default React.memo(Homepage);
