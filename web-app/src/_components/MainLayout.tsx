import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex flex-col h-screen">
      {/* Sticky Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />
      </div>

      {/* Below Navbar */}
      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ease-in-out h-full ${
            sidebarOpen ? "lg:w-48" : "lg:w-16"
          }`}
        >
          <Sidebar isOpen={sidebarOpen} />
        </div>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-4 font-work">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
