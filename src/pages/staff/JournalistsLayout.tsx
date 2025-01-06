import { Outlet } from "react-router-dom";
import JournalistsSideBar from "../../Components/staff/StaffSideBar";
import JournalistHeader from "../../Components/staff/JournalistHeader";

const JournalistsLayout = ({ onLogout }: any) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <JournalistsSideBar onLogout={onLogout} />

            <div className="flex-grow flex flex-col">
                <JournalistHeader onLogout={onLogout} />

                <main className="flex-grow overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default JournalistsLayout;
