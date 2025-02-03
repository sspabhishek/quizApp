import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import useMobile from "../hooks/useMobile";
import logo from "../assets/logo.png"
import { FaChevronDown, FaChevronUp } from "react-icons/fa";


const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isMobile] = useMobile();
  const [dropdownVisible, setDropdownVisible] = useState(false);


  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="h-20 sticky top-0 z-50 flex justify-between items-center gap-4 px-6 bg-gradient-to-bl from-blue-500  via-blue-200 to-white  shadow-lg backdrop-blur-md bg-opacity-80 border-b border-white/10">
      {/* Logo Section */}
      <Link to="/" className="font-bold text-xl text-neutral-800 flex items-center gap-2">
      <img src={logo} alt="Quiz App" className="h-14 mb-2 mix-blend-multiply transition hover:scale-105" />
      </Link>

      <div className="mx-24 space-x-8 text-neutral-900 flex items-center">
        <Link to="/">Home</Link>
        <div className="relative">
          <button
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className="flex items-center"
          >
            Quizzes {dropdownVisible ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
          </button>
          {dropdownVisible && (
            <div className="absolute bg-blue-100 text-black rounded shadow-md mt-2 p-2 w-48 z-50">
              <ul 
              onClick={() => setDropdownVisible(false)}
              className="space-y-2">
                <li>
                  <Link to="/practice-quiz" className="block hover:bg-gray-200 p-2">
                    Practice Quiz
                  </Link>
                </li>
                <li>
                  <Link to="/create-quiz" className="block hover:bg-gray-200 p-2">
                    Create Quiz
                  </Link>
                </li>
                <li>
                  <Link to="/join-quiz" className="block hover:bg-gray-200 p-2">
                    Join Quiz
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <Link to="/about">About us</Link>
        <Link to="/contact">Contact us</Link>
          

      {/* Right Side (Login/Register or Logout) */}
     
        {user ? (
          <button onClick={handleLogout}>
            <div className="bg-neutral-800 my-1 px-2 py-1 flex items-center justify-center rounded text-white">
              Logout
            </div>
          </button>
        ) : (
          isMobile ? (
            <div className="container mx-auto grid items-center px-2 h-full ">
              <div className="bg-neutral-800 my-1 px-2 py-1 flex items-center justify-center rounded text-white">
                <Link to="/login" >Login</Link>
              </div>
              <div className="bg-neutral-800 my-1 px-2 py-1 flex items-center justify-center rounded text-white">
                <Link to="/register">Register</Link>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <div className="bg-neutral-800 mx-3 px-4 py-2 flex items-center justify-center rounded text-white">
                <Link to="/login" >Login</Link>
              </div>
              <div className="bg-neutral-800 px-4 py-2 flex items-center justify-center rounded text-white">
                <Link to="/register">Register</Link>
              </div>
            </div>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
