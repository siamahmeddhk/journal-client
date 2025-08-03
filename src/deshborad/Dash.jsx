import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import { FiArrowLeft } from "react-icons/fi";

const Dash = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuthContext();

  const activeClass =
    "flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105 transition-all duration-300";

  const inactiveClass =
    "flex items-center px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 hover:text-indigo-600 transition-all duration-300 hover:transform hover:scale-105 text-gray-600";

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 overflow-y-auto bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-2xl transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-500 ease-out md:translate-x-0 md:static md:inset-auto`}
      >
        <div className="flex flex-col h-full">
          <div className="relative p-8 border-b border-gray-100/50">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-t-3xl"></div>
            <div className="relative flex flex-col items-center space-y-2">
              <img
                src={user?.photoURL || "https://i.pravatar.cc/100"}
                alt="User Avatar"
                className="w-16 h-16 rounded-full object-cover shadow-lg ring-4 ring-white/50"
              />
              <h2 className="text-lg font-semibold text-gray-800">
                {user?.displayName || "Guest User"}
              </h2>
              <p className="text-sm text-gray-500">{user?.email || "Not logged in"}</p>
            </div>
          </div>

          <nav className="flex-1 px-6 py-6 overflow-y-auto">
            <NavLink to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:underline">
              <FiArrowLeft size={16} /> Back to Home
            </NavLink>

            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/dashboard/journals"
                  className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-500 text-white mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 6.253v13M12 6.253C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253M12 6.253C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
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
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-500 text-white mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <span className="font-semibold">Other Option</span>
                </NavLink>
              </li>
            </ul>

            <div className="mt-10 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
              <h4 className="font-semibold text-gray-800 mb-2">Quick Actions</h4>
              <p className="text-sm text-gray-600 mb-3">
                Get started with your dashboard features.
              </p>
              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Explore Features
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex flex-col flex-1 w-full">
        <header className="flex items-center justify-between p-6 bg-white shadow md:hidden">
          <button
            className="p-2 text-gray-600 hover:text-indigo-600 focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <h1 className="text-xl font-bold text-indigo-600">Dashboard</h1>
          <div></div>
        </header>

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <p className="text-lg font-semibold text-gray-700 mb-6">
              {user ? `Welcome back, ${user.displayName || user.email}!` : "Welcome, Guest!"}
            </p>
            <Outlet />
          </div>
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Dash;
