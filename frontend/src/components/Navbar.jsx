import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import logo from "../assets/logo.png";
import { FaChevronDown, FaChevronUp, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdown if clicking outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }

      // Close mobile menu if clicking outside
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="h-20 sticky top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-between px-6 bg-gradient-to-bl from-blue-500 via-blue-200 to-white shadow-lg backdrop-blur-md bg-opacity-80 border-b border-white/10">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src={logo}
          alt="Quiz App"
          className="h-14 mb-2 mix-blend-multiply transition hover:scale-105"
        />
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden text-2xl"
        onClick={(e) => {
          e.stopPropagation(); // Prevent menu from closing when clicking button
          setMenuOpen(!menuOpen);
        }}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation Links */}
      <div
        ref={menuRef}
        className={`lg:flex lg:items-center lg:space-x-8 text-neutral-900 absolute lg:static top-20 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none transition-transform duration-300 ease-in-out ${
          menuOpen ? "block" : "hidden"
        } lg:flex`}
      >
        <Link to="/" className="block px-4 py-2 lg:p-0">Home</Link>
        
        {/* Dropdown */}
        <div className="relative px-4 py-2 lg:p-0" ref={dropdownRef}>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing when clicking inside
              setDropdownVisible(!dropdownVisible);
            }}
            className="flex items-center"
          >
            Quizzes {dropdownVisible ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
          </button>
          {dropdownVisible && (
            <div className="absolute bg-blue-100 text-black rounded shadow-md mt-2 p-2 w-48 z-50">
              <ul className="space-y-2">
                <li>
                  <Link to="/practice-quiz" className="block hover:bg-blue-300 rounded p-2" onClick={() => setDropdownVisible(false)}>
                    Practice Quiz
                  </Link>
                </li>
                <li>
                  <Link to="/create-quiz" className="block hover:bg-blue-300 rounded p-2" onClick={() => setDropdownVisible(false)}>
                    Create Quiz
                  </Link>
                </li>
                <li>
                  <Link to="/join-quiz" className="block hover:bg-blue-300 rounded p-2" onClick={() => setDropdownVisible(false)}>
                    Join Quiz
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        <Link to="/about" className="block px-4 py-2 lg:p-0">About us</Link>
        <Link to="/contact" className="block px-4 py-2 lg:p-0">Contact us</Link>

        {/* Auth Buttons */}
        {user ? (
          <button onClick={handleLogout} className="bg-neutral-800 my-1 px-4 py-2 rounded text-white hover:bg-neutral-700 transition">
            Logout
          </button>
        ) : (
          <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4">
            <Link to="/login" className="bg-neutral-800 text-white text-sm md:text-base font-medium px-5 py-2 md:px-6 md:py-3 rounded-lg shadow-md hover:bg-neutral-700 transition">
              Login
            </Link>
            <Link to="/register" className="bg-neutral-800 text-white text-sm md:text-base font-medium px-5 py-2 md:px-6 md:py-3 rounded-lg shadow-md  hover:bg-neutral-700 transition">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
