import { useState } from "react";
import { MdDashboard, MdLogout, MdMenu } from "react-icons/md";
import { PiArticleNyTimesBold } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const StaffSideBar = ({ onLogout, profile }: any) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex h-screen">
            <ToastContainer />
            <aside
                className={`bg-gray-800 text-white shadow-lg flex-shrink-0 ${isOpen ? "w-64" : "w-20"
                    } transition-all duration-300`}
            >
                <div className="flex items-center justify-between py-4 px-4">
                    <h1
                        className={`text-lg font-bold ${isOpen ? "block" : "hidden"
                            } transition-all duration-300`}
                    >
                        Staff Panel
                    </h1>
                    <button
                        onClick={toggleSidebar}
                        className="text-white hover:bg-gray-700 p-2 rounded-full"
                    >
                        <MdMenu size={24} />
                    </button>
                </div>

                <ul className="space-y-4 mt-6">
                    <li>
                        <Link
                            to="/staff/dashboard"
                            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-700 transition"
                        >
                            <MdDashboard size={20} />
                            <span
                                className={`${isOpen ? "block" : "hidden"
                                    } transition-all duration-300`}
                            >
                                Dashboard
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/staff/articles"
                            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-700 transition"
                        >
                            <PiArticleNyTimesBold size={20} />
                            <span
                                className={`${isOpen ? "block" : "hidden"
                                    } transition-all duration-300`}
                            >
                                Articles
                            </span>
                        </Link>
                    </li>
                    {(profile?.role === "Admin") && (
                        <li>
                            <Link
                                to="/staff/users"
                                className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-700 transition"
                            >
                                <RxAvatar size={20} />
                                <span
                                    className={`${isOpen ? "block" : "hidden"
                                        } transition-all duration-300`}
                                >
                                    Users
                                </span>
                            </Link>
                        </li>
                    )}
                </ul>

                <div className="absolute bottom-6 w-full px-4">
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-red-600 transition text-left"
                    >
                        <MdLogout size={20} />
                        <span
                            className={`${isOpen ? "block" : "hidden"
                                } transition-all duration-300`}
                        >
                            Logout
                        </span>
                    </button>
                </div>
            </aside>
        </div>
    );
};

export default StaffSideBar;
