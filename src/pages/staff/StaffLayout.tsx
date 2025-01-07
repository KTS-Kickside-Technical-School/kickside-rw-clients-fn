import { Outlet } from "react-router-dom";
import StaffSideBar from "../../Components/staff/StaffSideBar";
import StaffHeader from "../../Components/staff/StaffHeader";

const StaffLayout = ({ onLogout, profile }: any) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <StaffSideBar onLogout={onLogout} />
            <div className="flex-grow flex flex-col">
                <StaffHeader onLogout={onLogout} profile={profile} />
                <main className="flex-grow overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default StaffLayout;
