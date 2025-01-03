import { Outlet } from "react-router-dom";
import JournalistsSideBar from "../../Components/staff/StaffSideBar";
import JournalistHeader from "../../Components/staff/JournalistHeader";

const JournalistsLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <JournalistsSideBar />

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col">
                {/* Header */}
                <JournalistHeader />

                {/* Outlet Content with Scroll */}
                <main className="flex-grow overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default JournalistsLayout;
