import { useState, useEffect } from 'react';
import { FaSearch, FaTimes, FaBars } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [search, setSearch] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    setSearch('');
  }, [location]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="text-white py-4 bg-primary w-full sticky top-0 z-40">
      <div className="w-full px-4 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-blue-600 p-4 rounded-lg shadow-md">
          <a href="/" className="flex-shrink-0">
            <h1 className="font-extrabold text-2xl md:text-3xl text-white tracking-wide hover:text-blue-200 transition-colors">
              KICKSIDE
            </h1>
          </a>

          <form
            action="/news/search/"
            method="GET"
            className="flex w-full md:w-2/3 lg:w-1/2 bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <input
              type="text"
              name="query"
              className="flex-1 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Search articles or topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus={windowWidth > 768}
            />
            <button
              className="flex-shrink-0 bg-gray-200 p-2 hover:bg-gray-300 transition-colors"
              type="submit"
              aria-label="Search articles"
            >
              <FaSearch size={18} className="text-gray-700" />
            </button>
          </form>
        </div>

        <div className="bg-dark w-full p-3 rounded-lg px-4 md:px-5">
          <div className="flex justify-between items-center gap-4">
            <button
              className="text-white lg:hidden p-2 rounded-full hover:bg-gray-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <FaBars size={18} />
            </button>

            <nav className="hidden lg:flex gap-4 xl:gap-6">
              <a
                href="/category/Business"
                className="hover:underline px-2 py-1"
              >
                Business
              </a>
              <a
                href="/category/Technology"
                className="hover:underline px-2 py-1"
              >
                Technology
              </a>
              <a href="/category/Sports" className="hover:underline px-2 py-1">
                Sports
              </a>
              <a
                href="/category/Entertainment"
                className="hover:underline px-2 py-1"
              >
                Entertainment
              </a>
            </nav>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
          onClick={closeMenu}
        >
          <div
            className="bg-dark p-6 w-full max-w-xs h-full animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                className="text-white p-2 rounded-full hover:bg-gray-600 transition-colors"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <nav>
              <ul className="flex flex-col gap-4">
                <li>
                  <a
                    href="/category/Business"
                    className="hover:underline block py-3 text-lg"
                    onClick={closeMenu}
                  >
                    Business
                  </a>
                </li>
                <li>
                  <a
                    href="/category/Technology"
                    className="hover:underline block py-3 text-lg"
                    onClick={closeMenu}
                  >
                    Technology
                  </a>
                </li>
                <li>
                  <a
                    href="/category/Sports"
                    className="hover:underline block py-3 text-lg"
                    onClick={closeMenu}
                  >
                    Sports
                  </a>
                </li>
                <li>
                  <a
                    href="/category/Entertainment"
                    className="hover:underline block py-3 text-lg"
                    onClick={closeMenu}
                  >
                    Entertainment
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
