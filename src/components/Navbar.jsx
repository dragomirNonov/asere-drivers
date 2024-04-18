import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";

const navlinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About Us",
    link: "#aboutus",
  },
  {
    title: "FAQs",
    link: "#faq",
  },
  {
    title: "Gallery",
    link: "#gallery",
  },
  {
    title: "Contact Us",
    link: "#contactus",
  },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="bg-gray-800 sticky top-0">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src={logo} className="h-12 w-auto" alt="Logo" />{" "}
            <a href="/" className="text-yellow-500 ml-2 text-2xl">
              Asere CDL
            </a>
          </div>
          {/* Nav Links*/}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navlinks.map((link, index) => (
                <a
                  key={index}
                  className="text-yellow-500 transition-all duration-500 hover:bg-gray-600 hover:text-yelow-500 px-3 py-2 rounded-md text-md font-medium"
                  href={link.link}
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
          {/* hamburger button */}
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              onClick={handleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-yellow-400 hover:bg-gray-700 "
            >
              <span className="sr-only">Open Main Manu</span>
              {open == true ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
      {/* mpbile-menu */}
      {open ? (
        <div className="md:hidden">
          <div className="ox-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navlinks.map((link, index) => (
              <a
                key={index}
                className="text-yellow-500 hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                href={link.link}
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
