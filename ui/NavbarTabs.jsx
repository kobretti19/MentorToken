// eslint-disable-next-line react/prop-types
const NavbarTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["All", "Done", "Rejected", "In Progress"];

  return (
    <nav className="flex flex-row justify-start gap-6 w-max border-b-2 border-[#D3D3FF] mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`relative pb-2  hover:text-[#696cff] transition-all duration-300 ${
            activeTab === tab ? "text-[#696cff]" : ""
          }`}
        >
          {tab}
          {activeTab === tab && (
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#696cff] rounded transition-all duration-300"></span>
          )}
        </button>
      ))}
    </nav>
  );
};

export default NavbarTabs;
