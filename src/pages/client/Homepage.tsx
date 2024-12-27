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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white text-2xl">
            <div className="homepage border-4 border-dashed border-yellow-300 p-4 rounded-lg shadow-lg">
                <div className="bg-primary">
                    Hello dear
                </div>
                <ClientsHeader articles={articles} />
                <Hero articles={articles} />
                <div className="ad-cont mt-6 bg-gray-800 p-6 rounded-md">
                    <AdvertsmentSection />
                </div>
            </div>
        </div>
    );

}

export default Homepage
