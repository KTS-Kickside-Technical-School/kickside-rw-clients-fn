import React from 'react';
import NewsSection from '../Components/NewSection';
import HeroSection from '../Components/HeroSection';
import Header from '../Components/Header';
import LatestNews from '../Components/LatestByCategory';
import Footer from '../Components/Footer';


const CategoryPage: React.FC = () => {
  
  return (
    <>
    <Header/>
    <div className="w-full md:w-[80%] m-auto  text-white">
      
      <div className="container mx-auto px-4">
        <HeroSection/>
        <NewsSection title={''} category={''} />
        <LatestNews/>
        <Footer/>
      
      </div>
    </div>
    </>
  );
};

export default CategoryPage;