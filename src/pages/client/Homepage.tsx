import AdvertsmentSection from '../../Components/client/AdvertsmentSection'
import ClientsHeader from '../../Components/client/ClientsHeader'
import Hero from '../../Components/client/Hero'

const Homepage = () => {
    return (
        <div className="container">
            <div className="homepage">
                <ClientsHeader />
                <Hero />
                <div className="ad-cont">
                    <AdvertsmentSection />
                </div>
            </div>
        </div>
    )
}

export default Homepage
