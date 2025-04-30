import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className='flex mt-2 mb-6 font-sans md:justify-around justify-between  text-3xl text-gray-700 font-bold md:font-extrabold md:p-4 p-8 items-center '>
      <div className='hover:tracking-widest pl-0 pr-11 '>
        
       <Link to="/">Bullish</Link>
      </div>
      <div className='flex space-x-3 md:space-x-7 '>
        <div className='hover:tracking-widest'><Link to="/explore">explore </Link></div>
        <div className='hover:tracking-widest'><Link to="/auth/signup">signup</Link> </div>
        <div className='hover:tracking-widest'><Link to="/auth/signin">signin</Link></div>
      </div>
    </nav>
  );
};

export default Navbar;