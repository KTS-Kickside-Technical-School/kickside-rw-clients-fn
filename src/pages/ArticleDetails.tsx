import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleArticle } from '../utils/requests/articlesRequest';
import SEO from '../utils/SEO';
import Header from '../Components/Header';
import AdvertisementSection from '../Components/AdvertisementSection';
import { GoGraph } from 'react-icons/go';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Article {
    title: string;
    coverImage: string;
    content: string;
    category: string;
    author: {
        firstName: string;
        lastName: string;
    };
    createdAt: string;
}

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
    const [article, setArticle] = useState<Article | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSingleArticle = async (slug: string) => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await getSingleArticle(slug);
                setArticle(response.data.article);
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

    return (
        <>
            <SEO title={`${article?.title || 'Article'} - Kickside Rwanda`} />
            <div className="bg-gray-100 min-h-screen">
                <Header />
                <div className="p-6 flex flex-col lg:flex-row w-[90%] lg:w-[80%] mx-auto items-center gap-8">
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
                                <span className='border-t-2 border-dark pb-4'>
                                    {article?.category}
                                </span>
                                <h1 className="text-2xl lg:text-4xl font-bold text-gray-800">
                                    {article?.title}
                                </h1>
                                <span className='mt-3'>
                                    Written by {article?.author?.firstName} {article?.author?.lastName} on
                                    {" "} {formatDate(article?.createdAt || "")}
                                </span>
                            </>
                        )}
                    </div>
                </div>
                <div className="p-6 flex flex-col lg:flex-row w-[90%] lg:w-[80%] mx-auto gap-8">
                    <div className="flex-1 leading-relaxed bg-white p-6 shadow-lg rounded-lg">
                        {isLoading ? (
                            <Skeleton count={5} />
                        ) : article?.content && isHTMLContent(article.content) ? (
                            <div dangerouslySetInnerHTML={{ __html: article.content }} />
                        ) : (
                            <p>{article?.content || 'No content available.'}</p>
                        )}
                    </div>
                    <aside className="w-full lg:w-1/3">
                        <AdvertisementSection />
                        <div className="bg-gray-200 p-4 rounded-lg shadow-lg mt-6">
                            <div className="flex items-center mb-4">
                                <GoGraph className="text-primary text-2xl mr-2" />
                                <h3 className="text-xl font-semibold text-gray-800">Most Popular</h3>
                            </div>
                            <ul>
                                {Array.from({ length: 5 }).map((_, idx) =>
                                    isLoading ? (
                                        <li key={idx} className="mb-4">
                                            <Skeleton />
                                        </li>
                                    ) : (
                                        <li
                                            key={idx}
                                            className="line-clamp-2 text-gray-700 font-medium mb-3 hover:text-primary transition duration-200 cursor-pointer"
                                        >
                                            Example popular article #{idx + 1}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
};

export default ArticleDetails;