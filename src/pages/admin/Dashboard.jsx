function Dashboard() {
  return (
    <section className="w-screen flex-1 bg-gray-100 flex items-center justify-center">
      <div className="text-center text-gray-500 flex flex-col gap-3">
        <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto animate-pulse" />

        <h2 className="text-lg font-semibold">Dashboard</h2>
        <p className="text-sm text-gray-400">
          Your analytics and activity will appear here soon.
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <div className="h-3 w-40 bg-gray-300 rounded animate-pulse" />
          <div className="h-3 w-32 bg-gray-300 rounded animate-pulse" />
          <div className="h-3 w-48 bg-gray-300 rounded animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
