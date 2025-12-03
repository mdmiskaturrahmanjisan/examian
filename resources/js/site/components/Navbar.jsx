import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Exams", path: "/exams" },

    ...(user
      ? [
          { name: "Dashboard", path: "/dashboard" },
          { name: "Profile", path: "/profile" },
          { name: "Change Password", path: "/change-password" },
        ]
      : [{ name: "Login", path: "/login" }]),
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login"); 
  };

  return (
    <nav className="bg-orange-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold tracking-wide">
          <Link to="/" className="hover:text-gray-100">
            Tutorian
          </Link>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-lg font-medium transition ${
                location.pathname === link.path
                  ? "bg-orange-700 shadow-md"
                  : "hover:bg-orange-500/70"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {user && (
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-lg font-medium bg-red-600 hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-orange-500/70 transition"
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-orange-600 px-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block text-white text-center px-3 py-2 rounded-lg font-medium transition ${
                location.pathname === link.path ? "bg-orange-700 shadow-md" : "hover:bg-orange-500/70"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Logout */}
          {user && (
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="block w-full text-center px-3 py-2 rounded-lg font-medium bg-red-600 hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
