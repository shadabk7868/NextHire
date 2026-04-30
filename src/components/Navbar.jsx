import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // 🔥 mobile menu

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    setIsLoggedIn(!!token);
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <>
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-[80px] flex justify-between items-center h-[70px]">

          {/* LOGO */}
          <Link to="/">
            <img src="/logos.svg" alt="logo" className="h-10 md:h-12" />
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700">

            <Link to="/">Home</Link>
            <Link to="/jobs">Find Jobs</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>

            {/* DASHBOARD */}
            {isLoggedIn && role === "candidate" && (
              <Link to="/candidate-dashboard" className="text-blue-600 font-semibold">
                Dashboard
              </Link>
            )}

            {isLoggedIn && role === "employer" && (
              <Link to="/employers-dashboard" className="text-blue-600 font-semibold">
                Dashboard
              </Link>
            )}
          </nav>

          {/* RIGHT DESKTOP */}
          <div className="hidden lg:flex items-center gap-4">

            {!isLoggedIn ? (
              <button
                onClick={() => setShowAuth(true)}
                className="text-sm text-gray-700 hover:text-blue-600"
              >
                Login / Register
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="text-sm text-red-500"
              >
                Logout
              </button>
            )}

            {/* EMPLOYER */}
            {isLoggedIn && role === "employer" && (
              <Link to="/employers-dashboard">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                  Post Job
                </button>
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden text-xl"
          >
            <FaBars />
          </button>
        </div>

        {/* 🔥 MOBILE MENU */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black/40 z-50">
            <div className="bg-white w-[260px] h-full p-6 shadow-lg">

              {/* CLOSE */}
              <div className="flex justify-end mb-6">
                <button onClick={() => setMenuOpen(false)}>
                  <FaTimes size={20} />
                </button>
              </div>

              {/* MENU ITEMS */}
              <nav className="flex flex-col gap-5 text-gray-700 font-medium">

                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/jobs" onClick={() => setMenuOpen(false)}>Find Jobs</Link>
                <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

                {/* DASHBOARD */}
                {isLoggedIn && role === "candidate" && (
                  <Link to="/candidate-dashboard" onClick={() => setMenuOpen(false)}>
                    Dashboard
                  </Link>
                )}

                {isLoggedIn && role === "employer" && (
                  <Link to="/employers-dashboard" onClick={() => setMenuOpen(false)}>
                    Dashboard
                  </Link>
                )}

                {/* LOGIN / LOGOUT */}
                {!isLoggedIn ? (
                  <button
                    onClick={() => {
                      setShowAuth(true);
                      setMenuOpen(false);
                    }}
                    className="text-left"
                  >
                    Login / Register
                  </button>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-500"
                  >
                    Logout
                  </button>
                )}

                {/* EMPLOYER BUTTON */}
                {isLoggedIn && role === "employer" && (
                  <Link to="/employers-dashboard" onClick={() => setMenuOpen(false)}>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm w-full">
                      Post Job
                    </button>
                  </Link>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* AUTH MODAL */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}