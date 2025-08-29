import React from 'react';

import SEO from '../utils/SEO';
import Footer from '../component/Footer';
import NewsLetter from '../component/Newsletter';
import MainTopKSAd from '../component/ads/MainTopKSAd';
import Hero from '../component/clients/homepage/Hero';
import MostPopular from '../component/MostPopularArticle';
import AdvertisementSection from '../component/AdvertisementSection';
import HomeLatestNews from '../component/HomeLatestNews';
import HomeProductsCategories from '../component/HomeProductsCategories';
import TrendsMatches from '../component/TrendsMatches';
import KinHeader from '../component/KinHeader';

const KinHomepage: React.FC = () => {
  return (
    <>
      <SEO
        mainData={{
          title:
            "Ahabanza: Kickside News - Isoko ya mbere y'imikino igezweho n'ibyamamare mu Rwanda. Ibishya mu Ikoranabuhanga byose ni hano wabisanga",
          description:
            "Kickside News ikinyamakuru cyambere cya Siporo usangaho amakuru agezweho y'imikino ndetse n'ubusesenguzi ku Byamamare ndetse n'Ikoranabuhanga. ",
          author: 'Kickside Rwanda',
          image: 'https://www.kickside.rw/logo.svg',
          publishedAt: '2023-12-01T10:00:00Z',
          type: 'website',
        }}
        canonicalUrl="https://www.kickside.rw/"
      />

      <MainTopKSAd />

      <div className="bg-primary pb-5">
        <KinHeader />
      </div>
      <div className="bg-primary pb-5">
        <Hero />
      </div>

      <div className="max-w-7xl px-4 mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="w-full lg:w-1/5 xl:w-2/10">
            <HomeLatestNews />
          </div>

          <div className="w-full lg:w-3/5 xl:w-6/10">
            <TrendsMatches />
            <HomeProductsCategories />
          </div>

          <div className="w-full lg:w-1/5 xl:w-2/10 ">
            <MostPopular />
            <div className="">
              <AdvertisementSection />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <NewsLetter />
      </div>

      <Footer />
    </>
  );
};

export default KinHomepage;
