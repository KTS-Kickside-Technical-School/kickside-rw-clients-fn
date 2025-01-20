import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import ArticleEditRequests from "../../pages/staff/ArticleEditRequests";
import ArticlesListSubHeader from "./ArticlesListSubHeader";
import SEO from "../../utils/SEO";

const StaffViewArticlesEditRequests = ({ profile }: any) => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <ToastContainer />
            <SEO title="Articles Edit Requests - Kickside RW" />
            <div className="max-w-8xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Article Edit Requests</h1>
                    <Link
                        to="/staff/article/new"
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition shadow-sm"
                    >
                        <FiPlus className="mr-2" />
                        New Article
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                    <ArticlesListSubHeader profile={profile} />

                    <ArticleEditRequests />
                </div>
            </div>
        </div>
    );
};

export default StaffViewArticlesEditRequests;
