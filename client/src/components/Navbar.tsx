import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    
    <nav className="flex mt-2 mb-6 font-sans justify-between text-3xl text-gray-700 font-bold md:font-extrabold md:p-4 p-8 items-center">
    
      <div className="hover:tracking-widest pl-0 flex flex-row ">
      <svg className="h-10 w-10 hover:h-12 hover:w-12 text-gray-700"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 7h7m-2 -2v2a5 8 0 0 1 -5 8m1 -4a7 4 0 0 0 6.7 4" />  <path d="M11 19l4 -9l4 9m-.9 -2h-6.2" /></svg>
        <Link to="/"> | Bullish</Link>
        
      </div>

      {/* Hamburger Menu Button (Visible on Mobile) */}
      <button
        className="md:hidden flex mb-1 items-center focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {!isOpen ? <svg className="h-8 w-8 text-gray-700"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" />  <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />  <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" />  <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" />  <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z" />  <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />  <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z" />  <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z" /></svg> : <svg className="h-8 w-8 text-gray-700"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polyline points="4 14 10 14 10 20" />  <polyline points="20 10 14 10 14 4" />  <line x1="14" y1="10" x2="21" y2="3" />  <line x1="3" y1="21" x2="10" y2="14" /></svg>}
      </button>

      {/* Navigation Links */}
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row md:mt-0 mt-45 mr-18 md:bg-[#deb887] text-yellow-300  md:text-gray-700 bg-gray-600 md:space-y-0 md:space-x-7 absolute text-center md:text-3xl text-2xl font-mono md:static top-20 right-0  md:w-auto   md:text-gray-700 md:p-0 z-10 shadow-md md:shadow-none`}
      >
          <div className=" px-30 border-2 py-11 md:p-0 hover:border-white   border-black md:border-none border rounded-2xl ">
          <Link to="/explore" onClick={() => setIsOpen(false)}>
            explore
          </Link>
        </div>

        <div className=" md:p-0 border-2 px-30 hover:border-white py-11   border-black md:border-none border rounded-2xl">
          <Link to="/auth/signup" onClick={() => setIsOpen(false)}>
            signup
          </Link>
        </div>

        <div className=" px-30 py-11 border-2 hover:border-white  md:p-0 border-black md:border-none border rounded-2xl">
          <Link to="/auth/signin" onClick={() => setIsOpen(false)}>
            signin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
