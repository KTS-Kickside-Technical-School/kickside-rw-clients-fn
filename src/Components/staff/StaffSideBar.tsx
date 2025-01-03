import { MdDashboard } from "react-icons/md";
import { PiArticleNyTimesBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const StaffSideBar = () => {
    return (
        <aside className="h-screen bg-gray-800 text-white flex-shrink-0 w-64 py-6 px-4 shadow-lg">
            <h1 className="text-lg font-bold mb-6">Journalist Panel</h1>

            <ul className="space-y-4">
                <li>
                    <Link
                        to="/staff/dashboard"
                        className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-700 transition"
                    >
                        <MdDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/staff/articles"
                        className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-700 transition"
                    >
                        <PiArticleNyTimesBold size={20} />
                        <span>Articles</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default StaffSideBar;
