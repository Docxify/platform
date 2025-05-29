'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect - transparent on top, slight background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`fixed w-full z-20 top-0 start-0 transition-all duration-300 border-b border-white/10 ${
        scrolled
          ? 'bg-[#0f172a]/80 backdrop-blur-sm shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Docxify
          </span>
        </Link>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-200"
          >
            Get Started
          </button>

          <button
            onClick={toggleNavbar}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white md:hidden focus:outline-none"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 17 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Navbar items - mobile and desktop view */}
        <div
  className={`${
    isOpen ? 'flex' : 'hidden'
  } flex-col w-full absolute top-full left-0 z-10 
  md:static md:flex md:flex-row md:w-auto md:order-1 md:space-x-8
  ${isOpen ? 'bg-[#0f172a]/90 backdrop-blur-sm' : 'bg-transparent'}
  md:bg-transparent md:backdrop-blur-0`}
  id="navbar-sticky"
>


          <ul className="flex flex-col md:flex-row p-4 mt-4 md:p-0 md:mt-0 space-y-4 md:space-y-0 text-center md:text-left font-medium w-full">
            {['Features', 'Documentation', 'Pricing', 'Blog'].map((item) => (
              <li key={item} className="w-full md:w-auto">
                <Link
                  href="#"
                  className="block py-2 px-3 text-white  transition-colors duration-200"
                  aria-current={item === 'Features' ? 'page' : undefined}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;