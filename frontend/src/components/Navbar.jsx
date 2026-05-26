import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [role] = useState(localStorage.getItem("role"));
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  const linkClass = ({ isActive }) =>
    `text-black hover:text-blue-600 ${isActive ? "text-blue-600 font-semibold" : ""
    }`;

  return (
    <>
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-[80px] flex justify-between items-center h-[70px]">

          {/* LOGO */}
          <NavLink to="/">
            <img src="/real logo.jpeg" alt="logo" className="h-16 md:h-17" />
          </NavLink>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">

            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>

            {(!isLoggedIn || role === "candidate") && (
              <NavLink to="/jobs" className={linkClass}>
                Find Jobs
              </NavLink>
            )}

            {isLoggedIn && role === "employer" && (
              <NavLink
                to="/employers-dashboard?tab=appliedCandidates"
                className={linkClass}
              >
                Applicants
              </NavLink>
            )}

            {/* BLOG ADDED */}
            <NavLink to="/blog" className={linkClass}>
              Blog
            </NavLink>



            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>

            {isLoggedIn && (
              <NavLink
                to={
                  role === "candidate"
                    ? "/candidate-dashboard"
                    : "/employers-dashboard"
                }
                className={linkClass}
              >
                Dashboard
              </NavLink>
            )}
          </nav>

          {/* RIGHT SIDE */}
          <div className="hidden lg:flex items-center gap-4">

            {!isLoggedIn ? (
              <button
                onClick={() => setShowAuth(true)}
                className="text-sm text-black hover:text-blue-600"
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

            {isLoggedIn && role === "employer" && (
              <NavLink to="/employers-dashboard?tab=post">
                
              </NavLink>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden text-xl"
          >
            <FaBars />
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black/40 z-50">
            <div className="bg-white w-[260px] h-full p-6">

              <div className="flex justify-end mb-6">
                <button onClick={() => setMenuOpen(false)}>
                  <FaTimes />
                </button>
              </div>

              <nav className="flex flex-col gap-5 text-sm font-medium">

                <NavLink to="/" onClick={() => setMenuOpen(false)} className={linkClass}>
                  Home
                </NavLink>

                {(!isLoggedIn || role === "candidate") && (
                  <NavLink to="/jobs" onClick={() => setMenuOpen(false)} className={linkClass}>
                    Find Jobs
                  </NavLink>
                )}

                {/* BLOG ADDED */}
                <NavLink to="/blog" onClick={() => setMenuOpen(false)} className={linkClass}>
                  Blog
                </NavLink>

                {isLoggedIn && role === "employer" && (
                  <NavLink
                    to="/employers-dashboard?tab=appliedCandidates"
                    onClick={() => setMenuOpen(false)}
                    className={linkClass}
                  >
                    Applicants
                  </NavLink>
                )}

                <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={linkClass}>
                  Contact
                </NavLink>

                {isLoggedIn && (
                  <NavLink
                    to={
                      role === "candidate"
                        ? "/candidate-dashboard"
                        : "/employers-dashboard"
                    }
                    onClick={() => setMenuOpen(false)}
                    className={linkClass}
                  >
                    Dashboard
                  </NavLink>
                )}

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

                {isLoggedIn && role === "employer" && (
                  <NavLink
                    to="/employers-dashboard?tab=post"
                    onClick={() => setMenuOpen(false)}
                  >
                  </NavLink>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}