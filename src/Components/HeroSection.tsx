import React, { useEffect, useState } from "react";
import { getArticlesByCategory } from "../utils/requests/articlesRequest";
import { useParams } from "react-router-dom";

const HeroSection: React.FC = () => {
    const { categoryName } = useParams<{ categoryName: string }>();
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                if (categoryName) {
                    const response = await getArticlesByCategory(categoryName);
                    setArticles(response?.data?.articles || []);
                }
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [categoryName]);
    if (loading) {
      return <p className="text-center text-gray-500">Loading articles...</p>;
    }
    if (!articles.length) {
      return (
        <p className="text-center text-gray-500">
          No articles available in {categoryName}.
        </p>
      );
    }

    return (
        <section className="text-white py-16">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl text-[#3E60F4] font-bold mb-8">Trending in {categoryName}</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {articles[0] && (
                        <div className="relative flex-1 w-full lg:w-[500px] lg:h-[450px]">
                            <img
                                src={articles[0]?.coverImage || ""}
                                alt={articles[0]?.title || "No Title"}
                                className="shadow-lg w-full h-[400px] lg:h-[450px] object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                                <span className="relative text-white text-sm font-semibold mb-2">
                                    <span className="absolute top-[-4px] left-0 w-12 h-[2px] bg-white"></span>
                                    {articles[0]?.category || "Uncategorized"}
                                </span>
                                <h2 className="text-2xl font-bold mb-2">{articles[0]?.title || "Untitled"}</h2>
                                <p className="text-[#ACACAC] text-sm mt-2">
                                    By {articles[0]?.author?.name || "Unknown Author"} ·{" "}
                                    {articles[0]?.createdAt
                                        ? new Date(articles[0]?.createdAt).toLocaleDateString()
                                        : "Unknown Date"}
                                </p>
                            </div>
                        </div>
                    )}

                    {articles[1] && (
                        <div className="flex-1 w-full lg:w-[512px] lg:h-[450px] hidden lg:block">
                            <img
                                src={articles[1]?.coverImage || ""}
                                alt={articles[1]?.title || "No Title"}
                                className="shadow-lg w-full h-[357px] object-cover mb-1"
                            />

                            <div>
                                <span className="relative text-blue-400 text-sm font-semibold">
                                    {articles[1]?.category || "Uncategorized"}
                                </span>
                                <h2 className="text-xl text-black font-bold mb-0">{articles[1]?.title || "Untitled"}</h2>
                                <p className="text-[#ACACAC] text-sm">
                                    By {articles[1]?.author?.name || "Unknown Author"} ·{" "}
                                    {articles[1]?.createdAt
                                        ? new Date(articles[1]?.createdAt).toLocaleDateString()
                                        : "Unknown Date"}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
