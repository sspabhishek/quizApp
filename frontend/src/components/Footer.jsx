import React from 'react';
import { FaEnvelope } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };
    return (
        <footer className="border-t bg-blue-50 text-black py-6">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

                {/* Left Section - Logo & Tagline */}
                <div className="flex flex-col items-center md:items-start">
                    <Link to={'/'}>
                        <img src={logo} alt="QuizWizard Logo" className="h-14 mb-2 mix-blend-multiply transition hover:scale-105" />
                    </Link>
                    <p className="text-blue-600 font-semibold">Let the challenge begin</p>
                </div>

                {/* Center Section - Details Info */}
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="font-bold text-lg mb-2">DETAILS INFO</h3>
                    <ul className="text-neutral-800 space-y-1">
                        <li><Link to="/" className="block px-4 py-2 lg:p-0 hover:text-blue-700" onClick={scrollToTop}>Home</Link></li>
                        <li><Link to="/about" className="block px-4 py-2 lg:p-0 hover:text-blue-700" onClick={scrollToTop}>About us</Link></li>
                        <li><Link to="/practice-quiz" className='hover:text-blue-700' onClick={scrollToTop}>Practices</Link></li>
                        <li><Link to="/contact" className="block px-4 py-2 lg:p-0 hover:text-blue-700" onClick={scrollToTop}>Contact us</Link></li>
                        <li><Link to="#" className='hover:text-blue-700' onClick={scrollToTop}>Term & Conditions</Link></li>
                        <li><Link to="#" className='hover:text-blue-700' onClick={scrollToTop}>Privacy Policy</Link></li>
                        {/* <li><Link to="/add-practice-quiz" className='hover:text-blue-700' onClick={scrollToTop}>Add practice quiz</Link></li> */}
                    </ul>
                </div>

                {/* Right Section - Contact Info */}
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="font-bold text-lg mb-2">CONTACT INFO</h3>
                    <a href="mailto:abhishekprajapati243@gmail.com" className="flex items-center text-blue-600">
                        <FaEnvelope className="text-orange-500 mr-2" />
                        contact@owling.com
                    </a>
                </div>

            </div>

            {/* Copyright Text */}
            <div className="text-center text-sm text-gray-500 mt-6">
                © Copyright 2025 by Owling
            </div>
        </footer>
    );
};

export default Footer;
