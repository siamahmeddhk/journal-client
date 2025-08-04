import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import { FiArrowLeft } from "react-icons/fi";

const Dash = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuthContext();
  const [journalCount, setJournalCount] = useState(0);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://my-journal-s.vercel.app/journals?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setJournalCount(data.length || 0);
        })
        .catch((err) => {
          console.error("Failed to fetch journals:", err);
        });
    }
  }, [user]);

  const activeClass =
    "flex items-center px-4 py-3 rounded-xl bg-indigo-600 text-white shadow transition-transform transform hover:scale-105";
  const inactiveClass =
    "flex items-center px-4 py-3 rounded-xl text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all";

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-100 to-white">
      {/* Sidebar */}
      <aside
  className={`fixed inset-y-0 left-0 z-30 w-72 overflow-y-auto bg-white/90 backdrop-blur-lg border-r border-gray-200 shadow-xl transform ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full"
  } transition-transform duration-300 md:translate-x-0 md:static`}
>
  <div className="flex flex-col h-full">
    {/* Logo and Close */}
    <div className="px-6 py-4 border-b border-gray-100">
      <div className="flex items-center gap-2 mx-auto">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <svg
            className="w-6 h-6 text-white mx-auto"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </div>
      </div>
    </div>

   

    {/* Navigation */}
    <nav className="flex-1 px-6 py-4 overflow-y-auto">
      <NavLink
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:underline"
      >
        <FiArrowLeft size={16} /> Back to Home
      </NavLink>

      <ul className="space-y-2">
        <li>
          <NavLink
            to="/dashboard/journals"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
            onClick={() => setSidebarOpen(false)}
          >
            <div className="w-10 h-10 mr-4 bg-indigo-500 text-white rounded-lg flex items-center justify-center">
              📘
            </div>
            <span className="font-medium">My Journals</span>
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
            <div className="w-10 h-10 mr-4 bg-teal-500 text-white rounded-lg flex items-center justify-center">
              ⚙️
            </div>
            <span className="font-medium">Other Option</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  </div>
</aside>


      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-full">
        {/* Top Bar (mobile only) */}
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md md:hidden">
          <button
            className="text-gray-700 focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
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

        {/* Welcome Cluster */}
    <main className="flex-1 px-4 sm:px-6 py-6 overflow-auto">
  <div className="max-w-4xl mx-auto space-y-8">
    {user && (
      <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-md">
        {/* Background blur effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-indigo-50/40 rounded-2xl z-0"></div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* Profile Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="relative">
              <img
                src={user.photoURL || "https://i.pravatar.cc/100"}
                alt="Profile"
                className="w-20 h-20 rounded-2xl object-cover shadow-lg ring-1 ring-gray-200"
              />
              <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Welcome back, {user.displayName || "User"}!
              </h2>
              <p className="text-sm text-gray-600 mb-2">{user.email}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {journalCount || 0} journal{(journalCount || 0) !== 1 && "s"} created
              </div>
            </div>
          </div>

          {/* Date Section */}
          <div className="text-center sm:text-right">
            <p className="text-sm text-gray-500">Today</p>
            <p className="text-lg font-semibold text-gray-900">
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    )}

    {/* Outlet Content */}
    <div className="relative z-10">
      <Outlet />
    </div>
  </div>
</main>

      </div>

      {/* Mobile Overlay */}
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
