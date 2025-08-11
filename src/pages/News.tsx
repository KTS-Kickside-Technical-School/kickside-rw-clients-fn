import AdstrerraPortraitBanner from '../component/ads/adstrerra/AdstrerraPortraitBanner';
import AdvertisementSection from '../component/AdvertisementSection';
import Footer from '../component/Footer';
import Header from '../component/Header';
import HomeLatestNews from '../component/HomeLatestNews';
import HomeProductsCategories from '../component/HomeProductsCategories';
import MostPopular from '../component/MostPopularArticle';
import SEO from '../utils/SEO';

const News = () => {
  return (
    <>
      <SEO
        mainData={{
          title: 'Kickside Rw News – Rwanda’s Top Tech, Sports & Showbiz News',
          description:
            'Kickside is Rwanda’s leading digital newspaper covering tech, sports, entertainment, and business. Get all trending news from Rwanda and East Africa in one place.',
          author: 'Kickside Rwanda',
          image: 'https://www.kickside.rw/logo.svg',
          publishedAt: '2023-12-01T10:00:00Z',
          type: 'website',
        }}
        canonicalUrl="https://www.kickside.rw/"
      />
      <div className="bg-primary pb-5">
        <Header />
      </div>
      <div>
        <div className="max-w-7xl px-4 mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-6 w-full">
            <div className="w-full lg:w-1/5 xl:w-2/10">
              <HomeLatestNews />
            </div>

            <div className="w-full lg:w-3/5 xl:w-6/10">
              <HomeProductsCategories />
            </div>

            <div className="w-full lg:w-1/5 xl:w-2/10">
              <MostPopular />
              <AdstrerraPortraitBanner />
              <AdvertisementSection />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default News;
