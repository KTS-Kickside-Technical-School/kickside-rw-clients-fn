import React, {
  useEffect,
  useState,
  Suspense,
  useMemo,
  useCallback,
} from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import SEO from '../utils/SEO';
import Footer from '../Components/Footer';
import { getPublishedArticles } from '../utils/requests/articlesRequest';
import NewsLetter from '../Components/Newsletter';
import MainTopKSAd from '../Components/ads/MainTopKSAd';
import { FaSpinner } from 'react-icons/fa';

const AdvertisementSection = React.lazy(
  () => import('../Components/AdvertisementSection')
);
const LatestNews = React.lazy(() => import('../Components/LatestByCategory'));
const MainArticles = React.lazy(() => import('../Components/MainArticles'));
const SubMainArticles = React.lazy(
  () => import('../Components/SubMainArticles')
);

const SkeletonLoader = React.memo(() => (
  <div className="w-full flex flex-col lg:flex-row gap-4 animate-pulse">
    <div className="flex-1 h-[300px] sm:h-[400px] md:h-[500px] bg-gray-700 rounded-lg" />
    <div className="flex-1 space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-[200px] bg-gray-700 rounded-lg" />
      ))}
    </div>
    <div className="flex-1 space-y-3">
      <div className="h-6 bg-gray-700 w-1/2 rounded" />
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-5 bg-gray-700 rounded" />
      ))}
    </div>
  </div>
));

const ArticleItem = React.memo(({ article }: { article: any }) => (
  <Link to={`/news/${article?.slug}`} className="block w-full">
    <div className="relative h-[300px] md:h-[350px] lg:h-[250px] xl:h-[200px] overflow-hidden rounded-md">
      <img
        src={article?.coverImage || ''}
        srcSet={`${article?.coverImage} 300w, ${article?.coverImage} 600w`}
        sizes="(max-width: 768px) 100vw, 33vw"
        loading="lazy"
        alt={article?.title || ''}
        width={600}
        height={400}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
      <div className="relative z-20 flex flex-col justify-end h-full p-4">
        <Link
          to={`category/${article?.category}`}
          className="border-t-2 border-white text-white font-bold text-xs md:text-sm"
        >
          {article?.category}
        </Link>
        <Link
          to={`/news/${article?.slug}`}
          className="text-white line-clamp-2 mt-2 text-sm md:text-base"
        >
          {article?.title}
        </Link>
      </div>
    </div>
  </Link>
));

const TopHeadlines = React.memo(({ articles }: { articles: any[] }) => (
  <ol className="space-y-3">
    {articles.map((article, index) => (
      <li
        className="text-white text-sm md:text-base font-medium flex"
        key={article?._id}
      >
        <strong className="mr-2">{index + 1}.</strong>
        <Link
          to={`/news/${article?.slug}`}
          className="hover:text-gray-200 transition"
        >
          {article?.title}
        </Link>
      </li>
    ))}
  </ol>
));

const Homepage = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getPublishedArticles();
        setArticles(response.articles || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchArticles, 300);
    return () => clearTimeout(delay);
  }, []);

  const featuredArticle = useMemo(() => articles[0], [articles]);
  const firstThreeArticles = useMemo(() => articles.slice(1, 4), [articles]);
  const topHeadlinesArticles = useMemo(() => articles.slice(4, 8), [articles]);

  const filterArticlesByCategory = useCallback(
    (category: string) =>
      articles.filter((article) => article.category === category),
    [articles]
  );

  const uniqueArticles = useCallback(
    (articles: any[], excludeIds: string[]) =>
      articles.filter((article) => !excludeIds.includes(article._id)),
    []
  );

  const categorySections = useMemo(
    () =>
      ['Business', 'Technology'].map((category) => {
        const filteredArticles = filterArticlesByCategory(category);
        const mainArticles = filteredArticles.slice(0, 2);
        const subMainArticles = uniqueArticles(
          filteredArticles,
          mainArticles.map((a) => a._id)
        ).slice(0, 3);

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
            <SkeletonLoader />
          ) : (
            <>
              {featuredArticle && (
                <Link
                  to={`/news/${featuredArticle?.slug}`}
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
                </Link>
              )}

              <div className="flex-1 space-y-4">
                {firstThreeArticles.map((article) => (
                  <ArticleItem key={article._id} article={article} />
                ))}
              </div>

              <div className="flex-1 px-2">
                <h1 className="font-bold text-white text-lg md:text-xl mb-4">
                  Top Headlines
                </h1>
                {topHeadlinesArticles.length > 0 ? (
                  <TopHeadlines articles={topHeadlinesArticles} />
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
