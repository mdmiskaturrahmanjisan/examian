import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Topbar({ onMenuClick }) {
  const { pathname } = useLocation();

  const parts = pathname.split("/").filter(Boolean);
  const title =
    parts[parts.length - 1]
      ?.replace(/_/g, " ")
      ?.replace(/\b\w/g, (c) => c.toUpperCase()) || "Dashboard";

  return (
    <header className="bg-white shadow-sm border-b px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left section: Mobile Menu + Breadcrumb */}
        <div className="flex items-center space-x-4">
          {/* Mobile Toggle Button */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded bg-gray-100 hover:bg-gray-200"
          >
            <Menu size={22} />
          </button>

          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 hidden sm:block">
            <ol className="flex space-x-2">
              <li>
                <Link to="/dashboard" className="hover:text-indigo-600">
                  Dashboard
                </Link>
              </li>
              {parts.length > 1 && (
                <>
                  <span>/</span>
                  <li className="text-gray-900 font-semibold">{title}</li>
                </>
              )}
            </ol>
          </nav>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>
    </header>
  );
}
