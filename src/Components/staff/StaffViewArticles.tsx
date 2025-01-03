import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash, FiEye, FiPlus } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { ArticleType } from "../../utils/types/Article";
import { getOwnArticles } from "../../utils/requests/articlesRequest";
import { toast, ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import { formatDateTime } from "../../utils/helpers/articleHelpers";
import SEO from "../../utils/SEO";

const StaffViewArticles = () => {
    const [articles, setArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("date");
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const articlesPerPage = 15;

    const fetchOwnArticles = async () => {
        try {
            const response = await getOwnArticles();
            if (response.status !== 200) {
                setError(response.message);
                toast.error(response.message);
                setIsLoading(false);
                return;
            }
            setArticles(response.articles);
            setError("");
        } catch (error) {
            setError("Error fetching articles");
            toast.error("Error fetching articles");
            console.error("Error fetching articles:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOwnArticles();
    }, []);

    const filteredArticles = articles.filter((article: ArticleType) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedArticles = [...filteredArticles].sort((a: ArticleType, b: ArticleType) => {
        if (sortOption === "date") return b.createdAt.localeCompare(a.createdAt);
        if (sortOption === "status") return a.status.localeCompare(b.status);
        if (sortOption === "category") return a.category.localeCompare(b.category);
        return 0;
    });

    const pageCount = Math.ceil(sortedArticles.length / articlesPerPage);
    const offset = currentPage * articlesPerPage;
    const displayedArticles = sortedArticles.slice(offset, offset + articlesPerPage);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'published': return 'bg-green-100 text-green-800';
            case 'draft': return 'bg-gray-100 text-gray-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <ToastContainer />
            <SEO title="View Articles - Kickside RW" />
            <div className="max-w-8xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Articles list</h1>
                    <Link
                        to="/staff/article/new"
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition shadow-sm"
                    >
                        <FiPlus className="mr-2" />
                        New Article
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                        <div className="flex-1">
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
                                />
                            </div>
                        </div>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="py-2.5 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
                        >
                            <option value="date">Sort by Date</option>
                            <option value="status">Sort by Status</option>
                            <option value="category">Sort by Category</option>
                        </select>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
                        </div>
                    ) : displayedArticles.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {displayedArticles.map((article: ArticleType, index) => (
                                        <tr key={article._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {offset + index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <img
                                                    src={article.coverImage}
                                                    alt={article.title}
                                                    className="w-24 object-cover rounded-lg shadow-sm"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{article.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{article.category}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(article.status)}`}>
                                                    {article.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDateTime(article.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex items-center gap-3">
                                                    <Link
                                                        to={`/staff/journalist/article/${article._id}`}
                                                        className="text-blue-600 hover:text-blue-900"
                                                        title="View"
                                                    >
                                                        <FiEye className="w-5 h-5" />
                                                    </Link>
                                                    <Link
                                                        to={`/staff/journalist/article/${article._id}/edit`}
                                                        className="text-green-600 hover:text-green-900"
                                                        title="Edit"
                                                    >
                                                        <FiEdit className="w-5 h-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => console.log("Delete", article._id)}
                                                        className="text-red-600 hover:text-red-900"
                                                        title="Delete"
                                                    >
                                                        <FiTrash className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="mt-6">
                                <ReactPaginate
                                    previousLabel="← Previous"
                                    nextLabel="Next →"
                                    pageCount={pageCount}
                                    onPageChange={(event) => setCurrentPage(event.selected)}
                                    containerClassName="flex justify-center items-center gap-2"
                                    pageClassName="px-3 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                                    activeClassName="bg-indigo-50 text-indigo-600 font-medium"
                                    previousClassName="px-3 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                                    nextClassName="px-3 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                                    disabledClassName="opacity-50 cursor-not-allowed"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No articles found.</p>
                            <Link
                                to="/staff/article/new"
                                className="inline-flex items-center px-4 py-2 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                            >
                                <FiPlus className="mr-2" />
                                Create your first article
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StaffViewArticles;