const Topbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-800 shadow-md sticky top-0 z-10">
      <input
        type="text"
        placeholder="Search..."
        className="bg-gray-700 text-white px-4 py-2 rounded-md outline-none w-1/3"
      />
      <div className="flex items-center gap-4">
        <button className="relative">
          <span className="absolute top-0 right-0 h-2 w-2 bg-green-400 rounded-full animate-ping"></span>
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="w-10 h-10 rounded-full border border-white"
          />
        </button>
      </div>
    </div>
  );
};

export default Topbar;

