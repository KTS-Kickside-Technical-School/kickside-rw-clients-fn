import { useState, useEffect } from 'react';
import { FaSearch, FaTimes, FaBars } from 'react-icons/fa';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import LanguageSwitcher from './clients/homepage/LanguageSwitcher';

const Header = () => {
  const [search, setSearch] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setSearch('');
  }, [location]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/en/news/search/?query=${encodeURIComponent(search.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link
          to="/en"
          className="font-extrabold text-2xl md:text-3xl tracking-wide hover:text-blue-400 transition-colors"
        >
          KICKSIDE
        </Link>

        <nav className="hidden lg:flex gap-4 xl:gap-6">
          {['Business', 'Technology', 'Sports', 'Entertainment'].map((cat) => (
            <Link
              key={cat}
              to={`/en/category/${cat}`}
              className={`px-3 py-1 rounded-md transition ${
                isActiveLink(`/category/${cat}`)
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-gray-300 hover:bg-blue-500 hover:text-white'
              }`}
            >
              {cat}
            </Link>
          ))}
          <Link
            to="/en/match-center"
           className={`px-3 py-1 rounded-md transition ${
              isActiveLink('/match-center')
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-gray-300 hover:bg-blue-500 hover:text-white'
            }`}
          >
            Match Center
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden md:flex items-center w-48 lg:w-64"
          >
            <FaSearch className="absolute left-3 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full shadow-sm border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>

          <LanguageSwitcher />

          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-700 transition"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <FaBars size={20} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex flex-col animate-fadeIn">
          <div className="bg-gray-900 flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Menu</h2>
              <button
                className="p-2 rounded-md hover:bg-gray-700 transition"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <FaTimes size={22} />
              </button>
            </div>

            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center w-full mb-6"
            >
              <FaSearch className="absolute left-3 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full shadow-sm border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </form>

            <nav className="flex flex-col gap-4">
              {['Business', 'Technology', 'Sports', 'Entertainment'].map(
                (cat) => (
                  <Link
                    key={cat}
                    to={`/en/category/${cat}`}
                    className={`block px-3 py-2 rounded-md text-lg transition ${
                      isActiveLink(`/en/category/${cat}`)
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-gray-300 hover:bg-blue-500 hover:text-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {cat}
                  </Link>
                )
              )}
              <Link
                to="/en/match-center"
                className={`block px-3 py-2 rounded-md text-lg transition ${
                  isActiveLink('/match-center')
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-gray-300 hover:bg-blue-500 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Match Center
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
