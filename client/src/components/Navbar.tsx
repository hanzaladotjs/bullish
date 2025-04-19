import { Link } from 'react-router-dom';
import React from "react"

const Navbar = () => {
  return (
    <nav className='flex md:justify-around justify-between text-large md:text-2xl font-bold md:font-extrabold p-4 items-center'>
      <div>
        CopyPasta
      </div>
      <div className='flex space-x-2 md:space-x-7'>
        <div><Link>explore </Link></div>
        <div><Link>signup</Link> </div>
        <div><Link>signin</Link></div>
      </div>
    </nav>
  );
};

export default Navbar;