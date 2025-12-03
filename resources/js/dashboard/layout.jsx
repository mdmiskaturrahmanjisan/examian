import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg z-50
          transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Topbar → add toggle button inside Topbar */}
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
