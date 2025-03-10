import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../../LocalStorage";

const Header = () => {
  const { user: contextUser } = useAppContext();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Sync user from both context and localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    } else if (contextUser) {
      setUser(contextUser);
    }
  }, [contextUser]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="bg-gray-900 text-white shadow-lg w-full sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl sm:text-3xl font-bold tracking-wide cursor-pointer">
              <span className="text-purple-500">Quizz</span>Wiz
            </div>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            {!user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/auth/candidate"
                  className="bg-purple-500 text-white hover:bg-white hover:text-purple-500 transition-colors duration-300 py-2 px-4 rounded-md shadow-lg"
                >
                  Candidate Login
                </Link>
                <Link
                  to="/auth/examiner"
                  className="bg-white text-purple-500 hover:bg-purple-500 hover:text-white transition-colors duration-300 py-2 px-4 rounded-md shadow-lg"
                >
                  Examiner Login
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to={user?.type === 0 ? "/candidate/dashboard" : "/examiner/dashboard"}
                  className="bg-purple-500 text-white hover:bg-white hover:text-purple-500 transition-colors duration-300 py-2 px-6 rounded-md shadow-lg"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    setUser(null);
                    window.location.href = "/";
                  }}
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"} pb-4 pt-2 border-t border-gray-700`}>
          {!user ? (
            <div className="flex flex-col space-y-3">
              <Link
                to="/auth/candidate"
                className="bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-300 py-2 px-4 rounded-md text-center"
              >
                Candidate Login
              </Link>
              <Link
                to="/auth/examiner"
                className="bg-white text-purple-500 hover:bg-gray-100 transition-colors duration-300 py-2 px-4 rounded-md text-center"
              >
                Examiner Login
              </Link>
            </div>
          ) : (
            <div className="flex flex-col space-y-3">
              <Link
                to={user?.type === 0 ? "/candidate/dashboard" : "/examiner/dashboard"}
                className="bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-300 py-2 px-4 rounded-md text-center"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  setUser(null);
                  window.location.href = "/";
                }}
                className="text-gray-300 hover:text-white transition-colors duration-300 py-2 text-center"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;