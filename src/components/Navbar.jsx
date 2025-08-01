import { Link } from "react-router";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Enhanced Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            DailyJournal
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-gray-50/50 rounded-2xl p-1">
            <Link 
              to="/" 
              className="px-6 py-2.5 rounded-xl text-gray-700 hover:text-indigo-600 hover:bg-white hover:shadow-md transition-all duration-300 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className="px-6 py-2.5 rounded-xl text-gray-700 hover:text-indigo-600 hover:bg-white hover:shadow-md transition-all duration-300 font-medium"
            >
              Dashboard
            </Link>
          </div>
          
          <div className="flex items-center space-x-3 ml-6">
            <Link
              to="/login"
              className="px-6 py-2.5 text-gray-700 hover:text-indigo-600 font-semibold rounded-xl transition-all duration-300 hover:bg-indigo-50"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Enhanced Mobile Toggle Button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl hover:bg-indigo-50 transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Enhanced Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 pb-6 space-y-3 bg-gradient-to-b from-white/90 to-gray-50/90 backdrop-blur-xl border-t border-gray-100/50">
          <div className="space-y-2 pt-4">
            <Link 
              to="/" 
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300 group"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="font-medium">Home</span>
            </Link>
            
            <Link 
              to="/dashboard" 
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300 group"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="font-medium">Dashboard</span>
            </Link>
          </div>
          
          <div className="pt-4 border-t border-gray-200/50 space-y-3">
            <Link
              to="/login"
              className="block w-full px-6 py-3 text-center text-gray-700 hover:text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;