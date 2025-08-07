import React, { useState } from "react";
import sandes_logo from "../../assets/sandes_logo.png";
import ashoklogo from "../../assets/ashoklogo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { Button } from "../ui/button";



function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md">
      <div className=" mx-auto py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            className="w-10 mix-blend-difference"
            src={ashoklogo}
            alt="ashoklogo"
          />
          <img className="w-16" src={sandes_logo} alt="sandes_logo" />
        </div>
        {/* <div className="hidden md:flex items-center gap-12">
          <p className="text-xl font-semibold text-[#168A43] cursor-pointer hover:text-gray-600">
            Home
          </p>
          <p className="text-xl font-semibold text-[#168A43] cursor-pointer hover:text-gray-600">
            Features
          </p>
          <p className="text-xl font-semibold text-[#168A43] cursor-pointer hover:text-gray-600">
            About
          </p>
        </div> */}
        <div className="hidden md:flex items-center gap-4">
         

          <Link to = "/LoginAdmin">
            <Button className="border-green-300 border-1 bg-transparent text-[#168A43] hover:text-green-500 cursor-pointer hover:bg-transparent">
              Login
            </Button>
          </Link>
          {/* <Link to ="/LoginWeb">
            <Button className="border-green-300 border-1 bg-transparent text-[#168A43] hover:text-green-500 cursor-pointer hover:bg-transparent">
            Sandes Web
            </Button>
          </Link> */}

        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isOpen ? <RxCross2 size={28} /> : <RxHamburgerMenu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/70 backdrop-blur-md shadow-md px-4 py-4 space-y-4">
          {/* <p className="text-lg font-semibold text-[#168A43] cursor-pointer hover:text-gray-600">
            Home
          </p>
          <p className="text-lg font-semibold text-[#168A43] cursor-pointer hover:text-gray-600">
            Features
          </p>
          <p className="text-lg font-semibold text-[#168A43] cursor-pointer hover:text-gray-600">
            Latest News
          </p> */}
          <Link
            to="/LoginAdmin"
            className="block w-full text-left btn btn-outline btn-success bg-transparent text-[#168A43] hover:text-gray-500 mt-2"
          >
             Login
          </Link>
          {/* <Link
            to="/LoginWeb"
            className="block w-full text-left btn btn-outline btn-success bg-transparent text-[#168A43] hover:text-gray-500 mt-2"
          >
            Sandes Web
          </Link> */}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
