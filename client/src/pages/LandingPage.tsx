import { Link } from "react-router-dom";


const LandingPage = () => {
  return (
    <div>
      <div className="pl-5 flex justify-center items-center min-h-150 md:text-5xl text-2xl ">
        You gotta be enough bullish,
        before you start writing here.
      </div>
      <div className="flex justify-center items-center">
      <button className="px-4 py-2 bg-black text-white rounded-xl hover:bg-white hover:text-black">
        <Link to="/explore"> Explore </Link>
      </button>
      </div>
    </div>
  );
};
export default LandingPage;
