import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MainTopKSAd from '../ads/MainTopKSAd';
import SeasonsList from './SeasonsList';
import Footer from '../Footer';
import Header from '../Header';
import { FaBars, FaTimes, FaTrophy } from 'react-icons/fa';

const MatchCenterLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <MainTopKSAd />
      <Header />

      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-400 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-label="Open menu"
              >
                <FaBars className="h-5 w-5" />
              </button>

              <div className="ml-4 flex items-center">
                <FaTrophy className="h-5 w-5 text-yellow-500" />
                <span className="ml-2 text-sm font-medium text-gray-900">
                  Match Center
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeMobileMenu}
          />

          <div className="fixed inset-y-0 left-0 w-80 max-w-full bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-400">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <FaTrophy className="text-yellow-500 mr-2" />
                Tournaments
              </h2>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                aria-label="Close menu"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>

            <div className="h-full overflow-y-auto">
              {/* Pass the closeMobileMenu function to SeasonsList */}
              <SeasonsList onTournamentSelect={closeMobileMenu} />
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto p-4 px-6 min-h-screen">
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          <div className="hidden lg:block">
            <SeasonsList />
          </div>

          <section className="w-full">
            <Outlet />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default MatchCenterLayout;
