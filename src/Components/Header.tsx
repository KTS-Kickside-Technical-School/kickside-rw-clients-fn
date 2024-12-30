import { useState } from "react";
import { FaSearch, FaTimes, FaBars } from "react-icons/fa";

const Header = () => {
    const articles: any = []; // Replace with actual articles data
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const filterArticles = (title: any) => {
        setSearch(title);
        const filtered = articles.filter((article: any) =>
            article.title.toLowerCase().includes(title.toLowerCase())
        );
        setFilteredArticles(filtered);
    };

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="text-white py-4 bg-primary">
            <div className="text-center px-4">
                <a href="/" className="block mb-4">
                    <h1 className="font-bold text-2xl">KICKSIDE</h1>
                </a>

                <div className="bg-dark w-full md:w-[80%] m-auto p-3 rounded-full px-5">
                    {!isSearchOpen ? (
                        <div className="flex flex-row md:flex-row justify-between items-center gap-4">
                            <button
                                className="text-white lg:hidden p-2 rounded-full hover:bg-gray-600"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <FaBars />
                            </button>

                            {isMenuOpen && (
                                <div
                                    className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex justify-center items-center z-[100]"
                                    onClick={closeMenu}
                                >
                                    <div
                                        className="bg-dark p-6 rounded-lg shadow-lg w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%]"
                                        onClick={(e) => e.stopPropagation()} >
                                        <button
                                            className="text-white p-2 rounded-full hover:bg-gray-600 mb-4"
                                            onClick={closeMenu}
                                        >
                                            <FaTimes />
                                        </button>
                                        <nav>
                                            <ul className="flex flex-col gap-4">
                                                <li><a href="#" className="hover:underline">Tech</a></li>
                                                <li><a href="#" className="hover:underline">Sports</a></li>
                                                <li><a href="#" className="hover:underline">Showbizz</a></li>
                                                <li><a href="#" className="hover:underline">Podcasts</a></li>
                                                <li><a href="#" className="hover:underline">Newsletter</a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            )}

                            <nav className="hidden lg:flex flex-row justify-center gap-4">
                                <ul className="flex gap-4">
                                    <li><a href="#" className="hover:underline">Tech</a></li>
                                    <li><a href="#" className="hover:underline">Sports</a></li>
                                    <li><a href="#" className="hover:underline">Showbizz</a></li>
                                    <li><a href="#" className="hover:underline">Podcasts</a></li>
                                    <li><a href="#" className="hover:underline">Newsletter</a></li>
                                </ul>
                            </nav>

                            {/* Search Button */}
                            <button
                                className="text-white p-2 rounded-full hover:bg-gray-600"
                                onClick={() => setIsSearchOpen(true)}
                            >
                                <FaSearch />
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center">
                            <div className="flex items-center bg-white rounded-full overflow-hidden shadow-md w-full md:w-[80%]">
                                <input
                                    type="text"
                                    className="px-4 w-full text-black focus:outline-none"
                                    placeholder="Search articles or topics"
                                    value={search}
                                    onChange={(e) => filterArticles(e.target.value)}
                                />
                                <button
                                    className="text-black bg-gray-200 p-2 rounded-r-full hover:bg-gray-300"
                                    onClick={() => setIsSearchOpen(false)}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {isSearchOpen && search && (
                <div className="search-results bg-white text-black p-4 mt-4 rounded-md shadow-md">
                    <ul>
                        {filteredArticles.length > 0 ? (
                            filteredArticles.map((article: any) => (
                                <li key={article.id} className="py-2 border-b last:border-b-0">
                                    <a href={article.link} className="hover:underline">
                                        {article.title}
                                    </a>
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
