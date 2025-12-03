import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth(); 

  const navItems = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/dashboard/batches", label: "Batches" },
    { to: "/dashboard/banners", label: "Banners" },
    { to: "/dashboard/categories", label: "Categories" },
    { to: "/dashboard/sub_categories", label: "Sub Categories" },
    { to: "/dashboard/subjects", label: "Subjects" },
    { to: "/dashboard/topics", label: "Topics" },
    { to: "/dashboard/exams", label: "Exams" },
    { to: "/dashboard/courses", label: "Courses" },
    { to: "/dashboard/questions", label: "Questions" },
    { to: "/dashboard/coupons", label: "Coupons" },
    { to: "/dashboard/medias", label: "Medias" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <aside className="flex flex-col justify-between w-64 bg-gray-900 text-white p-6 min-h-screen">
      <div>
        <h2 className="text-3xl font-extrabold text-orange-400 mb-2">Tutorian</h2>
        
        {user && (
          <p className="mb-6 text-gray-300 font-medium">Hello, {user.name}</p>
        )}

        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`block p-3 rounded-xl font-medium transition
                  ${pathname === item.to 
                    ? "bg-orange-700 shadow-lg text-white" 
                    : "hover:bg-gray-700 text-gray-300"
                  }
                `}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        {user && (
          <button
            onClick={handleLogout}
            className="w-full p-3 rounded-xl bg-red-600 hover:bg-red-700 font-semibold transition"
          >
            Logout
          </button>
        )}
      </div>
    </aside>
  );
}
