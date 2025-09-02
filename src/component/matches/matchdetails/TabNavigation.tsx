const TabNavigation = ({ tabs, activeTab, setActiveTab }: any) => {
  return (
    <div className="flex border-b border-gray-200 mb-6">
      {tabs.map((tab: any) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-3 font-medium text-sm transition-colors duration-200 ${
            activeTab === tab.id
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
