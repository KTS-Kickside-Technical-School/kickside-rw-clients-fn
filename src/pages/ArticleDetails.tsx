import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  getSingleArticle,
  postComment,
} from '../utils/requests/articlesRequest';
import SEO from '../utils/SEO';
import Header from '../components/Header';
import AdvertisementSection from '../components/AdvertisementSection';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Footer from '../components/Footer';
import { iArticleType } from '../utils/types/Article';
import RelatedArticles from '../components/RelatedArticles';
import { formatDateTime } from '../utils/helpers/articleHelpers';
import Avatar from '/avatar.svg';
import NewsLetter from '../components/Newsletter';
import MainTopKSAd from '../components/ads/MainTopKSAd';
import MostPopular from '../components/MostPopularArticle';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import XIcon from '../icons/X';
import { iComment } from '../utils/types/commentType';

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
  const [article, setArticle] = useState<iArticleType | null>(null);
  const [articles, setArticles] = useState<iArticleType[]>([]);

  const [comments, setComments] = useState<iComment[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [comment, setComment] = useState('');
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentMessage, setCommentMessage] = useState<{
    error?: string;
    success?: string;
  }>({});

  useEffect(() => {
    const fetchSingleArticle = async (slug: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getSingleArticle(slug);
        setArticle(response.data.article);
        setComments(response.data.comments);
        setArticles(response.data.related);
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

  const handlePostComments = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCommentsLoading(true);
    setCommentMessage({});
    try {
      const response = await postComment({
        article: article?._id || '',
        comment,
      });
      setComments((prev: iComment[]) => [...prev, response.comment]);
      setComment('');
      setCommentMessage({ success: 'Comment posted successfully!' });
    } catch (error) {
      setCommentMessage({ error: 'Unknown error occurred' });
      console.error('Error posting comment:', error);
    } finally {
      setIsCommentsLoading(false);
    }
  };

  const shareUrl = `https://www.kickside.rw/news/${
    article?.slug || window.location.href
  }`;

  return (
    <>
      {article && (
        <SEO
          mainData={{
            title: `${article.title} - Kickside News`,
            description: article.content || 'Kickside Article',
            author: `${article.author?.firstName || ''} ${
              article.author?.lastName || ''
            }`,
            image: article.coverImage,
            publishedAt: article.createdAt,
            type: 'article',
          }}
          canonicalUrl={`https://www.kickside.rw/news/${article.slug}`}
        />
      )}

      <MainTopKSAd />

      <Header />
      <div className="w-full px-4 mx-auto max-w-7xl">
        <div className="py-6 flex flex-col lg:flex-row w-full min-h-[40vh] items-center gap-8 px-4">
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
                <Link
                  to={`/category/${article?.category}`}
                  className="border-t-2 border-dark pb-4 hover:underline hover:text-primary"
                >
                  {article?.category}
                </Link>
                <h1 className="text-2xl lg:text-4xl font-bold text-gray-800">
                  {article?.title}
                </h1>
                <span className="mt-3">
                  Written by {article?.author?.firstName || 'Unknown'}{' '}
                  {article?.author?.lastName || 'Author'} on{' '}
                  {formatDate(article?.createdAt || '')}
                </span>

                <p className="flex items-center gap-4 py-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(
                        `${article?.title}\n${shareUrl}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-700"
                      aria-label="Share on WhatsApp"
                    >
                      <FaWhatsapp />
                    </a>

                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        `${article?.title}\n\n${shareUrl}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
                      aria-label="Share on X"
                    >
                      <XIcon />
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                        shareUrl
                      )}&title=${encodeURIComponent(
                        article?.title || 'www.kickside.rw'
                      )}&summary=${encodeURIComponent(
                        article?.title || 'Welcome to kickside Rwanda'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-800"
                      aria-label="Share on LinkedIn"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href="https://www.instagram.com/kickside_rw/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600"
                      aria-label="View on Instagram"
                    >
                      <FaInstagram />
                    </a>
                  </div>
                </p>
              </>
            )}
          </div>
        </div>
        <div className="pb-3 flex flex-col lg:flex-row w-full gap-8 px-4">
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
              <Link
                to={`/author/${article?.author?.username}`}
                className="flex-row flex items-center"
              >
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
              <Link
                to={`/author/${article?.author?.username}`}
                className="font-bold text-grayac text-sm"
              >
                View profile
              </Link>
            </div>
          </div>

          <aside className="w-full lg:w-1/3">
            <AdvertisementSection />
            <MostPopular />
          </aside>
        </div>
        <div className="flex flex-col w-full gap-8 px-4">
          <AdvertisementSection />
          <div className="bg-gray-100 rounded-lg mt-6">
            <h2 className="text-2xl font-semibold border-b-2 border-dark pb-2 mb-4">
              Conversation
            </h2>
            {isCommentsLoading ? (
              <Skeleton count={3} className="h-8 mb-4" />
            ) : comments.length ? (
              comments.map((comment: iComment, index: number) => (
                <div key={index} className="mb-4 border-b pb-2">
                  <p className="text-gray-700">{comment.comment}</p>
                  <span className="text-sm text-gray-500">
                    {formatDateTime(
                      comment?.createdAt || new Date().toISOString()
                    )}
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
            {isLoading ? (
              <Skeleton count={3} className="h-6 mb-4" />
            ) : (
              <RelatedArticles title="Related Articles" articles={articles} />
            )}
          </div>
        </div>
      </div>
      <NewsLetter />
      <Footer />
    </>
  );
};

export default ArticleDetails;
