const Sidebar = () => {
  return (
    <div className="w-60 h-screen bg-[#111827] text-white p-6 flex flex-col gap-6 fixed left-0 top-0">
      <h2 className="text-xl font-bold text-green-400">💰 FinDash</h2>
      <nav className="flex flex-col gap-4 text-sm">
        <a href="#" className="hover:text-green-400">🏠 Dashboard</a>
        <a href="#" className="hover:text-green-400">📊 Analytics</a>
        <a href="#" className="hover:text-green-400">📁 Reports</a>
        <a href="#" className="hover:text-green-400">⚙️ Settings</a>
      </nav>
    </div>
  );
};

export default Sidebar;
