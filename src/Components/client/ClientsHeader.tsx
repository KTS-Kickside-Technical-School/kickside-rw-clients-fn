import { useState } from "react"
import { FaSearch, FaTimes } from "react-icons/fa"
const ClientsHeader = () => {
    const [isSearchOpen, setIsSearhcOpen] = useState(false)
    return (
        <header>
            <div className="logo">
                <a href="">
                    <h1>
                        KICKSIDE
                    </h1>
                </a>
                
                {!isSearchOpen ? (<div className="nav-links">
                    <div className="links">
                        <ul>
                            <li>
                                <a href="">Tech</a>
                            </li>
                            <li>
                                <a href="">Sports</a>
                            </li>
                            <li>
                                <a href="">Showbizz</a>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <a href="">Podcasts</a>
                            </li>
                            <li>
                                <a href="">Newsletter</a>
                            </li>
                        </ul>
                    </div>
                    <div className="buttons">
                        <button className="search" onClick={() => setIsSearhcOpen(true)}>
                            <FaSearch />
                        </button>
                    </div>
                </div>) : (
                    <div className="nav-links">
                        <div className="search-container">
                            <input type="text" placeholder="Search articles or topics" />
                            <button onClick={() => setIsSearhcOpen(false)}>
                                <FaTimes />
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </header>
    )
}

export default ClientsHeader
