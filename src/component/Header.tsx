import { useState, useEffect } from 'react';
import { FaSearch, FaTimes, FaBars } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { getPublishedArticles } from '../utils/requests/articlesRequest';
import { iArticleType } from '../utils/types/Article';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [allArticles, setAllArticles] = useState<iArticleType[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<iArticleType[]>([]);
  const [hasFetched, setHasFetched] = useState(false);
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
    setIsSearchOpen(false);
    setSearch('');
    setFilteredArticles([]);
  }, [location]);

  const fetchArticles = async () => {
    try {
      const response = await getPublishedArticles();
      if (response.status === 200) {
        setAllArticles(response.articles);
        setHasFetched(true);
        filterArticles(search, response.articles);
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    }
  };

  const filterArticles = (value: string, sourceData?: iArticleType[]) => {
    setSearch(value);
    const source = sourceData || allArticles;

    const keywords = value
      .toLowerCase()
      .split(' ')
      .filter((word) => word.trim() !== '');

    const filtered = source.filter((article) => {
      const title = article.title?.toLowerCase() || '';
      const content = article.content?.toLowerCase() || '';

      return keywords.some(
        (keyword) => title.includes(keyword) || content.includes(keyword)
      );
    });

    setFilteredArticles(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!hasFetched) {
      setSearch(value);
      fetchArticles();
    } else {
      filterArticles(value);
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="text-white py-4 bg-primary w-full sticky top-0 z-40">
      <div className="w-full px-4 mx-auto max-w-7xl">
        <div className="text-center mb-4">
          <Link to="/" className="mx-auto block">
            <h1 className="font-bold text-2xl md:text-3xl text-white">
              KICKSIDE
            </h1>
          </Link>
        </div>

        <div className="bg-dark w-full p-3 rounded-lg px-4 md:px-5">
          {!isSearchOpen ? (
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
                <a
                  href="/category/Sports"
                  className="hover:underline px-2 py-1"
                >
                  Sports
                </a>
                <a
                  href="/category/Entertainment"
                  className="hover:underline px-2 py-1"
                >
                  Entertainment
                </a>
              </nav>

              <button
                className="text-white p-2 rounded-full hover:bg-gray-600 transition-colors"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open search"
              >
                <FaSearch size={18} />
              </button>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <div className="flex items-center bg-white rounded overflow-hidden shadow-md w-full max-w-2xl">
                <input
                  type="text"
                  className="px-4 py-2 w-full text-black focus:outline-none"
                  placeholder="Search articles or topics..."
                  value={search}
                  onChange={handleSearchChange}
                  autoFocus={windowWidth > 768}
                />
                <button
                  className="text-black bg-gray-200 p-2 hover:bg-gray-300 transition-colors"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearch('');
                    setFilteredArticles([]);
                  }}
                  aria-label="Close search"
                >
                  <FaTimes size={18} />
                </button>
              </div>
            </div>
          )}
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

      {isSearchOpen && search && (
        <div className="w-full px-4 mx-auto max-w-7xl">
          <div className="bg-white text-black p-4 my-2 rounded-md shadow-md max-h-96 overflow-y-auto">
            {filteredArticles.length > 0 ? (
              <ul className="divide-y">
                {filteredArticles.map((article: iArticleType) => (
                  <li key={article?._id} className="py-3">
                    <Link
                      to={`/news/${article.slug}`}
                      className="hover:underline block"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearch('');
                      }}
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">
                No articles found. Try different keywords.
              </p>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
