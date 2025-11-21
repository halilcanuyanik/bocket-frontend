function AdminNavbar() {
  const badge = 23;

  return (
    <div className="w-screen flex justify-between px-6 items-center shadow-md h-16">
      <div className="flex gap-4">
        <button data-badge={badge} className="dashboard-navbar-button">
          Event Requests
        </button>
        <button data-badge={badge} className="dashboard-navbar-button">
          Edit Venues
        </button>
      </div>
      <div className="flex items-center">
        <button className="bg-black text-white font-semibold hover:bg-black/80 cursor-pointer px-6 py-1.5 rounded-md">
          Edit
        </button>
      </div>
    </div>
  );
}

export default AdminNavbar;
