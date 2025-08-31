import { useEffect, useState } from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { getPopularArticles } from "../utils/requests/articlesRequest";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { iItemArticle } from "../utils/types/Article";

const KinMostPopular = () => {
  const [data, setData] = useState<iItemArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getPopularArticles();
      if (response?.data?.articles?.length) {
        const data = response.data.articles.filter(
          (article: any) => article.article.language === "kinyarwanda"
        );
        setData(data);
      } else {
        setHasError(true);
      }
    } catch (error) {
      setHasError(true);
      console.error("Error fetching popular articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (hasError || (!isLoading && data.length === 0)) return null;

  return (
    <div className="bg-[#14D163] p-4 mt-8 rounded shadow w-full">
      {" "}
      <div className="flex justify-between items-center mb-4 text-white">
        <div className="flex flex-col items-start">
          <h1 className="text-3xl font-bold">IZAREBWE</h1>
          <h1 className="text-3xl font-bold">CYANE</h1>
        </div>
        <BsGraphUpArrow className="text-5xl text-blue-700 w-10" />
      </div>
      {isLoading ? (
        <div className="space-y-3">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-4 bg-white/60 animate-pulse rounded w-full"
              ></div>
            ))}
        </div>
      ) : (
        <ul className="list-none space-y-2">
          {data.map((item: iItemArticle, i: number) => (
            <motion.li
              key={i}
              className="flex items-center border-b-2 border-white pb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="inline-block w-4 h-2 bg-white mr-2 mt-1"></span>
              <Link
                to={`/news/${item.article.slug}`}
                className="text-white hover:underline text-md line-clamp-3"
              >
                {item.article.title}
              </Link>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default KinMostPopular;
