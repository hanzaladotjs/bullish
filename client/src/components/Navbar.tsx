import { Link } from 'react-router-dom';
import React from "react"

const Navbar = () => {
  return (
    <nav className='flex my-6  md:justify-around justify-between  text-medium md:text-2xl font-bold md:font-extrabold md:p-4 p-8 items-center '>
      <div className='hover:text-black shadow-lg pl-0 pr-11 md:text-2xl text-xl'>
        
       <Link to="/">CopyPasta</Link>
      </div>
      <div className='flex space-x-3 md:space-x-7 '>
        <div className='hover:text-black shadow-lg'><Link to="/explore">explore </Link></div>
        <div className='hover:text-black shadow-lg'><Link to="/auth/signup">signup</Link> </div>
        <div className='hover:text-black shadow-lg'><Link to="/auth/signin">signin</Link></div>
      </div>
    </nav>
  );
};

export default Navbar;