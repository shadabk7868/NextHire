import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  const menuItems = [
    { name: "Home", path: "/", sub: ["Home 1", "Home 2"] },
    { name: "Find Jobs", path: "/jobs", sub: ["All Jobs", "Job Categories", "Job Alerts"] },
    { name: "Employers", path: "/company", sub: ["Browse Employers", "Employer Dashboard"] },
    { name: "Candidates", path: "/candidate", sub: ["Browse Candidates", "Candidate Dashboard"] },
    { name: "Blog", path: "/blog", sub: [] },
    { name: "Contact", path: "/contact", sub: [] },
  ];

  return (
    <>
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="lg:px-[130px] px-6 flex justify-between items-center h-[80px]">

          {/* LOGO */}
          <Link to="/">
            <img src="/logos.svg" alt="logo" className="h-10" />
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700 relative">
            {menuItems.map((item, idx) => (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => setOpenMenu(idx)}
              >
                <Link
                  to={item.path || "#"}
                  className="flex items-center gap-1 hover:text-blue-600 transition"
                >
                  {item.name}
                  {item.sub.length > 0 && <FaChevronDown className="text-xs" />}
                </Link>

                {/* DROPDOWN */}
                {item.sub.length > 0 && openMenu === idx && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50"
                    onMouseLeave={() => setOpenMenu(null)}>

                    {item.sub.map((subItem, i) => {
                      let linkPath = "#";

                      if (subItem === "Employer Dashboard") {
                        linkPath = "/employers-dashboard";
                      } else if (subItem === "Candidate Dashboard") {
                        linkPath = "/candidate-dashboard";
                      }

                      return (
                        <Link
                          key={i}
                          to={linkPath}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                        >
                          {subItem}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* RIGHT BUTTONS */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setShowAuth(true)}
              className="text-sm text-gray-700 hover:text-blue-600 transition"
            >
              Login / Register
            </button>

            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
              Job Post
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="lg:hidden">
            <button
              onClick={() =>
                setOpenMenu(openMenu === "mobile" ? null : "mobile")
              }
              className="text-2xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {openMenu === "mobile" && (
          <div className="lg:hidden px-6 pb-4 space-y-3 text-sm text-gray-700">
            {menuItems.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center py-1">
                  <Link to={item.path || "#"}>{item.name}</Link>

                  {item.sub.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenu((prev) =>
                          prev === idx + "sub" ? "mobile" : idx + "sub"
                        );
                      }}
                    >
                      <FaChevronDown className="text-xs" />
                    </button>
                  )}
                </div>

                {openMenu === idx + "sub" && item.sub.length > 0 && (
                  <div className="pl-4 space-y-1">
                    {item.sub.map((subItem, i) => (
                      <a
                        key={i}
                        href="#"
                        className="block py-1 text-gray-500 hover:text-blue-600"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* MOBILE BUTTONS */}
            <button
              onClick={() => setShowAuth(true)}
              className="w-full text-left py-2"
            >
              Login / Register
            </button>

            <button className="w-full bg-blue-600 text-white py-2 rounded">
              Post a Job
            </button>
          </div>
        )}
      </header>

      {/* AUTH MODAL */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}