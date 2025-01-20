import { useState } from "react";
import Avatar from "/avatar.svg";
import { Link } from "react-router-dom";

const StaffHeader = ({ onLogout, profile }: any) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    console.log(profile)

    return (
        <header className="flex items-center justify-between bg-gray-800 px-6 py-4 shadow-md text-white">
            <div className="text-2xl font-bold text-indigo-500">Kickside</div>

            <div className="flex-grow mx-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 text-sm rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="relative">
                <button
                    className="flex items-center gap-2 px-2 py-2 bg-gray-700 rounded-full hover:bg-gray-600"
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                >
                    <img
                        src={profile?.profile || Avatar}
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                    />
                </button>
                {isProfileOpen && (
                    <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg w-40">
                        <ul className="py-2">
                            <li>
                                <Link
                                    to={"settings"}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-200 transition cursor-pointer block bg-gray-100 rounded-md text-gray-800"
                                    onClick={() => setIsProfileOpen((prev) => !prev)}
                                >
                                    Settings
                                </Link>
                            </li>
                            <li>
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-200 transition bg-gray-100 rounded-md text-gray-800"
                                    onClick={onLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>

                )}
            </div>
        </header>
    );
};

export default StaffHeader;