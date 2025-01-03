const JournalistHeader = () => {
    return (
        <header className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 shadow-md text-white">
            {/* Logo */}
            <div className="text-lg font-bold">Kickside</div>

            {/* Search Bar */}
            <div className="flex-grow mx-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Profile Button */}
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-lg shadow hover:bg-gray-100">
                <img
                    src="/profile-placeholder.png" // Replace with actual profile image path
                    alt="Profile"
                    className="w-6 h-6 rounded-full"
                />
                <span>Profile</span>
            </button>
        </header>
    );
};

export default JournalistHeader;
