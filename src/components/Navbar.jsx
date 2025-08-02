import { Link } from "react-router";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext"; // *** CHANGED: import auth context ***

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, logout } = useAuthContext(); // *** CHANGED: get user and logout from context ***

  return (
    <nav className="w-full bg-white/80 backdrop-blur-lg border-b border-white/30 shadow-lg sticky top-0 z-50">
      <div className="w-full mx-auto px-2 sm:px-2 lg:px-2 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            DailyJournal
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className="px-4 py-2 rounded-xl text-gray-700 hover:bg-white hover:text-indigo-600 font-medium transition">
            Home
          </Link>
          <Link to="/dashboard" className="px-4 py-2 rounded-xl text-gray-700 hover:bg-white hover:text-indigo-600 font-medium transition">
            Dashboard
          </Link>

          {/* *** CHANGED: Conditionally show user info or login/register *** */}
          {user ? (
            <div className="flex items-center space-x-4">
              <img
                src={user.photoURL || "/default-profile.png"}
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-600"
                title={user.displayName || user.email}
              />
              <span className="font-semibold text-indigo-600">
                {user.displayName || user.email}
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-semibold rounded-xl transition hover:bg-indigo-50">
                Login
              </Link>
              <Link to="/registration" className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-indigo-600 rounded-xl hover:bg-indigo-50 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 pb-4 space-y-3 bg-white border-t border-gray-200">
          <Link to="/" className="block px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-xl" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/dashboard" className="block px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-xl" onClick={() => setIsOpen(false)}>Dashboard</Link>

          {/* *** CHANGED: Mobile menu conditional rendering *** */}
          {user ? (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3 px-4 py-2 bg-indigo-50 rounded-xl">
                <img
                  src={user.photoURL || "/default-profile.png"}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full object-cover border-2 border-indigo-600"
                  title={user.displayName || user.email}
                />
                <span className="font-semibold text-indigo-600">
                  {user.displayName || user.email}
                </span>
              </div>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="block px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-xl" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/registration" className="block px-4 py-3 text-white bg-indigo-500 hover:bg-indigo-600 rounded-xl text-center font-semibold" onClick={() => setIsOpen(false)}>Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
