import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  getPublishedArticles,
  getSingleArticle,
  postComment,
} from '../utils/requests/articlesRequest';
import SEO from '../utils/SEO';
import Header from '../Components/Header';
import AdvertisementSection from '../Components/AdvertisementSection';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Footer from '../Components/Footer';
import { ArticleType } from '../utils/types/Article';
import RelatedArticles from '../Components/RelatedArticles';
import { formatDateTime } from '../utils/helpers/articleHelpers';
import Avatar from '/avatar.svg';
import { BsEye } from 'react-icons/bs';

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ArticleDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [articles, setArticles] = useState<any[]>([]);

  const [comments, setComments] = useState<any>([]);
  const [isRelatedArticlesLoading, setIsRelatedArticlesLoading] =
    useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSingleArticle = async (slug: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getSingleArticle(slug);
        setArticle(response.data.article);
        setComments(response.data.comments);
      } catch (err) {
        console.error('Error fetching the article:', err);
        setError('Failed to load the article. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchSingleArticle(slug);
    }
  }, [slug]);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsRelatedArticlesLoading(true);
      try {
        const response = await getPublishedArticles();
        setArticles(response?.articles || []);
      } catch (error) {
        console.error('Error fetching related articles:', error);
      } finally {
        setIsRelatedArticlesLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const isHTMLContent = (content: string): boolean => {
    const htmlRegex = /<\/?[a-z][\s\S]*>/i;
    return htmlRegex.test(content);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  const [comment, setComment] = useState('');
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentMessage, setCommentMessage] = useState<any>({});

  const handlePostComments = async (e: any) => {
    e.preventDefault();
    setIsCommentsLoading(true);
    setCommentMessage({});
    try {
      const response = await postComment({ article: article?._id, comment });
      setComments((prev: any) => [...prev, response.comment]);
      setComment('');
      setCommentMessage({ success: 'Comment posted successfully!' });
    } catch (error: any) {
      setCommentMessage({ error: error.message || 'Unknown error occurred' });
    } finally {
      setIsCommentsLoading(false);
    }
  };
  return (
    <>
      <SEO
        title={`${article?.title} - Kickside Rwanda`}
        description={article?.content}
        author={`${article?.author.firstName} ${article?.author.lastName}`}
        ogTitle={`${article?.title}`}
        ogDescription={article?.content}
        ogImage={article?.coverImage || '/logo.svg'}
        ogUrl={window.location.href}
        ogType="article"
        twitterCard="summary_large_image"
        twitterCreator="@kickside_rw"
      />
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <div className="p-6 flex flex-col lg:flex-row w-[90%] min-h-[40vh] lg:w-[80%] mx-auto items-center gap-8">
          {isLoading ? (
            <Skeleton className="w-full lg:w-1/2 h-64 rounded-lg" />
          ) : (
            <img
              src={article?.coverImage || ''}
              alt={article?.title || 'Featured'}
              className="w-full lg:w-1/2 h-auto object-cover rounded-lg shadow-lg"
            />
          )}
          <div className="flex-1 text-center lg:text-left">
            {isLoading ? (
              <Skeleton className="w-3/4 h-8 mx-auto lg:mx-0 mb-4" />
            ) : (
              <>
                <span className="border-t-2 border-dark pb-4">
                  {article?.category}
                </span>
                <h1 className="text-2xl lg:text-4xl font-bold text-gray-800">
                  {article?.title}
                </h1>
                <span className="mt-3">
                  Written by {article?.author?.firstName || 'Unknown'}{' '}
                  {article?.author?.lastName || 'Author'} on{' '}
                  {formatDate(article?.createdAt || '')}
                </span>
                <p className="flex items-center py-2">
                  <div className="flex items-center bg-gray-50 p-2 rounded-md shadow-sm">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700">
                      <BsEye className="text-xl" aria-label="Views Icon" />
                    </span>

                    <strong className="ml-3 text-gray-900 text-sm font-semibold">
                      {article?.views || 0}
                    </strong>
                  </div>
                </p>
              </>
            )}
          </div>
        </div>
        <div className="pb-3 flex flex-col lg:flex-row w-[90%] lg:w-[80%] mx-auto gap-8">
          <div className="flex-1 leading-relaxed">
            {isLoading ? (
              <Skeleton count={5} />
            ) : article?.content && isHTMLContent(article.content) ? (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            ) : (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: article?.content || 'No content available.',
                  }}
                  className="pb-3  bg-white p-6 shadow-lg"
                ></div>
              </>
            )}
            <div className="p-2 pb-4 mt-3 border-t-2 border-l-2 border-secondary bg-white shadow-lg">
              <Link to="" className="flex-row flex items-center">
                <img
                  src={article?.author?.profile || Avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 pl-4 text-gray-800">
                  {article?.author
                    ? `${article.author.firstName} ${article.author.lastName}`
                    : 'Journalist Names'}
                  <p className="text-grayac">{article?.author?.rank}</p>
                </div>
              </Link>
              <div className="font-bold pt-3">
                {article?.author?.bio || 'Passionate journalist'}
              </div>
              <Link to={''} className="font-bold text-grayac text-sm">
                View profile
              </Link>
            </div>
          </div>

          <aside className="w-full lg:w-1/3">
            <AdvertisementSection />
          </aside>
        </div>
        <div className="flex flex-col lg:flex-col w-[90%] lg:w-[80%] mx-auto gap-8">
          <AdvertisementSection />
          <div className="bg-gray-100 rounded-lg mt-6">
            <h2 className="text-2xl font-semibold border-b-2 border-dark pb-2 mb-4">
              Conversation
            </h2>
            {isCommentsLoading ? (
              <Skeleton count={3} className="h-8 mb-4" />
            ) : comments.length ? (
              comments.map((comment: any, index: number) => (
                <div key={index} className="mb-4 border-b pb-2">
                  <p className="text-gray-700">{comment.comment}</p>
                  <span className="text-sm text-gray-500">
                    {formatDateTime(comment.createdAt)}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md max-w-md mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M21 14.5A3.5 3.5 0 0117.5 18H6.5A3.5 3.5 0 013 14.5v-5A3.5 3.5 0 016.5 6h11A3.5 3.5 0 0121 9.5v5z"
                  />
                </svg>
                <p className="text-gray-700 text-lg">
                  No comments yet. Be the first to comment!
                </p>
              </div>
            )}
            <form
              onSubmit={handlePostComments}
              className="space-y-4 mt-4"
              method="post"
            >
              {commentMessage?.success && (
                <div className="text-green-500 text-sm">
                  {commentMessage.success}
                </div>
              )}
              {commentMessage?.error && (
                <div className="text-red-500 text-sm">
                  {commentMessage.error}
                </div>
              )}
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment..."
                className="w-full p-3 border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                required
              ></textarea>
              <button
                type="submit"
                className="px-6 float-right py-2 bg-blue-500 text-white hover:bg-blue-600"
                disabled={isCommentsLoading}
              >
                {isCommentsLoading ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          </div>
          <div className="">
            {isRelatedArticlesLoading ? (
              <Skeleton count={3} className="h-6 mb-4" />
            ) : (
              <RelatedArticles title="Related Articles" articles={articles} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArticleDetails;
