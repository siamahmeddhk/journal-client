import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { useAuthContext } from "../context/AuthContext"; // *** ADDED: import auth context ***

const Dash = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user } = useAuthContext(); // *** ADDED: get current user ***

  // Active link styling helper with modern gradients and shadows
  const activeClass =
    "flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105 transition-all duration-300";

  const inactiveClass =
    "flex items-center px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 hover:text-indigo-600 transition-all duration-300 hover:transform hover:scale-105 text-gray-600";

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Sidebar with glassmorphism effect */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 overflow-y-auto bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-2xl transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-500 ease-out md:translate-x-0 md:static md:inset-auto`}
      >
        <div className="flex flex-col  h-full">
          {/* User Profile Section */}
          <div className="relative p-8 border-b border-gray-100/50">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-t-3xl"></div>
            <div className="relative flex flex-col items-center  space-x-4">
              <div className="relative">
                <img
                  src={user?.photoURL || "https://i.pravatar.cc/100"}
                  className="w-12 h-12 rounded-full object-cover shadow-lg ring-4 ring-white/50" // <-- changed here
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 tracking-tight">
                  {user?.displayName || "Guest User"}{" "}
                  {/* *** CHANGED: dynamic user name *** */}
                </h2>
                <p className="text-sm text-gray-500 font-medium">
                  {user?.email || "Not logged in"}{" "}
                  {/* *** CHANGED: dynamic user email *** */}
                </p>
               
              </div>
            </div>
          </div>

          {/* Modern Navigation Menu */}
          <nav className="flex-1 px-6 py-6 overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Navigation
              </h3>
              <ul className="space-y-3">
                <li>
                  <NavLink
                    to="/dashboard/journals"
                    className={({ isActive }) =>
                      isActive ? activeClass : inactiveClass
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white mr-4 shadow-lg">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold">My Journals</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/other"
                    className={({ isActive }) =>
                      isActive ? activeClass : inactiveClass
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white mr-4 shadow-lg">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold">Other Option</span>
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Additional Section */}
            <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800">Quick Actions</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Get started with your dashboard
              </p>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Explore Features
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Content area with modern styling */}
      <div className="flex flex-col flex-1 w-full">
        {/* Enhanced Top bar */}
        <header className="flex items-center justify-between p-6 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-sm md:hidden">
          <button
            className="p-2 text-gray-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl transition-all duration-300 hover:bg-indigo-50"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-5 5v-5zM9 17H4l5 5v-5z"
                />
              </svg>
            </div>
          </div>
        </header>

        {/* Main content with modern container */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* *** ADDED: Show Welcome message if no nested route loaded *** */}
            {!user ? (
              <p className="text-lg font-semibold text-gray-700">
                Welcome, Guest!
              </p>
            ) : (
              <p className="text-lg font-semibold text-gray-700">
                Welcome back, {user.displayName || user.email}!
              </p>
            )}
            <Outlet />
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dash;
