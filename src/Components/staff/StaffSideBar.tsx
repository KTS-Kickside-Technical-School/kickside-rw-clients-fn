import { useState } from 'react';
import { BiSupport, BiUser } from 'react-icons/bi';
import { BsMailbox } from 'react-icons/bs';
import { MdDashboard, MdLogout, MdMenu } from 'react-icons/md';
import { PiArticleNyTimesBold } from 'react-icons/pi';

import { Link, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const menuItems = [
  {
    to: '/staff/dashboard',
    label: 'Dashboard',
    icon: <MdDashboard size={20} />,
  },
  {
    to: '/staff/articles',
    label: 'Articles',
    icon: <PiArticleNyTimesBold size={20} />,
  },
];

const adminItems = [
  { to: '/staff/users', label: 'Users', icon: <BiUser size={20} /> },
  {
    to: '/staff/mailing-list',
    label: 'Mailing List',
    icon: <BsMailbox size={20} />,
  },
  {
    to: '/staff/inquiries',
    label: 'Customer Inquiries',
    icon: <BiSupport size={20} />,
  },
];

const journalistItems = [
  {
    to: '/staff/my-articles',
    label: 'My Articles',
    icon: <PiArticleNyTimesBold size={20} />,
  },
];

const editorItems = [
  {
    to: '/staff/my-articles',
    label: 'My Articles',
    icon: <PiArticleNyTimesBold size={20} />,
  },
];

const StaffSideBar = ({ onLogout, profile }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  const { pathname } = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const renderMenuItem = ({ to, label, icon }: any) => {
    const isActive = pathname === to;
    return (
      <li key={to}>
        <Link
          to={to}
          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${
            isActive
              ? 'bg-primary text-white font-semibold'
              : 'hover:bg-gray-700 text-gray-300'
          }`}
        >
          {icon}
          {isOpen && <span>{label}</span>}
        </Link>
      </li>
    );
  };

  const renderSection = (title: string, items: any[]) => {
    return (
      <>
        <div
          className={`text-xs uppercase tracking-wide mt-6 mb-2 px-4 ${
            isOpen ? 'text-gray-400' : 'hidden'
          }`}
        >
          {title}
        </div>
        <ul className="space-y-2 px-2">{items.map(renderMenuItem)}</ul>
      </>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ToastContainer />
      <aside
        className={`relative bg-gray-900 text-white shadow-lg ${
          isOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 flex flex-col`}
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-800">
          {isOpen && (
            <h1 className="text-xl font-bold text-white">Kickside Staff</h1>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition"
            title="Toggle Menu"
          >
            <MdMenu size={22} />
          </button>
        </div>

        <ul className="space-y-2 mt-6 px-2">{menuItems.map(renderMenuItem)}</ul>

        {profile?.role === 'Journalist' &&
          renderSection('Journalist Panel', journalistItems)}

        {profile?.role === 'Editor' &&
          renderSection('Editor Panel', editorItems)}

        {profile?.role === 'Admin' && renderSection('Admin Panel', adminItems)}

        <div className="mt-auto px-2 py-4 border-t border-gray-800">
          <button
            onClick={onLogout}
            className="flex items-center gap-4 px-4 py-3 w-full text-left text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition"
          >
            <MdLogout size={20} />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default StaffSideBar;
