import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faXmark } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => setOpenMenu(!openMenu);

  // Helper to safely determine link activation states
  const isActive = (path) => {
    if (path === "/near-by") {
      return (
        location.pathname === "/near-by" ||
        location.pathname === "/emergency/hospital"
      );
    }
    return location.pathname === path;
  };

  // Shared dynamic classes for normal navigation links
  const navLinkClass = (path) => `
    cursor-pointer text-sm font-semibold tracking-wide transition-all duration-200 uppercase font-mono
    ${
      isActive(path)
        ? "text-red-500 border-b-2 border-red-600 pb-1"
        : "text-stone-400 hover:text-white"
    }
  `;

  return (
    <nav className="fixed top-0 left-0 w-full h-[10vh] bg-[#0a0a0a]/95 backdrop-blur-md border-b border-stone-900 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* ----------- LOGO / BRAND ----------- */}
        <div
          className="flex-shrink-0 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1 className="text-xl sm:text-2xl font-black tracking-tighter text-white font-sans uppercase flex items-center">
            EMER
            <span className="text-2xl sm:text-3xl text-red-600 font-mono animate-pulse inline-block mx-[1px] -translate-y-[2px]">
              G
            </span>
            ENCY
          </h1>
        </div>

        {/* ----------- DESKTOP NAVIGATION ----------- */}
        <div className="hidden md:flex items-center gap-8">
          <span className={navLinkClass("/")} onClick={() => navigate("/")}>
            Home
          </span>
          <span
            className={navLinkClass("/near-by")}
            onClick={() => navigate("/near-by")}
          >
            NearBy
          </span>
          <span
            className={navLinkClass("/hospital")}
            onClick={() => navigate("/hospital")}
          >
            Hospital
          </span>
          <span
            className={navLinkClass("/ambulance")}
            onClick={() => navigate("/ambulance")}
          >
            Ambulance
          </span>
          <span
            className={navLinkClass("/about-us")}
            onClick={() => navigate("/about-us")}
          >
            About
          </span>
        </div>

        {/* ----------- DESKTOP CTAs / ACTION BUTTONS ----------- */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate("/login/hospital")}
            className={`px-4 py-2 text-xs font-bold tracking-wider font-mono rounded-lg transition-all duration-200 border ${
              isActive("/login/hospital")
                ? "bg-stone-900 text-red-500 border-red-600"
                : "bg-transparent text-stone-300 border-stone-800 hover:text-white hover:border-stone-600"
            }`}
          >
            HOSPITAL PORTAL
          </button>

          <button
            onClick={() => {
              if (location.pathname === "/admin") {
                localStorage.removeItem("admin");
                navigate("/login");
              } else {
                navigate("/login");
              }
            }}
            className="px-4 py-2 text-xs font-bold tracking-wider font-mono bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white rounded-lg transition-all duration-300 shadow-lg shadow-red-900/20 active:scale-95"
          >
            {location.pathname === "/admin" ? "LOGOUT [ADMIN]" : "ADMIN LOGIN"}
          </button>
        </div>

        {/* ----------- MOBILE HAMBURGER BUTTON ----------- */}
        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 text-stone-400 hover:text-red-500 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            <FontAwesomeIcon icon={openMenu ? faXmark : faList} size="xl" />
          </button>
        </div>
      </div>

      {/* ----------- MOBILE DROPDOWN DRAWER ----------- */}
      <div
        className={`absolute top-[10vh] left-0 w-full bg-[#0d0d0d] border-b border-stone-900 shadow-2xl transition-all duration-300 ease-in-out md:hidden overflow-hidden ${
          openMenu
            ? "max-h-[80vh] opacity-100 py-6"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 space-y-4 flex flex-col">
          {/* Main Links */}
          <div className="flex flex-col space-y-3 border-b border-stone-900 pb-4">
            <span
              className={`${navLinkClass("/")} py-1`}
              onClick={() => {
                navigate("/");
                setOpenMenu(false);
              }}
            >
              Home
            </span>
            <span
              className={`${navLinkClass("/near-by")} py-1`}
              onClick={() => {
                navigate("/near-by");
                setOpenMenu(false);
              }}
            >
              NearBy
            </span>
            <span
              className={`${navLinkClass("/hospital")} py-1`}
              onClick={() => {
                navigate("/hospital");
                setOpenMenu(false);
              }}
            >
              Hospital
            </span>
            <span
              className={`${navLinkClass("/ambulance")} py-1`}
              onClick={() => {
                navigate("/ambulance");
                setOpenMenu(false);
              }}
            >
              Ambulance
            </span>
            <span
              className={`${navLinkClass("/about-us")} py-1`}
              onClick={() => {
                navigate("/about-us");
                setOpenMenu(false);
              }}
            >
              About
            </span>
          </div>

          {/* Action Callouts */}
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                navigate("/login/hospital");
                setOpenMenu(false);
              }}
              className="w-full text-center px-4 py-3 text-xs font-bold tracking-widest font-mono rounded-xl bg-stone-950 border border-stone-800 text-stone-300"
            >
              HOSPITAL PORTAL
            </button>
            <button
              onClick={() => {
                setOpenMenu(false);
                if (location.pathname === "/admin") {
                  localStorage.removeItem("admin");
                  navigate("/login");
                } else {
                  navigate("/login");
                }
              }}
              className="w-full text-center px-4 py-3 text-xs font-bold tracking-widest font-mono rounded-xl bg-red-600 text-white shadow-md"
            >
              {location.pathname === "/admin"
                ? "LOGOUT [ADMIN]"
                : "ADMIN LOGIN"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
