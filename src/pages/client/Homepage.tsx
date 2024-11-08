import { useEffect, useState } from 'react';
import AdvertsmentSection from '../../Components/client/AdvertsmentSection'
import ClientsHeader from '../../Components/client/ClientsHeader'
import Hero from '../../Components/client/Hero'
import { getAllArticles } from '../../utils/requests/apiRequests';

const Homepage = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchAllArticles();
    }, []);

    const fetchAllArticles = async () => {
        try {
            const response = await getAllArticles();
            setArticles(response.articles);
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    };

    return (
        <div className="container">
            <div className="homepage">
                <ClientsHeader articles={articles} />
                <Hero articles={articles} />
                <div className="ad-cont">
                    <AdvertsmentSection />
                </div>
            </div>
        </div>
    )
}

export default Homepage
