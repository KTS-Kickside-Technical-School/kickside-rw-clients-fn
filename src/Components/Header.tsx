import { useState } from 'react';
import { FaSearch, FaTimes, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getPublishedArticles } from '../utils/requests/articlesRequest';
import { debounce } from 'lodash';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cachedArticles, setCachedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const findArticles = async (searchText: string) => {
    const lowerSearch = searchText.toLowerCase().trim();
    if (!lowerSearch) {
      setFilteredArticles([]);
      return;
    }

    setLoading(true);
    try {
      let allArticles = cachedArticles;

      if (cachedArticles.length === 0) {
        const res = await getPublishedArticles();
        allArticles = res.articles || [];
        setCachedArticles(allArticles);
      }

      const queryWords = lowerSearch.split(/\s+/);

      const matches = allArticles.filter((article) => {
        const text =
          `${article.title} ${article.content} ${article.category} ${article.slug}`.toLowerCase();
        return queryWords.some((word) => text.includes(word));
      });

      setFilteredArticles(matches);
    } catch (err) {
      console.error('Search error:', err);
      setFilteredArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce((value: string) => {
    setSearch(value);
    findArticles(value);
  }, 400);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-primary text-white py-4 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/" className="block mb-4 text-center">
          <h1 className="text-2xl font-bold">KICKSIDE</h1>
        </Link>

        <div className="bg-dark w-full p-4 rounded-2xl px-6">
          {!isSearchOpen ? (
            <div className="flex justify-between items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                className="text-white lg:hidden p-2 rounded-full hover:bg-gray-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <FaBars />
              </button>

              {/* Desktop Menu */}
              <nav className="hidden lg:flex gap-6">
                <Link to="/category/Business" className="hover:underline">
                  Business
                </Link>
                <Link to="/category/Technology" className="hover:underline">
                  Technology
                </Link>
                <Link to="/category/Sports" className="hover:underline">
                  Sports
                </Link>
                <Link to="/category/Entertainment" className="hover:underline">
                  Entertainment
                </Link>
              </nav>

              {/* Search Icon */}
              <button
                className="text-white p-2 rounded-full hover:bg-gray-600"
                onClick={() => setIsSearchOpen(true)}
              >
                <FaSearch />
              </button>
            </div>
          ) : (
            // Search Input
            <div className="flex justify-center items-center">
              <div className="flex items-center bg-white rounded-full overflow-hidden shadow-md w-full max-w-7xl mx-auto">
                <input
                  type="text"
                  className="px-4 py-2 w-full text-black focus:outline-none"
                  placeholder="Search articles or topics"
                  value={search}
                  onChange={handleSearchInput}
                />
                <button
                  className="text-black bg-gray-200 p-2 rounded-r-full hover:bg-gray-300"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearch('');
                    setFilteredArticles([]);
                  }}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
          onClick={closeMenu}
        >
          <div
            className="bg-dark p-6 rounded shadow-lg w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="text-white p-2 rounded-full hover:bg-gray-600 mb-4"
              onClick={closeMenu}
            >
              <FaTimes />
            </button>
            <nav>
              <ul className="flex flex-col gap-4 text-white">
                <li>
                  <Link to="/category/Business" className="hover:underline">
                    Business
                  </Link>
                </li>
                <li>
                  <Link to="/category/Technology" className="hover:underline">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link to="/category/Sports" className="hover:underline">
                    Sports
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/Entertainment"
                    className="hover:underline"
                  >
                    Entertainment
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {isSearchOpen && search && (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 bg-white text-black p-4 mt-4 shadow-md">
          <ul>
            {loading ? (
              <li>Loading...</li>
            ) : filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <li key={article._id} className="py-2 border-b last:border-b-0">
                  <Link
                    to={`/article/${article.slug}`}
                    className="hover:underline"
                  >
                    {article.title}
                  </Link>
                </li>
              ))
            ) : (
              <li>No articles found.</li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
