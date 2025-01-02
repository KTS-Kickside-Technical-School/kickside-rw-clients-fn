import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

import AdvertisementSection from "../Components/AdvertisementSection";
import Header from "../Components/Header";

import { getPublishedArticles } from "../utils/requests/articlesRequest";
import SEO from "../utils/SEO";
import Footer from "../Components/Footer";

const SkeletonLoader = ({ count }: { count: number }) => (
    <>
        {Array.from({ length: count }).map((_, index) => (
            <div
                key={index}
                className="animate-pulse bg-gray-300 bg-opacity-50 h-32 w-full rounded-md mb-4"
            />
        ))}
    </>
);

const Homepage = () => {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await getPublishedArticles();
                setArticles(response.articles || []);
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    console.log("Articles", articles)

    return (
        <>
            <SEO title="Home: Kickside Rw - Best of Tech, Sports and Showbizz. All Trending news in one place" />
            <div>
                <div className="bg-primary pb-5">
                    <div className="m-auto">
                        <Header />
                        <div className="w-[90%] lg:w-[80%] mx-auto flex flex-col sm:flex-col lg:flex-row min-h-[60vh] gap-4">
                            <div className="relative flex-1 lg:flex-grow sm:h-[500px] md:h-[600px] lg:h-auto min-h-[500px] flex flex-col justify-end">
                                {loading ? (
                                    <SkeletonLoader count={1} />
                                ) : (
                                    <>
                                        <img
                                            src={articles[0]?.coverImage || ""}
                                            alt={articles[0]?.title || "Featured"}
                                            className="absolute inset-0 w-full h-full object-cover z-0 rounded-lg"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 rounded-lg"></div>
                                        <div className="relative z-20 flex flex-col justify-end h-full p-4">
                                            <div>
                                                <Link
                                                    to={`category/${articles[0]?.category}`}
                                                    className="border-t-2 border-white text-white font-bold text-sm md:text-base"
                                                >
                                                    {articles[0]?.category}
                                                </Link>
                                            </div>
                                            <Link
                                                to={`/${articles[0]?._id}`}
                                                className="text-white text-lg sm:text-base md:text-lg lg:text-xl font-bold mt-2 line-clamp-3"
                                            >
                                                {articles[0]?.title}
                                            </Link>

                                            <div className="text-[#D8D8D8] mt-2 text-sm">
                                                <Link to="author" className="text-[#D8D8D8]">
                                                    {articles[0]?.author?.firstName}{" "}
                                                    {articles[0]?.author?.lastName}
                                                </Link>{" "}
                                                <span>
                                                    -{" "}
                                                    {articles[0]?.createdAt &&
                                                        formatDistanceToNow(new Date(articles[0]?.createdAt), {
                                                            addSuffix: true,
                                                        })}
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex-1 lg:flex-grow space-y-4">
                                {loading ? (
                                    <SkeletonLoader count={3} />
                                ) : (
                                    articles.slice(1, 4).map((article: any) => (
                                        <div
                                            className="relative h-[450px] sm:h-[300px] md:h-[400px] lg:h-[200px] rounded-lg overflow-hidden"
                                            key={article?._id}
                                        >
                                            <img
                                                src={article?.coverImage || ""}
                                                alt={article?.title || ""}
                                                className="absolute inset-0 w-full h-full object-cover z-0"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                                            <div className="relative z-20 flex flex-col justify-end h-full p-4">
                                                <div>
                                                    <Link
                                                        to={`category/${article?.category}`}
                                                        className="border-t-2 border-white text-white font-bold text-sm md:text-base"
                                                    >
                                                        {article?.category}
                                                    </Link>
                                                </div>
                                                <Link
                                                    to={`/${article?._id}`}
                                                    className="text-white line-clamp-2 mt-2 text-sm md:text-base"
                                                >
                                                    {article?.title}
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="flex-1 lg:flex-grow px-4">
                                <h1 className="font-bold text-white text-lg md:text-2xl mb-4">
                                    Top Headlines
                                </h1>
                                {loading ? (
                                    <SkeletonLoader count={4} />
                                ) : (
                                    <ol className="space-y-3">
                                        {articles.slice(4, 8).map((article: any, index) => (
                                            <li
                                                className="text-white text-sm md:text-lg font-medium flex"
                                                key={article?._id}
                                            >
                                                <strong className="mx-3">{index + 1}.</strong>
                                                <Link
                                                    to={`/${article?._id}`}
                                                    className="hover:text-gray-200 transition"
                                                >
                                                    {article?.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ol>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-[90%] lg:w-[80%] mx-auto">
                        <AdvertisementSection />
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Homepage;
