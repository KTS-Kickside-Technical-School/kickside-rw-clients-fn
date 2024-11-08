import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const ClientsHeader = ({ articles }: any) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredArticles, setFilteredArticles] = useState([])

    const filterArticles = async (title: string) => {
        setSearch(title)

        setFilteredArticles(articles.filter((article: any) =>
            article.title.toLowerCase().includes(search.toLowerCase())
        ))
    }

    return (
        <header>
            <div className="logo">
                <a href="">
                    <h1>KICKSIDE</h1>
                </a>

                {/* Toggle search input */}
                {!isSearchOpen ? (
                    <div className="nav-links">
                        <div className="links">
                            <ul>
                                <li><a href="">Tech</a></li>
                                <li><a href="">Sports</a></li>
                                <li><a href="">Showbizz</a></li>
                            </ul>
                            <ul>
                                <li><a href="">Podcasts</a></li>
                                <li><a href="">Newsletter</a></li>
                            </ul>
                        </div>
                        <div className="buttons">
                            <button className="search" onClick={() => setIsSearchOpen(true)}>
                                <FaSearch />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="nav-links">
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search articles or topics"
                                value={search}
                                onChange={(e) => filterArticles(e.target.value)}
                            />
                            <button onClick={() => setIsSearchOpen(false)}>
                                <FaTimes />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {isSearchOpen && search && (
                <div className="search-results">
                    <ul>
                        {filteredArticles.length > 0 ? (
                            filteredArticles.map((article: any) => (
                                <li key={article.id}>
                                    <a href={article.link}>
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

export default ClientsHeader;
