import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex mt-2 mb-6 font-sans justify-between text-3xl text-gray-700 font-bold md:font-extrabold md:p-4 p-8 items-center">
      {/* Logo */}
      <div className="hover:tracking-widest pl-0 pr-11">
        <Link to="/">Bullish</Link>
      </div>

      {/* Hamburger Menu Button (Visible on Mobile) */}
      <button
        className="md:hidden flex items-center focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {!isOpen ? "|||" : "^"}
      </button>

      {/* Navigation Links */}
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row md:mt-0 mt-45 mr-18 md:space-y-0 md:space-x-7 absolute text-center md:text-3xl text-2xl  md:static top-20 right-0  md:w-auto md:bg-transparent bg-[#deb887] md:text-gray-700 md:p-0 z-10 shadow-md md:shadow-none`}
      >
        <div className=" px-30 border-2 py-11 md:p-0 border-black hover:text-3xl  md:border-none border rounded-3xl ">
          <Link to="/explore" onClick={() => setIsOpen(false)}>
            explore
          </Link>
        </div>

        <div className=" md:p-0 border-2 px-30 border-black py-11  hover:text-3xl md:border-none border rounded-3xl">
          <Link to="/auth/signup" onClick={() => setIsOpen(false)}>
            signup
          </Link>
        </div>

        <div className=" px-30 py-11 border-2 border-black md:p-0  hover:text-3xl  md:border-none border rounded-3xl">
          <Link to="/auth/signin" onClick={() => setIsOpen(false)}>
            signin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
