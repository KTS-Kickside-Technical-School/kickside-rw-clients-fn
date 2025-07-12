import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import AdvertisementSection from '../Components/AdvertisementSection';
import Header from '../Components/Header';
import SEO from '../utils/SEO';
import Footer from '../Components/Footer';
import { getPublishedArticles } from '../utils/requests/articlesRequest';
import LatestNews from '../Components/LatestByCategory';
import MainArticles from '../Components/MainArticles';
import SubMainArticles from '../Components/SubMainArticles';
import NewsLetter from '../Components/Newsletter';
import MainTopKSAd from '../Components/ads/MainTopKSAd';

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
    fetchArticles();
  }, []);

  const filterArticlesByCategory = (category: string) =>
    articles.filter((article) => article.category === category);

  const uniqueArticles = (articles: any[], excludeIds: string[]) =>
    articles.filter((article) => !excludeIds.includes(article._id));

  const renderArticle = (article: any) => (
    <Link
      to={`/news/${article?.slug}`}
      key={article?._id}
      className="block w-full"
    >
      <div className="relative h-[300px] md:h-[350px] lg:h-[250px] xl:h-[200px] overflow-hidden rounded-md">
        <img
          src={article?.coverImage || ''}
          alt={article?.title || ''}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
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
  );

  const renderTopHeadlines = () => (
    <ol className="space-y-3">
      {articles.slice(4, 8).map((article: any, index) => (
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
  );

  const renderSkeleton = () => (
    <div className="w-full flex flex-col lg:flex-row gap-4 animate-pulse">
      <div className="flex-1 h-[300px] sm:h-[400px] md:h-[500px] bg-gray-700 rounded-lg"></div>
      <div className="flex-1 space-y-4">
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="h-[200px] bg-gray-700 rounded-lg"></div>
          ))}
      </div>
      <div className="flex-1 space-y-3">
        <div className="h-6 bg-gray-700 w-1/2 rounded"></div>
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="h-5 bg-gray-700 rounded"></div>
          ))}
      </div>
    </div>
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
            renderSkeleton()
          ) : (
            <>
              <Link
                to={`/news/${articles[0]?.slug}`}
                className="relative flex-1 h-[300px] sm:h-[400px] md:h-[500px] flex flex-col justify-end rounded-md overflow-hidden"
              >
                <img
                  src={articles[0]?.coverImage || ''}
                  alt={articles[0]?.title || 'Featured'}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                <div className="relative z-20 flex flex-col justify-end h-full p-4">
                  <Link
                    to={`category/${articles[0]?.category}`}
                    className="border-t-2 border-white text-white font-bold text-sm"
                  >
                    {articles[0]?.category}
                  </Link>
                  <Link
                    to={`/news/${articles[0]?.slug}`}
                    className="text-white text-lg font-bold mt-2 line-clamp-3"
                  >
                    {articles[0]?.title}
                  </Link>
                  <div className="text-[#D8D8D8] mt-2 text-sm">
                    <Link to="author" className="text-[#D8D8D8]">
                      {articles[0]?.author?.firstName}{' '}
                      {articles[0]?.author?.lastName}
                    </Link>
                    <span>
                      {' '}
                      –{' '}
                      {articles[0]?.createdAt &&
                        formatDistanceToNow(new Date(articles[0]?.createdAt), {
                          addSuffix: true,
                        })}
                    </span>
                  </div>
                </div>
              </Link>

              <div className="flex-1 space-y-4">
                {articles.slice(1, 4).map((article) => renderArticle(article))}
              </div>

              <div className="flex-1 px-2">
                <h1 className="font-bold text-white text-lg md:text-xl mb-4">
                  Top Headlines
                </h1>
                {renderTopHeadlines()}
              </div>
            </>
          )}
        </div>

        <div className="w-full px-4 mx-auto">
          <AdvertisementSection />
        </div>
      </div>

      <div className="w-full px-4 mx-auto">
        <LatestNews title="Latest news" loading={loading} articles={articles} />
      </div>

      <div className="w-full mx-auto">
        {['Business', 'Technology'].map((category) => {
          const filteredArticles = filterArticlesByCategory(category);
          const mainArticles = filteredArticles.slice(0, 2);
          const subMainArticles = uniqueArticles(
            filteredArticles,
            mainArticles.map((a) => a._id)
          ).slice(0, 3);

          return (
            <React.Fragment key={category}>
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
            </React.Fragment>
          );
        })}
      </div>

      <div className="mt-5">
        <NewsLetter />
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
