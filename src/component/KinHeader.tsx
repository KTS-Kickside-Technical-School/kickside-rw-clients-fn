import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes, FaBars } from 'react-icons/fa';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import LanguageSwitcher from './clients/homepage/LanguageSwitcher';

const KinHeader = () => {
  const [search, setSearch] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const moreMenuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: 'Imikino', path: '/category/Imikino' },
    { label: 'Imyidagaduro', path: '/category/Imyidagaduro' },
    { label: 'Ikoranabuhanga', path: '/category/Ikoranabuhanga' },
    { label: 'Ubukungu', path: '/category/Ubukungu' },
    { label: 'Amarushanwa', path: '/en/match-center', external: true },
  ];

  useEffect(() => {
    setSearch('');
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target as Node)
      ) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/news/search/?query=${encodeURIComponent(search.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="font-extrabold text-2xl md:text-3xl tracking-wide hover:text-blue-400 transition-colors"
        >
          KICKSIDE
        </Link>

        <div className="hidden lg:flex gap-4 xl:gap-6">
          <div className="flex items-center gap-4 xl:gap-6 flex-wrap justify-end max-w-full">
            <div className="relative">
              <Link
                to="/en/match-center"
                className={`relative px-3 py-1 rounded-md transition ${
                  isActiveLink('/en/match-center')
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-gray-300 hover:bg-blue-500 hover:text-white'
                }`}
                title="Check out the new Match Center!"
              >
                Match Center
              </Link>

              <div className="absolute -top-4 right-1">
                <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-md animate-pulse">
                  NEW
                </span>
              </div>
            </div>
            {navItems.slice(0, 3).map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-3 py-1 rounded-md transition whitespace-nowrap ${
                    isActiveLink(item.path)
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-gray-300 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`px-3 py-1 rounded-md transition whitespace-nowrap ${
                    isActiveLink(item.path)
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-gray-300 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden md:flex items-center w-48 lg:w-64"
          >
            <FaSearch className="absolute left-3 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Shakisha..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full shadow-sm border border-gray-400 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Mobile Menu */}
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
                placeholder="Shakisha..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full shadow-sm border border-gray-400 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </form>

            <nav className="flex flex-col gap-4">
              {navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block px-3 py-2 rounded-md text-lg transition ${
                      isActiveLink(item.path)
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-gray-300 hover:bg-blue-500 hover:text-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-lg transition ${
                      isActiveLink(item.path)
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-gray-300 hover:bg-blue-500 hover:text-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default KinHeader;
