import { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import articleImage from "../../assets/images/GettyImages-2084803237.webp";
import AdvertsmentSection from "./AdvertsmentSection";
import { toast, ToastContainer } from "react-toastify";
import { getAllArticles } from "../../utils/requests/apiRequests";
import { formatDate } from "../../utils/helpers/reusableFunctions";

const Hero = () => {
    const [articles, setArticles]: any = useState([]);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!hasFetched.current) {
            fetchAllArticles();
            hasFetched.current = true;
        }
    }, []);

    const fetchAllArticles = async () => {
        try {
            const response = await getAllArticles();
            setArticles(response.articles);
            toast.success("Articles fetched successfully");
        } catch (error: any) {
            console.error("Error fetching articles:", error);
            toast.error("Unkown error occured");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="hero">
                <div className="top">
                    <div className="left">
                        <div className="cont">
                            <img src={articleImage} alt="Main article" />
                            <div className="texts">
                                <div className="type">
                                    <span> {articles[0]?.category || ""}</span>
                                </div>
                                <h3>
                                    <a href="">
                                        {articles[0]?.title || ""}
                                    </a>
                                </h3>
                                <div className="author">
                                    <a href="">
                                        {articles[0]?.author.firstName || ""}  {articles[0]?.author.lastName || ""} - {formatDate(articles[0]?.createdAt)}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        {articles.slice(1, 3).map((article: any, index: number) => (
                            <div className="cont second" key={index}>
                                <img src={article.image} alt="Secondary article" />
                                <div className="texts">
                                    <div className="type">
                                        <span>{article.category || ""}</span>
                                    </div>
                                    <h3>
                                        <a href="">
                                            {article.title || ""}
                                        </a>
                                    </h3>
                                    <div className="author">
                                        <a href="">
                                            {article.author.firstName || ""} {article.author.lastName || ""} - {formatDate(article.createdAt)}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                <div className="headlines">
                    <div className="head">
                        <h2>Top headlines</h2>
                        <ul>
                            {articles.slice(3, 8).map((article: any, index: number) => (
                                <li key={index}>
                                    <a href="">
                                        {article?.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <AdvertsmentSection />
                </div>
            </div>
        </>
    );
};

export default Hero;
